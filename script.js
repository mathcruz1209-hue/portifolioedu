/* =========================================================
   EDU FREITAS DA HORA | PORTFÓLIO
   Os três blocos abaixo (CONTATO, VIDEOS, IMAGENS) são os únicos
   que você precisa editar para atualizar o conteúdo do site.
   ========================================================= */

/* ---------- CONTATO: cole seus endereços entre as aspas ----------
   whatsapp  -> https://wa.me/55DDDNUMERO   (ex.: https://wa.me/5551999999999)
   instagram -> https://instagram.com/seu_usuario
   email     -> mailto:seu@email.com
   linkedin  -> https://www.linkedin.com/in/seu-perfil
   Enquanto um campo estiver vazio, o botão correspondente não faz nada. */
const CONTATO = {
  whatsapp: "https://wa.me/555181151246",
  
  email: "mailto:prazerdufreitas@gmail.com",
  linkedin: "https://www.linkedin.com/in/edu-freitas-da-hora-b039912a6",
};

/* ---------- VÍDEOS ----------
   Para adicionar um vídeo:
   1. Coloque o arquivo MP4 (H.264) em 
   2. Coloque uma imagem de capa em images/
   3. Copie um bloco abaixo e preencha os campos.
   Formato recomendado: vertical 9:16, até 720x1280, MP4 H.264 + AAC. */
