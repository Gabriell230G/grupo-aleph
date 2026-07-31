// nav solidify + reveal + counter + mobile menu
const nav = document.getElementById('nav');
addEventListener('scroll', () => {
  nav.classList.toggle('solid', scrollY > 60)
});

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

// count up
const counters = document.querySelectorAll('[data-count]');
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
counters.forEach(c => cio.observe(c));

// mobile menu
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const l = document.querySelector('nav.links');
  const open = l.style.display === 'flex';
  l.style.cssText = open ? '' : 'display:flex;flex-direction:column;position:absolute;top:74px;right:20px;background:#fff;padding:20px 26px;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.15);gap:1.1rem';
});
document.querySelectorAll('nav.links a').forEach(a => a.addEventListener('click', () => {
  document.querySelector('nav.links').style.cssText = ''
}));

// form
document.getElementById('qform').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('ok').style.display = 'block';
  e.target.querySelector('button').textContent = 'Enviado ✓';
});

// prefill do formulário
function pickCrop(crop) {
  const sel = document.getElementById('crop-select');
  if (sel && crop) {
    [...sel.options].forEach(o => {
      if (o.value === crop || o.textContent === crop) sel.value = o.value
    });
  }
  const form = document.getElementById('qform');
  closeModal();
  document.getElementById('contato').scrollIntoView({
    behavior: 'smooth'
  });
  setTimeout(() => {
    form.style.transition = 'box-shadow .4s';
    form.style.boxShadow = '0 0 0 3px rgba(47,138,82,.55),var(--shadow)';
    setTimeout(() => form.style.boxShadow = '', 1400);
  }, 550);
}

/* ===== DADOS REAIS ===== */
const AG = 'http://www.alephagro.com.br/';
const NCOL = {
  'Nitrogênio': '#173a5e',
  'Potássio': '#b0201f',
  'Cálcio': '#2f80c7',
  'Fósforo': '#7cc23f',
  'Magnésio': '#23b5d3',
  'Enxofre': '#e0a53b'
};

const NUTR = {
  pt: {
    'Nitrogênio': 'Nitrogênio',
    'Potássio': 'Potássio',
    'Cálcio': 'Cálcio',
    'Fósforo': 'Fósforo',
    'Magnésio': 'Magnésio',
    'Enxofre': 'Enxofre'
  },
  en: {
    'Nitrogênio': 'Nitrogen',
    'Potássio': 'Potassium',
    'Cálcio': 'Calcium',
    'Fósforo': 'Phosphorus',
    'Magnésio': 'Magnesium',
    'Enxofre': 'Sulfur'
  },
  es: {
    'Nitrogênio': 'Nitrógeno',
    'Potássio': 'Potasio',
    'Cálcio': 'Calcio',
    'Fósforo': 'Fósforo',
    'Magnésio': 'Magnesio',
    'Enxofre': 'Azufre'
  }
};
const QUAL = {
  pt: {
    'Exigente': 'Exigente',
    'Normal': 'Normal',
    'Média': 'Média'
  },
  en: {
    'Exigente': 'Demanding',
    'Normal': 'Normal',
    'Média': 'Medium'
  },
  es: {
    'Exigente': 'Exigente',
    'Normal': 'Normal',
    'Média': 'Media'
  }
};
const CROPNAME = {
  pt: {},
  en: {},
  es: {}
};
CROPNAME.pt['Alface'] = "Alface";
CROPNAME.en['Alface'] = "Lettuce";
CROPNAME.es['Alface'] = "Lechuga";
CROPNAME.pt['Banana'] = "Banana";
CROPNAME.en['Banana'] = "Banana";
CROPNAME.es['Banana'] = "Banana";
CROPNAME.pt['Batata'] = "Batata";
CROPNAME.en['Batata'] = "Potato";
CROPNAME.es['Batata'] = "Patata";
CROPNAME.pt['Café'] = "Café";
CROPNAME.en['Café'] = "Coffee";
CROPNAME.es['Café'] = "Café";
CROPNAME.pt['Cebola'] = "Cebola";
CROPNAME.en['Cebola'] = "Onion";
CROPNAME.es['Cebola'] = "Cebolla";
CROPNAME.pt['Cenoura'] = "Cenoura";
CROPNAME.en['Cenoura'] = "Carrot";
CROPNAME.es['Cenoura'] = "Zanahoria";
CROPNAME.pt['Feijão'] = "Feijão";
CROPNAME.en['Feijão'] = "Beans";
CROPNAME.es['Feijão'] = "Frijol";
CROPNAME.pt['Manga'] = "Manga";
CROPNAME.en['Manga'] = "Mango";
CROPNAME.es['Manga'] = "Mango";
CROPNAME.pt['Milho'] = "Milho";
CROPNAME.en['Milho'] = "Corn";
CROPNAME.es['Milho'] = "Maíz";
CROPNAME.pt['Morango'] = "Morango";
CROPNAME.en['Morango'] = "Strawberry";
CROPNAME.es['Morango'] = "Fresa";
CROPNAME.pt['Pimenta'] = "Pimenta";
CROPNAME.en['Pimenta'] = "Pepper";
CROPNAME.es['Pimenta'] = "Pimiento";
CROPNAME.pt['Soja'] = "Soja";
CROPNAME.en['Soja'] = "Soybean";
CROPNAME.es['Soja'] = "Soja";
CROPNAME.pt['Tomate'] = "Tomate";
CROPNAME.en['Tomate'] = "Tomato";
CROPNAME.es['Tomate'] = "Tomate";
CROPNAME.pt['Uva'] = "Uva";
CROPNAME.en['Uva'] = "Grape";
CROPNAME.es['Uva'] = "Uva";

const CHARK = {
  pt: {
    'Matérias-primas': 'Matérias-primas',
    'Natureza física': 'Natureza física',
    'Aplicação principal': 'Aplicação principal',
    'Dose': 'Dose'
  },
  en: {
    'Matérias-primas': 'Raw materials',
    'Natureza física': 'Physical form',
    'Aplicação principal': 'Main application',
    'Dose': 'Rate'
  },
  es: {
    'Matérias-primas': 'Materias primas',
    'Natureza física': 'Naturaleza física',
    'Aplicação principal': 'Aplicación principal',
    'Dose': 'Dosis'
  }
};
const ELEM = {
  en: {
    "Nitrogênio (N)": "Nitrogen (N)",
    "Nitrogênio (N) total": "Total nitrogen (N)",
    "Pentóxido de fósforo (P₂O₅) solúvel": "Phosphorus pentoxide (P₂O₅), soluble",
    "Pentóxido de fósforo (P₂O₅) total": "Phosphorus pentoxide (P₂O₅), total",
    "Óxido de Potássio (K₂O)": "Potassium oxide (K₂O)",
    "Potássio (K)": "Potassium (K)",
    "Carbono orgânico": "Organic carbon",
    "Ácidos húmicos": "Humic acids",
    "Ácidos fúlvicos": "Fulvic acids",
    "Enxofre (S)": "Sulfur (S)",
    "Cobre (Cu)": "Copper (Cu)",
    "Boro (B)": "Boron (B)",
    "Molibdênio (Mo)": "Molybdenum (Mo)",
    "Manganês (Mn)": "Manganese (Mn)",
    "Zinco (Zn)": "Zinc (Zn)",
    "Zinco (Zn) total": "Total zinc (Zn)",
    "Ferro (Fe)": "Iron (Fe)",
    "Cálcio (Ca)": "Calcium (Ca)",
    "Aminoácidos livres": "Free amino acids"
  },
  es: {
    "Nitrogênio (N)": "Nitrógeno (N)",
    "Nitrogênio (N) total": "Nitrógeno (N) total",
    "Pentóxido de fósforo (P₂O₅) solúvel": "Pentóxido de fósforo (P₂O₅) soluble",
    "Pentóxido de fósforo (P₂O₅) total": "Pentóxido de fósforo (P₂O₅) total",
    "Óxido de Potássio (K₂O)": "Óxido de potasio (K₂O)",
    "Potássio (K)": "Potasio (K)",
    "Carbono orgânico": "Carbono orgánico",
    "Ácidos húmicos": "Ácidos húmicos",
    "Ácidos fúlvicos": "Ácidos fúlvicos",
    "Enxofre (S)": "Azufre (S)",
    "Cobre (Cu)": "Cobre (Cu)",
    "Boro (B)": "Boro (B)",
    "Molibdênio (Mo)": "Molibdeno (Mo)",
    "Manganês (Mn)": "Manganeso (Mn)",
    "Zinco (Zn)": "Zinc (Zn)",
    "Zinco (Zn) total": "Zinc (Zn) total",
    "Ferro (Fe)": "Hierro (Fe)",
    "Cálcio (Ca)": "Calcio (Ca)",
    "Aminoácidos livres": "Aminoácidos libres"
  }
};
const VOCAB = {
  en: {
    "Hidrolisado de proteína, Ácido fosfórico, Água": "Protein hydrolysate, Phosphoric acid, Water",
    "Líquido": "Liquid",
    "Sólido": "Solid",
    "Via foliar e fertirrigação": "Foliar and fertigation",
    "Aminoácido, Sulfato de Cobre, Água": "Amino acid, Copper sulfate, Water",
    "Pós-colheita (haste)": "Post-harvest (stem)",
    "Ácido fosforoso, Hidróxido de potássio, Água": "Phosphorous acid, Potassium hydroxide, Water",
    "Lignosulfonatos, Hidróxido de Potássio, Leonardita": "Lignosulfonates, Potassium hydroxide, Leonardite",
    "Uréia, Proteínas hidrolisadas": "Urea, Hydrolyzed proteins",
    "Sulfato de Zinco, Cloreto de Cálcio, Aminoácidos, Água": "Zinc sulfate, Calcium chloride, Amino acids, Water",
    "Fosfato monoamônico, Ácido bórico, Aminoácido, Molibdato de amônio": "Monoammonium phosphate, Boric acid, Amino acid, Ammonium molybdate",
    "Sulfato de Potássio, Hidrolisado de proteína, Água": "Potassium sulfate, Protein hydrolysate, Water",
    "Uréia, Carbonato de Potássio, Leonardita": "Urea, Potassium carbonate, Leonardite",
    "MAP, Leonardita, Sulfato de Zinco, Nitrato de amônio": "MAP, Leonardite, Zinc sulfate, Ammonium nitrate",
    "Via solo, foliar e fertirrigação": "Soil, foliar and fertigation",
    "Sulfato de Zinco, Sulfato de Manganês, Aminoácidos, Água": "Zinc sulfate, Manganese sulfate, Amino acids, Water",
    "Sulfato de Amônio": "Ammonium sulfate",
    "Via solo": "Soil application",
    "Colemanita, MAP, Sulfato de Potássio, Óxido de Zinco, Óxido de Magnésio, Sulfato de Amônio": "Colemanite, MAP, Potassium sulfate, Zinc oxide, Magnesium oxide, Ammonium sulfate",
    "Cianamida de Cálcio": "Calcium cyanamide",
    "Sulfato Ferroso, Sulfato de Zinco, Glicerina, Água": "Ferrous sulfate, Zinc sulfate, Glycerin, Water",
    "Via foliar": "Foliar",
    "Nitrato de amônio e Cálcio, Uréia, Água": "Ammonium and calcium nitrate, Urea, Water",
    "Via solo (localizada)": "Soil (localized)",
    "25 a 50 kg/ha": "25 to 50 kg/ha"
  },
  es: {
    "Hidrolisado de proteína, Ácido fosfórico, Água": "Hidrolizado de proteína, Ácido fosfórico, Agua",
    "Líquido": "Líquido",
    "Sólido": "Sólido",
    "Via foliar e fertirrigação": "Vía foliar y fertirriego",
    "Aminoácido, Sulfato de Cobre, Água": "Aminoácido, Sulfato de cobre, Agua",
    "Pós-colheita (haste)": "Poscosecha (tallo)",
    "Ácido fosforoso, Hidróxido de potássio, Água": "Ácido fosforoso, Hidróxido de potasio, Agua",
    "Lignosulfonatos, Hidróxido de Potássio, Leonardita": "Lignosulfonatos, Hidróxido de potasio, Leonardita",
    "Uréia, Proteínas hidrolisadas": "Urea, Proteínas hidrolizadas",
    "Sulfato de Zinco, Cloreto de Cálcio, Aminoácidos, Água": "Sulfato de zinc, Cloruro de calcio, Aminoácidos, Agua",
    "Fosfato monoamônico, Ácido bórico, Aminoácido, Molibdato de amônio": "Fosfato monoamónico, Ácido bórico, Aminoácido, Molibdato de amonio",
    "Sulfato de Potássio, Hidrolisado de proteína, Água": "Sulfato de potasio, Hidrolizado de proteína, Agua",
    "Uréia, Carbonato de Potássio, Leonardita": "Urea, Carbonato de potasio, Leonardita",
    "MAP, Leonardita, Sulfato de Zinco, Nitrato de amônio": "MAP, Leonardita, Sulfato de zinc, Nitrato de amonio",
    "Via solo, foliar e fertirrigação": "Vía suelo, foliar y fertirriego",
    "Sulfato de Zinco, Sulfato de Manganês, Aminoácidos, Água": "Sulfato de zinc, Sulfato de manganeso, Aminoácidos, Agua",
    "Sulfato de Amônio": "Sulfato de amonio",
    "Via solo": "Vía suelo",
    "Colemanita, MAP, Sulfato de Potássio, Óxido de Zinco, Óxido de Magnésio, Sulfato de Amônio": "Colemanita, MAP, Sulfato de potasio, Óxido de zinc, Óxido de magnesio, Sulfato de amonio",
    "Cianamida de Cálcio": "Cianamida de calcio",
    "Sulfato Ferroso, Sulfato de Zinco, Glicerina, Água": "Sulfato ferroso, Sulfato de zinc, Glicerina, Agua",
    "Via foliar": "Vía foliar",
    "Nitrato de amônio e Cálcio, Uréia, Água": "Nitrato de amonio y calcio, Urea, Agua",
    "Via solo (localizada)": "Vía suelo (localizada)",
    "25 a 50 kg/ha": "25 a 50 kg/ha"
  }
};
const DOSE = {
  pt: 'Para doses, consulte o departamento técnico: (11) 96610-9272 · (16) 99233-0073',
  en: 'For application rates, consult our technical department: (11) 96610-9272 · (16) 99233-0073',
  es: 'Para dosis, consulte nuestro departamento técnico: (11) 96610-9272 · (16) 99233-0073'
};
const MT = {
  pt: {
    donut: 'extração',
    mck: 'Protocolo de cultivo',
    mci: 'Extração de nutrientes, programa nutricional e produtos recomendados pela Aleph Agro para o cultivo de {n}.',
    hext: 'Extração média de nutrientes',
    sext: 'A média de nutrientes que a planta extrai do solo.',
    hprog: 'Programa nutricional',
    sprog: 'Produtos indicados por fase, do plantio à colheita.',
    palt: 'Programa nutricional do {n}',
    hprod: 'Produtos que podem ser utilizados',
    hativ: 'Ativador vegetal',
    ccta: 'Solicitar recomendação para {n}',
    pk: '',
    hcar: 'Características',
    hform: 'Formulação',
    hben: 'Benefícios',
    pcta: 'Solicitar cotação',
    catarrow: 'Ver ficha técnica →'
  },
  en: {
    donut: 'extraction',
    mck: 'Crop protocol',
    mci: 'Nutrient extraction, nutritional program and products recommended by Aleph Agro for growing {n}.',
    hext: 'Average nutrient extraction',
    sext: 'The average nutrients the plant extracts from the soil.',
    hprog: 'Nutritional program',
    sprog: 'Products recommended by stage, from planting to harvest.',
    palt: 'Nutritional program for {n}',
    hprod: 'Products that can be used',
    hativ: 'Plant activator',
    ccta: 'Request a recommendation for {n}',
    pk: '',
    hcar: 'Characteristics',
    hform: 'Formulation',
    hben: 'Benefits',
    pcta: 'Request a quote',
    catarrow: 'See technical sheet →'
  },
  es: {
    donut: 'extracción',
    mck: 'Protocolo de cultivo',
    mci: 'Extracción de nutrientes, programa nutricional y productos recomendados por Aleph Agro para el cultivo de {n}.',
    hext: 'Extracción media de nutrientes',
    sext: 'La media de nutrientes que la planta extrae del suelo.',
    hprog: 'Programa nutricional',
    sprog: 'Productos indicados por fase, de la siembra a la cosecha.',
    palt: 'Programa nutricional del {n}',
    hprod: 'Productos que se pueden utilizar',
    hativ: 'Activador vegetal',
    ccta: 'Solicitar recomendación para {n}',
    pk: '',
    hcar: 'Características',
    hform: 'Formulación',
    hben: 'Beneficios',
    pcta: 'Solicitar cotización',
    catarrow: 'Ver ficha técnica →'
  }
};

