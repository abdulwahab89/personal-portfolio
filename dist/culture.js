// A shared idea becomes an app: converge, assemble, launch, return.
(()=>{
 const scene=document.querySelector('.culture-scene');
 if(!scene)return;
 const $=id=>document.getElementById(id);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const svgNS='http://www.w3.org/2000/svg';
 const clamp=x=>Math.max(0,Math.min(1,x));
 const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
 const lerp=(a,b,t)=>a+(b-a)*t;
 const attr=(id,key,value)=>$(id).setAttribute(key,value);
 const move=(id,x,y,rotation=0,scale=1)=>attr(id,'transform',`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`);
 const particles=Array.from({length:14},(_,i)=>{
  const node=document.createElementNS(svgNS,'circle');
  node.setAttribute('r',i%3===0?3:1.5);node.setAttribute('fill',['#9cbf7f','#b4859b','#9aaed0'][i%3]);
  $('orbit-particles').append(node);return node;
 });
 const tiles=Array.from({length:6},(_,i)=>{
  const node=document.createElementNS(svgNS,'rect');
  for(const [key,value] of Object.entries({x:-13,y:-13,width:26,height:26,rx:7,fill:['#c6dda9','#e3b8c8','#c0cce6'][i%3],stroke:'#ffffff', 'stroke-width':1.5}))node.setAttribute(key,value);
  $('build-tiles').append(node);return node;
 });
 function render(ms,still=false){
  const t=still?7:(ms%16000)/1000;
  const phase=t*Math.PI/8;
  const breathe=still?0:Math.sin(phase*6);
  const meet=ease((t-.8)/2.2)*(1-ease((t-12.5)/2));
  const assemble=ease((t-3)/2.5);
  const launch=ease((t-7)/2);
  const returnHome=ease((t-11)/3);
  const flight=launch*(1-returnHome);
  const tilt=still?0:Math.sin(phase*4)*3;
  move('android-pilot',144+meet*13,252+breathe*7-flight*21,tilt+flight*-12);
  move('apple-pilot',496-meet*13,252-breathe*7-flight*21,-tilt+flight*12);
  for(const name of ['android','apple'])attr(name+'-flame','transform',`scale(1 ${1+(still?0:Math.sin(phase*40)*.08)+flight*.4})`);
  const phoneScale=.12+.88*assemble;
  move('app-device',320+Math.sin(flight*Math.PI)*34,236-flight*82,flight*14,phoneScale);
  attr('app-device','opacity',ease((t-2.6)/.7)*(1-ease((t-14.5)/1.3)));
  attr('app-ui','opacity',ease((t-4.2)/1.4));
  attr('launch-shadow','rx',72-flight*28);attr('launch-shadow','opacity',.1-flight*.06);
  for(let i=0;i<2;i++){
   const startX=i?450:190;
   const endX=lerp(startX,320,meet);
   const endY=lerp(230,230,meet)-Math.sin(meet*Math.PI)*48;
   const name=i?'silver':'green';
   move(name+'-spark',endX,endY,t*(i?-75:75),(1-assemble)*ease(t/.5));
   attr(name+'-trail','d',`M${startX} 249 Q${lerp(startX,320,.5)} ${185-meet*20} ${endX} ${endY}`);
   attr(name+'-trail','opacity',meet*(1-assemble)*.7);
  }
  tiles.forEach((node,i)=>{
   const angle=i*Math.PI/3+t*.28;
   const gather=ease((t-3-i*.12)/1.5);
   const radius=125*(1-gather);
   node.setAttribute('transform',`translate(${320+Math.cos(angle)*radius} ${236+Math.sin(angle)*radius*.7}) rotate(${(1-gather)*(i*60+t*24)}) scale(${1-gather*.7})`);
   node.setAttribute('opacity',ease((t-2.6)/.5)*(1-gather));
  });
  particles.forEach((node,i)=>{
   const angle=i*Math.PI*2/particles.length+(still?0:phase);
   const x=255*Math.cos(angle),y=89*Math.sin(angle);
   node.setAttribute('cx',320+x*.956+y*.292);node.setAttribute('cy',242-x*.292+y*.956);
   node.setAttribute('opacity',.35+flight*.5);
  });
  for(const [id,delay] of [['launch-ring-a',0],['launch-ring-b',.5]]){
   const wave=clamp((t-6.5-delay)/2);
   attr(id,'r',30+wave*185);attr(id,'opacity',still?0:Math.sin(wave*Math.PI)*.35);
  }
  // Preserve the original visible copy around the redesigned scene.
  $('culture-caption').textContent='Different platforms. Shared roots.';
 }
 let frame=0,elapsed=0,last=0,visible=false;
 function tick(now){elapsed+=now-last;last=now;render(elapsed);frame=requestAnimationFrame(tick)}
 function stop(){cancelAnimationFrame(frame);frame=0}
 function resume(){stop();if(reduced.matches){render(0,true);return}if(visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick)}}
 $('culture-replay').addEventListener('click',()=>{elapsed=0;render(0,reduced.matches);resume()});
 $('culture-replay').setAttribute('aria-label','Replay the Android and Apple animation');
 $('culture-replay').title='Replay animation';
 document.addEventListener('visibilitychange',resume);
 reduced.addEventListener('change',resume);
 new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);resume()},{threshold:.1}).observe(scene);
 render(0,reduced.matches);
})();
