'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const layout=require('../install-layout.cjs');
const {LAYOUT}=layout;
const D='C:\\U\\Downloads';
const ROOT=D+'\\MelangeApplications';

function tree(t){
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'dl-'));t.after(()=>fs.rmSync(base,{recursive:true,force:true}));
  const downloads=path.join(base,'Downloads'),documents=path.join(base,'Documents'),localAppData=path.join(base,'AppData','Local');
  const root=path.join(downloads,'MelangeApplications');
  fs.mkdirSync(root,{recursive:true});fs.mkdirSync(documents,{recursive:true});fs.mkdirSync(localAppData,{recursive:true});
  const make=(directory,files=[])=>{fs.mkdirSync(directory,{recursive:true});for(const file of files){const target=path.join(directory,...file.split('/'));fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,'x');}};
  const program=directory=>make(directory,['Mentat.exe','resources/app.asar']);
  const exists=target=>fs.existsSync(target);
  const execPath=path.join(root,'Mentat-1.0.20','Mentat.exe');
  const options=(extra={})=>({fs,downloads,home:base,documents,localAppData,applicationId:'com.melange.mentat',userData:path.join(documents,'MelangeApplicationState','mentat'),execPath,product:'Mentat',app:'mentat',current:'1.0.20',state:{},log:()=>{},...extra});
  return {base,downloads,documents,localAppData,root,make,program,exists,execPath,options};
}

test('naming: every folder name comes from the one config point',()=>{
  assert.equal(layout.root(D),ROOT);
  assert.equal(layout.appDirectory(D,'Melange','1.0.19'),ROOT+'\\Melange-1.0.19');
  assert.equal(layout.appDirectory(D,'Mentat','1.0.19'),ROOT+'\\Mentat-1.0.19');
  assert.equal(layout.updaterCacheDirectory(D,'mentat'),ROOT+'\\updates\\mentat');
  assert.equal(layout.setupTempDirectory(D,'mentat','1.0.19'),ROOT+'\\updates\\mentat-setup');
  assert.equal(layout.fill('{product}-{version}-{app}',{product:'P',app:'a',version:'1.2.3'}),'P-1.2.3-a');
  assert.equal(LAYOUT.keepVersions,2);assert.equal(LAYOUT.rollbackFloor,'1.0.19');assert.equal(LAYOUT.maxPath,259);
  assert.ok(Object.isFrozen(LAYOUT));
});

test('nsisInclude defines each value from the config and includes installer.nsh by absolute path',()=>{
  const text=layout.nsisInclude({product:'Mentat',app:'mentat',version:'1.0.19',installerNsh:'C:\\x\\client\\installer.nsh'});
  for(const line of ['!define DL_ROOT_NAME "MelangeApplications"','!define DL_UPDATES_NAME "updates"','!define DL_APP_FOLDER "Mentat-1.0.19"','!define DL_SETUP_FOLDER "mentat-setup"','!define DL_CACHE_FOLDER "mentat"',
    '!define DL_KNOWN_FOLDER "{374DE290-123F-4565-9164-39C4925E467B}"','!define DL_BUILD_VERSION "1.0.19"','!define DL_MAX_DIR 108','!define DL_MAX_SETUP 88','!include "C:\\x\\client\\installer.nsh"'])
    assert.ok(text.split(/\r?\n/).includes(line),line+'\n'+text);
  assert.equal(LAYOUT.maxPath-LAYOUT.deepestRelativeBudget-1,108);assert.equal(LAYOUT.maxPath-LAYOUT.deepestRelativeBudget-LAYOUT.pluginsDirOverhead-1,88);
});

