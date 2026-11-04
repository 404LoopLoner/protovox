const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = $('#toast');
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3000)}

const projects = [
 {title:'Smart Disaster<br>Monitoring System',plain:'Smart Disaster Monitoring System',description:'A connected field system that detects environmental changes and sends real-time alerts before a situation escalates.',tags:['IoT','Embedded C','Sensor analytics'],controller:'ESP32',sensors:'DHT11 · SW-420',connectivity:'Wi-Fi / MQTT',level:'Intermediate',value:'68.4',kind:'disaster',details:'Monitor temperature, vibration and water level with an ESP32-based node. A real deployment needs careful sensor calibration, robust power design and a tested alert pipeline.'},
 {title:'Neural Signal<br>Classifier',plain:'Neural Signal Classifier',description:'A learning-focused signal pipeline that cleans sample data, extracts features and classifies patterns for an interactive dashboard.',tags:['Python','Signal processing','Machine learning'],controller:'Laptop / SBC',sensors:'Synthetic EEG data',connectivity:'CSV / local UI',level:'Advanced',value:'74.2',kind:'neural',details:'Explore filtering, feature extraction and model evaluation using synthetic data. This demo is educational and is not a medical device or diagnostic system.'},
 {title:'Gesture-Controlled<br>Robot',plain:'Gesture-Controlled Robot',description:'Translate motion sensor readings into movement commands and drive a small robot through a wireless control link.',tags:['Robotics','Arduino','Motion sensing'],controller:'Arduino',sensors:'MPU6050 IMU',connectivity:'RF / Bluetooth',level:'Intermediate',value:'82.1',kind:'robot',details:'A practical build around sensor calibration, serial communication and motor control. Test movement commands at low speed and include a physical power cutoff.'},
 {title:'Solar Energy<br>Tracker',plain:'Solar Energy Tracker',description:'Measure light and energy data to study panel positioning, output and the effect of changing environmental conditions.',tags:['Energy','ESP32','Analytics'],controller:'ESP32',sensors:'LDR · INA219',connectivity:'Wi-Fi / MQTT',level:'Intermediate',value:'91.6',kind:'solar',details:'Compare fixed and tracked panel output, log measurements and visualize trends. Treat the listed specifications as a project concept, not a validated performance claim.'}
];
let activeProject=0, slideTimer;
const art=$('#projectArt');

function showProject(index,resetTimer=true){
 activeProject=(index+projects.length)%projects.length;const p=projects[activeProject];
 $('#projectTitle').innerHTML=p.title;$('#projectDescription').textContent=p.description;$('#projectTags').innerHTML=p.tags.map(t=>`<span>${t}</span>`).join('');
 $('#projectController').textContent=p.controller;$('#projectSensors').textContent=p.sensors;$('#projectConnectivity').textContent=p.connectivity;$('#projectLevel').textContent=p.level;
 $$('.holo-scene',art).forEach(scene=>scene.classList.toggle('active',scene.dataset.scene===p.kind));$('#artProjectCode').textContent=String(activeProject+1).padStart(3,'0');$('#slideCount').innerHTML=`${String(activeProject+1).padStart(2,'0')} <i>/</i> ${String(projects.length).padStart(2,'0')}`;
 $('#sliderProgress').style.width=`${(activeProject+1)/projects.length*100}%`;art.className=`project-art art-${p.kind}`;
 if(resetTimer){clearInterval(slideTimer);slideTimer=setInterval(()=>showProject(activeProject+1,false),6500)}
}
$('#prevProject').addEventListener('click',()=>showProject(activeProject-1));
$('#nextProject').addEventListener('click',()=>showProject(activeProject+1));
$('#projectDetails').addEventListener('click',()=>{const p=projects[activeProject];showInfo('PROJECT BLUEPRINT',p.plain,p.details,[['Controller',p.controller],['Sensors / data',p.sensors],['Connectivity',p.connectivity],['Level',p.level]])});
// $('#allProjects').addEventListener('click',()=>showInfo('PROJECT LAB','Explore the full project library','The complete project library will include build guides, verified component lists, code repositories and student-submitted prototypes. This prototype currently showcases four example concepts.',[['Featured projects','4 demo concepts'],['Build notes','Illustrative'],['Submissions','Not connected']]));
showProject(0);

