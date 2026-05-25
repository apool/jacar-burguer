// Cardápio Jacaré Burguer — App principal
const { useState, useMemo, useEffect, useRef } = React;

const CATEGORIES = window.MENU_CATEGORIES;
const PRODUCTS = window.MENU_PRODUCTS;
const STORE = window.STORE_INFO;

// ─────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────
const fmtBRL = (v) => v.toFixed(2).replace('.', ',');
const DELIVERY_FEE = 8;
const splitPrice = (v) => {
  const [r, c] = fmtBRL(v).split(',');
  return { reais: r, cents: c };
};

// First word as glyph for placeholder cards
const firstGlyph = (name) => {
  const w = name.split(/\s+/);
  return (w[0][0] + (w[1] ? w[1][0] : '')).toUpperCase();
};

// ─────────────────────────────────────────────
// Icons (inline SVG, no deps)
// ─────────────────────────────────────────────
const Icon = {
  Back: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M15 6l-6 6 6 6" />
    </svg>,

  Bag: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 7h12l-1 13H7L6 7Z" /><path d="M9 7a3 3 0 1 1 6 0" />
    </svg>,

  Plus: (p) =>
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>,

  Close: (p) =>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...p}>
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>,

  WhatsApp: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.92.55 3.72 1.5 5.24L2 22l4.96-1.6a9.89 9.89 0 0 0 5.08 1.4h.01c5.46 0 9.9-4.45 9.9-9.9 0-2.65-1.03-5.13-2.9-7-1.87-1.87-4.36-2.9-7.01-2.9Zm0 18.07c-1.51 0-2.99-.41-4.28-1.17l-.3-.18-3.18 1.02 1.03-3.1-.2-.32a8.16 8.16 0 0 1-1.27-4.41c0-4.53 3.69-8.22 8.22-8.22 2.19 0 4.26.86 5.81 2.41a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.22-8.24 8.22Zm4.5-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23a7.5 7.5 0 0 1-1.38-1.72c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31s-.86.85-.86 2.07c0 1.22.88 2.4 1 2.57.12.16 1.74 2.66 4.22 3.73.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.17.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>,

  Instagram: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>,

  Pin: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13Z" /><circle cx="12" cy="8.5" r="2.6" />
    </svg>,

  Clock: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>,

  Truck: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.7" /><circle cx="17" cy="18" r="1.7" />
    </svg>,

  Fire: (p) =>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 22s7-4 7-10c0-3.5-3-5-3-5s.5 2-1 3c0-3-3-7-3-7s-3 4-3 7c0 1.5-1.5 1-1.5-1 0 0-2 2-2 5 0 6 6.5 8 6.5 8Z" />
    </svg>

};

// ─────────────────────────────────────────────
// Cart hook
// ─────────────────────────────────────────────
function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jaca_cart') || '[]');
      return Array.isArray(saved) ? saved : [];
    } catch {return [];}
  });
  useEffect(() => {localStorage.setItem('jaca_cart', JSON.stringify(items));}, [items]);

  const add = (p) => setItems((x) => {
    const i = x.findIndex((it) => it.id === p.id);
    if (i >= 0) {
      const next = [...x];
      next[i] = { ...next[i], qty: next[i].qty + 1 };
      return next;
    }
    return [...x, { id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 }];
  });
  const dec = (id) => setItems((x) => x.flatMap((it) =>
  it.id === id ? it.qty > 1 ? [{ ...it, qty: it.qty - 1 }] : [] : [it]
  ));
  const remove = (id) => setItems((x) => x.filter((it) => it.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, it) => s + it.qty, 0);
  const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
  const qtyOf = (id) => items.find((it) => it.id === id)?.qty || 0;

  return { items, add, dec, remove, clear, count, subtotal, qtyOf };
}

