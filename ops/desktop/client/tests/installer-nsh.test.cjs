'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),cp=require('node:child_process');
const layout=require('../install-layout.cjs');
const nshPath=path.join(__dirname,'..','installer.nsh');
const source=fs.readFileSync(nshPath,'utf8').replace(/\r\n/g,'\n');

// The text of one !macro ... !macroend block.
function macro(name){
  const match=new RegExp('^!macro '+name+'\\b[^\\n]*\\n([\\s\\S]*?)^!macroend','m').exec(source);
  assert.ok(match,'macro '+name+' exists');return match[1];
}
const code=text=>text.split('\n').map(line=>line.replace(/;.*$/,'').trimEnd()).filter(line=>line.trim());

test('preInit never runs its body in the build-time uninstaller pass and moves TEMP before any plugin',()=>{
  const body=macro('preInit'),lines=code(body);
  assert.equal(lines[0].trim(),'!insertmacro dlGuard','the stale-include guard is the only thing outside the gate');
  assert.equal(lines[1].trim(),'!ifndef BUILD_UNINSTALLER');assert.equal(lines.at(-1).trim(),'!endif');
  const index=pattern=>lines.findIndex(line=>pattern.test(line));
  const move=index(/UnsafeStrCpy \$TEMP\b/),init=index(/^\s*InitPluginsDir\b/),firstPlugin=index(/\w+::\w+/);
  assert.ok(move>=0&&init>move,'UnsafeStrCpy $TEMP comes before InitPluginsDir');
  assert.ok(firstPlugin>init,'the first :: plugin call comes after InitPluginsDir');
  for(const forbidden of [/\$\{isUpdated\}/,/GetDParameter/,/System::/,/StdUtils::/,/nsExec::/])
    assert.ok(!lines.slice(0,init).some(line=>forbidden.test(line)),String(forbidden)+' before InitPluginsDir');
  assert.match(body,/SetEnvironmentVariable\(t "TEMP", t "\$TEMP"\)/);assert.match(body,/SetEnvironmentVariable\(t "TMP", t "\$TEMP"\)/);
  assert.match(body,/\$\{GetParameters\} \$R4/);assert.match(body,/\$\{GetOptions\} \$R4 "--updated" \$R5/);
  assert.match(body,/\$R8 == "1"/,'a run from the pending cache moves TEMP without /D');
  assert.match(body,/\$R7 <= \$\{DL_MAX_SETUP\}/,'a too-long setup folder skips the move');
});

test('the Downloads root and pending-cache tests use no plugin, and the version guard compares the generated include to VERSION',()=>{
  const helpers=macro('dlRoot')+macro('dlInstdirUnderRoot')+macro('dlExedirPending');
  assert.match(helpers,/User Shell Folders/);assert.match(helpers,/ExpandEnvStrings/);assert.match(helpers,/\$\{DL_KNOWN_FOLDER\}/);
  assert.match(helpers,/\$EXEDIR/);assert.match(helpers,/DL_UPDATES_NAME[\s\S]*DL_CACHE_FOLDER/);
  assert.doesNotMatch(helpers,/\w+::\w+/);assert.doesNotMatch(helpers,/isUpdated|GetDParameter/);
  assert.match(source,/!include FileFunc\.nsh/);
  assert.match(macro('dlGuard'),/!if "\$\{DL_BUILD_VERSION\}" != "\$\{VERSION\}"[\s\S]*!error[\s\S]*!endif/);
});

test('dlPlaceInstdir: pending-cache runs derive their folder, manual installs are forced, over-long paths are handled, and customInit uses it',()=>{
  const body=macro('dlPlaceInstdir');
  assert.match(body,/\$\{If\} \$R8 == "1"[\s\S]*DL_APP_FOLDER[\s\S]*DL_MAX_DIR[\s\S]*\$\{ElseIf\} \$R1 != "1"\s+\$\{AndIfNot\} \$\{isUpdated\}/);
  assert.match(body,/\$\{If\} \$R8 == "1"\s+\$\{AndIf\} \$\{isUpdated\}/,'the update flag is checked before the pending-cache case');
  assert.match(body,/MessageBox MB_OK\|MB_ICONSTOP/);assert.match(body,/\/SD IDOK/);assert.match(body,/\bQuit\b/);
  assert.match(macro('customInit'),/!ifndef BUILD_UNINSTALLER\s+!insertmacro dlPlaceInstdir\s+!endif/);
  assert.doesNotMatch(source,/GetDParameter/,'no dependence on /D');
});