const journeyContent=[
 {title:'Every great build starts with a question.',body:'Describe the problem you want to solve. You do not need a perfect plan — just a starting point.',label:'Submit your first idea',icon:'paper'},
 {title:'Turn the idea into a build plan.',body:'Break the concept into functions, choose a controller and map the skills and components you need.',label:'Explore technical help',icon:'blueprint'},
 {title:'Find the right parts, not random parts.',body:'Compare a curated kit with your bill of materials and understand why each component belongs in the build.',label:'Explore project kits',icon:'kit'},
 {title:'Debug with a method, not guesswork.',body:'Check power, wiring, pinouts, logs and assumptions. Capture what you tried so the next fix is easier.',label:'Open the debug desk',icon:'debug'},
 {title:'Make your work visible.',body:'Document the architecture, share what you learned and use your build as evidence of practical skills.',label:'Explore internship tracks',icon:'launch'}
];
function setJourney(index){
 const steps=$$('.journey-step');steps.forEach((s,i)=>s.classList.toggle('active',i===index));$('#journeyLineProgress').style.height=`${index/4*100}%`;
 const c=journeyContent[index];$('.detail-index').innerHTML=`STAGE ${String(index+1).padStart(2,'0')} <span>✳</span>`;
 $('.journey-illustration').innerHTML=`<div class="idea-paper"><span>${['YOUR IDEA','BUILD PLAN','COMPONENTS','DEBUG LOG','SHOWCASE'][index]}</span><i></i><i></i><i></i><div class="paper-spark">${['✳','⌘','◈','⌁','↗'][index]}</div></div><div class="journey-orbit"></div>`;
 $('.journey-detail h3').textContent=c.title;$('.journey-detail>p').textContent=c.body;const link=$('.journey-detail .inline-link');link.innerHTML=`${c.label} <span>↗</span>`;
 link.onclick=()=>{if(index===0)openModal('ideaModal');else if(index===1||index===3)openModal('helpModal');else if(index===2)document.querySelector('#kits').scrollIntoView({behavior:'smooth'});else document.querySelector('#internships').scrollIntoView({behavior:'smooth'})}
}
$$('.journey-step').forEach(step=>step.addEventListener('click',()=>setJourney(Number(step.dataset.step))));
setJourney(0);

const helpModal=$('#helpModal'),ideaModal=$('#ideaModal'),infoModal=$('#infoModal'),internshipModal=$('#internshipModal');
const allModals=[helpModal,ideaModal,infoModal,internshipModal,$('#internshipEmailDraft'),$('#robotThanksModal')].filter(Boolean);
function openModal(id){const d=$('#'+id);if(d&&!d.open){d.showModal();document.body.classList.add('modal-open')}}
function closeModal(d){if(d?.open)d.close();if(!allModals.some(m=>m.open))document.body.classList.remove('modal-open')}
$$('[data-open-help]').forEach(b=>b.addEventListener('click',()=>openModal('helpModal')));
$$('[data-open-idea]').forEach(b=>b.addEventListener('click',()=>openModal('ideaModal')));
$$('[data-scroll-start]').forEach(b=>b.addEventListener('click',()=>openModal('ideaModal')));
$$('[data-close-modal]').forEach(b=>b.addEventListener('click',()=>{const d=b.closest('dialog');closeModal(d)}));
allModals.forEach(d=>{d.addEventListener('close',()=>{if(!allModals.some(m=>m.open))document.body.classList.remove('modal-open')});d.addEventListener('click',e=>{if(e.target===d)closeModal(d)})});

