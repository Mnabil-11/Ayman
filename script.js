/* ============================================
   AYMAN AL-RAHBI - Portfolio JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Page Loader ──
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 500);
  });

  // ── Theme Toggle ──
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ── Navbar Scroll Effect ──
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Navbar shrink
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (currentScroll > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    lastScroll = currentScroll;
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Mobile Menu ──
  const navMenuBtn = document.getElementById('navMenuBtn');
  const navLinks = document.getElementById('navLinks');

  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenuBtn.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

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

  // ── Scroll Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

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

  // ── Counter Animation ──
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
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
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Add fadeIn keyframes dynamically
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(styleSheet);

  // ── Project Modal ──
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalClient = document.getElementById('modalClient');
  const modalDuration = document.getElementById('modalDuration');
  const modalArea = document.getElementById('modalArea');

  const projectData = {
    1: {
      title: 'Residential Tower Design',
      category: 'Residential',
      description: 'Academic graduation project: Complete structural design and analysis of a 10-story residential tower using ETABS and SAP2000. Included seismic analysis, foundation design, and detailed reinforcement drawings in AutoCAD.',
      client: 'Graduation Project',
      duration: '6 Months',
      area: '5,000 m²'
    },
    2: {
      title: 'Commercial Center Analysis',
      category: 'Commercial',
      description: 'Coursework project: Structural analysis and design of a 3-story commercial center. Performed load calculations, designed RC elements (beams, columns, slabs), and created detailed construction drawings.',
      client: 'Academic Course',
      duration: '3 Months',
      area: '2,500 m²'
    },
    3: {
      title: 'Bridge Design Study',
      category: 'Infrastructure',
      description: 'Academic project: Feasibility study and preliminary design of a pre-stressed concrete bridge. Included load analysis, material selection, and structural optimization using SAP2000.',
      client: 'Academic Course',
      duration: '2 Months',
      area: '120m Span'
    },
    4: {
      title: 'Villa Structural Design',
      category: 'Residential',
      description: 'Individual project: Complete structural design of a modern 2-story villa with swimming pool. Designed foundations, RC frame, and retaining walls. Created full set of construction drawings in AutoCAD.',
      client: 'Personal Project',
      duration: '2 Months',
      area: '400 m²'
    },
    5: {
      title: 'Road Design Project',
      category: 'Infrastructure',
      description: 'Coursework project: Geometric design of a 2km road section including horizontal and vertical alignment, cross-sections, earthwork calculations, and drainage design.',
      client: 'Academic Course',
      duration: '1.5 Months',
      area: '2 km'
    },
    6: {
      title: 'Internship Site Project',
      category: 'Commercial',
      description: 'During my summer internship, I assisted in the construction supervision of an industrial warehouse. Responsibilities included concrete quality testing, rebar inspection, and progress documentation.',
      client: 'Summer Internship',
      duration: '2 Months',
      area: '3,000 m²'
    }
  };

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project');
      const data = projectData[projectId];
      const img = card.querySelector('img');

      modalImage.src = img.src;
      modalImage.alt = data.title;
      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDescription.textContent = data.description;
      modalClient.textContent = data.client;
      modalDuration.textContent = data.duration;
      modalArea.textContent = data.area;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Testimonials Slider ──
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testimonial-card').length;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
  });

  nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.getAttribute('data-index')));
    });
  });

  // Auto-slide every 5 seconds
  let autoSlide = setInterval(() => {
    goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
  }, 5000);

  // Pause auto-slide on hover
  const sliderContainer = document.querySelector('.testimonials-slider');
  sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      goToSlide(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
    }, 5000);
  });

  // ── Contact Form ──
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Message Sent!
    `;
    submitBtn.style.background = 'linear-gradient(135deg, #2d7d9a, #1a3a5c)';

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  // ── Cursor Glow Effect ──
  const cursorGlow = document.getElementById('cursorGlow');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Parallax Effect on Hero ──
  const heroBg = document.querySelector('.hero-bg img');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
    }
  });

});
