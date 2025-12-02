// Admin panel - client side (localStorage)
const PASS = 'admin123';
function el(tag, attrs={}, inner=''){ const e=document.createElement(tag); Object.assign(e, attrs); if(inner) e.innerHTML = inner; return e; }
function getData(){ return { children: JSON.parse(localStorage.getItem('potencial_child_services')||'null')||[], adults: JSON.parse(localStorage.getItem('potencial_adult_services')||'null')||[], photos: JSON.parse(localStorage.getItem('potencial_photos')||'[]') }; }
function saveData(d){ localStorage.setItem('potencial_child_services', JSON.stringify(d.children)); localStorage.setItem('potencial_adult_services', JSON.stringify(d.adults)); localStorage.setItem('potencial_photos', JSON.stringify(d.photos)); }
function renderEditors(){
  const d=getData();
  const sE=document.getElementById('servicesEditor'); sE.innerHTML='';
  d.children.forEach((s,i)=>{
    const row=el('div'); const t=el('input',{value:s.title,style:'width:100%;margin-bottom:6px;'});
    const desc=el('input',{value:s.desc||'',style:'width:100%;margin-bottom:6px;'}); const p1=el('input',{value:s.price_hour||'',style:'width:48%;margin-right:4%;'}); const p2=el('input',{value:s.price_half||'',style:'width:48%;'});
    const del=el('button',{className:'btn',style:'margin-top:6px;'},'Удалить'); del.addEventListener('click',()=>{ d.children.splice(i,1); saveData(d); renderEditors(); });
    t.addEventListener('input',()=>{ s.title=t.value; saveData(d); }); desc.addEventListener('input',()=>{ s.desc=desc.value; saveData(d); }); p1.addEventListener('input',()=>{ s.price_hour=p1.value; saveData(d); }); p2.addEventListener('input',()=>{ s.price_half=p2.value; saveData(d); });
    row.appendChild(t); row.appendChild(desc); row.appendChild(p1); row.appendChild(p2); row.appendChild(del); sE.appendChild(row);
  });
  const pE=document.getElementById('productsEditor'); pE.innerHTML='';
  d.adults.forEach((p,i)=>{
    const row=el('div'); const t=el('input',{value:p.title,style:'width:100%;margin-bottom:6px;'}); const desc=el('input',{value:p.desc||'',style:'width:100%;'});
    const del=el('button',{className:'btn',style:'margin-top:6px;'},'Удалить'); del.addEventListener('click',()=>{ d.adults.splice(i,1); saveData(d); renderEditors(); });
    t.addEventListener('input',()=>{ p.title=t.value; saveData(d); }); desc.addEventListener('input',()=>{ p.desc=desc.value; saveData(d); });
    row.appendChild(t); row.appendChild(desc); row.appendChild(del); pE.appendChild(row);
  });
  const ph=document.getElementById('photoPreview'); ph.innerHTML=''; d.photos.forEach((s,i)=>{ const w=el('div'); const img=el('img',{src:s,style:'height:100px;border-radius:8px;margin-right:6px'}); const del=el('button',{className:'btn',style:'display:block;margin-top:6px;'},'Удалить'); del.addEventListener('click',()=>{ d.photos.splice(i,1); saveData(d); renderEditors(); }); w.appendChild(img); w.appendChild(del); ph.appendChild(w); });
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('loginBtn').addEventListener('click',()=>{
    if(document.getElementById('adminPass').value===PASS){ document.getElementById('adminArea').style.display='block'; document.getElementById('loginMsg').textContent='Вход выполнен'; renderEditors(); } else { document.getElementById('loginMsg').textContent='Неверный пароль'; }
  });
  document.getElementById('addService').addEventListener('click',()=>{ const d=getData(); d.children.push({id:Date.now(),title:'Новая услуга',desc:'',price_hour:'',price_half:''}); saveData(d); renderEditors(); });
  document.getElementById('addProduct').addEventListener('click',()=>{ const d=getData(); d.adults.push({id:Date.now(),title:'Новый продукт',desc:''}); saveData(d); renderEditors(); });
  document.getElementById('photoInput').addEventListener('change',(e)=>{ const files=Array.from(e.target.files); const d=getData(); files.forEach(f=>{ const r=new FileReader(); r.onload=function(ev){ d.photos.push(ev.target.result); saveData(d); renderEditors(); }; r.readAsDataURL(f); }); });
  document.getElementById('saveAll').addEventListener('click',()=>{ alert('Данные сохранены в браузере (localStorage).'); });
});