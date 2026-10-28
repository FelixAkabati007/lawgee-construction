/**
 * Lawgee Construction Works & Architectural Consult
 * Main JavaScript Interactions across all pages
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 2. Portfolio Filtering (if on portfolio page or home)
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-amber-600', 'text-white', 'shadow-md');
          b.classList.add('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        });
        btn.classList.remove('bg-slate-100', 'text-slate-700', 'hover:bg-slate-200');
        btn.classList.add('bg-amber-600', 'text-white', 'shadow-md');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category') || '';
          if (filterValue === 'all' || itemCategory.includes(filterValue)) {
            item.classList.remove('hidden');
            item.classList.add('block');
          } else {
            item.classList.add('hidden');
            item.classList.remove('block');
          }
        });
      });
    });
  }

  // 3. Image Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');

  function openLightbox(src, title, desc) {
    if (!lightboxModal || !lightboxImage) return;
    lightboxImage.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || 'Lawgee Architectural Project';
    if (lightboxDesc) lightboxDesc.textContent = desc || 'Lawgee Construction Works & Architectural Consult';
    lightboxModal.classList.remove('hidden');
    setTimeout(() => {
      lightboxModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    setTimeout(() => {
      lightboxModal.classList.add('hidden');
      if (lightboxImage) lightboxImage.src = '';
    }, 300);
    document.body.style.overflow = '';
  }

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-img');
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');
      if (src) {
        openLightbox(src, title, desc);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  // 4. Pop-up Dialogue Modal for Forms (Exact container style requested by user)
  const quoteModal = document.getElementById('quoteModal');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteModalBackdrop = document.getElementById('quoteModalBackdrop');
  const openQuoteButtons = document.querySelectorAll('.open-quote-modal, [data-open-quote="true"]');

  window.openQuoteModal = function(serviceName) {
    if (!quoteModal) return;
    if (serviceName) {
      const select = document.getElementById('popupQuoteService');
      if (select) select.value = serviceName;
    }
    quoteModal.classList.remove('hidden');
    setTimeout(() => {
      quoteModal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  window.closeQuoteModal = function() {
    if (!quoteModal) return;
    quoteModal.classList.remove('active');
    setTimeout(() => {
      quoteModal.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  };

  openQuoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      window.openQuoteModal(service);
    });
  });

  if (quoteModalClose) quoteModalClose.addEventListener('click', window.closeQuoteModal);
  if (quoteModalBackdrop) quoteModalBackdrop.addEventListener('click', window.closeQuoteModal);

  // Universal Escape key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
        closeLightbox();
      }
      if (quoteModal && !quoteModal.classList.contains('hidden')) {
        window.closeQuoteModal();
      }
    }
  });

  // Popup Form Submission Handler
  const popupForm = document.getElementById('popupQuoteForm');
  if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('popName')?.value || 'Valued Client';
      const phone = document.getElementById('popPhone')?.value || 'Not provided';
      const email = document.getElementById('popEmail')?.value || 'Not provided';
      const service = document.getElementById('popupQuoteService')?.value || 'General Inquiry';
      const budget = document.getElementById('popBudget')?.value || 'To be discussed';
      const location = document.getElementById('popLocation')?.value || 'Ejisu / Ashanti Region';
      const size = document.getElementById('popSize')?.value || '';
      const details = document.getElementById('popDetails')?.value || 'Requesting building design consultation';

      const action = e.submitter ? e.submitter.getAttribute('data-action') : 'whatsapp';

      if (action === 'email') {
        const subject = encodeURIComponent(`Consultation Quote Request: ${name} - ${service}`);
        const body = encodeURIComponent(`Client Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nLocation: ${location}\nBudget: ${budget}\nScale: ${size}\n\nProject Details:\n${details}`);
        window.location.href = `mailto:kinggeorgejewel@gmail.com?subject=${subject}&body=${body}`;
      } else {
        const message = `Hello Lawgee Construction & Architectural Consult,
I would like to request an official quote / building design consultation:
- *Name:* ${name}
- *Phone / WhatsApp:* ${phone}
- *Email:* ${email}
- *Service:* ${service}
- *Site Location:* ${location}
- *Scale / Size:* ${size}
- *Budget Target:* ${budget}
- *Details:* ${details}

Please contact me back to discuss. Thank you.`;
        // Primary Line: 0248 997 377 -> International Ghana format: 233248997377
        window.open(`https://wa.me/233248997377?text=${encodeURIComponent(message)}`, '_blank');
      }
    });
  }

  // 5. Contact Form Handler (on contact.html or inline)
  const contactForm = document.getElementById('mainContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cName = document.getElementById('cName')?.value || '';
      const cPhone = document.getElementById('cPhone')?.value || '';
      const cEmail = document.getElementById('cEmail')?.value || '';
      const cService = document.getElementById('cService')?.value || 'General Consultation';
      const cMsg = document.getElementById('cMsg')?.value || '';

      const action = e.submitter ? e.submitter.getAttribute('data-action') : 'whatsapp';

      if (action === 'whatsapp') {
        const text = `*New Website Enquiry - Lawgee Construction*
*Client Name:* ${cName}
*Phone / WhatsApp:* ${cPhone}
*Email:* ${cEmail}
*Service Requested:* ${cService}
*Message:* ${cMsg}`;
        window.open(`https://wa.me/233248997377?text=${encodeURIComponent(text)}`, '_blank');
      } else {
        const subject = encodeURIComponent(`Consultation Enquiry: ${cName} - ${cService}`);
        const body = encodeURIComponent(`Client Name: ${cName}\nPhone: ${cPhone}\nEmail: ${cEmail}\nService: ${cService}\n\nProject Details:\n${cMsg}`);
        window.location.href = `mailto:kinggeorgejewel@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }

  // 6. Highlight active navbar link automatically based on current pathname
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.desktop-nav-link, .mobile-nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-600', 'font-bold');
      if (link.classList.contains('mobile-nav-link')) {
        link.classList.add('bg-amber-50', 'text-amber-800');
      }
    }
  });

  // 7. Check if URL specifies to open quote modal (e.g., #open-quote)
  if (window.location.hash === '#open-quote' || window.location.hash === '#quote') {
    setTimeout(() => {
      window.openQuoteModal();
    }, 300);
  }

  // 8. Hero Featured Project Switcher (Home page)
  const heroProjects = [
    {
      img: 'assets/images/modern-residence-floorplan-30x30.jpg',
      title: 'Ahuja Contemporary Residence (G+1)',
      location: 'Ashanti Region, Ghana',
      category: '3D Elevation & 30\'x30\' Plan',
      desc: 'Modern two-storey luxury elevation featuring complete 30\'x30\' ground and first floor plans with car parking, master suite, drawing room, and family lounge.',
      stat1: '900 Sq Ft | G+1',
      stat1Sub: 'Full 30\'x30\' Plans',
      stat2: '100% Certified',
      stat2Sub: 'Permit-Ready Package'
    },
    {
      img: 'assets/images/structural-site-dimensions.jpg',
      title: 'Structural Dimensional Construction',
      location: 'Active Construction Site, Ghana',
      category: 'Dimensional Site Execution',
      desc: 'Active two-storey reinforced sandcrete blockwork execution with verified architectural dimensions (8.90m span, 5.50m garage, 2.80m ground height).',
      stat1: '8.90m Span',
      stat1Sub: 'Precision Measured',
      stat2: 'Ghana BRRI',
      stat2Sub: 'Sandcrete Standards'
    },
    {
      img: 'assets/images/construction-to-luxury-finish.jpg',
      title: 'Scaffolding to Luxury Turnkey Finish',
      location: 'Completed Turnkey Project, Ghana',
      category: 'Full Lifecycle Delivery',
      desc: 'From initial reinforced concrete casting with site scaffolding to completed contemporary black luxury residence with warm architectural strip lighting.',
      stat1: 'Full Lifecycle',
      stat1Sub: 'Ground to Handover',
      stat2: 'Turnkey Build',
      stat2Sub: '100% Finished'
    },
    {
      img: 'assets/images/design-to-sandcrete-reality.jpg',
      title: 'Concept to Sandcrete Masonry Reality',
      location: 'Ejisu – Ashanti Region',
      category: 'Masonry & Block Moulding',
      desc: 'Direct fidelity comparison: Upper 3D architectural villa render versus lower active Ghanaian sandcrete block moulding and site construction.',
      stat1: 'Sandcrete Blocks',
      stat1Sub: 'High Compressive',
      stat2: '1:1 Fidelity',
      stat2Sub: 'Render to Reality'
    },
    {
      img: 'assets/images/compact-narrow-4m-residence.jpg',
      title: 'Modern 4m Narrow-Lot Urban Villa',
      location: 'Urban Plot, Ashanti Region',
      category: 'Smart Space Architecture',
      desc: 'Architectural efficiency on narrow plots: 4-meter frontage luxury two-storey home with exterior spiral staircase, glass terrace, and courtyard parking.',
      stat1: '4m Frontage',
      stat1Sub: 'Space-Optimized',
      stat2: 'Smart Living',
      stat2Sub: 'Contemporary 2-Storey'
    },
    {
      img: 'assets/images/bungalow-3bed-ejisu.jpg',
      title: '3-Bedroom Bungalow Design',
      location: 'Ejisu, Ashanti Region',
      category: 'Residential Design',
      desc: 'Custom contemporary architectural floor plan with upper terrace balcony, landscaped veranda, and certified structural engineering drawings.',
      stat1: '100% Certified',
      stat1Sub: 'Permit-Ready Plans',
      stat2: 'Ghana BRRI',
      stat2Sub: 'Building Code'
    }
  ];

  let currentHeroIndex = 0;
  window.setHeroProject = function(index) {
    if (index < 0 || index >= heroProjects.length) return;
    currentHeroIndex = index;
    const p = heroProjects[index];

    const mainImg = document.getElementById('heroProjectImg');
    const title = document.getElementById('heroProjectTitle');
    const loc = document.getElementById('heroProjectLocation');
    const cat = document.getElementById('heroProjectCategory');
    const desc = document.getElementById('heroProjectDesc');
    const s1 = document.getElementById('heroProjectStat1');
    const s1Sub = document.getElementById('heroProjectStat1Sub');
    const s2 = document.getElementById('heroProjectStat2');
    const s2Sub = document.getElementById('heroProjectStat2Sub');
    const counter = document.getElementById('heroProjectCounter');

    if (mainImg) {
      mainImg.src = p.img;
      mainImg.setAttribute('data-img', p.img);
      mainImg.setAttribute('data-title', p.title);
      mainImg.setAttribute('data-desc', p.desc);
    }
    const fullBtn = document.getElementById('heroProjectFullBtn');
    if (fullBtn) {
      fullBtn.setAttribute('data-img', p.img);
      fullBtn.setAttribute('data-title', p.title);
      fullBtn.setAttribute('data-desc', p.desc);
    }
    if (title) title.textContent = p.title;
    if (loc) loc.innerHTML = `<i class="fa-solid fa-location-dot text-amber-400 text-[10px]"></i> ${p.location}`;
    if (cat) cat.textContent = p.category;
    if (desc) desc.textContent = p.desc;
    if (s1) s1.textContent = p.stat1;
    if (s1Sub) s1Sub.textContent = p.stat1Sub;
    if (s2) s2.textContent = p.stat2;
    if (s2Sub) s2Sub.textContent = p.stat2Sub;
    if (counter) counter.textContent = `${index + 1} / ${heroProjects.length}`;

    // Highlight thumbnail
    const thumbs = document.querySelectorAll('.hero-thumb-btn');
    thumbs.forEach((th, i) => {
      if (i === index) {
        th.classList.add('ring-2', 'ring-amber-500', 'opacity-100', 'scale-105');
        th.classList.remove('opacity-60');
      } else {
        th.classList.remove('ring-2', 'ring-amber-500', 'opacity-100', 'scale-105');
        th.classList.add('opacity-60');
      }
    });
  };

  window.nextHeroProject = function() {
    const next = (currentHeroIndex + 1) % heroProjects.length;
    window.setHeroProject(next);
  };

  window.prevHeroProject = function() {
    const prev = (currentHeroIndex - 1 + heroProjects.length) % heroProjects.length;
    window.setHeroProject(prev);
  };
});