function L() {
  return window.__LANG || 'pt';
}

const CROPS = {
  'Alface': {
    foto: 'https://images.unsplash.com/photo-1713082063917-59863809f007?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_alface.jpg',
    nut: [
      ['Potássio', 39],
      ['Cálcio', 32],
      ['Nitrogênio', 17],
      ['Fósforo', 9],
      ['Magnésio', 7]
    ],
    notes: [],
    prod: ['BloomFruit', 'Maspic', 'Renovasoil', 'Super K', 'Super Mix', 'SuperAmin']
  },
  'Banana': {
    foto: 'https://images.unsplash.com/photo-1620036924477-c3d6e9ce36fc?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_banana.jpg',
    nut: [
      ['Potássio', 55],
      ['Nitrogênio', 31],
      ['Fósforo', 7],
      ['Magnésio', 6],
      ['Cálcio', 2]
    ],
    notes: [
      ['Enxofre', 'Exigente']
    ],
    prod: ['Kualité', 'Maspic', 'Super Mix', 'SuperAmin']
  },
  'Batata': {
    foto: 'https://images.unsplash.com/photo-1764587492501-bf8b61c09792?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_batata.jpg',
    nut: [
      ['Potássio', 47],
      ['Nitrogênio', 23],
      ['Fósforo', 9]
    ],
    notes: [
      ['Cálcio', 'Exigente'],
      ['Enxofre', 'Exigente'],
      ['Magnésio', 'Normal']
    ],
    prod: ['BestCopper', 'Maspic', 'Renovasoil', 'Super Mix', 'Super Phos', 'SuperAmin']
  },
  'Café': {
    foto: 'https://images.unsplash.com/photo-1762686852371-763b689910b2?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_cafe.jpg',
    nut: [
      ['Nitrogênio', 45],
      ['Potássio', 41],
      ['Cálcio', 7],
      ['Enxofre', 4],
      ['Fósforo', 3]
    ],
    notes: [],
    prod: ['BloomFruit', 'Cuaje', 'SuperAmin']
  },
  'Cebola': {
    foto: 'https://images.unsplash.com/photo-1687365301009-af603af2a8a9?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_cebola.jpg',
    nut: [
      ['Potássio', 44],
      ['Nitrogênio', 31],
      ['Fósforo', 14]
    ],
    notes: [
      ['Cálcio', 'Exigente'],
      ['Enxofre', 'Exigente']
    ],
    prod: ['BestCopper', 'BloomFruit', 'Maspic', 'Super K', 'SuperAmin', 'Ziman']
  },
  'Cenoura': {
    foto: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_cenoura.jpg',
    nut: [
      ['Potássio', 54],
      ['Nitrogênio', 27],
      ['Fósforo', 12]
    ],
    notes: [
      ['Cálcio', 'Exigente']
    ],
    prod: ['BloomFruit', 'Maspic', 'Renovasoil', 'Super K', 'SuperAmin']
  },
  'Feijão': {
    foto: 'https://images.unsplash.com/photo-1574963835594-61eede2070dc?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_feijao.jpg',
    nut: [
      ['Nitrogênio', 57],
      ['Potássio', 28],
      ['Fósforo', 6],
      ['Cálcio', 4],
      ['Magnésio', 3],
      ['Enxofre', 2]
    ],
    notes: [],
    prod: ['Cuaje', 'Maspic', 'Nutriboost', 'Super K', 'Super Mix', 'SuperAmin']
  },
  'Manga': {
    foto: 'https://images.unsplash.com/photo-1732472581875-89ff83f18439?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_manga.jpg',
    nut: [
      ['Potássio', 26],
      ['Cálcio', 26],
      ['Nitrogênio', 23],
      ['Magnésio', 13],
      ['Fósforo', 7]
    ],
    notes: [
      ['Enxofre', 'Exigente']
    ],
    prod: ['BloomFruit', 'Filter Max', 'Maspic']
  },
  'Milho': {
    foto: 'https://images.unsplash.com/photo-1565522734001-f00e62ec8424?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_milho.jpg',
    nut: [
      ['Nitrogênio', 35],
      ['Potássio', 29],
      ['Fósforo', 14],
      ['Cálcio', 9],
      ['Magnésio', 9],
      ['Enxofre', 4]
    ],
    notes: [],
    prod: ['AmoSulfate', 'Nutriboost', 'Ziman']
  },
  'Morango': {
    foto: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_morango.jpg',
    nut: [
      ['Nitrogênio', 27],
      ['Potássio', 23],
      ['Cálcio', 20],
      ['Fósforo', 16],
      ['Magnésio', 14]
    ],
    notes: [],
    prod: ['BloomFruit', 'Cuaje', 'Maspic', 'Renovasoil', 'Super K', 'Super Mix', 'SuperAmin'],
    ativadores: ['AlephAminol', 'BestCopper', 'Flor Xtend', 'Maspic']
  },
  'Pimenta': {
    foto: 'https://images.unsplash.com/photo-1761669411746-8f401c29e9a6?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_pimenta.jpg',
    nut: [
      ['Potássio', 47],
      ['Nitrogênio', 32],
      ['Fósforo', 11]
    ],
    notes: [
      ['Cálcio', 'Exigente']
    ],
    prod: ['Cuaje', 'Renovasoil', 'SuperAmin']
  },
  'Soja': {
    foto: 'https://images.unsplash.com/photo-1600747476236-76579658b1b1?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_soja.jpg',
    nut: [
      ['Nitrogênio', 65],
      ['Potássio', 20],
      ['Fósforo', 5],
      ['Cálcio', 4],
      ['Magnésio', 4],
      ['Enxofre', 2]
    ],
    notes: [],
    prod: ['Cuaje', 'Maspic', 'Nutriboost', 'Super K', 'Super Mix', 'SuperAmin']
  },
  'Tomate': {
    foto: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_tomate.jpg',
    nut: [
      ['Potássio', 38],
      ['Nitrogênio', 24],
      ['Cálcio', 19],
      ['Fósforo', 10],
      ['Magnésio', 8]
    ],
    notes: [],
    prod: ['BloomFruit', 'Cuaje', 'Maspic', 'Renovasoil', 'Super K', 'Super Mix', 'SuperAmin']
  },
  'Uva': {
    foto: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1600&q=80&auto=format&fit=crop',
    prog: 'img/prog_uva.jpg',
    nut: [
      ['Potássio', 31],
      ['Cálcio', 25],
      ['Nitrogênio', 19],
      ['Fósforo', 9],
      ['Magnésio', 9]
    ],
    notes: [
      ['Enxofre', 'Média']
    ],
    prod: ['BloomFruit', 'Cuaje', 'Filter Max', 'Levante', 'Super K', 'Super Mix', 'SuperAmin', 'Ziman']
  }
};
const PRODUCTS = {
  "AlephAminol": Object.assign({
    chars: [
      ['Matérias-primas', 'Hidrolisado de proteína, Ácido fosfórico, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '6%'],
      ['Pentóxido de fósforo (P₂O₅) solúvel', '1%'],
      ['pH', '5'],
      ['As-L', '7']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · L-aminoácidos",
      "en": "Mixed mineral fertilizer · L-amino acids",
      "es": "Fertilizante mineral mixto · L-aminoácidos"
    },
    "desc": {
      "pt": "Fertilizante mineral misto à base de L-aminoácidos de dupla hidrólise enzimática, processo que garante aminoácidos de maior pureza.",
      "en": "Mixed mineral fertilizer based on double enzymatic-hydrolysis L-amino acids, a process that ensures higher-purity amino acids.",
      "es": "Fertilizante mineral mixto a base de L-aminoácidos de doble hidrólisis enzimática, proceso que garantiza aminoácidos de mayor pureza."
    },
    "benef": {
      "pt": ["Compatível com a maioria dos herbicidas", "Melhora a resposta do cultivo ao estresse", "Efeito quelatizante, melhora o transporte de nutrientes", "Reduz a tensão superficial e aumenta a penetração dos fitossanitários"],
      "en": ["Compatible with most herbicides", "Improves the crop response to stress", "Chelating effect, improves nutrient transport", "Reduces surface tension and increases penetration of crop-protection products"],
      "es": ["Compatible con la mayoría de los herbicidas", "Mejora la respuesta del cultivo al estrés", "Efecto quelatante, mejora el transporte de nutrientes", "Reduce la tensión superficial y aumenta la penetración de los fitosanitarios"]
    }
  }),
  "BestCopper": Object.assign({
    chars: [
      ['Matérias-primas', 'Aminoácido, Sulfato de Cobre, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Enxofre (S)', '2,2%'],
      ['Cobre (Cu)', '5%'],
      ['Carbono orgânico', '14%']
    ]
  }, {
    "kind": {
      "pt": "Ativador vegetal · organo-mineral",
      "en": "Plant activator · organo-mineral",
      "es": "Activador vegetal · organo-mineral"
    },
    "desc": {
      "pt": "Fertilizante organo-mineral complexado com carboidratos e antioxidantes de origem natural, que melhoram a absorção e o sistema de cobre. Como fonte de cobre, potencializa a respiração e a fotossíntese e ativa mecanismos de autodefesa da planta (biossíntese de polifenóis e fitoalexinas).",
      "en": "Organo-mineral fertilizer complexed with carbohydrates and natural antioxidants that improve copper uptake and its system. As a copper source, it boosts respiration and photosynthesis and activates the plant self-defense mechanisms (biosynthesis of polyphenols and phytoalexins).",
      "es": "Fertilizante organo-mineral complejado con carbohidratos y antioxidantes de origen natural, que mejoran la absorción y el sistema del cobre. Como fuente de cobre, potencia la respiración y la fotosíntesis y activa mecanismos de autodefensa de la planta (biosíntesis de polifenoles y fitoalexinas)."
    },
    "benef": {
      "pt": ["Melhora o estado fitossanitário do cultivo", "Não mancha e não deixa resíduos", "Efeito de choque rápido e duradouro, eficaz na proteção de cultivos"],
      "en": ["Improves the crop health status", "Does not stain or leave residue", "Fast and long-lasting shock effect, effective in protecting crops"],
      "es": ["Mejora el estado fitosanitario del cultivo", "No mancha ni deja residuos", "Efecto de choque rápido y duradero, eficaz en la protección de cultivos"]
    }
  }),
  "Flor Xtend": Object.assign({
    chars: [
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Pós-colheita (haste)']
    ],
    formul: []
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · pós-colheita de flores",
      "en": "Mixed mineral fertilizer · cut-flower post-harvest",
      "es": "Fertilizante mineral mixto · poscosecha de flores"
    },
    "desc": {
      "pt": "Fertilizante sistêmico que atinge rapidamente as extremidades da flor, dobrando a vida comercial útil. Retarda o envelhecimento inibindo a biossíntese de etileno e bloqueando seu receptor.",
      "en": "Systemic fertilizer that quickly reaches the flower ends, doubling the useful commercial life. It slows aging by inhibiting ethylene biosynthesis and blocking its receptor.",
      "es": "Fertilizante sistémico que alcanza rápidamente los extremos de la flor, duplicando la vida comercial útil. Retarda el envejecimiento inhibiendo la biosíntesis de etileno y bloqueando su receptor."
    },
    "benef": {
      "pt": ["Livre de compostos tóxicos (prata, alumínio)", "Maior eficiência como retardante de senescência", "Não mancha a flor, a haste ou a água", "Estimula a abertura uniforme da flor"],
      "en": ["Free of toxic compounds (silver, aluminum)", "Greater efficiency as a senescence retardant", "Does not stain the flower, the stem or the water", "Stimulates uniform flower opening"],
      "es": ["Libre de compuestos tóxicos (plata, aluminio)", "Mayor eficiencia como retardante de senescencia", "No mancha la flor, el tallo ni el agua", "Estimula la apertura uniforme de la flor"]
    }
  }),
  "Maspic": Object.assign({
    chars: [
      ['Matérias-primas', 'Ácido fosforoso, Hidróxido de potássio, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Pentóxido de fósforo (P₂O₅) solúvel', '71%'],
      ['Óxido de Potássio (K₂O)', '8%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · fósforo estabilizado",
      "en": "Mixed mineral fertilizer · stabilized phosphorus",
      "es": "Fertilizante mineral mixto · fósforo estabilizado"
    },
    "desc": {
      "pt": "À base de espécies ativas, estabilizadas e reduzidas de fósforo. Atua como antifúngico e induz defesas naturais na planta contra diversos patógenos, de forma sistêmica.",
      "en": "Based on active, stabilized and reduced phosphorus species. It acts as an antifungal and systemically induces natural plant defenses against various pathogens.",
      "es": "A base de especies activas, estabilizadas y reducidas de fósforo. Actúa como antifúngico e induce defensas naturales en la planta contra diversos patógenos, de forma sistémica."
    },
    "benef": {
      "pt": ["Alta capacidade higroscópica, desfavorável ao patógeno", "Controla fungos de forma preventiva e curativa", "Melhora a sanidade do cultivo", "Efeito sistêmico e eficaz"],
      "en": ["High hygroscopic capacity, unfavorable to the pathogen", "Controls fungi preventively and curatively", "Improves crop health", "Systemic and effective"],
      "es": ["Alta capacidad higroscópica, desfavorable al patógeno", "Controla hongos de forma preventiva y curativa", "Mejora la sanidad del cultivo", "Efecto sistémico y eficaz"]
    }
  }),
  "Renovasoil": Object.assign({
    chars: [
      ['Matérias-primas', 'Lignosulfonatos, Hidróxido de Potássio, Leonardita'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Óxido de Potássio (K₂O)', '10%'],
      ['Carbono orgânico', '43%'],
      ['Ácidos húmicos', '30%'],
      ['Ácidos fúlvicos', '45%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante organo-mineral · condicionador de solo",
      "en": "Organo-mineral fertilizer · soil conditioner",
      "es": "Fertilizante organo-mineral · acondicionador de suelo"
    },
    "desc": {
      "pt": "Organo-mineral com elevado teor de ácidos húmicos e fúlvicos. Melhora a estrutura do solo, aumenta a retenção de água e favorece o desenvolvimento radicular. Contém o Complexo Prolife.",
      "en": "Organo-mineral with a high content of humic and fulvic acids. It improves soil structure, increases water retention and favors root development. Contains the Prolife Complex.",
      "es": "Organo-mineral con alto contenido de ácidos húmicos y fúlvicos. Mejora la estructura del suelo, aumenta la retención de agua y favorece el desarrollo radicular. Contiene el Complejo Prolife."
    },
    "benef": {
      "pt": ["Potencializa e ativa a flora microbiana", "Fornece Potássio, Cálcio e microelementos", "Acelera o desenvolvimento e a renovação radicular", "Aumenta a fertilidade e a retenção de nutrientes"],
      "en": ["Boosts and activates the microbial flora", "Provides potassium, calcium and microelements", "Speeds up root development and renewal", "Increases fertility and nutrient retention"],
      "es": ["Potencia y activa la flora microbiana", "Aporta potasio, calcio y microelementos", "Acelera el desarrollo y la renovación radicular", "Aumenta la fertilidad y la retención de nutrientes"]
    }
  }),
  "SuperAmin": Object.assign({
    chars: [
      ['Matérias-primas', 'Uréia, Proteínas hidrolisadas'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '10% a 13%'],
      ['Carbono orgânico', '50% a 52%'],
      ['Aminoácidos livres', '55% a 80%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante organo-mineral · bioestimulante",
      "en": "Organo-mineral fertilizer · biostimulant",
      "es": "Fertilizante organo-mineral · bioestimulante"
    },
    "desc": {
      "pt": "Organo-mineral de alta concentração em substâncias poliestimulantes. Favorece os processos fisiológicos, ativa o desenvolvimento foliar e radicular e melhora a relação com micro-organismos benéficos.",
      "en": "Organo-mineral highly concentrated in poly-stimulant substances. It favors physiological processes, activates foliar and root development and improves the relationship with beneficial microorganisms.",
      "es": "Organo-mineral de alta concentración en sustancias poliestimulantes. Favorece los procesos fisiológicos, activa el desarrollo foliar y radicular y mejora la relación con microorganismos benéficos."
    },
    "benef": {
      "pt": ["Orgânico e totalmente biodegradável", "Sem elementos sintéticos, sem risco de resíduos", "Aumenta a uniformidade e qualidade dos frutos", "Melhora a absorção de nutrientes e o crescimento radicular"],
      "en": ["Organic and fully biodegradable", "No synthetic elements, no residue risk", "Increases fruit uniformity and quality", "Improves nutrient uptake and root growth"],
      "es": ["Orgánico y totalmente biodegradable", "Sin elementos sintéticos, sin riesgo de residuos", "Aumenta la uniformidad y calidad de los frutos", "Mejora la absorción de nutrientes y el crecimiento radicular"]
    }
  }),
  "BloomFruit": Object.assign({
    chars: [
      ['Matérias-primas', 'Sulfato de Zinco, Cloreto de Cálcio, Aminoácidos, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Cálcio (Ca)', '4,2%'],
      ['Zinco (Zn)', '1%'],
      ['Aa-L', '6%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · pós-colheita",
      "en": "Mixed mineral fertilizer · post-harvest",
      "es": "Fertilizante mineral mixto · poscosecha"
    },
    "desc": {
      "pt": "Melhora a conservação e a manipulação dos frutos colhidos e retarda a oxidação. Efeito bioestimulante por aminoácidos livres e correção eficiente das carências de cálcio.",
      "en": "It improves the preservation and handling of harvested fruit and delays oxidation. Biostimulant effect from free amino acids and efficient correction of calcium deficiencies.",
      "es": "Mejora la conservación y la manipulación de los frutos cosechados y retarda la oxidación. Efecto bioestimulante por aminoácidos libres y corrección eficiente de las carencias de calcio."
    },
    "benef": {
      "pt": ["Ativa o crescimento por fornecimento energético", "Alta velocidade de absorção, menos perdas", "Reduz os processos oxidativos", "Melhora a qualidade dos frutos na pós-colheita"],
      "en": ["Activates growth through energy supply", "High absorption speed, fewer losses", "Reduces oxidative processes", "Improves fruit quality after harvest"],
      "es": ["Activa el crecimiento por aporte energético", "Alta velocidad de absorción, menos pérdidas", "Reduce los procesos oxidativos", "Mejora la calidad de los frutos en la poscosecha"]
    }
  }),
  "Cuaje": Object.assign({
    chars: [
      ['Matérias-primas', 'Fosfato monoamônico, Ácido bórico, Aminoácido, Molibdato de amônio'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '6%'],
      ['Pentóxido de fósforo (P₂O₅) solúvel', '30%'],
      ['Boro (B)', '8%'],
      ['Molibdênio (Mo)', '2%'],
      ['Aa-L', '2%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · floração e frutificação",
      "en": "Mixed mineral fertilizer · flowering and fruit set",
      "es": "Fertilizante mineral mixto · floración y cuajado"
    },
    "desc": {
      "pt": "Desenhado para favorecer a fecundação e o enchimento dos frutos. Fornece Fósforo, Boro e Molibdênio, essenciais nas fases de floração e fecundação.",
      "en": "Designed to favor fertilization and fruit filling. It provides phosphorus, boron and molybdenum, essential in the flowering and fertilization stages.",
      "es": "Diseñado para favorecer la fecundación y el llenado de los frutos. Aporta fósforo, boro y molibdeno, esenciales en las fases de floración y fecundación."
    },
    "benef": {
      "pt": ["Alta velocidade de absorção, menos perdas", "Ativa o crescimento por fornecimento energético", "Rápida translocação dos elementos na planta", "Otimiza a floração e o desenvolvimento dos frutos"],
      "en": ["High absorption speed, fewer losses", "Activates growth through energy supply", "Fast translocation of elements within the plant", "Optimizes flowering and fruit development"],
      "es": ["Alta velocidad de absorción, menos pérdidas", "Activa el crecimiento por aporte energético", "Rápida translocación de los elementos en la planta", "Optimiza la floración y el desarrollo de los frutos"]
    }
  }),
  "Kualité": Object.assign({
    chars: [
      ['Matérias-primas', 'Sulfato de Potássio, Hidrolisado de proteína, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '1%'],
      ['Óxido de Potássio (K₂O)', '20%'],
      ['Enxofre (S)', '17%'],
      ['Aa-L', '7%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · potássio premium",
      "en": "Mixed mineral fertilizer · premium potassium",
      "es": "Fertilizante mineral mixto · potasio premium"
    },
    "desc": {
      "pt": "Livre de nitratos, sulfatos, cloretos e carbonatos, complexado com biopeptídeos transportadores (CBT) para absorção e translocação imediatas nas fases de enchimento e maturação dos frutos.",
      "en": "Free of nitrates, sulfates, chlorides and carbonates, complexed with carrier biopeptides (CBT) for immediate uptake and translocation during fruit filling and ripening.",
      "es": "Libre de nitratos, sulfatos, cloruros y carbonatos, complejado con biopéptidos transportadores (CBT) para absorción y translocación inmediatas en las fases de llenado y maduración de los frutos."
    },
    "benef": {
      "pt": ["Absorção e translocação imediatas", "Aminoácidos que fornecem energia para metabolizar o Potássio", "Favorece a síntese de açúcares, ácidos e aromáticos"],
      "en": ["Immediate uptake and translocation", "Amino acids that provide energy to metabolize potassium", "Favors the synthesis of sugars, acids and aromatics"],
      "es": ["Absorción y translocación inmediatas", "Aminoácidos que aportan energía para metabolizar el potasio", "Favorece la síntesis de azúcares, ácidos y aromáticos"]
    }
  }),
  "Super K": Object.assign({
    chars: [
      ['Matérias-primas', 'Uréia, Carbonato de Potássio, Leonardita'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '3%'],
      ['Óxido de Potássio (K₂O)', '52%'],
      ['Carbono orgânico', '14%'],
      ['Ácidos húmicos', '5%'],
      ['Ácidos fúlvicos', '7%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral complexo · potássio",
      "en": "Complex mineral fertilizer · potassium",
      "es": "Fertilizante mineral complejo · potasio"
    },
    "desc": {
      "pt": "Elevada concentração de Potássio totalmente solúvel e assimilável, com ácidos húmicos e fúlvicos que garantem o aproveitamento e estimulam os processos fisiológicos.",
      "en": "High concentration of fully soluble and assimilable potassium, with humic and fulvic acids that ensure uptake and stimulate physiological processes.",
      "es": "Elevada concentración de potasio totalmente soluble y asimilable, con ácidos húmicos y fúlvicos que garantizan el aprovechamiento y estimulan los procesos fisiológicos."
    },
    "benef": {
      "pt": ["Alta concentração de Potássio", "Livre de cloretos", "Favorece maturação e qualidade dos frutos", "Absorção e translocação imediatas"],
      "en": ["High potassium concentration", "Chloride-free", "Favors fruit ripening and quality", "Immediate uptake and translocation"],
      "es": ["Alta concentración de potasio", "Libre de cloruros", "Favorece maduración y calidad de los frutos", "Absorción y translocación inmediatas"]
    }
  }),
  "Super Mix": Object.assign({
    chars: [
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Enxofre (S)', '8% a 11%'],
      ['Ferro (Fe)', '7% a 7,5%'],
      ['Manganês (Mn)', '3,3% a 4%'],
      ['Zinco (Zn)', '0,6% a 4%'],
      ['Boro (B)', '0,2% a 0,7%'],
      ['Cobre (Cu)', '0,2% a 0,5%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · micronutrientes",
      "en": "Mixed mineral fertilizer · micronutrients",
      "es": "Fertilizante mineral mixto · micronutrientes"
    },
    "desc": {
      "pt": "Complexado com microelementos para prevenir e corrigir deficiências, melhorando a fotossíntese e otimizando o uso do Nitrogênio ao longo do ciclo. Disponível também na versão Pro.",
      "en": "Complexed with microelements to prevent and correct deficiencies, improving photosynthesis and optimizing nitrogen use throughout the cycle. Also available in the Pro version.",
      "es": "Complejado con microelementos para prevenir y corregir deficiencias, mejorando la fotosíntesis y optimizando el uso del nitrógeno a lo largo del ciclo. Disponible también en la versión Pro."
    },
    "benef": {
      "pt": ["Protege os micronutrientes contra bloqueio no solo", "Quelatado por EDTA", "Complexado por lignosulfonato e substâncias húmicas", "Melhora a absorção dos micronutrientes"],
      "en": ["Protects micronutrients from lock-up in the soil", "Chelated by EDTA", "Complexed by lignosulfonate and humic substances", "Improves micronutrient uptake"],
      "es": ["Protege los micronutrientes contra el bloqueo en el suelo", "Quelatado por EDTA", "Complejado por lignosulfonato y sustancias húmicas", "Mejora la absorción de los micronutrientes"]
    }
  }),
  "Super Phos": Object.assign({
    chars: [
      ['Matérias-primas', 'MAP, Leonardita, Sulfato de Zinco, Nitrato de amônio'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via solo, foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '7%'],
      ['Pentóxido de fósforo (P₂O₅) solúvel', '21%'],
      ['Zinco (Zn)', '0,2%'],
      ['Carbono orgânico', '13%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante organo-mineral 7-21-00 · fósforo",
      "en": "Organo-mineral fertilizer 7-21-00 · phosphorus",
      "es": "Fertilizante organo-mineral 7-21-00 · fósforo"
    },
    "desc": {
      "pt": "Organo-mineral líquido de última geração para aporte de fósforo, complexado com ácidos orgânicos da Leonardita, disponibilizando mais de 80% do fósforo mesmo em solos adversos.",
      "en": "Latest-generation liquid organo-mineral for phosphorus supply, complexed with organic acids from Leonardite, making more than 80% of the phosphorus available even in adverse soils.",
      "es": "Organo-mineral líquido de última generación para aporte de fósforo, complejado con ácidos orgánicos de la Leonardita, disponibilizando más del 80% del fósforo incluso en suelos adversos."
    },
    "benef": {
      "pt": ["Melhora as condições físico-químicas do solo", "Aumenta a floração", "Incrementa a retenção de água", "Evita a formação de sais insolúveis"],
      "en": ["Improves the physical-chemical conditions of the soil", "Increases flowering", "Increases water retention", "Prevents the formation of insoluble salts"],
      "es": ["Mejora las condiciones físico-químicas del suelo", "Aumenta la floración", "Incrementa la retención de agua", "Evita la formación de sales insolubles"]
    }
  }),
  "Ziman": Object.assign({
    chars: [
      ['Matérias-primas', 'Sulfato de Zinco, Sulfato de Manganês, Aminoácidos, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar e fertirrigação']
    ],
    formul: [
      ['Nitrogênio (N)', '2%'],
      ['Enxofre (S)', '4%'],
      ['Manganês (Mn)', '4%'],
      ['Zinco (Zn)', '4%'],
      ['Aa-L', '8%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · Zinco e Manganês",
      "en": "Mixed mineral fertilizer · Zinc and Manganese",
      "es": "Fertilizante mineral mixto · Zinc y Manganeso"
    },
    "desc": {
      "pt": "Previne e corrige carências de Zinco e Manganês com absorção e mobilidade garantidas. Contém o complexo AlephLeaf, com efeito surfactante, penetrante e persistente.",
      "en": "Prevents and corrects zinc and manganese deficiencies with guaranteed uptake and mobility. Contains the AlephLeaf complex, with a surfactant, penetrating and persistent effect.",
      "es": "Previene y corrige carencias de zinc y manganeso con absorción y movilidad garantizadas. Contiene el complejo AlephLeaf, con efecto surfactante, penetrante y persistente."
    },
    "benef": {
      "pt": ["Ativa o crescimento por fornecimento energético", "Ajuda a superar estresse hídrico, nutricional e climático", "Correção eficaz de carências de Zn e Mn", "Efeito bioestimulante"],
      "en": ["Activates growth through energy supply", "Helps overcome water, nutritional and climatic stress", "Effective correction of Zn and Mn deficiencies", "Biostimulant effect"],
      "es": ["Activa el crecimiento por aporte energético", "Ayuda a superar el estrés hídrico, nutricional y climático", "Corrección eficaz de carencias de Zn y Mn", "Efecto bioestimulante"]
    }
  }),
  "AmoSulfate": Object.assign({
    chars: [
      ['Matérias-primas', 'Sulfato de Amônio'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via solo']
    ],
    formul: [
      ['Nitrogênio (N) total', '20%'],
      ['Enxofre (S)', '24%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral · nitrogênio e enxofre",
      "en": "Mineral fertilizer · nitrogen and sulfur",
      "es": "Fertilizante mineral · nitrógeno y azufre"
    },
    "desc": {
      "pt": "Sulfato de amônio adequado para todas as culturas. O íon amônio evita perdas de nitrogênio e o enxofre melhora a utilização do N e a disponibilidade de fósforo.",
      "en": "Ammonium sulfate suitable for all crops. The ammonium ion prevents nitrogen losses and sulfur improves N use and phosphorus availability.",
      "es": "Sulfato de amonio adecuado para todos los cultivos. El ion amonio evita pérdidas de nitrógeno y el azufre mejora la utilización del N y la disponibilidad de fósforo."
    },
    "benef": {
      "pt": ["Nitrogênio amoniacal incorporado com menor gasto de energia", "Enxofre em sulfato, prontamente disponível", "Sinergia N+S eleva a altura e a qualidade do rendimento", "100% solúvel em água"],
      "en": ["Ammoniacal nitrogen incorporated with lower energy cost", "Sulfur in sulfate form, readily available", "N+S synergy raises the height and quality of the yield", "100% water-soluble"],
      "es": ["Nitrógeno amoniacal incorporado con menor gasto de energía", "Azufre en sulfato, prontamente disponible", "Sinergia N+S eleva la altura y la calidad del rendimiento", "100% soluble en agua"]
    }
  }),
  "NPK Supreme": Object.assign({
    chars: [
      ['Matérias-primas', 'Colemanita, MAP, Sulfato de Potássio, Óxido de Zinco, Óxido de Magnésio, Sulfato de Amônio'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via solo']
    ],
    formul: [
      ['Nitrogênio (N)', '12% a 16%'],
      ['Pentóxido de fósforo (P₂O₅) total', '10% a 27%'],
      ['Potássio (K)', '7% a 18%'],
      ['Enxofre (S)', '9% a 15%']
    ]
  }, {
    "kind": {
      "pt": "Linha NPK · macronutrientes + micros",
      "en": "NPK line · macronutrients + micros",
      "es": "Línea NPK · macronutrientes + micros"
    },
    "desc": {
      "pt": "Linha de fertilizantes NPK com Enxofre e Magnésio, além de micros (Zn, B, Mn, Fe). O Potássio à base de sulfato melhora a nutrição em toda a vegetação. Formulações 12:12:17, 12:11:18 e 16:27:07.",
      "en": "A line of NPK fertilizers with sulfur and magnesium, plus micros (Zn, B, Mn, Fe). The sulfate-based potassium improves nutrition throughout the vegetation. Formulations 12:12:17, 12:11:18 and 16:27:07.",
      "es": "Línea de fertilizantes NPK con azufre y magnesio, además de micros (Zn, B, Mn, Fe). El potasio a base de sulfato mejora la nutrición en toda la vegetación. Formulaciones 12:12:17, 12:11:18 y 16:27:07."
    },
    "benef": {
      "pt": ["Aporte equilibrado (cada grânulo com os mesmos elementos)", "Microelementos que afetam os principais processos fisiológicos", "Impacto direto na quantidade e qualidade do rendimento"],
      "en": ["Balanced supply (each granule with the same elements)", "Microelements that affect the main physiological processes", "Direct impact on the quantity and quality of the yield"],
      "es": ["Aporte equilibrado (cada gránulo con los mismos elementos)", "Microelementos que afectan los principales procesos fisiológicos", "Impacto directo en la cantidad y calidad del rendimiento"]
    }
  }),
  "Nutriboost": Object.assign({
    chars: [
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via solo (localizada)'],
      ['Dose', '25 a 50 kg/ha']
    ],
    formul: [
      ['Nitrogênio (N) total', '10%'],
      ['Pentóxido de fósforo (P₂O₅) total', '45%'],
      ['Pentóxido de fósforo (P₂O₅) solúvel', '40%'],
      ['Enxofre (S)', '5%'],
      ['Zinco (Zn) total', '1%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante micro granulado · plantio localizado",
      "en": "Micro-granulated fertilizer · localized planting",
      "es": "Fertilizante micro granulado · siembra localizada"
    },
    "desc": {
      "pt": "Micro granulado (0,5 a 1,2 mm) aplicado junto às sementes e mudas. Sua tecnologia protege o fósforo do bloqueio por alumínio, ferro e cálcio no solo.",
      "en": "Micro-granulated (0.5 to 1.2 mm) applied together with seeds and seedlings. Its technology protects phosphorus from lock-up by aluminum, iron and calcium in the soil.",
      "es": "Micro granulado (0,5 a 1,2 mm) aplicado junto a las semillas y plántulas. Su tecnología protege el fósforo del bloqueo por aluminio, hierro y calcio en el suelo."
    },
    "benef": {
      "pt": ["Sistema radicular profundo e ramificado", "Melhor crescimento inicial das plantas jovens", "Maior resistência a condições adversas", "Melhor uso dos nutrientes"],
      "en": ["Deep and branched root system", "Better early growth of young plants", "Greater resistance to adverse conditions", "Better use of nutrients"],
      "es": ["Sistema radicular profundo y ramificado", "Mejor crecimiento inicial de las plantas jóvenes", "Mayor resistencia a condiciones adversas", "Mejor uso de los nutrientes"]
    }
  }),
  "Ciana +": Object.assign({
    chars: [
      ['Matérias-primas', 'Cianamida de Cálcio'],
      ['Natureza física', 'Sólido'],
      ['Aplicação principal', 'Via solo']
    ],
    formul: [
      ['Nitrogênio (N)', '19%'],
      ['Cálcio (Ca)', '35%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral · cianamida de cálcio",
      "en": "Mineral fertilizer · calcium cyanamide",
      "es": "Fertilizante mineral · cianamida de calcio"
    },
    "desc": {
      "pt": "Controla fungos e plantas daninhas no solo e favorece o crescimento equilibrado. A liberação lenta de nitrogênio e cálcio solúvel entrega a medida certa conforme a necessidade da planta.",
      "en": "It controls fungi and weeds in the soil and favors balanced growth. The slow release of nitrogen and soluble calcium delivers the right amount according to the plant needs.",
      "es": "Controla hongos y malezas en el suelo y favorece el crecimiento equilibrado. La liberación lenta de nitrógeno y calcio soluble entrega la medida justa según la necesidad de la planta."
    },
    "benef": {
      "pt": ["Reforça o tecido celular da planta", "Aumenta a vida útil das colheitas", "Previne patógenos no solo", "Menos plantas daninhas"],
      "en": ["Strengthens the plant cell tissue", "Increases the shelf life of harvests", "Prevents pathogens in the soil", "Fewer weeds"],
      "es": ["Refuerza el tejido celular de la planta", "Aumenta la vida útil de las cosechas", "Previene patógenos en el suelo", "Menos malezas"]
    }
  }),
  "Filter Max": Object.assign({
    chars: [
      ['Matérias-primas', 'Sulfato Ferroso, Sulfato de Zinco, Glicerina, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar']
    ],
    formul: [
      ['Ferro (Fe)', '0,5%'],
      ['Zinco (Zn)', '1,5%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · proteção climática",
      "en": "Mixed mineral fertilizer · climate protection",
      "es": "Fertilizante mineral mixto · protección climática"
    },
    "desc": {
      "pt": "Com oligossacarídeos e triglicerídeos de cadeia curta que absorvem radiação solar e hidratam os tecidos. Reduz queimaduras e ajuda a reparar danos de granizo e microfissuras.",
      "en": "With oligosaccharides and short-chain triglycerides that absorb solar radiation and hydrate the tissues. It reduces sunburn and helps repair hail damage and microcracks.",
      "es": "Con oligosacáridos y triglicéridos de cadena corta que absorben radiación solar e hidratan los tejidos. Reduce quemaduras y ayuda a reparar daños de granizo y microfisuras."
    },
    "benef": {
      "pt": ["Resistência a condições climáticas adversas", "Incolor, orgânico e não tóxico", "Não mancha os frutos", "Película transparente sobre os tecidos"],
      "en": ["Resistance to adverse weather conditions", "Colorless, organic and non-toxic", "Does not stain the fruit", "Transparent film over the tissues"],
      "es": ["Resistencia a condiciones climáticas adversas", "Incoloro, orgánico y no tóxico", "No mancha los frutos", "Película transparente sobre los tejidos"]
    }
  }),
  "Levante": Object.assign({
    chars: [
      ['Matérias-primas', 'Nitrato de amônio e Cálcio, Uréia, Água'],
      ['Natureza física', 'Líquido'],
      ['Aplicação principal', 'Via foliar']
    ],
    formul: [
      ['Nitrogênio (N)', '4%'],
      ['Cálcio (Ca)', '11%']
    ]
  }, {
    "kind": {
      "pt": "Fertilizante mineral misto · quebra de dormência",
      "en": "Mixed mineral fertilizer · dormancy break",
      "es": "Fertilizante mineral mixto · ruptura de dormancia"
    },
    "desc": {
      "pt": "Bioestimulador capaz de reduzir a dormência de frutíferas. Acelera os processos metabólicos e sincroniza o despertar dos botões, aumentando a brotação e a produção de frutos.",
      "en": "A biostimulant able to reduce dormancy in fruit trees. It speeds up metabolic processes and synchronizes bud break, increasing sprouting and fruit production.",
      "es": "Bioestimulador capaz de reducir la dormancia de los frutales. Acelera los procesos metabólicos y sincroniza el despertar de las yemas, aumentando la brotación y la producción de frutos."
    },
    "benef": {
      "pt": ["Quebra de dormência", "Favorece o amadurecimento e a uniformidade", "Sincroniza o despertar dos botões florais", "Não causa fitotoxidade"],
      "en": ["Dormancy break", "Favors ripening and uniformity", "Synchronizes the awakening of flower buds", "Does not cause phytotoxicity"],
      "es": ["Ruptura de dormancia", "Favorece la maduración y la uniformidad", "Sincroniza el despertar de las yemas florales", "No causa fitotoxicidad"]
    }
  })
};
const LVL = {
  1: ['Baixa', '33%'],
  2: ['Média', '66%'],
  3: ['Elevada', '100%']
};

function donut(nut) {
  const r = 72,
    C = 2 * Math.PI * r,
    sw = 18,
    gap = 5;
  const tot = nut.reduce((s, x) => s + x[1], 0) || 100;
  let off = 0;
  const track = `<circle cx="95" cy="95" r="${r}" fill="none" stroke="rgba(20,50,30,.07)" stroke-width="${sw}"></circle>`;
  const segs = nut.map(n => {
    const len = C * n[1] / tot;
    const draw = Math.max(len - gap, 2);
    const s = `<circle class="seg" cx="95" cy="95" r="${r}" fill="none" stroke="${NCOL[n[0]]||'#7a8a7f'}" stroke-width="${sw}" stroke-dasharray="${draw} ${C-draw}" stroke-dashoffset="${-off}"></circle>`;
    off += len;
    return s;
  }).join('');
  return `<div class="donut"><svg viewBox="0 0 190 190" width="190" height="190">${track}${segs}</svg><div class="mid"><b>NPK+</b><span>${MT[L()].donut}</span></div></div>`;
}

function legend(nut, notes) {
  var l = L();
  return `<div class="legend">${nut.map(n=>`<div class="li"><span class="sw" style="background:${NCOL[n[0]]||'#7a8a7f'}"></span>${NUTR[l][n[0]]||n[0]}<b>${n[1]}%</b></div>`).join('')}${(notes||[]).map(n=>`<div class="li"><span class="sw" style="background:#cbd5cd"></span>${NUTR[l][n[0]]||n[0]}<b style="color:var(--earth)">${QUAL[l][n[1]]||n[1]}</b></div>`).join('')}</div>`;
}

function openCrop(name) {
  const d = CROPS[name];
  let html;
  if (!d) {
    html = `<div class="m-hero"><span class="kick">Cultivo</span><h3>${name}</h3><p>Protocolo de nutrição Aleph Agro por fase de cultivo.</p></div>
    <div class="m-body"><div class="m-note">Estamos integrando os dados oficiais deste cultivo (gráfico de extração de nutrientes, programa nutricional e produtos), como já está feito para o Morango. Envie o print da página deste cultivo ou libere o acesso ao site que eu completo.</div>
    <div class="m-cta" style="margin-top:20px"><button class="btn btn-primary" onclick="pickCrop('${name}')">Solicitar recomendação <span class="arw">→</span></button></div></div>`;
  } else {
    var l = L();
    var cn = (CROPNAME[l][name] || name);
    var t = MT[l];
    window.__openC = name;
    window.__openP = null;
    html = `<div class="m-hero mhero-photo" style="background-image:linear-gradient(150deg,rgba(18,58,36,.74),rgba(12,36,23,.92)),url('${d.foto}')"><span class="kick">${t.mck}</span><h3>${cn}</h3><p>${t.mci.replace('{n}',cn.toLowerCase())}</p></div>
    <div class="m-body">
      <div class="m-sec"><h4><span class="bar"></span>${t.hext}</h4><p class="m-sub">${t.sext}</p>
        <div class="chart-row">${donut(d.nut)}${legend(d.nut,d.notes)}</div></div>
      <div class="m-sec"><h4><span class="bar"></span>${t.hprog}</h4><p class="m-sub">${t.sprog}</p>
        <img class="prog-img" src="${d.prog}" alt="${t.palt.replace('{n}',cn)}" loading="lazy"></div>
      <div class="m-sec"><h4><span class="bar"></span>${t.hprod}</h4>
        <div class="chips">${d.prod.map(p=>`<span class="chip" data-product="${p}">${p}</span>`).join('')}</div></div>
      ${d.ativadores?`<div class="m-sec"><h4><span class="bar"></span>${t.hativ}</h4><div class="chips">${d.ativadores.map(p=>`<span class="chip" data-product="${p}">${p}</span>`).join('')}</div></div>`:''}
      <div class="m-cta"><button class="btn btn-primary" onclick="pickCrop('${name}')">${t.ccta.replace('{n}',cn)} <span class="arw">→</span></button></div>
    </div>`;
  }
  showModal(html);
}

function openProduct(name) {
  const d = PRODUCTS[name];
  let html;
  if (!d) {
    html = `<div class="m-hero"><span class="kick">Produto</span><h3>${name}</h3><p>Fertilizante especial da linha Aleph Agro.</p></div>
    <div class="m-body"><div class="m-note">Ficha técnica em integração. Já está pronta para o BestCopper como modelo. Me envie os dados deste produto (descrição, formulação e benefícios) que eu completo no mesmo padrão.</div>
    <div class="m-cta" style="margin-top:20px"><button class="btn btn-primary" onclick="pickCrop('')">Solicitar cotação <span class="arw">→</span></button></div></div>`;
  } else {
    var l = L();
    var t = MT[l];
    window.__openP = name;
    window.__openC = null;
    html = `<div class="m-hero"><span class="kick">${d.kind[l]}</span><h3>${name}</h3><p>${d.desc[l]}</p></div>
    <div class="m-body">
      <div class="m-sec"><h4><span class="bar"></span>${t.hcar}</h4>
        <table class="spec">${d.chars.map(c=>`<tr><td>${(CHARK[l][c[0]]||c[0])}</td><td>${(l==='pt'?c[1]:(VOCAB[l][c[1]]||c[1]))}</td></tr>`).join('')}</table></div>
      ${d.formul.length?`<div class="m-sec"><h4><span class="bar"></span>${t.hform}</h4>
        <table class="spec">${d.formul.map(c=>`<tr><td>${(l==='pt'?c[0]:(ELEM[l][c[0]]||c[0]))}</td><td>${c[1]}</td></tr>`).join('')}</table></div>`:''}
      <div class="m-sec"><h4><span class="bar"></span>${t.hben}</h4>
        <ul class="blist">${d.benef[l].map(b=>`<li><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>${b}</li>`).join('')}</ul></div>
      <div class="m-sec"><div class="m-note">${DOSE[l]}</div></div>
      <div class="m-cta"><button class="btn btn-primary" onclick="pickCrop('')">${t.pcta} <span class="arw">→</span></button></div>
    </div>`;
  }
  showModal(html);
}

const modal = document.getElementById('modal');

function showModal(html) {
  document.getElementById('modalBody').innerHTML = html;
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
// clique delegado em chips/produtos dentro do modal
document.getElementById('modalBody').addEventListener('click', e => {
  const p = e.target.closest('[data-product]');
  if (p) {
    openProduct(p.dataset.product.trim());
  }
});

// wiring
document.querySelectorAll('.crop').forEach(c => c.addEventListener('click', () => openCrop(c.dataset.crop)));
document.querySelectorAll('.feat').forEach(f => f.addEventListener('click', e => {
  if (e.target.closest('.go')) return;
  openProduct(f.dataset.product);
}));
document.querySelectorAll('.feat .go[data-crop]').forEach(b => b.addEventListener('click', e => {
  e.stopPropagation();
  pickCrop(b.dataset.crop);
}));

// catálogo completo (gerado a partir das fichas reais)
const catGrid = document.getElementById('catalogGrid');

function renderCatalog() {
  if (!catGrid) return;
  var l = L();
  catGrid.innerHTML = Object.entries(PRODUCTS).map(([name, d]) => `<div class="cat-card reveal in" data-product="${name}"><h4>${name}</h4><span class="k">${d.kind[l]}</span><span class="arrow">${MT[l].catarrow}</span></div>`).join('');
  catGrid.querySelectorAll('.cat-card').forEach(c => {
    c.addEventListener('click', () => openProduct(c.dataset.product));
  });
}
window.renderCatalog = renderCatalog;
renderCatalog();

(function() {
  var I18N = {
    "pt": {
      "nav_tec": "Tecnologia",
      "nav_prod": "Produtos",
      "nav_cult": "Cultivos",
      "nav_sobre": "Sobre",
      "nav_grupo": "Grupo",
      "nav_contato": "Contato",
      "nav_cta": "Fale conosco",
      "hero_pill": "<span class=\"dot\"></span> Nutrição vegetal de alta tecnologia",
      "hero_h1": "A ciência que <span class=\"accent\">nutre</span> a planta e a tecnologia que <span class=\"accent\">multiplica</span> a colheita.",
      "hero_p": "A Aleph Agro importa e distribui fertilizantes especiais com tecnologia patenteada e formulações específicas para cada cultivo, clima e solo, sempre com foco em produtividade e sustentabilidade.",
      "hero_b1": "Ver o catálogo <span class=\"arw\">→</span>",
      "hero_b2": "Nutrição por cultivo <span class=\"arw\">→</span>",
      "hero_s1": "cultivos com protocolo próprio",
      "hero_s2": "tecnologias patenteadas",
      "hero_s3": "continentes de pesquisa",
      "scrollcue": "role para explorar ↓",
      "pil_eye": "Por que a Aleph Agro",
      "pil_h2": "Três pilares que sustentam cada formulação",
      "pil_p": "Não vendemos apenas fertilizante. Entregamos nutrição pensada para render mais, com responsabilidade ambiental.",
      "pil1_t": "Tecnologia",
      "pil1_d": "Todos os produtos carregam tecnologias patenteadas e registradas, para estabilização de nutrientes, liberação no tempo certo e partículas de alta absorção que a planta realmente aproveita.",
      "pil2_t": "Qualidade",
      "pil2_d": "Investimento em centros de pesquisa próprios e ensaios de campo, com parcerias com prestigiadas universidades europeias, americanas e brasileiras.",
      "pil3_t": "Sustentabilidade",
      "pil3_d": "Agricultura eficiente com tecnologias que resultam em maior produtividade, alimentos mais saudáveis e menor impacto ao meio ambiente.",
      "tec_eye": "Tecnologias patenteadas",
      "tec_h2": "O que faz nossos produtos renderem mais",
      "tec_p": "Cada linha carrega tecnologias devidamente patenteadas e registradas. É a diferença entre nutrir e apenas adubar.",
      "tc1_h": "Nitrogênio estável, liberação no tempo certo",
      "tc1_p": "A molécula Mono Carbamide Dihydrogen Sulfate (MCDHS) estabiliza o nitrogênio e promove a liberação lenta (slow release), reduzindo perdas e prolongando a nutrição da planta ao longo do ciclo.",
      "tc2_h": "Gestão inteligente do fósforo",
      "tc2_p": "Tecnologias voltadas à disponibilidade e proteção do fósforo, garantindo que o nutriente chegue à planta em vez de se fixar no solo.",
      "tc3_h": "Vigor radicular e foliar",
      "tc3_p": "Micro e nano partículas para a adequada gestão do desenvolvimento das raízes e das folhas, desde a emergência até a produção.",
      "tc4_h": "Formulação sob medida",
      "tc4_p": "Blends específicos por cultivo, tipo de clima e solo, com a nutrição certa para cada etapa, não uma fórmula genérica.",
      "feat_eye": "Produtos em destaque",
      "feat_h2": "Carros-chefe da linha Aleph Agro",
      "feat_p": "Três soluções que resolvem os gargalos mais comuns da lavoura. Clique para ver a ficha técnica completa.",
      "feat1_cr": "Solo &amp; raízes",
      "feat1_sub": "Estrutura de solo e raízes",
      "feat1_p": "Organo-mineral com ácidos húmicos e fúlvicos que melhora o solo, retém água e acelera a renovação radicular.",
      "feat2_cr": "Frutos",
      "feat2_sub": "Potássio para maturação",
      "feat2_p": "Alta concentração de potássio solúvel, livre de cloretos, para calibre, cor, sabor e consistência dos frutos.",
      "feat3_cr": "Proteção",
      "feat3_sub": "Cobre e autodefesa da planta",
      "feat3_p": "Fonte de cobre que potencializa a fotossíntese e ativa os mecanismos naturais de defesa do cultivo.",
      "feat_go": "Solicitar cotação →",
      "cat_eye": "Catálogo completo",
      "cat_h2": "19 produtos para cada necessidade",
      "cat_p": "Clique em qualquer produto para ver a ficha técnica completa: descrição, características, formulação e benefícios.",
      "cul_eye": "Nutrição por cultivo",
      "cul_h2": "Encontre o protocolo da sua plantação",
      "cul_p": "Descubra a aplicação dos produtos Aleph Agro de acordo com as fases de cultivo. São 14 culturas com protocolo dedicado.",
      "res_eye": "Resultados no campo",
      "res_h2": "Quem aplica, colhe a diferença",
      "q1": "“Melhor aspecto do cultivo e maior calibre no ramo. Nota-se maior vitalidade na planta.”",
      "q1w": "<b>Luis R.</b>, Almería · Cultivo de Tomate",
      "q2": "“Maior forragem e longitude no ápice da planta, com diferença significativa em relação à testemunha.”",
      "q2w": "<b>José Antônio</b>, Almería · Cultivo de Pimentão",
      "q3": "“Ótima emergência e maior vigor na planta. Aplicarei novamente na próxima safra.”",
      "q3w": "<b>Manuel P.</b>, Málaga · Cultivo de Cebola",
      "sob_eye": "Sobre a Aleph Agro",
      "sob_h2": "Nutrição que contribui para o bem-estar da humanidade",
      "sob_p": "Nossa missão é entregar produtos, técnicas e tecnologias sustentáveis, ambiental e socialmente, para uma agricultura eficiente, próspera, produtiva e limpa.",
      "sob_c1": "Formulações específicas por cultivo, clima e solo",
      "sob_c2": "Tecnologias patenteadas e registradas",
      "sob_c3": "Pesquisa própria e parcerias universitárias globais",
      "sob_card_h": "Ciência por trás de cada gota",
      "sob_card_p": "Centros de pesquisa próprios, ensaios de campo e parcerias com universidades na Europa, nas Américas e no Brasil sustentam cada formulação que entregamos.",
      "sob_card_g": "Da lavoura ao laboratório, qualidade comprovada",
      "grp_eye": "Parte do Grupo Aleph",
      "grp_h2": "Uma cadeia completa, do fornecedor ao produtor",
      "grp_p": "A Aleph Agro é o braço de nutrição vegetal do Grupo Aleph, ao lado da Aleph Comex (trading e comércio exterior) e da AlephLog (logística internacional e despacho aduaneiro). Juntas, levam tecnologia do fornecedor ao produtor rural.",
      "con_eye": "Fale com um especialista",
      "con_h2": "Solicite uma cotação ou o catálogo completo",
      "con_p": "Conte qual é o seu cultivo e a fase da lavoura. Nossa equipe indica a formulação ideal e envia uma proposta sob medida.",
      "l_nome": "Nome",
      "l_tel": "Telefone / WhatsApp",
      "l_email": "E-mail",
      "l_cult": "Cultivo",
      "l_int": "Interesse",
      "l_msg": "Mensagem",
      "io1": "Cotação de produtos",
      "io2": "Catálogo completo",
      "io3": "Falar com agrônomo",
      "opt_outro": "Outro",
      "btn_send": "Enviar solicitação",
      "okmsg": "✓ Solicitação recebida! Este é um protótipo, nenhum dado foi enviado.",
      "foot_p": "Importação e distribuição de fertilizantes especiais e tecnologias de ponta para a nutrição vegetal.",
      "foot_nav": "Navegar",
      "foot_l1": "Tecnologia",
      "foot_l2": "Produtos",
      "foot_l3": "Cultivos",
      "foot_l4": "Sobre",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contato",
      "foot_contato2": "Contato",
      "foot_copy": "© 2026 Aleph Agro. Todos os direitos reservados.",
      "foot_proto": "Protótipo de referência · direção visual da marca",
      "ph_nome": "Seu nome",
      "ph_msg": "Descreva sua lavoura e o que precisa...",
      "cn_Alface": "Alface",
      "opt_Alface": "Alface",
      "cn_Banana": "Banana",
      "opt_Banana": "Banana",
      "cn_Batata": "Batata",
      "opt_Batata": "Batata",
      "cn_Café": "Café",
      "opt_Café": "Café",
      "cn_Cebola": "Cebola",
      "opt_Cebola": "Cebola",
      "cn_Cenoura": "Cenoura",
      "opt_Cenoura": "Cenoura",
      "cn_Feijão": "Feijão",
      "opt_Feijão": "Feijão",
      "cn_Manga": "Manga",
      "opt_Manga": "Manga",
      "cn_Milho": "Milho",
      "opt_Milho": "Milho",
      "cn_Morango": "Morango",
      "opt_Morango": "Morango",
      "cn_Pimenta": "Pimenta",
      "opt_Pimenta": "Pimenta",
      "cn_Soja": "Soja",
      "opt_Soja": "Soja",
      "cn_Tomate": "Tomate",
      "opt_Tomate": "Tomate",
      "cn_Uva": "Uva",
      "opt_Uva": "Uva",
      "ver_prot": "Ver protocolo →"
    },
    "en": {
      "nav_tec": "Technology",
      "nav_prod": "Products",
      "nav_cult": "Crops",
      "nav_sobre": "About",
      "nav_grupo": "Group",
      "nav_contato": "Contact",
      "nav_cta": "Contact us",
      "hero_pill": "<span class=\"dot\"></span> High-technology plant nutrition",
      "hero_h1": "The science that <span class=\"accent\">nourishes</span> the plant and the technology that <span class=\"accent\">multiplies</span> the harvest.",
      "hero_p": "Aleph Agro imports and distributes specialty fertilizers with patented technology and formulations tailored to each crop, climate and soil, always focused on productivity and sustainability.",
      "hero_b1": "View the catalog <span class=\"arw\">→</span>",
      "hero_b2": "Nutrition by crop <span class=\"arw\">→</span>",
      "hero_s1": "crops with a dedicated protocol",
      "hero_s2": "patented technologies",
      "hero_s3": "continents of research",
      "scrollcue": "scroll to explore ↓",
      "pil_eye": "Why Aleph Agro",
      "pil_h2": "Three pillars behind every formulation",
      "pil_p": "We do not just sell fertilizer. We deliver nutrition designed to yield more, with environmental responsibility.",
      "pil1_t": "Technology",
      "pil1_d": "All products carry patented and registered technologies for nutrient stabilization, release at the right time and high-absorption particles that the plant truly uses.",
      "pil2_t": "Quality",
      "pil2_d": "Investment in our own research centers and field trials, with partnerships with prestigious European, American and Brazilian universities.",
      "pil3_t": "Sustainability",
      "pil3_d": "Efficient agriculture with technologies that deliver higher productivity, healthier food and less environmental impact.",
      "tec_eye": "Patented technologies",
      "tec_h2": "What makes our products yield more",
      "tec_p": "Each line carries duly patented and registered technologies. It is the difference between nourishing and merely fertilizing.",
      "tc1_h": "Stable nitrogen, release at the right time",
      "tc1_p": "The Mono Carbamide Dihydrogen Sulfate (MCDHS) molecule stabilizes nitrogen and promotes slow release, reducing losses and extending plant nutrition throughout the cycle.",
      "tc2_h": "Smart phosphorus management",
      "tc2_p": "Technologies focused on phosphorus availability and protection, ensuring the nutrient reaches the plant instead of getting fixed in the soil.",
      "tc3_h": "Root and foliar vigor",
      "tc3_p": "Micro and nano particles for proper management of root and leaf development, from emergence to production.",
      "tc4_h": "Tailor-made formulation",
      "tc4_p": "Specific blends by crop, climate type and soil, with the right nutrition for each stage, not a generic formula.",
      "feat_eye": "Featured products",
      "feat_h2": "Flagships of the Aleph Agro line",
      "feat_p": "Three solutions that solve the most common bottlenecks in the field. Click to see the full technical sheet.",
      "feat1_cr": "Soil &amp; roots",
      "feat1_sub": "Soil and root structure",
      "feat1_p": "Organo-mineral with humic and fulvic acids that improves the soil, retains water and speeds up root renewal.",
      "feat2_cr": "Fruits",
      "feat2_sub": "Potassium for ripening",
      "feat2_p": "High concentration of soluble potassium, chloride-free, for fruit size, color, flavor and firmness.",
      "feat3_cr": "Protection",
      "feat3_sub": "Copper and the plant's self-defense",
      "feat3_p": "A copper source that boosts photosynthesis and activates the crop\\u2019s natural defense mechanisms.",
      "feat_go": "Request a quote →",
      "cat_eye": "Full catalog",
      "cat_h2": "19 products for every need",
      "cat_p": "Click any product to see the full technical sheet: description, characteristics, formulation and benefits.",
      "cul_eye": "Nutrition by crop",
      "cul_h2": "Find the protocol for your crop",
      "cul_p": "Discover how to apply Aleph Agro products according to the crop stages. 14 crops with a dedicated protocol.",
      "res_eye": "Results in the field",
      "res_h2": "Those who apply it harvest the difference",
      "q1": "“Better crop appearance and larger size on the branch. Greater vitality is noticeable in the plant.”",
      "q1w": "<b>Luis R.</b>, Almería · Tomato crop",
      "q2": "“More foliage and length at the plant apex, with a significant difference versus the control.”",
      "q2w": "<b>José Antônio</b>, Almería · Bell pepper crop",
      "q3": "“Great emergence and more vigor in the plant. I will apply it again next season.”",
      "q3w": "<b>Manuel P.</b>, Málaga · Onion crop",
      "sob_eye": "About Aleph Agro",
      "sob_h2": "Nutrition that contributes to the well-being of humanity",
      "sob_p": "Our mission is to deliver environmentally and socially sustainable products, techniques and technologies for an efficient, prosperous, productive and clean agriculture.",
      "sob_c1": "Formulations specific to crop, climate and soil",
      "sob_c2": "Patented and registered technologies",
      "sob_c3": "In-house research and global university partnerships",
      "sob_card_h": "Science behind every drop",
      "sob_card_p": "Our own research centers, field trials and partnerships with universities in Europe, the Americas and Brazil support every formulation we deliver.",
      "sob_card_g": "From field to lab, proven quality",
      "grp_eye": "Part of the Aleph Group",
      "grp_h2": "A complete chain, from supplier to grower",
      "grp_p": "Aleph Agro is the plant nutrition arm of the Aleph Group, alongside Aleph Comex (trading and foreign trade) and AlephLog (international logistics and customs clearance). Together, they bring technology from the supplier to the farmer.",
      "con_eye": "Talk to a specialist",
      "con_h2": "Request a quote or the full catalog",
      "con_p": "Tell us your crop and the stage of your field. Our team recommends the ideal formulation and sends a tailored proposal.",
      "l_nome": "Name",
      "l_tel": "Phone / WhatsApp",
      "l_email": "Email",
      "l_cult": "Crop",
      "l_int": "Interest",
      "l_msg": "Message",
      "io1": "Product quote",
      "io2": "Full catalog",
      "io3": "Talk to an agronomist",
      "opt_outro": "Other",
      "btn_send": "Send request",
      "okmsg": "✓ Request received! This is a prototype, no data was sent.",
      "foot_p": "Import and distribution of specialty fertilizers and cutting-edge technologies for plant nutrition.",
      "foot_nav": "Navigate",
      "foot_l1": "Technology",
      "foot_l2": "Products",
      "foot_l3": "Crops",
      "foot_l4": "About",
      "foot_grp": "Aleph Group",
      "foot_contato_link": "Contact",
      "foot_contato2": "Contact",
      "foot_copy": "© 2026 Aleph Agro. All rights reserved.",
      "foot_proto": "Reference prototype · brand visual direction",
      "ph_nome": "Your name",
      "ph_msg": "Describe your field and what you need...",
      "cn_Alface": "Lettuce",
      "opt_Alface": "Lettuce",
      "cn_Banana": "Banana",
      "opt_Banana": "Banana",
      "cn_Batata": "Potato",
      "opt_Batata": "Potato",
      "cn_Café": "Coffee",
      "opt_Café": "Coffee",
      "cn_Cebola": "Onion",
      "opt_Cebola": "Onion",
      "cn_Cenoura": "Carrot",
      "opt_Cenoura": "Carrot",
      "cn_Feijão": "Beans",
      "opt_Feijão": "Beans",
      "cn_Manga": "Mango",
      "opt_Manga": "Mango",
      "cn_Milho": "Corn",
      "opt_Milho": "Corn",
      "cn_Morango": "Strawberry",
      "opt_Morango": "Strawberry",
      "cn_Pimenta": "Pepper",
      "opt_Pimenta": "Pepper",
      "cn_Soja": "Soybean",
      "opt_Soja": "Soybean",
      "cn_Tomate": "Tomato",
      "opt_Tomate": "Tomato",
      "cn_Uva": "Grape",
      "opt_Uva": "Grape",
      "ver_prot": "See protocol →"
    },
    "es": {
      "nav_tec": "Tecnología",
      "nav_prod": "Productos",
      "nav_cult": "Cultivos",
      "nav_sobre": "Acerca",
      "nav_grupo": "Grupo",
      "nav_contato": "Contacto",
      "nav_cta": "Contáctanos",
      "hero_pill": "<span class=\"dot\"></span> Nutrición vegetal de alta tecnología",
      "hero_h1": "La ciencia que <span class=\"accent\">nutre</span> la planta y la tecnología que <span class=\"accent\">multiplica</span> la cosecha.",
      "hero_p": "Aleph Agro importa y distribuye fertilizantes especiales con tecnología patentada y formulaciones específicas para cada cultivo, clima y suelo, siempre con foco en productividad y sostenibilidad.",
      "hero_b1": "Ver el catálogo <span class=\"arw\">→</span>",
      "hero_b2": "Nutrición por cultivo <span class=\"arw\">→</span>",
      "hero_s1": "cultivos con protocolo propio",
      "hero_s2": "tecnologías patentadas",
      "hero_s3": "continentes de investigación",
      "scrollcue": "desliza para explorar ↓",
      "pil_eye": "Por qué Aleph Agro",
      "pil_h2": "Tres pilares que sustentan cada formulación",
      "pil_p": "No vendemos solo fertilizante. Entregamos nutrición pensada para rendir más, con responsabilidad ambiental.",
      "pil1_t": "Tecnología",
      "pil1_d": "Todos los productos llevan tecnologías patentadas y registradas, para estabilización de nutrientes, liberación en el momento adecuado y partículas de alta absorción que la planta realmente aprovecha.",
      "pil2_t": "Calidad",
      "pil2_d": "Inversión en centros de investigación propios y ensayos de campo, con alianzas con prestigiosas universidades europeas, americanas y brasileñas.",
      "pil3_t": "Sostenibilidad",
      "pil3_d": "Agricultura eficiente con tecnologías que resultan en mayor productividad, alimentos más saludables y menor impacto ambiental.",
      "tec_eye": "Tecnologías patentadas",
      "tec_h2": "Lo que hace que nuestros productos rindan más",
      "tec_p": "Cada línea lleva tecnologías debidamente patentadas y registradas. Es la diferencia entre nutrir y solo abonar.",
      "tc1_h": "Nitrógeno estable, liberación en el momento adecuado",
      "tc1_p": "La molécula Mono Carbamide Dihydrogen Sulfate (MCDHS) estabiliza el nitrógeno y promueve la liberación lenta (slow release), reduciendo pérdidas y prolongando la nutrición de la planta a lo largo del ciclo.",
      "tc2_h": "Gestión inteligente del fósforo",
      "tc2_p": "Tecnologías orientadas a la disponibilidad y protección del fósforo, garantizando que el nutriente llegue a la planta en lugar de fijarse en el suelo.",
      "tc3_h": "Vigor radicular y foliar",
      "tc3_p": "Micro y nano partículas para la adecuada gestión del desarrollo de las raíces y las hojas, desde la emergencia hasta la producción.",
      "tc4_h": "Formulación a medida",
      "tc4_p": "Blends específicos por cultivo, tipo de clima y suelo, con la nutrición adecuada para cada etapa, no una fórmula genérica.",
      "feat_eye": "Productos destacados",
      "feat_h2": "Buques insignia de la línea Aleph Agro",
      "feat_p": "Tres soluciones que resuelven los cuellos de botella más comunes del campo. Haga clic para ver la ficha técnica completa.",
      "feat1_cr": "Suelo y raíces",
      "feat1_sub": "Estructura de suelo y raíces",
      "feat1_p": "Organo-mineral con ácidos húmicos y fúlvicos que mejora el suelo, retiene agua y acelera la renovación radicular.",
      "feat2_cr": "Frutos",
      "feat2_sub": "Potasio para maduración",
      "feat2_p": "Alta concentración de potasio soluble, libre de cloruros, para calibre, color, sabor y consistencia de los frutos.",
      "feat3_cr": "Protección",
      "feat3_sub": "Cobre y autodefensa de la planta",
      "feat3_p": "Fuente de cobre que potencia la fotosíntesis y activa los mecanismos naturales de defensa del cultivo.",
      "feat_go": "Solicitar cotización →",
      "cat_eye": "Catálogo completo",
      "cat_h2": "19 productos para cada necesidad",
      "cat_p": "Haga clic en cualquier producto para ver la ficha técnica completa: descripción, características, formulación y beneficios.",
      "cul_eye": "Nutrición por cultivo",
      "cul_h2": "Encuentre el protocolo de su cultivo",
      "cul_p": "Descubra la aplicación de los productos Aleph Agro según las fases de cultivo. Son 14 cultivos con protocolo dedicado.",
      "res_eye": "Resultados en el campo",
      "res_h2": "Quien lo aplica, cosecha la diferencia",
      "q1": "“Mejor aspecto del cultivo y mayor calibre en la rama. Se nota mayor vitalidad en la planta.”",
      "q1w": "<b>Luis R.</b>, Almería · Cultivo de Tomate",
      "q2": "“Mayor follaje y longitud en el ápice de la planta, con diferencia significativa respecto al testigo.”",
      "q2w": "<b>José Antônio</b>, Almería · Cultivo de Pimiento",
      "q3": "“Óptima emergencia y mayor vigor en la planta. Aplicaré nuevamente en la próxima campaña.”",
      "q3w": "<b>Manuel P.</b>, Málaga · Cultivo de Cebolla",
      "sob_eye": "Acerca de Aleph Agro",
      "sob_h2": "Nutrición que contribuye al bienestar de la humanidad",
      "sob_p": "Nuestra misión es entregar productos, técnicas y tecnologías sostenibles, ambiental y socialmente, para una agricultura eficiente, próspera, productiva y limpia.",
      "sob_c1": "Formulaciones específicas por cultivo, clima y suelo",
      "sob_c2": "Tecnologías patentadas y registradas",
      "sob_c3": "Investigación propia y alianzas universitarias globales",
      "sob_card_h": "Ciencia detrás de cada gota",
      "sob_card_p": "Centros de investigación propios, ensayos de campo y alianzas con universidades en Europa, las Américas y Brasil sustentan cada formulación que entregamos.",
      "sob_card_g": "Del campo al laboratorio, calidad comprobada",
      "grp_eye": "Parte del Grupo Aleph",
      "grp_h2": "Una cadena completa, del proveedor al productor",
      "grp_p": "Aleph Agro es el brazo de nutrición vegetal del Grupo Aleph, junto a Aleph Comex (trading y comercio exterior) y AlephLog (logística internacional y despacho aduanero). Juntas, llevan tecnología del proveedor al productor rural.",
      "con_eye": "Habla con un especialista",
      "con_h2": "Solicite una cotización o el catálogo completo",
      "con_p": "Cuéntenos cuál es su cultivo y la fase del campo. Nuestro equipo indica la formulación ideal y envía una propuesta a medida.",
      "l_nome": "Nombre",
      "l_tel": "Teléfono / WhatsApp",
      "l_email": "Correo",
      "l_cult": "Cultivo",
      "l_int": "Interés",
      "l_msg": "Mensaje",
      "io1": "Cotización de productos",
      "io2": "Catálogo completo",
      "io3": "Hablar con un agrónomo",
      "opt_outro": "Otro",
      "btn_send": "Enviar solicitud",
      "okmsg": "✓ ¡Solicitud recibida! Esto es un prototipo, no se envió ningún dato.",
      "foot_p": "Importación y distribución de fertilizantes especiales y tecnologías de punta para la nutrición vegetal.",
      "foot_nav": "Navegar",
      "foot_l1": "Tecnología",
      "foot_l2": "Productos",
      "foot_l3": "Cultivos",
      "foot_l4": "Acerca",
      "foot_grp": "Grupo Aleph",
      "foot_contato_link": "Contacto",
      "foot_contato2": "Contacto",
      "foot_copy": "© 2026 Aleph Agro. Todos los derechos reservados.",
      "foot_proto": "Prototipo de referencia · dirección visual de la marca",
      "ph_nome": "Su nombre",
      "ph_msg": "Describa su cultivo y lo que necesita...",
      "cn_Alface": "Lechuga",
      "opt_Alface": "Lechuga",
      "cn_Banana": "Banana",
      "opt_Banana": "Banana",
      "cn_Batata": "Patata",
      "opt_Batata": "Patata",
      "cn_Café": "Café",
      "opt_Café": "Café",
      "cn_Cebola": "Cebolla",
      "opt_Cebola": "Cebolla",
      "cn_Cenoura": "Zanahoria",
      "opt_Cenoura": "Zanahoria",
      "cn_Feijão": "Frijol",
      "opt_Feijão": "Frijol",
      "cn_Manga": "Mango",
      "opt_Manga": "Mango",
      "cn_Milho": "Maíz",
      "opt_Milho": "Maíz",
      "cn_Morango": "Fresa",
      "opt_Morango": "Fresa",
      "cn_Pimenta": "Pimiento",
      "opt_Pimenta": "Pimiento",
      "cn_Soja": "Soja",
      "opt_Soja": "Soja",
      "cn_Tomate": "Tomate",
      "opt_Tomate": "Tomate",
      "cn_Uva": "Uva",
      "opt_Uva": "Uva",
      "ver_prot": "Ver protocolo →"
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
    if (window.renderCatalog) window.renderCatalog();
    var op = document.getElementById('modal');
    if (op && op.classList.contains('open')) {
      if (window.__openC && window.openCrop) window.openCrop(window.__openC);
      else if (window.__openP && window.openProduct) window.openProduct(window.__openP);
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
