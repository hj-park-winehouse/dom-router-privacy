(()=>{
  'use strict';
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  let lang='ko',observer;
  const read=(k,f)=>{try{return localStorage.getItem(k)||f}catch{return f}};
  const save=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
  function render(){
    const hash=location.hash.slice(1);lang=hash==='english'||hash.startsWith('en-')?'en':hash==='korean'||hash.startsWith('ko-')?'ko':read('domrouter-privacy-lang','ko');
    if(!['ko','en'].includes(lang))lang='ko';save('domrouter-privacy-lang',lang);
    const id=lang==='ko'?'korean':'english';document.documentElement.lang=lang;document.body.classList.toggle('korean',lang==='ko');
    $$('article').forEach(a=>a.hidden=a.id!==id);$$('[data-en][data-ko]').forEach(e=>e.textContent=e.dataset[lang]);
    $('#language').textContent=lang==='ko'?'English':'한국어';$('#policy-nav').href='#'+id;document.title=(lang==='ko'?'개인정보처리방침':'Privacy Policy')+' | DOM Router Docs';
    observer?.disconnect();const toc=$('#toc-links');toc.replaceChildren();
    const sections=$$('#'+id+' section');sections.forEach(s=>{const a=document.createElement('a');a.href='#'+s.id;a.textContent=s.querySelector('h2').textContent.replace(/^\d\.\s*/,'');toc.append(a)});
    observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)$$('#toc-links a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))},{rootMargin:'-100px 0px -60% 0px'});sections.forEach(s=>observer.observe(s));
    document.body.classList.remove('menu-open');$('#menu').setAttribute('aria-expanded','false');
    if(hash&&document.getElementById(hash)&&hash!==id)document.getElementById(hash).scrollIntoView();else window.scrollTo(0,0);
  }
  $('#language').addEventListener('click',()=>{location.hash=lang==='ko'?'english':'korean'});
  $('#theme').addEventListener('click',()=>{const dark=document.body.classList.toggle('dark');save('domrouter-docs-theme',dark?'dark':'light');$('#theme').setAttribute('aria-pressed',String(dark))});
  const dark=read('domrouter-docs-theme','light')==='dark';document.body.classList.toggle('dark',dark);$('#theme').setAttribute('aria-pressed',String(dark));
  $('#menu').addEventListener('click',()=>$('#menu').setAttribute('aria-expanded',String(document.body.classList.toggle('menu-open'))));
  $('.skip').addEventListener('click',e=>{e.preventDefault();$('#content').focus({preventScroll:true})});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.body.classList.remove('menu-open');$('#menu').setAttribute('aria-expanded','false')}});
  window.addEventListener('hashchange',render);render();
})();