test('F2: the versionless setup folder keeps NSIS plugins under Downloads for user names up to 28 characters',()=>{
  // installer.nsh moves TEMP only when the setup path is <= DL_MAX_SETUP (88); the 1.0.19 name allowed 21 characters.
  const maxSetup=LAYOUT.maxPath-LAYOUT.deepestRelativeBudget-LAYOUT.pluginsDirOverhead-1;
  const setup=user=>layout.setupTempDirectory('C:\\Users\\'+user+'\\Downloads','mentat','1.0.19');
  assert.equal(layout.setupTempDirectory(D,'mentat','9.99.999'),layout.setupTempDirectory(D,'mentat','1.0.19'),'no version in the name');
  assert.equal(setup('u'.repeat(28)).length<=maxSetup,true);assert.equal(setup('u'.repeat(29)).length<=maxSetup,false);
  assert.equal(('C:\\Users\\'+'u'.repeat(22)+'\\Downloads\\MelangeApplications\\updates\\'+layout.fill(LAYOUT.legacySetupFolder,{app:'mentat',version:'1.0.19'})).length<=maxSetup,false,'the old name did not fit at 22');
});

test('downloadsMode is the single switch: only an exec under the Downloads root, in any case',()=>{
  const mode=execPath=>layout.downloadsMode({execPath,downloads:D});
  assert.equal(mode(ROOT+'\\Mentat-1.0.19\\Mentat.exe'),true);
  assert.equal(mode(ROOT.toUpperCase()+'\\MENTAT-1.0.19\\MENTAT.EXE'),true);
  assert.equal(mode('C:\\Users\\p\\Documents\\MelangeApplications\\Mentat\\Mentat.exe'),false,'Paul: Documents');
  assert.equal(mode('C:\\Users\\p\\AppData\\Local\\Programs\\Mentat\\Mentat.exe'),false);
  assert.equal(mode(D+'\\MelangeApplications2\\Mentat-1.0.19\\Mentat.exe'),false,'prefix trap');
  assert.equal(mode(D+'\\Mentat-1.0.19\\Mentat.exe'),false,'not under the root');
  assert.equal(mode(ROOT),true);assert.equal(mode(D+'\\MelangeApplicationsX'),false);
  assert.equal(layout.downloadsMode({execPath:ROOT+'\\a',downloads:null}),false);
  assert.equal(layout.isUnder('C:\\A\\b','C:\\a'),true);assert.equal(layout.isUnder('C:\\AB','C:\\A'),false);assert.equal(layout.isUnder('D:\\A','C:\\A'),false);
});

test('fitsPath and deepestRelative implement the long-path budget',t=>{
  const exact='C:\\'+'a'.repeat(LAYOUT.maxPath-LAYOUT.deepestRelativeBudget-1-3);
  assert.equal(exact.length,108);assert.equal(layout.fitsPath(exact),true);assert.equal(layout.fitsPath(exact+'a'),false);
  const base=fs.mkdtempSync(path.join(os.tmpdir(),'dl-'));t.after(()=>fs.rmSync(base,{recursive:true,force:true}));
  fs.mkdirSync(path.join(base,'a','bb'),{recursive:true});fs.writeFileSync(path.join(base,'a','bb','c.txt'),'x');fs.writeFileSync(path.join(base,'z'),'x');
  assert.equal(layout.deepestRelative(base),'a\\bb\\c.txt'.length);
  assert.equal(layout.deepestRelative(path.join(base,'nowhere')),0);
});

test('pruneTargets keeps current plus the newest, honours protected versions, ignores everything else',()=>{
  const entries=['Mentat-1.0.17','Mentat-1.0.18','Mentat-1.0.19','Mentat-1.0.20','Melange-1.0.17','Mentat.bak-20261020','Mentat-1.0.19-old','Mentat-1.0.16.bak','updates','README - do not delete.txt','Mentat-1.0'];
  const run=protect=>layout.pruneTargets({entries,product:'Mentat',current:'1.0.20',protect,keep:2}).sort();
  assert.deepEqual(run([]),['Mentat-1.0.17','Mentat-1.0.18']);
  assert.deepEqual(run(['1.0.18']),['Mentat-1.0.17','Mentat-1.0.19']);
  assert.deepEqual(run(['1.0.18','1.0.19','1.0.17']),[],'protected versions are never deleted, even beyond keep');
  assert.deepEqual(run([undefined,null,'not-a-version']),['Mentat-1.0.17','Mentat-1.0.18']);
  assert.deepEqual(layout.pruneTargets({entries:['Mentat-1.0.19'],product:'Mentat',current:'1.0.20',protect:[],keep:2}),[]);
  assert.ok(!run([]).some(name=>/^Melange/.test(name)&&!/^Mentat/.test(name)));
});

