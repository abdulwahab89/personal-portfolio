const projects={gupzar:{title:'GupZar',category:'COMMUNICATION / GUPZAR TECHNOLOGIES',description:'A production social and communication platform for a UAE-based startup, built for iOS and Android.',points:['Develop and maintain real-time messaging, audio and video calls, media messaging, call logs, and blocked-contact features.','Work on WebRTC reconnection, ICE candidate handling, signaling events, and socket synchronization.','Troubleshoot incoming calls, CallKit, Bluetooth, notifications, background behavior, and audio handling across platforms.'],tags:['Flutter','Dart','WebRTC','WebSockets','Firebase']},gozolt:{title:'GOZOLT',category:'RIDE-HAILING & ECOMMERCE / TRIZOLT',description:'A multi-service super-app combining ride booking, eCommerce, and rental services for the Malta market.',points:['Developed Flutter features within a microservices-based enterprise environment.','Implemented real-time driver tracking, dynamic fare calculation, and Google Maps functionality.','Integrated Firebase Authentication and Firestore, plus WebSocket-based chat and customer support.'],tags:['Flutter','Google Maps','Firebase','Firestore','WebSockets']},vendee:{title:'Local Vendee',category:'FOOD DELIVERY / AZ SOLUTIONS',description:'A multi-role food delivery platform with dedicated User, Vendor, and Driver workflows and dashboards.',points:['Developed role-based workflows, real-time order tracking, and audio/video calling.','Integrated payment processing, Firebase services, Google Maps, and REST APIs.','Gathered requirements with clients, troubleshot production issues, and delivered features through Agile sprint cycles.'],tags:['Flutter','Firebase','Maps','Payments','REST APIs']},green:{title:'Green Streak',category:'COMMUNITY & SUSTAINABILITY / FINAL YEAR PROJECT',description:'A Flutter and Node.js social application focused on tree planting, plant care, and environmental participation through community engagement.',points:['Built engagement features including activity streaks, points, achievements, and virtual gardens.','Developed recurring challenges, reminders, and plant-care guidance.','Included community planting maps and a seed marketplace.'],tags:['Flutter','Node.js','Community','Gamification']}};
const dialog=document.querySelector('#project-dialog');
let opener;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=projects[button.dataset.project];opener=button;document.querySelector('#dialog-title').textContent=p.title;document.querySelector('#dialog-category').textContent=p.category;document.querySelector('#dialog-description').textContent=p.description;document.querySelector('#dialog-points').replaceChildren(...p.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));document.querySelector('#dialog-tags').replaceChildren(...p.tags.map(text=>{const s=document.createElement('span');s.textContent=text;return s}));dialog.showModal()}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>opener?.focus());
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}},{rootMargin:'-15% 0px -55% 0px',threshold:0});document.querySelectorAll('main section[id]').forEach(section=>observer.observe(section));
document.querySelector('#copy-email').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('abdulwahablaghari6@gmail.com');status.textContent='Copied!'}catch{status.textContent='Please select and copy the email address.'}setTimeout(()=>status.textContent='',4000)});document.querySelector('#year').textContent=new Date().getFullYear();

const contributionChart=document.querySelector('#contribution-chart');
function showContributionFallback(){contributionChart.closest('.contribution-scroll').hidden=true;document.querySelector('#contribution-fallback').hidden=false;}
contributionChart.addEventListener('error',showContributionFallback);
if(contributionChart.complete && !contributionChart.naturalWidth)showContributionFallback();

// A two-step match-lighting ritual, with keyboard and touch support.
const lampControl=document.querySelector('#lamp-control');
const lampPanel=document.querySelector('#lamp-panel');
const lampAction=document.querySelector('#lamp-action');
const lampStatus=document.querySelector('#lamp-status');
let matchLit=false, lampBusy=false;
const isDark=()=>document.documentElement.dataset.theme==='dark';
function renderLamp(){
 const dark=isDark();
 lampControl.setAttribute('aria-label',dark?'Light the lamp to switch to light mode':'Extinguish the lamp to switch to dark mode');
 document.querySelector('#lamp-label').textContent=dark?'Light the lamp':'Lamp is lit';
 document.querySelector('#lamp-instruction').textContent=dark?'Strike a match, then bring its light to the lamp.':'A warm glow for your ideas. Turn off the lamp for a quieter view.';
 lampAction.textContent=dark?(matchLit?'Light the lamp ↗':'Strike a match ✦'):'Extinguish the lamp';
 document.querySelector('meta[name="theme-color"]').content=dark?'#171819':'#f7f5f0';
}
function setTheme(theme){
 document.documentElement.dataset.theme=theme;
 try{localStorage.setItem('portfolio-theme',theme)}catch{}
 matchLit=false;lampPanel.classList.remove('match-lit','striking');renderLamp();
}
function closeLamp(){if(lampBusy)return;lampPanel.hidden=true;lampControl.setAttribute('aria-expanded','false');matchLit=false;lampPanel.classList.remove('match-lit','striking','extinguishing');lampStatus.textContent='';renderLamp();}
lampControl.addEventListener('click',()=>{if(lampBusy)return;if(!lampPanel.hidden){closeLamp();return}lampPanel.hidden=false;lampControl.setAttribute('aria-expanded','true');renderLamp();lampAction.focus()});
document.querySelector('#lamp-cancel').addEventListener('click',()=>{closeLamp();lampControl.focus()});
lampAction.addEventListener('click',()=>{
 if(lampBusy)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 lampBusy=true;lampAction.disabled=true;
 if(isDark()&&!matchLit){
  lampPanel.classList.add('striking');lampStatus.textContent='Striking the match…';
  setTimeout(()=>{matchLit=true;lampPanel.classList.add('match-lit');lampPanel.classList.remove('striking');lampStatus.textContent='The match is lit. Light the lamp when you’re ready.';lampBusy=false;lampAction.disabled=false;renderLamp()},reduced?0:650);
 }else{
  const next=isDark()?'light':'dark';lampPanel.classList.add(next==='light'?'lighting':'extinguishing');
  lampStatus.textContent=next==='light'?'Lighting the lamp…':'Extinguishing the lamp…';
  setTimeout(()=>{setTheme(next);lampPanel.classList.remove('lighting');lampBusy=false;lampAction.disabled=false;lampStatus.textContent=next==='light'?'Light mode is on.':'Dark mode is on.'},reduced?0:650);
 }
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lampPanel.hidden){closeLamp();lampControl.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('.lamp-widget')&&!lampPanel.hidden)closeLamp()});
window.addEventListener('storage',e=>{if(e.key==='portfolio-theme'&&['dark','light'].includes(e.newValue)){document.documentElement.dataset.theme=e.newValue;matchLit=false;lampPanel.classList.remove('match-lit');renderLamp()}});
renderLamp();
