// ---------- Navbar shadow on scroll ----------
const nav = document.getElementById('mainNav');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // hysteresis: shrink after 100px, expand back only under 30px — prevents jitter
  if (y > 100) nav.classList.add('scrolled');
  else if (y < 30) nav.classList.remove('scrolled');
  toTop.classList.toggle('show', y > 500);
});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, {threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- Animated counters ----------
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    counterObserver.unobserve(el);
    const target = +el.dataset.target;
    const dur = 1800, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); // ease-out
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, {threshold: 0.5});
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ---------- Newsletter subscribe (front-end only) ----------
function subscribeNews(e, form){
  e.preventDefault();
  form.innerHTML = '<span style="color:var(--gold);font-weight:600"><i class="bi bi-check-circle-fill me-2"></i>Thank you! You are subscribed.</span>';
  return false;
}

// ---------- Active nav link on scroll ----------
const sections = [...document.querySelectorAll('section[id], header[id]')];
const navLinks = [...document.querySelectorAll('.navbar-main .nav-link[href^="#"]')];
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  let current = '#home';
  sections.forEach(s => { if (s.offsetTop <= y) current = '#' + s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === current));
});

// ---------- Enquiry form (front-end only) ----------
function sendEnquiry(e, form){
  e.preventDefault();
  form.innerHTML = '<div style="text-align:center;padding:2rem 0"><i class="bi bi-check-circle-fill" style="font-size:2.6rem;color:var(--teal)"></i><h5 style="color:var(--navy);font-weight:700;margin-top:1rem">Thank you!</h5><p style="color:var(--muted)">Your enquiry has been received. We will contact you shortly at the details you provided.</p></div>';
  return false;
}
