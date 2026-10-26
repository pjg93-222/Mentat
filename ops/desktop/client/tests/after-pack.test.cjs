'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const afterPack=require('../after-pack.cjs');

function pack(t,files){
  const appOutDir=fs.mkdtempSync(path.join(os.tmpdir(),'after-pack-'));t.after(()=>fs.rmSync(appOutDir,{recursive:true,force:true}));
  for(const relative of files){const target=path.join(appOutDir,'resources','runtime',...relative.split('/'));fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,'x');}
  return {appOutDir,exists:relative=>fs.existsSync(path.join(appOutDir,'resources','runtime',...relative.split('/')))};
}
const quiet=async(context)=>{const original=console.log,lines=[];console.log=line=>lines.push(line);try{await afterPack(context);}finally{console.log=original;}return lines;};

const THIRD_PARTY=['mentat/python/Lib/site-packages/pyproj/proj_dir/share/proj/proj.db','mentat/python/Lib/site-packages/pyogrio/proj_data/proj.db','mentat/native/R/doc/KEYWORDS.db',
  'mentat/native/R/share/licenses/license.db','mentat/native/R/library/RSQLite/db/datasets.sqlite','mentat/python/lib/x.sqlite3','mentat/python/state/readme.txt'];

test('state directories and databases under runtime/<app>/sources are removed and logged, and the build continues',async t=>{
  const planted=['mentat/sources/mentat/state/prewarm/access.sqlite','mentat/sources/mentat/state/prewarm/access.sqlite-wal','mentat/sources/mentat/state/prewarm/access.sqlite-shm',
    'mentat/sources/x/app/foo.db','mentat/sources/app/Cache/A.DB-WAL','mentat/sources/a/b/c/STATE/x.txt','terrier/Sources/app/d.sqlite3','mentat/sources/app/j.sqlite-journal'];
  const keep=['mentat/sources/app/server.py','mentat/sources/app/statement.txt',...THIRD_PARTY];
  const context=pack(t,[...planted,...keep]);
  const lines=await quiet(context);
  for(const file of planted)assert.equal(context.exists(file),false,file);
  assert.equal(context.exists('mentat/sources/mentat/state'),false,'the whole state directory is gone');
  for(const file of keep)assert.equal(context.exists(file),true,file+' must survive');
  assert.ok(lines.some(line=>/removed .*mentat.state$/.test(line))&&lines.some(line=>/removed .*foo\.db$/.test(line)),'each removed path is logged');
  assert.ok(lines.some(line=>/packing report: removed \d+ state\/database path/.test(line)));
});

test('a runtime without sources, or without a runtime at all, packs cleanly',async t=>{
  const context=pack(t,[...THIRD_PARTY]);await quiet(context);for(const file of THIRD_PARTY)assert.equal(context.exists(file),true,file);
  await quiet({appOutDir:path.join(context.appOutDir,'nowhere')});
});

test('builder wires the strip step as afterPack and keeps its glob filter inside sources',()=>{
  const source=fs.readFileSync(path.join(__dirname,'..','builder.cjs'),'utf8');
  assert.match(source,/afterPack:path\.join\(__dirname,'after-pack\.cjs'\)/);
  assert.ok(source.includes("'!sources/**/state/**'")&&source.includes("'!sources/**/*.{"),'filter patterns stay under sources/');
  assert.ok(!require('../release-files.cjs').includes('after-pack.cjs'),'build-time only, not shipped in the app');
});

test('an unreadable directory under sources is logged and skipped; the rest is still stripped and the build continues',async t=>{
  const context=pack(t,['mentat/sources/locked/a.sqlite','mentat/sources/app/b.db']);
  const locked=path.join(context.appOutDir,'resources','runtime','mentat','sources','locked'),read=fs.readdirSync;
  fs.readdirSync=(directory,...rest)=>{if(path.resolve(String(directory))===locked)throw Object.assign(new Error('EACCES: permission denied'),{code:'EACCES'});return read.call(fs,directory,...rest);};
  let lines;try{lines=await quiet(context);}finally{fs.readdirSync=read;}
  assert.equal(context.exists('mentat/sources/app/b.db'),false,'the readable branch is still stripped');
  assert.ok(lines.some(line=>/could not read .*locked: EACCES/.test(line)),'the unreadable directory is logged');
});

