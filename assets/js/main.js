document.addEventListener('DOMContentLoaded', () => {
  const I18N = window.I18N;

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

  /* ---------------------------------------------------------
     1b. BARRA DE PROGRESSO + SCROLLSPY
  --------------------------------------------------------- */
  const progress = document.querySelector('.scroll-progress');
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

    const line = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach(sec => { if (sec.offsetTop <= line) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === `#${current}`));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------------------------------------------------------
     1c. MENU MOBILE
  --------------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-links');
  if (toggle && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', I18N.t(open ? 'menu.close' : 'menu.open'));
    };
    document.addEventListener('langchange', () => setMenu(menu.classList.contains('is-open')));
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------------------------------------------------------
     1f. CAMPO DE FLUXO NO HERO — partículas deixam rastros que
     acompanham um campo vetorial; o cursor cria um redemoinho,
     arrasta o fluxo e o clique dispara uma onda de choque.
  --------------------------------------------------------- */
  const canvas = document.getElementById('hero-graph');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    const heroEl = document.getElementById('home');
    let w = 0, h = 0, t = 0, running = true;
    let parts = [];
    const waves = [];
    const ptr = { x: -9999, y: -9999, vx: 0, vy: 0 };
    const RADIUS = 210;

    const spawn = (p) => {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.vx = p.vy = 0;
      p.life = 180 + Math.random() * 320;
      return p;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = heroEl.clientWidth;
      h = heroEl.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(260, Math.max(70, (w * h) / 7000)) * (w < 800 ? 0.6 : 1));
      parts = Array.from({ length: count }, () => spawn({}));
    };
    resize();
    let lastWidth = w;
    window.addEventListener('resize', () => {
      // ignora o resize causado só pela barra de endereço do celular
      if (heroEl.clientWidth !== lastWidth) { lastWidth = heroEl.clientWidth; resize(); }
    });

    const toLocal = (e) => {
      const r = heroEl.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    heroEl.addEventListener('pointermove', (e) => {
      const p = toLocal(e);
      if (ptr.x > -9000) {
        ptr.vx = ptr.vx * 0.6 + (p.x - ptr.x) * 0.4;
        ptr.vy = ptr.vy * 0.6 + (p.y - ptr.y) * 0.4;
      }
      ptr.x = p.x; ptr.y = p.y;
    });
    heroEl.addEventListener('pointerleave', () => { ptr.x = ptr.y = -9999; });
    heroEl.addEventListener('pointerdown', (e) => {
      const p = toLocal(e);
      waves.push({ x: p.x, y: p.y, r: 0 });
    });

    const frame = () => {
      if (!running) return;
      t += 0.004;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 1.6;

      ptr.vx *= 0.9; ptr.vy *= 0.9;

      for (const p of parts) {
        const a = (Math.sin(p.x * 0.004 + t * 2) + Math.cos(p.y * 0.005 - t * 1.5) +
          Math.sin((p.x + p.y) * 0.003 + t)) * 1.3;
        p.vx += (Math.cos(a) * 1.4 - p.vx) * 0.06;
        p.vy += (Math.sin(a) * 1.4 - p.vy) * 0.06;

        const dx = p.x - ptr.x, dy = p.y - ptr.y;
        const d = Math.hypot(dx, dy);
        if (d < RADIUS && d > 1) {
          const f = (1 - d / RADIUS) ** 2;
          p.vx += (-dy / d) * f * 1.3 + ptr.vx * f * 0.12;
          p.vy += (dx / d) * f * 1.3 + ptr.vy * f * 0.12;
        }

        for (const wv of waves) {
          const wx = p.x - wv.x, wy = p.y - wv.y;
          const wd = Math.hypot(wx, wy);
          const gap = Math.abs(wd - wv.r);
          if (gap < 45 && wd > 1) {
            const f = 1 - gap / 45;
            p.vx += (wx / wd) * f * 2.6;
            p.vy += (wy / wd) * f * 2.6;
          }
        }

        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 4.5) { p.vx *= 4.5 / sp; p.vy *= 4.5 / sp; }

        const ox = p.x, oy = p.y;
        p.x += p.vx; p.y += p.vy;
        if (--p.life <= 0 || p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          spawn(p);
          continue;
        }

        const s = Math.min(sp / 3, 1);
        ctx.strokeStyle = `hsla(${208 - s * 14}, 90%, ${58 + s * 22}%, ${0.4 + s * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i];
        wv.r += 9;
        if (wv.r > 460) { waves.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(106,184,255,${(1 - wv.r / 460) * 0.45})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(wv.x, wv.y, wv.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(frame);
    };

    new IntersectionObserver((e) => {
      const was = running;
      running = e[0].isIntersecting;
      if (running && !was) frame();
    }).observe(heroEl);
    frame();
  }

  /* ---------------------------------------------------------
     1g. MASCOTE — olhos e cabeça seguem o cursor, pisca,
     reage ao clique e "olha em volta" quando ninguém mexe o mouse.
  --------------------------------------------------------- */
  const bot = document.getElementById('bot');
  if (bot) {
    const bubble = document.querySelector('.bot-bubble');
    const phrases = () => I18N.t('bot.phrases');
    let phraseIndex = 0;
    let bubbleTimer;

    const say = (text, ms = 2600) => {
      if (!bubble) return;
      bubble.textContent = text;
      bubble.classList.add('visible');
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove('visible'), ms);
    };

    bot.addEventListener('click', () => {
      const list = phrases();
      say(list[phraseIndex % list.length]);
      phraseIndex = (phraseIndex + 1) % list.length;
      bot.classList.add('happy', 'wave');
      setTimeout(() => bot.classList.remove('happy', 'wave'), 1500);
    });

    if (!prefersReducedMotion) {
      setTimeout(() => say(I18N.t('bot.hint'), 3200), 1800);

      const head = bot.querySelector('#bot-head');
      const pupils = [...bot.querySelectorAll('.pupil')];
      const eyes = [...bot.querySelectorAll('.sclera')];
      const svg = bot.querySelector('svg');
      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

      const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
      let lastMove = -Infinity;
      let wanderAt = 0;
      const cur = { tx: 0, ty: 0, rot: 0, px: [0, 0], py: [0, 0] };
      let visible = true;

      window.addEventListener('pointermove', (e) => {
        target.x = e.clientX; target.y = e.clientY;
        lastMove = performance.now();
      }, { passive: true });

      new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(bot);

      (function blink() {
        setTimeout(() => {
          bot.classList.add('blink');
          setTimeout(() => bot.classList.remove('blink'), 140);
          blink();
        }, 2200 + Math.random() * 3200);
      })();

      const look = (now) => {
        requestAnimationFrame(look);
        if (!visible) return;

        const box = svg.getBoundingClientRect();
        if (now - lastMove > 4000 && now > wanderAt) {
          target.x = box.left + box.width / 2 + (Math.random() - 0.5) * 700;
          target.y = box.top + box.height / 2 + (Math.random() - 0.5) * 400;
          wanderAt = now + 1200 + Math.random() * 1600;
        }

        const dx = target.x - (box.left + box.width / 2);
        const dy = target.y - (box.top + box.height * 0.37);
        const nx = clamp(dx / 500, -1, 1);
        const ny = clamp(dy / 500, -1, 1);
        cur.tx += (nx * 9 - cur.tx) * 0.1;
        cur.ty += (ny * 6 - cur.ty) * 0.1;
        cur.rot += (nx * 7 - cur.rot) * 0.1;
        head.setAttribute('transform',
          `translate(${cur.tx.toFixed(2)} ${cur.ty.toFixed(2)}) rotate(${cur.rot.toFixed(2)} 200 240)`);

        eyes.forEach((eye, i) => {
          const r = eye.getBoundingClientRect();
          const vx = target.x - (r.left + r.width / 2);
          const vy = target.y - (r.top + r.height / 2);
          const dist = Math.hypot(vx, vy) || 1;
          const reach = 13 * Math.min(dist / 180, 1);
          cur.px[i] += ((vx / dist) * reach - cur.px[i]) * 0.22;
          cur.py[i] += ((vy / dist) * reach * 1.05 - cur.py[i]) * 0.22;
          pupils[i].setAttribute('transform', `translate(${cur.px[i].toFixed(2)} ${cur.py[i].toFixed(2)})`);
        });
      };
      requestAnimationFrame(look);
    }
  }

  /* ---------------------------------------------------------
     1h. FOTO 3D — foto parada; só os ícones da stack orbitam
     em profundidade ao redor dela.
  --------------------------------------------------------- */
  const stage = document.getElementById('photo-3d');
  if (stage) {
    const chips = [...stage.querySelectorAll('.p-chip')];
    let angle = 0, visible = true, last = performance.now();

    const place = () => {
      const w = stage.offsetWidth;
      const rx = Math.min(w * 0.68, window.innerWidth / 2 - 44);
      chips.forEach((chip, i) => {
        const a = angle + (i * Math.PI * 2) / chips.length;
        const x = Math.cos(a) * rx;
        const z = Math.sin(a) * rx * 0.9;
        const y = Math.sin(a * 2 + i) * 12 + Math.sin(a) * rx * 0.1;
        const depth = (Math.sin(a) + 1) / 2;
        chip.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) translate(-50%, -50%)`;
        chip.style.opacity = (0.5 + depth * 0.5).toFixed(2);
      });
    };
    place();

    if (!prefersReducedMotion) {
      window.addEventListener('resize', place);
      new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(stage);

      const spin = (now) => {
        requestAnimationFrame(spin);
        const dt = Math.min(now - last, 50);
        last = now;
        if (!visible) return;
        angle += dt * 0.00055;
        place();
      };
      requestAnimationFrame(spin);
    }
  }

  /* ---------------------------------------------------------
     1i. TERMINAL TYPING — alterna papéis no hero
     (sem animação: mostra o primeiro papel parado)
  --------------------------------------------------------- */
  const typingEl = document.querySelector('.typing');
  if (typingEl) {
    const roles = () => I18N.t('typing');

    if (prefersReducedMotion) {
      const show = () => { typingEl.textContent = roles()[0]; };
      document.addEventListener('langchange', show);
      show();
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const tick = () => {
        const list = roles();
        const current = list[roleIndex % list.length];

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
            roleIndex = (roleIndex + 1) % list.length;
          }
        }

        setTimeout(tick, deleting ? 35 : 55);
      };

      document.addEventListener('langchange', () => {
        roleIndex = 0;
        charIndex = 0;
        deleting = false;
        typingEl.textContent = '';
      });

      tick();
    }
  }

  if (prefersReducedMotion || !isFinePointer) return;

  /* ---------------------------------------------------------
     2b. TILT 3D NOS CARDS
  --------------------------------------------------------- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', `${px * 8}deg`);
      card.style.setProperty('--rx', `${-py * 8}deg`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });

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
});
