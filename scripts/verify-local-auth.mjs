import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
const requireProject = createRequire(process.cwd() + '/system/package.json');
const { createClient } = requireProject('@supabase/supabase-js');
import assert from 'node:assert/strict';
const output = execFileSync('supabase', ['status', '--output', 'env'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
const env = Object.fromEntries(output.split('\n').flatMap(line => { const m = /^([A-Z_]+)="(.*)"$/.exec(line); return m ? [[m[1],m[2]]] : []; }));
if (env.API_URL !== 'http://127.0.0.1:55421') throw new Error('Only the isolated Acquafy local Supabase stack is supported');
const admin = createClient(env.API_URL, env.SERVICE_ROLE_KEY, {auth: {persistSession: false, autoRefreshToken: false}});
const created = [];
const base = 'http://localhost:3000';
const cookies = response => response.headers.getSetCookie().map(v => v.split(';')[0]).join('; ');
const get = (path,cookie='') => fetch(base+path,{redirect:'manual',headers:{cookie}});
(async()=>{
 try {
  assert.equal((await get('/')).status,200);
  assert.equal((await get('/app/login')).status,200);
  assert.equal((await get('/app/brand/acquafy-logo.webp')).status,200);
  for (const path of ['/app','/app/home?preview','/app/base','/app/m/duo/home','/app/docs/contrato-participacao-acquafy.pdf','/app/home.json']) {
   const r=await get(path,'acq-session=1'); assert.equal(r.status,307,path); assert.equal(r.headers.get('location'),'/app/login',path);
  }
  for(const role of ['internal','partner','unapproved']) {
   const password=randomUUID();
   const {data,error}=await admin.auth.admin.createUser({email:`test-${randomUUID()}@acquafy.invalid`,password,email_confirm:true,app_metadata: role==='unapproved'?{}:{portal_role:role},user_metadata:{portal_role:'internal'}});
   if(error) throw error; created.push(data.user.id);
   const directClient=createClient(env.API_URL,env.PUBLISHABLE_KEY||env.ANON_KEY,{auth:{persistSession:false,autoRefreshToken:false}});
   const direct=await directClient.auth.signInWithPassword({email:data.user.email,password});
   if(direct.error) throw new Error('Direct Supabase login: '+direct.error.message);
   const login=await fetch(base+'/app/api/auth/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({email:data.user.email,password,remember:false}),redirect:'manual'});
   assert.equal(login.status,role==='unapproved'?403:200,role);
   if(role==='unapproved') continue;
   const setCookies=login.headers.getSetCookie();
   assert(setCookies.every(c=>c.includes('Path=/app')&&c.includes('HttpOnly')&&c.includes('Secure')));
   assert(setCookies.every(c=>!c.includes('Max-Age=')&&!c.includes('Expires=')));
   const cookie=cookies(login);
   assert.equal((await get('/app/home',cookie)).status,200,`${role} home`);
   assert.equal((await get('/app/base',cookie)).status,role==='internal'?200:403,`${role} base`);
   assert.equal((await get('/app/m/duo/home',cookie)).status,role==='internal'?200:403,`${role} stage`);
   const docs=await get('/app/docs/contrato-participacao-acquafy.pdf',cookie);assert.equal(docs.status,200,`${role} docs`);
   assert.equal((await get('/app/m/ios',cookie)).headers.get('location'),'/app/m/ios/home');
   const homepage=await (await get('/app/home',cookie)).text(); assert(homepage.includes('/app/brand/')); assert(homepage.includes('href="/app/'));
   if(role==='partner') {
    const update=await admin.auth.admin.updateUserById(data.user.id,{app_metadata:{portal_role:null}});if(update.error)throw update.error;
    assert.equal((await get('/app/home',cookie)).status,307,'role removal takes effect without token refresh');
   }
   const logout=await fetch(base+'/app/api/auth/logout',{method:'POST',headers:{'content-type':'application/json',cookie},body:'{}'});assert.equal(logout.status,200);
   assert(logout.headers.getSetCookie().some(c=>c.includes('Max-Age=0')));
  }
  const cross=await fetch(base+'/app/api/auth/login',{method:'POST',headers:{'content-type':'application/json','sec-fetch-site':'cross-site'},body:'{}'});assert.equal(cross.status,403);
  console.log('PASS: website, /app assets, forged-cookie/preview/document gates, real Supabase login, both roles, metadata forgery, internal tools, mobile redirects, role revocation, session cookies, logout and CSRF.');
 } finally {for(const id of created) {const {error}=await admin.auth.admin.deleteUser(id);if(error)throw error;}}
})().catch(error=>{console.error(error.message);process.exitCode=1});
