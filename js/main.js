/* ==========================================================================
   MAIN APPLICATION SCRIPT - ADWAITH ASOKAN GAME DEV PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Setup Sound Effects Hooks
  setupAudioListeners();

  // Setup Project Filtering
  setupProjectFiltering();

  // Setup Project Details Modal
  setupModalSystem();

  // Setup 3D Viewport Controls
  setupViewportControls();

  // Setup Contact Form & Clipboard Copy
  setupContactSystem();

  // Setup Mobile Navigation & Smooth Scroll
  setupNavigation();
});

/* --------------------------------------------------------------------------
   Audio SFX Interaction
   -------------------------------------------------------------------------- */
function setupAudioListeners() {
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  if (audioToggleBtn) {
    // Sync initial state
    if (SoundFX.getMuted()) {
      audioToggleBtn.classList.remove('active');
      audioToggleBtn.setAttribute('title', 'Sound: Muted (Click to Unmute)');
    } else {
      audioToggleBtn.classList.add('active');
      audioToggleBtn.setAttribute('title', 'Sound: Enabled (Click to Mute)');
    }

    audioToggleBtn.addEventListener('click', () => {
      const isMuted = SoundFX.toggleMute();
      if (isMuted) {
        audioToggleBtn.classList.remove('active');
        audioToggleBtn.setAttribute('title', 'Sound: Muted (Click to Unmute)');
        showToast('UI Sound Effects: Muted');
      } else {
        audioToggleBtn.classList.add('active');
        audioToggleBtn.setAttribute('title', 'Sound: Enabled (Click to Mute)');
        SoundFX.playClick();
        showToast('UI Sound Effects: Enabled');
      }
    });
  }

  // Attach hover sounds to buttons and cards
  const interactiveEls = document.querySelectorAll('.btn, .filter-btn, .vp-control-btn, .project-card, .social-btn, .channel-item');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => SoundFX.playHover());
    el.addEventListener('click', () => SoundFX.playClick());
  });
}

/* --------------------------------------------------------------------------
   Project Filtering Logic
   -------------------------------------------------------------------------- */
function setupProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');
      SoundFX.playTabSwitch();

      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Modal Deep-Dive System
   -------------------------------------------------------------------------- */
function setupModalSystem() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const deepDiveBtns = document.querySelectorAll('[data-open-modal]');

  deepDiveBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-open-modal');
      openProjectModal(projectId);
    });
  });

  function openProjectModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    SoundFX.playModalOpen();

    // Populate modal contents
    document.getElementById('modal-image').src = data.banner;
    document.getElementById('modal-image').alt = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-genre').textContent = data.genre;

    // Badges / Meta
    const metaContainer = document.getElementById('modal-meta-row');
    metaContainer.innerHTML = `
      <span class="modal-meta-pill">Engine: ${data.engine}</span>
      <span class="modal-meta-pill">Language: ${data.language}</span>
      <span class="modal-meta-pill">Role: ${data.role}</span>
      <span class="modal-meta-pill">Status: ${data.timeline}</span>
    `;

    // Overview
    document.getElementById('modal-overview-text').textContent = data.overview;

    // Features List
    const featuresList = document.getElementById('modal-features-list');
    featuresList.innerHTML = '';
    data.features.forEach(f => {
      const li = document.createElement('li');
      li.textContent = f;
      featuresList.appendChild(li);
    });

    // Tech Stack Cards
    const techGrid = document.getElementById('modal-tech-grid');
    techGrid.innerHTML = '';
    data.techStack.forEach(t => {
      const card = document.createElement('div');
      card.className = 'modal-tech-card';
      card.innerHTML = `
        <h4>${t.name}</h4>
        <p>${t.desc}</p>
      `;
      techGrid.appendChild(card);
    });

    // Challenges
    const challengesList = document.getElementById('modal-challenges-list');
    challengesList.innerHTML = '';
    data.challenges.forEach(c => {
      const li = document.createElement('li');
      li.textContent = c;
      challengesList.appendChild(li);
    });

    // Show modal
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.openProjectModal = openProjectModal;

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
    SoundFX.playClick();
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   3D Viewport Controls (Blender Section)
   -------------------------------------------------------------------------- */
function setupViewportControls() {
  const wireframeBtn = document.getElementById('vp-wireframe-btn');
  const rotateBtn = document.getElementById('vp-rotate-btn');
  const modelBtns = document.querySelectorAll('[data-model]');
  const lightBtn = document.getElementById('vp-light-btn');

  let currentLightPreset = 'neon';

  if (wireframeBtn) {
    wireframeBtn.addEventListener('click', () => {
      const isWire = ModelViewer.toggleWireframe();
      wireframeBtn.classList.toggle('active', isWire);
      showToast(isWire ? 'Viewport: Wireframe Mode' : 'Viewport: Solid PBR View');
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      const isRotating = ModelViewer.toggleAutoRotate();
      rotateBtn.classList.toggle('active', isRotating);
      showToast(isRotating ? 'Turntable: Auto-Rotate Active' : 'Turntable: Manual Pause');
    });
  }

  modelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const model = btn.getAttribute('data-model');
      modelBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ModelViewer.loadModel(model);
      SoundFX.playClick();
      showToast(`Loaded Asset: ${model.toUpperCase()}`);
    });
  });

  if (lightBtn) {
    lightBtn.addEventListener('click', () => {
      currentLightPreset = currentLightPreset === 'neon' ? 'studio' : 'neon';
      ModelViewer.setupLighting(currentLightPreset);
      lightBtn.classList.toggle('active', currentLightPreset === 'neon');
      showToast(`Lighting: ${currentLightPreset.toUpperCase()} Preset`);
    });
  }
}

/* --------------------------------------------------------------------------
   Contact Form & Clipboard Copy
   -------------------------------------------------------------------------- */
function setupContactSystem() {
  // Copy Email Button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'adwaith.asokan.gamedev@example.com';
      navigator.clipboard.writeText(email).then(() => {
        SoundFX.playClick();
        showToast('Copied email to clipboard!');
      }).catch(() => {
        showToast('Email: adwaith.asokan.gamedev@example.com');
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      SoundFX.playClick();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Transmitting...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Dispatched! ✓</span>';
        showToast(`Thank you, ${name}! Your transmission has been sent.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1000);
    });
  }
}

/* --------------------------------------------------------------------------
   Navigation & Scroll Tracking
   -------------------------------------------------------------------------- */
function setupNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      SoundFX.playClick();
    });

    // Close when clicking link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Toast Message Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 14 14"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
