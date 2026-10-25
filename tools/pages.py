#!/usr/bin/env python3
"""Generates the site's HTML pages so the header, footer and dialogs stay identical.

Run from the repo root after changing the menu, a page's sections or ASSET_VERSION:
    python3 tools/pages.py
Content (text, numbers, images) lives in assets/js/content.js and needs no rebuild.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_VERSION = "13"


ICON_THEME = ('<svg class="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>'
              '<path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>')
ICON_ARROW = '<svg class="i" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'


def section(sid, label, inner, first=False, cls="s"):
    pad = "" if first else ' style="padding-top:1rem"'
    return f'<section class="{cls}" id="{sid}" data-label="{label}"{pad}>\n  <div class="wrap">\n{inner}\n  </div>\n</section>'


def head(eyebrow, title, text="", h1=False):
    tag = "h1" if h1 else "h2"
    p = f"<p>{text}</p>" if text else ""
    eb = f'<span class="eyebrow">{eyebrow}</span>' if eyebrow else ""
    return f'    <div class="head">{eb}<{tag}>{title}</{tag}>{p}</div>'


def more(href, text):
    return f'    <div class="more-wrap"><a class="btn" href="{href}">{text} {ICON_ARROW}</a></div>'


HERO = '''<section class="hero" id="top" data-label="Intro">
  <div class="wrap hero-grid">
    <div>
      <div class="status"><b>AB</b><span id="statusText"></span><span class="dot" aria-hidden="true"></span></div>
      <h1 id="heroName">Arooj Butt</h1>
      <div class="role grad"><span id="role"></span><span class="caret" aria-hidden="true"></span></div>
      <p class="tagline" id="tagline"></p>
      <p class="lede" id="lede"></p>
      <div class="cta"><a class="btn primary" href="#work">See the results</a><a class="btn" href="#contact">Get in touch</a></div>
      <div class="socials" id="heroSocials"></div>
    </div>
    <div class="hero-visual">
      <div class="frame"><img id="heroImg" alt="Social media design work for Quantum Telehealth, Navory and Cafe Noir shown on phones and a tablet" width="1600" height="1066" fetchpriority="high"></div>
      <div class="chip-float c1"><b>1,129</b><span>conversations at Rs38</span></div>
      <div class="chip-float c2"><b>3.5x</b><span>CPA gap found and fixed</span></div>
    </div>
  </div>
</section>

<section class="s" style="padding-top:0" aria-label="Key results">
  <div class="wrap"><div class="proof" id="proof"></div></div>
</section>'''

ABOUT = '''<section class="s" id="about" data-label="About" style="padding-top:1rem">
  <div class="wrap about">
    <div>
      <div class="head"><span class="eyebrow">About</span><h2>Growth that shows up in the numbers</h2></div>
      <div id="aboutText"></div>
    </div>
    <div>
      <div class="portrait"><img id="portrait" alt="Portrait of Arooj Butt" width="560" height="560" loading="lazy"></div>
      <dl class="facts" id="facts"></dl>
    </div>
  </div>
</section>'''

CONTENTS = '''<section class="s" style="padding-top:0" aria-label="Contents">
  <div class="wrap"><nav class="toc-box" id="tocBox" aria-label="Contents"></nav></div>
</section>'''

CONTACT = '''<section class="s" id="contact" data-label="Contact" style="padding-top:1rem">
  <div class="wrap">
    <div class="contact">
      <div>
        <h2>Have a campaign to grow?</h2>
        <p>Send a message and it opens in your email app, addressed to me. Or reach me directly.</p>
        <div class="cl" id="contactLinks"></div>
      </div>
      <form class="mail" id="mailForm">
        <div><label for="fn">Your name</label><input id="fn" required maxlength="80" autocomplete="name"></div>
        <div><label for="fe">Your email</label><input id="fe" type="email" required maxlength="120" autocomplete="email"></div>
        <div><label for="fm">Message</label><textarea id="fm" required maxlength="1500"></textarea></div>
        <button class="btn primary" type="submit">Send message</button>
      </form>
    </div>
  </div>
</section>'''

PAGES = {
    "index.html": {
        "title": "Arooj Butt | Growth Marketing and Paid Advertising",
        "desc": "Arooj Butt is a growth marketer running Meta Ads, Google Ads, Shopify stores, websites, AI automations, WhatsApp funnels, UGC and brand building for brands in Pakistan, the US and Australia.",
        "body": [
            HERO,
            CONTENTS,
            ABOUT,
            section("services", "What I do", head("Services", "What I do",
                    "Paid media, the funnel and content behind it, and the stores, websites and automations it runs on.") +
                    '\n    <div class="svc-list wide" id="svcList"></div>'),
            section("work", "Case studies", head("Case studies", "Problems, fixes and results",
                    "Open a card for the full story: what was wrong, what I changed and what happened.") +
                    '\n    <div class="filters" id="caseFilters" role="group" aria-label="Filter case studies"></div>\n    <div class="grid" id="cases"></div>'),
            section("results", "Proof", head("Proof", "Straight from the ad accounts",
                    "Unedited dashboards, cropped only to remove account details.") + '\n    <div class="results" id="resultsWall"></div>'),
            section("websites", "Websites", head("Build", "Stores and websites I've built",
                    "Shopify stores and websites that are live today. Open any one to see it for yourself.") +
                    '\n    <div class="grid" id="sitesGrid"></div>'),
            section("gallery", "Creative", head("Creative", "Carousels, ads and brand work",
                    "Creatives I've made for clients and for my own page. Carousels open slide by slide.") +
                    '\n    <div class="filters" id="galFilters" role="group" aria-label="Filter creative work"></div>\n    <div class="gallery" id="galleryGrid"></div>\n    <div class="more-wrap"><button class="btn" id="galMore" type="button">Show more</button></div>'),
            section("how-i-work", "How I work", head("Process", "How I work",
                    "The same five steps behind every account, refined across 20+ brands.") + '\n    <ol class="flow" id="process"></ol>', cls="s process"),
            section("experience", "Experience", head("Experience", "Where I've done it") + '\n    <ol class="tl" id="timeline"></ol>'),
            section("strategy", "Audits and plans", head("Strategy", "Audits and plans",
                    "Strategy documents written for clients. Details stay confidential, so here's what each one covered.") +
                    '\n    <div class="grid svc" id="strategyGrid"></div>'),
            section("leadership", "Leadership", head("Leadership", "Leading teams and events") +
                    '\n    <div class="lead-grid" id="leadFeature"></div>\n    <div class="campus" id="campus"></div>'),
            section("skills", "Skills", head("Toolkit", "Skills") + '\n    <div class="skills" id="skillsGrid"></div>'),
            section("education", "Education", head("", "Education and certifications") +
                    '\n    <div class="two"><div id="edu"></div><div id="certs"></div></div>'),
            CONTACT,
        ],
    },
}


def page(name, cfg):
    body = "\n\n".join(cfg["body"])
    v = ASSET_VERSION
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{cfg["title"]}</title>
<meta name="description" content="{cfg["desc"]}">
<meta name="author" content="Arooj Butt">
<meta property="og:type" content="website">
<meta property="og:title" content="{cfg["title"]}">
<meta property="og:description" content="{cfg["desc"]}">
<meta property="og:image" content="assets/img/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3D4FE8">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css?v={v}">
</head>
<body data-page="{name.removesuffix(".html")}">
<a class="skip" href="#main">Skip to content</a>
<header class="top">
  <div class="wrap nav">
    <a class="logo" href="#top"><i>AB</i><span>Arooj Butt</span></a>
    <div class="tools">
      <button class="icon-btn" id="themeBtn" type="button" aria-label="Switch colour theme">{ICON_THEME}</button>
      <a class="btn primary sm" href="#contact">Hire me</a>
    </div>
  </div>
</header>

<nav class="secnav" id="secnav" aria-label="Sections"></nav>
<button class="secpill" id="secpill" type="button" aria-controls="secsheet" aria-expanded="false" hidden></button>
<div class="secsheet" id="secsheet" role="dialog" aria-label="All sections" hidden><div class="toc-head"><b>Jump to</b><button type="button" id="secsheetClose">close</button></div><ol></ol></div>
<div class="toc-backdrop" id="secBackdrop" hidden></div>

<main id="main">
{body}
</main>
<footer class="f"><div class="wrap">© <span id="year"></span> Arooj Butt · Growth Marketing and Paid Advertising</div></footer>

<dialog id="caseModal" aria-labelledby="mTitle"><div id="caseBody"></div></dialog>

<dialog class="lb" id="lightbox" aria-label="Image viewer">
  <span class="count" id="lbCount"></span>
  <button class="x" type="button" aria-label="Close viewer" data-lb="close"><svg class="i" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
  <button class="prev" type="button" aria-label="Previous image" data-lb="prev"><svg class="i" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg></button>
  <figure><img id="lbImg" alt=""><figcaption id="lbCap"></figcaption><div class="dots" id="lbDots"></div></figure>
  <button class="next" type="button" aria-label="Next image" data-lb="next"><svg class="i" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg></button>
</dialog>

<noscript><p style="text-align:center;padding:2rem">This portfolio needs JavaScript to show its work. Email <a href="mailto:aroojbutt0604@gmail.com">aroojbutt0604@gmail.com</a>.</p></noscript>
<script src="assets/js/content.js?v={v}"></script>
<script src="assets/js/main.js?v={v}"></script>
</body>
</html>
'''


if __name__ == "__main__":
    for name, cfg in PAGES.items():
        (ROOT / name).write_text(page(name, cfg), encoding="utf-8")
        print("wrote", name)