// Downloads layout: afterPack writes the generated NSIS include and is the build-time long-path gate.
const layout=require('../install-layout.cjs');
function packaged(t,{depth=''}={}){
  const output=fs.mkdtempSync(path.join(os.tmpdir(),'after-pack-out-'));t.after(()=>fs.rmSync(output,{recursive:true,force:true}));
  const appOutDir=path.join(output,'win-unpacked');fs.mkdirSync(path.join(appOutDir,'resources'),{recursive:true});
  fs.writeFileSync(path.join(appOutDir,'Mentat.exe'),'x');
  if(depth){const target=path.join(appOutDir,depth);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,'x');}
  const packager={appInfo:{productName:'Mentat',version:'1.0.19'},config:{extraMetadata:{desktopAppConfig:{appId:'mentat'}}}};
  return {output,appOutDir,packager,context:{appOutDir,packager}};
}

test('afterPack writes installer.generated.nsh beside win-unpacked, from the one config point',async t=>{
  const p=packaged(t);await quiet(p.context);
  const file=path.join(p.output,'installer.generated.nsh'),text=fs.readFileSync(file,'utf8');
  assert.equal(text,layout.nsisInclude({product:'Mentat',app:'mentat',version:'1.0.19',installerNsh:path.join(__dirname,'..','installer.nsh')}));
  assert.match(text,/!define DL_APP_FOLDER "Mentat-1\.0\.19"/);assert.match(text,/!define DL_SETUP_FOLDER "mentat-setup"/);assert.match(text,/!define DL_CACHE_FOLDER "mentat"/);
  assert.ok(fs.existsSync(path.join(__dirname,'..','installer.nsh')),'the included installer.nsh exists');
});

test('afterPack throws when the packed tree is deeper than the budget, and logs the depth when it is not',async t=>{
  const within=packaged(t,{depth:'a'.repeat(layout.LAYOUT.deepestRelativeBudget)});
  const lines=await quiet(within.context);assert.ok(lines.some(line=>/\[after-pack\] deepest relative path: 150 \(budget 150\)/.test(line)),lines.join('\n'));
  const over=packaged(t,{depth:'a'.repeat(layout.LAYOUT.deepestRelativeBudget+1)});
  await assert.rejects(()=>quiet(over.context),/deepest relative path is 151 characters, over the 150 budget/);
  assert.equal(fs.existsSync(path.join(over.output,'installer.generated.nsh')),false,'no include is written for a tree that fails the gate');
});

test('afterPack still strips state while gating, and a context without a packager only gates',async t=>{
  const p=packaged(t);fs.mkdirSync(path.join(p.appOutDir,'resources','runtime','mentat','sources','a','state'),{recursive:true});
  fs.writeFileSync(path.join(p.appOutDir,'resources','runtime','mentat','sources','a','state','x.txt'),'x');
  await quiet(p.context);assert.equal(fs.existsSync(path.join(p.appOutDir,'resources','runtime','mentat','sources','a','state')),false);
  const bare=packaged(t);await quiet({appOutDir:bare.appOutDir});assert.equal(fs.existsSync(path.join(bare.output,'installer.generated.nsh')),false);
});

test('builder points nsis.include at the generated file, forbids changing the folder, and writes nothing itself',()=>{
  const source=fs.readFileSync(path.join(__dirname,'..','builder.cjs'),'utf8');
  assert.match(source,/allowToChangeInstallationDirectory:false/);assert.doesNotMatch(source,/allowToChangeInstallationDirectory:true/);
  assert.match(source,/include:path\.join\(outputDirectory,'installer\.generated\.nsh'\)/);
  assert.match(source,/oneClick:false,perMachine:false/);
  assert.doesNotMatch(source,/writeFileSync/);
});