test('sweep prunes old version folders; a junction, the exec dir and unrelated names survive',async t=>{
  const f=tree(t);
  for(const v of ['1.0.17','1.0.18','1.0.19','1.0.20'])f.program(path.join(f.root,'Mentat-'+v));
  f.make(path.join(f.root,'Melange-1.0.17'));f.make(path.join(f.root,'Mentat.bak-20261020'));f.make(path.join(f.root,'Mentat-1.0.19-old'));
  const target=path.join(f.base,'junction-target');fs.mkdirSync(target);fs.writeFileSync(path.join(target,'keep.txt'),'x');
  fs.symlinkSync(target,path.join(f.root,'Mentat-1.0.16'),'junction');
  const logs=[];
  await layout.sweep(f.options({log:m=>logs.push(m)}));
  assert.equal(f.exists(path.join(f.root,'Mentat-1.0.17')),false);assert.equal(f.exists(path.join(f.root,'Mentat-1.0.18')),false);
  assert.equal(f.exists(path.join(f.root,'Mentat-1.0.19')),true);assert.equal(f.exists(path.join(f.root,'Mentat-1.0.20')),true);
  for(const keep of ['Melange-1.0.17','Mentat.bak-20261020','Mentat-1.0.19-old'])assert.equal(f.exists(path.join(f.root,keep)),true,keep);
  assert.equal(f.exists(path.join(target,'keep.txt')),true,'the junction target is untouched');
  assert.equal(fs.lstatSync(path.join(f.root,'Mentat-1.0.16')).isSymbolicLink(),true,'the junction itself is skipped');
  assert.ok(logs.some(m=>/Mentat-1\.0\.17/.test(m)),'each removal is logged');
});

test('sweep keeps the pending, previous and live rollback versions',async t=>{
  const f=tree(t);
  for(const v of ['1.0.16','1.0.17','1.0.18','1.0.19','1.0.20'])f.program(path.join(f.root,'Mentat-'+v));
  await layout.sweep(f.options({state:{pending:{version:'1.0.16'},previous:{version:'1.0.18'},recovery:{phase:'prepared',target:{version:'1.0.17'}}}}));
  assert.equal(f.exists(path.join(f.root,'Mentat-1.0.19')),false,'the only unprotected old folder is removed');
  for(const v of ['1.0.16','1.0.17','1.0.18','1.0.20'])assert.equal(f.exists(path.join(f.root,'Mentat-'+v)),true,v);
  const g=tree(t);for(const v of ['1.0.17','1.0.18','1.0.20'])g.program(path.join(g.root,'Mentat-'+v));
  await layout.sweep(g.options({state:{recovery:{phase:'completed',target:{version:'1.0.17'}}}}));
  assert.equal(g.exists(path.join(g.root,'Mentat-1.0.17')),false,'a finished rollback no longer protects its target');
});

test('sweep keeps the installed version (F1) even when it is older than the newest ones',async t=>{
  const f=tree(t);
  for(const v of ['1.0.16','1.0.17','1.0.18','1.0.19','1.0.20'])f.program(path.join(f.root,'Mentat-'+v));
  await layout.sweep(f.options({state:{installed:{version:'1.0.16'},previous:{version:'1.0.19'}}}));
  for(const v of ['1.0.16','1.0.19','1.0.20'])assert.equal(f.exists(path.join(f.root,'Mentat-'+v)),true,v);
  for(const v of ['1.0.17','1.0.18'])assert.equal(f.exists(path.join(f.root,'Mentat-'+v)),false,v);
});

test('sweep does nothing when the root itself is a junction (L3)',async t=>{
  const f=tree(t),real=path.join(f.base,'elsewhere');
  for(const v of ['1.0.17','1.0.18','1.0.19'])f.program(path.join(real,'Mentat-'+v));
  fs.rmSync(f.root,{recursive:true,force:true});fs.symlinkSync(real,f.root,'junction');
  const logs=[];await layout.sweep(f.options({log:m=>logs.push(m),execPath:path.join(f.root,'Mentat-1.0.20','Mentat.exe')}));
  for(const v of ['1.0.17','1.0.18','1.0.19'])assert.equal(f.exists(path.join(real,'Mentat-'+v,'Mentat.exe')),true,v);
  assert.ok(logs.some(m=>/not a plain directory/.test(m)));
});