test('interactive installs are per-user only and re-force the Downloads folder after the install-mode page (B1)',()=>{
  assert.match(macro('customInstallMode'),/StrCpy \$isForceCurrentInstall "1"/);
  const page=macro('customPageAfterChangeDir');
  assert.match(page,/Function dlReforceInstdir[\s\S]*!insertmacro dlPlaceInstdir[\s\S]*^\s*Abort\s*$[\s\S]*FunctionEnd/m);
  assert.match(page,/Page custom dlReforceInstdir/);
});

test('both uninstall strings end with _?=$INSTDIR and use the current-user flag',()=>{
  const body=macro('customInstall');
  const uninstall=/WriteRegStr SHELL_CONTEXT "\$\{UNINSTALL_REGISTRY_KEY\}" UninstallString '([^\n]*)'/.exec(body),quiet=/WriteRegStr SHELL_CONTEXT "\$\{UNINSTALL_REGISTRY_KEY\}" QuietUninstallString '([^\n]*)'/.exec(body);
  assert.ok(uninstall&&quiet,'both strings are rewritten');
  assert.ok(uninstall[1].endsWith('_?=$INSTDIR'),uninstall[1]);assert.ok(quiet[1].endsWith('_?=$INSTDIR'),quiet[1]);
  assert.match(uninstall[1],/^"\$INSTDIR\\\$\{UNINSTALL_FILENAME\}" \/currentuser /);assert.match(quiet[1],/^"\$INSTDIR\\\$\{UNINSTALL_FILENAME\}" \/currentuser \/S _\?=/);
  assert.ok(!/_\?=\$INSTDIR.+/.test(uninstall[1])&&!/_\?=\$INSTDIR.+/.test(quiet[1]),'_?= is last');
  assert.match(body,/DL_UPDATES_NAME|\$R0/,'uses the resolved root');
  assert.match(body,/README - do not delete\.txt/);
  assert.match(body,/CopyFiles \/SILENT "\$EXEPATH"/,'the existing baseline copy is kept');
});

