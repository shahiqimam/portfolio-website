/* ========================================
   PREMIUM PORTFOLIO JAVASCRIPT
   ======================================== */

// Global variables
let isDarkMode = false;
let currentFilter = 'all';
let isTyping = false;
let typingIndex = 0;
let typingTexts = [
  'AI Expert & Developer',
  'Machine Learning Engineer',
  'Deep Learning Specialist',
  'Neural Network Architect',
  'Computer Vision Expert',
  'NLP & AI Researcher'
];

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Initialize loading screen
  initializeLoadingScreen();
  
  // Initialize navigation
  initializeNavigation();
  
  // Initialize hero section
  initializeHeroSection();
  
  // Initialize animations
  initializeAnimations();
  
  // Initialize projects
  initializeProjects();
  
  // Initialize contact form
  initializeContactForm();
  
  // Initialize counters
  initializeCounters();
  
  // Initialize skill bars
  initializeSkillBars();
  
  // Initialize theme
  initializeTheme();
  
  // Initialize scroll effects
  initializeScrollEffects();
  
  // Initialize particles
  initializeParticles();
}

// ========================================
// LOADING SCREEN
// ========================================

function initializeLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-screen');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 1500);
  });
}

// ========================================
// NAVIGATION
// ========================================

function initializeNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// HERO SECTION
// ========================================

function initializeHeroSection() {
  const typingElement = document.getElementById('typing-text');
  
  // Start typing animation
  setTimeout(() => {
    startTypingAnimation();
  }, 2000);
}

function startTypingAnimation() {
  if (isTyping) return;
  
  isTyping = true;
  typeText();
}

function typeText() {
  const typingElement = document.getElementById('typing-text');
  const currentText = typingTexts[typingIndex];
  
  let charIndex = 0;
  const typeSpeed = 100;
  
  function typeChar() {
    if (charIndex < currentText.length) {
      typingElement.textContent += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, typeSpeed);
    } else {
      setTimeout(() => {
        deleteText();
      }, 2000);
    }
  }
  
  function deleteText() {
    if (charIndex > 0) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(deleteText, 50);
    } else {
      typingIndex = (typingIndex + 1) % typingTexts.length;
      setTimeout(() => {
        isTyping = false;
        typeText();
      }, 500);
    }
  }
  
  typeChar();
}

// ========================================
// ANIMATIONS & PARTICLES
// ========================================

function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll('.section, .project-card, .stat-item, .skill-item');
  animatedElements.forEach((element, index) => {
    element.classList.add('fade-in');
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
}

function initializeParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 6 + 's';
  particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
  
  const size = Math.random() * 3 + 1;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  
  container.appendChild(particle);
}

// ========================================
// PROJECTS
// ========================================

function initializeProjects() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      filterProjects(filter, projectCards);
    });
  });
}

function filterProjects(filter, cards) {
  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      card.classList.remove('hidden');
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.8)';
      setTimeout(() => {
        card.classList.add('hidden');
      }, 300);
    }
  });
}

// ========================================
// CONTACT FORM
// ========================================

function initializeContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.style.background = 'var(--success-color)';
      
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        showNotification('Message sent successfully! 🚀', 'success');
      }, 2000);
    }, 2000);
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--white);
    color: var(--gray-900);
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease-out;
    border-left: 4px solid var(--${type === 'success' ? 'success' : 'primary'}-color);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// ========================================
// COUNTERS & SKILL BARS
// ========================================

function initializeCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBar(entry.target);
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

function animateSkillBar(element) {
  const width = element.getAttribute('data-width');
  element.style.width = '0%';
  
  setTimeout(() => {
    element.style.width = width;
  }, 500);
}

// ========================================
// THEME & SCROLL EFFECTS
// ========================================

function initializeTheme() {
  const themeToggle = document.getElementById('dark-toggle');
  const icon = themeToggle.querySelector('i');
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    isDarkMode = savedTheme === 'light';
    updateTheme();
  }
  
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    updateTheme();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

function updateTheme() {
  const body = document.body;
  const icon = document.querySelector('#dark-toggle i');
  
  if (isDarkMode) {
    body.classList.add('light');
    body.setAttribute('data-theme', 'light');
    icon.className = 'fas fa-moon';
  } else {
    body.classList.remove('light');
    body.setAttribute('data-theme', 'dark');
    icon.className = 'fas fa-sun';
  }
}

function initializeScrollEffects() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05);
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

console.log('🚀 Premium Portfolio initialized successfully!');
  