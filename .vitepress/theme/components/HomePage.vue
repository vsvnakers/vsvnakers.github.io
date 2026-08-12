<template>
  <main class="dream-home">
    <section class="dream-hero">
      <div class="dream-hero__copy">
        <div class="dream-kicker">
          <span class="dream-kicker__dot"></span>
          SYSTEMS · RUST · LINUX
        </div>

        <h1>
          在光与星轨之间，<br>
          <span>写代码与宇宙。</span>
        </h1>

        <p class="dream-lead">
          这里收藏系统编程的思考、学习轨迹与偶然闪现的灵感。
          愿每一段晦涩的代码，最后都能变成清澈的星光。
        </p>

        <div class="dream-actions">
          <a class="dream-button dream-button--primary" href="/posts/">
            开始阅读 <span aria-hidden="true">→</span>
          </a>
          <a class="dream-button dream-button--ghost" href="/guestbook/">
            留下问题 <span aria-hidden="true">✦</span>
          </a>
        </div>

        <div class="dream-status" aria-label="个人状态">
          <span><i></i> Online</span>
          <span>📍 Somewhere in the kernel</span>
        </div>
      </div>

      <div class="dream-hero__art" aria-hidden="true">
        <div class="dream-orbit dream-orbit--one"></div>
        <div class="dream-orbit dream-orbit--two"></div>
        <span class="dream-star dream-star--one">✦</span>
        <span class="dream-star dream-star--two">✧</span>
        <span class="dream-star dream-star--three">✦</span>

        <div class="dream-moon-card">
          <svg class="dream-mascot" viewBox="0 0 420 470" role="presentation">
            <defs>
              <linearGradient id="moonGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="var(--dream-orb-start)" />
                <stop offset="0.55" stop-color="var(--dream-orb-middle)" />
                <stop offset="1" stop-color="var(--dream-orb-end)" />
              </linearGradient>
              <linearGradient id="hairGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="var(--dream-hair-start)" />
                <stop offset="1" stop-color="var(--dream-hair-end)" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>

            <circle cx="218" cy="208" r="143" fill="url(#moonGlow)" opacity=".92" filter="url(#softGlow)" />
            <circle class="dream-moon-cutout" cx="252" cy="174" r="132" fill="var(--dream-moon-cutout)" opacity=".96" />
            <g fill="var(--dream-spark)" filter="url(#softGlow)">
              <circle cx="75" cy="90" r="3"/><circle cx="354" cy="112" r="2"/>
              <circle cx="334" cy="292" r="3"/><circle cx="83" cy="282" r="2"/>
            </g>

            <path d="M128 384c10-53 41-83 88-90 49 7 79 38 88 90l17 75H111z" fill="url(#hairGlow)" />
            <path d="M155 211l18-61 45 31 43-31 19 62c12 28 7 72-12 99-15 21-32 34-50 34s-36-13-51-34c-20-28-25-71-12-100z" fill="var(--dream-face)" />
            <path d="M150 225c-7-57 19-104 68-104 48 0 77 47 68 105-13-10-25-24-31-42-17 23-54 39-105 41z" fill="url(#hairGlow)" />
            <path d="M165 184l-4-54 45 25M272 184l3-54-43 25" fill="url(#hairGlow)" stroke="#9b74ed" stroke-width="4" stroke-linejoin="round" />
            <path d="M174 251c10 7 21 7 31 0M233 251c10 7 21 7 31 0" fill="none" stroke="#6f4aa3" stroke-width="5" stroke-linecap="round" />
            <path d="M211 279c5 5 10 5 15 0" fill="none" stroke="#bd7ba7" stroke-width="4" stroke-linecap="round" />
            <path d="M160 243c-13 0-20 8-20 22 0 17 11 29 24 29M275 243c13 0 20 8 20 22 0 17-11 29-24 29" fill="none" stroke="#a477e7" stroke-width="11" stroke-linecap="round" />
            <path d="M188 337l30 28 30-28 17 19-47 51-47-51z" fill="var(--dream-collar)" opacity=".9" />
            <path d="M109 458c5-43 21-72 62-102l47 51 47-51c41 29 57 59 63 102" fill="var(--dream-outfit)" stroke="var(--dream-outfit-line)" stroke-width="3" />
            <circle cx="219" cy="416" r="7" fill="var(--dream-gem)" filter="url(#softGlow)" />
          </svg>

          <div class="dream-code-chip dream-code-chip--top">
            <span></span> cargo run
          </div>
          <div class="dream-code-chip dream-code-chip--bottom">
            <b>01</b> 昼夜之间
          </div>
        </div>
      </div>
    </section>

    <section class="dream-section">
      <div class="dream-section__head">
        <div>
          <span class="dream-overline">EXPLORE THE ARCHIVE</span>
          <h2>沿着星轨探索</h2>
        </div>
        <span class="dream-section__mark">✦</span>
      </div>

      <div class="dream-grid">
        <a class="dream-card dream-card--wide" href="/posts/">
          <div class="dream-card__icon">⌁</div>
          <span class="dream-card__index">01</span>
          <h3>技术文章</h3>
          <p>Rust、操作系统、Linux 内核，以及那些值得反复推敲的实现细节。</p>
          <span class="dream-card__link">Browse notes →</span>
        </a>

        <a class="dream-card" href="/study/">
          <div class="dream-card__icon">☾</div>
          <span class="dream-card__index">02</span>
          <h3>学习轨迹</h3>
          <p>整理阅读清单、课程资料与正在探索的新领域。</p>
          <span class="dream-card__link">Keep learning →</span>
        </a>

        <a class="dream-card" href="/tools/">
          <div class="dream-card__icon">⌘</div>
          <span class="dream-card__index">03</span>
          <h3>工具箱</h3>
          <p>一些真正好用、值得分享的软件与开发工具。</p>
          <span class="dream-card__link">Open toolbox →</span>
        </a>

        <a class="dream-card" href="/papers/">
          <div class="dream-card__icon">⌬</div>
          <span class="dream-card__index">04</span>
          <h3>每日论文</h3>
          <p>每天三篇 arXiv 论文，以及由 DeepSeek 生成的结构化中文解读。</p>
          <span class="dream-card__link">Read papers →</span>
        </a>
      </div>
    </section>

    <section class="dream-message-card">
      <div class="dream-message-card__spark">✦</div>
      <div>
        <span class="dream-overline">SIGNAL RECEIVED?</span>
        <h2>有问题，或者只是想打声招呼？</h2>
        <p>在留言板留下你的想法。每一条来自远方的信号，我都会认真读完。</p>
      </div>
      <a class="dream-button dream-button--primary" href="/guestbook/">进入留言板 →</a>
    </section>
  </main>
</template>
