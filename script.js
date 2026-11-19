// Edit the texts here
const T={
  title:"HOLA AMOOR",
  hint:"tirá hacia atras la flechita y soltala ♥",
  ask:"te amo, ¿querés ser mi novio?",
  yes:"SIIII, TE AMO.",
  final:[{t:"gracias por hacerme el hombre "},{t:"más feliz ",mark:1},{t:"del mundo, te amo mucho mi bemy ♥"}]
};
const $=id=>document.getElementById(id),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('ttl').textContent='♥ '+T.title+' ♥';$('hint').textContent=T.hint;$('msg').textContent=T.ask;
const {s1,s2,env,arrow,str,archer,cat,win,no,yes,cf}=Object.fromEntries(['s1','s2','env','arrow','str','archer','cat','win','no','yes','cf'].map(i=>[i,$(i)]));

// falling hearts
for(let i=0;i<30;i++){const r=Math.random(),h=document.createElement('span');h.textContent='♥';
  h.style.cssText=`left:${r*100}%;font-size:${6+Math.random()*12}px;animation-duration:${6+r*8}s;animation-delay:-${Math.random()*10}s;opacity:${.25+Math.random()*.5}`;$('rain').append(h)}

// pixel cat
const CAT=["kk............kk","kkk..........kkk","kkkkkkkkkkkkkkkk","kkkkkkkkkkkkkkkk","kkwwwkkkkkkwwwkk","kkwkwkkkkkkwkwkk","kkwwwkkkkkkwwwkk","kpkkkkkppkkkkkpk",".kkkkkkkkkkkkkk.","kkkkrrrkkrrrkkkk",".kkkrrrrrrrrkkk.",".kkkkrrrrrrkkkk.","..kkkkrrrrkkkk..","...kkkkrrkkkk..."];
const col={k:'#15121a',w:'#fff',p:'#7fd6ff',r:'#2f80ed'};let px='';
CAT.forEach((row,y)=>[...row].forEach((c,x)=>{if(col[c])px+=`<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${col[c]}"/>`}));cat.innerHTML=px;

// confetti hearts
function burst(n,x,y,sp,wide=0){const cols=['#2f80ed','#56ccf2','#9bd0ff','#7c8cff','#bfe3ff'];
  for(let i=0;i<n;i++){const h=document.createElement('span');h.className='cf';h.textContent='♥';
    h.style.cssText=`left:${x+(Math.random()-.5)*wide}px;top:${y}px;color:${cols[i%5]};font-size:${14+Math.random()*22}px;--dx:${(Math.random()-.5)*sp*2}px;--dy:${-(80+Math.random()*innerHeight*.55)}px;--r:${(Math.random()-.5)*160}deg;filter:blur(${Math.random()<.4?1.5:0}px)`;
    h.addEventListener('animationend',()=>h.remove());cf.append(h)}}

// bow: drag down and release
let pull=0,sy=0,drag=false,shot=false;
const setPull=p=>{pull=p;arrow.style.transform=`translateY(${p}px)`;str.setAttribute('d',`M12 22L70 ${22+p}L128 22`)};
archer.addEventListener('pointerdown',e=>{if(shot)return;drag=true;sy=e.clientY;archer.setPointerCapture(e.pointerId)});
archer.addEventListener('pointermove',e=>{if(drag)setPull(Math.max(0,Math.min(70,e.clientY-sy)))});
const release=()=>{if(!drag)return;drag=false;pull>25?shoot():setPull(0)};
archer.addEventListener('pointerup',release);archer.addEventListener('pointercancel',release);
archer.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!shot){setPull(60);shoot()}}});
function shoot(){shot=true;const p=pull,a=arrow.getBoundingClientRect(),e=env.getBoundingClientRect();
  const to=(e.top+e.height*.45)-(a.top-p);str.setAttribute('d','M12 22L70 22L128 22');
  arrow.animate([{transform:`translateY(${p}px)`},{transform:`translateY(${to}px)`}],{duration:420,easing:'ease-in',fill:'forwards'}).onfinish=hit}
function hit(){arrow.style.opacity=0;const e=env.getBoundingClientRect();env.classList.add('hit');
  burst(22,e.left+e.width/2,e.top+e.height/2,140,60);
  setTimeout(()=>{s1.classList.add('off');s2.classList.remove('off')},750)}

// NO button runs away
let tx=0,ty=0;
function dodge(e){e&&e.preventDefault();const w=win.getBoundingClientRect(),b=no.getBoundingClientRect(),bx=b.left-tx,by=b.top-ty;let nx,ny;
  for(let i=0;i<8;i++){nx=w.left+8+Math.random()*(w.width-b.width-16);ny=w.top+76+Math.random()*(w.height-b.height-84);if(Math.hypot(nx-b.left,ny-b.top)>70)break}
  tx=nx-bx;ty=ny-by;no.style.transform=`translate(${tx}px,${ty}px)`}
['pointerenter','pointerdown','focus','click'].forEach(ev=>no.addEventListener(ev,dodge));

// YES
yes.onclick=()=>{$('btns').style.display='none';$('msg').textContent=T.yes;cat.classList.add('happy');typeText(); new Audio('cancion.mp3').play();
  for(let w=0;w<4;w++)setTimeout(()=>burst(26,innerWidth/2,innerHeight+10,innerWidth*.45,innerWidth),w*450)};
function typeText(){const fin=$('fin');let pi=0,ci=0,node;
  (function step(){if(pi>=T.final.length)return;const p=T.final[pi];
    if(ci===0){node=document.createElement(p.mark?'mark':'span');fin.appendChild(node)}
    node.textContent+=p.t[ci++];if(ci>=p.t.length){pi++;ci=0}
    setTimeout(step,reduce?0:45)})()}