test('sweep keeps the live versionless setup folder and removes the 1.0.19-style versioned leftovers',async t=>{
  const f=tree(t),updates=path.join(f.root,'updates');
  for(const name of ['mentat-1.0.18-setup','mentat-1.0.19-setup','mentat-1.0.20-setup','mentat-1.0.21-setup','mentat-setup'])f.make(path.join(updates,name));
  f.make(path.join(updates,'mentat','pending'),['mentat-1.0.21-win32-x64.exe']);f.make(path.join(updates,'melange-1.0.18-setup'));f.make(path.join(updates,'melange-setup'));
  await layout.sweep(f.options({state:{pending:{version:'1.0.21'}}}));
  for(const v of ['1.0.18','1.0.19','1.0.20','1.0.21'])assert.equal(f.exists(path.join(updates,'mentat-'+v+'-setup')),false,v);
  assert.equal(f.exists(path.join(updates,'mentat-setup')),true,'current and pending share the live folder');
  assert.equal(f.exists(path.join(updates,'melange-setup')),true,'another app is never touched');
  assert.equal(f.exists(path.join(updates,'mentat','pending','mentat-1.0.21-win32-x64.exe')),true,'the updater cache is not a setup folder');
  assert.equal(f.exists(path.join(updates,'melange-1.0.18-setup')),true,'another app is never touched');
});

test('legacyCandidates returns only the three exact D-4 folders, de-duplicated',()=>{
  assert.deepEqual(layout.legacyCandidates({product:'Mentat',home:'C:\\U',documents:'C:\\U\\Documents',localAppData:'C:\\U\\AppData\\Local'}),
    ['C:\\U\\Documents\\MelangeApplications\\Mentat','C:\\U\\AppData\\Local\\Programs\\Mentat']);
  assert.deepEqual(layout.legacyCandidates({product:'Mentat',home:'C:\\U',documents:'D:\\Docs',localAppData:'C:\\U\\AppData\\Local'}),
    ['D:\\Docs\\MelangeApplications\\Mentat','C:\\U\\Documents\\MelangeApplications\\Mentat','C:\\U\\AppData\\Local\\Programs\\Mentat']);
});

test('legacy cleanup is a no-op when the layout is not active (Paul: Documents)',async t=>{
  const f=tree(t),legacy=path.join(f.documents,'MelangeApplications','Mentat');
  f.program(legacy);f.make(path.join(f.documents,'MelangeApplications','Mentat.bak-20261020'),['Mentat.exe']);
  const documentsExec=path.join(legacy,'Mentat.exe');
  await layout.sweep(f.options({execPath:documentsExec}));
  assert.equal(f.exists(path.join(legacy,'Mentat.exe')),true);assert.equal(f.exists(path.join(f.documents,'MelangeApplications','Mentat.bak-20261020','Mentat.exe')),true);
  for(const v of ['1.0.17','1.0.18','1.0.19'])f.program(path.join(f.root,'Mentat-'+v));
  await layout.sweep(f.options({execPath:documentsExec}));
  assert.equal(f.exists(path.join(f.root,'Mentat-1.0.17')),true,'no pruning either');
});

