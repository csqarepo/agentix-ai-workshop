(() => {
  const page = document.body.dataset.page;
  const NAV = [["index.html", "Home", "home"], ["agenda.html", "Agenda", "agenda"], ["build.html", "What You'll Build", "build"], ["faq.html", "FAQ", "faq"]];

  // shared nav + footer
  window.PS_FALLBACK = `<svg class="ps-mark" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="psg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b2ff7"/><stop offset="1" stop-color="#5b2bd6"/></linearGradient></defs><path d="M20 2 36 11v18L20 38 4 29V11z" fill="url(#psg)"/><path d="M15 29V12h7a6 6 0 0 1 0 12h-3" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/></svg>`;
  const PS_MARK = `<img class="ps-mark" src="assets/logos/productsquadss_logo.jpeg" alt="" onerror="this.outerHTML=window.PS_FALLBACK">`;
  const BRAND = (full) => `
    ${full ? `<img class="lg-csqa-img" src="assets/logos/CSQA.png" alt="CSQA — Community of Software QA" onerror="this.outerHTML='<span class=&quot;lg-csqa&quot;>CS<b>QA</b><small>Community of Software QA</small></span>'"><span class="sep"></span>` : ""}
    <span class="lg-agentix"><span>Agenti<i>X</i></span><small>HUMAN CREATIVITY. AI MULTIPLIED.</small><em>BY CS<b>QA</b></em></span>
    <span class="sep hide-md"></span>
    <span class="lg-ps hide-md">${PS_MARK}<span><span class="hosted">Hosted at</span>ProductSquads</span></span>`;
  document.getElementById("nav").outerHTML = `<nav><div class="wrap">
    <a class="brandbar" href="index.html" aria-label="AgentiX by CSQA, hosted at ProductSquads">${BRAND(false)}</a>
    <div class="links" id="links">${NAV.map(([h, l, k]) => `<a href="${h}"${k === page ? ' class="active" aria-current="page"' : ""}>${l}</a>`).join("")}</div>
    <div style="display:flex;gap:8px;align-items:center">
      <a class="btn btn-primary" href="register.html">Express Interest</a>
      <button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false" aria-controls="links">☰</button>
    </div></div></nav>`;
  document.getElementById("footer").outerHTML = `<footer><div class="wrap">
    <div class="brandbar">${BRAND(true).replaceAll("hide-md","")}</div>
    <p class="tagline"><b data-cfg="name"></b> · Same community. Bigger possibilities.</p>
    <p class="footer-host">AgentiX by CSQA <span aria-hidden="true">·</span> Hosted at ProductSquads</p>
    <div class="footer-links" role="navigation" aria-label="Footer navigation">
      ${NAV.map(([h, l, k]) => `<a href="${h}"${k === page ? ' class="active" aria-current="page"' : ""}>${l}</a>`).join("")}
      <a data-mail>Contact us</a>
      <a class="share" target="_blank" rel="noopener">LinkedIn <span aria-hidden="true">↗</span></a>
    </div>
    <div class="footer-actions"><span class="footer-hashtag" data-cfg="hashtag"></span>${page === "register" ? "" : '<a class="btn btn-primary" href="register.html">Express Interest</a>'}</div>
  </div></footer>`;
  const menuBtn = document.getElementById("menuBtn"), links = document.getElementById("links");
  menuBtn.addEventListener("click", () => menuBtn.setAttribute("aria-expanded", links.classList.toggle("open")));

  // config values
  const start = new Date(CONFIG.start);
  const total = AGENDA.reduce((s, a) => s + a.min, 0);
  const end = CONFIG.end ? new Date(CONFIG.end) : new Date(start.getTime() + total * 60000);
  const fmtT = d => d.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit", timeZone: CONFIG.timeZoneId});
  const dur = m => m >= 60 ? `${m / 60} hour${m > 60 ? "s" : ""}` : `${m} min`;
  const vals = {
    ...CONFIG,
    dateLabel: start.toLocaleDateString("en-US", {weekday: "short", month: "long", day: "numeric", year: "numeric", timeZone: CONFIG.timeZoneId}),
    timeLabel: `${fmtT(start)} – ${fmtT(end)} ${CONFIG.timezone}`,
    seatsLabel: `${CONFIG.seats} seats planned`,
    closesLabel: new Date(CONFIG.registrationCloses).toLocaleDateString("en-US", {month: "long", day: "numeric"})
  };
  document.querySelectorAll("[data-cfg]").forEach(el => { if (vals[el.dataset.cfg] != null) el.textContent = vals[el.dataset.cfg]; });
  document.querySelectorAll("[data-mail]").forEach(el => el.href = "mailto:" + CONFIG.contactEmail);
  const shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(new URL("index.html", location.href).href);
  document.querySelectorAll(".share").forEach(a => a.href = shareUrl);

  // agenda: bar, legend, timeline (compact on home via data-compact)
  const bar = document.getElementById("bar"), legend = document.getElementById("legend"), tl = document.getElementById("timeline");
  let t = new Date(start);
  AGENDA.forEach((a, i) => {
    const s = new Date(t); t = new Date(t.getTime() + a.min * 60000);
    bar?.insertAdjacentHTML("beforeend", `<span style="flex:${a.min};background:${a.color}"></span>`);
    legend?.insertAdjacentHTML("beforeend", `<span><i style="background:${a.color}"></i>${a.short} · ${dur(a.min)}</span>`);
    if (tl) {
      const pts = "compact" in tl.dataset ? "" : `<ul class="clean" style="margin-top:8px">${a.points.map(p => `<li>→ ${p}</li>`).join("")}</ul>`;
      tl.insertAdjacentHTML("beforeend", `<div class="tl-item" style="--c:${a.color}"><div class="tl-head"><h3>${i + 1}. ${a.title}</h3><span class="tl-time">${fmtT(s)} – ${fmtT(t)} · <span class="dur">${dur(a.min)}</span></span></div><p>${a.desc}</p>${pts}</div>`);
    }
  });

  // countdown
  const cd = document.getElementById("countdown");
  if (cd) {
    const tick = () => {
      const ms = start - Date.now();
      if (ms <= 0) { cd.innerHTML = "<div><b>Live</b><small>now</small></div>"; return; }
      const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
      cd.innerHTML = [[d, "days"], [h, "hours"], [m, "mins"]].map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`).join("");
    };
    tick(); setInterval(tick, 30000);
  }

  // scroll reveal
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold: .12});
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // registration form
  const form = document.getElementById("regForm");
  if (form && CONFIG.externalRegisterUrl) {
    form.outerHTML = `<div style="text-align:center;padding:24px"><a class="btn btn-primary" href="${CONFIG.externalRegisterUrl}" target="_blank" rel="noopener">Express interest on the event page →</a></div>`;
  } else if (form) {
    const setErr = (el, msg) => {
      const field = el.closest(".field");
      field.querySelector(".err").textContent = msg || "";
      field.classList.toggle("has-error", !!msg);
      el.classList.toggle("invalid", !!msg);
    };
    const validate = () => {
      let ok = true;
      const radioGroups = new Set();
      form.querySelectorAll("input,select").forEach(el => {
        let msg = "";
        if (el.type === "radio") {
          if (radioGroups.has(el.name)) return;
          radioGroups.add(el.name);
          const radios = [...form.querySelectorAll(`input[type="radio"][name="${el.name}"]`)];
          msg = radios.some(radio => radio.checked) ? "" : "Please select an option.";
          radios.forEach(radio => radio.classList.toggle("invalid", !!msg));
        } else if (el.type === "checkbox" && el.required && !el.checked) msg = "Please agree to continue.";
        else if (el.required && !el.value.trim()) msg = "This field is required.";
        else if (el.value && !el.checkValidity()) msg = el.type === "email" ? "Enter a valid email." : "Enter a valid URL.";
        setErr(el, msg); if (msg) ok = false;
      });
      return ok;
    };
    form.addEventListener("input", e => { if (e.target.classList.contains("invalid")) validate(); });
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (!validate()) { form.querySelector(".invalid")?.focus(); return; }
      const data = Object.fromEntries(new FormData(form));
      const btn = document.getElementById("submitBtn"); btn.disabled = true; btn.textContent = "Submitting…";
      try {
        if (!CONFIG.formEndpoint) throw new Error("Registration endpoint is not configured");
        data.consent = data.consent ? "Yes" : "No";
        // text/plain avoids a CORS preflight, which Google Apps Script does not support
        const r = await fetch(CONFIG.formEndpoint, {method: "POST", headers: {"Content-Type": "text/plain;charset=utf-8"}, body: JSON.stringify(data)});
        const res = await r.json();
        if (!res.ok) throw new Error(res.error || "Save failed");
        form.style.display = "none"; document.getElementById("success").classList.add("show");
      } catch (err) {
        console.error(err);
        btn.disabled = false; btn.textContent = "Submit interest →";
        alert("Sorry, we couldn't submit your interest. Please try again, or email " + CONFIG.contactEmail);
      }
    });
  }

  // add to calendar
  document.getElementById("icsBtn")?.addEventListener("click", () => {
    const z = d => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AgentiX//EN", "BEGIN:VEVENT", `UID:${Date.now()}@agentix`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(start)}`, `DTEND:${z(end)}`, `SUMMARY:${CONFIG.name} Workshop`, `LOCATION:${CONFIG.venue}`, "DESCRIPTION:Half-day build-first AI agent workshop.", "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([ics], {type: "text/calendar"})); a.download = "ai-agent-workshop.ics"; a.click();
  });
})();
