const AC = 'http://alephcomex.com.br/';
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
      let n = Math.max(0, t - 40);
      const step = () => {
        n += 2;
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
  l.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:76px;right:20px;background:#fff;padding:20px 26px;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.15);gap:1.1rem;border:1px solid var(--line)'
});
document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('nav.links').style.cssText = ''
}));
document.getElementById('qform').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('ok').style.display = 'block';
  e.target.querySelector('button').textContent = 'Enviado ✓';
});

// ITENS (produtos + serviços) com conteúdo real
const ITEMS = {
  "cafe": {
    "img": "https://images.unsplash.com/photo-1515694590185-73647ba02c10?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Produto de exportação",
      "en": "Export product",
      "es": "Producto de exportación"
    },
    "title": {
      "pt": "Café",
      "en": "Coffee",
      "es": "Café"
    },
    "body": {
      "pt": "<p>Representamos produtores de café Arábica selecionado da região da Alta Mogiana e do sul de Minas Gerais. Os grãos passam por um rigoroso controle de origem e têm torrefação artesanal e orgânica, de fazendas certificadas.</p><p>O Arábica é vendido em micro lotes, verde ou torrado. O cultivo em altitude e clima favorável resulta em aroma excepcional, corpo cremoso, acidez balanceada e sabor suave e prolongado.</p>",
      "en": "<p>We represent selected Arabica coffee growers from the Alta Mogiana region and southern Minas Gerais. The beans undergo strict origin control and are artisanally and organically roasted, from certified farms.</p><p>The Arabica is sold in micro-lots, green or roasted. Grown at altitude in a favorable climate, it delivers an exceptional aroma, creamy body, balanced acidity and a smooth, lingering flavor.</p>",
      "es": "<p>Representamos a productores de café Arábica seleccionado de la región de Alta Mogiana y del sur de Minas Gerais. Los granos pasan por un riguroso control de origen y tienen tostado artesanal y orgánico, de fincas certificadas.</p><p>El Arábica se vende en micro lotes, verde o tostado. El cultivo en altitud y clima favorable resulta en un aroma excepcional, cuerpo cremoso, acidez balanceada y sabor suave y prolongado.</p>"
    },
    "facts": {
      "pt": ["Arábica da Alta Mogiana e sul de Minas", "Micro lotes, verde ou torrado", "Fazendas certificadas, torrefação artesanal", "Compromisso social e ambiental"],
      "en": ["Arabica from Alta Mogiana and southern Minas", "Micro-lots, green or roasted", "Certified farms, artisanal roasting", "Social and environmental commitment"],
      "es": ["Arábica de Alta Mogiana y sur de Minas", "Micro lotes, verde o tostado", "Fincas certificadas, tostado artesanal", "Compromiso social y ambiental"]
    }
  },
  "pimenta": {
    "img": "https://images.unsplash.com/photo-1649951806971-ad0e00408773?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Produto de exportação",
      "en": "Export product",
      "es": "Producto de exportación"
    },
    "title": {
      "pt": "Pimenta do reino",
      "en": "Black pepper",
      "es": "Pimienta negra"
    },
    "body": {
      "pt": "<p>Pimenta do reino (black pepper) das regiões do Pará e do Espírito Santo, disponível para exportação com todos os certificados fitossanitários necessários.</p>",
      "en": "<p>Black pepper from the Pará and Espírito Santo regions, available for export with all the required phytosanitary certificates.</p>",
      "es": "<p>Pimienta negra de las regiones de Pará y Espírito Santo, disponible para exportación con todos los certificados fitosanitarios necesarios.</p>"
    },
    "facts": {
      "pt": ["Classificação B-1 ASTA", "Densidade 550 / 590 g/l", "Máximo de 10% de umidade", "Secagem em terreiro"],
      "en": ["B-1 ASTA grade", "Density 550 / 590 g/l", "Maximum 10% moisture", "Yard-dried"],
      "es": ["Clasificación B-1 ASTA", "Densidad 550 / 590 g/l", "Máximo 10% de humedad", "Secado en patio"]
    }
  },
  "castanha": {
    "img": "https://images.unsplash.com/photo-1614807618553-35332e4de00d?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Produto de exportação",
      "en": "Export product",
      "es": "Producto de exportación"
    },
    "title": {
      "pt": "Castanha do Pará",
      "en": "Brazil nut",
      "es": "Nuez de Brasil"
    },
    "body": {
      "pt": "<p>Em parceria com cooperativas de produtores, oferecemos a castanha do Pará, produto típico da floresta amazônica. As castanhas crescem livres de pesticidas e químicos, dentro de uma agricultura sustentável nos aspectos econômico, ambiental e social.</p><p>De cultivo ecológico e familiar, é um produto com forte apelo ambiental e social pela forma como é cultivado, beneficiado e vendido.</p>",
      "en": "<p>In partnership with producer cooperatives, we offer the Brazil nut, a product typical of the Amazon rainforest. The nuts grow free of pesticides and chemicals, within an economically, environmentally and socially sustainable agriculture.</p><p>Grown ecologically and by families, it is a product with strong environmental and social appeal in the way it is grown, processed and sold.</p>",
      "es": "<p>En alianza con cooperativas de productores, ofrecemos la nuez de Brasil, producto típico de la selva amazónica. Las nueces crecen libres de pesticidas y químicos, dentro de una agricultura sostenible en lo económico, ambiental y social.</p><p>De cultivo ecológico y familiar, es un producto con fuerte atractivo ambiental y social por la forma en que se cultiva, procesa y vende.</p>"
    },
    "facts": {
      "pt": ["Típica da floresta amazônica", "Livre de pesticidas e químicos", "Cultivo ecológico e familiar", "Disponível in natura, com ou sem casca"],
      "en": ["Typical of the Amazon rainforest", "Free of pesticides and chemicals", "Ecological, family farming", "Available raw, in or out of the shell"],
      "es": ["Típica de la selva amazónica", "Libre de pesticidas y químicos", "Cultivo ecológico y familiar", "Disponible in natura, con o sin cáscara"]
    }
  },
  "impexp": {
    "img": "https://images.unsplash.com/photo-1700777685830-f501e67260e6?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Serviço",
      "en": "Service",
      "es": "Servicio"
    },
    "title": {
      "pt": "Exportação & Importação",
      "en": "Export & Import",
      "es": "Exportación e Importación"
    },
    "body": {
      "pt": "<p>Atuamos como exportador direto de vários produtos brasileiros. Na importação, executamos todo o processo de compra e nacionalização.</p>",
      "en": "<p>We act as a direct exporter of many Brazilian products. On the import side, we run the entire purchase and customs clearance process.</p>",
      "es": "<p>Actuamos como exportador directo de varios productos brasileños. En la importación, ejecutamos todo el proceso de compra y nacionalización.</p>"
    },
    "facts": {
      "pt": ["RADAR ilimitado", "Licença no MAPA como Estabelecimento Importador (EI)", "Processo completo de importação e compra", "Exportação direta de produtos brasileiros"],
      "en": ["Unlimited RADAR", "MAPA license as an Importing Establishment (EI)", "Complete import and purchase process", "Direct export of Brazilian products"],
      "es": ["RADAR ilimitado", "Licencia en el MAPA como Establecimiento Importador (EI)", "Proceso completo de importación y compra", "Exportación directa de productos brasileños"]
    }
  },
  "consultoria": {
    "img": "https://images.unsplash.com/photo-1606964212858-c215029db704?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Serviço",
      "en": "Service",
      "es": "Servicio"
    },
    "title": {
      "pt": "Consultoria & Assessoria",
      "en": "Consulting & Advisory",
      "es": "Consultoría y Asesoría"
    },
    "body": {
      "pt": "<p>Prestamos consultoria a empresas que ainda não possuem licenças e/ou RADAR para exportar ou importar. Por meio da trading, fazemos a importação por conta e ordem e damos apoio comercial para exportação, representação e comercialização de produtos.</p><p>Ajudamos a inserir produtos brasileiros no mercado externo, auxiliamos empresas estrangeiras que querem vender no Brasil e buscamos, no exterior, os produtos, tecnologias e insumos que empresas brasileiras precisam.</p>",
      "en": "<p>We provide consulting to companies that do not yet have licenses and/or RADAR to export or import. Through the trading company, we import on behalf of third parties and provide commercial support for export, representation and sales of products.</p><p>We help place Brazilian products in foreign markets, assist foreign companies that want to sell in Brazil, and source abroad the products, technologies and inputs that Brazilian companies need.</p>",
      "es": "<p>Prestamos consultoría a empresas que aún no tienen licencias y/o RADAR para exportar o importar. A través de la trading, hacemos la importación por cuenta y orden y damos apoyo comercial para exportación, representación y comercialización de productos.</p><p>Ayudamos a insertar productos brasileños en el mercado externo, asistimos a empresas extranjeras que quieren vender en Brasil y buscamos, en el exterior, los productos, tecnologías e insumos que las empresas brasileñas necesitan.</p>"
    },
    "facts": {
      "pt": ["Importação por conta e ordem", "Apoio comercial à exportação", "Inserção de produtos no mercado externo", "Ponte para empresas estrangeiras no Brasil"],
      "en": ["Import on behalf of third parties", "Commercial support for exports", "Placement of products in foreign markets", "Bridge for foreign companies in Brazil"],
      "es": ["Importación por cuenta y orden", "Apoyo comercial a la exportación", "Inserción de productos en el mercado externo", "Puente para empresas extranjeras en Brasil"]
    }
  },
  "outsourcing": {
    "img": "https://images.unsplash.com/photo-1606964212858-c215029db704?w=1600&q=80&auto=format&fit=crop",
    "kick": {
      "pt": "Serviço",
      "en": "Service",
      "es": "Servicio"
    },
    "title": {
      "pt": "Outsourcing & Procurement",
      "en": "Outsourcing & Procurement",
      "es": "Outsourcing y Procurement"
    },
    "body": {
      "pt": "<p><b>Outsourcing:</b> para empresas que querem comprar ou fabricar um produto específico no Brasil e precisam do fabricante certo. A Aleph Comex atua como agente, responsabilizando-se por qualidade, prazos de entrega e logística.</p><p><b>Procurement:</b> para empresas brasileiras que desejam comprar e importar insumos, máquinas e tecnologias no exterior. Pesquisamos fornecedores e conduzimos a compra e a importação sob medida (tailor made).</p>",
      "en": "<p><b>Outsourcing:</b> for companies that want to buy or manufacture a specific product in Brazil and need the right manufacturer. Aleph Comex acts as an agent, taking responsibility for quality, delivery times and logistics.</p><p><b>Procurement:</b> for Brazilian companies that want to buy and import inputs, machinery and technologies from abroad. We research suppliers and handle the purchase and import, tailor made.</p>",
      "es": "<p><b>Outsourcing:</b> para empresas que quieren comprar o fabricar un producto específico en Brasil y necesitan el fabricante adecuado. Aleph Comex actúa como agente, responsabilizándose por la calidad, los plazos de entrega y la logística.</p><p><b>Procurement:</b> para empresas brasileñas que desean comprar e importar insumos, máquinas y tecnologías del exterior. Buscamos proveedores y conducimos la compra y la importación a medida (tailor made).</p>"
    },
    "facts": {
      "pt": ["Sourcing do fabricante certo no Brasil", "Responsáveis por qualidade, prazo e logística", "Procurement internacional de insumos e máquinas", "Importação tailor made"],
      "en": ["Sourcing the right manufacturer in Brazil", "Responsible for quality, deadlines and logistics", "International procurement of inputs and machinery", "Tailor-made import"],
      "es": ["Sourcing del fabricante adecuado en Brasil", "Responsables por calidad, plazo y logística", "Procurement internacional de insumos y máquinas", "Importación a medida"]
    }
  }
};

