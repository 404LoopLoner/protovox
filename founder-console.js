(() => {
 const $=s=>document.querySelector(s);
 const cfg=window.PROTOVOX_SUPABASE||{};
 const configured=cfg.url&&cfg.anonKey&&!cfg.url.includes('YOUR-PROJECT')&&!cfg.anonKey.includes('YOUR_SUPABASE');
 const sb=configured&&window.supabase?.createClient?window.supabase.createClient(cfg.url,cfg.anonKey):null;
 const loginScreen=$('#loginScreen'),shell=$('#consoleShell'),loginForm=$('#loginForm'),loginError=$('#loginError');
 let requests=[],currentView='overview',selected=null;
 const labels={kit_order:'Kit order',workshop:'Workshop',idea:'Student idea',help:'Help desk',research:'Research',contact:'General enquiry'};
 const statusLabels={new:'New',reviewing:'Reviewing',in_progress:'In progress',completed:'Completed',declined:'Declined'};
 const fmtDate=v=>new Date(v).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
 const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function notice(msg){const n=$('#connectionNotice');n.textContent=msg;n.hidden=false}
 function showConsole(email){loginScreen.hidden=true;shell.hidden=false;$('#signedInEmail').textContent=email||'Founder'}
 async function verifyFounder(){
   if(!sb)return false;
   const {data:{user}}=await sb.auth.getUser();if(!user)return false;
   const {data,error}=await sb.rpc('is_proto_founder');
   if(error||data!==true)return false;
   showConsole(user.email);await loadRequests();return true;
 }
 async function loadRequests(){
   const {data,error}=await sb.from('proto_requests').select('*').order('created_at',{ascending:false}).limit(1000);
   if(error){notice('Could not load requests: '+error.message);return}
   requests=data||[];$('#connectionNotice').hidden=true;render();
 }
 loginForm.addEventListener('submit',async e=>{
   e.preventDefault();loginError.textContent='';
   if(!sb){loginError.textContent='Founder console is not connected yet. Complete the Supabase setup in SUPABASE_SETUP.md.';return}
   const fd=new FormData(loginForm);const {data,error}=await sb.auth.signInWithPassword({email:fd.get('email'),password:fd.get('password')});
   if(error){loginError.textContent=error.message;return}
   const {data:isFounder,error:founderError}=await sb.rpc('is_proto_founder');
   if(founderError||isFounder!==true){await sb.auth.signOut();loginError.textContent='This account is not authorised for founder access.';return}
   showConsole(data.user.email);await loadRequests();
 });
 $('#logoutBtn').addEventListener('click',async()=>{await sb?.auth.signOut();requests=[];shell.hidden=true;loginScreen.hidden=false;loginForm.reset()});
 async function init(){
   if(!sb){loginError.textContent='Database setup is required before founders can sign in.';return}
   try{await verifyFounder()}catch(err){loginError.textContent='Unable to verify founder session. Please sign in.'}
 }
 function filtered(){
   let list=requests.filter(r=>currentView==='all'||currentView==='overview'||r.request_type===currentView);
   const q=($('#searchInput')?.value||'').toLowerCase().trim(),st=$('#statusFilter')?.value||'all';
   if(q)list=list.filter(r=>[r.subject,r.sender_name,r.email,r.organisation,JSON.stringify(r.payload||{})].join(' ').toLowerCase().includes(q));
   if(st!=='all')list=list.filter(r=>r.status===st);
   return list;
 }
 function updateCounts(){
   const count=t=>requests.filter(r=>r.request_type===t&&['new','reviewing','in_progress'].includes(r.status)).length;
   $('#navKitCount').textContent=count('kit_order');$('#navWorkshopCount').textContent=count('workshop');$('#navIdeaCount').textContent=count('idea');$('#navHelpCount').textContent=count('help');$('#navAllCount').textContent=requests.filter(r=>['new','reviewing','in_progress'].includes(r.status)).length;
   $('#statTotal').textContent=requests.length;$('#statPending').textContent=requests.filter(r=>['new','reviewing','in_progress'].includes(r.status)).length;$('#statWorkshops').textContent=requests.filter(r=>r.request_type==='workshop').length;$('#statIdeas').textContent=requests.filter(r=>r.request_type==='idea').length;
 }
 function statusChip(status){return `<span class="status-chip ${safe(status)}">${safe(statusLabels[status]||status)}</span>`}
 function row(r){return `<tr data-id="${safe(r.id)}"><td><div class="request-main"><strong>${safe(r.subject||labels[r.request_type]||'Request')}</strong><small>#${safe(String(r.id).slice(0,8))}</small></div></td><td>${safe(r.sender_name)}<br><small>${safe(r.email)}</small></td><td><span class="type-chip">${safe(labels[r.request_type]||r.request_type)}</span></td><td>${statusChip(r.status)}</td><td>${safe(fmtDate(r.created_at))}</td><td>›</td></tr>`}
 function render(){
   updateCounts();
   const recent=requests.slice(0,6);
   $('#recentList').innerHTML=recent.length?recent.map(r=>`<div class="recent-item" data-id="${safe(r.id)}"><div><strong>${safe(r.subject||labels[r.request_type]||'Request')}</strong><small>${safe(r.sender_name)} · ${safe(fmtDate(r.created_at))}</small></div>${statusChip(r.status)}</div>`).join(''):'<div class="recent-empty">No requests yet. New website enquiries will appear here.</div>';
   const types=Object.keys(labels).map(k=>[labels[k],requests.filter(r=>r.request_type===k).length]).filter(x=>x[1]||['kit_order','workshop','idea','help'].includes(Object.keys(labels).find(k=>labels[k]===x[0])));
   const max=Math.max(1,...types.map(x=>x[1]));
   $('#typeBreakdown').innerHTML=types.map(([name,n])=>`<div class="break-row"><span>${safe(name)}</span><div class="bar-track"><i style="width:${Math.round(n/max*100)}%"></i></div><b>${n}</b></div>`).join('');
   const rows=filtered();$('#requestRows').innerHTML=rows.length?rows.map(row).join(''):'<tr><td colspan="6" class="empty-cell">No matching requests.</td></tr>';
   document.querySelectorAll('[data-id]').forEach(el=>el.addEventListener('click',()=>openDetail(el.dataset.id)));
 }
 function showView(view){
   currentView=view;
   const overview=view==='overview';$('#overviewView').hidden=!overview;$('#requestsView').hidden=overview;
   const title=overview?'Dashboard':view==='all'?'All Requests':(labels[view]||'Requests')+'s';
   $('#pageTitle').textContent=title;$('#pageEyebrow').textContent='FOUNDER WORKSPACE / '+title.toUpperCase();
   document.querySelectorAll('#sideNav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
   if(!overview)render();
 }
 $('#sideNav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)showView(b.dataset.view)});
 document.querySelectorAll('[data-jump]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.jump)));
 $('#searchInput').addEventListener('input',render);$('#statusFilter').addEventListener('change',render);
 $('#refreshBtn').addEventListener('click',loadRequests);
 function openDetail(id){
   selected=requests.find(r=>r.id===id);if(!selected)return;
   $('#detailTitle').textContent=selected.subject||labels[selected.request_type]||'Request';
   const fields=[['Request type',labels[selected.request_type]||selected.request_type],['Status',statusLabels[selected.status]||selected.status],['Name',selected.sender_name],['Email',selected.email],['Phone',selected.phone],['Organisation',selected.organisation],['Received',fmtDate(selected.created_at)],...Object.entries(selected.payload||{}).map(([k,v])=>[k.replace(/([A-Z])/g,' $1').replace(/^./,s=>s.toUpperCase()),typeof v==='object'?JSON.stringify(v):v])];
   const seen=new Set();$('#detailContent').innerHTML=fields.filter(([k,v])=>v!==null&&v!==undefined&&String(v)!==''&&!seen.has(k)&&seen.add(k)).map(([k,v])=>`<div class="detail-field"><label>${safe(k)}</label><div>${safe(v)}</div></div>`).join('');
   $('#detailStatus').value=selected.status;$('#replyLink').href=selected.email?'mailto:'+encodeURIComponent(selected.email)+'?subject='+encodeURIComponent('ProtoVox — '+(selected.subject||'Your enquiry')):'#';$('#replyLink').style.opacity=selected.email?'1':'.45';
   $('#detailDrawer').classList.add('open');$('#detailBackdrop').classList.add('open');
 }
 function closeDetail(){$('#detailDrawer').classList.remove('open');$('#detailBackdrop').classList.remove('open');selected=null}
 $('#closeDrawer').addEventListener('click',closeDetail);$('#detailBackdrop').addEventListener('click',closeDetail);
 $('#saveStatusBtn').addEventListener('click',async()=>{
   if(!selected)return;const status=$('#detailStatus').value;
   const {error}=await sb.from('proto_requests').update({status,updated_at:new Date().toISOString()}).eq('id',selected.id);
   if(error){notice('Could not update status: '+error.message);return}
   selected.status=status;const i=requests.findIndex(r=>r.id===selected.id);if(i>=0)requests[i].status=status;
   closeDetail();render();
 });
 $('#exportBtn').addEventListener('click',()=>{
   const list=filtered();const keys=['id','request_type','subject','sender_name','email','phone','organisation','status','created_at','payload'];
   const csv=[keys.join(','),...list.map(r=>keys.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\n');
   const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='protovox-requests.csv';a.click();URL.revokeObjectURL(a.href);
 });
 init();
})();