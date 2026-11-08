/* Hero background animation, "Funnel": people (dots) flow left to right through
   Impressions > Clicks > WhatsApp chats > Bookings > Orders and narrow into the results dashboard.
   Most drop off at each stage; the ones that convert spark in the accent colour. The cursor acts like ad targeting.
   Pauses when the hero is off screen; reduced-motion users get one still frame. */
(function () {
  "use strict";
  var hero = document.querySelector(".hero.phero");
  var cv = document.getElementById("heroFx");
  if (!hero || !cv || !cv.getContext) { var w0 = document.querySelector(".fx-wrap"); if (w0) w0.remove(); return; }   // only the home page has the hero
  var ctx = cv.getContext("2d");
  var S = window.SITE || {};
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  var W = 0, H = 0, dpr = 1, mode = "funnel", t0 = performance.now(), visible = true, raf = 0;
  var mouse = { x: -9999, y: -9999, in: false };
  var C = { ink: "#0b3a52", acc: "#c2186b", muted: "#6b7a80", bg: "#f2f2ee" };
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var lerp = function (a, b, k) { return a + (b - a) * k; };
  var smooth = function (k) { k = Math.max(0, Math.min(1, k)); return k * k * (3 - 2 * k); };
  var MONO = '500 11px "JetBrains Mono", ui-monospace, Menlo, monospace';

  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    var g = function (n, d) { var v = cs.getPropertyValue(n).trim(); return v || d; };
    C.ink = g("--ink", C.ink); C.acc = g("--a1", C.acc); C.muted = g("--muted", C.muted); C.bg = g("--bg", C.bg);
  }
  function rgba(col, a) { /* works for #hex; for other formats fall back to globalAlpha */
    var m = /^#([0-9a-f]{6})$/i.exec(col);
    if (!m) return col;
    var n = parseInt(m[1], 16);
    return "rgba(" + (n >> 16) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function resize() {
    var r = hero.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (M[mode] && M[mode].init) M[mode].init(true);
  }

  /* ------------------------------------------------------------------ funnel */
  var funnel = (function () {
    var P = [], sparks = [], pops = [], orders = 0;
    var STAGES = [["Impressions", .04], ["Clicks", .3], ["WhatsApp chats", .55], ["Bookings", .78], ["Orders", 1]];
    var KEEP = [.5, .48, .55, .62];   // share that survives each stage
    var endX = W * .92, midY = H * .52;
    function measure() {
      var f = hero.querySelector(".phero-frame"), hr = hero.getBoundingClientRect();
      if (f && W > 900) { var r = f.getBoundingClientRect(); endX = r.left - hr.left - 10; midY = r.top - hr.top + r.height / 2; }
      else { endX = W * .92; midY = H * .55; }
    }
    var cy = function () { return midY; };
    var half = function (x) { var k = smooth(x / endX); return lerp(Math.min(midY, H - midY) * .92, 7, k); };
    function spawn(p, fresh) {
      p.x = fresh ? rnd(-W * .9, 0) : rnd(-40, -4); p.lane = rnd(-1, 1); p.y = cy() + p.lane * half(0);
      p.v = rnd(.9, 1.7); p.stage = 0; p.drop = false; p.vy = 0; p.a = 1; p.r = rnd(1.2, 2.2);
      return p;
    }
    return {
      init: function () { measure(); P = []; sparks = []; pops = []; orders = 0; var n = Math.round(Math.min(340, W * .24)); for (var i = 0; i < n; i++) P.push(spawn({}, true)); for (var k = 0; k < 900; k++) this.step(); sparks = []; pops = []; orders = 0; },
      step: function () {
        var scale = Math.max(.7, W / 1300);
        for (var i = 0; i < P.length; i++) {
          var p = P[i];
          if (p.drop) { p.vy += .06; p.y += p.vy; p.x += p.v * .4 * scale; p.a -= .012; if (p.a <= 0 || p.y > H + 10) spawn(p); continue; }
          p.x += p.v * scale;
          var ty = cy() + p.lane * half(p.x);
          p.y += (ty - p.y) * .08;
          if (mouse.in) { var dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy); if (d < 150) { p.y += dy / d * (1 - d / 150) * 2.2; p.x += dx / d * (1 - d / 150) * .6; } }
          var next = STAGES[p.stage + 1];
          if (next && p.x > next[1] * endX) {
            if (p.stage < KEEP.length && Math.random() > KEEP[p.stage]) { p.drop = true; p.vy = rnd(-.4, .4); }
            else p.stage++;
          }
          if (p.stage >= 4 || (p.stage >= 3 && p.x >= endX)) {   // converted at the dashboard
            orders++;
            for (var k = 0; k < 7; k++) { var a = rnd(0, Math.PI * 2), s = rnd(.6, 2.4); sparks.push({ x: p.x, y: p.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, a: 1 }); }
            if (Math.random() < .35) pops.push({ x: p.x + rnd(-10, 10), y: p.y - 14, a: 1, t: "+1 order" });
            spawn(p);
          }
          if (p.x > endX + 10) spawn(p);
        }
        for (i = sparks.length - 1; i >= 0; i--) { var s2 = sparks[i]; s2.x += s2.vx; s2.y += s2.vy; s2.vx *= .95; s2.vy *= .95; s2.a -= .025; if (s2.a <= 0) sparks.splice(i, 1); }
        for (i = pops.length - 1; i >= 0; i--) { pops[i].y -= .5; pops[i].a -= .012; if (pops[i].a <= 0) pops.splice(i, 1); }
      },
      draw: function () {
        // funnel walls
        ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(C.ink, .22); ctx.beginPath();
        for (var x = 0; x <= endX; x += 12) ctx.lineTo(x, cy() - half(x)); ctx.stroke(); ctx.beginPath();
        for (x = 0; x <= endX; x += 12) ctx.lineTo(x, cy() + half(x)); ctx.stroke();
        var words = W > 900;   // on single-column layouts the labels would sit on top of the text
        // stage markers and labels
        ctx.font = MONO; ctx.textAlign = "center";
        STAGES.forEach(function (s, i) {
          var sx = s[1] * endX, h = half(sx);
          ctx.strokeStyle = rgba(C.ink, .1); ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.moveTo(sx, cy() - h - 8); ctx.lineTo(sx, cy() + h + 8); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = i === 4 ? rgba(C.acc, .95) : rgba(C.ink, .6);
          if (!words) return;
          ctx.fillText(s[0], Math.max(40, sx - (i === 4 ? 26 : 0)), Math.max(14, cy() - h - 14));
        });
        // people
        for (var i = 0; i < P.length; i++) {
          var p = P[i];
          ctx.fillStyle = p.drop ? rgba(C.muted, .45 * Math.max(0, p.a)) : p.stage >= 3 ? rgba(C.acc, .95) : rgba(C.ink, .45 + p.stage * .14);
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r + .4 + (p.stage >= 3 ? .8 : 0), 0, 6.283); ctx.fill();
        }
        sparks.forEach(function (s) { ctx.fillStyle = rgba(C.acc, Math.max(0, s.a)); ctx.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4); });
        ctx.font = '600 12px "DM Sans", system-ui, sans-serif'; ctx.textAlign = "center";
        if (words) pops.forEach(function (q) { ctx.fillStyle = rgba(C.acc, Math.max(0, q.a)); ctx.fillText(q.t, q.x, q.y); });
        // orders counter at the narrow end
        ctx.textAlign = "right"; ctx.font = MONO; ctx.fillStyle = rgba(C.acc, .8);
        if (words) ctx.fillText("orders: " + orders, endX - 4, cy() + 30);
        if (mouse.in) { ctx.strokeStyle = rgba(C.acc, .35); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 46, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = rgba(C.acc, .7); ctx.textAlign = "left"; ctx.fillText("targeting", mouse.x + 52, mouse.y + 4); }
      }
    };
  })();

  var M = { funnel: funnel };

  function frame(now) {
    raf = 0;
    if (!visible || document.hidden) return;
    ctx.clearRect(0, 0, W, H);
    var m = M[mode]; m.step(now); m.draw(now);
    if (!reduce) raf = requestAnimationFrame(frame);
  }
  function start() { if (!raf) raf = requestAnimationFrame(frame); }
  function still() { var m = M[mode]; for (var i = 0; i < 160; i++) m.step(performance.now() + i * 16); ctx.clearRect(0, 0, W, H); m.draw(performance.now()); }

  function begin() {
    hero.setAttribute("data-fx", "funnel");
    resize(); readColors();
    if (reduce) still(); else start();
  }

  /* pointer (relative to the hero) */
  hero.addEventListener("pointermove", function (e) {
    var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.in = e.pointerType === "mouse";
  }, { passive: true });
  hero.addEventListener("pointerleave", function () { mouse.in = false; mouse.x = mouse.y = -9999; });

  /* only animate while the hero is on screen */
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible && !reduce) start(); }, { rootMargin: "60px" }).observe(hero);
  document.addEventListener("visibilitychange", function () { if (!document.hidden && !reduce) start(); });
  var rt; addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { resize(); if (reduce) still(); }, 150); });

  begin();
})();
