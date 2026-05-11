const ru = {
  baku:'Баку',
  istanbul:'Стамбул',
  dubai:'Дубай',
  tbilisi:'Тбилиси',
  london:'Лондон',
  doha:'Доха',
  frankfurt:'Франкфурт',
  budapest:'Будапешт',
  moscow:'Москва',
  ankara:'Анкара'
};

const typeLabels = {
  departure:'Вылет',
  arrival:'Прилет'
};

const statusLabels = {
  'on-time':'По расписанию',
  'check-in':'Регистрация',
  boarding:'Посадка',
  delayed:'Задержан',
  arrived:'Прибыл'
};

const statusClass = {
  'on-time':'green',
  'check-in':'green',
  boarding:'orange',
  delayed:'red',
  arrived:'green'
};

const flights = [
  { code:'J2 075', airline:'AZAL', type:'departure', city:ru.istanbul, alias:'Istanbul', time:'08:20', terminal:'T1', gate:'A4', status:'check-in' },
  { code:'QR 354', airline:'Qatar Airways', type:'arrival', city:ru.doha, alias:'Doha', time:'09:10', terminal:'T1', gate:'B2', status:'arrived' },
  { code:'TK 333', airline:'Turkish Airlines', type:'departure', city:ru.ankara, alias:'Ankara', time:'10:35', terminal:'T1', gate:'A8', status:'on-time' },
  { code:'FZ 710', airline:'flydubai', type:'departure', city:ru.dubai, alias:'Dubai', time:'11:05', terminal:'T2', gate:'C1', status:'boarding' },
  { code:'LH 613', airline:'Lufthansa', type:'arrival', city:ru.frankfurt, alias:'Frankfurt', time:'12:15', terminal:'T1', gate:'B6', status:'delayed' },
  { code:'J2 011', airline:'AZAL', type:'departure', city:ru.london, alias:'London', time:'13:40', terminal:'T1', gate:'A2', status:'on-time' },
  { code:'WZ 462', airline:'Wizz Air', type:'arrival', city:ru.tbilisi, alias:'Tbilisi', time:'15:00', terminal:'T2', gate:'C3', status:'arrived' },
  { code:'SU 1854', airline:'Aeroflot', type:'departure', city:ru.moscow, alias:'Moscow', time:'17:25', terminal:'T1', gate:'A6', status:'delayed' },
  { code:'J2 922', airline:'AZAL', type:'departure', city:ru.tbilisi, alias:'Tbilisi', time:'18:10', terminal:'T2', gate:'C5', status:'check-in' },
  { code:'TK 337', airline:'Turkish Airlines', type:'arrival', city:ru.istanbul, alias:'Istanbul', time:'19:30', terminal:'T1', gate:'B4', status:'on-time' },
  { code:'FZ 712', airline:'flydubai', type:'arrival', city:ru.dubai, alias:'Dubai', time:'21:30', terminal:'T2', gate:'C2', status:'on-time' },
  { code:'J2 403', airline:'AZAL', type:'departure', city:ru.budapest, alias:'Budapest', time:'22:15', terminal:'T1', gate:'A1', status:'on-time' }
];

const services = [
  {
    id:'baggage',
    icon:'🧳',
    title:'Багажная служба',
    text:'Помощь при потере багажа и оформление заявлений.',
    place:'зал прилета',
    time:'24/7',
    details:[
      ['Стойка','B12, зал прилета T1'],
      ['Срок рассмотрения','до 24 часов'],
      ['Нужно иметь','паспорт и багажную бирку'],
      ['Телефон','+994 12 555 10 01']
    ],
    action:'Оформить обращение'
  },
  {
    id:'parking',
    icon:'🅿',
    title:'Парковка',
    text:'Краткосрочная и долгосрочная парковка у терминалов.',
    place:'T1/T2',
    time:'24/7',
    details:[
      ['Краткосрочная','2 AZN за час'],
      ['У терминала','3 AZN за час'],
      ['Долгосрочная','10 AZN за сутки'],
      ['Крытая зона','+5 AZN к оплате']
    ],
    action:'Посмотреть тарифы'
  },
  {
    id:'vip',
    icon:'💼',
    title:'VIP-зал',
    text:'Комфортная зона ожидания, Wi-Fi и сопровождение.',
    place:'2 этаж',
    time:'06:00-23:00',
    details:[
      ['Стоимость','45 AZN за пассажира'],
      ['Включено','Wi-Fi, напитки, зона отдыха'],
      ['Регистрация','за 2 часа до вылета'],
      ['Расположение','T1, 2 этаж']
    ],
    action:'Проверить доступность'
  },
  {
    id:'food',
    icon:'☕',
    title:'Кафе и рестораны',
    text:'Кафе, рестораны и зоны быстрого питания.',
    place:'T1/T2',
    time:'24/7',
    details:[
      ['Зоны','до контроля и после контроля'],
      ['Средний чек','8-18 AZN'],
      ['Открыто сейчас','5 заведений'],
      ['Оплата','карта и наличные']
    ],
    action:'Посмотреть точки'
  },
  {
    id:'medical',
    icon:'🛡',
    title:'Медпункт',
    text:'Первая медицинская помощь пассажирам.',
    place:'T1',
    time:'24/7',
    details:[
      ['Кабинет','T1, рядом с информационной стойкой'],
      ['Помощь','осмотр, давление, первая помощь'],
      ['Экстренно','103 или стойка информации'],
      ['Стоимость','бесплатно']
    ],
    action:'Показать расположение'
  },
  {
    id:'exchange',
    icon:'💳',
    title:'Обмен валют',
    text:'Банкоматы и пункты обмена валют в терминалах.',
    place:'1 этаж',
    time:'09:00-22:00',
    details:[
      ['Валюты','USD, EUR, TRY, GEL'],
      ['Банкоматы','T1 - 4, T2 - 2'],
      ['Комиссия','по тарифу банка'],
      ['Расположение','1 этаж, зона прилета']
    ],
    action:'Найти пункт'
  }
];

