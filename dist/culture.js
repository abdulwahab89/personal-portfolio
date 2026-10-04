// A single continuous timeline. Accessories and hands share coordinates while held.
(()=>{
 const scene=document.querySelector('.culture-scene');
 if(!scene)return;
 const $=id=>document.getElementById(id);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const duration=22000;
 let frame=0,start=0,elapsed=0,playing=false,seen=false;
 const mix=(a,b,t)=>a+(b-a)*t;
 const ease=t=>t*t*(3-2*t);
 function track(t,keys){
  if(t<=keys[0][0])return keys[0].slice(1);
  for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){const a=keys[i-1],b=keys[i],u=ease((t-a[0])/(b[0]-a[0]));return a.slice(1).map((v,j)=>mix(v,b[j+1],u))}
  return keys.at(-1).slice(1);
 }
 const point=(id,p)=>{const el=$(id);el.setAttribute('cx',p[0]);el.setAttribute('cy',p[1])};
 function arm(id,shoulder,hand,bend){
  const mid=[(shoulder[0]+hand[0])/2+bend,(shoulder[1]+hand[1])/2+20];
  $(id).setAttribute('d',`M${shoulder} Q${mid} ${hand}`);
 }
 function render(ms){
  const t=ms/1000;
  const [ax]=track(t,[[0,112],[.8,112],[3.2,270],[4.3,283],[6,294],[9.3,294],[10.5,275],[17.5,275],[20.5,286],[22,286]]);
  const [ix]=track(t,[[0,435],[1.8,435],[3.6,404],[5.5,400],[10,400],[12,389],[17.5,389],[20.5,382],[22,382]]);
  const walking=(t>.8&&t<3.2)||(t>18&&t<20.5);
  const bob=walking?Math.sin(t*11)*2:0;
  const [bow]=track(t,[[0,0],[12.4,0],[13.8,13],[15.6,13],[17,0],[22,0]]);
  const [iosBow]=track(t,[[0,0],[4.4,0],[6,7],[8.7,7],[10,0],[22,0]]);
  $('android-body').setAttribute('transform',`translate(${ax} ${bob})`);
  $('ios-body').setAttribute('transform',`translate(${ix} ${walking?-bob:0})`);
  $('android-head').setAttribute('transform',`translate(0 ${bow}) rotate(${bow*.22} 0 205)`);
  $('ios-head').setAttribute('transform',`translate(0 ${iosBow}) rotate(${-iosBow*.35} 0 205)`);
  $('android-eyes').setAttribute('transform',`translate(${t<18?4:0} 0)`);
  $('ios-eyes').setAttribute('transform',`translate(${t<18?-3:0} 0)`);
  point('android-shadow',[ax,367]);point('ios-shadow',[ix,367]);
  for(const who of ['android','ios'])for(const side of ['left','right']){
   const stride=walking?Math.sin(t*11+(side==='left'?0:Math.PI)+(who==='ios'?Math.PI:0))*7:0;
   $(who+'-leg-'+side).setAttribute('transform',`rotate(${stride} ${side==='left'?-17:17} 319)`);
  }
  // Top corners remain in Android's hands until the shawl is settled.
  let [left,right,top,depth,opening]=track(t,[[0,148,207,250,65,0],[.8,148,207,250,65,0],[3.2,286,345,250,65,0],[4.5,306,455,225,75,0],[5.8,342,458,87,66,0],[6.4,342,458,87,66,0],[7.2,345,455,194,83,.8],[8.2,366,434,226,97,1],[9,368,432,228,98,1],[9.6,366,434,226,97,1]]);
  if(t>9.6){left=ix-34;right=ix+34;top=226;depth=97;opening=1}
  const center=(left+right)/2;
  // Two ends fold over the neck separately; their connection sits behind it.
  // There is no front yoke or central arch between the hanging panels.
  const end=top+depth+opening*17;
  // Loose ribbon ends remain narrow while the hands spread apart.
  // Only their lower portions sway; the grips stay locked to the held corners.
  const loose=1-opening;
  const sway=Math.sin(t*4.2)*3.5*loose;
  const outerL=left-2*opening+sway,innerL=mix(left+22,center-13,opening)+sway;
  const outerR=right-2*opening+sway*.65,innerR=mix(right-22,center+11,opening)+sway*.65;
  const topInnerL=mix(left+22,center-9,opening),topInnerR=mix(right-22,center+9,opening);
  const bend=8;
  const leftEnd=end+4,rightEnd=end-9;
  const leftPanel=`M${left},${top} Q${left+10},${top-3*opening} ${topInnerL},${top+3*opening} C${topInnerL-4*opening},${top+35} ${innerL+bend},${leftEnd-30} ${innerL},${leftEnd} Q${left+12},${leftEnd+4*opening} ${outerL},${leftEnd+2*opening} C${outerL-4*opening},${leftEnd-34} ${left+4*opening},${top+28} ${left},${top}Z`;
  const rightPanel=`M${topInnerR},${top+3*opening} Q${right-10},${top-3*opening} ${right},${top} C${right-4*opening},${top+28} ${outerR+3*opening},${rightEnd-30} ${outerR},${rightEnd} Q${right-12},${rightEnd+4*opening} ${innerR},${rightEnd+2*opening} C${innerR-bend},${rightEnd-30} ${topInnerR+4*opening},${top+35} ${topInnerR},${top+3*opening}Z`;
  const behindShoulders=t>=6;
  // A soft connecting fold sags between the hands, with daylight below it.
  const neckBand=`M${left},${top+8} Q${center},${top+mix(25,-23,opening)} ${right},${top+8} L${right},${top+18} Q${center},${top+mix(36,-5,opening)} ${left},${top+18}Z`;
  const panels=leftPanel+rightPanel;
  const d=(behindShoulders?'':neckBand)+panels;
  $('ajrak-cloth').setAttribute('d',d);$('ajrak-shading').setAttribute('d',d);
  $('ajrak-back').setAttribute('visibility',behindShoulders?'visible':'hidden');
  $('ajrak-back-cloth').setAttribute('d',panels+neckBand);
  $('ajrak-back-shade').setAttribute('d',panels+neckBand);
  $('ajrak-front-window').setAttribute('y',behindShoulders?228:0);
  const hem=`M${outerL+1},${leftEnd-7} Q${left+12},${leftEnd-3} ${innerL},${leftEnd-7} M${innerR},${rightEnd-5} Q${right-12},${rightEnd-2} ${outerR-1},${rightEnd-7}`;
  $('ajrak-border').setAttribute('d',hem);$('ajrak-stitches').setAttribute('d',hem);
  $('ajrak-border').style.opacity=1;$('ajrak-stitches').style.opacity=1;
  let fringe='';for(let j=0;j<7;j++){const u=j/6;const lx=mix(outerL,innerL,u),rx=mix(innerR,outerR,u);fringe+=`M${lx},${leftEnd+2*opening}l${Math.sin(j)*1.5},4 M${rx},${rightEnd+opening}l${Math.sin(j)*1.5},4 `}
  $('ajrak-fringe').setAttribute('d',fringe);$('ajrak-fringe').style.opacity=1;
  $('ajrak-fold').setAttribute('d',`M${left+7},${top+8} C${left+5},${top+30} ${outerL+11},${leftEnd-30} ${outerL+7},${leftEnd-14} M${right-7},${top+8} C${right-5},${top+30} ${outerR-11},${rightEnd-30} ${outerR-7},${rightEnd-14}`);
  let ahl=[left,top+5],ahr=[right,top+5];
  if(t>9.4){const u=ease(Math.min(1,(t-9.4)/1.2));ahl=[mix(left,ax-52,u),mix(top+5,304,u)];ahr=[mix(right,ax+52,u),mix(top+5,303,u)]}
  let ihl=[ix-53,302],ihr=[ix+53,302];
  // The cap starts visibly on the plinth. iOS reaches it before lifting it.
  let [capx,capy,angle]=track(t,[[0,535,307,0],[10.7,535,307,0],[11.8,482,248,-8],[12.8,367,139,-5],[13.8,277,146,3],[14.6,275,187,3],[15,278,186,1],[15.5,275,187,3],[16.2,275,187,3],[17,275,174,0],[17.5,275,174,0],[20.5,286,174,0],[22,286,174,0]]);
  if(t>=16.2){capx=ax;capy=174+bow+ bob;angle=bow*.22}
  $('sindhi-topi').setAttribute('transform',`translate(${capx} ${capy}) rotate(${angle})`);
  // Use rotated brim coordinates for both hands so the topi never slides away.
  const rad=angle*Math.PI/180;
  const capGrip=x=>[capx+x*Math.cos(rad)+8*Math.sin(rad),capy+x*Math.sin(rad)-8*Math.cos(rad)];
  const gripLeft=capGrip(-40),gripRight=capGrip(40);
  if(t>=9.7&&t<=16.7){const reach=ease(Math.min(1,(t-9.7)/1));const release=t>15.7?ease(Math.min(1,(t-15.7))):0;const u=reach*(1-release);ihl=[mix(ix-53,gripLeft[0],u),mix(302,gripLeft[1],u)];ihr=[mix(ix+53,gripRight[0],u),mix(302,gripRight[1],u)]}
  // A final arm around iOS's far shoulder; drawn behind the bodies and shawl.
  const friendly=ease(Math.max(0,Math.min(1,(t-19)/2)));
  const finalHand=[ix+45,246];
  ahr=[mix(ahr[0],finalHand[0],friendly),mix(ahr[1],finalHand[1],friendly)];
  arm('android-arm-left',[ax-39,246+bob],ahl,-16);
  arm('android-arm-right',[ax+39,246+bob],ahr,14);
  if(friendly>0){$('android-arm-right').style.opacity=1-friendly;$('friend-arm').innerHTML=`<path d="M${ax+36},247 Q${ax+76},204 ${ahr}" fill="none" stroke="#9ec878" stroke-width="18" stroke-linecap="round" opacity="${friendly}"/>`}else{$('android-arm-right').style.opacity=1;$('friend-arm').replaceChildren()}
  arm('ios-arm-left',[ix-37,249],ihl,-18);arm('ios-arm-right',[ix+37,249],ihr,18);
  point('android-hand-left',ahl);point('android-hand-right',ahr);point('ios-hand-left',ihl);point('ios-hand-right',ihr);
  const caption=t<3.5?'A warm welcome, from Android.':t<9.7?'An Ajrak, draped with care.':t<17?'A Sindhi Topi, placed with gratitude.':t<20?'A shared moment. A new friendship.':'Different platforms. Shared roots.';
  if($('culture-caption').textContent!==caption)$('culture-caption').textContent=caption;
  scene.dataset.stage=t<3.5?'approach':t<9.7?'ajrak':t<17?'topi':t<20?'acknowledgment':'together';
 }
 function tick(now){if(!playing)return;if(reduced.matches){playing=false;render(duration);return;}elapsed=Math.min(duration,now-start);render(elapsed);if(elapsed<duration)frame=requestAnimationFrame(tick);else{playing=false;$('culture-replay').setAttribute('aria-label','Replay the Sindhi welcome animation')}}
 function play(){cancelAnimationFrame(frame);playing=false;if(reduced.matches){render(duration);return}elapsed=0;start=performance.now();playing=true;frame=requestAnimationFrame(tick)}
 $('culture-replay').addEventListener('click',play);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){elapsed=Math.min(duration,performance.now()-start);cancelAnimationFrame(frame)}else if(playing){start=performance.now()-elapsed;frame=requestAnimationFrame(tick)}});
 reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);playing=false;render(duration)}});
 render(reduced.matches?duration:0);
 new IntersectionObserver((entries,observer)=>{if(entries.some(e=>e.isIntersecting)&&!seen){seen=true;play();observer.disconnect()}},{threshold:.25}).observe(scene);
})();
