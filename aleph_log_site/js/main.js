const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 60));
const io = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target)
    }
  })
}, {
  threshold: .14
});
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
const cio = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target,
        t = +el.dataset.count;
      let n = 0;
      const step = () => {
        n += Math.ceil(t / 28);
        if (n >= t) {
          el.textContent = t
        } else {
          el.textContent = n;
          requestAnimationFrame(step)
        }
      };
      step();
      cio.unobserve(el)
    }
  })
}, {
  threshold: .5
});
document.querySelectorAll('[data-count]').forEach(c => cio.observe(c));
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const l = document.querySelector('nav.links');
  const open = l.style.display === 'flex';
  l.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:74px;right:20px;background:#0b1a30;padding:20px 26px;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.5);gap:1.1rem;border:1px solid rgba(140,180,230,.18)'
});
document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('nav.links').style.cssText = ''
}));
// mapa-múndi pontilhado (continentes aproximados por elipses sobre projeção equirretangular)
(function buildMap() {
  const dots = document.getElementById('wm-dots');
  if (!dots) return;
  const ell = [
    [200, 150, 95, 80],
    [300, 335, 52, 92],
    [500, 135, 58, 44],
    [522, 300, 68, 102],
    [700, 165, 150, 92],
    [832, 368, 55, 38],
    [470, 92, 26, 22],
    [300, 250, 28, 34]
  ];
  let g = '';
  for (let x = 18; x < 1000; x += 15) {
    for (let y = 18; y < 490; y += 15) {
      if (ell.some(([cx, cy, rx, ry]) => ((x - cx) ** 2 / (rx * rx) + (y - cy) ** 2 / (ry * ry)) <= 1)) {
        const jx = (x + Math.random() * 4 - 2).toFixed(1),
          jy = (y + Math.random() * 4 - 2).toFixed(1);
        g += `<circle class="wm-dot" cx="${jx}" cy="${jy}" r="1.7"/>`;
      }
    }
  }
  dots.innerHTML = g;
})();

document.getElementById('qform').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('ok').style.display = 'block';
  e.target.querySelector('button').textContent = 'Enviado ✓';
});

