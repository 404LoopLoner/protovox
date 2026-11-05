(()=>{
const projects=window.PROTOVOX_PROJECTS||[];
const params=new URLSearchParams(location.search);
const id=params.get('id');
const p=projects.find(x=>x.slug===id)||projects[0];
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.title=`${p.title} | ProtoVox`;
$('#detailKicker').textContent=`PROTO VOX / ${p.domain.toUpperCase()} / PROJECT BLUEPRINT`;
$('#detailTitle').textContent=p.title;
$('#detailDescription').textContent=p.overview;
$('#detailOverview').textContent=p.overview;
$('#detailWorking').textContent=p.working;
$('#detailLevel').textContent=`${p.level} · ${p.domain}. Follow the build in stages: plan the circuit or architecture, assemble the parts, implement the code, test each subsystem and document the result.`;
$('#artCore').textContent=p.icon;
$('#artLabel').textContent=`BUILD SYSTEM / ${String(projects.indexOf(p)+1).padStart(3,'0')}`;
document.querySelectorAll('.detail-section,.detail-panel,.kit-feature,.checkout-panel').forEach(el=>el.classList.add('reveal'));
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');sectionObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.detail-section.reveal,.detail-panel.reveal,.kit-feature.reveal,.checkout-panel.reveal').forEach(el=>sectionObserver.observe(el));
const componentList=$('#componentList');
if(componentList){componentList.innerHTML=(p.components||[]).map(([name,detail])=>`<div class="component-item"><strong>${esc(name)}</strong><small>${esc(detail)}</small></div>`).join('')||'<p class="checkout-note">Component list will be updated for this project.</p>';}
const essentialList=$('#essentialList');
if(essentialList){
 const isSoftware=/AI|ML|signal|classifier/i.test(p.domain+' '+p.title);
 const isDesign=/design|3D|fabrication|CAD/i.test(p.domain+' '+p.title);
 const setup=isSoftware
  ? ['Laptop or desktop computer','Python environment and package manager','Code editor / notebook environment','Version-control workspace and project README','Sample data storage and backup']
  : isDesign
  ? ['Laptop with suitable CAD software','Digital caliper or measurement tools','3D printer access (if required)','Small hand tools for assembly','Safety glasses and a clean work surface']
  : ['Laptop with Arduino IDE or PlatformIO','USB data cable compatible with the controller','Digital multimeter for voltage and continuity checks','Small screwdriver and wire stripper','Safety glasses and an insulated work surface'];
 const used=[...(p.components||[]).map(item=>item[0]),...(p.contents||[])].map(x=>String(x).toLowerCase());
 const essentials=setup.filter(item=>!used.some(existing=>existing.includes(item.toLowerCase())||item.toLowerCase().includes(existing)));
 essentialList.innerHTML=essentials.map(item=>`<li>${esc(item)}</li>`).join('')||'<li>Suitable workspace and lighting</li><li>Project documentation and test log</li>';
}
$('#kitTitle').textContent=p.kit;$('#kitCode').textContent=`MATCHED KIT / ${String(projects.indexOf(p)+1).padStart(3,'0')}`;
$('#kitDescription').textContent=p.kitdesc;$('#kitPrice').textContent=p.price;
$('#kitContents').innerHTML=p.contents.map(x=>`<li>${esc(x)}</li>`).join('');
$('#buyKit').addEventListener('click',()=>{$('#checkoutPanel').classList.add('open');$('#checkoutPanel').scrollIntoView({behavior:'smooth',block:'center'});});
$('#askKit').addEventListener('click',()=>{$('#checkoutPanel').classList.add('open');$('#checkoutPanel').scrollIntoView({behavior:'smooth',block:'center'});$('#kitOrderForm input[name="name"]')?.focus();});
$('#kitOrderForm')?.addEventListener('submit',async e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const payload={...Object.fromEntries(fd.entries()),project:p.title,kit:p.kit,indicativePrice:p.price};const result=window.protoSaveRequest?await window.protoSaveRequest('kit_order',payload):{ok:false};if(result.ok){e.currentTarget.reset();alert('Your kit enquiry has been sent to ProtoVox.');return;}const subject=encodeURIComponent(`ProtoVox kit enquiry — ${p.kit}`);const body=encodeURIComponent(Object.entries(payload).map(([k,v])=>`${k}: ${v}`).join('\n'));location.href=`mailto:protovox.tech@gmail.com?subject=${subject}&body=${body}`;});
const menu=document.querySelector('.menu-toggle'),mobile=document.querySelector('.mobile-nav');
menu?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));
})();