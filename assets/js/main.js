document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. SCROLL REVEAL
  --------------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(element => observer.observe(element));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (prefersReducedMotion || !isFinePointer) return;

  /* ---------------------------------------------------------
     2. CURSOR INTERATIVO (ponto + anel com easing)
  --------------------------------------------------------- */
  document.body.classList.add('custom-cursor-active');

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  };
  requestAnimationFrame(animateRing);

  const interactiveEls = document.querySelectorAll('a, button, .project-card, .row');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });

  window.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  window.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  /* ---------------------------------------------------------
     3. SPOTLIGHT NO HERO — segue o cursor via CSS vars
  --------------------------------------------------------- */
  const home = document.getElementById('home');
  if (home) {
    home.addEventListener('mousemove', (e) => {
      const rect = home.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      home.style.setProperty('--spot-x', `${x}%`);
      home.style.setProperty('--spot-y', `${y}%`);
    });
  }

  /* ---------------------------------------------------------
     4. TERMINAL TYPING — alterna papéis no hero
  --------------------------------------------------------- */
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const roles = [
      'Automação · SQL · Python',
      'Agentes de IA · Azure AI Foundry',
      'Graduando em Ciência & Tecnologia — UFABC'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = roles[roleIndex];

      if (!deleting) {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }

      setTimeout(tick, deleting ? 35 : 55);
    };

    tick();
  }
});
