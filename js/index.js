      // Loading Screen
      window.addEventListener('load', () => {
          const loading = document.getElementById('loading');
          setTimeout(() => {
              loading.classList.add('hidden');
          }, 1000);
      });
      // Theme Toggle
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      const html = document.documentElement;
      const currentTheme = localStorage.getItem('theme') || 'dark';
      html.setAttribute('data-theme', currentTheme);
      themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
      themeToggle.addEventListener('click', () => {
          const theme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
          html.setAttribute('data-theme', theme);
          localStorage.setItem('theme', theme);
          themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
      });
      // Mobile Menu Toggle
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const navLinks = document.getElementById('navLinks');
      mobileMenuBtn.addEventListener('click', () => {
          navLinks.classList.toggle('active');
          mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
      });
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              navLinks.classList.remove('active');
              mobileMenuBtn.textContent = '☰';
          });
      });
      // Navbar Scroll Effect
      const navbar = document.getElementById('navbar');
      let lastScroll = 0;
      window.addEventListener('scroll', () => {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > 100) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }
          
          lastScroll = currentScroll;
      });
      // Smooth Scrolling
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
      // Scroll Reveal Animation
      const observerOptions = {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
      };
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  entry.target.classList.add('active');
              }
          });
      }, observerOptions);
      document.querySelectorAll('.scroll-reveal').forEach(el => {
          observer.observe(el);
      });
      // Animated Counter for Stats
      const animateCounter = (element, target) => {
          let current = 0;
          const increment = target / 50;
          const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                  element.textContent = target + '+';
                  clearInterval(timer);
              } else {
                  element.textContent = Math.floor(current) + '+';
              }
          }, 30);
      };
      // Trigger counter animation when stats section is visible
      const statsObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const statNumbers = entry.target.querySelectorAll('.stat-number');
                  statNumbers.forEach(stat => {
                      const target = parseInt(stat.textContent);
                      animateCounter(stat, target);
                  });
                  statsObserver.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
          statsObserver.observe(aboutSection);
      }
      // Parallax Effect on Hero
      let ticking = false;
      
      window.addEventListener('scroll', () => {
          if (!ticking) {
              window.requestAnimationFrame(() => {
                  const scrolled = window.pageYOffset;
                  const hero = document.querySelector('.hero-content');
                  
                  if (hero && scrolled < window.innerHeight) {
                      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                      hero.style.opacity = Math.max(0, 1 - (scrolled / 600));
                  }
                  
                  ticking = false;
              });
              
              ticking = true;
          }
      });
      // Skill Cards Stagger Animation
      const skillCards = document.querySelectorAll('.skill-card');
      skillCards.forEach((card, index) => {
          card.style.animationDelay = `${index * 0.05}s`;
      });
      // Project Cards Hover Effect
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
          card.addEventListener('mouseenter', function() {
              this.style.zIndex = '10';
          });
          
          card.addEventListener('mouseleave', function() {
              this.style.zIndex = '1';
          });
      });
      // Add subtle mouse tracking effect to hero section
      const hero = document.querySelector('.hero');
      if (hero) {
          hero.addEventListener('mousemove', (e) => {
              const x = e.clientX / window.innerWidth;
              const y = e.clientY / window.innerHeight;
              
              hero.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(99, 102, 241, 0.05) 0%, transparent 50%)`;
          });
      }
      // Typing effect for hero subtitle (optional enhancement)
      const subtitle = document.querySelector('.hero-subtitle');
      if (subtitle) {
          const text = subtitle.textContent;
          subtitle.textContent = '';
          let i = 0;
          
          const typeWriter = () => {
              if (i < text.length) {
                  subtitle.textContent += text.charAt(i);
                  i++;
                  setTimeout(typeWriter, 100);
              }
          };
          
          setTimeout(typeWriter, 500);
      }
      // Add active state to nav links based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      const highlightNav = () => {
          const scrollY = window.pageYOffset;
          
          sections.forEach(section => {
              const sectionHeight = section.offsetHeight;
              const sectionTop = section.offsetTop - 100;
              const sectionId = section.getAttribute('id');
              
              if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                  document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.add('active');
              } else {
                  document.querySelector(`.nav-links a[href*="${sectionId}"]`)?.classList.remove('active');
              }
          });
      };
      
      window.addEventListener('scroll', highlightNav);
      // Add smooth reveal animation to project cards
      const projectCardsObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                  setTimeout(() => {
                      entry.target.style.opacity = '1';
                      entry.target.style.transform = 'translateY(0)';
                  }, index * 100);
              }
          });
      }, { threshold: 0.1 });
      projectCards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          card.style.transition = 'all 0.6s ease';
          projectCardsObserver.observe(card);
      });
      // Add keyboard navigation
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && navLinks.classList.contains('active')) {
              navLinks.classList.remove('active');
              mobileMenuBtn.textContent = '☰';
          }
      });
      // Prevent scroll when mobile menu is open
      const body = document.body;
      mobileMenuBtn.addEventListener('click', () => {
          if (navLinks.classList.contains('active')) {
              body.style.overflow = 'hidden';
          } else {
              body.style.overflow = 'auto';
          }
      });
      // Add smooth color transition for theme toggle
      html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      // Log welcome message
      console.log('%c👋 Welcome to my portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
      console.log('%cInterested in working together? Reach out!', 'color: #a855f7; font-size: 14px;');
      console.log('%c📧 malllam146@gmail.com', 'color: #6366f1; font-size: 14px;');