const modal = document.getElementById('modal');

function openItem(k) {
  const d = ITEMS[k];
  if (!d) return;
  window.__open = k;
  const L = window.__LANG || 'pt';
  const CTA = {
    pt: 'Solicitar cotação',
    en: 'Request a quote',
    es: 'Solicitar cotización'
  } [L];
  const facts = d.facts[L].map(f => `<li><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>${f}</li>`).join('');
  document.getElementById('modalBody').innerHTML = `
    <div class="m-hero" style="background-image:url('${d.img}')"><div class="mh"><span class="kick">${d.kick[L]}</span><h3>${d.title[L]}</h3></div></div>
    <div class="m-body">${d.body[L]}<ul class="facts">${facts}</ul>
    <div class="m-cta"><a class="btn btn-gold" href="#contato" onclick="closeModal()">${CTA} <span class="arw">→</span></a></div></div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
document.querySelectorAll('[data-item]').forEach(el => el.addEventListener('click', () => openItem(el.dataset.item)));

(function() {
  var I18N = {
    "pt": {
      "nav_sobre": "Sobre",
      "nav_serv": "Serviços",
      "nav_prod": "Produtos",
      "nav_seg": "Segmentos",
      "nav_grupo": "Grupo",
      "nav_contato": "Contato",
      "nav_cta": "Fale conosco",
      "hero_pill": "<span class=\"d\"></span> Trading e comércio exterior desde 2010",
      "hero_h1": "A conexão do mercado internacional para <span class=\"g\">pequenas e médias empresas</span>.",
      "hero_p": "A Aleph Comex é uma trading importadora e exportadora que abre o mundo para o seu negócio, com apoio comercial, consultoria e toda a estrutura de comércio exterior que a sua empresa não precisa ter internamente.",
      "hero_b1": "Nossos serviços <span class=\"arw\">→</span>",
      "hero_b2": "Produtos de exportação <span class=\"arw\">→</span>",
      "hero_s1": "soluções de negócio estruturadas",
      "hero_s2": "segmentos de atuação",
      "hero_s3": "importação e exportação",
      "hv_badge": "conectando o Brasil ao mundo",
      "scrollcue": "role para explorar ↓",
      "about_eye": "Sobre a Aleph Comex",
      "about_h2": "Mais que uma importadora e exportadora",
      "about_p1": "Fundada em 2010, a Aleph Comex atua como trading e comercial importadora e exportadora em diversos segmentos, ligando pequenas e médias empresas ao mercado internacional, no Brasil e no mundo.",
      "about_p2": "Com base em quatro soluções de negócio, temos processos estruturados e profissionais capacitados para identificar a saída de comércio exterior ideal para cada cliente.",
      "sol1_t": "Exportação",
      "sol1_d": "Exportador direto de produtos brasileiros.",
      "sol2_t": "Importação",
      "sol2_d": "Processo completo, com RADAR ilimitado e licença no MAPA.",
      "sol3_t": "Consultoria",
      "sol3_d": "Apoio a quem ainda não tem estrutura para operar.",
      "sol4_t": "Outsourcing",
      "sol4_d": "Sourcing e procurement sob medida, dentro e fora do país.",
      "reach_eye": "Alcance global",
      "reach_h2": "Do interior do Brasil aos principais mercados do mundo",
      "reach_p": "Conectamos compradores e fornecedores em diversos países, apoiados pela estrutura logística do Grupo Aleph, presente em 30 nações.",
      "reach_s1": "países no network do grupo",
      "reach_s2": "anos de comércio exterior",
      "reach_s3": "segmentos atendidos",
      "serv_eye": "Serviços",
      "serv_h2": "Soluções eficientes e inovadoras",
      "serv_p": "Do primeiro contato regulatório à compra internacional, a Aleph Comex assume a operação de comércio exterior por você.",
      "sv1_t": "Consultoria & Assessoria",
      "sv1_d": "Para empresas sem licenças ou RADAR: importação por conta e ordem, apoio comercial à exportação, representação e inserção de produtos no mercado externo.",
      "sv2_t": "Outsourcing & Procurement",
      "sv2_d": "Encontramos o fabricante certo no Brasil ou pesquisamos, compramos e importamos insumos, máquinas e tecnologias do exterior, sob medida para o cliente.",
      "prod_eye": "Produtos de exportação",
      "prod_h2": "O melhor do Brasil para o mundo",
      "prod_p": "Exportador direto de produtos brasileiros com controle de origem e certificações. Clique para ver os detalhes.",
      "p_cafe": "Café",
      "p_pimenta": "Pimenta do reino",
      "p_castanha": "Castanha do Pará",
      "p_impexp": "Exportação & Importação",
      "ver_det": "Ver detalhes →",
      "seg_eye": "Segmentos de atuação",
      "seg_h2": "Onde a Aleph Comex opera",
      "seg_p": "A trading conecta compradores e fornecedores em vários setores da economia.",
      "seg1": "Agronegócio",
      "seg2": "Tecnologia",
      "seg3": "Alimentos",
      "seg4": "Cosméticos",
      "seg5": "Máquinas e insumos",
      "diff_eye": "Por que a Aleph Comex",
      "diff_h2": "Estrutura pronta para operar",
      "dc1_t": "RADAR ilimitado",
      "dc1_d": "Habilitação sem limite de valor para importar em nome da trading.",
      "dc2_t": "Licença no MAPA",
      "dc2_d": "Registro como Estabelecimento Importador (EI) junto ao Ministério da Agricultura.",
      "dc3_t": "Por conta e ordem",
      "dc3_d": "Importamos por você, mesmo que sua empresa não tenha licenças.",
      "dc4_t": "Força do Grupo Aleph",
      "dc4_d": "Logística própria (AlephLog) e nutrição vegetal (Aleph Agro) integradas.",
      "grp_eye": "Grupo Aleph",
      "grp_h2": "O cérebro comercial de uma cadeia completa",
      "grp_p": "A Aleph Comex é o núcleo comercial do Grupo Aleph. A AlephLog cuida da logística internacional e do despacho aduaneiro em 30 países, e a Aleph Agro atua na nutrição vegetal. Juntas, levam o seu negócio do fornecedor ao destino.",
      "con_eye": "Fale com um especialista",
      "con_h2": "Vamos abrir o mundo para o seu negócio",
      "con_p": "Conte o que você precisa importar, exportar ou encontrar. Nossa equipe estrutura a solução de comércio exterior ideal para a sua empresa.",
      "l_nome": "Nome",
      "l_empresa": "Empresa",
      "l_email": "E-mail",
      "l_int": "Interesse",
      "l_seg": "Segmento",
      "l_msg": "Mensagem",
      "io1": "Exportar produtos",
      "io2": "Importar produtos",
      "io3": "Consultoria em comex",
      "io4": "Outsourcing / procurement",
      "sopt1": "Agronegócio",
      "sopt2": "Tecnologia",
      "sopt3": "Alimentos",
      "sopt4": "Cosméticos",
      "sopt5": "Máquinas e insumos",
      "sopt6": "Outro",
      "btn_send": "Enviar mensagem",
      "okmsg": "✓ Mensagem recebida! Este é um protótipo, nenhum dado foi enviado.",
      "foot_p": "Trading importadora e exportadora. A conexão do mercado internacional para pequenas e médias empresas no Brasil e no mundo.",
      "foot_nav": "Navegar",
      "foot_l1": "Sobre",
      "foot_l2": "Serviços",
      "foot_l3": "Produtos",
      "foot_l4": "Segmentos",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contato",
      "foot_contato2": "Contato",
      "foot_copy": "© 2026 Aleph Comex. Todos os direitos reservados.",
      "foot_proto": "Protótipo de referência · direção visual da marca",
      "ph_nome": "Seu nome",
      "ph_empresa": "Sua empresa",
      "ph_msg": "Como podemos ajudar?"
    },
    "en": {
      "nav_sobre": "About",
      "nav_serv": "Services",
      "nav_prod": "Products",
      "nav_seg": "Segments",
      "nav_grupo": "Group",
      "nav_contato": "Contact",
      "nav_cta": "Contact us",
      "hero_pill": "<span class=\"d\"></span> Trading and foreign trade since 2010",
      "hero_h1": "The connection to the international market for <span class=\"g\">small and medium businesses</span>.",
      "hero_p": "Aleph Comex is an import and export trading company that opens the world to your business, with commercial support, consulting and all the foreign trade structure your company does not need to have in-house.",
      "hero_b1": "Our services <span class=\"arw\">→</span>",
      "hero_b2": "Export products <span class=\"arw\">→</span>",
      "hero_s1": "structured business solutions",
      "hero_s2": "segments served",
      "hero_s3": "import and export",
      "hv_badge": "connecting Brazil to the world",
      "scrollcue": "scroll to explore ↓",
      "about_eye": "About Aleph Comex",
      "about_h2": "More than an importer and exporter",
      "about_p1": "Founded in 2010, Aleph Comex operates as a trading and commercial import-export company across several segments, connecting small and medium businesses to the international market, in Brazil and worldwide.",
      "about_p2": "Based on four business solutions, we have structured processes and skilled professionals to identify the ideal foreign trade path for each client.",
      "sol1_t": "Export",
      "sol1_d": "Direct exporter of Brazilian products.",
      "sol2_t": "Import",
      "sol2_d": "Full process, with unlimited RADAR and MAPA license.",
      "sol3_t": "Consulting",
      "sol3_d": "Support for those who do not yet have the structure to operate.",
      "sol4_t": "Outsourcing",
      "sol4_d": "Tailored sourcing and procurement, inside and outside the country.",
      "reach_eye": "Global reach",
      "reach_h2": "From Brazil's heartland to the world's main markets",
      "reach_p": "We connect buyers and suppliers in many countries, backed by the Aleph Group's logistics structure, present in 30 nations.",
      "reach_s1": "countries in the group's network",
      "reach_s2": "years of foreign trade",
      "reach_s3": "segments served",
      "serv_eye": "Services",
      "serv_h2": "Efficient and innovative solutions",
      "serv_p": "From the first regulatory step to the international purchase, Aleph Comex takes on the foreign trade operation for you.",
      "sv1_t": "Consulting & Advisory",
      "sv1_d": "For companies without licenses or RADAR: import on behalf of third parties, commercial support for exports, representation and placement of products in foreign markets.",
      "sv2_t": "Outsourcing & Procurement",
      "sv2_d": "We find the right manufacturer in Brazil, or we research, buy and import inputs, machinery and technologies from abroad, tailored to the client.",
      "prod_eye": "Export products",
      "prod_h2": "The best of Brazil to the world",
      "prod_p": "Direct exporter of Brazilian products with origin control and certifications. Click to see the details.",
      "p_cafe": "Coffee",
      "p_pimenta": "Black pepper",
      "p_castanha": "Brazil nut",
      "p_impexp": "Export & Import",
      "ver_det": "See details →",
      "seg_eye": "Segments",
      "seg_h2": "Where Aleph Comex operates",
      "seg_p": "The trading company connects buyers and suppliers across several sectors of the economy.",
      "seg1": "Agribusiness",
      "seg2": "Technology",
      "seg3": "Food",
      "seg4": "Cosmetics",
      "seg5": "Machinery and inputs",
      "diff_eye": "Why Aleph Comex",
      "diff_h2": "Ready-to-operate structure",
      "dc1_t": "Unlimited RADAR",
      "dc1_d": "Authorization with no value limit to import on behalf of the trading company.",
      "dc2_t": "MAPA license",
      "dc2_d": "Registered as an Importing Establishment (EI) with the Ministry of Agriculture.",
      "dc3_t": "On behalf of third parties",
      "dc3_d": "We import for you, even if your company has no licenses.",
      "dc4_t": "Strength of the Aleph Group",
      "dc4_d": "Integrated in-house logistics (AlephLog) and plant nutrition (Aleph Agro).",
      "grp_eye": "Aleph Group",
      "grp_h2": "The commercial brain of a complete chain",
      "grp_p": "Aleph Comex is the commercial core of the Aleph Group. AlephLog handles international logistics and customs clearance in 30 countries, and Aleph Agro works in plant nutrition. Together, they take your business from supplier to destination.",
      "con_eye": "Talk to a specialist",
      "con_h2": "Let's open the world to your business",
      "con_p": "Tell us what you need to import, export or source. Our team builds the ideal foreign trade solution for your company.",
      "l_nome": "Name",
      "l_empresa": "Company",
      "l_email": "Email",
      "l_int": "Interest",
      "l_seg": "Segment",
      "l_msg": "Message",
      "io1": "Export products",
      "io2": "Import products",
      "io3": "Foreign trade consulting",
      "io4": "Outsourcing / procurement",
      "sopt1": "Agribusiness",
      "sopt2": "Technology",
      "sopt3": "Food",
      "sopt4": "Cosmetics",
      "sopt5": "Machinery and inputs",
      "sopt6": "Other",
      "btn_send": "Send message",
      "okmsg": "✓ Message received! This is a prototype, no data was sent.",
      "foot_p": "Import and export trading company. The connection to the international market for small and medium businesses in Brazil and worldwide.",
      "foot_nav": "Navigate",
      "foot_l1": "About",
      "foot_l2": "Services",
      "foot_l3": "Products",
      "foot_l4": "Segments",
      "foot_grp": "Aleph Group",
      "foot_contato_link": "Contact",
      "foot_contato2": "Contact",
      "foot_copy": "© 2026 Aleph Comex. All rights reserved.",
      "foot_proto": "Reference prototype · brand visual direction",
      "ph_nome": "Your name",
      "ph_empresa": "Your company",
      "ph_msg": "How can we help?"
    },
    "es": {
      "nav_sobre": "Acerca",
      "nav_serv": "Servicios",
      "nav_prod": "Productos",
      "nav_seg": "Segmentos",
      "nav_grupo": "Grupo",
      "nav_contato": "Contacto",
      "nav_cta": "Contáctanos",
      "hero_pill": "<span class=\"d\"></span> Trading y comercio exterior desde 2010",
      "hero_h1": "La conexión con el mercado internacional para <span class=\"g\">pequeñas y medianas empresas</span>.",
      "hero_p": "Aleph Comex es una trading importadora y exportadora que abre el mundo para su negocio, con apoyo comercial, consultoría y toda la estructura de comercio exterior que su empresa no necesita tener internamente.",
      "hero_b1": "Nuestros servicios <span class=\"arw\">→</span>",
      "hero_b2": "Productos de exportación <span class=\"arw\">→</span>",
      "hero_s1": "soluciones de negocio estructuradas",
      "hero_s2": "segmentos de actuación",
      "hero_s3": "importación y exportación",
      "hv_badge": "conectando Brasil con el mundo",
      "scrollcue": "desliza para explorar ↓",
      "about_eye": "Acerca de Aleph Comex",
      "about_h2": "Más que una importadora y exportadora",
      "about_p1": "Fundada en 2010, Aleph Comex actúa como trading y comercial importadora y exportadora en diversos segmentos, conectando pequeñas y medianas empresas al mercado internacional, en Brasil y en el mundo.",
      "about_p2": "Con base en cuatro soluciones de negocio, tenemos procesos estructurados y profesionales capacitados para identificar la salida de comercio exterior ideal para cada cliente.",
      "sol1_t": "Exportación",
      "sol1_d": "Exportador directo de productos brasileños.",
      "sol2_t": "Importación",
      "sol2_d": "Proceso completo, con RADAR ilimitado y licencia en el MAPA.",
      "sol3_t": "Consultoría",
      "sol3_d": "Apoyo a quienes aún no tienen estructura para operar.",
      "sol4_t": "Outsourcing",
      "sol4_d": "Sourcing y procurement a medida, dentro y fuera del país.",
      "reach_eye": "Alcance global",
      "reach_h2": "Del interior de Brasil a los principales mercados del mundo",
      "reach_p": "Conectamos compradores y proveedores en diversos países, apoyados por la estructura logística del Grupo Aleph, presente en 30 naciones.",
      "reach_s1": "países en la red del grupo",
      "reach_s2": "años de comercio exterior",
      "reach_s3": "segmentos atendidos",
      "serv_eye": "Servicios",
      "serv_h2": "Soluciones eficientes e innovadoras",
      "serv_p": "Del primer contacto regulatorio a la compra internacional, Aleph Comex asume la operación de comercio exterior por usted.",
      "sv1_t": "Consultoría y Asesoría",
      "sv1_d": "Para empresas sin licencias o RADAR: importación por cuenta y orden, apoyo comercial a la exportación, representación e inserción de productos en el mercado externo.",
      "sv2_t": "Outsourcing y Procurement",
      "sv2_d": "Encontramos el fabricante adecuado en Brasil o buscamos, compramos e importamos insumos, máquinas y tecnologías del exterior, a medida para el cliente.",
      "prod_eye": "Productos de exportación",
      "prod_h2": "Lo mejor de Brasil para el mundo",
      "prod_p": "Exportador directo de productos brasileños con control de origen y certificaciones. Haga clic para ver los detalles.",
      "p_cafe": "Café",
      "p_pimenta": "Pimienta negra",
      "p_castanha": "Nuez de Brasil",
      "p_impexp": "Exportación e Importación",
      "ver_det": "Ver detalles →",
      "seg_eye": "Segmentos de actuación",
      "seg_h2": "Dónde opera Aleph Comex",
      "seg_p": "La trading conecta compradores y proveedores en varios sectores de la economía.",
      "seg1": "Agronegocio",
      "seg2": "Tecnología",
      "seg3": "Alimentos",
      "seg4": "Cosméticos",
      "seg5": "Maquinaria e insumos",
      "diff_eye": "Por qué Aleph Comex",
      "diff_h2": "Estructura lista para operar",
      "dc1_t": "RADAR ilimitado",
      "dc1_d": "Habilitación sin límite de valor para importar en nombre de la trading.",
      "dc2_t": "Licencia en el MAPA",
      "dc2_d": "Registro como Establecimiento Importador (EI) ante el Ministerio de Agricultura.",
      "dc3_t": "Por cuenta y orden",
      "dc3_d": "Importamos por usted, aunque su empresa no tenga licencias.",
      "dc4_t": "Fuerza del Grupo Aleph",
      "dc4_d": "Logística propia (AlephLog) y nutrición vegetal (Aleph Agro) integradas.",
      "grp_eye": "Grupo Aleph",
      "grp_h2": "El cerebro comercial de una cadena completa",
      "grp_p": "Aleph Comex es el núcleo comercial del Grupo Aleph. AlephLog se encarga de la logística internacional y del despacho aduanero en 30 países, y Aleph Agro actúa en la nutrición vegetal. Juntas, llevan su negocio del proveedor al destino.",
      "con_eye": "Habla con un especialista",
      "con_h2": "Abramos el mundo para su negocio",
      "con_p": "Cuéntenos qué necesita importar, exportar o encontrar. Nuestro equipo estructura la solución de comercio exterior ideal para su empresa.",
      "l_nome": "Nombre",
      "l_empresa": "Empresa",
      "l_email": "Correo",
      "l_int": "Interés",
      "l_seg": "Segmento",
      "l_msg": "Mensaje",
      "io1": "Exportar productos",
      "io2": "Importar productos",
      "io3": "Consultoría en comex",
      "io4": "Outsourcing / procurement",
      "sopt1": "Agronegocio",
      "sopt2": "Tecnología",
      "sopt3": "Alimentos",
      "sopt4": "Cosméticos",
      "sopt5": "Maquinaria e insumos",
      "sopt6": "Otro",
      "btn_send": "Enviar mensaje",
      "okmsg": "✓ ¡Mensaje recibido! Esto es un prototipo, no se envió ningún dato.",
      "foot_p": "Trading importadora y exportadora. La conexión con el mercado internacional para pequeñas y medianas empresas en Brasil y en el mundo.",
      "foot_nav": "Navegar",
      "foot_l1": "Acerca",
      "foot_l2": "Servicios",
      "foot_l3": "Productos",
      "foot_l4": "Segmentos",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contacto",
      "foot_contato2": "Contacto",
      "foot_copy": "© 2026 Aleph Comex. Todos los derechos reservados.",
      "foot_proto": "Prototipo de referencia · dirección visual de la marca",
      "ph_nome": "Su nombre",
      "ph_empresa": "Su empresa",
      "ph_msg": "¿Cómo podemos ayudar?"
    }
  };

  function setLang(l) {
    document.documentElement.lang = (l == 'pt' ? 'pt-BR' : l);
    window.__LANG = l;
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
    if (window.__open && document.getElementById('modal').classList.contains('open') && window.openItem) {
      window.openItem(window.__open);
    }
  }
  window.setLang = setLang;
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
