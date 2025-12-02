// App logic - loads data from localStorage or defaults
const DEFAULT_CHILD_SERVICES = [
  {id:1, title:'Занятие со специалистом (дети)', desc:'Индивидуальная коррекционная работа', price_hour:'1000 ₽ / 60 мин', price_half:'600 ₽ / 30 мин'},
  {id:2, title:'ИППСУ', desc:'Бесплатно по направлению', price_hour:'бесплатно', price_half:''},
  {id:3, title:'Занятие 30 мин', desc:'Короткие сессии', price_hour:'', price_half:'600 ₽ / 30 мин'}
];
const DEFAULT_ADULT_SERVICES = [
  {id:1, title:'Остеопат', desc:'Реабилитация и мануальная терапия', price_hour:'1000 ₽ / 60 мин', price_half:'600 ₽ / 30 мин'},
  {id:2, title:'Психолог', desc:'Индивидуальная терапия', price_hour:'1000 ₽ / 60 мин', price_half:'600 ₽ / 30 мин'},
  {id:3, title:'Юрист (ведущий)', desc:'Консультации по правовым вопросам', price_hour:'1000 ₽ / 60 мин', price_half:'600 ₽ / 30 мин'}
];

function formatServices(list){
  return list.map(s=>`<div class="service"><strong>${s.title}</strong><div class="desc">${s.desc || ''}</div><div class="price">${s.price_hour || ''} ${s.price_half || ''}</div></div>`).join('');
}

function loadData(){
  const children = JSON.parse(localStorage.getItem('potencial_child_services') || 'null') || DEFAULT_CHILD_SERVICES;
  const adults = JSON.parse(localStorage.getItem('potencial_adult_services') || 'null') || DEFAULT_ADULT_SERVICES;
  const photos = JSON.parse(localStorage.getItem('potencial_photos') || '[]');
  document.getElementById('servicesList').innerHTML = formatServices(children);
  document.getElementById('productsList').innerHTML = formatServices(adults);
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = photos.length ? photos.map((src,i)=>`<img src="${src}" alt="Фото ${i+1}">`).join('') : '<p>Фотографий пока нет.</p>';
}

document.addEventListener('DOMContentLoaded', ()=>{
  loadData();
  document.getElementById('callBtn').addEventListener('click', ()=> location.href='tel:+79676397663');
  document.getElementById('whatsappBtn').addEventListener('click', ()=> location.href='https://wa.me/79676397663');
  document.getElementById('telegramBtn').addEventListener('click', ()=> location.href='https://t.me/+7trVEaoAal81NjU6');
  document.getElementById('contactUsBtn').addEventListener('click', ()=> location.href='https://t.me/+7trVEaoAal81NjU6');
  document.getElementById('shareBtn').addEventListener('click', async ()=>{
    if(navigator.share){
      try{ await navigator.share({title:'Группа компаний «Потенциал»', text:'Посмотри витрину услуг АНО «Потенциал»', url:window.location.href}); }catch(e){}
    }else{ alert('Функция "Поделиться" не поддерживается вашим устройством.'); }
  });
});