// ─────────────────────────────────────────────
// Topbar
// ─────────────────────────────────────────────
function Topbar({ count, onCart }) {
  const goBack = () => {
    // Volta para a apresentação (index.html) ou histórico, se houver.
    if (window.history.length > 1 && document.referrer) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  };
  return (
    <header className="topbar">
      <button className="topbar__back" onClick={goBack} aria-label="Voltar" title="Voltar">
        <Icon.Back />
      </button>
      <div className="topbar__logo"><img src="assets/logo.jpg" alt="Jacaré Burguer logo" /></div>
      <div className="topbar__brand">
        <span className="topbar__name">Jacaré Burguer</span>
        <span className="topbar__status"><span className="dot"></span>Aberto · Entrega ~35 min</span>
      </div>
      <div className="topbar__spacer"></div>
      <nav className="topbar__nav">
        <a href="#cardapio">Cardápio</a>
        <a href="#combos">Combos</a>
        <a href="#info">Endereço</a>
      </nav>
      <button className="topbar__cart" onClick={onCart} aria-label="Abrir carrinho">
        <Icon.Bag />
        <span className="label">Pedido</span>
        <span className="count">{count}</span>
      </button>
    </header>);

}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="hero__kicker">Hoje tem Jacaré · Estamos abertos</span>
          <h1 className="hero__title">
            Chama que<br />
            <em>tá tendo</em>
          </h1>
          <p className="hero__sub">
            Hamburguer artesanal feito na hora, pão brioche fresquinho e <strong>carne de costela 180g</strong> selada na chapa. Peça pelo WhatsApp e receba quentinho.
          </p>
          <div className="hero__cta">
            <a className="btn-primary" href="#cardapio"><Icon.Fire /> Ver cardápio</a>
            <a className="btn-ghost" href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener"><Icon.WhatsApp /> WhatsApp</a>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-item">Entrega <strong>~35 min</strong></div>
            <div className="hero__meta-item">Taxa <strong>Grátis no centro</strong></div>
            <div className="hero__meta-item">Avaliação <strong>★ 4.9 · 1.2k+</strong></div>
          </div>
        </div>
        <div className="hero__visual">
          <img src="assets/mascot-hero.jpg" alt="Mascote do Jacaré Burguer com hambúrguer" />
          <div className="hero__sticker">
            <div>
              <div className="label"></div>
            </div>
            <div style={{ flex: 1 }}></div>
            <div className="price"><small></small></div>
          </div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────