const VIDEOS = [
  { title: "Anúncio da oficina Menina Arteira", src: "menina-arteira-oficina.mp4", poster: "images/thumb-menina-arteira-oficina.jpg", duration: "1:07", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Chaveiro Menina Arteira",           src: "chaveiro-menina-arteira.mp4", poster: "images/thumb-chaveiro-menina-arteira.jpg", duration: "0:38", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Oficina Entre Fios e Raízes (on-line)", src: "entre-fios-e-raizes.mp4", poster: "images/thumb-entre-fios-e-raizes.jpg", duration: "0:48", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Museu literário",                   src: "museu-literario.mp4", poster: "images/thumb-museu-literario.jpg", duration: "0:37", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Festa junina na Praça do Tambor",   src: "festa-junina.mp4", poster: "images/thumb-festa-junina.jpg", duration: "0:37", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Esquenta TDC",                      src: "esquenta-tdc.mp4", poster: "images/thumb-esquenta-tdc.jpg", duration: "0:38", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Despertar da inovação",             src: "despertar-da-inovacao.mp4", poster: "images/thumb-despertar-da-inovacao.jpg", duration: "0:37", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Aula experimental de pole com ginga", src: "pole-com-ginga.mp4", poster: "images/thumb-pole-com-ginga.jpg", duration: "0:35", desc: "Adicione uma descrição curta deste projeto." },
  { title: "Aula de tênis",                     src: "aula-de-tenis.mp4", poster: "images/thumb-aula-de-tenis.jpg", duration: "0:36", desc: "Adicione uma descrição curta deste projeto." },
];

/* ---------- IMAGENS ----------
   Para adicionar uma imagem: coloque o arquivo em images/ e inclua uma linha:
   { src: "images/minha-arte.jpg", alt: "Descrição da imagem", caption: "Legenda opcional" },
   Enquanto a lista estiver vazia, a galeria mostra espaços reservados. */
const IMAGENS = [
  { src: "images/registro-1.jpg", alt: "Edu filmando com o celular em um suporte, durante um painel com duas pessoas conversando", caption: "" },
  { src: "images/registro-2.jpg", alt: "Edu em preto e branco, de olhos fechados e com a mão perto do ouvido, em frente a um telão do evento", caption: "Semana Caldeira" },
  { src: "images/registro-3.jpg", alt: "Edu sorrindo, de pé, com cordão rosa do evento no pescoço e mochila nas costas", caption: "" },
  { src: "images/registro-4.jpg", alt: "Edu sorrindo, com a cabeça inclinada, em frente a um mural colorido do Geração Caldeira", caption: "Geração Caldeira" },
  { src: "images/registro-5.jpg", alt: "Edu de perfil, em foto próxima, com adornos de búzios no cabelo e uma pessoa desfocada em primeiro plano", caption: "" },
  { src: "images/registro-6.jpg", alt: "Participantes de um evento com os braços levantados, sorrindo, em uma sala com vidraça colorida ao fundo", caption: "" },
];

/* =========================================================
   A PARTIR DAQUI É O FUNCIONAMENTO DO SITE
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = n => String(n).padStart(2, "0");
  const svg = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ----- Contato: aplica os links ----- */
  $$("[data-contact]").forEach(a => {
    const url = CONTATO[a.dataset.contact];
    if (url) {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    } else {
      a.addEventListener("click", e => e.preventDefault());
      a.title = "Link ainda não configurado (veja script.js)";
    }
  });

  /* ----- Fotos: mostra a imagem se o arquivo existir, senão o espaço reservado ----- */
  $$("[data-photo]").forEach(box => {
    const img = $("img", box);
    const ok = () => box.classList.add("has-image");
    if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);
  });

  /* ----- Menu mobile ----- */
  const toggle = $("#navToggle"), menu = $("#navMenu");
  const setMenu = open => {
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* ----- Item ativo do menu conforme a rolagem ----- */
  const links = $$("a[href^='#']", menu);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["trabalhos", "sobre", "servicos", "contato"].forEach(id => spy.observe($("#" + id)));

  /* ----- Botão voltar ao topo ----- */
  const toTop = $("#toTop");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const show = scrollY > innerHeight * .8;
      toTop.hidden = false;
      toTop.classList.toggle("is-visible", show);
      toTop.tabIndex = show ? 0 : -1;
      ticking = false;
    });
  }, { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  /* ----- Revelação ao rolar (apenas cartões das galerias) ----- */
  const revealer = "IntersectionObserver" in window && !reduceMotion
    ? new IntersectionObserver((entries, obs) => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); obs.unobserve(en.target); }
      }), { rootMargin: "0px 0px -8% 0px" })
    : null;
  const reveal = el => { if (revealer) { el.classList.add("reveal"); revealer.observe(el); } };

  /* ----- Galeria de vídeos ----- */
  const grid = $("#videoGrid");
  $("#navCount").textContent = `(${pad(VIDEOS.length)})`;

  VIDEOS.forEach((v, i) => {
    const li = document.createElement("li");
    li.className = "vcard";
    li.innerHTML = `
      <button class="vcard__btn" type="button" aria-label="Assistir: ${v.title}">
        <span class="vcard__head"><span class="vcard__num">[${pad(i + 1)}]</span><span>${v.title}</span></span>
        <span class="vcard__media">
          <img src="${v.poster}" alt="" loading="lazy" decoding="async" width="540" height="960">
          <span class="vcard__time">${v.duration}</span>
          <span class="vcard__play">${svg("i-play")}</span>
        </span>
      </button>
      <p class="vcard__desc">${v.desc}</p>`;
    const btn = $(".vcard__btn", li), media = $(".vcard__media", li);
    btn.addEventListener("click", () => openVideo(i));

    /* Prévia ao passar o mouse: o vídeo só é baixado nesse momento */
    let pv = null;
    btn.addEventListener("pointerenter", e => {
      if (e.pointerType !== "mouse" || reduceMotion || pv) return;
      pv = document.createElement("video");
      Object.assign(pv, { src: v.src, muted: true, loop: true, playsInline: true, preload: "auto" });
      pv.setAttribute("aria-hidden", "true");
      media.prepend(pv);
      pv.play().then(() => media.classList.add("is-previewing")).catch(() => {});
    });
    btn.addEventListener("pointerleave", () => {
      if (!pv) return;
      media.classList.remove("is-previewing");
      pv.pause(); pv.remove(); pv = null;
    });

    grid.append(li); reveal(li);
  });

  /* ----- Janela do vídeo ----- */
  const vm = $("#videoModal"), vmVideo = $("#vmVideo");
  let cur = 0, lastFocus = null;

  function showVideo(i) {
    cur = (i + VIDEOS.length) % VIDEOS.length;
    const v = VIDEOS[cur];
    vmVideo.poster = v.poster;
    vmVideo.src = v.src;
    $("#vmTitle").textContent = v.title;
    $("#vmDesc").textContent = v.desc;
    $("#vmMeta").textContent = `[${pad(cur + 1)}] de ${pad(VIDEOS.length)}  |  ${v.duration}`;
    vmVideo.play().catch(() => {});   // se o navegador bloquear, o usuário usa o botão de play
  }
  function openVideo(i) {
    lastFocus = document.activeElement;
    vm.showModal();
    document.body.style.overflow = "hidden";
    showVideo(i);
  }
  function closeVideo() {
    vmVideo.pause(); vmVideo.removeAttribute("src"); vmVideo.load();
    vm.close();
  }
  $("#vmPrev").addEventListener("click", () => showVideo(cur - 1));
  $("#vmNext").addEventListener("click", () => showVideo(cur + 1));
  vm.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") showVideo(cur - 1);
    if (e.key === "ArrowRight") showVideo(cur + 1);
  });
  vm.addEventListener("cancel", e => { e.preventDefault(); closeVideo(); });
  vm.addEventListener("close", () => { document.body.style.overflow = ""; lastFocus && lastFocus.focus(); });
  vm.addEventListener("click", e => { if (!e.target.closest(".modal__stage, .modal__info, .icon-btn")) closeVideo(); });
  $("[data-close]", vm).addEventListener("click", closeVideo);

  /* ----- Galeria de imagens ----- */
  const igrid = $("#imageGrid");
  if (IMAGENS.length) {
    IMAGENS.forEach((im, i) => {
      const li = document.createElement("li");
      li.className = "icard";
      li.innerHTML = `<button class="icard__btn" type="button" aria-label="Ampliar: ${im.alt || "imagem " + (i + 1)}"><img src="${im.src}" alt="${im.alt || ""}" loading="lazy" decoding="async"></button>`;
      $("button", li).addEventListener("click", () => openImage(i));
      igrid.append(li); reveal(li);
    });
  } else {
    /* Espaços reservados, com proporções variadas para mostrar como a galeria ficará */
    ["4 / 5", "1 / 1", "4 / 3", "1 / 1", "4 / 5", "16 / 10"].forEach(r => {
      const li = document.createElement("li");
      li.className = "icard icard--empty";
      li.style.setProperty("--ratio", r);
      li.innerHTML = `<span>${svg("i-plus")}Espaço para imagem</span>`;
      igrid.append(li);
    });
  }

  /* ----- Ampliar imagens (lightbox) ----- */
  const im = $("#imgModal"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  let ci = 0, lastFocusImg = null;
  function showImage(i) {
    ci = (i + IMAGENS.length) % IMAGENS.length;
    const d = IMAGENS[ci];
    lbImg.src = d.src; lbImg.alt = d.alt || "";
    lbCap.textContent = d.caption || "";
  }
  function openImage(i) { lastFocusImg = document.activeElement; im.showModal(); document.body.style.overflow = "hidden"; showImage(i); }
  $("#lbPrev").addEventListener("click", () => showImage(ci - 1));
  $("#lbNext").addEventListener("click", () => showImage(ci + 1));
  im.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") showImage(ci - 1);
    if (e.key === "ArrowRight") showImage(ci + 1);
  });
  im.addEventListener("close", () => { document.body.style.overflow = ""; lastFocusImg && lastFocusImg.focus(); });
  im.addEventListener("click", e => { if (!e.target.closest("img, .icon-btn")) im.close(); });
  $("[data-close]", im).addEventListener("click", () => im.close());

  /* ----- Mensagem rápida: abre WhatsApp ou e-mail com o texto pronto ----- */
  const qf = $("#quickForm"), qStatus = $("#quickStatus");
  $$("[data-send]", qf).forEach(btn => btn.addEventListener("click", () => {
    const nome = qf.nome.value.trim(), msg = qf.mensagem.value.trim();
    [qf.nome, qf.mensagem].forEach(f => f.removeAttribute("aria-invalid"));
    if (!nome || !msg) {
      (!nome ? qf.nome : qf.mensagem).setAttribute("aria-invalid", "true");
      (!nome ? qf.nome : qf.mensagem).focus();
      qStatus.textContent = "Preencha seu nome e a mensagem para enviar.";
      return;
    }
    const canal = btn.dataset.send, base = CONTATO[canal];
    if (!base) { qStatus.textContent = "Este canal ainda não foi configurado."; return; }
    const texto = `Olá, Edu! Meu nome é ${nome}.\n\n${msg}`;
    if (canal === "whatsapp") {
      open(`${base}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
    } else {
      location.href = `${base}?subject=${encodeURIComponent("Contato pelo portfólio")}&body=${encodeURIComponent(texto)}`;
    }
    qStatus.textContent = canal === "whatsapp" ? "Abrindo o WhatsApp com a sua mensagem." : "Abrindo o seu e-mail com a sua mensagem.";
  }));

  /* ----- Rodapé ----- */
  $("#year").textContent = new Date().getFullYear();
})();
