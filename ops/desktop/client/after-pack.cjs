'use strict';
// electron-builder afterPack: strip Mentat user state and runtime databases out of the packed Mentat/app sources.
// Only resources/runtime/<app>/sources/** is touched; third-party files elsewhere (proj.db, R's KEYWORDS.db and
// license.db, RSQLite's datasets.sqlite, ...) are legitimate and survive. Each removal is logged; this never fails
// the build. The extraResources glob filter in builder.cjs is case-sensitive and shallow, so this is the real guard.
const fs=require('node:fs'),path=require('node:path');
const layout=require('./install-layout.cjs');
const DATABASE_SUFFIXES=['.sqlite','.sqlite3','.db','-wal','-shm','-journal'];
function stripState(runtimeRoot,log=()=>{}){
  const removed=[];
  const remove=full=>{try{fs.rmSync(full,{recursive:true,force:true});removed.push(full);log('[after-pack] removed '+full);}catch(error){log('[after-pack] could not remove '+full+': '+error.message);}};
  const walk=directory=>{
    let entries;
    try{entries=fs.readdirSync(directory,{withFileTypes:true});}catch(error){log('[after-pack] could not read '+directory+': '+error.message);return;}
    for(const entry of entries){
      const lower=entry.name.toLowerCase(),full=path.join(directory,entry.name);
      if(lower==='state'||DATABASE_SUFFIXES.some(suffix=>lower.endsWith(suffix)))remove(full);
      else if(entry.isDirectory())walk(full);
    }
  };
  if(!fs.existsSync(runtimeRoot))return removed;
  for(const application of fs.readdirSync(runtimeRoot,{withFileTypes:true}))if(application.isDirectory())
    for(const child of fs.readdirSync(path.join(runtimeRoot,application.name),{withFileTypes:true}))
      if(child.isDirectory()&&child.name.toLowerCase()==='sources')walk(path.join(runtimeRoot,application.name,child.name));
  return removed;
}
// Downloads layout (install-layout.cjs): the build-time long-path gate, and the single writer of the NSIS include that
// builder.cjs points nsis.include at. The product/app/version come from the packager, never from a second source.
function layoutInputs(packager){
  const info=packager?.appInfo;if(!info)return null;
  const app=packager.config?.extraMetadata?.desktopAppConfig?.appId||process.env.DESKTOP_APP_ID||'melange';
  return {product:info.productName,app,version:info.version};
}
async function afterPack(context){
  const removed=stripState(path.join(context.appOutDir,'resources','runtime'),message=>console.log(message));
  console.log('[after-pack] runtime packing report: removed '+removed.length+' state/database path(s) under runtime/*/sources');
  const depth=layout.deepestRelative(context.appOutDir);
  console.log('[after-pack] deepest relative path: '+depth+' (budget '+layout.LAYOUT.deepestRelativeBudget+')');
  if(depth>layout.LAYOUT.deepestRelativeBudget)throw new Error('The packed application\'s deepest relative path is '+depth+' characters, over the '+layout.LAYOUT.deepestRelativeBudget+' budget that keeps it installable under Downloads (install-layout.cjs).');
  const inputs=layoutInputs(context.packager);
  if(!inputs){console.log('[after-pack] no packager in the context: installer.generated.nsh not written');return;}
  const target=path.join(path.dirname(context.appOutDir),'installer.generated.nsh');
  fs.writeFileSync(target,layout.nsisInclude({...inputs,installerNsh:path.join(__dirname,'installer.nsh')}));
  console.log('[after-pack] wrote '+target);
}
module.exports=afterPack;module.exports.stripState=stripState;