let activeServiceId = 'parking';
const watchedFlights = new Set();
const supportRequests = [];
const topicLabels = {
  Ticket:'Рейс',
  Baggage:'Багаж',
  Refund:'Другое',
  Services:'Услуги'
};

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

function detailRows(rows){
  return rows.map(row => `<li><span>${row[0]}</span><strong>${row[1]}</strong></li>`).join('');
}

function getActiveService(){
  return services.find(service => service.id === activeServiceId) || services[0];
}

function applyQueryParams(){
  const search = $('#flightSearch');
  if(!search) return;
  const params = new URLSearchParams(location.search);
  search.value = params.get('query') || '';
  $('#typeFilter').value = params.get('type') || 'all';
  $('#statusFilter').value = params.get('status') || 'all';
}

function renderWatchList(){
  const box = $('#watchList');
  if(!box) return;
  const selected = flights.filter(flight => watchedFlights.has(flight.code));
  box.innerHTML = selected.length ? selected.map(flight => `
    <div class="favorite-item">
      <strong>${flight.code} - ${flight.city}</strong>
      <span>${typeLabels[flight.type]}, ${flight.time}, ${statusLabels[flight.status]}</span>
    </div>
  `).join('') : '<p class="search-hint">Рейсы для отслеживания пока не добавлены.</p>';
}

function renderFlights(){
  const list = $('#flightList');
  if(!list) return;
  const query = $('#flightSearch').value.trim().toLowerCase();
  const type = $('#typeFilter').value;
  const status = $('#statusFilter').value;
  const sort = $('#sortFlights').value;

  const filtered = flights
    .filter(flight => {
      const text = `${flight.code} ${flight.airline} ${flight.city} ${flight.alias} ${typeLabels[flight.type]} ${statusLabels[flight.status]}`.toLowerCase();
      return text.includes(query)
        && (type === 'all' || flight.type === type)
        && (status === 'all' || flight.status === status);
    })
    .sort((a,b) => {
      if(sort === 'city') return a.city.localeCompare(b.city);
      if(sort === 'status') return a.status.localeCompare(b.status);
      return a.time.localeCompare(b.time);
    });

  $('#flightCount').innerHTML = `Найдено рейсов: ${filtered.length}`;
  list.innerHTML = filtered.length ? filtered.map(flight => `
    <article class="ticket-card">
      <div class="ticket-main">
        <div class="ticket-meta">
          <span class="pill">${flight.airline}</span>
          <span class="pill">${typeLabels[flight.type]}</span>
          <span class="pill ${statusClass[flight.status]}">${statusLabels[flight.status]}</span>
        </div>
        <div class="ticket-route">
          <strong>${flight.time}</strong>
          <span class="ticket-line"></span>
          <strong>${flight.code}</strong>
          <span class="ticket-line"></span>
          <strong>${flight.city}</strong>
        </div>
        <div class="ticket-meta">
          <span>Терминал ${flight.terminal}</span>
          <span>Выход ${flight.gate}</span>
        </div>
      </div>
      <div class="ticket-buy">
        <button class="favorite-btn ${watchedFlights.has(flight.code) ? 'active' : ''}" data-watch="${flight.code}" type="button">★ Отслеживать</button>
        <button class="btn primary" data-details="${flight.code}" type="button">Подробнее</button>
      </div>
    </article>
  `).join('') : '<article class="ticket-card"><strong>Рейсы не найдены.</strong><p class="search-hint">Попробуйте изменить фильтры.</p></article>';
  renderWatchList();
}

