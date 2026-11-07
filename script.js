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