(function() {
  var I18N = {
    "pt": {
      "nav_serv": "Serviços",
      "nav_como": "Como funciona",
      "nav_cob": "Cobertura",
      "nav_grupo": "Grupo",
      "nav_contato": "Contato",
      "nav_cta": "Fale conosco",
      "hero_pill": "<span class=\"d\"></span> Logística internacional · despacho aduaneiro",
      "hero_h1": "Do fornecedor ao destino, <span class=\"g\">o mundo conectado</span> à sua carga.",
      "hero_p": "A AlephLog cuida do transporte internacional, do despacho aduaneiro e de toda a cadeia de importação e exportação, com um network exclusivo presente em 30 países.",
      "hero_b1": "Nossos serviços <span class=\"arw\">→</span>",
      "hero_b2": "Falar com um especialista <span class=\"arw\">→</span>",
      "hero_s1": "países no network exclusivo",
      "hero_s2": "importação e exportação ponta a ponta",
      "hero_s3": "despacho aduaneiro próprio",
      "scrollcue": "role para explorar ↓",
      "svc_eye": "O que fazemos",
      "svc_h2": "Uma estrutura completa de comércio exterior",
      "svc_p": "Da coleta na origem à entrega no destino, com soluções desenhadas para cada operação.",
      "svc1_t": "Transporte internacional",
      "svc1_d": "Carga geral e carga especial (projetos), com coleta, armazenagem, packing e distribuição para importação e exportação.",
      "svc2_t": "Despacho aduaneiro",
      "svc2_d": "Profissionais especializados e exclusivos no desembaraço de cargas de importação e exportação, com processos otimizados.",
      "svc3_t": "Drawback",
      "svc3_d": "Assessoria no regime de drawback para suspender, isentar ou restituir tributos de insumos usados na exportação.",
      "svc4_t": "Ex-tarifário",
      "svc4_d": "Consultoria para redução de alíquota de importação de bens de capital e de informática sem produção nacional equivalente.",
      "svc5_t": "Armazenagem e distribuição",
      "svc5_d": "Estrutura de armazenagem, packing e distribuição para organizar o fluxo da sua mercadoria com segurança.",
      "svc6_t": "Licenças e registros",
      "svc6_d": "Suporte na obtenção de licenças, registros e habilitações necessárias para operar no comércio exterior.",
      "proc_eye": "Como funciona",
      "proc_h2": "Sua carga acompanhada em cada etapa",
      "proc_p": "Um fluxo claro, do primeiro contato com o fornecedor à entrega final.",
      "st1_t": "Origem",
      "st1_d": "Apoio comercial e coleta junto ao fornecedor no exterior ou no Brasil.",
      "st2_t": "Packing",
      "st2_d": "Armazenagem, conferência e embalagem adequada da carga.",
      "st3_t": "Transporte",
      "st3_d": "Modal internacional definido para carga geral ou projeto.",
      "st4_t": "Despacho",
      "st4_d": "Desembaraço aduaneiro completo, com drawback e ex-tarifário quando cabível.",
      "st5_t": "Entrega",
      "st5_d": "Distribuição e entrega no destino, com processo rastreado.",
      "cov_eye": "Cobertura global",
      "cov_h2": "Um network exclusivo em 30 países",
      "cov_p": "Conectamos o mercado internacional às suas operações com um network próprio, oferecendo know-how e apoio logístico em cada rota, na importação e na exportação.",
      "map_america": "América",
      "map_europa": "Europa",
      "map_asia": "Ásia",
      "cs1": "países no network",
      "cs2": "fluxos: import e export",
      "cs3": "equipe dedicada a você",
      "cov_cta": "Cotar minha operação <span class=\"arw\">→</span>",
      "diff_eye": "Por que a AlephLog",
      "diff_h2": "Exclusividade e solução ponta a ponta",
      "d1_t": "Exclusividade",
      "d1_d": "Network próprio e exclusivo, com relacionamento personalizado em cada operação.",
      "d2_t": "Solução completa",
      "d2_d": "Do transporte ao despacho, tudo sob um único ponto de contato.",
      "d3_t": "Time especializado",
      "d3_d": "Profissionais altamente treinados em cada etapa do comércio exterior.",
      "d4_t": "Processos otimizados",
      "d4_d": "Otimização de procedimentos para reduzir prazos e custos da sua carga.",
      "grp_eye": "Parte do Grupo Aleph",
      "grp_h2": "A base logística de todo o grupo",
      "grp_p": "A AlephLog é o braço de logística e aduana do Grupo Aleph, sustentando as operações da Aleph Comex (trading e comércio exterior) e da Aleph Agro (nutrição vegetal). Juntas, formam uma cadeia completa do fornecedor ao destino.",
      "con_eye": "Fale com um especialista",
      "con_h2": "Vamos mover a sua carga",
      "con_p": "Conte o que você precisa importar ou exportar. Nossa equipe monta a solução de transporte e despacho ideal para a sua operação.",
      "l_nome": "Nome",
      "l_tel": "Telefone / WhatsApp",
      "l_email": "E-mail",
      "l_op": "Operação",
      "l_int": "Interesse",
      "l_msg": "Mensagem",
      "opt_imp": "Importação",
      "opt_exp": "Exportação",
      "opt_impexp": "Importação e exportação",
      "opt_t1": "Transporte internacional",
      "opt_t2": "Despacho aduaneiro",
      "opt_t3": "Drawback / ex-tarifário",
      "opt_t4": "Solução completa",
      "btn_send": "Enviar solicitação",
      "okmsg": "✓ Solicitação recebida! Este é um protótipo, nenhum dado foi enviado.",
      "foot_p": "Transporte internacional, despacho aduaneiro e logística para importação e exportação, com network exclusivo em 30 países.",
      "foot_serv": "Serviços",
      "foot_l1": "Transporte internacional",
      "foot_l2": "Despacho aduaneiro",
      "foot_l3": "Drawback e ex-tarifário",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contato",
      "foot_contato2": "Contato",
      "foot_copy": "© 2026 AlephLog. Todos os direitos reservados.",
      "foot_proto": "Protótipo de referência · direção visual da marca",
      "ph_nome": "Seu nome",
      "ph_msg": "Descreva sua carga, origem e destino..."
    },
    "en": {
      "nav_serv": "Services",
      "nav_como": "How it works",
      "nav_cob": "Coverage",
      "nav_grupo": "Group",
      "nav_contato": "Contact",
      "nav_cta": "Contact us",
      "hero_pill": "<span class=\"d\"></span> International logistics · customs clearance",
      "hero_h1": "From supplier to destination, <span class=\"g\">the world connected</span> to your cargo.",
      "hero_p": "AlephLog handles international transport, customs clearance and the entire import and export chain, with an exclusive network present in 30 countries.",
      "hero_b1": "Our services <span class=\"arw\">→</span>",
      "hero_b2": "Talk to a specialist <span class=\"arw\">→</span>",
      "hero_s1": "countries in the exclusive network",
      "hero_s2": "end-to-end import and export",
      "hero_s3": "in-house customs clearance",
      "scrollcue": "scroll to explore ↓",
      "svc_eye": "What we do",
      "svc_h2": "A complete foreign trade structure",
      "svc_p": "From pickup at origin to delivery at destination, with solutions designed for each operation.",
      "svc1_t": "International transport",
      "svc1_d": "General and special (project) cargo, with pickup, warehousing, packing and distribution for import and export.",
      "svc2_t": "Customs clearance",
      "svc2_d": "Dedicated specialists in the clearance of import and export cargo, with optimized processes.",
      "svc3_t": "Drawback",
      "svc3_d": "Advisory on the drawback regime to suspend, exempt or refund taxes on inputs used in exports.",
      "svc4_t": "Ex-tariff",
      "svc4_d": "Consulting to reduce import duties on capital and IT goods with no equivalent domestic production.",
      "svc5_t": "Warehousing and distribution",
      "svc5_d": "Warehousing, packing and distribution structure to organize the flow of your goods safely.",
      "svc6_t": "Licenses and registrations",
      "svc6_d": "Support in obtaining the licenses, registrations and authorizations needed to operate in foreign trade.",
      "proc_eye": "How it works",
      "proc_h2": "Your cargo tracked at every stage",
      "proc_p": "A clear flow, from the first contact with the supplier to final delivery.",
      "st1_t": "Origin",
      "st1_d": "Commercial support and pickup at the supplier abroad or in Brazil.",
      "st2_t": "Packing",
      "st2_d": "Warehousing, checking and proper packaging of the cargo.",
      "st3_t": "Transport",
      "st3_d": "International mode defined for general or project cargo.",
      "st4_t": "Clearance",
      "st4_d": "Full customs clearance, with drawback and ex-tariff when applicable.",
      "st5_t": "Delivery",
      "st5_d": "Distribution and delivery at destination, with a tracked process.",
      "cov_eye": "Global coverage",
      "cov_h2": "An exclusive network in 30 countries",
      "cov_p": "We connect the international market to your operations with our own network, offering know-how and logistics support on every route, in both import and export.",
      "map_america": "America",
      "map_europa": "Europe",
      "map_asia": "Asia",
      "cs1": "countries in the network",
      "cs2": "flows: import & export",
      "cs3": "team dedicated to you",
      "cov_cta": "Get a quote for my operation <span class=\"arw\">→</span>",
      "diff_eye": "Why AlephLog",
      "diff_h2": "Exclusivity and end-to-end solution",
      "d1_t": "Exclusivity",
      "d1_d": "Our own exclusive network, with a personalized relationship in every operation.",
      "d2_t": "Complete solution",
      "d2_d": "From transport to clearance, all under a single point of contact.",
      "d3_t": "Specialized team",
      "d3_d": "Highly trained professionals at every stage of foreign trade.",
      "d4_t": "Optimized processes",
      "d4_d": "Streamlined procedures to reduce the time and cost of your cargo.",
      "grp_eye": "Part of the Aleph Group",
      "grp_h2": "The logistics backbone of the whole group",
      "grp_p": "AlephLog is the logistics and customs arm of the Aleph Group, supporting the operations of Aleph Comex (trading and foreign trade) and Aleph Agro (plant nutrition). Together they form a complete chain from supplier to destination.",
      "con_eye": "Talk to a specialist",
      "con_h2": "Let's move your cargo",
      "con_p": "Tell us what you need to import or export. Our team builds the ideal transport and clearance solution for your operation.",
      "l_nome": "Name",
      "l_tel": "Phone / WhatsApp",
      "l_email": "Email",
      "l_op": "Operation",
      "l_int": "Interest",
      "l_msg": "Message",
      "opt_imp": "Import",
      "opt_exp": "Export",
      "opt_impexp": "Import and export",
      "opt_t1": "International transport",
      "opt_t2": "Customs clearance",
      "opt_t3": "Drawback / ex-tariff",
      "opt_t4": "Complete solution",
      "btn_send": "Send request",
      "okmsg": "✓ Request received! This is a prototype, no data was sent.",
      "foot_p": "International transport, customs clearance and logistics for import and export, with an exclusive network in 30 countries.",
      "foot_serv": "Services",
      "foot_l1": "International transport",
      "foot_l2": "Customs clearance",
      "foot_l3": "Drawback and ex-tariff",
      "foot_grp": "Aleph Group",
      "foot_contato_link": "Contact",
      "foot_contato2": "Contact",
      "foot_copy": "© 2026 AlephLog. All rights reserved.",
      "foot_proto": "Reference prototype · brand visual direction",
      "ph_nome": "Your name",
      "ph_msg": "Describe your cargo, origin and destination..."
    },
    "es": {
      "nav_serv": "Servicios",
      "nav_como": "Cómo funciona",
      "nav_cob": "Cobertura",
      "nav_grupo": "Grupo",
      "nav_contato": "Contacto",
      "nav_cta": "Contáctanos",
      "hero_pill": "<span class=\"d\"></span> Logística internacional · despacho aduanero",
      "hero_h1": "Del proveedor al destino, <span class=\"g\">el mundo conectado</span> a su carga.",
      "hero_p": "AlephLog se encarga del transporte internacional, del despacho aduanero y de toda la cadena de importación y exportación, con una red exclusiva presente en 30 países.",
      "hero_b1": "Nuestros servicios <span class=\"arw\">→</span>",
      "hero_b2": "Hablar con un especialista <span class=\"arw\">→</span>",
      "hero_s1": "países en la red exclusiva",
      "hero_s2": "importación y exportación de punta a punta",
      "hero_s3": "despacho aduanero propio",
      "scrollcue": "desliza para explorar ↓",
      "svc_eye": "Lo que hacemos",
      "svc_h2": "Una estructura completa de comercio exterior",
      "svc_p": "De la recogida en origen a la entrega en destino, con soluciones diseñadas para cada operación.",
      "svc1_t": "Transporte internacional",
      "svc1_d": "Carga general y carga especial (proyectos), con recogida, almacenaje, packing y distribución para importación y exportación.",
      "svc2_t": "Despacho aduanero",
      "svc2_d": "Profesionales especializados y exclusivos en el despacho de cargas de importación y exportación, con procesos optimizados.",
      "svc3_t": "Drawback",
      "svc3_d": "Asesoría en el régimen de drawback para suspender, eximir o restituir tributos de insumos usados en la exportación.",
      "svc4_t": "Ex-tarifario",
      "svc4_d": "Consultoría para la reducción del arancel de importación de bienes de capital e informática sin producción nacional equivalente.",
      "svc5_t": "Almacenaje y distribución",
      "svc5_d": "Estructura de almacenaje, packing y distribución para organizar el flujo de su mercancía con seguridad.",
      "svc6_t": "Licencias y registros",
      "svc6_d": "Apoyo en la obtención de licencias, registros y habilitaciones necesarias para operar en el comercio exterior.",
      "proc_eye": "Cómo funciona",
      "proc_h2": "Su carga acompañada en cada etapa",
      "proc_p": "Un flujo claro, del primer contacto con el proveedor a la entrega final.",
      "st1_t": "Origen",
      "st1_d": "Apoyo comercial y recogida en el proveedor en el exterior o en Brasil.",
      "st2_t": "Packing",
      "st2_d": "Almacenaje, verificación y embalaje adecuado de la carga.",
      "st3_t": "Transporte",
      "st3_d": "Modal internacional definido para carga general o proyecto.",
      "st4_t": "Despacho",
      "st4_d": "Despacho aduanero completo, con drawback y ex-tarifario cuando corresponda.",
      "st5_t": "Entrega",
      "st5_d": "Distribución y entrega en destino, con proceso rastreado.",
      "cov_eye": "Cobertura global",
      "cov_h2": "Una red exclusiva en 30 países",
      "cov_p": "Conectamos el mercado internacional a sus operaciones con una red propia, ofreciendo know-how y apoyo logístico en cada ruta, en la importación y la exportación.",
      "map_america": "América",
      "map_europa": "Europa",
      "map_asia": "Asia",
      "cs1": "países en la red",
      "cs2": "flujos: import y export",
      "cs3": "equipo dedicado a usted",
      "cov_cta": "Cotizar mi operación <span class=\"arw\">→</span>",
      "diff_eye": "Por qué AlephLog",
      "diff_h2": "Exclusividad y solución de punta a punta",
      "d1_t": "Exclusividad",
      "d1_d": "Red propia y exclusiva, con relación personalizada en cada operación.",
      "d2_t": "Solución completa",
      "d2_d": "Del transporte al despacho, todo bajo un único punto de contacto.",
      "d3_t": "Equipo especializado",
      "d3_d": "Profesionales altamente capacitados en cada etapa del comercio exterior.",
      "d4_t": "Procesos optimizados",
      "d4_d": "Optimización de procedimientos para reducir plazos y costos de su carga.",
      "grp_eye": "Parte del Grupo Aleph",
      "grp_h2": "La base logística de todo el grupo",
      "grp_p": "AlephLog es el brazo de logística y aduana del Grupo Aleph, sosteniendo las operaciones de Aleph Comex (trading y comercio exterior) y de Aleph Agro (nutrición vegetal). Juntas forman una cadena completa del proveedor al destino.",
      "con_eye": "Habla con un especialista",
      "con_h2": "Movamos su carga",
      "con_p": "Cuéntenos qué necesita importar o exportar. Nuestro equipo arma la solución de transporte y despacho ideal para su operación.",
      "l_nome": "Nombre",
      "l_tel": "Teléfono / WhatsApp",
      "l_email": "Correo",
      "l_op": "Operación",
      "l_int": "Interés",
      "l_msg": "Mensaje",
      "opt_imp": "Importación",
      "opt_exp": "Exportación",
      "opt_impexp": "Importación y exportación",
      "opt_t1": "Transporte internacional",
      "opt_t2": "Despacho aduanero",
      "opt_t3": "Drawback / ex-tarifario",
      "opt_t4": "Solución completa",
      "btn_send": "Enviar solicitud",
      "okmsg": "✓ ¡Solicitud recibida! Esto es un prototipo, no se envió ningún dato.",
      "foot_p": "Transporte internacional, despacho aduanero y logística para importación y exportación, con red exclusiva en 30 países.",
      "foot_serv": "Servicios",
      "foot_l1": "Transporte internacional",
      "foot_l2": "Despacho aduanero",
      "foot_l3": "Drawback y ex-tarifario",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contacto",
      "foot_contato2": "Contacto",
      "foot_copy": "© 2026 AlephLog. Todos los derechos reservados.",
      "foot_proto": "Prototipo de referencia · dirección visual de la marca",
      "ph_nome": "Su nombre",
      "ph_msg": "Describa su carga, origen y destino..."
    }
  };

  function setLang(l) {
    document.documentElement.lang = (l == 'pt' ? 'pt-BR' : l);
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var t = I18N[l][el.getAttribute('data-i18n')];
      if (t == null) return;
      if (el.namespaceURI && el.namespaceURI.indexOf('svg') > -1) el.textContent = t;
      else el.innerHTML = t;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el) {
      var t = I18N[l][el.getAttribute('data-i18n-ph')];
      if (t != null) el.setAttribute('placeholder', t);
    });
    document.querySelectorAll('.langsel button').forEach(function(b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === l);
    });
    try {
      localStorage.setItem('alephlang', l);
    } catch (e) {}
  }
  var sv = null;
  try {
    sv = localStorage.getItem('alephlang');
  } catch (e) {}
  setLang(sv || 'pt');
  document.querySelectorAll('.langsel button').forEach(function(b) {
    b.addEventListener('click', function() {
      setLang(b.getAttribute('data-lang'));
    });
  });
})();
