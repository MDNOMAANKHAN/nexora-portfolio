const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = open ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();


/* Project enquiry: prepare a WhatsApp draft for the visitor to review */
const inquiryForm = document.getElementById('project-inquiry');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;
    const formData = new FormData(inquiryForm);
    const name = String(formData.get('name') || '').trim();
    const business = String(formData.get('business') || '').trim();
    const project = String(formData.get('project') || '').trim();
    const details = String(formData.get('details') || '').trim();
    const lines = [
      'Hi Nexora Technologies, I would like to discuss a project.',
      '',
      'Name: ' + name,
      business ? 'Business: ' + business : '',
      'Project type: ' + project,
      details ? 'Project details: ' + details : ''
    ].filter(Boolean);
    const url = 'https://wa.me/917330804540?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}


/* Fluid glass tap feedback: electric-blue contour + soft light ripple */
(() => {
  const selector = 'a,button,.project-card,.service-row,.process-grid>div,.value-strip>div,.product-tile,.solution-card,.case-card,.trust-grid article,.float-card';
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll(selector).forEach((element) => {
    element.classList.add('nexora-interactive');
    if (!element.querySelector(':scope > .nexora-contour')) {
      const contour = document.createElement('span');
      contour.className = 'nexora-contour';
      contour.setAttribute('aria-hidden', 'true');
      const ripple = document.createElement('span');
      ripple.className = 'nexora-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      element.append(contour, ripple);
    }
  });
  if (reducedMotion) return;
  document.addEventListener('pointerdown', (event) => {
    const target = event.target.closest('.nexora-interactive');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty('--tap-x', ((event.clientX - rect.left) / rect.width * 100) + '%');
    target.style.setProperty('--tap-y', ((event.clientY - rect.top) / rect.height * 100) + '%');
    target.classList.remove('nexora-tapped');
    void target.offsetWidth;
    target.classList.add('nexora-tapped');
    window.setTimeout(() => target.classList.remove('nexora-tapped'), 1100);
  }, {passive:true});
})();
