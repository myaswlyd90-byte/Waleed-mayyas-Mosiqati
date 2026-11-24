/* =====================================================
   enhancements.js — تحسينات موسيقاتي
   ===================================================== */

/* ── 1. تسجيل الدخول ── */
function openLogin() {
  document.getElementById('login-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLogin() {
  document.getElementById('login-modal').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLogin(); });

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    if (user && pass) {
      document.getElementById('login-error').style.display = 'none';
      showLoginSuccess(user);
      closeLogin();
    } else {
      document.getElementById('login-error').style.display = 'block';
    }
  });
}

function showLoginSuccess(name) {
  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `✅ أهلاً بك <strong>${name}</strong>! تم تسجيل الدخول بنجاح.`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 4000);
}

/* ── 2. رسالة النجاح بعد الإرسال ── */
const contactForm = document.querySelector('form[data-contact]');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) { inp.classList.add('input-error'); valid = false; }
      else inp.classList.remove('input-error');
    });
    if (!valid) return;
    contactForm.style.display = 'none';
    document.getElementById('success-msg').style.display = 'flex';
  });

  contactForm.querySelectorAll('input, textarea').forEach(inp => {
    inp.addEventListener('input', () => inp.classList.remove('input-error'));
  });
}

/* ── 3. التمرير الناعم ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── 4. شريط البحث ── */
const searchInput = document.getElementById('global-search');
const searchResults = document.getElementById('search-results');

const keywords = {
  'عود':        'products.html',
  'قيثارة':     'products.html',
  'بيانو':      'products.html',
  'كيبورد':     'products.html',
  'درمز':       'products.html',
  'استوديو':    'products.html',
  'اكسسوارات':  'products.html',
  'توصيل':      'services.html',
  'صيانة':      'services.html',
  'استشارة':    'services.html',
  'خدمات':      'services.html',
  'تواصل':      'contact.html',
  'رسالة':      'contact.html',
  'موعد':       'contact.html',
  'من نحن':     'about.html',
  'قصة':        'about.html',
  'رؤية':       'about.html',
  'قيم':        'about.html',
  'رئيسية':     'index.html',
  'منتجات':     'products.html',
};

if (searchInput) {
  searchInput.addEventListener('input', function() {
    const q = this.value.trim();
    if (!q) { searchResults.innerHTML = ''; searchResults.style.display = 'none'; return; }
    const matches = Object.entries(keywords).filter(([k]) => k.includes(q) || q.includes(k));
    if (matches.length === 0) {
      searchResults.innerHTML = '<div class="sr-item">لا توجد نتائج</div>';
    } else {
      searchResults.innerHTML = matches.map(([k, pg]) =>
        `<a class="sr-item" href="${pg}">${k} <span class="sr-page">${pg.replace('.html','')}</span></a>`
      ).join('');
    }
    searchResults.style.display = 'block';
  });

  document.addEventListener('click', e => {
    if (!searchInput.closest('.search-wrap').contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
}

/* ── 5. تنبيهات التحقق الفوري ── */
document.querySelectorAll('input[required], textarea[required]').forEach(inp => {
  inp.addEventListener('blur', function() {
    const wrapper = this.closest('div');
    let hint = wrapper.querySelector('.field-hint');
    if (!this.value.trim()) {
      if (!hint) {
        hint = document.createElement('span');
        hint.className = 'field-hint';
        wrapper.appendChild(hint);
      }
      hint.textContent = 'هذا الحقل مطلوب';
      this.classList.add('input-error');
    } else {
      if (hint) hint.remove();
      this.classList.remove('input-error');
    }
  });
});
