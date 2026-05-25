// Cardápio Jacaré Burguer — dados de produtos
// Preços marcados (*) foram inferidos — revisar com o proprietário.
window.MENU_CATEGORIES = [
  { id: 'destaques', label: 'Destaques', icon: '★' },
  { id: 'smash',     label: 'Smash',     icon: '◢' },
  { id: 'artesanais',label: 'Artesanais',icon: '◆' },
  { id: 'combos',    label: 'Combos',    icon: '◉' },
  { id: 'acomp',     label: 'Acompanhamentos', icon: '▮' },
  { id: 'bebidas',   label: 'Bebidas',   icon: '◌' },
];

window.MENU_PRODUCTS = [
  // ─── ARTESANAIS (180g costela) ───
  {
    id: 'jaca-ignorante',
    cat: 'artesanais',
    name: 'Jaca Ignorante',
    tagline: 'O carro-chefe. Costela 180g e molho barbecue.',
    price: 32.90, // *
    img: 'assets/burger-ignorante.jpg',
    badge: 'TOP',
    ingredients: ['Pão brioche', 'Hambúrguer costela 180g', 'Alface americana', 'Cebola roxa', 'Molho barbecue', 'Maionese caseira'],
    featured: true,
  },
  {
    id: 'jaca-nervoso',
    cat: 'artesanais',
    name: 'Jaca Nervoso',
    tagline: 'Doritos, cheddar derretido e cebola caramelizada. Pra quem tá com fome de verdade.',
    price: 36.90, // *
    img: 'assets/burger-nervoso.jpg',
    badge: 'NOVO',
    ingredients: ['Pão brioche', 'Hambúrguer 180g', 'Queijo prato', 'Cheddar', 'Bacon', 'Doritos', 'Cebola caramelizada', 'Maionese caseira'],
    featured: true,
  },
  {
    id: 'sextou',
    cat: 'artesanais',
    name: 'Sextou no Jaca',
    tagline: 'Carne suculenta + queijo derretido + bacon crocante. A sexta pede.',
    price: 34.90, // *
    img: null,
    ingredients: ['Pão brioche', 'Hambúrguer 180g', 'Queijo cheddar', 'Bacon', 'Maionese da casa'],
  },
  {
    id: 'sabado',
    cat: 'artesanais',
    name: 'Sábado Brabo',
    tagline: 'Clássico bem-feito. Carne no ponto, cheddar e bacon.',
    price: 31.90, // *
    img: 'assets/burger-sabado-clean.jpg',
    ingredients: ['Pão gergelim', 'Hambúrguer 180g', 'Cheddar', 'Bacon', 'Alface', 'Tomate', 'Cebola roxa'],
  },

  // ─── SMASH (100g) ───
  {
    id: 'smash-bote',
    cat: 'smash',
    name: 'Smash Bote do Jaca',
    tagline: 'Smash duplo selado na chapa, queijo prato e bacon.',
    price: 26.90, // *
    img: 'assets/burger-smash-bote.jpg',
    badge: 'TOP',
    ingredients: ['Pão de leite com gergelim', 'Hambúrguer 100g', 'Queijo prato', 'Bacon', 'Cebola caramelizada', 'Maionese'],
    featured: true,
  },
  {
    id: 'smash-classico',
    cat: 'smash',
    name: 'Smash Clássico',
    tagline: 'Dois discos finos, queijo, picles e mostarda-maionese.',
    price: 22.90, // *
    img: null,
    ingredients: ['Pão de leite', 'Hambúrguer 100g', 'Queijo prato', 'Picles', 'Mostarda-maionese'],
  },
  {
    id: 'smash-cheddar',
    cat: 'smash',
    name: 'Smash Cheddar',
    tagline: 'Smash duplo afogado em cheddar cremoso da casa.',
    price: 24.90, // *
    img: null,
    ingredients: ['Pão de leite', '2x Hambúrguer 100g', 'Cheddar cremoso', 'Cebola crispy'],
  },

  // ─── COMBOS ───
  {
    id: 'combo-ignorante',
    cat: 'combos',
    name: 'Combo Jaca Ignorante',
    tagline: 'Jaca Ignorante + 100g batata frita + Coca lata 350ml.',
    price: 45.99,
    img: 'assets/burger-ignorante.jpg',
    badge: 'COMBO',
    ingredients: ['Jaca Ignorante', '100g batata frita', 'Coca-Cola lata 350ml'],
  },
  {
    id: 'combo-smash-bote',
    cat: 'combos',
    name: 'Combo Smash Bote',
    tagline: 'Smash Bote do Jaca + 100g batata + Coca lata.',
    price: 39.99,
    img: 'assets/burger-smash-bote.jpg',
    badge: 'COMBO',
    ingredients: ['Smash Bote do Jaca', '100g batata frita', 'Coca-Cola lata 350ml'],
  },
  {
    id: 'combo-nervoso',
    cat: 'combos',
    name: 'Combo Jaca Nervoso',
    tagline: 'Jaca Nervoso + 100g batata + Coca lata.',
    price: 49.99, // *
    img: 'assets/burger-nervoso.jpg',
    ingredients: ['Jaca Nervoso', '100g batata frita', 'Coca-Cola lata 350ml'],
  },

  // ─── ACOMPANHAMENTOS ───
  {
    id: 'batata-100',
    cat: 'acomp',
    name: 'Batata Frita 100g',
    tagline: 'Crocante por fora, fofinha por dentro.',
    price: 12.90, // *
    img: null,
    ingredients: ['Batata frita', 'Sal'],
  },
  {
    id: 'batata-200',
    cat: 'acomp',
    name: 'Batata Frita 200g',
    tagline: 'Pra dividir (ou não).',
    price: 19.90, // *
    img: null,
    ingredients: ['Batata frita', 'Sal'],
  },
  {
    id: 'batata-cheddar-bacon',
    cat: 'acomp',
    name: 'Batata Cheddar & Bacon',
    tagline: 'Batata 200g afogada em cheddar com bacon crocante.',
    price: 28.90, // *
    img: null,
    badge: 'TOP',
    ingredients: ['Batata frita 200g', 'Cheddar cremoso', 'Bacon em cubos', 'Cebolinha'],
  },
  {
    id: 'onion',
    cat: 'acomp',
    name: 'Onion Rings',
    tagline: 'Anéis de cebola empanados, 8 unidades.',
    price: 18.90, // *
    img: null,
    ingredients: ['Cebola', 'Empanado crocante', 'Molho da casa'],
  },

  // ─── BEBIDAS ───
  { id: 'coca-lata',   cat: 'bebidas', name: 'Coca-Cola Lata 350ml', price: 7.00,  img: null, ingredients: [] },
  { id: 'coca-zero',   cat: 'bebidas', name: 'Coca Zero Lata 350ml', price: 7.00,  img: null, ingredients: [] },
  { id: 'guarana',     cat: 'bebidas', name: 'Guaraná Lata 350ml',   price: 6.50,  img: null, ingredients: [] },
  { id: 'agua',        cat: 'bebidas', name: 'Água Mineral 500ml',   price: 4.00,  img: null, ingredients: [] },
  { id: 'suco-laranja',cat: 'bebidas', name: 'Suco de Laranja 300ml',price: 9.90,  img: null, ingredients: [] },
];

// Loja
window.STORE_INFO = {
  name: 'Jacaré Burguer',
  tagline: 'Sabor que impressiona desde 2025',
  address: 'Chopinzinho, PR',
  city: 'Chopinzinho, PR',
  whatsapp: '5546999113599',
  whatsappDisplay: '(46) 99911-3599',
  instagram: 'jacare_burger_',
  hours: [
    { day: 'Quarta a Domingo', time: '18:30 – 23:30' },
    { day: 'Segunda e Terça',  time: 'Fechado' },
  ],
  deliveryFee: 'GRÁTIS no centro · R$ 5,00 demais bairros',
  minOrder: 25,
};
