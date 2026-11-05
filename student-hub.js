(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];

  // Lightweight reveal motion, respecting reduced-motion preferences.
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('hub-visible');observer.unobserve(entry.target);}
    }),{threshold:.12});
    $$('.universe-card,.pathway-card,.mission-card,.component-entry,.hub-banner,.quiz-panel,.sim-layout,.calculator-panel').forEach(el=>{el.classList.add('hub-reveal');observer.observe(el);});
  }

  // Responsive navigation for all student hub pages.
  const menu=$('.menu-toggle'), mobile=$('.mobile-nav');
  menu?.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
  mobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));

  // Component Atlas: live search + category filtering.
  const componentCards=$$('.component-entry'), componentSearch=$('#componentSearch');
  let componentCategory='All';
  function filterComponents(){
    const q=(componentSearch?.value||'').toLowerCase().trim();let visible=0;
    componentCards.forEach(card=>{
      const matchCategory=componentCategory==='All'||card.dataset.category===componentCategory;
      const matchText=(card.dataset.search+' '+card.textContent).toLowerCase().includes(q);
      card.hidden=!(matchCategory&&matchText);if(!card.hidden)visible++;
    });
    const empty=$('#atlasEmpty');if(empty)empty.hidden=visible!==0;
  }
  componentSearch?.addEventListener('input',filterComponents);
  $$('[data-component-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    componentCategory=btn.dataset.componentFilter;
    $$('[data-component-filter]').forEach(b=>b.classList.toggle('active',b===btn));filterComponents();
  }));

  // Interactive engineering quiz. Score is stored only in this browser.
  const questions=[
    {q:'Which component converts electrical energy into rotational motion?',o:['LDR','DC motor','Resistor','Push button'],a:1,e:'A DC motor converts electrical energy into rotational mechanical motion. A motor driver is commonly used to control it from a microcontroller.'},
    {q:'Why do we place a resistor in series with a basic LED circuit?',o:['To increase LED voltage','To store program code','To limit current','To measure distance'],a:2,e:'The resistor limits current through the LED. Without appropriate current limiting, the LED can be damaged.'},
    {q:'Which sensor is commonly used to estimate distance using sound pulses?',o:['Ultrasonic sensor','DHT11','LDR','MPU6050'],a:0,e:'An ultrasonic sensor sends a sound pulse and measures the time taken for its echo to return.'},
    {q:'What does PWM commonly help a controller do?',o:['Store files','Control average power to a load','Measure humidity directly','Increase battery capacity'],a:1,e:'Pulse-width modulation changes the duty cycle of a digital signal. It is commonly used for LED dimming and motor speed control.'},
    {q:'What should you check before connecting a module to a microcontroller?',o:['Only its colour','Its voltage and pinout requirements','The brand logo','The cable length only'],a:1,e:'Check the datasheet or board documentation for supply voltage, logic levels, pinout and current requirements before wiring.'}
  ];
  let qi=0,answered=false,score=0;
  const qEl=$('#quizQuestion'),opts=$('#quizOptions'),feedback=$('#quizFeedback'),next=$('#quizNext');
  const stored=(()=>{try{return Number(localStorage.getItem('pvMissionScore')||0)}catch(e){return 0}})();
  const scoreEl=$('#missionScore'),meter=$('#missionMeter'),progress=$('#missionProgress');
  function renderQuestion(){
    if(!qEl||!opts)return;
    const q=questions[qi];answered=false;qEl.textContent=q.q;
    $('#quizCount').textContent=`QUESTION ${String(qi+1).padStart(2,'0')} / ${questions.length}`;
    $('#quizProgress').style.width=`${(qi/questions.length)*100}%`;
    opts.innerHTML='';
    q.o.forEach((option,index)=>{const b=document.createElement('button');b.type='button';b.textContent=option;b.dataset.answer=index;b.addEventListener('click',()=>answer(index));opts.appendChild(b);});
    feedback.textContent='Select an answer to reveal the engineering explanation.';
    next.disabled=true;next.textContent=qi===questions.length-1?'Finish mission ↗':'Next question ↗';
  }
  function updateScore(){
    if(scoreEl)scoreEl.textContent=String(stored+score).padStart(2,'0');
    if(meter)meter.style.width=`${Math.min(100,(stored+score)/10*100)}%`;
    if(progress)progress.textContent=`${stored+score} points recorded on this device. Complete the quiz to earn more.`;
  }
  function answer(index){
    if(answered)return;answered=true;const q=questions[qi],correct=index===q.a;
    if(correct){score+=10;feedback.textContent='CORRECT — '+q.e;feedback.style.color='#6fe3c6';}
    else{feedback.textContent='NOT QUITE — '+q.e;feedback.style.color='#f2b18b';}
    $$('button',opts).forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add('correct');else if(i===index)b.classList.add('wrong');});
    next.disabled=false;updateScore();
  }
  next?.addEventListener('click',()=>{
    if(!answered)return;
    if(qi<questions.length-1){qi++;renderQuestion();return;}
    try{localStorage.setItem('pvMissionScore',String(stored+score));}catch(e){}
    qEl.textContent=`Mission complete. You earned ${score} points.`;
    opts.innerHTML='';feedback.textContent='Your score is saved in this browser. Restart to practise again.';next.disabled=true;
    $('#quizProgress').style.width='100%';updateScore();
  });
  $('#quizRestart')?.addEventListener('click',()=>{qi=0;score=0;renderQuestion();updateScore();});
  if(qEl){renderQuestion();updateScore();}

  // Robot motion sandbox. All movement is local visual simulation.
  const rover=$('#simRover'),field=$('#simField');let x=50,y=50,angle=0;
  const step=$('#moveStep');
  function paint(status){
    if(!rover)return;
    rover.style.left=x+'%';rover.style.top=y+'%';rover.style.transform=`translate(-50%,-50%) rotate(${angle}deg)`;
    $('#simCoord').textContent=`X: ${Math.round(x)} · Y: ${Math.round(y)}`;
    $('#simStatus').textContent=status||'Command executed. Rover position updated.';
  }
  $$('[data-move]').forEach(btn=>btn.addEventListener('click',()=>{
    const d=Number(step?.value||5),move=btn.dataset.move;
    if(move==='up'){y=Math.max(7,y-d);angle=0;}
    if(move==='down'){y=Math.min(93,y+d);angle=180;}
    if(move==='left'){x=Math.max(7,x-d);angle=270;}
    if(move==='right'){x=Math.min(93,x+d);angle=90;}
    if(move==='stop'){paint('STOP command received. Rover holding position.');return;}
    paint(`${move.toUpperCase()} command received. Simulated movement complete.`);
  }));
  step?.addEventListener('input',()=>$('#stepValue').textContent=step.value);
  $('#simReset')?.addEventListener('click',()=>{x=50;y=50;angle=0;paint('Rover reset to its starting coordinates.');});


  // Project Build Planner: creates a local starter roadmap from student choices.
  $('#buildPlanner')?.addEventListener('submit',e=>{
    e.preventDefault();
    const domain=$('#planDomain').value,level=$('#planLevel').value,budget=Number($('#planBudget').value),goal=$('#planGoal').value.trim();
    const plans={
      robot:{name:'Mobile robotics prototype',parts:['Microcontroller board (Arduino-compatible or ESP32)','Motor driver matched to motor current','Two geared DC motors and chassis','Distance or line sensors','Battery pack with suitable protection'],steps:['Define the robot task and sketch its movement logic.','Test each sensor and motor separately before integration.','Build a low-speed prototype and add a safe stop behaviour.','Test on a simple course; record failures and improve.'],skills:'Digital I/O, sensor reading, motor control and debugging.'},
      iot:{name:'Connected environment monitor',parts:['ESP32 or compatible Wi-Fi microcontroller','Sensor selected for the target measurement','Regulated power supply and wiring','Simple dashboard or local data logger'],steps:['Choose one measurement and define a useful sampling interval.','Read and validate sensor values locally.','Send data over Wi-Fi using a simple protocol.','Display readings and test what happens when connectivity fails.'],skills:'Sensor calibration, embedded programming, networking and data visualisation.'},
      ai:{name:'Applied AI mini-project',parts:['Laptop or suitable single-board computer','Python environment','Small, well-labelled dataset','Evaluation notebook and visualisation tools'],steps:['Define a narrow question that data can help answer.','Collect or select a permitted dataset and inspect its quality.','Build a simple baseline model before trying complex methods.','Evaluate on held-out data and document errors and limitations.'],skills:'Python, data preparation, model evaluation and responsible AI.'},
      electronics:{name:'Sensor and indicator circuit',parts:['Microcontroller or suitable low-voltage supply','Sensor module selected for the task','LED with a calculated current-limiting resistor','Breadboard, jumper wires and multimeter'],steps:['Draw the circuit and verify every pin against documentation.','Build the power and ground rails first.','Test the sensor reading before connecting output indicators.','Measure the circuit and document expected versus actual behaviour.'],skills:'Circuit reading, Ohm’s law, measurement and troubleshooting.'},
      design:{name:'3D-printed product prototype',parts:['CAD software','Calipers or measurement reference','3D printer access and suitable filament','Fasteners or inserts selected for the design'],steps:['Sketch the function and measure the parts it must fit.','Create a simple parametric CAD model.','Print a small fit-check before printing the complete part.','Test assembly, revise tolerances and record version changes.'],skills:'CAD, design for assembly, tolerances and iterative prototyping.'}
    };
    const plan=plans[domain],levelNotes={Beginner:'Keep the first version small. Demonstrate one core function before adding features.',Intermediate:'Add at least one measurable performance target and a structured test plan.',Advanced:'Consider system architecture, reliability, repeatability, documentation and a comparison baseline.'};
    const budgetNote=budget<=1000?'Prioritise a minimal proof of concept and reuse available equipment. Confirm local prices before purchasing.':budget<=3000?'Keep the first prototype focused; reserve part of the budget for spares, wiring and iteration.':budget<=6000?'You may have room for better mechanical construction, extra sensors or improved test equipment, subject to actual component prices.':'Plan a staged prototype budget. Validate the core concept before committing to premium parts or fabrication.';
    const out=$('#plannerOutput');
    out.innerHTML=`<span class="eyebrow">GENERATED / STARTER BLUEPRINT</span><h3>${plan.name}</h3><p>${goal?`Your idea: “${goal.replace(/[<>]/g,'')}”. `:''}${levelNotes[level]}</p><div class="generated-plan"><section><b>01 / SUGGESTED COMPONENTS</b><ul>${plan.parts.map(x=>`<li>${x}</li>`).join('')}</ul></section><section><b>02 / BUILD SEQUENCE</b><ul>${plan.steps.map(x=>`<li>${x}</li>`).join('')}</ul></section><section><b>03 / SKILLS TO DEVELOP</b><p>${plan.skills}</p></section><section><b>04 / BUDGET GUIDANCE</b><p>${budgetNote} This is guidance, not a quotation or verified bill of materials.</p></section></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><button type="button" class="button button-primary" id="copyPlan">Copy roadmap ↗</button><a class="button button-ghost" href="mailto:protovox.tech@gmail.com?subject=Project%20build%20plan%20discussion">Discuss with ProtoVox</a></div>`;
    $('#copyPlan')?.addEventListener('click',async()=>{
      const text=`ProtoVox starter roadmap: ${plan.name}\nLevel: ${level}\nIdea: ${goal}\nComponents:\n- ${plan.parts.join('\n- ')}\nBuild sequence:\n- ${plan.steps.join('\n- ')}\nSkills: ${plan.skills}\nBudget guidance: ${budgetNote}\nNote: starter guidance only; verify component specs and costs.`;
      try{await navigator.clipboard.writeText(text);$('#copyPlan').textContent='Copied ✓';}catch(err){$('#copyPlan').textContent='Copy unavailable';}
    });
  });

  // Ohm's law helper for a simple LED series resistor estimate.
  function calculate(){
    const vs=Number($('#supplyV')?.value),vf=Number($('#ledV')?.value),ma=Number($('#ledMA')?.value);
    const result=$('#resistorResult'),explain=$('#resistorExplain'),power=$('#resistorPower');
    if(!result)return;
    if(!Number.isFinite(vs)||!Number.isFinite(vf)||!Number.isFinite(ma)||vs<=vf||ma<=0){
      result.textContent='Check inputs';explain.textContent='Supply voltage must be greater than LED forward voltage, and current must be positive.';power.textContent='No estimate available.';return;
    }
    const amps=ma/1000,r=(vs-vf)/amps,p=(vs-vf)*amps;
    const standard=[100,120,150,180,220,270,330,390,470,560,680,820,1000,1200,1500,1800,2200,2700,3300,3900,4700,5600,6800,8200,10000];
    const nearest=standard.reduce((a,b)=>Math.abs(b-r)<Math.abs(a-r)?b:a);
    result.textContent=`${Math.ceil(r)} Ω`;
    explain.textContent=`Calculated: ${r.toFixed(1)} Ω. Nearest listed common value: ${nearest} Ω. Formula: R = (Vsupply − VLED) / I.`;
    power.textContent=`Estimated resistor dissipation: ${(p*1000).toFixed(1)} mW. Choose a suitable power rating with margin.`;
  }
  $('#calcResistor')?.addEventListener('click',calculate);
  if($('#resistorResult'))calculate();
})();