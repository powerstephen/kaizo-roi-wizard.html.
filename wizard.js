// Show build time
const $ = (id) => document.getElementById(id);
const safeSet = (id, val) => { const el = $(id); if (el) el.textContent = val; };
safeSet('build', new Date().toISOString());

// Helpers & math
const fmt = (v, cur) => (cur || '$') + Number(v).toLocaleString(undefined,{maximumFractionDigits:0});
const throughputToAHTReduction = (pct) => {
  const f = 1 + (pct/100);
  return f > 0 ? (1 - (1/f)) * 100 : 0;
};

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
    annualRevenueAtRisk: 500000,
    csatUpliftPct: 0,
    revenueProtected: 0
  }
};

const computeRevenueProtected = (i) =>
  (i.annualRevenueAtRisk || 0) * (i.csatUpliftPct || 0) / 100;

function compute(i){
  const hourlyCost = i.agentCostYear / i.hoursYear;
  const revenueProtectedAuto = computeRevenueProtected(i);
  const revenueProtected = (i.revenueProtected && i.revenueProtected > 0) ? i.revenueProtected : revenueProtectedAuto;

  const minutesSavedPerTicket = i.aht * (i.ahtReductionPct/100);
  const hoursSavedPerMonth = (i.ticketsPerMonth * minutesSavedPerTicket) / 60;
  const ahtSavings = hoursSavedPerMonth * 12 * hourlyCost;

  const qaHoursSavedPerAgentYear = i.qaHoursBaseline * (i.qaAutomationPct/100) * 12;
  const qaSavings = qaHoursSavedPerAgentYear * i.agents * hourlyCost;

  const mgrSavings = i.managerHoursSaved * 12 * i.agents * hourlyCost;

  const total = ahtSavings + qaSavings + mgrSavings + revenueProtected;
  return {hourlyCost,ahtSavings,qaSavings,mgrSavings,revenueProtected,total};
}