function showInfo(eyebrow,title,description,rows=[]){$('#infoEyebrow').textContent=eyebrow;$('#infoTitle').textContent=title;$('#infoText').textContent=description;$('#infoContent').innerHTML=rows.length?`<div class="detail-list">${rows.map(r=>`<div><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div>`:'';openModal('infoModal')}

function openEmailDraft(subject,body,kind='general'){
 const draft=$('#internshipEmailDraft');
 draft.dataset.subject=subject;draft.dataset.body=body;draft.dataset.kind=kind;
 $('#internshipDraftSubject').textContent=subject;
 $('#internshipDraftBody').value=body;
 $('#emailDraftHeading').textContent=kind==='internship'?'Your internship request is ready.':'Your message is ready.';
 $('#emailDraftIntro').textContent='Choose how you want to send it. Open Gmail in your browser or copy the message into your preferred email service.';
 closeModal($('#infoModal'));closeModal($('#helpModal'));closeModal($('#ideaModal'));closeModal($('#internshipModal'));
 openModal('internshipEmailDraft');
}
function makeEmailBody(entries){return entries.map(([label,value])=>`${label}:\n${value||'Not specified'}`).join('\n\n')+'\n\nSent via the ProtoVox website.'}
$('#infoAskByEmail').addEventListener('click',()=>{
 const title=$('#infoTitle').textContent;
 const description=$('#infoText').textContent;
 const rows=$$('#infoContent .detail-list > div').map(row=>[ $('b',row)?.textContent||'Detail', $('span',row)?.textContent||'']);
 const body=makeEmailBody([['Topic',title],['Details',description],...rows,['Request','Please advise on next steps, required resources and relevant components.']]);
 openEmailDraft('ProtoVox enquiry — '+title,body,'resource');
});
$$('[data-rd-inquiry]').forEach(button=>button.addEventListener('click',()=>{
 const title=button.dataset.rdInquiry;
 const body=makeEmailBody([['R&D topic',title],['Your idea / question','Please share more details about this research concept and possible collaboration.'],['Request','Please reply with relevant project details, resources or next steps.']]);
 openEmailDraft('ProtoVox R&D enquiry — '+title,body,'rd');
}));
$('#helpForm').addEventListener('submit',e=>{
 e.preventDefault();const fd=new FormData(e.currentTarget);
 const subject='Requesting for Technical Help — '+fd.get('category');
 const body=makeEmailBody([['Name',fd.get('name')],['Reply email',fd.get('email')],['Help category',fd.get('category')],['Issue details',fd.get('details')]]);
 openEmailDraft(subject,body,'help');
});
$('#ideaForm').addEventListener('submit',e=>{
 e.preventDefault();const fd=new FormData(e.currentTarget);
 const subject='Idea Proposal — '+fd.get('ideaName');
 const body=makeEmailBody([['Project / idea',fd.get('ideaName')],['Technology area',fd.get('technology')],['Problem to solve',fd.get('problem')],['Request','Please help map the components, build plan and whether a project kit is suitable.']]);
 openEmailDraft(subject,body,'idea');
});
[helpModal,ideaModal].forEach(d=>d.addEventListener('close',()=>{const f=$('form[id]',d);if(f){f.hidden=false;f.reset()}$('.modal-heading',d).hidden=false;$('.modal-success',d).hidden=true}));

$$('[data-kit]').forEach(b=>b.addEventListener('click',()=>{const kit=b.dataset.kit;const info={'IoT Starter Kit':[['Controller','ESP32'],['Includes','Sensors, breadboard, jumper wires'],['Best for','Wi-Fi sensor prototypes'],['Demo price','₹1,499']],'Robotics Explorer Kit':[['Controller','Arduino-compatible board'],['Includes','Motor driver, chassis, sensors'],['Best for','Motion and obstacle projects'],['Demo price','₹2,299']],'Solar Tracker Kit':[['Controller','ESP32'],['Includes','Light sensors, servo, power monitor'],['Best for','Solar measurement experiments'],['Demo price','₹1,899']]};showInfo('KIT LAB / DEMO',kit,'Illustrative kit preview. This prototype does not take orders or payments. Use this checklist to decide whether the kit matches your project.',info[kit]||[])}));
$$('[data-track]').forEach(b=>b.addEventListener('click',()=>showInfo('OPPORTUNITY TRACK',b.dataset.track,'This is an exploratory pathway, not a live vacancy. Email ProtoVox to ask about suggested resources, eligibility, skills to build and possible next steps.',[['Status','Demo pathway'],['Suggested next step','Build one relevant project'],['Applications','Not connected']])));
$$('[data-tech]').forEach(b=>b.addEventListener('click',()=>{ $$('.tech-node').forEach(n=>n.classList.toggle('active',n===b));showInfo('TECHNOLOGY UNIVERSE',b.dataset.tech,({'IoT':'Connect sensors, devices and dashboards. Explore telemetry, MQTT, Wi-Fi and low-power design.','AI / ML':'Work with datasets, feature extraction, model evaluation and practical AI interfaces.','Hardware':'Explore circuit design, microcontrollers, PCB workflows, power and debugging.','Robotics':'Combine sensors, control logic, actuators and mechanical systems into interactive builds.'})[b.dataset.tech],[['Explore','Related projects'],['Build path','Learn → prototype → test']])}));
$('#coreNode').addEventListener('click',()=>showInfo('PV / BUILD ENGINE','One idea. Many paths.','ProtoVox brings the pieces of student engineering together: a problem to solve, a technical path, the parts to build it and help to get unstuck.',[['01','Ideate'],['02','Prototype'],['03','Debug'],['04','Showcase']]));

const menu=$('.menu-toggle'),mobile=$('.mobile-nav');
menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});
$$('.mobile-nav a,.mobile-nav button').forEach(el=>el.addEventListener('click',()=>{mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));
const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target;const target=Number(el.dataset.count);let n=0;const tick=()=>{n=Math.min(target,n+1);el.textContent=n;if(n<target)setTimeout(tick,120)};tick();countObserver.unobserve(el)}}),{threshold:.6});
$$('[data-count]').forEach(el=>countObserver.observe(el));
const scene=$('#orbitalScene');
if(window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){scene.addEventListener('pointermove',e=>{const r=scene.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;scene.style.setProperty('--mx',x.toFixed(2));scene.style.setProperty('--my',y.toFixed(2));$('.core-node').style.translate=`${x*8}px ${y*7}px`});scene.addEventListener('pointerleave',()=>{$('.core-node').style.translate='0 0'})}
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('modal-open')});


// Internship application: select a course/domain card to prefill the intake dialog.
$$('[data-open-internship]').forEach(b=>b.addEventListener('click',()=>openModal('internshipModal')));
$$('[data-internship]').forEach(b=>b.addEventListener('click',()=>{const select=$('#internshipDomain');select.value=b.dataset.internship;openModal('internshipModal')}));
$('#internshipForm').addEventListener('submit',e=>{
 e.preventDefault();const fd=new FormData(e.currentTarget);
 const subject=`Internship enquiry — ${fd.get('domain')} — ${fd.get('name')}`;
 const body=makeEmailBody([
  ['Name',fd.get('name')],['Email',fd.get('email')],['Course / domain',fd.get('domain')],
  ['Current course / year',fd.get('course')],['Preferred duration',fd.get('duration')],
  ['Skills and tools',fd.get('skills')],['Learning goals / requirements',fd.get('requirements')],
  ['Portfolio / GitHub',fd.get('portfolio')]
 ]);
 openEmailDraft(subject,body,'internship');
});
const internshipDraft=$('#internshipEmailDraft');
$('#openGmailDraft').addEventListener('click',()=>{
 const subject=internshipDraft.dataset.subject||'ProtoVox enquiry';
 const body=internshipDraft.dataset.body||'';
 const url='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent('protovox.tech@gmail.com')+'&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 window.open(url,'_blank','noopener,noreferrer');
 notify('Gmail compose opened. Review the message and press Send.');
});
$('#copyInternshipDraft').addEventListener('click',async()=>{
 const all=`To: protovox.tech@gmail.com\nSubject: ${internshipDraft.dataset.subject||''}\n\n${$('#internshipDraftBody').value}`;
 try{
   await navigator.clipboard.writeText(all);
   notify('Email address, subject and message copied.');
 }catch(_){
   const textarea=$('#internshipDraftBody');
   textarea.focus();textarea.select();
   const copied=document.execCommand('copy');
   notify(copied?'Message copied. Add the address and subject shown above.':'Select and copy the message, then paste it into your email.');
 }
});
$('#confirmInternshipSent').addEventListener('click',()=>{
 closeModal(internshipDraft);
 const buddy=$('#protoBuddy');
 if(buddy){
   const panel=$('#buddyAssistant');
   if(panel){
     const title=$('h3',panel), message=$('p',panel), top=$('.assistant-top > span',panel);
     if(top)top.innerHTML='<i></i> VOX / THANK YOU';
     if(title)title.textContent='Thanks for reaching out! ✨';
     if(message)message.textContent='Thanks, builder! If you pressed Send in Gmail or your email service, your message is on its way. We appreciate you reaching out to ProtoVox.';
     buddy.classList.add('buddy-thanks');
     setTimeout(()=>{panel.hidden=false;buddy.setAttribute('aria-expanded','true')},80);
   }
 }
 notify('Vox says: Thanks for reaching out, builder!');
});
const creatorStorageKey='protovox_creator_project_drafts_v1';
let creatorDrafts=[];
function loadCreatorDrafts(){try{creatorDrafts=JSON.parse(localStorage.getItem(creatorStorageKey)||'[]')}catch(_){creatorDrafts=[]}renderCreatorDrafts()}
function saveCreatorDrafts(){try{localStorage.setItem(creatorStorageKey,JSON.stringify(creatorDrafts))}catch(_){notify('Browser storage is full. Try a smaller project image.')}renderCreatorDrafts()}
function renderCreatorDrafts(){
 const list=$('#creatorProjectList');if(!list)return;
 if(!creatorDrafts.length){list.innerHTML='<div class="creator-empty"><span>＋</span><b>Your project cards will appear here.</b><small>Add a project using the form.</small></div>';return}
 list.innerHTML=creatorDrafts.map((p,i)=>`<article class="creator-project-card">${p.image?`<img src="${p.image}" alt="${escapeHtml(p.title)} project image">`:''}<div class="creator-card-copy"><small>${escapeHtml(p.domain.toUpperCase())} / CREATOR DRAFT</small><h4>${escapeHtml(p.title)}</h4><p>${escapeHtml(p.description)}</p><div class="creator-stack">${escapeHtml(p.stack)}</div><button type="button" data-delete-draft="${i}">Remove draft ×</button></div></article>`).join('');
 $$('[data-delete-draft]').forEach(b=>b.addEventListener('click',()=>{creatorDrafts.splice(Number(b.dataset.deleteDraft),1);saveCreatorDrafts();notify('Local project draft removed.')}));
}
function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
$('#creatorProjectForm')?.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const file=fd.get('image');let image='';
 if(file&&file.size){
   if(!file.type.startsWith('image/')){notify('Please choose an image file.');return}
   if(file.size>900000){notify('Please choose an image under 900 KB for local storage.');return}
   image=await new Promise(resolve=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>resolve('');reader.readAsDataURL(file)});
 }
 creatorDrafts.unshift({title:fd.get('title'),domain:fd.get('domain'),stack:fd.get('stack'),description:fd.get('description'),image,createdAt:new Date().toISOString()});
 saveCreatorDrafts();form.reset();notify('Project preview saved in this browser.');
});
$('#clearCreatorProjects')?.addEventListener('click',()=>{if(confirm('Remove all local project drafts from this browser?')){creatorDrafts=[];saveCreatorDrafts();notify('Local drafts cleared.')}});
$('#exportCreatorProjects')?.addEventListener('click',()=>{
 const blob=new Blob([JSON.stringify(creatorDrafts.map(({image,...p})=>({...p,image:image?'[image stored in local browser draft; omitted from JSON export]':''})),null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='protovox-project-drafts.json';a.click();URL.revokeObjectURL(url);notify('Project draft data exported. Image files are not included in JSON.');
});

if($('#creatorProjectList')) loadCreatorDrafts();

// Brand logo is a reliable "back to top" control on every viewport.
$$('.brand').forEach(brand=>brand.addEventListener('click',event=>{
 event.preventDefault();
 const mobileNav=$('.mobile-nav'); if(mobileNav) mobileNav.classList.remove('open');
 const menuButton=$('.menu-toggle'); if(menuButton) menuButton.setAttribute('aria-expanded','false');
 window.scrollTo({top:0,behavior:'smooth'});
 history.replaceState(null,'',window.location.pathname+window.location.search);
}));
