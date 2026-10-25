(function(){
  var S = window.SITE, P = S.person;
  if (S.caseOrder) {
    var rank = function(c){ var k = S.caseOrder.indexOf(c.id); return k < 0 ? 999 : k; };
    S.cases.sort(function(a, b){ return rank(a) - rank(b); });
  }
  var root = document.documentElement;
  var $ = function(id){ return document.getElementById(id); };
  var on = function(id, fn){ var el = $(id); if (el) fn(el); };
  var full = function(slug){ return "assets/img/full/" + slug + ".jpg"; };
  var thumb = function(slug){ return "assets/img/thumb/" + slug + ".jpg"; };
  var esc = function(t){ return String(t).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var ICONS = {
    target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    funnel:'<path d="M3 4h18l-7 8.5V19l-4 2v-8.5z"/>',
    play:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3z"/>',
    spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>',
    chart:'<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.7A8.4 8.4 0 1 1 21 11.5z"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/>',
    bag:'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
    gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    refresh:'<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5M3 21v-5h5"/>',
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    users:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/>',
    book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    insta:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
    linkedin:'<rect x="2" y="2" width="20" height="20" rx="4"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"/>',
    whatsapp:'<path d="M3 21l1.7-5A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.3-1.8-1-1 .8a4 4 0 0 1-2.4-2.4l.8-1-1-1.8z"/>',
    layers:'<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
    monitor:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4M9 4h6"/><circle cx="9" cy="14" r="1.2" fill="currentColor"/><circle cx="15" cy="14" r="1.2" fill="currentColor"/><path d="M2 13v3M22 13v3"/>',
    ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    pplay:'<path d="m8 5 11 7-11 7z" fill="currentColor"/>',
    x:'<path d="M18 6 6 18M6 6l12 12"/>',
    arrow:'<path d="M5 12h14M13 5l7 7-7 7"/>'
  };
  var icon = function(name, cls){ return '<svg class="i' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.spark) + "</svg>"; };

  /* ---------- theme ---------- */
  $("themeBtn").addEventListener("click", function(){
    var cur = root.getAttribute("data-theme");
    if (!cur) cur = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch(e) {}
  });
  try { var saved = localStorage.getItem("theme"); if (saved) root.setAttribute("data-theme", saved); } catch(e) {}

  /* ---------- hero (home) ---------- */
  if ($("heroImg")) {
  $("statusText").textContent = P.status;
  $("tagline").textContent = P.tagline;
  $("lede").textContent = P.lede;
  $("heroImg").src = P.heroImage;
  var socials = [
    ["insta", P.instagram, "Instagram"], ["linkedin", P.linkedin, "LinkedIn"],
    ["whatsapp", P.whatsapp, "WhatsApp"], ["mail", "mailto:" + P.email, "Email"]
  ];
  $("heroSocials").innerHTML = socials.map(function(s){
    return '<a class="icon-btn" href="' + esc(s[1]) + '" aria-label="' + s[2] + '"' + (s[1].indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" + icon(s[0]) + "</a>";
  }).join("");

  var roleEl = $("role");
  roleEl.textContent = P.roles[0];
  if (!reduce) {
    var ri = 0, ci = P.roles[0].length, del = true;
    var loop = function(){
      var w = P.roles[ri];
      if (!del) { ci++; roleEl.textContent = w.slice(0, ci); if (ci === w.length) { del = true; return setTimeout(loop, 1700); } return setTimeout(loop, 60); }
      ci--; roleEl.textContent = w.slice(0, ci);
      if (ci === 0) { del = false; ri = (ri + 1) % P.roles.length; return setTimeout(loop, 300); }
      return setTimeout(loop, 28);
    };
    setTimeout(loop, 2200);
  }
  }

  /* ---------- proof, about ---------- */
  on("proof", function(el){ el.innerHTML = S.proof.map(function(p){
    return '<div class="rv"><b>' + esc(p.value) + (p.suffix ? esc(p.suffix) : "") + "</b><span>" + esc(p.label) + "</span></div>";
  }).join(""); });
  on("aboutText", function(el){ el.innerHTML = S.about.map(function(t){ return "<p>" + esc(t) + "</p>"; }).join(""); });
  on("portrait", function(el){ el.src = P.portrait; });
  if ($("facts")) $("facts").innerHTML = S.facts.map(function(f){ return "<div><dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd></div>"; }).join("") +
    '<div><dt>Instagram</dt><dd><a href="' + P.instagram + '" target="_blank" rel="noopener">' + esc(P.instagramHandle) + "</a></dd></div>";

  /* ---------- services, process ---------- */
  var staticCard = function(c, inner){
    return '<div class="card static rv" style="--c1:' + c.c1 + ";--c2:" + c.c2 + '"><div class="cover"><span>' + icon(c.icon) + '</span></div><div class="in">' + inner + "</div></div>";
  };
  if ($("svcList")) $("svcList").innerHTML = S.services.map(function(s, i){
    return '<div class="svc-item rv" id="svc-' + i + '" style="--c:' + s.color + '"><span class="svc-ico"><i style="-webkit-mask-image:url(assets/icons/' + s.ico + '.svg);mask-image:url(assets/icons/' + s.ico + '.svg)"></i></span><div><b>' + esc(s.title) + "</b><span>" + esc(s.short) + "</span></div></div>";
  }).join("");
  if ($("process")) $("process").innerHTML = S.process.map(function(p, i){
    return '<li class="rv"><i>0' + (i + 1) + "</i><b>" + esc(p.title) + "</b>" + esc(p.text) + "</li>";
  }).join("");

  /* ---------- timeline ---------- */
  if ($("timeline")) $("timeline").innerHTML = S.experience.map(function(e){
    return '<li class="rv' + (e.now ? " now" : "") + '"><div class="when">' + esc(e.when) + "</div><h3>" + esc(e.role) + '</h3><div class="org">' + esc(e.org) + "</div><ul>" +
      e.points.map(function(p){ return "<li>" + esc(p) + "</li>"; }).join("") + '</ul><div class="chips">' +
      e.chips.map(function(c){ return '<span class="chip">' + esc(c) + "</span>"; }).join("") + "</div></li>";
  }).join("");

  /* ---------- case studies ---------- */
  var coverHtml = function(c){
    if (c.cover === "video:tawa") return '<span class="cover img"><img src="assets/video/tawa-chatkhara-reel.jpg" alt="" loading="lazy"><span class="play">' + icon("pplay") + "</span></span>";
    if (c.cover) return '<span class="cover img' + (/^(google-ads|meta-)/.test(c.cover) ? " shot" : "") + '"><img src="' + thumb(c.cover) + '" alt="" loading="lazy"></span>';
    return '<span class="cover"><span>' + icon(c.icon) + "</span></span>";
  };
  var casesEl = $("cases"), caseLimit = casesEl && +casesEl.getAttribute("data-limit") || S.cases.length;
  if (casesEl) casesEl.innerHTML = S.cases.slice(0, caseLimit).map(function(c, i){
    var stats = (c.stats || []).slice(0, 2).map(function(s){ return "<div><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>"; }).join("");
    return '<button class="card rv" type="button" data-case="' + i + '" data-tags="' + c.tags.join(" ") + '" style="--c1:' + c.c1 + ";--c2:" + c.c2 + '">' + coverHtml(c) +
      '<span class="in"><small>' + esc(c.client) + "</small><h3>" + esc(c.title) + "</h3><p>" + esc(c.summary) + '</p><span class="stat-line">' + stats + '</span><span class="more">' + (c.problem ? "Read the case study" : "See the work") + ' →</span></span></button>';
  }).join("");

  var bindFilters = function(boxId, filters, onPick){
    var box = $(boxId); if (!box) return;
    box.innerHTML = filters.map(function(f, i){ return '<button type="button" data-f="' + f[0] + '" aria-pressed="' + (i === 0) + '">' + esc(f[1]) + "</button>"; }).join("");
    box.addEventListener("click", function(e){
      var b = e.target.closest("button"); if (!b) return;
      box.querySelectorAll("button").forEach(function(x){ x.setAttribute("aria-pressed", x === b); });
      onPick(b.getAttribute("data-f"));
    });
  };
  bindFilters("caseFilters", S.caseFilters, function(f){
    document.querySelectorAll("#cases .card").forEach(function(card){
      card.hidden = !(f === "all" || card.getAttribute("data-tags").split(" ").indexOf(f) > -1);
    });
  });

  var modal = $("caseModal");
  var openCase = function(i){
    var c = S.cases[i];
    var head = c.cover && c.cover.indexOf("video:") !== 0
      ? '<div class="m-cover img"><img src="' + full(c.cover) + '" alt=""></div>'
      : '<div class="m-cover" style="--c1:' + c.c1 + ";--c2:" + c.c2 + '"></div>';
    var media = (c.media || []).map(function(m, k){
      if (m.video) {
        var tall = m.video.indexOf("tawa") > -1;
        return '<div class="is-video' + (tall ? " tall" : "") + '"><video controls preload="none" playsinline poster="' + m.poster + '" aria-label="' + esc(m.alt) + '"><source src="' + m.video + '" type="video/mp4"></video></div>';
      }
      return '<button type="button" data-mi="' + k + '" aria-label="View larger: ' + esc(m.alt) + '"><img src="' + thumb(m.src) + '" alt="' + esc(m.alt) + '" loading="lazy"></button>';
    }).join("");
    $("caseBody").innerHTML = head +
      '<button class="m-x" type="button" aria-label="Close" data-close>' + icon("x") + "</button>" +
      '<div class="m-body"><small>' + esc(c.client) + '</small><h2 id="mTitle">' + esc(c.title) + "</h2>" +
      (c.stats ? '<div class="m-stats">' + c.stats.map(function(s){ return "<div><b>" + esc(s[0]) + "</b><span>" + esc(s[1]) + "</span></div>"; }).join("") + "</div>" : "") +
      (c.problem ? "<h4>The problem</h4><p>" + esc(c.problem) + "</p>" : "") +
      (c.brief ? "<h4>The brief</h4><p>" + esc(c.brief) + "</p>" : "") +
      (c.flow ? '<ol class="flow">' + c.flow.map(function(f){ return "<li><b>" + esc(f[0]) + "</b>" + esc(f[1]) + "</li>"; }).join("") + "</ol>" : "") +
      "<h4>" + (c.problem ? "What I did" : "What I made") + '</h4><ul class="pts">' + c.actions.map(function(a){ return "<li>" + esc(a) + "</li>"; }).join("") + "</ul>" +
      (c.result ? '<h4>The result</h4><p class="result-box">' + esc(c.result) + "</p>" : "") +
      (media ? '<h4>The work</h4><div class="m-media">' + media + "</div>" : "") +
      '<div class="m-links"><a class="btn primary sm" href="#contact" data-close>Talk about a similar project</a></div></div>';
    $("caseBody").querySelectorAll("[data-mi]").forEach(function(b){
      b.addEventListener("click", function(){
        var imgs = c.media.filter(function(m){ return !m.video; });
        var k = imgs.indexOf(c.media[+b.getAttribute("data-mi")]);
        openLightbox(imgs.map(function(m){ return { src: full(m.src), title: m.alt, sub: c.client }; }), k);
      });
    });
    modal.showModal();
    modal.scrollTop = 0;
  };
  if (casesEl) casesEl.addEventListener("click", function(e){ var b = e.target.closest("[data-case]"); if (b) openCase(+b.getAttribute("data-case")); });
  modal.addEventListener("click", function(e){
    if (e.target === modal || e.target.closest("[data-close]")) { modal.querySelectorAll("video").forEach(function(v){ v.pause(); }); modal.close(); }
  });
  modal.addEventListener("close", function(){ modal.querySelectorAll("video").forEach(function(v){ v.pause(); }); });

  /* ---------- results wall ---------- */
  if ($("resultsWall")) {
  $("resultsWall").innerHTML = S.results.map(function(r, i){
    return '<figure class="rv"><button type="button" data-ri="' + i + '" aria-label="View larger: ' + esc(r.title) + '"><img src="' + full(r.src) + '" alt="' + esc(r.title + ": " + r.note) + '" loading="lazy"></button><figcaption><b>' + esc(r.title) + "</b><small>" + esc(r.meta) + "</small><span>" + esc(r.note) + "</span></figcaption></figure>";
  }).join("");
  $("resultsWall").addEventListener("click", function(e){
    var b = e.target.closest("[data-ri]"); if (!b) return;
    openLightbox(S.results.map(function(r){ return { src: full(r.src), title: r.title, sub: r.note }; }), +b.getAttribute("data-ri"));
  });
  }

  /* ---------- gallery ---------- */
  var LIMIT = 16, galFilter = "all", galExpanded = false;
  if ($("galleryGrid")) {
  $("galleryGrid").innerHTML = S.gallery.map(function(g, i){
    var meta = '<span class="meta"><b>' + esc(g.title) + "</b><small>" + esc(g.client) + "</small></span>";
    if (g.video) {
      return '<div class="g-item vid rv" data-cat="video" data-i="' + i + '"><video controls preload="none" playsinline poster="' + g.poster + '" aria-label="' + esc(g.title) + '"><source src="' + g.video + '" type="video/mp4"></video>' + meta + "</div>";
    }
    var src = g.slides ? g.slides[0] : g.src;
    var badge = g.slides ? '<span class="g-badge">' + icon("layers") + g.slides.length + " slides</span>" : "";
    return '<button type="button" class="g-item rv" data-cat="' + g.cat + '" data-i="' + i + '" aria-label="Open ' + esc(g.title) + '"><span class="ph"><img src="' + thumb(src) + '" alt="' + esc(g.title + ", " + g.client) + '" loading="lazy">' + badge + "</span>" + meta + "</button>";
  }).join("");
  var applyGallery = function(){
    var shown = 0;
    document.querySelectorAll("#galleryGrid .g-item").forEach(function(el){
      var match = galFilter === "all" || el.getAttribute("data-cat") === galFilter;
      if (match && galFilter === "all" && !galExpanded && shown >= LIMIT) match = false;
      if (match) shown++;
      el.hidden = !match;
      if (match) el.classList.add("in");
    });
    $("galMore").parentNode.hidden = !(galFilter === "all" && !galExpanded);
  };
  bindFilters("galFilters", S.galleryFilters, function(f){ galFilter = f; applyGallery(); });
  $("galMore").addEventListener("click", function(){ galExpanded = true; applyGallery(); });
  applyGallery();
  $("galleryGrid").addEventListener("click", function(e){
    var b = e.target.closest("button.g-item"); if (!b) return;
    var g = S.gallery[+b.getAttribute("data-i")];
    if (g.slides) {
      openLightbox(g.slides.map(function(s, k){ return { src: full(s), title: g.title, sub: g.client + " · slide " + (k + 1) + " of " + g.slides.length }; }), 0, true);
      return;
    }
    var visible = [].slice.call(document.querySelectorAll("#galleryGrid button.g-item:not([hidden])"))
      .map(function(el){ return S.gallery[+el.getAttribute("data-i")]; })
      .filter(function(x){ return !x.slides; });
    openLightbox(visible.map(function(x){ return { src: full(x.src), title: x.title, sub: x.client }; }), visible.indexOf(g));
  });
  var hashCat = (location.hash.match(/^#cat-(\w+)/) || [])[1];   // creative.html#cat-ads opens a category
  if (hashCat) { var hb = document.querySelector('#galFilters [data-f="' + hashCat + '"]'); if (hb) hb.click(); }
  }

  /* ---------- stores and websites ---------- */
  var domain = function(u){ return u.replace(/^https?:\/\//, "").replace(/\/$/, ""); };
  var sitesEl = $("sitesGrid"), siteLimit = sitesEl && +sitesEl.getAttribute("data-limit") || S.websites.length;
  if (sitesEl) {
  sitesEl.innerHTML = S.websites.slice(0, siteLimit).map(function(w, i){
    var shot = w.shots.length
      ? '<img src="' + thumb(w.shots[0]) + '" alt="' + esc(w.name) + ' homepage" loading="lazy">'
      : '<span class="site-ph" style="--c1:' + (w.c1 || "#3D4FE8") + ";--c2:" + (w.c2 || "#07987F") + '"><b>' + esc(w.name) + "</b><small>" + esc(domain(w.url)) + "</small></span>";
    var frame = '<span class="site-bar"><i></i><i></i><i></i><em>' + esc(domain(w.url)) + "</em></span>" + shot;
    return '<article class="site rv">' +
      (w.shots.length ? '<button type="button" class="site-shot" data-site="' + i + '" aria-label="View larger: ' + esc(w.name) + '">' + frame + "</button>" : '<a class="site-shot" href="' + esc(w.url) + '" target="_blank" rel="noopener" aria-label="Visit ' + esc(w.name) + '">' + frame + "</a>") +
      '<div class="in"><small>' + esc(w.platform) + "</small><h3>" + esc(w.name) + "</h3><p>" + esc(w.text) + '</p><a class="visit" href="' + esc(w.url) + '" target="_blank" rel="noopener">Visit site ' + icon("ext") + "</a></div></article>";
  }).join("");
  $("sitesGrid").addEventListener("click", function(e){
    var b = e.target.closest("[data-site]"); if (!b) return;
    var w = S.websites[+b.getAttribute("data-site")];
    openLightbox(w.shots.map(function(s){ return { src: full(s), title: w.name, sub: w.platform + " · " + domain(w.url) }; }), 0);
  });
  }

  /* ---------- strategy, leadership, skills, education ---------- */
  if ($("strategyGrid")) $("strategyGrid").innerHTML = S.strategy.map(function(s, i){
    var c = S.services[i % S.services.length];
    return staticCard({ c1: c.c1, c2: c.c2, icon: s.icon }, "<small>" + esc(s.client) + "</small><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p>");
  }).join("");
  var withText = S.leadership.filter(function(l){ return l.text; });
  var campus = S.leadership.filter(function(l){ return !l.text; });
  if ($("leadFeature")) $("leadFeature").innerHTML = withText.map(function(l){
    return '<div class="feature rv"><small>' + esc(l.when) + "</small><h3>" + esc(l.role) + "</h3><p><b>" + esc(l.org) + ".</b> " + esc(l.text) + "</p></div>";
  }).join("");
  if ($("campus")) $("campus").innerHTML = campus.map(function(l){ return "<span><b>" + esc(l.role) + "</b>, " + esc(l.org) + "<em>" + esc(l.when) + "</em></span>"; }).join("");
  if ($("skillsGrid")) $("skillsGrid").innerHTML = S.skills.map(function(s){
    return '<div class="sk rv"><h3>' + icon(s.icon) + esc(s.title) + '</h3><div class="pills">' + s.items.map(function(x){ return "<span>" + esc(x) + "</span>"; }).join("") + "</div></div>";
  }).join("");
  var certHtml = function(list){ return list.map(function(c){ return '<div class="cert"><b>' + esc(c[0]) + "</b><span>" + esc(c[1]) + "</span></div>"; }).join(""); };
  on("edu", function(el){ el.innerHTML = certHtml(S.education); });
  on("certs", function(el){ el.innerHTML = certHtml(S.certifications); });

  /* ---------- contact ---------- */
  if ($("contactLinks")) $("contactLinks").innerHTML = [
    ["mail", "mailto:" + P.email, P.email],
    ["whatsapp", P.whatsapp, P.phone + " (WhatsApp)"],
    ["phone", P.phoneHref, P.phone],
    ["insta", P.instagram, P.instagramHandle],
    ["linkedin", P.linkedin, "linkedin.com/in/arooj-butt-performance-marketer"]
  ].map(function(l){
    return '<a href="' + esc(l[1]) + '"' + (l[1].indexOf("http") === 0 ? ' target="_blank" rel="noopener"' : "") + ">" + icon(l[0]) + esc(l[2]) + "</a>";
  }).join("");
  on("mailForm", function(f){ f.addEventListener("submit", function(e){
    e.preventDefault();
    var n = $("fn").value, em = $("fe").value, m = $("fm").value;
    window.location.href = "mailto:" + P.email + "?subject=" + encodeURIComponent("Portfolio enquiry from " + n) + "&body=" + encodeURIComponent(m + "\n\nFrom: " + n + " (" + em + ")");
  }); });
  $("year").textContent = new Date().getFullYear();

  /* ---------- lightbox ---------- */
  var lb = $("lightbox"), lbList = [], lbIdx = 0, lbDots = false;
  function renderLb(){
    var it = lbList[lbIdx];
    $("lbImg").src = it.src; $("lbImg").alt = it.title;
    $("lbCap").innerHTML = esc(it.title) + "<small>" + esc(it.sub || "") + "</small>";
    $("lbCount").textContent = (lbIdx + 1) + " / " + lbList.length;
    $("lbDots").innerHTML = lbDots ? lbList.map(function(_, k){ return '<i class="' + (k === lbIdx ? "on" : "") + '"></i>'; }).join("") : "";
    var multi = lbList.length > 1;
    lb.querySelector(".prev").hidden = !multi; lb.querySelector(".next").hidden = !multi;
    if (multi) { new Image().src = lbList[(lbIdx + 1) % lbList.length].src; }
  }
  function openLightbox(list, idx, dots){
    if (!list.length) return;
    lbList = list; lbIdx = Math.max(0, idx); lbDots = !!dots;
    renderLb(); lb.showModal();
  }
  var step = function(d){ lbIdx = (lbIdx + d + lbList.length) % lbList.length; renderLb(); };
  lb.addEventListener("click", function(e){
    var b = e.target.closest("[data-lb]");
    if (b) { var a = b.getAttribute("data-lb"); if (a === "close") lb.close(); else step(a === "next" ? 1 : -1); return; }
    if (e.target === lb) lb.close();
  });
  lb.addEventListener("keydown", function(e){
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function(e){ tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function(e){
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 45 && lbList.length > 1) step(dx < 0 ? 1 : -1);
  });

  /* ---------- section navigator ----------
     Desktop: a tick per section on the right edge; only the current section's name shows,
     hovering expands the full list. Narrow screens: a bottom pill with the current section
     that opens a sheet listing every section. */
  var secs = [].slice.call(document.querySelectorAll("main > section[data-label][id]"));
  var nav = $("secnav"), pill = $("secpill"), sheet = $("secsheet"), backdrop = $("secBackdrop");
  var pad = function(n){ return (n < 10 ? "0" : "") + n; };
  nav.innerHTML = '<span class="secnav-count"><b>01</b> / ' + pad(secs.length) + "</span><ol>" + secs.map(function(s){
    return '<li><a href="#' + s.id + '"><span class="lbl">' + esc(s.dataset.label) + '</span><span class="tick" aria-hidden="true"></span></a></li>';
  }).join("") + "</ol>";
  sheet.querySelector("ol").innerHTML = secs.map(function(s, i){
    return '<li><a href="#' + s.id + '"><span class="n">' + pad(i + 1) + "</span>" + esc(s.dataset.label) + "</a></li>";
  }).join("");
  var navLinks = [].slice.call(nav.querySelectorAll("a")), sheetLinks = [].slice.call(sheet.querySelectorAll("a"));
  var setSheet = function(open){
    sheet.hidden = !open; backdrop.hidden = !open; pill.setAttribute("aria-expanded", open);
    if (open) { var cur = sheet.querySelector("a.active"); if (cur) cur.scrollIntoView({ block: "center" }); }
  };
  pill.addEventListener("click", function(){ setSheet(sheet.hidden); });
  $("secsheetClose").addEventListener("click", function(){ setSheet(false); });
  backdrop.addEventListener("click", function(){ setSheet(false); });
  sheet.addEventListener("click", function(e){ if (e.target.closest("a")) setSheet(false); });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape" && !sheet.hidden) setSheet(false); });

  var last = -1;
  var spy = function(){
    var y = window.innerHeight * 0.35, idx = 0;
    secs.forEach(function(s, i){ if (s.getBoundingClientRect().top <= y) idx = i; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) idx = secs.length - 1;
    if (idx === last) return;
    last = idx;
    navLinks.forEach(function(a, i){ a.classList.toggle("active", i === idx); a.classList.toggle("done", i < idx); if (i === idx) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    sheetLinks.forEach(function(a, i){ a.classList.toggle("active", i === idx); });
    nav.querySelector(".secnav-count b").textContent = pad(idx + 1);
    pill.innerHTML = '<span class="dot" aria-hidden="true"></span><span class="lbl">' + esc(secs[idx].dataset.label) + '</span><span class="cnt">' + (idx + 1) + "/" + secs.length + '</span><svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>';
    pill.setAttribute("aria-label", "Current section: " + secs[idx].dataset.label + ". Show all sections");
    pill.hidden = idx === 0;   // stays out of the way on the intro
  };
  var ticking = false;
  window.addEventListener("scroll", function(){ if (!ticking) { ticking = true; requestAnimationFrame(function(){ spy(); ticking = false; }); } }, { passive: true });
  spy();

  /* ---------- scroll reveal ---------- */
  var rvs = document.querySelectorAll(".rv");
  if (reduce || !("IntersectionObserver" in window)) {
    rvs.forEach(function(el){ el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rvs.forEach(function(el){ io.observe(el); });
  }
})();
