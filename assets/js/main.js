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
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
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
});