test('legacy cleanup deletes only the exact program folders; .bak siblings and state survive',async t=>{
  const f=tree(t),legacy=path.join(f.documents,'MelangeApplications','Mentat'),programs=path.join(f.localAppData,'Programs','Mentat');
  f.program(legacy);f.program(programs);
  f.make(path.join(f.documents,'MelangeApplications','Mentat.bak-20261020'),['Mentat.exe','resources/app.asar']);
  f.make(path.join(f.documents,'MelangeApplicationState','mentat'),['settings.json']);f.make(path.join(f.localAppData,'MelangeData'),['d.txt']);
  f.make(path.join(f.localAppData,'com.melange.mentat','updater'),['u.txt']);f.program(path.join(f.root,'Mentat-1.0.20'));
  const logs=[];await layout.sweep(f.options({log:m=>logs.push(m)}));
  assert.equal(f.exists(legacy),false);assert.equal(f.exists(programs),false);
  assert.equal(f.exists(path.join(f.documents,'MelangeApplications','Mentat.bak-20261020','Mentat.exe')),true);
  assert.equal(f.exists(path.join(f.documents,'MelangeApplicationState','mentat','settings.json')),true);
  assert.equal(f.exists(path.join(f.localAppData,'MelangeData','d.txt')),true);assert.equal(f.exists(path.join(f.localAppData,'com.melange.mentat','updater','u.txt')),true);
  assert.equal(f.exists(path.join(f.root,'Mentat-1.0.20','Mentat.exe')),true,'the running copy');
  assert.ok(logs.some(m=>/MelangeApplications.Mentat/.test(m)));
});

test('legacy cleanup keeps a folder that is not a program folder, a junction, or the running folder',async t=>{
  const f=tree(t),legacy=path.join(f.documents,'MelangeApplications','Mentat');
  f.make(legacy,['resources/app.asar']);
  await layout.sweep(f.options());assert.equal(f.exists(path.join(legacy,'resources','app.asar')),true,'no Mentat.exe');
  fs.rmSync(legacy,{recursive:true});f.make(legacy,['Mentat.exe']);
  await layout.sweep(f.options());assert.equal(f.exists(path.join(legacy,'Mentat.exe')),true,'no app.asar');
  fs.rmSync(legacy,{recursive:true});
  const target=path.join(f.base,'real-program');f.program(target);fs.mkdirSync(path.dirname(legacy),{recursive:true});fs.symlinkSync(target,legacy,'junction');
  await layout.sweep(f.options());assert.equal(f.exists(path.join(target,'Mentat.exe')),true,'the junction target is untouched');assert.equal(fs.lstatSync(legacy).isSymbolicLink(),true);
  fs.rmSync(legacy,{recursive:true,force:true});
  // The parent is a link: the program is behind it, so it is not removed.
  const outside=path.join(f.base,'outside');f.program(path.join(outside,'Mentat'));fs.rmSync(path.join(f.documents,'MelangeApplications'),{recursive:true,force:true});
  fs.symlinkSync(outside,path.join(f.documents,'MelangeApplications'),'junction');
  await layout.sweep(f.options());assert.equal(f.exists(path.join(outside,'Mentat','Mentat.exe')),true,'a linked parent is refused');
});

test('legacy cleanup never removes the running folder, the profile, or anything holding the Downloads root',async t=>{
  // Documents is redirected into Downloads, so the candidate is the folder the app is running from (and is under the root).
  const f=tree(t),running=path.join(f.root,'Mentat');f.program(running);
  await layout.sweep(f.options({documents:f.downloads,execPath:path.join(running,'Mentat.exe')}));
  assert.equal(f.exists(path.join(running,'Mentat.exe')),true,'the running folder survives');
  const g=tree(t),inside=path.join(g.documents,'MelangeApplications','Mentat');g.program(inside);
  await layout.sweep(g.options({userData:path.join(inside,'profile')}));
  assert.equal(g.exists(path.join(inside,'Mentat.exe')),true,'the profile overlaps the candidate');
  const h=tree(t),state=path.join(h.documents,'MelangeApplications','Mentat');h.program(state);
  await layout.sweep(h.options({userData:path.dirname(state)}));
  assert.equal(h.exists(path.join(state,'Mentat.exe')),true,'a profile that contains the candidate protects it');
});

test('a busy file is logged and left; the sweep never throws',async t=>{
  const f=tree(t),legacy=path.join(f.documents,'MelangeApplications','Mentat');f.program(legacy);
  const logs=[],real=fs.promises.rm;
  const fake={...fs,promises:{...fs.promises,rm:async()=>{throw Object.assign(new Error('EBUSY: resource busy'),{code:'EBUSY'});}}};
  await layout.sweep(f.options({fs:fake,log:m=>logs.push(m)}));void real;
  assert.equal(f.exists(path.join(legacy,'Mentat.exe')),true);assert.ok(logs.some(m=>/EBUSY/.test(m)));
  const gone=tree(t);await layout.sweep(gone.options({downloads:path.join(gone.base,'nowhere')}));
});