// Promo Marquee
// ─────────────────────────────────────────────
function PromoStrip() {
  const items = ['Entrega Grátis no Centro', 'Combo Smash R$ 39,99', 'Quarta é dia de Combo', 'Hambúrguer Artesanal desde 2025', 'Carne de Costela 180g', 'Sabor que Impressiona'];
  const doubled = [...items, ...items];
  return (
    <div className="promo-strip">
      <div className="promo-strip__track">
        {doubled.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>);

}

// ─────────────────────────────────────────────
// Category Nav
// ─────────────────────────────────────────────
function CatNav({ active, onPick }) {
  return (
    <div className="catnav-wrap">
      <div className="catnav">
        {CATEGORIES.map((c) =>
        <button
          key={c.id}
          className={'catnav__btn' + (active === c.id ? ' active' : '')}
          onClick={() => onPick(c.id)}>
          
            <span className="icon">{c.icon}</span>{c.label}
          </button>
        )}
      </div>
    </div>);

}

// ─────────────────────────────────────────────
// Product Card
// ─────────────────────────────────────────────
function ProductCard({ p, qty, onAdd, onDec }) {
  const price = splitPrice(p.price);
  const badge = p.badge;
  const badgeCls = badge === 'NOVO' ? 'card__badge--new' : badge === 'COMBO' ? 'card__badge--combo' : '';

  return (
    <article className="card">
      <div className="card__img">
        {p.img ?
        <img src={p.img} alt={p.name} loading="lazy" /> :
        <div className="card__img--placeholder"><span>{firstGlyph(p.name)}</span></div>
        }
        {badge && <span className={`card__badge ${badgeCls}`}>{badge}</span>}
      </div>
      <div className="card__body">
        <h3 className="card__title">{p.name}</h3>
        {p.tagline && <p className="card__tagline">{p.tagline}</p>}
        {p.ingredients && p.ingredients.length > 0 &&
        <div className="card__ingredients">
            {p.ingredients.slice(0, 4).map((ing, i) => <span key={i}>{ing}</span>)}
            {p.ingredients.length > 4 && <span>+{p.ingredients.length - 4}</span>}
          </div>
        }
        <div className="card__foot">
          <div className="card__price">
            <small>R$</small>{price.reais}<span className="cents">,{price.cents}</span>
          </div>
          {qty > 0 ?
          <div className="qty">
              <button onClick={() => onDec(p.id)} aria-label="Diminuir">−</button>
              <span className="n">{qty}</span>
              <button onClick={() => onAdd(p)} aria-label="Aumentar">+</button>
            </div> :

          <button className="card__add" onClick={() => onAdd(p)}>
              <Icon.Plus /> Adicionar
            </button>
          }
        </div>
      </div>
    </article>);

}

// ─────────────────────────────────────────────
// Featured row (horizontal cards for Destaques)
// ─────────────────────────────────────────────
function FeaturedRow({ products, onAdd }) {
  return (
    <div className="featured-row">
      {products.map((p) =>
      <div key={p.id} className="featured-card">
          <span className="ribbon">★ Destaque</span>
          <div className="featured-card__img" style={{ backgroundImage: p.img ? `url(${p.img})` : 'none' }} />
          <div className="featured-card__body">
            <h3>{p.name}</h3>
            <p>{p.tagline}</p>
            <div className="featured-card__foot">
              <span className="price-tag">R$ {fmtBRL(p.price)}</span>
              <button className="card__add" onClick={() => onAdd(p)}><Icon.Plus /> Pedir</button>
            </div>
          </div>
        </div>
      )}
    </div>);

}

// ─────────────────────────────────────────────
// Menu sections
// ─────────────────────────────────────────────
function Menu({ active, cart }) {
  const byCat = useMemo(() => {
    const out = {};
    CATEGORIES.forEach((c) => out[c.id] = []);
    PRODUCTS.forEach((p) => {(out[p.cat] || (out[p.cat] = [])).push(p);});
    return out;
  }, []);

  const featured = PRODUCTS.filter((p) => p.featured);

  // Show all sections; "active" only scrolls/highlights
  return (
    <main className="menu" id="cardapio">
      {/* Destaques */}
      <section className="menu__section" id="sec-destaques">
        <div className="menu__sec-head">
          <h2>Destaques <span className="accent">do Jaca</span></h2>
          <span className="count">{featured.length} itens</span>
          <span className="desc">Os mais pedidos da casa</span>
        </div>
        <FeaturedRow products={featured} onAdd={cart.add} />
      </section>

      {/* Demais categorias */}
      {CATEGORIES.filter((c) => c.id !== 'destaques').map((c) => {
        const list = byCat[c.id] || [];
        if (list.length === 0) return null;
        return (
          <section key={c.id} className="menu__section" id={`sec-${c.id}`}>
            <div className="menu__sec-head">
              <h2>{c.label}</h2>
              <span className="count">{list.length} {list.length === 1 ? 'item' : 'itens'}</span>
            </div>
            <div className="grid">
              {list.map((p) =>
              <ProductCard key={p.id} p={p}
              qty={cart.qtyOf(p.id)}
              onAdd={cart.add}
              onDec={cart.dec} />

              )}
            </div>
          </section>);

      })}
    </main>);

}

// ─────────────────────────────────────────────
// Cart Drawer
// ─────────────────────────────────────────────
function CartDrawer({ open, onClose, cart }) {
  const { items, add, dec, remove, count, subtotal, clear } = cart;

  const [step, setStep] = useState('cart'); // 'cart' | 'checkout'
  const [form, setForm] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('jaca_checkout') || '{}');
      return {
        name: saved.name || '',
        mode: saved.mode || 'entrega',
        address: saved.address || '',
        reference: saved.reference || '',
        payment: saved.payment || 'pix'
      };
    } catch {
      return { name: '', mode: 'entrega', address: '', reference: '', payment: 'pix' };
    }
  });

  useEffect(() => {
    localStorage.setItem('jaca_checkout', JSON.stringify(form));
  }, [form]);

  // Reset to cart view whenever drawer reopens
  useEffect(() => { if (open) setStep('cart'); }, [open]);

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const paymentLabel = { pix: 'Pix', dinheiro: 'Dinheiro', cartao: 'Cartão na entrega' };
  const isDelivery = form.mode === 'entrega';
  // In the cart step the user hasn't picked yet, so show the fee assuming delivery.
  const deliveryFee = (step === 'checkout' && !isDelivery) ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const formValid =
    form.name.trim().length >= 2 &&
    (!isDelivery || form.address.trim().length >= 6);

  const sendWhatsApp = () => {
    if (items.length === 0 || !formValid) return;
    const lines = [
      '*🐊 PEDIDO JACARÉ BURGUER*',
      '',
      `*Cliente:* ${form.name.trim()}`,
      `*Modo:* ${isDelivery ? 'Entrega' : 'Retirada na loja'}`,
      ...(isDelivery ? [
        `*Endereço:* ${form.address.trim()}`,
        ...(form.reference.trim() ? [`*Referência:* ${form.reference.trim()}`] : [])
      ] : []),
      `*Pagamento:* ${paymentLabel[form.payment] || form.payment}`,
      '',
      '*Itens:*',
      ...items.map((it) => `• ${it.qty}x ${it.name} — R$ ${fmtBRL(it.qty * it.price)}`),
      '',
      `*Subtotal:* R$ ${fmtBRL(subtotal)}`,
      `*Taxa de entrega:* ${isDelivery ? `R$ ${fmtBRL(DELIVERY_FEE)}` : 'sem taxa (retirada)'}`,
      `*Total:* R$ ${fmtBRL(total)}`
    ];

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${STORE.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <>
      <div className={'cart-overlay' + (open ? ' open' : '')} onClick={onClose} />
      <aside className={'cart-drawer' + (open ? ' open' : '')} aria-hidden={!open}>
        <div className="cart-head">
          {step === 'checkout' && (
            <button className="cart-back" onClick={() => setStep('cart')} aria-label="Voltar">←</button>
          )}
          <h3>
            {step === 'cart' ? <>Seu <span className="accent">pedido</span></> : <>Dados pra <span className="accent">finalizar</span></>}
          </h3>
          <button className="cart-close" onClick={onClose} aria-label="Fechar"><Icon.Close /></button>
        </div>

        {step === 'cart' && (
        <div className="cart-body">
          {items.length === 0 ?
          <div className="cart-empty">
              <div className="glyph">🐊</div>
              <p>Seu carrinho tá vazio. Bora escolher um lanche que vale a fome.</p>
            </div> :

          items.map((it) =>
          <div key={it.id} className="cart-item">
                <div className="cart-item__thumb" style={{ backgroundImage: it.img ? `url(${it.img})` : 'none' }}>
                  {!it.img && firstGlyph(it.name)}
                </div>
                <div className="cart-item__info">
                  <span className="cart-item__name">{it.name}</span>
                  <span className="cart-item__price">
                    R$ {fmtBRL(it.price)} · <strong>R$ {fmtBRL(it.price * it.qty)}</strong>
                  </span>
                </div>
                <div className="cart-item__ctrls">
                  <div className="qty">
                    <button onClick={() => dec(it.id)}>−</button>
                    <span className="n">{it.qty}</span>
                    <button onClick={() => add(it)}>+</button>
                  </div>
                  <button className="cart-item__remove" onClick={() => remove(it.id)}>remover</button>
                </div>
              </div>
          )
          }
        </div>
        )}

        {step === 'checkout' && (
          <div className="cart-body checkout-body">
            <label className="field">
              <span className="field__label">Seu nome</span>
              <input
                className="field__input"
                type="text"
                placeholder="Ex.: Maria da Silva"
                value={form.name}
                onChange={setField('name')}
                autoFocus />
            </label>

            <div className="field">
              <span className="field__label">Como prefere receber?</span>
              <div className="mode-toggle" role="radiogroup" aria-label="Modo de entrega">
                <button
                  type="button"
                  role="radio"
                  aria-checked={form.mode === 'entrega'}
                  className={'mode-toggle__btn' + (form.mode === 'entrega' ? ' active' : '')}
                  onClick={() => setForm((f) => ({ ...f, mode: 'entrega' }))}>
                  <span className="mode-toggle__title">Entrega</span>
                  <span className="mode-toggle__sub">recebe na porta</span>
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={form.mode === 'retirada'}
                  className={'mode-toggle__btn' + (form.mode === 'retirada' ? ' active' : '')}
                  onClick={() => setForm((f) => ({ ...f, mode: 'retirada' }))}>
                  <span className="mode-toggle__title">Retirada</span>
                  <span className="mode-toggle__sub">busca na loja</span>
                </button>
              </div>
            </div>

            {isDelivery ? (
              <>
                <label className="field">
                  <span className="field__label">Endereço de entrega</span>
                  <input
                    className="field__input"
                    type="text"
                    placeholder="Rua, número, bairro"
                    value={form.address}
                    onChange={setField('address')} />
                </label>
                <label className="field">
                  <span className="field__label">Complemento / referência <span className="field__hint">(opcional)</span></span>
                  <input
                    className="field__input"
                    type="text"
                    placeholder="Apto 12, próximo à praça…"
                    value={form.reference}
                    onChange={setField('reference')} />
                </label>
              </>
            ) : (
              <div className="pickup-card">
                <div className="pickup-card__icon"><Icon.Pin /></div>
                <div>
                  <div className="pickup-card__title">Retirada no balcão</div>
                  <div className="pickup-card__addr">{STORE.address}</div>
                  <div className="pickup-card__hint">Avisamos no WhatsApp quando estiver pronto.</div>
                </div>
              </div>
            )}

            <div className="field">
              <span className="field__label">Forma de pagamento</span>
              <div className="pay-row">
                {[
                  { v: 'pix', label: 'Pix' },
                  { v: 'dinheiro', label: 'Dinheiro' },
                  { v: 'cartao', label: 'Cartão' }
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    className={'pay-chip' + (form.payment === opt.v ? ' active' : '')}
                    onClick={() => setForm((f) => ({ ...f, payment: opt.v }))}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="cart-foot">
          <div className="cart-row">
            <span>Subtotal ({count} {count === 1 ? 'item' : 'itens'})</span>
            <span>R$ {fmtBRL(subtotal)}</span>
          </div>
          <div className="cart-row">
            <span>Taxa de entrega{step === 'cart' ? <small className="row-hint"> · entrega</small> : null}</span>
            <span>{step === 'checkout' && !isDelivery ? 'sem taxa' : `R$ ${fmtBRL(DELIVERY_FEE)}`}</span>
          </div>
          <div className="cart-row total">
            <span>Total</span>
            <span className="total-price">R$ {fmtBRL(total)}</span>
          </div>
          {step === 'cart' ? (
            <button
              className={'cart-checkout' + (items.length === 0 ? ' disabled' : '')}
              onClick={() => setStep('checkout')}
              disabled={items.length === 0}>
              Continuar →
            </button>
          ) : (
            <button
              className={'cart-checkout' + (!formValid ? ' disabled' : '')}
              onClick={sendWhatsApp}
              disabled={!formValid}>
              <Icon.WhatsApp /> Enviar pedido pelo WhatsApp
            </button>
          )}
          <p className="cart-note">
            {step === 'cart'
              ? 'No próximo passo a gente pede nome, endereço e forma de pagamento.'
              : 'Você é direcionado pro WhatsApp da loja com o pedido pré-formatado.'}
          </p>
        </div>
      </aside>
    </>);

}

// ─────────────────────────────────────────────
// Info Strip
// ─────────────────────────────────────────────
function InfoStrip() {
  return (
    <section className="info-strip" id="info">
      <div className="info-tile">
        <div className="info-tile__icon"><Icon.Pin /></div>
        <div>
          <div className="info-tile__label">Endereço</div>
          <div className="info-tile__value">{STORE.address}<small>{STORE.city}</small></div>
        </div>
      </div>
      <div className="info-tile">
        <div className="info-tile__icon"><Icon.Clock /></div>
        <div>
          <div className="info-tile__label">Horário</div>
          <div className="info-tile__value">
            {STORE.hours[0].time}
            <small>{STORE.hours[0].day} · {STORE.hours[1].day}: {STORE.hours[1].time}</small>
          </div>
        </div>
      </div>
      <div className="info-tile">
        <div className="info-tile__icon"><Icon.Truck /></div>
        <div>
          <div className="info-tile__label">Entrega</div>
          <div className="info-tile__value">~35 min<small>{STORE.deliveryFee}</small></div>
        </div>
      </div>
      <div className="info-tile">
        <div className="info-tile__icon"><Icon.WhatsApp /></div>
        <div>
          <div className="info-tile__label">Pedidos</div>
          <div className="info-tile__value">{STORE.whatsappDisplay}<small>WhatsApp · @{STORE.instagram}</small></div>
        </div>
      </div>
    </section>);

}

// ─────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div className="foot__brand-col">
          <div className="foot__brand">
            <div className="foot__logo"><img src="assets/logo.jpg" alt="" /></div>
            <div>
              <h3 className="foot__name">Jacaré Burguer</h3>
              <p className="foot__tag">{STORE.tagline}</p>
            </div>
          </div>
          <p className="foot__about">
            Hambúrguer artesanal feito com ingredientes selecionados, pão brioche fresco e carne de costela. Atendemos delivery e balcão em {STORE.city}.
          </p>
          <div className="map-wrap">
            <iframe src="https://maps.google.com/maps?q=Rua%20Carvalho%20Leme%20557%20Pato%20Branco%20PR&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy"></iframe>
          </div>
        </div>

        <div className="foot__col">
          <h4>Cardápio</h4>
          <ul>
            <li><a href="#sec-destaques">Destaques</a></li>
            <li><a href="#sec-smash">Smash</a></li>
            <li><a href="#sec-artesanais">Artesanais</a></li>
            <li><a href="#sec-combos">Combos</a></li>
            <li><a href="#sec-acomp">Acompanhamentos</a></li>
            <li><a href="#sec-bebidas">Bebidas</a></li>
          </ul>
        </div>

        <div className="foot__col">
          <h4>Horário</h4>
          <ul>
            <li>Quarta<strong>18:30 – 23:30</strong></li>
            <li>Quinta<strong>18:30 – 23:30</strong></li>
            <li>Sexta<strong>18:30 – 00:00</strong></li>
            <li>Sábado<strong>18:30 – 00:00</strong></li>
            <li>Domingo<strong>18:30 – 23:00</strong></li>
            <li>Seg & Ter<strong style={{ color: 'var(--ash-2)' }}>Fechado</strong></li>
          </ul>
        </div>

        <div className="foot__col">
          <h4>Contato</h4>
          <ul>
            <li><a href={`https://wa.me/${STORE.whatsapp}`} target="_blank" rel="noopener"><Icon.WhatsApp style={{ verticalAlign: 'middle', marginRight: 6 }} />{STORE.whatsappDisplay}</a></li>
            <li><a href={`https://instagram.com/${STORE.instagram}`} target="_blank" rel="noopener"><Icon.Instagram style={{ verticalAlign: 'middle', marginRight: 6 }} />@{STORE.instagram}</a></li>
            <li><a href="#"><Icon.Pin style={{ verticalAlign: 'middle', marginRight: 6 }} />{STORE.address}</a></li>
          </ul>
        </div>
      </div>

      <div className="foot__bottom">
        <span>© 2026 Jacaré Burguer · Sabor que impressiona desde 2025</span>
        <span>Feito com 🔥 · Cardápio digital</span>
      </div>
    </footer>);

}

// ─────────────────────────────────────────────
// FAB (mobile checkout shortcut)
// ─────────────────────────────────────────────
function FabCart({ count, subtotal, onClick }) {
  if (count === 0) return null;
  return (
    <button className="fab-cart show" onClick={onClick}>
      <span className="left">
        <span className="count-pill">{count}</span>
        Ver pedido
      </span>
      <span className="total">R$ {fmtBRL(subtotal)}</span>
    </button>);

}

// ─────────────────────────────────────────────
// App
// ─────────────────────────────────────────────
function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState('destaques');

  const pickCat = (id) => {
    setActiveCat(id);
    const el = document.getElementById(`sec-${id}`);
    if (el) {
      const off = window.innerWidth <= 720 ? 110 : 130;
      const y = el.getBoundingClientRect().top + window.scrollY - off;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Lock body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
  }, [cartOpen]);

  return (
    <>
      <Topbar count={cart.count} onCart={() => setCartOpen(true)} />
      <Hero />
      <PromoStrip />
      <CatNav active={activeCat} onPick={pickCat} />
      <Menu active={activeCat} cart={cart} />
      <InfoStrip />
      <Footer />
      <FabCart count={cart.count} subtotal={cart.subtotal} onClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);