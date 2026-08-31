const nav=document.querySelector('.nav');
const progress=document.querySelector('#progressBar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>40);
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(h?window.scrollY/h*100:0)+'%';
});
const menu=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',open);
});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counter=document.querySelector('#counter');
let counted=false;
const countObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting&&!counted){
    counted=true;
    const start=0,end=1000000,duration=1700,t0=performance.now();
    const tick=t=>{
      const p=Math.min((t-t0)/duration,1);
      const eased=1-Math.pow(1-p,3);
      counter.textContent=Math.round(end*eased).toLocaleString();
      if(p<1)requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
});
if(counter)countObs.observe(counter);

const ideas=[
  "Send a genuine thank-you to someone whose work is often overlooked.",
  "Help a neighbour with one small task before they ask.",
  "Introduce two people who could help one another.",
  "Mentor someone for 20 minutes and share one thing you wish you knew earlier.",
  "Recognize an unsung volunteer in your community.",
  "Ask a colleague: “How can I make your day a little easier?”",
  "Use your skills to help a nonprofit or community organization.",
  "Invite someone who feels left out into the conversation."
];
document.querySelector('#kindnessBtn')?.addEventListener('click',()=>{
  const box=document.querySelector('#ideaBox');
  box.textContent=ideas[Math.floor(Math.random()*ideas.length)];
  box.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,fill:'both'});
});
