// MAIMATASA 4 BKD - Main Application Engine
import { CANDIDATE_INFO, PILLARS, WARDS_DATA, INITIAL_NEWS, INITIAL_EVENTS, SEED_APPLICATIONS } from './data.js';

// Application State
const STATE_KEYS = {
  APPLICATIONS: 'maimatasa_applications_v1',
  FEEDBACK: 'maimatasa_feedback_v1',
  NEWS: 'maimatasa_news_v1',
  EVENTS: 'maimatasa_events_v1',
  ADMIN_AUTH: 'maimatasa_admin_auth'
};

function getStorage(key, defaultVal) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error', e);
  }
}

// Initialise State
let applications = getStorage(STATE_KEYS.APPLICATIONS, SEED_APPLICATIONS);
let feedbackList = getStorage(STATE_KEYS.FEEDBACK, []);
let newsList = getStorage(STATE_KEYS.NEWS, INITIAL_NEWS);
let eventsList = getStorage(STATE_KEYS.EVENTS, INITIAL_EVENTS);
let isAdminLoggedIn = getStorage(STATE_KEYS.ADMIN_AUTH, false);

// DOM Elements & Event Handlers
document.addEventListener('DOMContentLoaded', () => {
  initWardsDropdowns();
  renderPillars();
  renderWardsGrid();
  renderNews();
  renderEvents();
  setupGetInvolvedTabs();
  setupVolunteerForm();
  setupRepresentationForm();
  setupPollingUnitForm();
  setupStatusTracker();
  setupFeedbackForm();
  setupAdminDashboard();
  setupModals();
  setupSmoothScroll();
});

// Populate Ward Dropdowns
function initWardsDropdowns() {
  const wardSelects = document.querySelectorAll('.ward-select');
  wardSelects.forEach(select => {
    select.innerHTML = '<option value="">-- Select Birnin-Kudu Ward --</option>';
    WARDS_DATA.forEach(ward => {
      const opt = document.createElement('option');
      opt.value = ward.name;
      opt.textContent = `${ward.name} Ward (${ward.pollingUnits} Polling Units)`;
      select.appendChild(opt);
    });
  });
}