function showFlightDetails(flight){
  if(!flight) return;

  alert(
    `Рейс: ${flight.code}\n` +
    `Город: ${flight.city}\n` +
    `Тип: ${typeLabels[flight.type]}\n` +
    `Время: ${flight.time}\n` +
    `Терминал: ${flight.terminal}\n` +
    `Выход: ${flight.gate}\n` +
    `Авиакомпания: ${flight.airline}\n` +
    `Статус: ${statusLabels[flight.status]}`
  );
}

function renderServices(){
  const grid = $('#serviceGrid');
  if(!grid) return;
  grid.innerHTML = services.map(service => `
    <article class="service-card ${service.id === activeServiceId ? 'active' : ''}" data-service="${service.id}">
      <div class="icon">${service.icon}</div>
      <h3>${service.title}</h3>
      <p>${service.text}</p>
      <div class="service-meta"><span>${service.place}</span><strong>${service.time}</strong></div>
    </article>
  `).join('');
}

function renderInfoService(detail, service){
  detail.className = 'service-detail-card';
  detail.innerHTML = `
    <div class="calculator-intro">
      <p class="eyebrow">Информация</p>
      <h2>${service.title}</h2>
      <p>${service.text}</p>
    </div>

    <ul class="parking-details service-info-list">
      ${detailRows(service.details)}
    </ul>

    <div class="service-action">
      <span>${service.place} · ${service.time}</span>
      <button class="btn primary" type="button">${service.action}</button>
    </div>
  `;
}

function renderServiceDetail(){
  const detail = $('#serviceDetail');
  if(!detail) return;

  const service = getActiveService();
  renderInfoService(detail, service);
}

function renderRequests(){
  const list = $('#requestList');
  if(!list) return;
  list.innerHTML = supportRequests.length ? supportRequests.slice(-4).reverse().map(item => `
    <div class="request-item">
      <strong>${topicLabels[item.topic] || item.topic}</strong>
      <span>${item.date}</span>
      <small>${item.email}</small>
    </div>
  `).join('') : '<p class="search-hint">Обращений пока нет.</p>';
}

function bindMenu(){
  $('.menu-toggle')?.addEventListener('click', () => {
    $('.nav-links')?.classList.toggle('open');
  });
}

function bindMainSearch(){
  $$('.trip-tabs button').forEach(button => {
    button.addEventListener('click', () => {
      $$('.trip-tabs button').forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const quickType = $('#quickType');
      if(quickType) quickType.value = button.dataset.board || 'all';
    });
  });

  $('#mainSearchForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set('query', $('#flightQuery').value.trim());
    params.set('type', $('#quickType').value);
    params.set('status', $('#quickStatus').value);
    location.href = `flights.html?${params.toString()}`;
  });
}

function bindFlightFilters(){
  $$('#flightSearch,#typeFilter,#statusFilter,#sortFlights').forEach(element => {
    element.addEventListener('input', renderFlights);
  });

  $('#resetFlights')?.addEventListener('click', () => {
    $('#flightSearch').value = '';
    $('#typeFilter').value = 'all';
    $('#statusFilter').value = 'all';
    $('#sortFlights').value = 'time';
    history.replaceState(null, '', 'flights.html');
    renderFlights();
  });
}

function bindPageClicks(){
  document.addEventListener('click', event => {
    const serviceCard = event.target.closest('[data-service]');
    if(serviceCard){
      activeServiceId = serviceCard.dataset.service;
      renderServices();
      renderServiceDetail();
      return;
    }

    const watchCode = event.target.closest('[data-watch]')?.dataset.watch;
    if(watchCode){
      watchedFlights.has(watchCode) ? watchedFlights.delete(watchCode) : watchedFlights.add(watchCode);
      renderFlights();
    }

    const detailsCode = event.target.closest('[data-details]')?.dataset.details;
    if(detailsCode){
      showFlightDetails(flights.find(item => item.code === detailsCode));
    }
  });
}

function bindContactForm(){
  $('#contactForm')?.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.target);
    supportRequests.push({
      name:data.get('name'),
      email:data.get('email'),
      topic:data.get('topic'),
      message:data.get('message'),
      date:new Date().toLocaleString('ru-RU')
    });
    $('#formStatus').innerHTML = `${data.get('name')}, обращение принято. Ответ придет на ${data.get('email')}.`;
    event.target.reset();
    renderRequests();
  });
}

function init(){
  applyQueryParams();
  bindMenu();
  bindMainSearch();
  bindFlightFilters();
  bindPageClicks();
  bindContactForm();
  renderFlights();
  renderServices();
  renderServiceDetail();
  renderRequests();
}

init();