test('customUnInstall removes only the updater cache and empty parents, never the root or a sibling version',()=>{
  const body=macro('customUnInstall');
  assert.match(body,/RMDir \/r "\$R0\\\$\{DL_UPDATES_NAME\}\\\$\{DL_CACHE_FOLDER\}"/);
  assert.match(body,/^\s*RMDir "\$R0\\\$\{DL_UPDATES_NAME\}"$/m);assert.match(body,/^\s*RMDir "\$R0"$/m);
  assert.doesNotMatch(source,/RMDir \/r "\$R0"/);assert.doesNotMatch(source,/RMDir \/r "\$R0\\\$\{DL_APP_FOLDER\}"/);assert.doesNotMatch(source,/RMDir \/r "\$R0\\\*/);
  assert.match(body,/\$\{IfNot\} \$\{isUpdated\}[\s\S]*dlRoot[\s\S]*\$\{EndIf\}/,'inside the not-updated block');
  assert.match(body,/RMDir \/r "\$LOCALAPPDATA\\\$\{APP_ID\}\\baseline"/,'existing cleanup is kept');
});

// ---- Compile and run, only when electron-builder's makensis is on this box (it installs nothing and writes no registry). ----
function makensis(){
  const candidates=[];
  if(process.env.ELECTRON_BUILDER_NSIS_DIR)candidates.push(path.join(process.env.ELECTRON_BUILDER_NSIS_DIR,'Bin','makensis.exe'));
  const cache=path.join(process.env.LOCALAPPDATA||'','electron-builder','Cache');
  try{for(const outer of fs.readdirSync(cache).filter(name=>/^nsis-\d/.test(name)))for(const inner of fs.readdirSync(path.join(cache,outer)))candidates.push(path.join(cache,outer,inner,'Bin','makensis.exe'));}catch{}
  return candidates.find(file=>fs.existsSync(file));
}

test('compiled preInit + customInit: TEMP and $INSTDIR for manual, legacy and pending-cache runs, with a space in the path',{skip:process.platform!=='win32'},t=>{
  const compiler=makensis();if(!compiler)return t.skip('makensis is not installed');
  const work=fs.mkdtempSync(path.join(os.tmpdir(),'dl-nsis-'));t.after(()=>fs.rmSync(work,{recursive:true,force:true}));
  const log=path.join(work,'result.log');
  const fake=path.join(work,'fake DL'),root=fake+'\\MelangeApplications';   // a space, as in "C:\Users\John Smith\Downloads"
  const pending=root+'\\updates\\mentat\\pending',setupFolder=(root+'\\updates\\mentat-1.0.19-setup').toLowerCase();
  fs.mkdirSync(pending,{recursive:true});
  const script=({dir,setup,build})=>`Unicode true
RequestExecutionLevel user
OutFile "${path.join(work,'harness.exe')}"
SilentInstall silent
InstallDir "$LOCALAPPDATA\\Programs\\Mentat"
Var isForceCurrentInstall
!include LogicLib.nsh
!include FileFunc.nsh
!define VERSION "1.0.19"
!define DL_BUILD_VERSION "${build}"
!define DL_ROOT_NAME "MelangeApplications"
!define DL_UPDATES_NAME "updates"
!define DL_APP_FOLDER "Mentat-1.0.19"
!define DL_SETUP_FOLDER "mentat-1.0.19-setup"
!define DL_CACHE_FOLDER "mentat"
!define DL_KNOWN_FOLDER "{374DE290-123F-4565-9164-39C4925E467B}"
!define DL_MAX_DIR ${dir}
!define DL_MAX_SETUP ${setup}
!define DL_TEST_ROOT "${root}"
!define isUpdated \`$8 == "1"\`
!include "${nshPath}"
!insertmacro customPageAfterChangeDir
Section
SectionEnd
Function .onInit
  StrCpy $0 $TEMP
  StrCpy $8 "0"
  \${GetParameters} $1
  ClearErrors
  \${GetOptions} $1 "--updated" $2
  \${IfNot} \${Errors}
    StrCpy $8 "1"
  \${EndIf}
  !insertmacro preInit
  !insertmacro customInstallMode
  !insertmacro customInit
  FileOpen $9 "${log}" w
  FileWrite $9 "original=$0$\\r$\\nTEMP=$TEMP$\\r$\\nPLUGINSDIR=$PLUGINSDIR$\\r$\\nINSTDIR=$INSTDIR$\\r$\\nFORCE=$isForceCurrentInstall$\\r$\\n"
  FileClose $9
  Quit
FunctionEnd
`;
  const compile=(limits={})=>{const nsi=path.join(work,'harness.nsi');fs.writeFileSync(nsi,script({dir:108,setup:240,build:'1.0.19',...limits}));
    const build=cp.spawnSync(compiler,['/V2',nsi],{encoding:'utf8',timeout:120000});
    if(!limits.expectFailure)assert.equal(build.status,0,build.stdout+build.stderr);return build;};
  // The temp path under os.tmpdir() is longer than the production budget, so the mechanics run with a roomy setup limit;
  // the budget itself is exercised by builds whose limits are too small to fit.
  const run=(args,{from=work}={})=>{
    fs.rmSync(log,{force:true});const exe=path.join(from,'run-harness.exe');fs.copyFileSync(path.join(work,'harness.exe'),exe);
    cp.spawnSync(exe,args,{timeout:60000});return fs.existsSync(log)?fs.readFileSync(log,'utf8'):'';};
  const field=(text,name)=>new RegExp('^'+name+'=(.*)\\r?$','m').exec(text)?.[1]??'';
  const same=(a,b)=>a.toLowerCase()===b.toLowerCase();
  compile();

  // Manual / first install from the browser: TEMP moves, $INSTDIR is forced, per-user only.
  const manual=run(['/S']);
  assert.ok(field(manual,'PLUGINSDIR').toLowerCase().startsWith(setupFolder+'\\'),manual);assert.ok(same(field(manual,'TEMP'),root+'\\updates\\mentat-1.0.19-setup'),manual);
  assert.ok(same(field(manual,'INSTDIR'),root+'\\Mentat-1.0.19'),manual);assert.equal(field(manual,'FORCE'),'1');
  // An old-layout in-place update (--updated, outside the root, not from the pending cache): Paul's PC. Nothing moves.
  const legacy=run(['--updated','/S']);
  assert.equal(field(legacy,'TEMP'),field(legacy,'original'),legacy);assert.equal(field(legacy,'PLUGINSDIR'),'');
  assert.match(field(legacy,'INSTDIR'),/\\Programs\\Mentat$/i,'the registered/default location is kept');
  // An update run from the pending cache, under a root with a space and WITHOUT /D: the installer derives its own folder (B2).
  const updated=run(['--updated','/S'],{from:pending});
  assert.ok(field(updated,'PLUGINSDIR').toLowerCase().startsWith(setupFolder+'\\'),updated);assert.ok(same(field(updated,'INSTDIR'),root+'\\Mentat-1.0.19'),updated);
  // Even if a /D= with a space is passed (Node quotes it and NSIS ignores it), the result is the same.
  const quoted=run(['--updated','/S','/D='+root+'\\Mentat-1.0.20'],{from:pending});
  assert.ok(same(field(quoted,'INSTDIR'),root+'\\Mentat-1.0.19'),quoted);assert.ok(field(quoted,'PLUGINSDIR').toLowerCase().startsWith(setupFolder+'\\'),quoted);
  // Budget cases: a setup folder over its limit leaves TEMP alone; an over-long manual folder is refused (Quit, no log);
  // an over-long update folder keeps the registered location.
  compile({setup:5});
  const noMove=run(['/S']);assert.equal(field(noMove,'TEMP'),field(noMove,'original'),noMove);
  compile({dir:5});
  assert.equal(run(['/S']),'','a manual install whose folder would be too long quits instead of installing elsewhere');
  assert.equal(run(['/S'],{from:pending}),'','a manual (not --updated) run from the pending cache with a too-long path is refused too (LOW-3)');
  const kept=run(['--updated','/S'],{from:pending});assert.match(field(kept,'INSTDIR'),/\\Programs\\Mentat$/i,kept);
  // A generated include from another build fails the compile.
  const stale=compile({build:'1.0.18',expectFailure:true});
  assert.notEqual(stale.status,0);assert.match(stale.stdout+stale.stderr,/stale/);
});

test('compiled customUnInstall removes the README and the root only when nothing else is left (LOW-2)',{skip:process.platform!=='win32'},t=>{
  const compiler=makensis();if(!compiler)return t.skip('makensis is not installed');
  const work=fs.mkdtempSync(path.join(os.tmpdir(),'dl-nsis-un-'));t.after(()=>fs.rmSync(work,{recursive:true,force:true}));
  const root=work+'\\fake DL\\MelangeApplications';
  const nsi=`Unicode true
RequestExecutionLevel user
OutFile "${path.join(work,'un-harness.exe')}"
SilentInstall silent
!include LogicLib.nsh
!include FileFunc.nsh
!define VERSION "1.0.19"
!define APP_ID "dl.harness.test.nonexistent"
!define DL_BUILD_VERSION "1.0.19"
!define DL_ROOT_NAME "MelangeApplications"
!define DL_UPDATES_NAME "updates"
!define DL_APP_FOLDER "Mentat-1.0.19"
!define DL_SETUP_FOLDER "mentat-1.0.19-setup"
!define DL_CACHE_FOLDER "mentat"
!define DL_KNOWN_FOLDER "{374DE290-123F-4565-9164-39C4925E467B}"
!define DL_MAX_DIR 108
!define DL_MAX_SETUP 88
!define DL_TEST_ROOT "${root}"
!define isUpdated \`$8 == "1"\`
!include "${nshPath}"
Section
SectionEnd
Function .onInit
  StrCpy $8 "0"
  !insertmacro customUnInstall
  Quit
FunctionEnd
`;
  fs.writeFileSync(path.join(work,'un-harness.nsi'),nsi);
  const build=cp.spawnSync(compiler,['/V2',path.join(work,'un-harness.nsi')],{encoding:'utf8',timeout:120000});assert.equal(build.status,0,build.stdout+build.stderr);
  const scenario=(extra)=>{
    fs.rmSync(path.join(work,'fake DL'),{recursive:true,force:true});
    fs.mkdirSync(root+'\\updates\\mentat\\pending',{recursive:true});fs.writeFileSync(root+'\\updates\\mentat\\pending\\x.exe','x');
    fs.writeFileSync(root+'\\README - do not delete.txt','readme');
    for(const item of extra){fs.mkdirSync(root+'\\'+item,{recursive:true});fs.writeFileSync(root+'\\'+item+'\\keep.txt','x');}
    cp.spawnSync(path.join(work,'un-harness.exe'),['/S'],{timeout:60000});
  };
  scenario([]);
  assert.equal(fs.existsSync(root),false,'the last app out removes the README and the root');
  scenario(['Melange-1.0.19']);
  assert.equal(fs.existsSync(root+'\\updates'),false,'this app\'s cache and the empty updates folder go');
  assert.equal(fs.existsSync(root+'\\README - do not delete.txt'),true,'the README stays while another app is installed');
  assert.equal(fs.existsSync(root+'\\Melange-1.0.19\\keep.txt'),true,'another app\'s folder is never touched');
  scenario(['notes']);
  assert.equal(fs.existsSync(root+'\\notes\\keep.txt'),true,'a user folder keeps the root');
});
