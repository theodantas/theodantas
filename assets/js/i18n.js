/* ==========================================================================
   i18n — PT / EN / ES
   O português é capturado direto do HTML (fonte da verdade). Aqui ficam as
   traduções EN/ES e as strings que o JS usa dinamicamente.
   ========================================================================== */
(() => {
  const LANGS = ['pt', 'en', 'es'];
  const HTML_LANG = { pt: 'pt-BR', en: 'en', es: 'es' };

  const dict = {
    pt: {
      'typing': ['Automação · SQL · Python', 'Agentes de IA · Microsoft AI Foundry', 'Graduando em Ciência & Tecnologia — UFABC'],
      'bot.hint': 'Passa o mouse por aqui.',
      'bot.phrases': [
        'Oi! Eu sou o bot do Théo.',
        'Automatizo o que é repetitivo.',
        'Python, SQL e agentes de IA.',
        'Dá uma olhada nos projetos!',
        'Ei, isso faz cócegas!'
      ],
      'menu.open': 'Abrir menu',
      'menu.close': 'Fechar menu'
    },

    en: {
      'typing': ['Automation · SQL · Python', 'AI Agents · Microsoft AI Foundry', 'Undergraduate in Science & Technology — UFABC'],
      'bot.hint': 'Move your mouse over here.',
      'bot.phrases': [
        "Hi! I'm Théo's bot.",
        'I automate the repetitive stuff.',
        'Python, SQL and AI agents.',
        'Check out the projects!',
        'Hey, that tickles!'
      ],
      'bot.aria': "Théo's mascot: click to make it react",
      'menu.open': 'Open menu',
      'menu.close': 'Close menu',
      'lang.group': 'Language',

      'meta.title': 'Théo Dantas',
      'meta.desc': "Théo Dantas' portfolio — Process & Digital Transformation at Schneider Electric, focused on automation, data and AI agents.",
      'og.title': 'Théo Dantas | Portfolio',
      'og.desc': 'Projects and background in automation, data and AI agents.',

      'nav.about': 'About me',
      'nav.projects': 'Projects',
      'nav.stack': 'Stack',
      'nav.contact': 'Contact',

      'hero.title': 'I\'m Théo,<br /><span class="highlight">I turn technology into efficiency.</span>',
      'hero.cta1': 'View projects',
      'hero.cta2': 'Download résumé',
      'cv.href': './assets/curriculo-theo-en.pdf',

      'alt.photo': 'Photo of Théo Dantas, no background',
      'about.title': 'Turning problems into digital solutions',
      'about.p1': 'I believe technology reaches its true potential when it solves real problems and eliminates mechanical work.',
      'about.p2': "I'm an undergraduate in Science and Technology at UFABC and work in Digital Transformation at Schneider Electric. My day-to-day focus isn't just using tools, but understanding the root of operational bottlenecks and solving them through automation.",
      'about.p3': 'My technical foundation in Python and SQL is combined with a corporate vision from someone who understands that every process can and should be optimized. This portfolio is the practical record of that vision.',

      'projects.title': 'Technology in practice',
      'proj.view': 'View project',
      'proj.t.grafos': 'Graph Analysis',
      'proj.grafos': 'Analysis of the network of relationships between Brazilian national team players, based on the clubs they shared across generations.',
      'proj.protech': 'Web application focused on food safety, built to help people with allergies, intolerances and dietary restrictions.',
      'proj.blendlang': 'Web application for learning English that mixes Portuguese and English phrases according to different levels and categories.',
      'proj.elevadores': "Institutional website built to consolidate the company's digital presence, focused on showcasing services and making it easier to win customers.",
      'proj.portfolio': 'My professional portfolio, built to showcase my background, projects and technology skills.',
      'alt.grafos': 'Cover of the Graph Analysis project',
      'alt.protech': 'Cover of the Protech Health project',
      'alt.blendlang': 'Cover of the BlendLang project',
      'alt.elevadores': 'Cover of the Dantas Elevadores project',
      'alt.portfolio': 'Cover of the Portfolio project',

      'stack.title': 'Tools that drive efficiency',
      'stack.tech': 'Technology',
      'stack.app': 'Application',
      'stack.t.agents': 'AI Agents',
      'stack.t.automation': 'Process automation',
      'stack.agents': "Development of intelligent agents that don't just answer questions but interpret operational context and carry out autonomous tasks.",
      'stack.foundry': "Microsoft's cloud environment used to develop, test and integrate artificial intelligence solutions.",
      'stack.python': 'Main language for automation, data analysis and AI agent integration, backed by a large ecosystem of libraries.',
      'stack.sql': 'Querying, structuring and modeling data in relational databases to support analysis and decision-making.',
      'stack.automation': 'Analytical vision to map operational bottlenecks and design efficient flows before applying any technology.',
      'stack.powerautomate': "Building automated flows (RPA and DPA) in the Microsoft ecosystem to connect apps, sync data and eliminate repetitive manual work.",
      'stack.html': 'Semantic structuring of web pages and applications, ensuring clear organization of information and accessibility.',
      'stack.css': 'Advanced styling and responsive design to build modern, polished interfaces that adapt to any screen.',
      'stack.js': 'Front-end logic to add interactivity, validate data and consume APIs dynamically.',
      'alt.agents': 'AI agents.',
      'alt.foundry': 'Microsoft AI Foundry logo.',
      'alt.python': 'Python logo.',
      'alt.sql': 'MySQL logo.',
      'alt.automation': 'Process automation.',
      'alt.powerautomate': 'Power Automate logo.',
      'alt.html': 'HTML5 logo.',
      'alt.css': 'CSS3 logo.',
      'alt.js': 'JavaScript logo.',

      'contact.title': 'Get in touch',
      'contact.lead': "Whether to discuss process optimization, explore the practical use of AI or swap experiences in the data field, feel free to send me a message. Let's talk!",
      'contact.cv': 'Download my résumé',
      'footer.rights': '© 2026 Théo Dantas. All rights reserved.'
    },

    es: {
      'typing': ['Automatización · SQL · Python', 'Agentes de IA · Microsoft AI Foundry', 'Estudiante de Ciencia y Tecnología — UFABC'],
      'bot.hint': 'Pasa el mouse por aquí.',
      'bot.phrases': [
        '¡Hola! Soy el bot de Théo.',
        'Automatizo lo repetitivo.',
        'Python, SQL y agentes de IA.',
        '¡Echa un vistazo a los proyectos!',
        '¡Eh, me haces cosquillas!'
      ],
      'bot.aria': 'Mascota de Théo: haz clic para que reaccione',
      'menu.open': 'Abrir menú',
      'menu.close': 'Cerrar menú',
      'lang.group': 'Idioma',

      'meta.title': 'Théo Dantas',
      'meta.desc': 'Portafolio de Théo Dantas — Process & Digital Transformation en Schneider Electric, con foco en automatización, datos y agentes de IA.',
      'og.title': 'Théo Dantas | Portafolio',
      'og.desc': 'Proyectos y trayectoria en automatización, datos y agentes de IA.',

      'nav.about': 'Sobre mí',
      'nav.projects': 'Proyectos',
      'nav.stack': 'Stack',
      'nav.contact': 'Contacto',

      'hero.title': 'Soy Théo,<br /><span class="highlight">transformo tecnología en eficiencia.</span>',
      'hero.cta1': 'Ver proyectos',
      'hero.cta2': 'Descargar currículum',
      'cv.href': './assets/curriculo-theo-es.pdf',

      'alt.photo': 'Foto de Théo Dantas, sin fondo',
      'about.title': 'Transformando problemas en soluciones digitales',
      'about.p1': 'Creo que la tecnología alcanza su verdadero potencial cuando resuelve problemas reales y elimina el trabajo mecánico.',
      'about.p2': 'Soy estudiante de Ciencia y Tecnología en la UFABC y trabajo en Transformación Digital en Schneider Electric. Mi enfoque diario no es solo usar herramientas, sino entender la raíz de los cuellos de botella operativos y resolverlos mediante la automatización.',
      'about.p3': 'Mi base técnica en Python y SQL se une a la visión corporativa de quien entiende que todo proceso puede y debe ser optimizado. Este portafolio es el registro práctico de esa visión.',

      'projects.title': 'Tecnología en la práctica',
      'proj.view': 'Ver proyecto',
      'proj.t.grafos': 'Análisis de Grafos',
      'proj.grafos': 'Análisis de la red de relaciones entre jugadores de la selección brasileña a partir de los clubes que compartieron a lo largo de las generaciones.',
      'proj.protech': 'Aplicación web centrada en la seguridad alimentaria, desarrollada para ayudar a personas con alergias, intolerancias y restricciones alimentarias.',
      'proj.blendlang': 'Aplicación web para aprender inglés que combina frases en portugués e inglés según distintos niveles y categorías.',
      'proj.elevadores': 'Sitio institucional desarrollado para consolidar la presencia digital de la empresa, con foco en presentar servicios y facilitar la captación de clientes.',
      'proj.portfolio': 'Mi portafolio profesional, desarrollado para presentar mi trayectoria, proyectos y conocimientos en tecnología.',
      'alt.grafos': 'Portada del proyecto de Análisis de Grafos',
      'alt.protech': 'Portada del proyecto Protech Health',
      'alt.blendlang': 'Portada del proyecto BlendLang',
      'alt.elevadores': 'Portada del proyecto Dantas Elevadores',
      'alt.portfolio': 'Portada del proyecto Portafolio',

      'stack.title': 'Herramientas que generan eficiencia',
      'stack.tech': 'Tecnología',
      'stack.app': 'Aplicación',
      'stack.t.agents': 'Agentes de IA',
      'stack.t.automation': 'Automatización de procesos',
      'stack.agents': 'Desarrollo de agentes inteligentes que no solo responden preguntas, sino que interpretan contextos operativos y ejecutan tareas autónomas.',
      'stack.foundry': 'Entorno en la nube de Microsoft utilizado para desarrollar, probar e integrar soluciones de inteligencia artificial.',
      'stack.python': 'Lenguaje principal para automatizaciones, análisis de datos e integración con agentes de IA, respaldado por un gran ecosistema de bibliotecas.',
      'stack.sql': 'Consulta, estructuración y modelado de datos en bases de datos relacionales para apoyar análisis y procesos de decisión.',
      'stack.automation': 'Visión analítica para mapear cuellos de botella operativos y diseñar flujos eficientes antes de aplicar cualquier tecnología.',
      'stack.powerautomate': 'Creación de flujos automatizados (RPA y DPA) en el ecosistema Microsoft para conectar aplicaciones, sincronizar datos y eliminar el trabajo manual repetitivo.',
      'stack.html': 'Estructuración semántica de páginas y aplicaciones web, garantizando una organización clara de la información y accesibilidad.',
      'stack.css': 'Estilización avanzada y diseño responsivo para crear interfaces modernas, pulidas y adaptables a cualquier pantalla.',
      'stack.js': 'Lógica en el front-end para añadir interactividad, validar datos y consumir APIs de forma dinámica.',
      'alt.agents': 'Agentes de IA.',
      'alt.foundry': 'Logo de Microsoft AI Foundry.',
      'alt.python': 'Logo de Python.',
      'alt.sql': 'Logo de MySQL.',
      'alt.automation': 'Automatización de procesos.',
      'alt.powerautomate': 'Logo de Power Automate.',
      'alt.html': 'Logo de HTML5.',
      'alt.css': 'Logo de CSS3.',
      'alt.js': 'Logo de JavaScript.',

      'contact.title': 'Habla conmigo',
      'contact.lead': 'Ya sea para hablar sobre optimización de procesos, explorar el uso práctico de la IA o intercambiar experiencias en el área de datos, no dudes en enviarme un mensaje. ¡Hablemos!',
      'contact.cv': 'Descarga mi currículum',
      'footer.rights': '© 2026 Théo Dantas. Todos los derechos reservados.'
    }
  };

  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  const parseAttrs = (el) => el.dataset.i18nAttr.split(';').map((pair) => pair.split(':'));
  const metaTargets = [
    ['meta.desc', 'meta[name="description"]', 'content'],
    ['og.title', 'meta[property="og:title"]', 'content'],
    ['og.desc', 'meta[property="og:description"]', 'content']
  ];

  // português = o que já está no HTML
  textEls.forEach((el) => { dict.pt[el.dataset.i18n] = el.innerHTML.trim().replace(/\s+/g, ' '); });
  attrEls.forEach((el) => parseAttrs(el).forEach(([attr, key]) => { dict.pt[key] = el.getAttribute(attr); }));
  dict.pt['meta.title'] = document.title;
  metaTargets.forEach(([key, sel, attr]) => {
    const node = document.querySelector(sel);
    if (node) dict.pt[key] = node.getAttribute(attr);
  });

  let current = 'pt';
  const t = (key) => (dict[current] && dict[current][key] !== undefined ? dict[current][key] : dict.pt[key]);

  const buttons = [...document.querySelectorAll('.lang-switch [data-lang]')];

  const apply = (lang) => {
    current = lang;
    textEls.forEach((el) => {
      const v = t(el.dataset.i18n);
      if (v !== undefined) el.innerHTML = v;
    });
    attrEls.forEach((el) => parseAttrs(el).forEach(([attr, key]) => {
      const v = t(key);
      if (v !== undefined) el.setAttribute(attr, v);
    }));
    metaTargets.forEach(([key, sel, attr]) => {
      const node = document.querySelector(sel);
      const v = t(key);
      if (node && v !== undefined) node.setAttribute(attr, v);
    });
    document.title = t('meta.title');
    document.documentElement.lang = HTML_LANG[lang];

    const group = document.querySelector('.lang-switch');
    if (group) group.setAttribute('aria-label', t('lang.group') || 'Idioma');
    buttons.forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  };

  const setLang = (lang) => {
    if (!LANGS.includes(lang)) lang = 'pt';
    try { localStorage.setItem('lang', lang); } catch (_) { /* sem storage */ }
    apply(lang);
  };

  buttons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  let initial = 'pt';
  try { initial = localStorage.getItem('lang') || ''; } catch (_) { initial = ''; }
  if (!LANGS.includes(initial)) {
    const nav = (navigator.language || 'pt').slice(0, 2).toLowerCase();
    initial = LANGS.includes(nav) ? nav : 'pt';
  }

  window.I18N = { t, get lang() { return current; }, setLang };
  apply(initial);
})();