test('downloadsWarnings: redirect, OneDrive, Storage Sense, policy, and none',()=>{
  const home='C:\\Users\\p',base={downloads:home+'\\Downloads',home,env:{},storagePolicy:{},storagePolicyGpo:{}};
  assert.deepEqual(layout.downloadsWarnings(base),[]);
  assert.deepEqual(layout.downloadsWarnings({...base,storagePolicy:{'01':1,'32':0,'512':0}}),[],'Paul: Storage Sense on, Downloads cleanup off');
  const redirect=layout.downloadsWarnings({...base,downloads:'D:\\Data\\Downloads'});
  assert.equal(redirect.length,1);assert.match(redirect[0],/redirected to D:\\Data\\Downloads\./);assert.match(redirect[0],/Tell IT/);
  const oneDrive=layout.downloadsWarnings({...base,downloads:home+'\\OneDrive - Co\\Downloads',env:{OneDriveCommercial:home+'\\OneDrive - Co'}});
  assert.ok(oneDrive.some(w=>/inside OneDrive \(C:\\Users\\p\\OneDrive - Co\\Downloads\)/.test(w)));
  assert.ok(oneDrive.some(w=>/redirected/.test(w)));
  assert.equal(layout.downloadsWarnings({...base,downloads:home+'\\OneDriveX\\Downloads',env:{OneDrive:home+'\\OneDrive'}}).some(w=>/OneDrive \(/.test(w)),false,'prefix trap');
  const storage=layout.downloadsWarnings({...base,storagePolicy:{'01':1,'32':1,'512':30}});
  assert.equal(storage.length,1);assert.match(storage[0],/not opened for 30 days/);assert.ok(storage[0].includes(home+'\\Downloads\\MelangeApplications'));
  for(const off of [{'01':0,'32':1,'512':30},{'01':1,'32':0,'512':30},{'01':1,'32':1,'512':0}])assert.deepEqual(layout.downloadsWarnings({...base,storagePolicy:off}),[]);
  const gpo=layout.downloadsWarnings({...base,storagePolicyGpo:{ConfigStorageSenseDownloadsCleanupThreshold:14}});
  assert.equal(gpo.length,1);assert.match(gpo[0],/14 days/);assert.match(gpo[0],/\(set by policy\)/);assert.ok(gpo[0].includes(home+'\\Downloads\\MelangeApplications'));
  assert.deepEqual(layout.downloadsWarnings({...base,storagePolicyGpo:{ConfigStorageSenseDownloadsCleanupThreshold:14,AllowStorageSenseGlobal:0}}),[]);
  assert.deepEqual(layout.downloadsWarnings({...base,storagePolicyGpo:{ConfigStorageSenseDownloadsCleanupThreshold:0}}),[]);
});

test('parseRegistry and readRegistry read reg.exe output without ever throwing',async()=>{
  const text='\r\nHKEY_CURRENT_USER\\Software\\X\r\n    01    REG_DWORD    0x1\r\n    512    REG_DWORD    0x1e\r\n    Name    REG_SZ    some value\r\n    Empty    REG_SZ    \r\n\r\n';
  assert.deepEqual(layout.parseRegistry(text),{'01':1,'512':30,Name:'some value',Empty:''});
  const calls=[];
  const execFile=(file,args,options,callback)=>{calls.push([file,args]);callback(null,text);};
  const values=await layout.readRegistry(execFile,'HKCU\\Software\\X',{SystemRoot:'C:\\Windows'});
  assert.equal(values['512'],30);assert.equal(calls[0][0],'C:\\Windows\\System32\\reg.exe');assert.deepEqual(calls[0][1],['query','HKCU\\Software\\X']);
  assert.deepEqual(await layout.readRegistry((f,a,o,cb)=>cb(new Error('missing')),'HKCU\\Nope',{SystemRoot:'C:\\Windows'}),{});
});
