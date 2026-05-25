# Jacaré Burguer — Cardápio Digital

Site de cardápio digital para a **Jacaré Burguer**, hamburgueria artesanal localizada em Pato Branco, PR.

## Sobre o projeto

Cardápio interativo construído com React (via CDN), sem necessidade de build ou servidor. Basta abrir o `index.html` no navegador.

## Funcionalidades

- Cardápio completo com categorias: Destaques, Smash, Artesanais, Combos, Acompanhamentos e Bebidas
- Filtro por categoria
- Modal com ingredientes de cada item
- Botão de pedido direto pelo WhatsApp
- Layout responsivo (mobile e desktop)
- Versão para impressão (`index-print.html`)

## Estrutura

```
project/
├── index.html          # Página principal
├── index-print.html    # Versão para impressão
├── styles.css          # Estilos
├── menu-data.js        # Dados do cardápio (produtos, preços, loja)
├── cardapio-app.jsx    # Componente React principal
├── assets/             # Fotos dos burgers e logo
└── uploads/            # Fotos adicionais
```

## Como usar

Abra o arquivo `project/index.html` diretamente no navegador. Não precisa de servidor, instalação ou build.

Para atualizar o cardápio, edite o arquivo `project/menu-data.js`.

## Informações da loja

| | |
|---|---|
| Endereço | Rua Carvalho Leme, 557 — Centro, Pato Branco, PR |
| WhatsApp | (46) 99911-3599 |
| Instagram | [@jacare_burger_](https://instagram.com/jacare_burger_) |
| Horário | Quarta a Domingo: 18:30 – 23:30 |
| Delivery | Grátis no centro · R$ 5,00 demais bairros |
| Pedido mínimo | R$ 25,00 |

## Tecnologias

- React 18 (CDN)
- Babel Standalone (JSX no browser)
- CSS puro
- Google Fonts (Anton + Outfit)
