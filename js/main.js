// ===== NAV ACTIVE STATE =====
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path) a.classList.add('active');
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // ===== SCROLL FADE IN =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ===== FILTER BUTTONS (projects page) =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.category.includes(filter)) {
            card.style.display = '';
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== CONTACT FORM VALIDATION =====
  const form = document.getElementById('contactForm');
  if (form) {

    function showError(input, msg) {
      clearError(input);
      input.classList.add('input-error');
      const err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = msg;
      input.parentNode.appendChild(err);
    }

    function clearError(input) {
      input.classList.remove('input-error');
      const existing = input.parentNode.querySelector('.field-error');
      if (existing) existing.remove();
    }

    // Live clear on typing
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => clearError(field));
    });

    function isValidEmail(val) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
    }

    form.addEventListener('submit', e => {
      e.preventDefault();

      const nameEl    = document.getElementById('name');
      const emailEl   = document.getElementById('email');
      const messageEl = document.getElementById('message');
      const btn       = form.querySelector('.submit-btn');

      [nameEl, emailEl, messageEl].forEach(clearError);
      let valid = true;

      // Name validation
      if (!nameEl.value.trim()) {
        showError(nameEl, 'Name is required.');
        valid = false;
      } else if (nameEl.value.trim().length < 2) {
        showError(nameEl, 'Name must be at least 2 characters.');
        valid = false;
      }

      // Email validation
      if (!emailEl.value.trim()) {
        showError(emailEl, 'Email is required.');
        valid = false;
      } else if (!isValidEmail(emailEl.value)) {
        showError(emailEl, 'Please enter a valid email address.');
        valid = false;
      }

      // Message validation
      if (!messageEl.value.trim()) {
        showError(messageEl, 'Message is required.');
        valid = false;
      } else if (messageEl.value.trim().length < 10) {
        showError(messageEl, 'Message must be at least 10 characters.');
        valid = false;
      }

     if (!valid) return;

      // Submit to Formspree
      const btn2 = btn;
      btn2.textContent = 'Sending...';
      btn2.disabled = true;

      const formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          btn2.textContent = 'Message Sent!';
          btn2.style.background = 'var(--accent-2)';
          btn2.style.borderColor = 'var(--accent-2)';
          form.reset();
          [nameEl, emailEl, messageEl].forEach(clearError);
          setTimeout(() => {
            btn2.textContent = 'Send Message';
            btn2.style.background = '';
            btn2.style.borderColor = '';
            btn2.disabled = false;
          }, 3000);
        } else {
          btn2.textContent = 'Failed. Try Again.';
          btn2.style.background = '#e05555';
          btn2.style.borderColor = '#e05555';
          btn2.disabled = false;
          setTimeout(() => {
            btn2.textContent = 'Send Message';
            btn2.style.background = '';
            btn2.style.borderColor = '';
          }, 3000);
        }
      })
      .catch(() => {
        btn2.textContent = 'Failed. Try Again.';
        btn2.style.background = '#e05555';
        btn2.style.borderColor = '#e05555';
        btn2.disabled = false;
        setTimeout(() => {
          btn2.textContent = 'Send Message';
          btn2.style.background = '';
          btn2.style.borderColor = '';
        }, 3000);
      });
    });
  }

  // ===== TYPING EFFECT (hero) =====
  const typeEl = document.getElementById('typeEffect');
  if (typeEl) {
    const roles = ['Senior Unity Developer', 'VR/AR Developer', 'Game Developer', 'XR Specialist'];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
      const current = roles[roleIndex];
      if (!deleting) {
        typeEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typeEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    type();
  }
});
