(function () {
  const companies = LEASING.companies;
  const byId = Object.fromEntries(companies.map((company) => [company.id, company]));
  const typeLabel = Object.fromEntries(LEASING.types.map((type) => [type.id, type.label]));
  const segmentLabel = Object.fromEntries(LEASING.segments.map((segment) => [segment.id, segment.label]));

  const state = {
    q: "",
    segment: "",
    type: "",
    sort: "rank",
    scope: "top",
    compare: [],
    activeSegment: "cars",
    pickerSegment: "cars",
    pickerClient: "small",
  };

  const els = {
    q: document.querySelector("#q"),
    qMeta: document.querySelector("#q-meta"),
    board: document.querySelector("#board"),
    pills: document.querySelector("#pills"),
    type: document.querySelector("#type-filter"),
    sort: document.querySelector("#sort"),
    scope: document.querySelector("#scope"),
    count: document.querySelector("#count"),
    grid: document.querySelector("#grid"),
    table: document.querySelector("#ranking-body"),
    segList: document.querySelector("#seg-list"),
    segTitle: document.querySelector("#seg-title"),
    segHint: document.querySelector("#seg-hint"),
    bars: document.querySelector("#bars"),
    pickerSegment: document.querySelector("#picker-segment"),
    pickerClient: document.querySelector("#picker-client"),
    pickerResults: document.querySelector("#picker-results"),
    tray: document.querySelector("#tray"),
    traySlots: document.querySelector("#tray-slots"),
    dialog: document.querySelector("#dialog"),
    dialogBody: document.querySelector("#dialog-body"),
    dialogTitle: document.querySelector("#dialog-title"),
    toast: document.querySelector("#toast"),
    nav: document.querySelector("#site-nav"),
    navToggle: document.querySelector(".nav-toggle"),
  };

  let lastFocus = null;

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch]));
  }

  function formatMoney(mln) {
    if (mln == null || Number.isNaN(Number(mln))) return "н/д";
    const abs = Math.abs(Number(mln));
    if (abs >= 1000000) {
      return (abs / 1000000).toLocaleString("ru-RU", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + " трлн ₽";
    }
    if (abs >= 1000) {
      const value = abs / 1000;
      const digits = value >= 100 ? 1 : 1;
      return value.toLocaleString("ru-RU", { maximumFractionDigits: digits, minimumFractionDigits: digits }) + " млрд ₽";
    }
    return abs.toLocaleString("ru-RU", { maximumFractionDigits: 0 }) + " млн ₽";
  }

  function growth(company) {
    if (company.portfolio == null || company.portfolioPrev == null || company.portfolioPrev === 0) return null;
    return (company.portfolio - company.portfolioPrev) / company.portfolioPrev;
  }

  function formatGrowth(company) {
    const value = growth(company);
    if (value == null) return "н/д";
    const pct = Math.round(value * 100);
    if (pct === 0) return "0%";
    return (pct > 0 ? "+" : "−") + Math.abs(pct) + "%";
  }

  function rankDelta(company) {
    if (company.rank && company.prevRank == null) return { kind: "new", text: "новый в топ-20" };
    if (!company.rank || !company.prevRank) return null;
    const diff = company.prevRank - company.rank;
    if (diff > 0) return { kind: "up", text: `+${diff} к 2024` };
    if (diff < 0) return { kind: "down", text: `${diff} к 2024` };
    return { kind: "same", text: "место как в 2024" };
  }

  function segmentsOf(id) {
    return LEASING.segments
      .map((segment) => {
        const rows = LEASING.segmentRanks[segment.id] || [];
        const index = rows.findIndex((row) => row.id === id);
        if (index < 0) return null;
        return { ...segment, rank: index + 1, volume: rows[index].volume };
      })
      .filter(Boolean)
      .sort((a, b) => a.rank - b.rank || b.volume - a.volume);
  }

  function maxBusiness() {
    return Math.max(...companies.map((company) => company.newBusiness || 0));
  }

  function readUrl() {
    const params = new URLSearchParams(location.search);
    state.q = params.get("q") || "";
    state.segment = params.get("segment") || "";
    state.type = params.get("type") || "";
    state.sort = params.get("sort") || "rank";
    state.scope = params.get("scope") === "all" ? "all" : "top";
    if (params.get("view")) state.activeSegment = params.get("view");
    const company = params.get("company");
    if (company && byId[company]) openCompany(company, false);
  }

  function writeUrl(extra) {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.segment) params.set("segment", state.segment);
    if (state.type) params.set("type", state.type);
    if (state.sort !== "rank") params.set("sort", state.sort);
    if (state.scope === "all") params.set("scope", "all");
    if (extra?.company) params.set("company", extra.company);
    const qs = params.toString();
    history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
  }

  function visibleRows() {
    const query = state.q.trim().toLowerCase();
    let rows = companies.map((company) => ({ company, segmentRank: null, segmentVolume: null }));
    if (state.segment) {
      const ranks = LEASING.segmentRanks[state.segment] || [];
      const map = new Map(ranks.map((row, index) => [row.id, { rank: index + 1, volume: row.volume }]));
      rows = rows
        .filter((row) => map.has(row.company.id))
        .map((row) => {
          const match = map.get(row.company.id);
          return { ...row, segmentRank: match.rank, segmentVolume: match.volume };
        });
    }
    if (state.type) rows = rows.filter((row) => row.company.type === state.type);
    if (query) {
      rows = rows.filter(({ company }) => {
        const blob = [company.name, company.short, company.group, company.city, company.inn, ...(company.aliases || [])]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return blob.includes(query);
      });
    } else if (!state.segment && state.scope === "top") {
      rows = rows.filter((row) => row.company.rank != null);
    }
    rows.sort((a, b) => {
      if (state.sort === "name") return a.company.name.localeCompare(b.company.name, "ru");
      if (state.sort === "business") return compareDesc(a.company.newBusiness, b.company.newBusiness);
      if (state.sort === "portfolio") return compareDesc(a.company.portfolio, b.company.portfolio);
      if (state.sort === "growth") return compareDesc(growth(a.company), growth(b.company));
      if (state.segment) return a.segmentRank - b.segmentRank;
      return compareAsc(a.company.rank, b.company.rank);
    });
    return rows;
  }

  function compareDesc(a, b) {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    return b - a;
  }

  function compareAsc(a, b) {
    if (a == null && b == null) return 0;
    if (a == null) return 1;
    if (b == null) return -1;
    return a - b;
  }

  function renderBoard() {
    const top = companies
      .filter((company) => company.newBusiness != null)
      .sort((a, b) => b.newBusiness - a.newBusiness)
      .slice(0, 5);
    const max = top[0]?.newBusiness || 1;
    els.board.innerHTML = top.map((company) => `
      <button class="board-row" type="button" data-action="open" data-id="${esc(company.id)}">
        <div class="board-top"><span>${company.rank}. ${esc(company.name)}</span><span>${formatMoney(company.newBusiness)}</span></div>
        <div class="board-track"><i style="width:${Math.max(6, (company.newBusiness / max) * 100)}%"></i></div>
      </button>
    `).join("");
  }

  function renderPills() {
    const all = `<button class="pill ${state.segment ? "" : "is-on"}" type="button" data-action="segment" data-segment="">Все сегменты</button>`;
    els.pills.innerHTML = all + LEASING.segments.map((segment) => `
      <button class="pill ${state.segment === segment.id ? "is-on" : ""}" type="button" data-action="segment" data-segment="${segment.id}">${esc(segment.label)}</button>
    `).join("");
  }

  function renderControls() {
    if (els.q.value !== state.q) els.q.value = state.q;
    els.type.value = state.type;
    els.sort.value = state.sort;
    els.scope.querySelectorAll(".scope-btn").forEach((button) => {
      button.classList.toggle("is-on", button.dataset.scope === state.scope);
      button.setAttribute("aria-pressed", button.dataset.scope === state.scope ? "true" : "false");
    });
  }

  function cardHtml(row) {
    const company = row.company;
    const delta = rankDelta(company);
    const segs = segmentsOf(company.id).slice(0, 3);
    const leader = row.segmentRank === 1 || (!state.segment && company.rank === 1);
    const selected = state.compare.includes(company.id);
    const headline = row.segmentVolume != null ? formatMoney(row.segmentVolume) : formatMoney(company.newBusiness);
    const caption = row.segmentVolume != null
      ? `${row.segmentRank}-е место в сегменте «${segmentLabel[state.segment]}»`
      : "новый бизнес за 2025 год";
    const widthBase = row.segmentVolume != null
      ? (LEASING.segmentRanks[state.segment][0]?.volume || 1)
      : maxBusiness();
    const widthValue = row.segmentVolume != null ? row.segmentVolume : company.newBusiness;
    const place = row.segmentRank || company.rank;
    return `
      <article class="card ${leader ? "card--leader" : ""}">
        <div class="card-top">
          <div class="rank">${place ? String(place).padStart(2, "0") : "—"}</div>
          <div>
            <span class="tag">${esc(typeLabel[company.type])}</span>
            ${delta ? `<span class="tag tag--${delta.kind}">${esc(delta.text)}</span>` : ""}
          </div>
        </div>
        <div>
          <h3>${esc(company.name)}</h3>
          <p class="sub">${esc([company.group, company.city].filter(Boolean).join(" · "))}</p>
        </div>
        <div class="metric">
          <b>${headline}</b>
          <span>${esc(caption)}</span>
          ${widthValue ? `<div class="track"><i style="width:${Math.max(4, (widthValue / widthBase) * 100)}%"></i></div>` : ""}
        </div>
        <p class="fine">${company.portfolio != null ? `Портфель ${formatMoney(company.portfolio)} · ${formatGrowth(company)} за год` : "Общий портфель в топ-20 не опубликован"}</p>
        <div class="chips">${segs.map((segment) => `<span class="chip">${esc(segment.label)} · ${segment.rank}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="btn btn-ghost ${selected ? "is-on" : ""}" type="button" data-action="compare" data-id="${esc(company.id)}">${selected ? "В сравнении" : "Сравнить"}</button>
          <button class="btn btn-dark" type="button" data-action="open" data-id="${esc(company.id)}">Подробнее</button>
        </div>
      </article>
    `;
  }

  function renderCatalog() {
    const rows = visibleRows();
    const query = state.q.trim();
    const outsideTop = companies.filter((company) => company.rank == null).length;
    els.count.textContent = query
      ? `Найдено ${rows.length}`
      : state.segment
        ? `${rows.length} в сегменте «${segmentLabel[state.segment]}»`
        : state.type
          ? `Показано ${rows.length}`
          : state.scope === "top"
            ? `Топ-20 общего рэнкинга · в каталоге ещё ${outsideTop}`
            : `Весь каталог · ${rows.length}`;
    els.qMeta.innerHTML = query
      ? `Совпадения обновлены в каталоге. <a href="#catalog">Перейти к карточкам</a>`
      : "Поиск по названию, городу, группе и ИНН. В режиме «Топ-20» он всё равно видит весь каталог.";
    if (!rows.length) {
      els.grid.innerHTML = `<div class="empty"><h3>Ничего не нашлось</h3><p>Сбросьте сегмент или проверьте написание. В каталоге ${companies.length} компаний из рэнкинга, это не весь рынок.</p><button class="btn btn-dark" type="button" data-action="reset">Сбросить фильтры</button></div>`;
      return;
    }
    els.grid.innerHTML = rows.map(cardHtml).join("");
  }

  function renderTable() {
    const rows = companies
      .filter((company) => company.rank != null)
      .sort((a, b) => a.rank - b.rank);
    els.table.innerHTML = rows.map((company) => `
      <tr class="clickable" data-action="open" data-id="${esc(company.id)}">
        <td class="place">${company.rank}</td>
        <td>${esc(rankDelta(company)?.text || "—")}</td>
        <td><strong>${esc(company.name)}</strong><div class="fine">${esc(company.city)} · ИНН ${esc(company.inn)}</div></td>
        <td>${formatMoney(company.newBusiness)}</td>
        <td>${formatMoney(company.portfolio)}</td>
        <td>${formatGrowth(company)}</td>
        <td>${esc(typeLabel[company.type])}</td>
      </tr>
    `).join("");
  }

  function renderSegments() {
    els.segList.innerHTML = LEASING.segments.map((segment) => `
      <button class="seg-btn ${state.activeSegment === segment.id ? "is-on" : ""}" type="button" data-action="view-segment" data-segment="${segment.id}">${esc(segment.label)}</button>
    `).join("");
    const current = LEASING.segments.find((segment) => segment.id === state.activeSegment);
    const rows = LEASING.segmentRanks[state.activeSegment] || [];
    const max = rows[0]?.volume || 1;
    els.segTitle.textContent = current.hint;
    els.segHint.textContent = `Топ-${rows.length} по новому бизнесу сегмента за 2025 год. Лидер принят за 100% шкалы.`;
    els.bars.innerHTML = rows.map((row, index) => `
      <div class="bar-row">
        <div class="place">${index + 1}</div>
        <button class="bar-name" type="button" data-action="open" data-id="${esc(row.id)}">${esc(byId[row.id].name)}</button>
        <div class="bar-track"><i style="width:${Math.max(3, (row.volume / max) * 100)}%"></i></div>
        <div class="bar-vol">${formatMoney(row.volume)}</div>
      </div>
    `).join("");
  }

  function recommend() {
    const rows = LEASING.segmentRanks[state.pickerSegment] || [];
    return rows
      .map((row, index) => {
        const company = byId[row.id];
        let score = 100 - index * 6;
        const retail = ["cars", "lcv", "trucks"].includes(state.pickerSegment);
        if (state.pickerClient === "small" && retail && (company.type === "independent" || company.type === "captive")) score += 14;
        if (state.pickerClient === "small" && company.type === "state" && state.pickerSegment !== "agri") score -= 8;
        if (state.pickerClient === "corp" && (company.type === "bank" || company.type === "state")) score += 12;
        if (state.pickerClient === "mid" && company.rank && company.rank <= 15) score += 4;
        if (state.pickerClient === "agro" && state.pickerSegment === "agri" && company.id === "rosagro") score += 30;
        if (state.pickerClient === "agro" && company.type === "state") score += 6;
        return { company, volume: row.volume, rank: index + 1, score };
      })
      .sort((a, b) => b.score - a.score || a.rank - b.rank)
      .slice(0, 5);
  }

  function reason(item) {
    const bits = [`${item.rank}-е место в сегменте «${segmentLabel[state.pickerSegment]}»`, `${formatMoney(item.volume)} нового бизнеса`];
    if (item.company.rank) bits.push(`${item.company.rank}-е место общего рэнкинга`);
    if (state.pickerClient === "small" && (item.company.type === "independent" || item.company.type === "captive")) {
      bits.push("тип компании ближе к розничному лизингу");
    }
    if (state.pickerClient === "corp" && (item.company.type === "bank" || item.company.type === "state")) {
      bits.push("группа чаще работает с крупными сделками");
    }
    if (state.pickerClient === "agro" && item.company.id === "rosagro") {
      bits.push("государственная программа льготного агролизинга");
    }
    return bits.join(" · ");
  }

  function renderPicker() {
    els.pickerSegment.value = state.pickerSegment;
    els.pickerClient.value = state.pickerClient;
    const items = recommend();
    els.pickerResults.innerHTML = items.map((item, index) => `
      <article class="pick">
        <div class="pick-n">${index + 1}</div>
        <div>
          <h3>${esc(item.company.name)}</h3>
          <p class="why">${esc(reason(item))}.</p>
        </div>
        <button class="btn btn-dark" type="button" data-action="open" data-id="${esc(item.company.id)}">Карточка</button>
      </article>
    `).join("") + `<p class="fine">Подбор сортирует компании сегмента по месту в рэнкинге и типу. Это не рейтинг надёжности и не оферта.</p>`;
  }

  function renderTray() {
    document.body.classList.toggle("has-tray", state.compare.length > 0);
    if (!state.compare.length) {
      els.tray.hidden = true;
      return;
    }
    els.tray.hidden = false;
    els.traySlots.innerHTML = state.compare.map((id) => `
      <span class="slot">${esc(byId[id].name)} <button type="button" data-action="uncompare" data-id="${esc(id)}" aria-label="Убрать ${esc(byId[id].name)}">×</button></span>
    `).join("");
  }

  function render() {
    renderControls();
    renderPills();
    renderCatalog();
    renderTray();
  }

  function companyFacts(company) {
    const delta = rankDelta(company);
    const segs = segmentsOf(company.id);
    return `
      <p class="kicker">${esc(typeLabel[company.type])}</p>
      <h2 id="dialog-title">${esc(company.name)}</h2>
      <p class="sub">${esc([company.group, company.city, "ИНН " + company.inn].filter(Boolean).join(" · "))}</p>
      <p>${esc(company.summary)}</p>
      <div class="facts">
        <div class="fact"><b>${company.rank ? company.rank + "-е место" : "вне топ-20"}</b><span>общий рэнкинг по новому бизнесу${delta ? " · " + esc(delta.text) : ""}</span></div>
        <div class="fact"><b>${formatMoney(company.newBusiness)}</b><span>новый бизнес за 2025, без НДС</span></div>
        <div class="fact"><b>${formatMoney(company.portfolio)}</b><span>портфель на 01.01.2026 · ${formatGrowth(company)} к прошлому году</span></div>
        <div class="fact"><b>${formatMoney(company.contracts)}</b><span>новые договоры за 2025, как в таблице источника</span></div>
      </div>
      <div class="chips">${segs.map((segment) => `<span class="chip">${esc(segment.label)}: ${segment.rank}-е, ${formatMoney(segment.volume)}</span>`).join("") || "<span class=\"fine\">В показанных сегментах нет отдельной строчки.</span>"}</div>
      <div class="modal-actions">
        ${company.site ? `<a class="btn btn-lime" href="${esc(company.site)}" target="_blank" rel="noopener noreferrer">Официальный сайт</a>` : `<span class="fine">Ссылка на сайт не указана: домен в этой версии не подтверждался. Компанию можно найти по ИНН ${esc(company.inn)}.</span>`}
        <button class="btn btn-ghost ${state.compare.includes(company.id) ? "is-on" : ""}" type="button" data-action="compare" data-id="${esc(company.id)}">${state.compare.includes(company.id) ? "Убрать из сравнения" : "Добавить к сравнению"}</button>
      </div>
    `;
  }

  function openCompany(id, push) {
    const company = byId[id];
    if (!company) return;
    lastFocus = document.activeElement;
    els.dialogBody.innerHTML = companyFacts(company);
    els.dialog.hidden = false;
    document.body.style.overflow = "hidden";
    els.dialog.querySelector(".dialog-x").focus();
    if (push !== false) writeUrl({ company: id });
  }

  function closeDialog() {
    els.dialog.hidden = true;
    document.body.style.overflow = "";
    writeUrl();
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function openCompare() {
    if (state.compare.length < 2) {
      toast("Отметьте хотя бы две компании");
      return;
    }
    const selected = state.compare.map((id) => byId[id]);
    const header = selected.map((company) => `<th>${esc(company.name)}</th>`).join("");
    const row = (label, getter) => `<tr><td>${label}</td>${selected.map((company) => `<td>${getter(company)}</td>`).join("")}</tr>`;
    const cards = selected.map((company) => `
      <article class="pick">
        <div>
          <h3>${esc(company.name)}</h3>
          <p class="why">${esc(typeLabel[company.type])} · ${esc(company.city)} · ${company.rank ? company.rank + "-е место" : "вне топ-20"}</p>
          <p class="why">Новый бизнес ${formatMoney(company.newBusiness)} · портфель ${formatMoney(company.portfolio)} · ${formatGrowth(company)}</p>
          <p class="why">${esc(segmentsOf(company.id).slice(0, 3).map((segment) => `${segment.label} ${segment.rank}`).join(", ") || "Нет строки в показанных сегментах")}</p>
          ${company.site ? `<a class="btn btn-dark" href="${esc(company.site)}" target="_blank" rel="noopener noreferrer">Официальный сайт</a>` : `<p class="fine">Сайт не указан, ИНН ${esc(company.inn)}</p>`}
        </div>
      </article>
    `).join("");
    lastFocus = document.activeElement;
    els.dialogBody.innerHTML = `
      <p class="kicker">Сравнение</p>
      <h2 id="dialog-title">Выбранные компании</h2>
      <div class="table-wrap compare-table-wrap"><table class="compare-table">
        <thead><tr><th>Показатель</th>${header}</tr></thead>
        <tbody>
          ${row("Тип", (company) => esc(typeLabel[company.type]))}
          ${row("Город", (company) => esc(company.city))}
          ${row("Место в общем рэнкинге", (company) => company.rank || "вне топ-20")}
          ${row("Новый бизнес 2025", (company) => formatMoney(company.newBusiness))}
          ${row("Портфель на 01.01.2026", (company) => formatMoney(company.portfolio))}
          ${row("Портфель за год", (company) => formatGrowth(company))}
          ${row("Сильные сегменты", (company) => esc(segmentsOf(company.id).slice(0, 3).map((segment) => `${segment.label} ${segment.rank}`).join(", ") || "—"))}
          ${row("Сайт", (company) => company.site ? `<a href="${esc(company.site)}" target="_blank" rel="noopener noreferrer">Открыть</a>` : "не указан")}
        </tbody>
      </table></div>
      <div class="compare-cards">${cards}</div>
    `;
    els.dialog.hidden = false;
    document.body.style.overflow = "hidden";
    els.dialog.querySelector(".dialog-x").focus();
  }

  function toggleCompare(id) {
    if (state.compare.includes(id)) {
      state.compare = state.compare.filter((item) => item !== id);
    } else if (state.compare.length >= 3) {
      toast("Сравнивать можно не больше трёх компаний");
      return;
    } else {
      state.compare.push(id);
    }
    try { sessionStorage.setItem("lizing-svod-compare", JSON.stringify(state.compare)); } catch (error) { /* storage may be blocked */ }
    if (!els.dialog.hidden && els.dialogBody.querySelector("#dialog-title")?.textContent === byId[id]?.name) {
      els.dialogBody.innerHTML = companyFacts(byId[id]);
    }
    render();
  }

  let toastTimer = 0;
  function toast(message) {
    els.toast.hidden = false;
    els.toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { els.toast.hidden = true; }, 2400);
  }

  function resetFilters() {
    state.q = "";
    state.segment = "";
    state.type = "";
    state.sort = "rank";
    state.scope = "top";
    writeUrl();
    render();
  }

  function fillSelect(select, options, placeholder) {
    select.innerHTML = (placeholder ? `<option value="">${esc(placeholder)}</option>` : "") + options.map((option) => `<option value="${esc(option.id)}">${esc(option.label)}</option>`).join("");
  }

  function bind() {
    els.q.addEventListener("input", () => {
      state.q = els.q.value;
      writeUrl();
      render();
    });
    els.type.addEventListener("change", () => {
      state.type = els.type.value;
      writeUrl();
      render();
    });
    els.sort.addEventListener("change", () => {
      state.sort = els.sort.value;
      writeUrl();
      render();
    });
    els.scope.addEventListener("click", (event) => {
      const button = event.target.closest("[data-scope]");
      if (!button) return;
      state.scope = button.dataset.scope;
      writeUrl();
      render();
    });
    document.querySelector("#picker-form").addEventListener("submit", (event) => {
      event.preventDefault();
      state.pickerSegment = els.pickerSegment.value;
      state.pickerClient = els.pickerClient.value;
      renderPicker();
    });
    els.navToggle.addEventListener("click", () => {
      const open = els.nav.classList.toggle("is-open");
      els.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    els.nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        els.nav.classList.remove("is-open");
        els.navToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.body.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.dataset.action;
      if (action === "segment") {
        state.segment = target.dataset.segment;
        writeUrl();
        render();
      } else if (action === "open") {
        openCompany(target.dataset.id);
      } else if (action === "compare" || action === "uncompare") {
        toggleCompare(target.dataset.id);
      } else if (action === "reset") {
        resetFilters();
      } else if (action === "view-segment") {
        state.activeSegment = target.dataset.segment;
        renderSegments();
      } else if (action === "open-compare") {
        openCompare();
      } else if (action === "clear-compare") {
        state.compare = [];
        sessionStorage.removeItem("lizing-svod-compare");
        render();
      } else if (action === "close") {
        closeDialog();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !els.dialog.hidden) closeDialog();
      if (event.key === "/" && document.activeElement !== els.q && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        els.q.focus();
      }
    });
    const links = [...els.nav.querySelectorAll("a")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
  }

  fillSelect(els.type, LEASING.types, "Любой тип");
  fillSelect(els.pickerSegment, LEASING.segments);
  fillSelect(els.pickerClient, LEASING.clients);
  try {
    const saved = JSON.parse(sessionStorage.getItem("lizing-svod-compare") || "[]");
    if (Array.isArray(saved)) state.compare = saved.filter((id) => byId[id]).slice(0, 3);
  } catch (error) {
    state.compare = [];
  }
  bind();
  renderBoard();
  renderTable();
  renderSegments();
  renderPicker();
  readUrl();
  render();
})();
