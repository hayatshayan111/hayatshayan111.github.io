
// Feeding Calculator
function calcRER(kg){ return 70 * Math.pow(kg, 0.75); }
function factor(age, activity, neutered){
  if (age === 'kitten') return 2.5;
  if (age === 'senior' || activity === 'low') return 1.0;
  if (activity === 'high') return 1.6;
  if (age === 'adult' && neutered === 'yes') return 1.2;
  if (age === 'adult' && neutered === 'no') return 1.4;
  return 1.2;
}

(function(){
  const form = document.getElementById('feed-form');
  const result = document.getElementById('feed-result');
  if (form && result){
    // Restore last inputs
    const saved = JSON.parse(localStorage.getItem('pc_feed_last')||'{}');
    ['weight','age','activity','neutered','kcal100'].forEach(id=>{
      if (saved[id] && document.getElementById(id)) document.getElementById(id).value = saved[id];
    });
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const kg = parseFloat(document.getElementById('weight').value);
      const age = document.getElementById('age').value;
      const activity = document.getElementById('activity').value;
      const neutered = document.getElementById('neutered').value;
      const kcal100 = parseFloat(document.getElementById('kcal100').value);
      if (!kg || kg < 0.5 || !kcal100 || kcal100 < 50){
        result.textContent = 'Please enter a realistic weight and kcal per 100g.';
        return;
      }
      const rer = calcRER(kg);
      const f = factor(age, activity, neutered);
      const dailyKcal = rer * f;
      const grams = (dailyKcal / kcal100) * 100;
      localStorage.setItem('pc_feed_last', JSON.stringify({weight:kg, age, activity, neutered, kcal100}));
      result.innerHTML = `<strong>Daily Calories:</strong> ${dailyKcal.toFixed(0)} kcal<br>
                          <strong>Daily Food:</strong> ${grams.toFixed(0)} g (based on ${kcal100} kcal/100g)`;
    });
  }

  // Litter Log
  const lForm = document.getElementById('litter-form');
  const rows = document.getElementById('litter-rows');
  const exportBtn = document.getElementById('export-json');
  const KEY = 'pc_litter_log';

  function loadLog(){ return JSON.parse(localStorage.getItem(KEY)||'[]'); }
  function saveLog(data){ localStorage.setItem(KEY, JSON.stringify(data)); }
  function render(){
    const data = loadLog().sort((a,b)=> (a.date+b.time < b.date+a.time ? 1 : -1));
    rows.innerHTML = data.map((item, idx)=> `<tr>
      <td>${item.date}</td><td>${item.time}</td><td>${item.note||''}</td>
      <td><button class="btn" data-del="${idx}" aria-label="Delete entry ${idx+1}">Delete</button></td>
    </tr>`).join('');
  }

  if (lForm && rows){
    lForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const date = document.getElementById('lit-date').value;
      const time = document.getElementById('lit-time').value;
      const note = document.getElementById('lit-note').value.trim();
      if (!date || !time){ return; }
      const data = loadLog();
      data.push({date, time, note});
      saveLog(data);
      lForm.reset();
      render();
    });
    rows.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-del]');
      if (!btn) return;
      const idx = parseInt(btn.getAttribute('data-del'),10);
      const data = loadLog();
      data.splice(idx,1);
      saveLog(data);
      render();
    });
    exportBtn && exportBtn.addEventListener('click', ()=>{
      const data = loadLog();
      const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'litter-log.json'; a.click();
      URL.revokeObjectURL(url);
    });
    render();
  }
})();