// Views
function screenInputs(i){
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
      </section>
    </div>

    <section class="card">
      <h2>CSAT → Revenue Protection</h2>
      <div class="grid2">
        <div><label>Annual revenue at risk (USD)</label><input id="annualRevenueAtRisk" type="number" min="0" step="1000" value="${i.annualRevenueAtRisk}"></div>
        <div><label>CSAT uplift (%)</label><input id="csatUpliftPct" type="number" min="0" max="100" step="1" value="${i.csatUpliftPct}"></div>
      </div>
      <div class="grid2">
        <div><label>Revenue protected (auto from CSAT) — you can override</label><input id="revenueProtected" type="number" min="0" step="1000" value="${i.revenueProtected || 0}"></div>
        <div><div class="muted" style="margin-top:34px">Tip: leave at 0 to auto-calc from the two fields on the left.</div></div>
      </div>
    </section>

    <div class="rowbtn">
      <span></span>
      <button class="btn" id="continue1">Continue</button>
    </div>`;
}

function screenScenarios(i){
  const effAhtFrom50 = throughputToAHTReduction(50); // ~33.3%
  return `
    <section class="card">
      <h2>Case-Study Presets</h2>
      <div class="presets">
        <div class="preset">
          <h3>Foot Locker</h3>
          <div class="badge">Resolution Time ↓ 75%</div>
          <div class="muted">Apply a high AHT reduction to mimic large handling-time gains.</div>
          <button class="btn" id="presetFoot">Apply</button>
        </div>
        <div class="preset">
          <h3>Trading 212</h3>
          <div class="badge">CSAT ↑ 93%</div>
          <div class="muted">Use CSAT uplift to auto-calc revenue protected from churn/retention.</div>
          <button class="btn" id="presetT212">Apply</button>
        </div>
        <div class="preset">
          <h3>Gaming1</h3>
          <div class="badge">Ticket Processing ↑ 50%</div>
          <div class="muted">Convert throughput gains into effective AHT reduction (~${effAhtFrom50.toFixed(1)}%).</div>
          <button class="btn" id="presetG1">Apply</button>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>Tune Scenario</h2>
      <div class="grid2">
        <div><label>AHT reduction (%)</label><input id="s_ahtReductionPct" type="number" min="0" max="100" step="1" value="${i.ahtReductionPct}"></div>
        <div><label>QA automation (%)</label><input id="s_qaAutomationPct" type="number" min="0" max="100" step="1" value="${i.qaAutomationPct}"></div>
      </div>
      <div class="grid2">
        <div><label>Manager hours saved / agent / month</label><input id="s_managerHoursSaved" type="number" min="0" step="0.1" value="${i.managerHoursSaved}"></div>
        <div><label>CSAT uplift (%)</label><input id="s_csatUpliftPct" type="number" min="0" max="100" step="1" value="${i.csatUpliftPct}"></div>
      </div>
      <div class="grid2">
        <div><label>Annual revenue at risk (USD)</label><input id="s_annualRevenueAtRisk" type="number" min="0" step="1000" value="${i.annualRevenueAtRisk}"></div>
        <div><label>Revenue protected (override)</label><input id="s_revenueProtected" type="number" min="0" step="1000" value="${i.revenueProtected || 0}"></div>
      </div>
    </section>

    <div class="rowbtn">
      <button class="btn" id="back2">Back</button>
      <button class="btn" id="continue2">Continue</button>
    </div>`;
}

function screenResults(i){
  const o = compute(i);
  return `
    <section class="card">
      <h2>Annual Impact (Estimated)</h2>
      <div class="kpi"><div class="lab">Labor savings from faster handling (AHT)</div><div class="val">${fmt(o.ahtSavings,i.currency)}</div></div>
      <div class="kpi"><div class="lab">Labor savings from QA automation</div><div class="val">${fmt(o.qaSavings,i.currency)}</div></div>
      <div class="kpi"><div class="lab">Manager time savings</div><div class="val">${fmt(o.mgrSavings,i.currency)}</div></div>
      <div class="kpi"><div class="lab">Revenue protected (CSAT uplift)</div><div class="val">${fmt(o.revenueProtected,i.currency)}</div></div>
      <div class="kpi"><div class="lab"><span class="big">Total Annual Impact</span></div><div class="val big good">${fmt(o.total,i.currency)}</div></div>
      <div class="muted">All figures are directional estimates for planning. Adjust inputs to fit your environment.</div>

      <div class="hero" style="margin-top:14px"></div>
      <div class="muted" style="margin-top:6px">Swap this banner for product screenshots or a customer logo wall.</div>
    </section>

    <div class="rowbtn">
      <div>
        <button class="btn" id="back3">Back</button>
        <button class="btn" id="restart">Start Over</button>
      </div>
      <button class="btn" id="download">Download CSV</button>
    </div>`;
}

// Bindings
function bindInputs(){
  document.querySelectorAll('input').forEach(inp=>{
    inp.addEventListener('input', e=>{
      const id = e.target.id;
      const val = (e.target.type === 'number') ? +e.target.value : e.target.value;
      const map = {
        s_ahtReductionPct:'ahtReductionPct',
        s_qaAutomationPct:'qaAutomationPct',
        s_managerHoursSaved:'managerHoursSaved',
        s_csatUpliftPct:'csatUpliftPct',
        s_annualRevenueAtRisk:'annualRevenueAtRisk',
        s_revenueProtected:'revenueProtected'
      };
      const key = map[id] || id;
      if (key in state.inputs) state.inputs[key] = val;
    });
  });
}

function bindNav(){
  const c1 = $('continue1'); if(c1) c1.addEventListener('click', ()=>setStep(2));
  const b2 = $('back2');     if(b2) b2.addEventListener('click',  ()=>setStep(1));
  const c2 = $('continue2'); if(c2) c2.addEventListener('click', ()=>setStep(3));
  const b3 = $('back3');     if(b3) b3.addEventListener('click',  ()=>setStep(2));
  const rs = $('restart');   if(rs) rs.addEventListener('click',  ()=>{ state.inputs = {...state.inputs}; setStep(1); });

  const dl = $('download');
  if (dl) dl.addEventListener('click', ()=>{
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
      ['Annual revenue at risk', i.annualRevenueAtRisk],
      ['CSAT uplift %', i.csatUpliftPct],
      ['Revenue protected (annual)', Math.round(o.revenueProtected)],
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
  });
}

function bindPresets(){
  const foot = $('presetFoot');
  if (foot) foot.addEventListener('click', ()=>{
    state.inputs.ahtReductionPct = 75;
    state.inputs.qaAutomationPct = Math.max(state.inputs.qaAutomationPct, 70);
    state.inputs.managerHoursSaved = Math.max(state.inputs.managerHoursSaved, 1.5);
    render();
  });

  const t212 = $('presetT212');
  if (t212) t212.addEventListener('click', ()=>{
    state.inputs.csatUpliftPct = 93;
    state.inputs.annualRevenueAtRisk = state.inputs.annualRevenueAtRisk || 500000;
    state.inputs.revenueProtected = 0; // let auto-calc kick in
    render();
  });

  const g1 = $('presetG1');
  if (g1) g1.addEventListener('click', ()=>{
    const eff = throughputToAHTReduction(50); // ~33.3%
    state.inputs.ahtReductionPct = Math.max(state.inputs.ahtReductionPct, +eff.toFixed(1));
    render();
  });
}

// Router-ish
function setStep(n){
  state.step = n;
  ['s1','s2','s3'].forEach((id,idx)=>{ const el=$(id); if(el) el.className = (idx < n) ? 'on' : ''; });
  render();
}

function render(){
  const app = $('app');
  if (!app) return;
  if (state.step === 1) app.innerHTML = screenInputs(state.inputs);
  if (state.step === 2) app.innerHTML = screenScenarios(state.inputs);
  if (state.step === 3) app.innerHTML = screenResults(state.inputs);
  bindInputs();
  bindNav();
  bindPresets();
}

// Init
window.addEventListener('DOMContentLoaded', render);
