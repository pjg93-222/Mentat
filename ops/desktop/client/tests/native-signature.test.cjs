'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {verifySignatureResult}=require('../native-signature.cjs');
const PIN='0EBC9AD04E929CDD731EDB5D278A4143BC3D3D30',OTHER='1111111111111111111111111111111111111111';
test('native signature requires valid status, exact publisher subject and exact installer path',()=>{
  const filename='C:\\Test\\Package.exe',publisher='CN=Publisher, O=Example, C=US';
  const valid={status:0,subject:publisher,thumbprint:PIN,path:filename};
  verifySignatureResult(valid,filename,publisher);
  for(const result of [{},{...valid,status:1},{...valid,status:'0'},{...valid,subject:'CN=Publisher'},{...valid,subject:publisher+', OU=Unexpected'},{...valid,path:'C:\\Other\\Package.exe'}])assert.throws(()=>verifySignatureResult(result,filename,publisher),/could not be verified/);
});
test('T18 (D-328): the signer thumbprint must equal the client-pinned publisher, whatever the subject says',()=>{
  const filename='C:\Test\Package.exe',publisher='CN=Publisher, O=Example, C=US',signed=thumbprint=>({status:0,subject:publisher,thumbprint,path:filename});
  verifySignatureResult(signed(PIN),filename,publisher);
  verifySignatureResult(signed(PIN.toLowerCase()),filename,publisher);
  for(const thumbprint of [OTHER,PIN+'00',null,undefined,''])assert.throws(()=>verifySignatureResult(signed(thumbprint),filename,publisher),/could not be verified/);
  for(const status of [2,3])assert.throws(()=>verifySignatureResult({...signed(PIN),status},filename,publisher),/could not be verified/);
  assert.throws(()=>verifySignatureResult({...signed(PIN),path:'C:\Other\Package.exe'},filename,publisher),/could not be verified/);
});
test('signature tool failures without a verdict are tagged; a parsed refusal is not',async()=>{
  const childProcess=require('node:child_process'),realExecFile=childProcess.execFile,platform=Object.getOwnPropertyDescriptor(process,'platform');
  const filename='C:\Test\Package.exe',publisher='CN=Publisher, O=Example, C=US',modulePath=require.resolve('../native-signature.cjs');
  let reply;
  childProcess.execFile=(file,args,options,callback)=>{process.nextTick(()=>callback(...reply()));return {stdin:{on(){},end(){}}};};
  Object.defineProperty(process,'platform',{...platform,value:'win32'});delete require.cache[modulePath];
  try{
    const {verifyWindowsPackage}=require('../native-signature.cjs');
    const verdict=status=>JSON.stringify({status,path:filename,subject:publisher,thumbprint:PIN});
    for(const [name,result] of [
      ['timeout',()=>[Object.assign(new Error('timed out'),{killed:true,signal:'SIGTERM'}),'','']],
      ['spawn error',()=>[Object.assign(new Error('spawn powershell.exe ENOENT'),{code:'ENOENT'}),'','']],
      ['non-zero exit',()=>[Object.assign(new Error('Command failed'),{code:1}),'','']],
      ['stderr',()=>[null,verdict(0),'Get-AuthenticodeSignature : access denied']],
      ['unparseable output',()=>[null,'not json','']]]){
      reply=result;await assert.rejects(verifyWindowsPackage(filename,publisher),error=>error.code==='SIGNATURE_CHECK_UNAVAILABLE',name);
    }
    reply=()=>[null,verdict(2),''];
    await assert.rejects(verifyWindowsPackage(filename,publisher),error=>/could not be verified/.test(error.message)&&error.code===undefined);
    reply=()=>[null,verdict(0),''];await verifyWindowsPackage(filename,publisher);
  }finally{childProcess.execFile=realExecFile;Object.defineProperty(process,'platform',platform);delete require.cache[modulePath];}
});
