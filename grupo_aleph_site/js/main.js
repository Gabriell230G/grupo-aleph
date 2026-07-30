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
  threshold: .12
});
document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
const cio = new IntersectionObserver((es) => {
  es.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target,
        t = +el.dataset.count;
      let n = Math.max(0, t - 30);
      const step = () => {
        n += 1;
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
  l.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:76px;right:20px;background:#161a22;padding:20px 26px;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.5);gap:1.1rem;border:1px solid rgba(255,255,255,.12)'
});
document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('nav.links').style.cssText = ''
}));
document.getElementById('qform').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('ok').style.display = 'block';
  e.target.querySelector('button').textContent = '✓';
});

/* ===== GLOBO 3D (three.js) ===== */
(function() {
  var host = document.getElementById('globe3d');
  if (!host) {
    return;
  }
  if (!window.THREE) {
    host.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--muted)">Globo 3D indisponivel neste navegador.</div>';
    return;
  }
  try {
    var W = host.clientWidth || 600,
      Hh = host.clientHeight || 520;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, W / Hh, 0.1, 1000);
    camera.position.z = 300;
    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, Hh);
    host.appendChild(renderer.domElement);
    var globe = new THREE.Group();
    scene.add(globe);
    var R = 100;

    function v3(lat, lon, r) {
      var phi = (90 - lat) * Math.PI / 180,
        th = (lon + 180) * Math.PI / 180;
      return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
    }
    var ocean = new THREE.Mesh(new THREE.SphereGeometry(R * 0.99, 48, 48), new THREE.MeshBasicMaterial({
      color: 0x111621,
      transparent: true,
      opacity: .94
    }));
    globe.add(ocean);
    var glow = new THREE.Mesh(new THREE.SphereGeometry(R * 1.05, 48, 48), new THREE.MeshBasicMaterial({
      color: 0x2b4368,
      transparent: true,
      opacity: .1,
      side: THREE.BackSide
    }));
    globe.add(glow);
    var ell = [
      [230, 125, 78, 62],
      [270, 95, 55, 45],
      [255, 196, 15, 38],
      [388, 54, 22, 26],
      [345, 258, 60, 42],
      [350, 312, 48, 40],
      [328, 372, 26, 42],
      [540, 108, 38, 27],
      [498, 97, 10, 13],
      [560, 255, 55, 92],
      [632, 305, 9, 24],
      [625, 183, 34, 33],
      [770, 120, 155, 72],
      [718, 196, 30, 42],
      [800, 236, 44, 29],
      [826, 262, 40, 17],
      [872, 322, 62, 42],
      [886, 150, 9, 25]
    ];

    function isLand(x, y) {
      return ell.some(function(e) {
        return ((x - e[0]) * (x - e[0]) / (e[2] * e[2]) + (y - e[1]) * (y - e[1]) / (e[3] * e[3])) <= 1;
      });
    }
    var pos = [];
    for (var x = 4; x < 1000; x += 5) {
      for (var y = 4; y < 500; y += 5) {
        if (isLand(x, y)) {
          var lon = x / 1000 * 360 - 180,
            lat = 90 - y / 500 * 180;
          var p = v3(lat, lon, R * 1.004);
          pos.push(p.x, p.y, p.z);
        }
      }
    }
    var lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    var landPts = new THREE.Points(lg, new THREE.PointsMaterial({
      color: 0xa6bcd8,
      size: 1.8,
      sizeAttenuation: true,
      transparent: true,
      opacity: .72
    }));
    globe.add(landPts);
    var HUBS = [
      ['Sao Paulo', -23.5, -46.6],
      ['Nova York', 40.7, -74],
      ['Los Angeles', 34, -118],
      ['Roterda', 51.9, 4.5],
      ['Hamburgo', 53.5, 10],
      ['Dubai', 25.2, 55.3],
      ['Xangai', 31.2, 121.5],
      ['Singapura', 1.3, 103.8],
      ['Mumbai', 19, 72.8],
      ['Joanesburgo', -26.2, 28],
      ['Sydney', -33.9, 151.2],
      ['Buenos Aires', -34.6, -58.4]
    ];
    var sp = v3(-23.5, -46.6, R * 1.01);
    var hubMeshes = [],
      arcs = [],
      TRI = [0x5fc888, 0xd9b968, 0x5aa0ff];
    HUBS.forEach(function(hb, i) {
      var isSP = i === 0;
      var m = new THREE.Mesh(new THREE.SphereGeometry(isSP ? 3.4 : 2.4, 16, 16), new THREE.MeshBasicMaterial({
        color: isSP ? 0xffffff : 0xd9b968
      }));
      m.position.copy(v3(hb[1], hb[2], R * 1.012));
      m.userData = {
        city: hb[0],
        sp: isSP
      };
      globe.add(m);
      hubMeshes.push(m);
      if (!isSP) {
        var hv = v3(hb[1], hb[2], R * 1.012);
        var mid = sp.clone().add(hv).multiplyScalar(.5);
        mid.normalize().multiplyScalar(R * 1.42);
        var curve = new THREE.QuadraticBezierCurve3(sp, mid, hv);
        var gp = curve.getPoints(48);
        var ag = new THREE.BufferGeometry().setFromPoints(gp);
        var c = TRI[i % 3];
        var ln = new THREE.Line(ag, new THREE.LineBasicMaterial({
          color: c,
          transparent: true,
          opacity: .72
        }));
        ln.userData = {
          tri: c
        };
        globe.add(ln);
        arcs.push(ln);
      }
    });
    globe.rotation.y = -1.15;
    globe.rotation.x = 0.16;
    var drag = false,
      lx = 0,
      ly = 0,
      auto = true;
    renderer.domElement.addEventListener('pointerdown', function(e) {
      drag = true;
      auto = false;
      lx = e.clientX;
      ly = e.clientY;
    });
    window.addEventListener('pointerup', function() {
      drag = false;
      setTimeout(function() {
        auto = true;
      }, 1600);
    });
    window.addEventListener('pointermove', function(e) {
      if (drag) {
        globe.rotation.y += (e.clientX - lx) * .006;
        globe.rotation.x += (e.clientY - ly) * .006;
        globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));
        lx = e.clientX;
        ly = e.clientY;
      }
    });
    var ray = new THREE.Raycaster(),
      mouse = new THREE.Vector2(),
      tip = document.getElementById('gm-tip');
    renderer.domElement.addEventListener('pointermove', function(e) {
      var r = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(mouse, camera);
      var hit = ray.intersectObjects(hubMeshes);
      if (hit.length) {
        tip.textContent = hit[0].object.userData.city;
        tip.style.left = (e.clientX - r.left) + 'px';
        tip.style.top = (e.clientY - r.top) + 'px';
        tip.classList.add('show');
      } else {
        tip.classList.remove('show');
      }
    });
    var COL = {
      comex: 0xd9b968,
      log: 0x5aa0ff,
      agro: 0x5fc888
    };
    document.querySelectorAll('.map-filters button').forEach(function(b) {
      b.addEventListener('click', function() {
        document.querySelectorAll('.map-filters button').forEach(function(x) {
          x.classList.remove('active');
        });
        b.classList.add('active');
        var fl = b.dataset.f;
        arcs.forEach(function(a) {
          a.material.color.setHex(fl === 'all' ? a.userData.tri : COL[fl]);
        });
        hubMeshes.forEach(function(m) {
          if (m.userData.sp) return;
          m.material.color.setHex(fl === 'all' ? 0xd9b968 : COL[fl]);
        });
      });
    });
    window.addEventListener('resize', function() {
      W = host.clientWidth;
      Hh = host.clientHeight;
      camera.aspect = W / Hh;
      camera.updateProjectionMatrix();
      renderer.setSize(W, Hh);
    });
    (function loop() {
      requestAnimationFrame(loop);
      if (auto && !drag) globe.rotation.y += 0.0016;
      renderer.render(scene, camera);
    })();
  } catch (err) {
    host.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--muted)">Globo 3D indisponivel.</div>';
  }
})();

