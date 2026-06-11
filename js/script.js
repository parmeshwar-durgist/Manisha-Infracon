/**
 * Manisha Infracon (Ready Mix Concrete) - Premium Custom Core JavaScript
 * Handles custom animations, sticky headers, stats counter, filterable gallery, and forms validation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Preloader Fade Out
  // ==========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 500); // 500ms smooth delay
    });
  }

  // ==========================================
  // 2. Sticky Navbar Scroll State
  // ==========================================

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check
  }

  // ==========================================
  // 3. Dynamic Active Navbar Links Based on Path
  // ==========================================
  
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ==========================================
  // 4. Custom Intersection Observer scroll reveal
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ==========================================
  // 5. Animated Stats Counters
  // ==========================================

  const counterElements = document.querySelectorAll('.stat-num');
  if (counterElements.length > 0) {
    const startCounterAnimation = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 2000; // Animation duration in ms
      const stepTime = Math.max(Math.floor(duration / target), 15);
      let current = 0;
      const suffix = el.getAttribute('data-suffix') || '';

      const timer = setInterval(() => {
        current += Math.ceil(target / (duration / stepTime));
        if (current >= target) {
          el.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          el.textContent = current.toLocaleString() + suffix;
        }
      }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounterAnimation(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counterElements.forEach(el => counterObserver.observe(el));
  }

  // ==========================================
  // 6. Back To Top Button Behavior
  // ==========================================
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 7. Interactive Filterable Gallery
  // ==========================================
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-col');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ==========================================
  // 8. Custom Lightbox Modal Injector
  // ==========================================
  const lightboxTriggers = document.querySelectorAll('[data-lightbox-src]');
  const lightboxModalEl = document.getElementById('lightboxModal');

  if (lightboxTriggers.length > 0 && lightboxModalEl) {
    const modalImage = lightboxModalEl.querySelector('.lightbox-modal-img');
    const modalCaption = lightboxModalEl.querySelector('.lightbox-modal-caption');

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const src = trigger.getAttribute('data-lightbox-src');
        const caption = trigger.getAttribute('data-lightbox-caption') || '';

        if (modalImage) modalImage.setAttribute('src', src);
        if (modalCaption) modalCaption.textContent = caption;
      });
    });
  }

  // ==========================================
  // 9. Get Quote Dynamic Modal Pre-fill
  // ==========================================
  const quoteModalEl = document.getElementById('quoteModal');
  if (quoteModalEl) {
    const productSelect = quoteModalEl.querySelector('#quoteProductSelect');

    quoteModalEl.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      if (button && productSelect) {
        const productName = button.getAttribute('data-product');
        if (productName) {
          productSelect.value = productName;
        }
      }
    });
  }

  // ==========================================
  // 10. Bootstrap Form Client-Side Validation & Web3Forms Sending
  // ==========================================
  const WEB3FORMS_CONFIG = {
    AccessKey: "abda9378-b774-4cf5-8a5a-b4692df25017", // Get a free key instantly by entering your email at web3forms.com
    ToEmail: "durgistparmeshwar@gmail.com"
  };

  const showErrorAlert = (form, errorMsg, submitBtn, originalBtnHTML) => {
    // Remove old alerts if visible
    const existingAlerts = form.parentElement.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    let configWarning = "";
    if (WEB3FORMS_CONFIG.AccessKey.startsWith("YOUR_")) {
      configWarning = `<br><span class="badge bg-warning text-dark mt-2 p-2" style="font-size: 0.82rem; white-space: normal; text-align: left; display: block; line-height: 1.4; border: 1px solid #d97706;">
        <i class="bi bi-info-circle-fill me-1"></i> <strong>Configuration Required:</strong> Please replace the placeholder Web3Forms AccessKey in <code>js/script.js</code> with your actual key from <strong>web3forms.com</strong>.
      </span>`;
    }

    // Display error message 
    const formParent = form.parentElement;
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger alert-dismissible fade show mt-4';
    errorAlert.innerHTML = `
      <strong><i class="bi bi-exclamation-triangle-fill me-2"></i>Submission Failed</strong><br>
      ${errorMsg}
      ${configWarning}
      <br>Please check your network, verify your SMTP credentials on your hosting, or contact us directly at <strong>+91 9657847967</strong>.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    formParent.appendChild(errorAlert);
    errorAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Re-enable and restore button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHTML;
  };

  const validatedForms = document.querySelectorAll('.needs-validation');
  validatedForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      form.classList.add('was-validated');

      const submitBtn = form.querySelector('[type="submit"]');
      const originalBtnHTML = submitBtn.innerHTML;

      // Disable button and show loading spinner
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...`;

      let payload = {
        access_key: WEB3FORMS_CONFIG.AccessKey,
        from_name: "",
        email: ""
      };
      
      let waText = `*New Manisha Infracon Inquiry*\n\n`;
      
      if (form.id === 'contactPageForm') {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const sector = document.getElementById('projectType').value;
        const grade = document.getElementById('requiredGrade').value;
        const message = document.getElementById('contactMsg').value;
        
        payload.subject = `New Manisha Infracon Contact Inquiry from ${name}`;
        payload.from_name = name;
        payload.email = email;
        payload["Phone Number"] = phone;
        payload["Project Sector"] = sector;
        payload["Concrete Grade"] = grade;
        payload.message = message;

        waText += `*Type:* New Manisha Infracon Contact Inquiry\n`;
        waText += `*Name:* ${name}\n`;
        waText += `*Email:* ${email}\n`;
        waText += `*Phone:* ${phone}\n`;
        waText += `*Project Sector:* ${sector}\n`;
        waText += `*Concrete Grade:* ${grade}\n`;
        waText += `*Message:* ${message}\n`;
      } else if (form.id === 'homepageContactForm') {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const grade = document.getElementById('concreteGrade').value;
        const message = document.getElementById('message').value;
        
        payload.subject = `New Manisha Infracon Homepage Inquiry from ${name}`;
        payload.from_name = name;
        payload.email = email;
        payload["Phone Number"] = phone;
        payload["Concrete Grade"] = grade;
        payload.message = message;

        waText += `*Type:* New Manisha Infracon Homepage Inquiry\n`;
        waText += `*Name:* ${name}\n`;
        waText += `*Email:* ${email}\n`;
        waText += `*Phone:* ${phone}\n`;
        waText += `*Concrete Grade:* ${grade}\n`;
        waText += `*Message:* ${message}\n`;
      } else if (form.id === 'quoteRequestForm') {
        const name = document.getElementById('quoteName').value;
        const email = document.getElementById('quoteEmail').value;
        const phone = document.getElementById('quotePhone').value;
        const product = document.getElementById('quoteProductSelect').value;
        const qty = document.getElementById('quoteQty').value;
        const message = document.getElementById('quoteMessage').value;
        
        payload.subject = `New Manisha Infracon Quote Request from ${name}`;
        payload.from_name = name;
        payload.email = email;
        payload["Phone Number"] = phone;
        payload["Concrete Product"] = product;
        payload["Est Volume (m³)"] = qty;
        payload.message = message || 'None';

        waText += `*Type:* New Manisha Infracon Quote Request\n`;
        waText += `*Name:* ${name}\n`;
        waText += `*Email:* ${email}\n`;
        waText += `*Phone:* ${phone}\n`;
        waText += `*Concrete Product:* ${product}\n`;
        waText += `*Volume:* ${qty} m³\n`;
        waText += `*Message:* ${message || 'None'}\n`;
      } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        return;
      }

      // Open WhatsApp immediately inside synchronous user click event handler (avoids popup block)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const waUrl = isMobile 
        ? `whatsapp://send?phone=919657847967&text=${encodeURIComponent(waText)}`
        : `https://wa.me/919657847967?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');

      // Submit to Web3Forms API in the background
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(async (response) => {
          let json = await response.json();
          if (response.status == 200 || json.success) {
            // Reset form inputs & validation visual styles
            form.reset();
            form.classList.remove('was-validated');

            // Remove old alerts if visible
            const existingAlerts = form.parentElement.querySelectorAll('.alert');
            existingAlerts.forEach(alert => alert.remove());

            // Display success message
            const formParent = form.parentElement;
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success alert-dismissible fade show mt-4';
            successAlert.innerHTML = `
              <strong><i class="bi bi-check-circle-fill me-2"></i>Inquiry Submitted Successfully!</strong><br>
              Your message has been sent directly to <strong>${WEB3FORMS_CONFIG.ToEmail}</strong>. 
              <br><br>
              <a href="${waUrl}" target="_blank" class="btn btn-success btn-sm text-white" style="font-size: 0.85rem; border-radius: 6px; padding: 6px 12px;">
                <i class="bi bi-whatsapp me-1"></i> Resend via WhatsApp
              </a>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            formParent.appendChild(successAlert);
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Close modal automatically if applicable
            const modalEl = form.closest('.modal');
            if (modalEl) {
              setTimeout(() => {
                const bootstrapModal = bootstrap.Modal.getInstance(modalEl);
                if (bootstrapModal) {
                  bootstrapModal.hide();
                }
              }, 4500);
            }
          } else {
            showErrorAlert(form, json.message || 'Error executing email delivery.', submitBtn, originalBtnHTML);
          }
        })
        .catch(error => {
          showErrorAlert(form, `Network or server error: ${error.message || error}`, submitBtn, originalBtnHTML);
        })
        .finally(() => {
          // Re-enable and restore button
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        });
    }, false);
  });

  // ==========================================
  // 11. Newsletter Form Submit Message
  // ==========================================
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  });

  // ==========================================
  // 12. AI Agent Chatbot Widget Core Logic & Interactive Q&A
  // ==========================================

  const CHAT_DATABASE = {
    grades: {
      title: "Grades & Mixes",
      questions: [
        {
          q: "What is the difference between M20, M25, and M40?",
          a: "The <strong>'M' stands for 'Mix'</strong> and the number represents the characteristic compressive strength in <strong>Megapascals (MPa)</strong> or N/mm² at 28 days of curing. For example, M25 concrete will withstand a crushing pressure of 25 MPa. M20-M25 are standard for residential house slabs, while M40 and above are engineered for high-load structural columns and foundations."
        },
        {
          q: "What is Self-Compacting Concrete (SCC)?",
          a: "<strong>Self-Compacting Concrete (SCC)</strong> is a highly flowable concrete mix that spreads into formwork and passes congested steel rebar under its own gravity weight, without segregation. You should use it for dense reinforcement setups, thin structural columns, or where mechanical vibrator access is blocked."
        },
        {
          q: "What is Fiber Reinforced Concrete?",
          a: "<strong>Fiber-reinforced concrete</strong> contains distributed synthetic or steel fibers. While micro-synthetic fibers (PP) prevent shrinkage micro-cracking, they do NOT replace structural steel rebar. However, macro-synthetic or steel fibers can replace structural mesh in industrial floors and pavements."
        }
      ]
    },
    curing: {
      title: "Curing & Weather",
      questions: [
        {
          q: "What is concrete curing and why is it essential?",
          a: "<strong>Curing</strong> is the maintenance of moisture and temperature conditions in freshly poured concrete to allow hydration. Proper curing (sprinkling water, ponding, or applying curing compounds) is essential to secure target compressive strengths, prevent shrinkage cracks, and maximize durability."
        },
        {
          q: "How long does concrete take to reach full strength?",
          a: "Concrete reaches about <strong>16% of its strength in 24 hours, 65% in 7 days</strong>, and its nominal design strength (100%) at 28 days. Curing must be actively maintained for at least the first 7 to 10 days for standard mixes."
        },
        {
          q: "Can concrete be poured in rainy conditions?",
          a: "Light rain is generally manageable if the slab is covered with plastic sheeting immediately after leveling. However, <strong>heavy downpours will wash away the surface cement paste</strong>, increase the water-binder ratio, and permanently weaken the concrete surface. We recommend rescheduling during heavy rains."
        },
        {
          q: "What curing guidelines are followed for slab concrete?",
          a: "For slabs, <strong>ponding</strong> is the most effective curing method: build small sand/clay dikes around slab sections and fill them with 25-50mm of water. Curing should begin as soon as the concrete surface has set enough to resist damage, and must continue for a minimum of 7 days (or 10 days for blended cements)."
        }
      ]
    },
    delivery: {
      title: "Delivery & Access",
      questions: [
        {
          q: "How long do I have to place concrete on arrival?",
          a: "Normally, concrete should be discharged and placed <strong>within 90 to 120 minutes</strong> from the time it was batched at the plant (not from when it arrived at your site). For distant sites or hot weather, we add specialized hydration retarder admixtures to extend this placement window to 3 hours."
        },
        {
          q: "What road access is required for transit mixers?",
          a: "A loaded transit mixer weighs up to <strong>32 tons</strong>. Access roads must be at least 3.5 meters wide, clear of low-hanging electric wires, and solid enough to prevent sinking. If a boom pump is needed, additional clearance is required to extend stabilizer outriggers."
        },
        {
          q: "What is the minimum ordering volume for RMC?",
          a: "Our standard transit mixer truck holds 6 to 10 cubic meters. Our <strong>minimum ordering capacity is 3 cubic meters</strong>. Orders smaller than this incur a small dry-run transportation surcharge, or can be supplied as Bag Concrete."
        }
      ]
    },
    green: {
      title: "Green Concrete",
      questions: [
        {
          q: "What is Green Concrete and how does it help?",
          a: "<strong>Green Concrete</strong> is an eco-friendly mix design that replaces a portion of high-emissions Portland cement with recycled materials like fly ash (from power plants) or slag (from steel manufacturing). It reduces carbon footprints by up to 50%, reduces heat generation, and helps earn LEED/IGBC rating points."
        }
      ]
    },
    pricing: {
      title: "Pricing & Vol",
      questions: [
        {
          q: "How do I calculate concrete volume for my project?",
          a: "Concrete volume is calculated in cubic meters (m³). The formula is: <strong>Length (m) &times; Width (m) &times; Thickness/Depth (m) = Volume (m³)</strong>. We recommend adding a 5% to 10% wastage buffer to account for spillage, formwork deflection, and minor grade changes."
        },
        {
          q: "How is the pricing of RMC calculated?",
          a: "Concrete cost is calculated per cubic meter (m³) and depends on the specified strength grade (e.g. M25 vs M40), aggregate sizes, additives, and site pump rental requirements. You can submit our 'Request Quote' forms, or call our direct billing office at <strong>+91 9657847967</strong> for an instant rate list!"
        }
      ]
    }
  };

  const injectChatbot = () => {
    const chatWidgetHTML = `
      <div class="chat-widget" id="chatWidget">
        <style>
          .chat-chip-container {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin-top: 12px;
            margin-bottom: 8px;
          }
          .chat-chip {
            background-color: rgba(15, 45, 89, 0.05);
            color: #0f2d59;
            border: 1px solid rgba(15, 45, 89, 0.15);
            border-radius: 16px;
            padding: 5px 10px;
            font-size: 0.72rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-weight: 600;
          }
          .chat-chip:hover {
            background-color: #ea580c;
            color: #ffffff;
            border-color: #ea580c;
          }
          .chat-chip.active {
            background-color: #0f2d59;
            color: #ffffff;
            border-color: #0f2d59;
          }
          .chat-questions-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-top: 8px;
            animation: fadeInChat 0.3s ease;
            border-top: 1px solid #f1f5f9;
            padding-top: 10px;
          }
          .chat-question-item {
            background-color: #ffffff;
            color: #334155;
            border: 1px dashed #ea580c;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 0.76rem;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
            line-height: 1.35;
          }
          .chat-question-item:hover {
            background-color: #fff7ed;
            color: #ea580c;
            border-style: solid;
          }
          .chat-message.bot .message-content strong {
            color: #ea580c;
          }
          @keyframes fadeInChat {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>

        <button class="chat-toggle-btn" id="chatToggleBtn" aria-label="Open Chat">
          <i class="bi bi-chat-dots-fill"></i>
          <span class="chat-badge d-none">1</span>
        </button>
        <div class="chat-window d-none" id="chatWindow">
          <div class="chat-header">
            <div class="d-flex align-items-center">
              <div class="chat-avatar bg-orange text-white me-2 d-flex align-items-center justify-content-center" style="width:36px; height:36px; border-radius:50%; border:2px solid rgba(255,255,255,0.2);">
                <i class="bi bi-robot"></i>
              </div>
              <div>
                <h6 class="mb-0 fw-bold text-white" style="font-size:0.9rem; line-height:1.2;">Manisha Concrete Agent</h6>
                <small class="text-white-50 text-xs" style="font-size:0.7rem; display:block; margin-top:2px;">AI Assistant • Online</small>
              </div>
            </div>
            <button class="chat-close-btn" id="chatCloseBtn" aria-label="Close Chat">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="chat-body" id="chatBody">
            <div class="chat-message bot">
              <div class="message-content">
                Hello! I am your <strong>Manisha Concrete Assistant</strong>. How can I help you today with your ready-mix concrete project? 
                <br><br>
                Please select a topic category below to see common questions, or type your question in the chat!
              </div>
              <span class="message-time">Just now</span>
            </div>
            
            <!-- Quick Category Selection Chips -->
            <div class="chat-chip-container" id="chatCategoryChips"></div>
            
            <!-- Active Questions List -->
            <div class="chat-questions-list" id="chatQuestionsList"></div>
          </div>
          <div class="chat-footer">
            <form id="chatForm" class="d-flex align-items-center w-100 m-0">
              <input type="text" id="chatInput" class="form-control me-2" placeholder="Type your question..." required autocomplete="off">
              <button type="submit" class="btn btn-primary-custom p-0 d-flex align-items-center justify-content-center" style="width: 42px; height: 42px; border-radius: 6px; flex-shrink:0;">
                <i class="bi bi-send-fill"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.innerHTML = chatWidgetHTML.trim();
    document.body.appendChild(div.firstChild);
  };

  // Inject the markup
  injectChatbot();

  // Elements
  const chatWidget = document.getElementById('chatWidget');
  const chatToggleBtn = document.getElementById('chatToggleBtn');
  const chatWindow = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatBody = document.getElementById('chatBody');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBadge = chatWidget.querySelector('.chat-badge');
  const chatCategoryChips = document.getElementById('chatCategoryChips');
  const chatQuestionsList = document.getElementById('chatQuestionsList');

  let hasOpenedChat = false;

  // Toggle open
  chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('d-none');
    if (!hasOpenedChat) {
      hasOpenedChat = true;
      chatBadge.classList.add('d-none');
    }
    // Auto scroll chat to bottom on open
    setTimeout(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 100);
  });

  // Toggle close
  chatCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.add('d-none');
  });

  // Show a notification badge after 4 seconds if not opened
  setTimeout(() => {
    if (!hasOpenedChat && chatBadge) {
      chatBadge.classList.remove('d-none');
    }
  }, 4000);

  // Render Category Chips
  const renderCategoryChips = () => {
    chatCategoryChips.innerHTML = "";
    Object.keys(CHAT_DATABASE).forEach((key, index) => {
      const chip = document.createElement('div');
      chip.className = `chat-chip ${index === 0 ? 'active' : ''}`;
      chip.textContent = CHAT_DATABASE[key].title;
      chip.setAttribute('data-category', key);
      chip.addEventListener('click', () => {
        // Toggle active class
        chatCategoryChips.querySelectorAll('.chat-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        // Render corresponding questions
        renderQuestions(key);
      });
      chatCategoryChips.appendChild(chip);
    });
  };

  // Render Questions inside the list
  const renderQuestions = (categoryKey) => {
    chatQuestionsList.innerHTML = "";
    const category = CHAT_DATABASE[categoryKey];
    if (!category) return;

    category.questions.forEach(item => {
      const qItem = document.createElement('div');
      qItem.className = "chat-question-item";
      qItem.textContent = item.q;
      qItem.addEventListener('click', () => {
        triggerBotQA(item.q, item.a);
      });
      chatQuestionsList.appendChild(qItem);
    });
  };

  // Execute bot QA triggers on click
  const triggerBotQA = (userQuestion, botAnswer) => {
    // 1. Append User Message
    const userMsgHTML = `
      <div class="chat-message user">
        <div class="message-content">${userQuestion}</div>
        <span class="message-time">Just now</span>
      </div>
    `;
    chatCategoryChips.insertAdjacentHTML('beforebegin', userMsgHTML);

    // Scroll the new user message into view
    const messages = chatBody.querySelectorAll('.chat-message');
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg) {
      lastUserMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 2. Append Typing Indicator
    const typingHTML = `
      <div class="typing-indicator" id="typingIndicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatCategoryChips.insertAdjacentHTML('beforebegin', typingHTML);
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 3. Trigger Bot Response
    setTimeout(() => {
      if (typingIndicator) typingIndicator.remove();

      const botMsgHTML = `
        <div class="chat-message bot">
          <div class="message-content">${botAnswer}</div>
          <span class="message-time">Just now</span>
        </div>
      `;
      chatCategoryChips.insertAdjacentHTML('beforebegin', botMsgHTML);

      // Scroll the new bot response into view so it is focused
      const botMessages = chatBody.querySelectorAll('.chat-message.bot');
      const lastBotMsg = botMessages[botMessages.length - 1];
      if (lastBotMsg) {
        lastBotMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  };

  // Chat Responses Engine for Typed Messages
  const getBotResponse = (message) => {
    const text = message.toLowerCase().trim();

    // Check database exact keyword counts matches first
    let bestMatch = null;
    let maxMatches = 0;

    Object.keys(CHAT_DATABASE).forEach(categoryKey => {
      CHAT_DATABASE[categoryKey].questions.forEach(item => {
        const questionWords = item.q.toLowerCase().split(/\s+/);
        let matches = 0;
        questionWords.forEach(word => {
          if (word.length > 3 && text.includes(word)) {
            matches++;
          }
        });
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = item.a;
        }
      });
    });

    if (maxMatches >= 2 && bestMatch) {
      return bestMatch;
    }

    // Default keyword fallbacks
    if (text.includes('grade') || text.includes('strength') || text.includes('m20') || text.includes('m25') || text.includes('m40') || text.includes('mix')) {
      return "Manisha Infracon offers computer-controlled grades ranging from <strong>M5 up to M100</strong>. For standard residential slabs and columns, M20 or M25 are typically recommended. For heavy structural columns, M40 and above are engineered.";
    }
    if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('estimate') || text.includes('how much')) {
      return "Concrete cost is calculated per cubic meter (m³) and depends on the strength grade (e.g. M25 vs M40), aggregates, additives, and pump requirements. Submit a 'Request Quote' form or call our sales planners at <strong>+91 9657847967</strong>.";
    }
    if (text.includes('delivery') || text.includes('time') || text.includes('schedule') || text.includes('dispatch')) {
      return "Our GPS-tracked transit mixers operate 24/7. We recommend booking your order 24 to 48 hours in advance to guarantee your schedule matches your casting crew.";
    }
    if (text.includes('testing') || text.includes('quality') || text.includes('slump') || text.includes('cube') || text.includes('iso')) {
      return "All batches undergo digital weight verification, slump-cone workability checks, and compressive cube testing in our NABL-accredited laboratory, complying fully with ISO 9001.";
    }
    if (text.includes('green') || text.includes('eco') || text.includes('sustainable') || text.includes('carbon')) {
      return "Our Green Concrete replaces cement with fly ash or slag, cutting the carbon footprint by up to 50% without compromising load capacity. Earns major LEED/IGBC rating points!";
    }
    if (text.includes('pump') || text.includes('boom') || text.includes('logistics') || text.includes('truck')) {
      return "We operate a modern logistics fleet including transit mixers and mobile concrete boom pumps (36m to 56m length) to place concrete directly at any height, overcoming site access challenges.";
    }
    if (text.includes('location') || text.includes('plant') || text.includes('where') || text.includes('address')) {
      return "We are headquartered in Sector 4, Metro City. We operate 12 fully automated batching plants positioned strategically around the region to ensure fast transit times.";
    }
    if (text.includes('contact') || text.includes('phone') || text.includes('email') || text.includes('number') || text.includes('sales')) {
      return "You can reach our sales planners at <strong>+91 9657847967</strong> or email us at <strong>info@manishainfracon.com</strong>. For emergency logistics, our hotlines are open 24/7!";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('support')) {
      return "Hello! I am ready to assist. You can ask me questions about RMC grades, scheduling, laboratory certifications, or pricing. How can I help you today?";
    }

    return "Thank you for that detail! I can provide grade recommendations, volume estimations, or dispatch guidelines. Feel free to reach our concrete consultants directly at <strong>+91 9657847967</strong> or write to <strong>info@manishainfracon.com</strong>.";
  };

  // Submit custom typed message handler
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessageText = chatInput.value.trim();
    if (!userMessageText) return;

    // 1. Append User Message
    const userMsgHTML = `
      <div class="chat-message user">
        <div class="message-content">${userMessageText}</div>
        <span class="message-time">Just now</span>
      </div>
    `;
    chatCategoryChips.insertAdjacentHTML('beforebegin', userMsgHTML);
    chatInput.value = '';

    // Scroll the new user message into view
    const messages = chatBody.querySelectorAll('.chat-message');
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg) {
      lastUserMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 2. Append Typing Indicator
    const typingHTML = `
      <div class="typing-indicator" id="typingIndicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    chatCategoryChips.insertAdjacentHTML('beforebegin', typingHTML);
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 3. Trigger Bot Response
    setTimeout(() => {
      if (typingIndicator) typingIndicator.remove();

      const botMessageText = getBotResponse(userMessageText);
      const botMsgHTML = `
        <div class="chat-message bot">
          <div class="message-content">${botMessageText}</div>
          <span class="message-time">Just now</span>
        </div>
      `;
      chatCategoryChips.insertAdjacentHTML('beforebegin', botMsgHTML);

      // Scroll the new bot response into view so it is focused
      const botMessages = chatBody.querySelectorAll('.chat-message.bot');
      const lastBotMsg = botMessages[botMessages.length - 1];
      if (lastBotMsg) {
        lastBotMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 1000);
  });

  // Helper to open WhatsApp directly (bypassing browser landing pages on mobile)
  const openWhatsAppDirect = (text) => {
    const phone = '919657847967';
    const encodedText = encodeURIComponent(text);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let url;
    if (isMobile) {
      url = `whatsapp://send?phone=${phone}&text=${encodedText}`;
    } else {
      url = `https://wa.me/${phone}?text=${encodedText}`;
    }
    window.open(url, '_blank');
  };

  // Inject Floating WhatsApp Button (bottom left)
  const injectWhatsAppButton = () => {
    const waButtonHTML = `
      <div class="wa-floating-btn" id="waFloatingBtn" style="position: fixed; bottom: 90px; left: 30px; z-index: 1000;">
        <style>
          .wa-btn {
            width: 56px;
            height: 56px;
            background-color: #25d366;
            color: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
          }
          .wa-btn:hover {
            background-color: #128c7e;
            transform: scale(1.08);
            box-shadow: 0 8px 25px rgba(18, 140, 126, 0.45);
            color: #ffffff;
          }
        </style>
        <button class="wa-btn" id="waDirectBtn" aria-label="Chat on WhatsApp" style="border: none; outline: none;">
          <i class="bi bi-whatsapp"></i>
        </button>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = waButtonHTML.trim();
    document.body.appendChild(div.firstChild);

    // Bind click event for direct opening
    const btn = document.getElementById('waDirectBtn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const defaultMsg = "Hello Manisha Infracon, I would like to inquire about ready-mix concrete.";
        openWhatsAppDirect(defaultMsg);
      });
    }
  };

  // Initial renders
  injectWhatsAppButton();
  renderCategoryChips();
  renderQuestions('grades');

});
