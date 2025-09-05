<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Kaizo ROI Calculator — Wizard</title>
<style>
  :root{--bg:#0b1020;--card:#111936;--muted:#9fb0d9;--text:#e9f0ff;--accent:#66a3ff;--good:#19c37d}
  *{box-sizing:border-box;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
  body{margin:0;background:linear-gradient(180deg,var(--bg),var(--bg) 60%,#0e1530);color:var(--text)}
  .wrap{max-width:820px;margin:0 auto;padding:20px}
  header{padding-top:24px;padding-bottom:8px}
  .top{display:flex;align-items:center;gap:10px}
  .logo{height:26px}
  .dot{width:8px;height:8px;border-radius:999px;background:var(--good);box-shadow:0 0 14px rgba(25,195,125,.7)}
  h1{margin:0;font-size:20px;font-weight:600;letter-spacing:.2px}
  .stepper{display:flex;gap:8px;margin-top:10px}
  .stepper div{flex:1;height:8px;border-radius:999px;background:rgba(255,255,255,.08)}
  .stepper .on{background:var(--good)}
  .card{background:var(--card);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:16px;box-shadow:0 8px 24px rgba(0,0,0,.25);margin-bottom:16px}
  .card h2{margin:0 0 10px;font-size:16px}
  label{display:block;font-size:12px;margin:10px 0 6px;color:#c8d8ff}
  input{width:100%;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#0b1228;color:var(--text);outline:none}
  input:focus{border-color:var(--accent)}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  @media (max-width:820px){.grid2{grid-template-columns:1fr}}
  .kpi{display:flex;align-items:center;justify-content:space-between;margin:10px 0;padding:10px 12px;background:#0c1430;border:1px solid rgba(255,255,255,.08);border-radius:12px}
  .kpi .lab{color:#c8d8ff;font-size:12px}
  .kpi .val{font-weight:700}
  .big{font-size:22px}
  .good{color:var(--good)}
  .rowbtn{display:flex;justify-content:space-between;gap:10px;margin-top:14px}
  .btn{padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#0b1228;color:#e9f0ff;cursor:pointer}
  .muted{font-size:12px;color:#8fa6db}
  footer{color:#8fa6db;font-size:12px;margin:10px 0 26px;text-align:left}
  .hero{width:100%;height:160px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:
    radial-gradient(120px 80px at 20% 50%, #1a2f6c, transparent),
    radial-gradient(140px 90px at 70% 40%, #143d3a, transparent),
    linear-gradient(160deg,#0a1025,#0b1432 70%,#0c1a3e)}
</style>
</head>
<body>
  <div class="wrap">
    <header>
      <div class="top">
        <!-- Inline “Kaizo” wordmark so it always renders -->
        <svg class="logo" viewBox="0 0 120 24" aria-label="Kaizo"><text x="0" y="18" font-size="18" font-family="Inter,system-ui,sans-serif" fill="#e9f0ff" opacity="0.95">KAIZO</text></svg>
        <div class="dot"></div>
        <h1 id="title">ROI Calculator — Step <span id="stepNo">1</span> of 3</h1>
      </div>
      <div class="stepper"><div id="s1" class="on"></div><div id="s2"></div><div id="s3"></div></div>
    </header>

    <main id="app"></main>

    <footer>Client-side only demo. Build: <span id="build"></span></footer>
  </div>

<script>
  // ---------- Utilities ----------
  const $ = (id) => document.getElementById(id);
  const fmt = (v, cur) => (cur || '$') + Number(v).toLocaleString(undefined,{maximumFractionDigits:0});

  const state = {
    step: 1,
    inputs: {
      agents: 25,
      agentCostYear: 60000,
      ticketsPerMonth: 30000,
      aht: 7,
      hoursYear: 2080,
      currency: '$',
      ahtReductionPct: 12,
      qaHoursBaseline: 6,
      qaAutomationPct: 70,
      managerHoursSaved: 1.5,
      revenueProtected: 0,
    }
  };

  function compute(i){
    const hourlyCost = i.agentCostYear / i.hoursYear;
    const minutesSavedPerTicket = i.aht * (i.ahtReductionPct/100);
    const hoursSavedPerMonth = (i.ticketsPerMonth * minutesSavedPerTicket) / 60;
    const ahtSavings = hoursSavedPerMonth * 12 * hourlyCost;
    const qaHoursSavedPerAgentYear = i.qaHoursBaseline * (i.qaAutomationPct/100) * 12;
    const qaSavings = qaHoursSavedPerAgentYear * i.agents * hourlyCost;
    const mgrSavings = i.managerHoursSaved * 12 * i.agents * hourlyCost;
    const total = ahtSavings + qaSavings + mgrSavings + i.revenueProtected;
    return {hourlyCost,ahtSavings,qaSavings,mgrSavings,total};
  }

  function setStep(n){
    state.step = n;
    $('stepNo').textContent = n;
    ['s1','s2','s3'].forEach((id,idx)=>{ $(id).className = (idx < n) ? 'on' : ''; });
    render();
  }

  // ---------- Screens ----------
  function screenInputs(){
    const i = state.inputs;
    return `
      <div class="grid2">
        <section class="card">
          <h2>Team & Cost Assumptions</h2>
          <div class="grid2">
            <div><label>Number of agents</label><input id="agents" type="number" min="1" value="${i.agents}"></div>
            <div><label>Fully-loaded cost per agent / year (USD)</label><input id="agentCostYear" type="number" min="0" step="500" value="${i.agentCostYear}"></div>
          </div>
          <div class="grid2">
            <div><label>Tickets per month (total)</label><input id="ticketsPerMonth" type="number" min="0" step="100" value="${i.ticketsPerMonth}"></div>
            <div><label>Baseline AHT (minutes)</label><input id="aht" type="number" min="0" step="0.1" value="${i.aht}"></div>
          </div>
          <div class="grid2">
            <div><label>Work hours per agent / year</label><input id="hoursYear" type="number" min="1" step="10" value="${i.hoursYear}"></div>
            <div><label>Currency symbol</label><input id="currency" type="text" value="${i.currency}"></div>
          </div>
        </section>

        <section class="card">
          <h2>Expected Kaizo Impact</h2>
          <div class="grid2">
            <div><label>AHT reduction (%) via coaching insights</label><input id="ahtReductionPct" type="number" min="0" max="100" step="1" value="${i.ahtReductionPct}"></div>
            <div><label>QA hours per agent / month (baseline manual)</label><input id="qaHoursBaseline" type="number" min="0" step="0.5" value="${i.qaHoursBaseline}"></div>
          </div>
          <div class="grid2">
            <div><label>QA automation coverage with Kaizo (%)</label><input id="qaAutomationPct" type="number" min="0" max="100" step="1" value="${i.qaAutomationPct}"></div>
            <div><label>Manager coaching hours saved / agent / month</label><input id="managerHoursSaved" type="number" min="0" step="0.1" value="${i.managerHoursSaved}"></div>
          </div>
          <div>
            <label>Optional: Annual revenue protected from CSAT uplift (USD)</label>
            <input id="revenueProtected" type="number" min="0" step="1000" value="${i.revenueProtected}">
            <div class="muted">If you expect fewer churned customers or upsell gains, add a conservative estimate here.</div>
          </div>
        </section>
      </div>

      <div class="rowbtn">
        <span></span>
        <button class="btn" id="continue1">Continue</button>
      </div>
    `;
  }

  function screenScenarios(){
    const i = state.inputs;
    return `
      <section class="card">
        <h2>Scenario Planner</h2>
        <div class="grid2">
          <div><label>Scenario AHT reduction (%)</label><input id="s_ahtReductionPct" type="number" min="0" max="100" step="1" value="${i.ahtReductionPct}"></div>
          <div><label>Scenario QA automation (%)</label><input id="s_qaAutomationPct" type="number" min="0" max="100" step="1" value="${i.qaAutomationPct}"></div>
        </div>
        <div class="grid2">
          <div><label>Scenario manager hours saved / agent / month</label><input id="s_managerHoursSaved" type="number" min="0" step="0.1" value="${i.managerHoursSaved}"></div>
          <div><label>Scenario revenue protected (annual)</label><input id="s_revenueProtected" type="number" min="0" step="1000" value="${i.revenueProtected}"></div>
        </div>
        <div class="muted" style="margin-top:6px">Tune assumptions — totals on next screen.</div>
      </section>

      <div class="rowbtn">
        <button class="btn" id="back2">Back</button>
        <button class="btn" id="continue2">Continue</button>
      </div>
    `;
  }

  function screenResults(){
    const i = state.inputs, o = compute(i);
    return `
      <section class="card">
        <h2>Annual Impact (Estimated)</h2>
        <div class="kpi"><div class="lab">Labor savings from faster handling (AHT)</div><div class="val">${fmt(o.ahtSavings,i.currency)}</div></div>
        <div class="kpi"><div class="lab">Labor savings from QA automation</div><div class="val">${fmt(o.qaSavings,i.currency)}</div></div>
        <div class="kpi"><div class="lab">Manager time savings</div><div class="val">${fmt(o.mgrSavings,i.currency)}</div></div>
        <div class="kpi"><div class="lab">Revenue protected (optional)</div><div class="val">${fmt(i.revenueProtected,i.currency)}</div></div>
        <div class="kpi"><div class="lab"><span class="big">Total Annual Impact</span></div><div class="val big good">${fmt(o.total,i.currency)}</div></div>
        <div class="muted">All figures are directional estimates for planning. Adjust inputs to fit your environment.</div>

        <!-- Bottom image/banner -->
        <div class="hero" style="margin-top:14px"></div>
        <div class="muted" style="margin-top:6px">Example visualization — swap for product screenshots or a customer logo wall.</div>
      </section>

      <div class="rowbtn">
        <div>
          <button class="btn" id="back3">Back</button>
          <button class="btn" id="restart">Start Over</button>
        </div>
        <button class="btn" id="download">Download CSV</button>
      </div>
    `;
  }

  // ---------- Rendering & Wiring ----------
  function render(){
    const app = $('app');
    if (state.step === 1) app.innerHTML = screenInputs();
    if (state.step === 2) app.innerHTML = screenScenarios();
    if (state.step === 3) app.innerHTML = screenResults();

    // wire inputs to state (generic)
    document.querySelectorAll('input').forEach(inp=>{
      inp.addEventListener('input', e=>{
        const id = e.target.id;
        const val = (e.target.type === 'number') ? +e.target.value : e.target.value;
        // map scenario IDs to base keys
        const map = {
          s_ahtReductionPct:'ahtReductionPct',
          s_qaAutomationPct:'qaAutomationPct',
          s_managerHoursSaved:'managerHoursSaved',
          s_revenueProtected:'revenueProtected'
        };
        const key = map[id] || id;
        if (key in state.inputs) state.inputs[key] = val;
      });
    });

    // nav buttons
    const c1 = $('continue1'); if(c1) c1.onclick=()=>setStep(2);
    const b2 = $('back2');     if(b2) b2.onclick=()=>setStep(1);
    const c2 = $('continue2'); if(c2) c2.onclick=()=>setStep(3);
    const b3 = $('back3');     if(b3) b3.onclick=()=>setStep(2);
    const rs = $('restart');   if(rs) rs.onclick=()=>{ state.inputs = {...state.inputs}; setStep(1); };

    // download csv
    const dl = $('download');
    if (dl) dl.onclick=()=>{
      const i = state.inputs, o = compute(i);
      const rows = [
        ['Metric','Value'],
        ['Number of agents', i.agents],
        ['Cost per agent / year', i.agentCostYear],
        ['Tickets per month', i.ticketsPerMonth],
        ['Baseline AHT (min)', i.aht],
        ['AHT reduction %', i.ahtReductionPct],
        ['QA hours baseline / agent / month', i.qaHoursBaseline],
        ['QA automation %', i.qaAutomationPct],
        ['Manager hours saved / agent / month', i.managerHoursSaved],
        ['Revenue protected (annual)', i.revenueProtected],
        ['AHT labor savings (annual)', Math.round(o.ahtSavings)],
        ['QA automation savings (annual)', Math.round(o.qaSavings)],
        ['Manager time savings (annual)', Math.round(o.mgrSavings)],
        ['Total annual impact', Math.round(o.total)]
      ];
      const csv = rows.map(r=>r.join(',')).join('\n');
      const blob = new Blob([csv], {type:'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'kaizo-roi-snapshot.csv';
      document.body.appendChild(a); a.click();
      setTimeout(()=>{ URL.revokeObjectURL(url); a.remove(); }, 400);
    };
  }

  $('build').textContent = new Date().toISOString();
  render();
</script>
</body>
</html>
