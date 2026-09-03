const roles = ['CREATIVE','SCALABLE','DIGITAL','FULL-STACK'];
const roleEl = document.getElementById('role');
let roleIndex = 0;

setInterval(() => {
  roleEl.animate([{opacity:1, transform:'translateY(0)'},{opacity:0, transform:'translateY(8px)'}], {duration:220, fill:'forwards'}).finished.then(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.animate([{opacity:0, transform:'translateY(-8px)'},{opacity:1, transform:'translateY(0)'}], {duration:350, fill:'forwards'});
  });
}, 2200);

const revealItems = document.querySelectorAll('.about-grid, .project, .skills-title, .tags, .contact-wrap');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.12});
revealItems.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

const style = document.createElement('style');
style.textContent = `.reveal{opacity:0;transform:translateY(35px);transition:opacity .8s ease,transform .8s ease}.reveal.visible{opacity:1;transform:none}`;
document.head.appendChild(style);

// Smoothly close focus after clicking a navigation link on small screens.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => document.activeElement?.blur());
});
