(() => {
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const cards=$$('.directory-card'),search=$('#projectSearch'),filters=$$('#projectFilters [data-filter]'),sort=$('#projectSort'),grid=$('#directoryGrid'),count=$('#projectCount'),empty=$('#directoryEmpty');
 let active='All';
 function update(){
  const q=(search?.value||'').trim().toLowerCase();
  let visible=cards.filter(c=>{
   const text=(c.dataset.title+' '+c.dataset.domain+' '+c.dataset.tags+' '+c.textContent).toLowerCase();
   return (active==='All'||(c.dataset.domain+' '+c.dataset.tags).toLowerCase().includes(active.toLowerCase()))&&text.includes(q);
  });
  if(sort?.value==='az')visible.sort((a,b)=>a.dataset.title.localeCompare(b.dataset.title));
  else if(sort?.value==='level'){const rank={Beginner:1,Intermediate:2,Advanced:3};visible.sort((a,b)=>rank[a.dataset.level]-rank[b.dataset.level])}
  else visible.sort((a,b)=>Number(a.dataset.order)-Number(b.dataset.order));
  cards.forEach(c=>c.hidden=true);visible.forEach(c=>{c.hidden=false;grid.appendChild(c)});
  count.textContent=String(visible.length).padStart(2,'0');empty.hidden=visible.length!==0;
  filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===active));
 }
 search?.addEventListener('input',update);sort?.addEventListener('change',update);
 filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;update()}));
 $('#resetProjectFilters')?.addEventListener('click',()=>{search.value='';active='All';sort.value='featured';update()});
 const modal=$('#directoryDetailModal');
 $$('[data-detail]').forEach(btn=>btn.addEventListener('click',()=>{
   const [title,domain,components,description]=btn.dataset.detail.split('|');
   $('#detailTitle').textContent=title;$('#detailDomain').textContent=domain;$('#detailComponents').textContent=components;$('#detailDescription').textContent=description;
   modal.showModal();document.body.classList.add('modal-open');
 }));
 if(modal){
  const unlock=()=>{if(!modal.open)document.body.classList.remove('modal-open')};
  modal.addEventListener('close',unlock);
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
 }
 const menu=$('.menu-toggle'),mobile=$('.mobile-nav');
 menu?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
 mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
 $$('a.brand').forEach(a=>{a.addEventListener('click',()=>{mobile?.classList.remove('open');menu?.setAttribute('aria-expanded','false')})});
 update();
})();