// Render 5 Pillars
function renderPillars() {
  const container = document.getElementById('pillars-container');
  if (!container) return;

  container.innerHTML = PILLARS.map(pillar => `
    <div class="group bg-surface-container rounded-2xl p-7 border border-outline-variant/30 hover:border-stately-gold/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between" id="pillar-card-${pillar.id}">
      <div>
        <div class="flex items-center justify-between mb-6">
          <div class="w-14 h-14 rounded-xl bg-primary text-stately-gold flex items-center justify-center shadow-md">
            <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">${pillar.icon}</span>
          </div>
          <span class="text-3xl font-display-lg text-outline-variant/40 font-bold">${pillar.number}</span>
        </div>
        <h3 class="font-headline-sm text-2xl text-primary font-bold mb-2">${pillar.title}</h3>
        <p class="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">${pillar.tagline}</p>
        <p class="text-on-surface-variant font-body-md text-sm leading-relaxed mb-6">${pillar.summary}</p>
        
        <div class="bg-background rounded-xl p-4 mb-6 border border-outline-variant/20">
          <h4 class="text-xs font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-stately-gold text-base">check_circle</span>
            Key Strategic Focus
          </h4>
          <ul class="space-y-2">
            ${pillar.focusAreas.slice(0, 4).map(area => `
              <li class="flex items-start gap-2 text-xs text-on-surface">
                <span class="text-stately-gold font-bold">•</span>
                <span>${area}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
        <span class="text-xs text-on-surface-variant font-medium">${pillar.stats}</span>
        <button onclick="window.showPillarDetails('${pillar.id}')" class="text-xs font-bold text-action-green hover:text-secondary inline-flex items-center gap-1">
          Full Blueprint <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Pillar Detail Modal Viewer
window.showPillarDetails = function(pillarId) {
  const pillar = PILLARS.find(p => p.id === pillarId);
  if (!pillar) return;

  const modalBody = document.getElementById('pillar-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/30">
      <div class="w-16 h-16 rounded-xl bg-primary text-stately-gold flex items-center justify-center">
        <span class="material-symbols-outlined text-4xl">${pillar.icon}</span>
      </div>
      <div>
        <span class="text-xs font-bold text-stately-gold uppercase tracking-widest">Pillar ${pillar.number} • Birnin-Kudu Blueprint</span>
        <h2 class="text-2xl md:text-3xl font-bold text-primary">${pillar.title}</h2>
        <p class="text-sm text-on-surface-variant">${pillar.tagline}</p>
      </div>
    </div>
    
    <div class="space-y-6">
      <div>
        <h4 class="text-sm font-bold text-primary uppercase tracking-wider mb-2">Executive Summary</h4>
        <p class="text-base text-on-surface leading-relaxed">${pillar.summary}</p>
      </div>

      <div>
        <h4 class="text-sm font-bold text-primary uppercase tracking-wider mb-3">Core Action Objectives</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${pillar.focusAreas.map(area => `
            <div class="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container border border-outline-variant/20">
              <span class="material-symbols-outlined text-stately-gold text-lg">check_circle</span>
              <span class="text-sm text-on-surface font-medium">${area}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="p-4 rounded-xl bg-primary text-on-primary flex items-center justify-between">
        <div>
          <span class="text-xs text-stately-gold font-bold uppercase tracking-wider">Target Impact Metric</span>
          <p class="text-sm font-medium text-white">${pillar.stats}</p>
        </div>
        <a href="#get-involved" onclick="closeAllModals()" class="px-5 py-2.5 rounded-lg bg-stately-gold text-primary font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors">
          Support this Pillar
        </a>
      </div>
    </div>
  `;

  openModal('pillar-modal');
};

// Render Wards Grid & Interactive Info
function renderWardsGrid() {
  const container = document.getElementById('wards-grid-container');
  if (!container) return;

  container.innerHTML = WARDS_DATA.map(ward => `
    <div class="bg-surface-container p-5 rounded-xl border border-outline-variant/30 hover:border-primary transition-all cursor-pointer group" onclick="window.selectWardDetail('${ward.id}')">
      <div class="flex items-center justify-between mb-2">
        <h4 class="font-bold text-primary text-base group-hover:text-action-green transition-colors">${ward.name} Ward</h4>
        <span class="px-2 py-0.5 rounded-full bg-primary-container text-stately-gold text-xs font-bold">${ward.pollingUnits} PUs</span>
      </div>
      <p class="text-xs text-on-surface-variant mb-3">Coord: <span class="font-semibold text-on-surface">${ward.coordinator}</span></p>
      <div class="flex flex-wrap gap-1">
        ${ward.communities.slice(0, 3).map(c => `
          <span class="text-[11px] px-2 py-0.5 rounded bg-surface text-on-surface-variant border border-outline-variant/20">${c}</span>
        `).join('')}
        ${ward.communities.length > 3 ? `<span class="text-[11px] px-1.5 py-0.5 text-on-surface-variant font-bold">+${ward.communities.length - 3}</span>` : ''}
      </div>
    </div>
  `).join('');
}

window.selectWardDetail = function(wardId) {
  const ward = WARDS_DATA.find(w => w.id === wardId);
  if (!ward) return;

  const detailBox = document.getElementById('ward-detail-display');
  if (!detailBox) return;

  detailBox.innerHTML = `
    <div class="p-6 bg-primary text-on-primary rounded-2xl shadow-xl relative overflow-hidden border-2 border-stately-gold/40">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span class="px-3 py-1 rounded-full bg-primary-container text-stately-gold text-xs font-bold tracking-wider uppercase border border-stately-gold/30">Birnin-Kudu Constituency</span>
          <h3 class="text-3xl font-bold font-headline-md text-white mt-2">${ward.name} Ward Structure</h3>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-xs text-on-primary-container block">Accredited Polling Units</span>
            <span class="text-2xl font-bold text-stately-gold">${ward.pollingUnits} Units</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div class="bg-primary-container/60 p-4 rounded-xl border border-primary-fixed-dim/20">
          <span class="text-xs font-bold text-stately-gold uppercase tracking-wider block mb-1">Ward Coordinator</span>
          <p class="text-base font-bold text-white">${ward.coordinator}</p>
          <p class="text-xs text-on-primary-container">Birnin-Kudu Constituency Representative Council</p>
        </div>
        <div class="bg-primary-container/60 p-4 rounded-xl border border-primary-fixed-dim/20">
          <span class="text-xs font-bold text-stately-gold uppercase tracking-wider block mb-1">Key Communities / Units</span>
          <p class="text-sm text-white">${ward.communities.join(' • ')}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-primary-fixed-dim/20">
        <p class="text-xs text-on-primary-container">Want to serve as Polling Unit or Ward Representative in ${ward.name}?</p>
        <a href="#get-involved" onclick="selectRoleAndWard('Polling Unit Representative', '${ward.name}')" class="px-4 py-2 bg-stately-gold text-primary rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors inline-flex items-center gap-1">
          Apply for ${ward.name} <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
    </div>
  `;
  detailBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.selectRoleAndWard = function(role, wardName) {
  const puTab = document.querySelector('[data-tab="polling_unit"]');
  if (puTab) puTab.click();
  setTimeout(() => {
    const wardSelect = document.querySelector('#pu-form select[name="ward"]');
    if (wardSelect) {
      wardSelect.value = wardName;
    }
  }, 100);
};

// Render News
function renderNews() {
  const container = document.getElementById('news-container');
  if (!container) return;

  container.innerHTML = newsList.map(news => `
    <article class="bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-stately-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between">
      <div>
        <div class="relative h-48 bg-primary/20 overflow-hidden">
          <img src="${news.image}" alt="${news.title}" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" onerror="this.src='/IMG-20260829-WA0046.jpg'"/>
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-stately-gold text-xs font-bold uppercase tracking-wider shadow-md">
            ${news.category}
          </span>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between text-xs text-on-surface-variant mb-2">
            <span>${news.date}</span>
            <span>${news.readTime}</span>
          </div>
          <h3 class="font-headline-sm text-lg font-bold text-primary mb-3 line-clamp-2">${news.title}</h3>
          <p class="text-sm text-on-surface-variant line-clamp-3 leading-relaxed mb-4">${news.summary}</p>
        </div>
      </div>
      <div class="px-6 pb-6 pt-0">
        <button onclick="window.readNewsArticle('${news.id}')" class="w-full py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-on-primary font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1">
          Read Full Article <span class="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </article>
  `).join('');
}

window.readNewsArticle = function(newsId) {
  const news = newsList.find(n => n.id === newsId);
  if (!news) return;

  const modalBody = document.getElementById('news-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <span class="px-3 py-1 rounded-full bg-primary text-stately-gold text-xs font-bold uppercase">${news.category}</span>
        <span class="text-xs text-on-surface-variant">${news.date} • ${news.readTime}</span>
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-primary">${news.title}</h2>
      <img src="${news.image}" alt="${news.title}" class="w-full max-h-72 object-cover rounded-xl shadow-md my-4"/>
      <div class="prose max-w-none text-on-surface leading-relaxed space-y-4 text-base">
        <p class="font-semibold text-lg text-primary">${news.summary}</p>
        <p>${news.content}</p>
      </div>
      <div class="pt-6 border-t border-outline-variant/30 flex items-center justify-between">
        <span class="text-xs text-on-surface-variant font-medium">Published by MAIMATASA Media & Communications Directorate</span>
        <button onclick="closeAllModals()" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold uppercase">Close</button>
      </div>
    </div>
  `;
  openModal('news-modal');
};

// Render Events
function renderEvents() {
  const container = document.getElementById('events-container');
  if (!container) return;

  container.innerHTML = eventsList.map(evt => `
    <div class="bg-surface-container rounded-2xl p-6 border border-outline-variant/30 hover:border-action-green transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0 w-16 h-20 rounded-xl bg-primary text-on-primary flex flex-col items-center justify-center text-center shadow-md">
          <span class="text-xs font-bold text-stately-gold uppercase">${evt.date.split(' ')[0]}</span>
          <span class="text-2xl font-bold font-display-lg">${evt.date.split(' ')[1].replace(',', '')}</span>
          <span class="text-[10px] text-on-primary-container">2026</span>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2.5 py-0.5 rounded-full bg-surface text-primary text-[11px] font-bold border border-outline-variant/30">${evt.category}</span>
            <span class="text-xs text-on-surface-variant flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">schedule</span> ${evt.time}
            </span>
          </div>
          <h3 class="font-bold text-lg text-primary mb-1">${evt.title}</h3>
          <p class="text-xs text-on-surface-variant flex items-center gap-1 mb-2">
            <span class="material-symbols-outlined text-xs text-stately-gold">location_on</span> ${evt.venue} (${evt.ward} Ward)
          </p>
          <p class="text-sm text-on-surface-variant line-clamp-2 max-w-2xl">${evt.description}</p>
        </div>
      </div>
      <div class="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between gap-3">
        <span class="text-xs text-on-surface-variant font-medium">${evt.attendees}+ Registered</span>
        <button onclick="window.rsvpEvent('${evt.id}')" class="px-5 py-2.5 rounded-lg bg-action-green text-on-primary hover:bg-stately-gold transition-colors font-bold text-xs uppercase tracking-wider shadow-sm">
          RSVP & Attend
        </button>
      </div>
    </div>
  `).join('');
}

window.rsvpEvent = function(eventId) {
  const evt = eventsList.find(e => e.id === eventId);
  if (!evt) return;

  const modalBody = document.getElementById('rsvp-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="space-y-4">
      <div class="p-4 rounded-xl bg-primary text-on-primary mb-4">
        <span class="text-xs font-bold text-stately-gold uppercase tracking-wider">Event RSVP Pass</span>
        <h3 class="text-xl font-bold text-white mt-1">${evt.title}</h3>
        <p class="text-xs text-on-primary-container mt-1">${evt.date} • ${evt.time} • ${evt.venue}</p>
      </div>

      <form id="event-rsvp-form" class="space-y-3" onsubmit="window.submitEventRSVP(event, '${evt.id}')">
        <div>
          <label class="block text-xs font-bold text-primary uppercase mb-1">Your Full Name *</label>
          <input type="text" name="attendeeName" required class="w-full px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface text-on-surface text-sm focus:border-primary outline-none" placeholder="e.g. Maryam Haruna"/>
        </div>
        <div>
          <label class="block text-xs font-bold text-primary uppercase mb-1">Phone Number (SMS Alert) *</label>
          <input type="tel" name="attendeePhone" required class="w-full px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface text-on-surface text-sm focus:border-primary outline-none" placeholder="080 0000 0000"/>
        </div>
        <div>
          <label class="block text-xs font-bold text-primary uppercase mb-1">Your Ward in Birnin-Kudu *</label>
          <select name="attendeeWard" required class="w-full px-4 py-2.5 rounded-lg border border-outline-variant/40 bg-surface text-on-surface text-sm focus:border-primary outline-none">
            ${WARDS_DATA.map(w => `<option value="${w.name}">${w.name} Ward</option>`).join('')}
          </select>
        </div>
        <button type="submit" class="w-full py-3 rounded-lg bg-action-green text-on-primary font-bold text-xs uppercase tracking-wider hover:bg-stately-gold transition-colors mt-4 shadow-md">
          Confirm Attendance & Get Pass
        </button>
      </form>
    </div>
  `;
  openModal('rsvp-modal');
};

window.submitEventRSVP = function(e, eventId) {
  e.preventDefault();
  const form = e.target;
  const name = form.attendeeName.value;
  const phone = form.attendeePhone.value;
  const ward = form.attendeeWard.value;

  const evt = eventsList.find(e => e.id === eventId);
  if (evt) {
    evt.attendees = (evt.attendees || 0) + 1;
    setStorage(STATE_KEYS.EVENTS, eventsList);
    renderEvents();
  }

  const passCode = `BKD-PASS-${Math.floor(1000 + Math.random() * 9000)}`;

  const modalBody = document.getElementById('rsvp-modal-body');
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="text-center py-6 space-y-4">
        <div class="w-16 h-16 rounded-full bg-action-green/20 text-action-green flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-4xl">verified</span>
        </div>
        <h3 class="text-2xl font-bold text-primary">Registration Confirmed!</h3>
        <p class="text-sm text-on-surface-variant max-w-sm mx-auto">Thank you <strong>${name}</strong> (${ward} Ward). Your seat has been reserved for <strong>${evt ? evt.title : 'the event'}</strong>.</p>
        
        <div class="p-4 rounded-xl bg-surface-container border-2 border-dashed border-stately-gold max-w-xs mx-auto text-center">
          <span class="text-xs uppercase font-bold text-on-surface-variant">Your Digital Pass Code</span>
          <p class="text-2xl font-mono font-bold text-primary mt-1 tracking-widest">${passCode}</p>
          <span class="text-[11px] text-on-surface-variant block mt-1">Please show this code at the venue entrance.</span>
        </div>

        <button onclick="closeAllModals()" class="px-6 py-2.5 rounded-lg bg-primary text-white text-xs font-bold uppercase tracking-wider">
          Done
        </button>
      </div>
    `;
  }
};

// Setup Get Involved Tabs
function setupGetInvolvedTabs() {
  const tabs = document.querySelectorAll('.portal-tab-btn');
  const contents = document.querySelectorAll('.portal-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
        t.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      tab.classList.remove('bg-surface-container', 'text-on-surface-variant');
      tab.classList.add('bg-primary', 'text-on-primary', 'shadow-md');

      const target = tab.getAttribute('data-tab');
      contents.forEach(content => {
        if (content.id === `tab-content-${target}`) {
          content.classList.remove('hidden');
        } else {
          content.classList.add('hidden');
        }
      });
    });
  });
}

// 1. Volunteer Form Submission
function setupVolunteerForm() {
  const form = document.getElementById('volunteer-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Checked Categories
    const categories = [];
    form.querySelectorAll('input[name="categories"]:checked').forEach(cb => categories.push(cb.value));

    const refNumber = `MM-VOL-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp = {
      refNumber,
      type: "volunteer",
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email') || 'N/A',
      gender: formData.get('gender'),
      dob: formData.get('dob'),
      lga: "Birnin Kudu",
      constituency: "Birnin-Kudu Constituency",
      ward: formData.get('ward'),
      community: formData.get('community'),
      pollingUnit: formData.get('pollingUnit') || 'General Ward Volunteer',
      role: formData.get('preferredRole') || 'Community Volunteer',
      categories: categories.length > 0 ? categories : ['Community Engagement'],
      skills: formData.get('skills') || 'General Support',
      availability: formData.get('availability'),
      experience: formData.get('experience') || 'None specified',
      status: "Submitted",
      appliedDate: new Date().toISOString().split('T')[0],
      notes: "Newly registered online volunteer"
    };

    applications.unshift(newApp);
    setStorage(STATE_KEYS.APPLICATIONS, applications);
    form.reset();

    showSuccessSlip(newApp, "Volunteer Registration Successful!");
  });
}

// 2. Representation Form Submission
function setupRepresentationForm() {
  const form = document.getElementById('representation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const refNumber = `MM-REP-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp = {
      refNumber,
      type: "representation",
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email') || 'N/A',
      gender: formData.get('gender'),
      dob: formData.get('dob'),
      lga: "Birnin Kudu",
      constituency: "Birnin-Kudu Constituency",
      ward: formData.get('ward'),
      community: formData.get('community'),
      pollingUnit: formData.get('pollingUnit') || 'Ward Level',
      role: formData.get('representationRole'),
      categories: [formData.get('representationRole')],
      skills: formData.get('experience'),
      reason: formData.get('reason'),
      availability: formData.get('availability'),
      status: "Under Review",
      appliedDate: new Date().toISOString().split('T')[0],
      notes: "Community representation application"
    };

    applications.unshift(newApp);
    setStorage(STATE_KEYS.APPLICATIONS, applications);
    form.reset();

    showSuccessSlip(newApp, "Representation Application Submitted!");
  });
}

// 3. Polling Unit Representative Form Submission
function setupPollingUnitForm() {
  const form = document.getElementById('polling-unit-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const refNumber = `MM-PU-${Math.floor(10000 + Math.random() * 90000)}`;

    const newApp = {
      refNumber,
      type: "polling_unit",
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      email: formData.get('email') || 'N/A',
      residentialAddress: formData.get('residentialAddress'),
      lga: "Birnin Kudu",
      constituency: "Birnin-Kudu Constituency",
      ward: formData.get('ward'),
      community: formData.get('community'),
      pollingUnit: formData.get('pollingUnit'),
      pollingUnitCode: formData.get('puCode') || 'Pending Verification',
      role: "Official Polling Unit Representative",
      categories: ["Polling Unit Representation"],
      skills: formData.get('experience') || 'Electoral Agent Experience',
      status: "Submitted",
      appliedDate: new Date().toISOString().split('T')[0],
      notes: "Official Polling Unit Agent application - pending INEC/Party accreditation"
    };

    applications.unshift(newApp);
    setStorage(STATE_KEYS.APPLICATIONS, applications);
    form.reset();

    showSuccessSlip(newApp, "Polling Unit Representative Application Logged!");
  });
}

// Show Digital Registration Slip Modal
function showSuccessSlip(app, title) {
  const modalBody = document.getElementById('slip-modal-body');
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div id="printable-slip" class="bg-surface p-6 rounded-2xl border-2 border-stately-gold/50 shadow-lg text-on-surface">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-outline-variant/40 pb-4 mb-4">
        <div class="flex items-center gap-3">
          <img src="/IMG-20260829-WA0046.jpg" alt="Candidate" class="w-12 h-12 rounded-full object-cover border border-stately-gold"/>
          <div>
            <h4 class="font-bold text-primary text-base">MAIMATASA 4 BKD</h4>
            <p class="text-[11px] text-on-surface-variant font-medium">Hon. Zaharadeen Idris Mato • Birnin-Kudu Constituency</p>
          </div>
        </div>
        <div class="text-right">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-primary text-stately-gold tracking-wider">${app.status}</span>
        </div>
      </div>

      <div class="text-center py-2 bg-primary-container/40 rounded-lg mb-4 border border-stately-gold/20">
        <span class="text-xs font-bold text-stately-gold uppercase tracking-wider block">Official Application Reference Number</span>
        <span class="text-2xl font-mono font-bold text-primary tracking-wider">${app.refNumber}</span>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-2 gap-3 text-xs mb-4">
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Applicant Name</span>
          <span class="font-bold text-primary text-sm">${app.fullName}</span>
        </div>
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Designated Role</span>
          <span class="font-bold text-primary text-sm">${app.role}</span>
        </div>
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Birnin-Kudu Ward</span>
          <span class="font-bold text-primary">${app.ward} Ward</span>
        </div>
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Community / Polling Unit</span>
          <span class="font-bold text-primary">${app.community} (${app.pollingUnit})</span>
        </div>
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Contact Phone</span>
          <span class="font-bold text-primary">${app.phone}</span>
        </div>
        <div class="p-2.5 bg-surface-container rounded-lg">
          <span class="text-on-surface-variant block font-medium">Submission Date</span>
          <span class="font-bold text-primary">${app.appliedDate}</span>
        </div>
      </div>

      <p class="text-[11px] text-on-surface-variant text-center mb-6">
        Please save your reference number (<strong>${app.refNumber}</strong>) or print this slip. You can track your status anytime on <strong>www.maimatasa4bkd.org</strong>.
      </p>

      <div class="flex items-center gap-3">
        <button onclick="window.printSlip()" class="flex-1 py-3 rounded-lg bg-action-green text-on-primary font-bold text-xs uppercase tracking-wider hover:bg-stately-gold transition-colors flex items-center justify-center gap-1.5 shadow-md">
          <span class="material-symbols-outlined text-sm">print</span> Print / Save Slip
        </button>
        <button onclick="closeAllModals()" class="px-5 py-3 rounded-lg bg-surface-container text-primary font-bold text-xs uppercase tracking-wider hover:bg-outline-variant/30">
          Done
        </button>
      </div>
    </div>
  `;

  openModal('slip-modal');
}

window.printSlip = function() {
  const printContents = document.getElementById('printable-slip').innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = `<div style="max-width:600px;margin:20px auto;font-family:sans-serif;">${printContents}</div>`;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};

// 4. Status Tracker
function setupStatusTracker() {
  const form = document.getElementById('status-tracker-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = form.query.value.trim().toLowerCase();
    const resultBox = document.getElementById('status-result-display');
    if (!resultBox) return;

    const matched = applications.find(a => 
      a.refNumber.toLowerCase() === query || 
      a.phone.replace(/[\s-]/g, '').includes(query.replace(/[\s-]/g, ''))
    );

    if (matched) {
      const statusColors = {
        'Approved': 'bg-action-green text-white',
        'Under Review': 'bg-stately-gold text-primary',
        'Submitted': 'bg-primary-container text-stately-gold',
        'Additional Information Required': 'bg-secondary text-white',
        'Not Selected': 'bg-error text-white'
      };

      const wardObj = WARDS_DATA.find(w => w.name.toLowerCase() === (matched.ward || '').toLowerCase());
      const coordName = wardObj ? wardObj.coordinator : 'Birnin-Kudu Constituency Directorate';

      resultBox.innerHTML = `
        <div class="p-6 rounded-2xl bg-surface-container border-2 border-primary shadow-md space-y-4">
          <div class="flex items-center justify-between border-b border-outline-variant/30 pb-3">
            <div>
              <span class="text-xs font-bold text-on-surface-variant uppercase">Application Found</span>
              <h4 class="text-xl font-bold text-primary">${matched.fullName}</h4>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase ${statusColors[matched.status] || 'bg-primary text-white'}">
              ${matched.status}
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div><strong>Reference Number:</strong> <span class="font-mono text-primary font-bold">${matched.refNumber}</span></div>
            <div><strong>Application Role:</strong> ${matched.role}</div>
            <div><strong>Ward:</strong> ${matched.ward} Ward</div>
            <div><strong>Community:</strong> ${matched.community}</div>
            <div><strong>Assigned Polling Unit:</strong> ${matched.pollingUnit}</div>
            <div><strong>Date Logged:</strong> ${matched.appliedDate}</div>
            <div><strong>Ward Coordinator:</strong> ${coordName}</div>
            <div><strong>Verification Note:</strong> ${matched.notes || 'In progress'}</div>
          </div>

          <div class="p-3 rounded-lg bg-surface border border-outline-variant/30 text-xs text-on-surface-variant flex items-center justify-between">
            <span>Need further assistance with your application?</span>
            <a href="mailto:info@maimatasa4bkd.org" class="font-bold text-action-green hover:underline">Contact Desk</a>
          </div>

          <div class="text-right">
            <button onclick="window.showApplicationSlip('${matched.refNumber}')" class="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider hover:bg-stately-gold transition-colors">
              View & Print Certificate Slip
            </button>
          </div>
        </div>
      `;
    } else {
      resultBox.innerHTML = `
        <div class="p-6 rounded-2xl bg-error-container/30 border border-error text-center space-y-2">
          <span class="material-symbols-outlined text-3xl text-error">error</span>
          <h4 class="font-bold text-primary text-base">No Matching Record Found</h4>
          <p class="text-xs text-on-surface-variant max-w-sm mx-auto">
            We could not find an application matching "<strong>${query}</strong>". Please ensure you entered the exact Reference Number (e.g., MM-VOL-10492) or Registered Phone Number.
          </p>
        </div>
      `;
    }
  });
}

window.showApplicationSlip = function(refNumber) {
  const app = applications.find(a => a.refNumber === refNumber);
  if (app) {
    showSuccessSlip(app, "Application Record");
  }
};

// 5. Community Feedback Form
function setupFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const feedbackId = `BKD-OBS-${Math.floor(1000 + Math.random() * 9000)}`;

    const newFeedback = {
      id: feedbackId,
      fullName: formData.get('fullName'),
      phone: formData.get('phone'),
      ward: formData.get('ward'),
      community: formData.get('community'),
      category: formData.get('category'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      submittedDate: new Date().toISOString().split('T')[0],
      status: "Received"
    };

    feedbackList.unshift(newFeedback);
    setStorage(STATE_KEYS.FEEDBACK, feedbackList);
    form.reset();

    const responseBox = document.getElementById('feedback-response-box');
    if (responseBox) {
      responseBox.classList.remove('hidden');
      responseBox.innerHTML = `
        <div class="p-5 rounded-xl bg-action-green text-on-primary flex items-start gap-3 shadow-md">
          <span class="material-symbols-outlined text-2xl text-stately-gold">check_circle</span>
          <div>
            <h4 class="font-bold text-sm">Observation Logged Successfully!</h4>
            <p class="text-xs text-on-primary-container mt-1">
              Thank you for sharing your community observation (Ticket ID: <strong>${feedbackId}</strong>). Hon. Zaharadeen Idris Mato and the Birnin-Kudu constituency planning committee value your voice.
            </p>
          </div>
        </div>
      `;
    }
  });
}

// 6. Admin CMS Dashboard & Application Management
function setupAdminDashboard() {
  renderAdminStats();
  renderAdminTable();

  // Admin login trigger
  const adminBtn = document.getElementById('admin-cms-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('admin-modal');
      renderAdminStats();
      renderAdminTable();
    });
  }

  // Filter & Search listeners in Admin
  const searchInput = document.getElementById('admin-app-search');
  const filterSelect = document.getElementById('admin-app-filter');
  const wardFilter = document.getElementById('admin-ward-filter');

  if (searchInput) searchInput.addEventListener('input', () => renderAdminTable());
  if (filterSelect) filterSelect.addEventListener('change', () => renderAdminTable());
  if (wardFilter) wardFilter.addEventListener('change', () => renderAdminTable());
}

function renderAdminStats() {
  const totalAppsEl = document.getElementById('stat-total-apps');
  const totalVolEl = document.getElementById('stat-total-vol');
  const totalPUEl = document.getElementById('stat-total-pu');
  const totalApprovedEl = document.getElementById('stat-total-approved');

  if (totalAppsEl) totalAppsEl.textContent = applications.length;
  if (totalVolEl) totalVolEl.textContent = applications.filter(a => a.type === 'volunteer').length;
  if (totalPUEl) totalPUEl.textContent = applications.filter(a => a.type === 'polling_unit').length;
  if (totalApprovedEl) totalApprovedEl.textContent = applications.filter(a => a.status === 'Approved').length;
}

function renderAdminTable() {
  const tbody = document.getElementById('admin-apps-tbody');
  if (!tbody) return;

  const search = (document.getElementById('admin-app-search')?.value || '').toLowerCase();
  const filterType = document.getElementById('admin-app-filter')?.value || 'all';
  const filterWard = document.getElementById('admin-ward-filter')?.value || 'all';

  const filtered = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(search) || 
                          app.refNumber.toLowerCase().includes(search) || 
                          app.phone.includes(search);
    const matchesType = filterType === 'all' || app.type === filterType;
    const matchesWard = filterWard === 'all' || app.ward === filterWard;
    return matchesSearch && matchesType && matchesWard;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-xs text-on-surface-variant">No applications matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(app => `
    <tr class="border-b border-outline-variant/20 hover:bg-surface-container/50 text-xs">
      <td class="py-3 px-3 font-mono font-bold text-primary">${app.refNumber}</td>
      <td class="py-3 px-3 font-semibold text-on-surface">${app.fullName}</td>
      <td class="py-3 px-3 uppercase text-[11px] font-bold text-on-surface-variant">${app.type.replace('_', ' ')}</td>
      <td class="py-3 px-3">${app.ward} Ward</td>
      <td class="py-3 px-3">${app.role}</td>
      <td class="py-3 px-3">
        <select onchange="window.updateAppStatus('${app.refNumber}', this.value)" class="text-xs px-2 py-1 rounded bg-surface border border-outline-variant/40 font-bold ${app.status === 'Approved' ? 'text-action-green' : 'text-primary'}">
          <option value="Submitted" ${app.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
          <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
          <option value="Additional Information Required" ${app.status === 'Additional Information Required' ? 'selected' : ''}>Needs Info</option>
          <option value="Approved" ${app.status === 'Approved' ? 'selected' : ''}>Approved</option>
          <option value="Not Selected" ${app.status === 'Not Selected' ? 'selected' : ''}>Not Selected</option>
        </select>
      </td>
      <td class="py-3 px-3 text-right">
        <button onclick="window.showApplicationSlip('${app.refNumber}')" class="text-xs text-action-green hover:underline font-bold mr-2">Slip</button>
        <button onclick="window.deleteApplication('${app.refNumber}')" class="text-xs text-error hover:underline">Delete</button>
      </td>
    </tr>
  `).join('');
}

window.updateAppStatus = function(refNumber, newStatus) {
  const app = applications.find(a => a.refNumber === refNumber);
  if (app) {
    app.status = newStatus;
    setStorage(STATE_KEYS.APPLICATIONS, applications);
    renderAdminStats();
  }
};

window.deleteApplication = function(refNumber) {
  if (confirm(`Are you sure you want to delete application ${refNumber}?`)) {
    applications = applications.filter(a => a.refNumber !== refNumber);
    setStorage(STATE_KEYS.APPLICATIONS, applications);
    renderAdminStats();
    renderAdminTable();
  }
};

window.exportApplicationsCSV = function() {
  if (applications.length === 0) {
    alert('No application records to export.');
    return;
  }

  const headers = ['Reference Number', 'Type', 'Full Name', 'Phone', 'Email', 'Ward', 'Community', 'Polling Unit', 'Role', 'Status', 'Applied Date'];
  const rows = applications.map(a => [
    `"${a.refNumber}"`,
    `"${a.type}"`,
    `"${a.fullName}"`,
    `"${a.phone}"`,
    `"${a.email || ''}"`,
    `"${a.ward}"`,
    `"${a.community}"`,
    `"${a.pollingUnit || ''}"`,
    `"${a.role || ''}"`,
    `"${a.status}"`,
    `"${a.appliedDate}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `MAIMATASA_4_BKD_Applications_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Modal System
function setupModals() {
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });
  document.body.style.overflow = '';
}
window.closeAllModals = closeAllModals;

// Smooth Navigation & Mobile Menu
function setupSmoothScroll() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}
