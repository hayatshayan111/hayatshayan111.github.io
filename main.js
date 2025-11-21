
(function(){
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && nav){
    toggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // Active link highlight
  const path = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('#site-nav a').forEach(a=>{
    if (a.getAttribute('href') === path || a.getAttribute('href') === location.pathname){
      a.classList.add('active');
    }
  });
})();