/* ===== CADEIA por scroll ===== */
(function() {
  const chain = document.getElementById('chain');
  if (!chain) return;
  const nodes = [...chain.querySelectorAll('.cnode')];

  function upd() {
    const r = chain.getBoundingClientRect(),
      vh = innerHeight;
    let p = (vh * 0.78 - r.top) / (r.height + vh * 0.28);
    p = Math.max(0, Math.min(1, p));
    chain.style.setProperty('--p', p.toFixed(3));
    nodes.forEach(n => {
      n.classList.toggle('on', p >= (+n.dataset.th) - 0.02);
    });
  }
  addEventListener('scroll', upd, {
    passive: true
  });
  addEventListener('resize', upd);
  upd();
})();

/* ===== i18n ===== */
const I18N = {
  "pt": {
    "nav_emp": "Empresas",
    "nav_pres": "Presença",
    "nav_cadeia": "A cadeia",
    "nav_sobre": "O grupo",
    "nav_contato": "Contato",
    "nav_cta": "Fale conosco",
    "hero_pill": "Comércio exterior desde 2010",
    "hero_h1": "Três empresas, uma <span class=\"g\">cadeia completa</span> do fornecedor ao destino.",
    "hero_p": "O Grupo Aleph une comércio exterior, logística internacional e nutrição vegetal em uma estrutura só, para levar o seu negócio ao mundo.",
    "hero_b1": "Conheça as empresas <span class=\"arw\">→</span>",
    "hero_b2": "Fale conosco <span class=\"arw\">→</span>",
    "hs1": "empresas integradas",
    "hs2": "países no network",
    "hs3": "no comércio exterior",
    "scrollcue": "role para explorar ↓",
    "emp_eye": "As empresas do grupo",
    "emp_h2": "Três especialistas, uma solução",
    "emp_p": "Cada empresa domina uma etapa da cadeia. Passe o mouse para explorar cada uma.",
    "ec1_b": "Comércio exterior",
    "ec1_p": "Trading importadora e exportadora. A conexão do mercado internacional para pequenas e médias empresas.",
    "ec2_b": "Logística internacional",
    "ec2_p": "Transporte internacional, despacho aduaneiro e logística, com network exclusivo em 30 países.",
    "ec3_b": "Nutrição vegetal",
    "ec3_p": "Importação e distribuição de fertilizantes especiais com tecnologia patenteada para cada cultivo.",
    "visit": "Visitar site →",
    "sc_hint": "Passe o mouse sobre cada empresa para ver mais · clique para abrir o site",
    "map_eye": "Presença global",
    "map_h2": "Um network que conecta o Brasil ao mundo",
    "map_p": "Passe o mouse pelos polos e filtre por empresa para ver o alcance do grupo em 30 países.",
    "f_todos": "Todos",
    "f_comex": "Aleph Comex",
    "f_log": "AlephLog",
    "f_agro": "Aleph Agro",
    "map_stat": "países no network exclusivo do grupo",
    "cad_eye": "Como o grupo funciona",
    "cad_h2": "Uma cadeia que se monta, do fornecedor ao destino",
    "cad_p": "Role para ver a operação fluir por cada empresa do grupo.",
    "f1_t": "Fornecedor",
    "f1_p": "Origem do produto, no Brasil ou no exterior.",
    "f2_p": "Negociação, importação e exportação.",
    "f3_p": "Transporte e despacho aduaneiro.",
    "f4_p": "Nutrição vegetal e insumos.",
    "f5_t": "Destino",
    "f5_p": "Entrega ao cliente ou produtor rural.",
    "his_eye": "O grupo",
    "his_man": "Começamos conectando pequenas e médias empresas ao mundo. Hoje somos três empresas que se completam: <span>quem negocia, quem move e quem nutre</span>.",
    "his_p": "O que nasceu como uma trading de comércio exterior cresceu para uma cadeia completa, com logística e nutrição vegetal próprias.",
    "t1_ph": "2010 · O começo",
    "t1_t": "Nasce a Aleph Comex",
    "t1_p": "Uma trading para conectar pequenas e médias empresas ao comércio exterior.",
    "t2_ph": "Expansão",
    "t2_t": "Logística própria: AlephLog",
    "t2_p": "Transporte internacional e despacho aduaneiro, com network exclusivo em 30 países.",
    "t3_ph": "Diversificação",
    "t3_t": "Nutrição vegetal: Aleph Agro",
    "t3_p": "Fertilizantes especiais com tecnologia patenteada para cada cultivo.",
    "t4_ph": "Hoje",
    "t4_t": "Uma cadeia completa",
    "t4_p": "Três empresas integradas, do fornecedor ao destino, sob um mesmo grupo.",
    "n1": "empresas do grupo",
    "n2": "países no network",
    "n3": "anos de experiência",
    "con_eye": "Fale com o grupo",
    "con_h2": "Vamos construir a sua operação",
    "con_p": "Conte o que você precisa e direcionamos para a empresa certa do grupo, ou montamos a solução completa.",
    "l_nome": "Nome",
    "l_empresa": "Empresa",
    "l_email": "E-mail",
    "l_area": "Empresa de interesse",
    "l_msg": "Mensagem",
    "o_comex": "Aleph Comex (comércio exterior)",
    "o_log": "AlephLog (logística)",
    "o_agro": "Aleph Agro (nutrição vegetal)",
    "o_grupo": "Solução completa do grupo",
    "btn_send": "Enviar mensagem",
    "okmsg": "✓ Mensagem recebida! Este é um protótipo, nenhum dado foi enviado.",
    "foot_p": "Comércio exterior, logística internacional e nutrição vegetal. Uma cadeia completa, do fornecedor ao destino.",
    "foot_emp": "Empresas",
    "foot_inst": "Institucional",
    "foot_ct": "Contato",
    "foot_copy": "© 2026 Grupo Aleph. Todos os direitos reservados.",
    "foot_proto": "Protótipo de referência · direção visual do grupo",
    "ph_nome": "Seu nome",
    "ph_empresa": "Sua empresa",
    "ph_msg": "Como podemos ajudar?"
  },
  "en": {
    "nav_emp": "Companies",
    "nav_pres": "Presence",
    "nav_cadeia": "The chain",
    "nav_sobre": "The group",
    "nav_contato": "Contact",
    "nav_cta": "Contact us",
    "hero_pill": "Foreign trade since 2010",
    "hero_h1": "Three companies, one <span class=\"g\">complete chain</span> from supplier to destination.",
    "hero_p": "The Aleph Group unites foreign trade, international logistics and plant nutrition in a single structure, to take your business to the world.",
    "hero_b1": "Meet the companies <span class=\"arw\">→</span>",
    "hero_b2": "Contact us <span class=\"arw\">→</span>",
    "hs1": "integrated companies",
    "hs2": "countries in the network",
    "hs3": "in foreign trade",
    "scrollcue": "scroll to explore ↓",
    "emp_eye": "The group's companies",
    "emp_h2": "Three specialists, one solution",
    "emp_p": "Each company masters one stage of the chain. Hover to explore each one.",
    "ec1_b": "Foreign trade",
    "ec1_p": "Import and export trading company. The connection to the international market for small and medium businesses.",
    "ec2_b": "International logistics",
    "ec2_p": "International transport, customs clearance and logistics, with an exclusive network in 30 countries.",
    "ec3_b": "Plant nutrition",
    "ec3_p": "Import and distribution of specialty fertilizers with patented technology for every crop.",
    "visit": "Visit site →",
    "sc_hint": "Hover over each company to see more · click to open the site",
    "map_eye": "Global presence",
    "map_h2": "A network that connects Brazil to the world",
    "map_p": "Hover over the hubs and filter by company to see the group's reach across 30 countries.",
    "f_todos": "All",
    "f_comex": "Aleph Comex",
    "f_log": "AlephLog",
    "f_agro": "Aleph Agro",
    "map_stat": "countries in the group's exclusive network",
    "cad_eye": "How the group works",
    "cad_h2": "A chain that assembles, from supplier to destination",
    "cad_p": "Scroll to see the operation flow through each company in the group.",
    "f1_t": "Supplier",
    "f1_p": "Origin of the product, in Brazil or abroad.",
    "f2_p": "Negotiation, import and export.",
    "f3_p": "Transport and customs clearance.",
    "f4_p": "Plant nutrition and inputs.",
    "f5_t": "Destination",
    "f5_p": "Delivery to the client or farmer.",
    "his_eye": "The group",
    "his_man": "We started by connecting small and medium businesses to the world. Today we are three companies that complete each other: <span>who negotiates, who moves and who nourishes</span>.",
    "his_p": "What began as a foreign-trade trading company grew into a complete chain, with its own logistics and plant nutrition.",
    "t1_ph": "2010 · The beginning",
    "t1_t": "Aleph Comex is born",
    "t1_p": "A trading company to connect small and medium businesses to foreign trade.",
    "t2_ph": "Expansion",
    "t2_t": "In-house logistics: AlephLog",
    "t2_p": "International transport and customs clearance, with an exclusive network in 30 countries.",
    "t3_ph": "Diversification",
    "t3_t": "Plant nutrition: Aleph Agro",
    "t3_p": "Specialty fertilizers with patented technology for every crop.",
    "t4_ph": "Today",
    "t4_t": "A complete chain",
    "t4_p": "Three integrated companies, from supplier to destination, under one group.",
    "n1": "companies in the group",
    "n2": "countries in the network",
    "n3": "years of experience",
    "con_eye": "Talk to the group",
    "con_h2": "Let's build your operation",
    "con_p": "Tell us what you need and we will direct you to the right company in the group, or build the complete solution.",
    "l_nome": "Name",
    "l_empresa": "Company",
    "l_email": "Email",
    "l_area": "Company of interest",
    "l_msg": "Message",
    "o_comex": "Aleph Comex (foreign trade)",
    "o_log": "AlephLog (logistics)",
    "o_agro": "Aleph Agro (plant nutrition)",
    "o_grupo": "Complete group solution",
    "btn_send": "Send message",
    "okmsg": "✓ Message received! This is a prototype, no data was sent.",
    "foot_p": "Foreign trade, international logistics and plant nutrition. A complete chain, from supplier to destination.",
    "foot_emp": "Companies",
    "foot_inst": "Company",
    "foot_ct": "Contact",
    "foot_copy": "© 2026 Aleph Group. All rights reserved.",
    "foot_proto": "Reference prototype · group visual direction",
    "ph_nome": "Your name",
    "ph_empresa": "Your company",
    "ph_msg": "How can we help?"
  },
  "es": {
    "nav_emp": "Empresas",
    "nav_pres": "Presencia",
    "nav_cadeia": "La cadena",
    "nav_sobre": "El grupo",
    "nav_contato": "Contacto",
    "nav_cta": "Contáctanos",
    "hero_pill": "Comercio exterior desde 2010",
    "hero_h1": "Tres empresas, una <span class=\"g\">cadena completa</span> del proveedor al destino.",
    "hero_p": "El Grupo Aleph une comercio exterior, logística internacional y nutrición vegetal en una sola estructura, para llevar su negocio al mundo.",
    "hero_b1": "Conozca las empresas <span class=\"arw\">→</span>",
    "hero_b2": "Contáctanos <span class=\"arw\">→</span>",
    "hs1": "empresas integradas",
    "hs2": "países en la red",
    "hs3": "en comercio exterior",
    "scrollcue": "desliza para explorar ↓",
    "emp_eye": "Las empresas del grupo",
    "emp_h2": "Tres especialistas, una solución",
    "emp_p": "Cada empresa domina una etapa de la cadena. Pase el mouse para explorar cada una.",
    "ec1_b": "Comercio exterior",
    "ec1_p": "Trading importadora y exportadora. La conexión con el mercado internacional para pequeñas y medianas empresas.",
    "ec2_b": "Logística internacional",
    "ec2_p": "Transporte internacional, despacho aduanero y logística, con red exclusiva en 30 países.",
    "ec3_b": "Nutrición vegetal",
    "ec3_p": "Importación y distribución de fertilizantes especiales con tecnología patentada para cada cultivo.",
    "visit": "Visitar sitio →",
    "sc_hint": "Pase el mouse sobre cada empresa para ver más · haga clic para abrir el sitio",
    "map_eye": "Presencia global",
    "map_h2": "Una red que conecta Brasil con el mundo",
    "map_p": "Pase el mouse por los polos y filtre por empresa para ver el alcance del grupo en 30 países.",
    "f_todos": "Todos",
    "f_comex": "Aleph Comex",
    "f_log": "AlephLog",
    "f_agro": "Aleph Agro",
    "map_stat": "países en la red exclusiva del grupo",
    "cad_eye": "Cómo funciona el grupo",
    "cad_h2": "Una cadena que se arma, del proveedor al destino",
    "cad_p": "Desliza para ver la operación fluir por cada empresa del grupo.",
    "f1_t": "Proveedor",
    "f1_p": "Origen del producto, en Brasil o en el exterior.",
    "f2_p": "Negociación, importación y exportación.",
    "f3_p": "Transporte y despacho aduanero.",
    "f4_p": "Nutrición vegetal e insumos.",
    "f5_t": "Destino",
    "f5_p": "Entrega al cliente o productor rural.",
    "his_eye": "El grupo",
    "his_man": "Empezamos conectando pequeñas y medianas empresas con el mundo. Hoy somos tres empresas que se completan: <span>quien negocia, quien mueve y quien nutre</span>.",
    "his_p": "Lo que nació como una trading de comercio exterior creció hasta una cadena completa, con logística y nutrición vegetal propias.",
    "t1_ph": "2010 · El comienzo",
    "t1_t": "Nace Aleph Comex",
    "t1_p": "Una trading para conectar pequeñas y medianas empresas al comercio exterior.",
    "t2_ph": "Expansión",
    "t2_t": "Logística propia: AlephLog",
    "t2_p": "Transporte internacional y despacho aduanero, con red exclusiva en 30 países.",
    "t3_ph": "Diversificación",
    "t3_t": "Nutrición vegetal: Aleph Agro",
    "t3_p": "Fertilizantes especiales con tecnología patentada para cada cultivo.",
    "t4_ph": "Hoy",
    "t4_t": "Una cadena completa",
    "t4_p": "Tres empresas integradas, del proveedor al destino, bajo un mismo grupo.",
    "n1": "empresas del grupo",
    "n2": "países en la red",
    "n3": "años de experiencia",
    "con_eye": "Habla con el grupo",
    "con_h2": "Construyamos su operación",
    "con_p": "Cuéntenos qué necesita y lo dirigimos a la empresa adecuada del grupo, o armamos la solución completa.",
    "l_nome": "Nombre",
    "l_empresa": "Empresa",
    "l_email": "Correo",
    "l_area": "Empresa de interés",
    "l_msg": "Mensaje",
    "o_comex": "Aleph Comex (comercio exterior)",
    "o_log": "AlephLog (logística)",
    "o_agro": "Aleph Agro (nutrición vegetal)",
    "o_grupo": "Solución completa del grupo",
    "btn_send": "Enviar mensaje",
    "okmsg": "✓ ¡Mensaje recibido! Esto es un prototipo, no se envió ningún dato.",
    "foot_p": "Comercio exterior, logística internacional y nutrición vegetal. Una cadena completa, del proveedor al destino.",
    "foot_emp": "Empresas",
    "foot_inst": "Institucional",
    "foot_ct": "Contacto",
    "foot_copy": "© 2026 Grupo Aleph. Todos los derechos reservados.",
    "foot_proto": "Prototipo de referencia · dirección visual del grupo",
    "ph_nome": "Su nombre",
    "ph_empresa": "Su empresa",
    "ph_msg": "¿Cómo podemos ayudar?"
  }
};

function setLang(l) {
  document.documentElement.lang = (l == 'pt' ? 'pt-BR' : l);
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var t = I18N[l][el.getAttribute('data-i18n')];
    if (t != null) el.innerHTML = t;
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
