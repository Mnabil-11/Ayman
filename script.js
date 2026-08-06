/* ============================================
   AYMAN AL-RAHBI - Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page Loader ──
  const loader = document.getElementById('pageLoader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('loaded'), 500);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
      loader.classList.add('loaded');
    }
  }

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTop) {
      if (currentScroll > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Mobile Menu Accessibility & Controls ──
  const navMenuBtn = document.getElementById('navMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (navMenuBtn && navLinks) {
    navMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navMenuBtn.classList.toggle('active', isOpen);
      navMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenuBtn.classList.remove('active');
        navLinks.classList.remove('open');
        navMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Active Nav Link on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ── Scroll Reveal Animations (Respect Reduced Motion) ──
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('active'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ── Skills Progress Bar Animation ──
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
        bar.classList.add('animated');
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ── Project Filters ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          if (!prefersReducedMotion) {
            card.style.animation = 'fadeIn 0.4s ease forwards';
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Inject dynamic keyframes if needed
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  // ── Structured Engineering Project Case Studies Data ──
  const projectData = {
    1: {
      title: 'Water Distribution System Design',
      category: 'Academic Project',
      client: 'Qassim University Coursework',
      duration: 'Semester Team Project',
      area: 'Municipal Water System',
      problem: 'Design an efficient, pressure-balanced municipal water distribution network capable of meeting peak hour demand and emergency fire flow requirements without excessive head losses.',
      role: 'Lead Student Engineer for Hydraulic Calculations — performed pipe diameter sizing, nodal pressure balancing, and technical report writing.',
      tools: 'EPANET, AutoCAD, MS Excel Spreadsheets, Saudi Building Code Plumbing Standards.',
      deliverables: 'Comprehensive hydraulic design report, nodal pressure map, 2D AutoCAD pipe network layout drawings, and Bill of Quantities (BOQ).',
      results: 'Balanced nodal pressures within 30–50 PSI across 45 nodes, eliminated negative pressure risks, and optimized pipe material cost by 12%.'
    },
    2: {
      title: 'RC Building Structural Analysis',
      category: 'Academic Project',
      client: 'Qassim University Structural Course',
      duration: '3 Months',
      area: '2,500 m² (3-Story RC)',
      problem: 'Perform complete gravity and lateral load analysis for a 3-story commercial reinforced concrete building to verify structural member sizing and safety standards.',
      role: 'Structural Modeling & RC Design Student — created the structural geometry, calculated slab/beam loads, and detailed concrete reinforcement.',
      tools: 'Robot Structural Analysis, AutoCAD, ACI 318-19 / Saudi Building Code 304.',
      deliverables: '3D structural model file, bending moment & shear force diagrams, RC beam/column reinforcement schedules, and structural CAD drawings.',
      results: 'Achieved structural safety factor > 1.5 for all load combinations and optimized steel reinforcement ratio to 110 kg/m³ concrete.'
    },
    3: {
      title: 'Engineering Consultancy Trainee',
      category: 'Practical Training',
      client: 'Fadaa Engineering Consultancy',
      duration: 'Consultancy Internship',
      area: 'Engineering Review & Documentation',
      problem: 'Assist senior engineering consultants in verifying client architectural/structural blueprints for compliance and cross-disciplinary coordination before site execution.',
      role: 'Civil Engineering Trainee — cross-checked technical drawings, logged submittal discrepancies, and participated in technical consultant reviews.',
      tools: 'AutoCAD, MS Excel, Architectural Blueprint Readers, Consultancy Verification Checklists.',
      deliverables: 'Verified blueprint review logs, 15+ submittal discrepancy reports, and formatted project documentation archives.',
      results: 'Identified 8 spatial discrepancy items prior to site work, avoiding potential construction rework and project delays.'
    },
    4: {
      title: 'Residential Villa BIM Model',
      category: 'Academic Project',
      client: 'TVTC / Independent BIM Study',
      duration: '2 Months',
      area: '400 m² (2-Story Villa)',
      problem: 'Develop a 3D Building Information Model (BIM) for a 2-story residential villa to improve 2D-to-3D visualization and automated schedule generation.',
      role: 'BIM Modeler Student — modeled foundations, RC columns, beams, slabs, and stairs in Revit BIM environment.',
      tools: 'Autodesk Revit (BIM), AutoCAD.',
      deliverables: 'Complete 3D Revit structural model, 2D structural plan sheets, and automated material takeoff schedules.',
      results: 'Reduced manual drafting time by 40% through Revit automated schedule and elevation generation.'
    },
    5: {
      title: 'Highway Alignment Study',
      category: 'Academic Project',
      client: 'Qassim University Transportation Course',
      duration: '1.5 Months',
      area: '2 km Highway Corridor',
      problem: 'Design the geometric horizontal and vertical alignment for a 2km highway section while optimizing earthwork cut and fill volume balances.',
      role: 'Highway Design Student — computed horizontal circular curves, vertical parabolic curves, superelevation rates, and earthwork volumes.',
      tools: 'Civil 3D / AutoCAD, Excel Mass-Haul Spreadsheets, AASHTO / Saudi MOT Design Standards.',
      deliverables: 'Plan & profile alignment sheets, highway cross-sections at 50m intervals, and earthwork mass-haul calculation tables.',
      results: 'Balanced earthwork cut/fill volume ratio within 5% tolerance, minimizing off-site soil transport costs.'
    },
    6: {
      title: 'BIM Clash Detection Workshop',
      category: 'Practical Training',
      client: 'Technical and Vocational Training Corp (TVTC)',
      duration: 'Intensive Training Course',
      area: 'Interdisciplinary BIM Coordination',
      problem: 'Identify and resolve interdisciplinary hard clashes between structural framing and MEP ducting/piping in a multi-story BIM model prior to construction.',
      role: 'Trainee Engineer — imported structural and MEP discipline models into Navisworks, ran automated clash matrices, and prepared clash resolution reports.',
      tools: 'Autodesk Navisworks Manage, Autodesk Revit, Robot Structural Analysis.',
      deliverables: 'Navisworks Clash Audit Matrix, 3D annotated clash viewpoints, and resolved model coordination report.',
      results: 'Detected and documented 24 critical structural-MEP hard clashes during workshop simulation, proposing 100% viable re-routing solutions.'
    }
  };

  // ── Modal Elements & Accessibility ──
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalProblem = document.getElementById('modalProblem');
  const modalRole = document.getElementById('modalRole');
  const modalTools = document.getElementById('modalTools');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalResults = document.getElementById('modalResults');
  const modalClient = document.getElementById('modalClient');
  const modalDuration = document.getElementById('modalDuration');
  const modalArea = document.getElementById('modalArea');

  let activeCardElement = null;

  function openProjectModal(card) {
    activeCardElement = card;
    const projectId = card.getAttribute('data-project');
    const data = projectData[projectId];
    if (!data) return;

    const img = card.querySelector('img');

    if (modalImage && img) {
      modalImage.src = img.src;
      modalImage.alt = data.title;
    }
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalProblem) modalProblem.textContent = data.problem;
    if (modalRole) modalRole.textContent = data.role;
    if (modalTools) modalTools.textContent = data.tools;
    if (modalDeliverables) modalDeliverables.textContent = data.deliverables;
    if (modalResults) modalResults.textContent = data.results;
    if (modalClient) modalClient.textContent = data.client;
    if (modalDuration) modalDuration.textContent = data.duration;
    if (modalArea) modalArea.textContent = data.area;

    if (projectModal) {
      projectModal.classList.add('active');
      projectModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalClose) modalClose.focus();
    }
  }

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (activeCardElement) {
        activeCardElement.focus();
      }
    }
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => openProjectModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ── Testimonials Slider ──
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testimonial-card').length;

  function goToSlide(index) {
    if (totalSlides === 0 || !track) return;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) goToSlide(idx);
    });
  });

  // Auto-slide unless prefers-reduced-motion
  if (!prefersReducedMotion && totalSlides > 0) {
    let autoSlide = setInterval(() => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    }, 6000);

    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
      sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
          goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
        }, 6000);
      });
    }
  }

  // ── Real Formspree Contact Form Integration & Validation ──
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous field errors & status
      document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
      if (formStatus) {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }

      // Read form elements
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const serviceSelect = document.getElementById('service');
      const messageInput = document.getElementById('message');
      const gotchaInput = contactForm.querySelector('input[name="_gotcha"]');
      const submitBtn = contactForm.querySelector('#submitBtn');

      // 1. Anti-spam Honeypot Check
      if (gotchaInput && gotchaInput.value.trim() !== '') {
        console.warn('Bot detected via honeypot.');
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        }
        contactForm.reset();
        return;
      }

      // 2. Client-side Validation
      let isValid = true;

      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal) {
        showFieldError('nameError', 'Please enter your full name.');
        isValid = false;
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        showFieldError('emailError', 'Please enter a valid email address.');
        isValid = false;
      }

      const serviceVal = serviceSelect ? serviceSelect.value : '';
      if (!serviceVal) {
        showFieldError('serviceError', 'Please select an opportunity type.');
        isValid = false;
      }

      const messageVal = messageInput ? messageInput.value.trim() : '';
      if (!messageVal || messageVal.length < 10) {
        showFieldError('messageError', 'Please enter a message (at least 10 characters).');
        isValid = false;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please fill out all required fields correctly.';
        }
        return;
      }

      // 3. Determine Endpoint
      const envEndpoint = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_FORMSPREE_ENDPOINT : null;
      const htmlEndpoint = contactForm.getAttribute('data-endpoint');
      const endpoint = envEndpoint || htmlEndpoint || 'https://formspree.io/f/[PUT_YOUR_FORMSPREE_ID_HERE]';

      // Check if endpoint is still placeholder
      if (endpoint.includes('[PUT_YOUR_FORMSPREE_ID_HERE]')) {
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = '⚠️ Formspree endpoint placeholder detected! Please replace [PUT_YOUR_FORMSPREE_ID_HERE] with your actual Formspree ID in index.html or .env file.';
        }
        console.warn('Formspree Form ID is not configured. Configure VITE_FORMSPREE_ENDPOINT in .env or data-endpoint attribute.');
        return;
      }

      // 4. Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'Sending Message...';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success State
          if (formStatus) {
            formStatus.className = 'form-status success';
            formStatus.textContent = '✅ Thank you! Your message has been sent successfully. I will get back to you soon.';
          }
          contactForm.reset();
        } else {
          // Server Error Response
          const json = await response.json().catch(() => ({}));
          const errorMsg = json.errors ? json.errors.map(e => e.message).join(', ') : 'Failed to send message.';
          if (formStatus) {
            formStatus.className = 'form-status error';
            formStatus.textContent = `❌ ${errorMsg} Please try again or email directly to aymanalrahabi@gmail.com.`;
          }
        }
      } catch (err) {
        console.error('Submission error:', err);
        if (formStatus) {
          formStatus.className = 'form-status error';
          formStatus.textContent = '❌ Network error. Please check your internet connection or email directly to aymanalrahabi@gmail.com.';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          const btnText = submitBtn.querySelector('.btn-text');
          if (btnText) btnText.textContent = 'Send Message';
        }
      }
    });
  }

  function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  // ── Fine Pointer Cursor Glow Effect ──
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  });

});
