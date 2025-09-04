// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryNavigation = document.getElementById('primary-navigation');
    const skipLink = document.querySelector('.skip-link');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const skillItems = document.querySelectorAll('.skill-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const avatar = document.querySelector('.avatar');
    
    // Inicializar funcionalidades
    initMobileMenu();
    initSmoothScrolling();
    initAnimations();
    initAccessibilityFeatures();
    initLazyLoading();
    
    // Funciones de inicialización
    function initMobileMenu() {
        if (!mobileMenuToggle || !primaryNavigation) return;
        
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            primaryNavigation.classList.toggle('show');
            
            // Cambiar ícono
            const icon = this.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                primaryNavigation.classList.remove('show');
                
                // Restaurar ícono de hamburguesa
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    function initSmoothScrolling() {
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Enfocar el elemento destino para accesibilidad
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }, 300);
                }
            });
        });
    }
    
    function initAnimations() {
        // Animación de habilidades al hacer hover
        if (skillItems.length) {
            skillItems.forEach(skill => {
                skill.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-5px) scale(1.05)';
                });
                
                skill.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }
        
        // Animación de avatar
        if (avatar) {
            avatar.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
            });
            
            avatar.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0)';
            });
        }
        
        // Animación de scroll para elementos de la línea de tiempo
        if (timelineItems.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            timelineItems.forEach(item => {
                item.style.opacity = 0;
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(item);
            });
        }
    }
    
    function initAccessibilityFeatures() {
        // Mejorar accesibilidad del menú
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Añadir navegación por teclado en el menú
        if (navLinks.length) {
            navLinks.forEach((link, index) => {
                link.addEventListener('keydown', function(e) {
                    // Navegación con teclas de flecha
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                        e.preventDefault();
                        const nextIndex = (index + 1) % navLinks.length;
                        navLinks[nextIndex].focus();
                    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                        e.preventDefault();
                        const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                        navLinks[prevIndex].focus();
                    }
                });
            });
        }
        
        // Añadir funcionalidad al skip link
        if (skipLink) {
            skipLink.addEventListener('click', function() {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        }
    }
    
    function initLazyLoading() {
        // Cargar imágenes de forma diferida si es necesario
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            if (lazyImages.length) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    });
                });
                
                lazyImages.forEach(img => {
                    imageObserver.observe(img);
                });
            }
        }
    }
    
    // Añadir funcionalidad de modo oscuro/claro (opcional)
    const themeToggle = document.createElement('button');
    themeToggle.setAttribute('aria-label', 'Cambiar entre modo claro y oscuro');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.zIndex = '1000';
    themeToggle.style.background = 'var(--highlight-color)';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '50px';
    themeToggle.style.height = '50px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.boxShadow = 'var(--shadow-lg)';
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const icon = this.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            document.documentElement.style.setProperty('--primary-color', '#f8f9fa');
            document.documentElement.style.setProperty('--secondary-color', '#e9ecef');
            document.documentElement.style.setProperty('--accent-color', '#dee2e6');
            document.documentElement.style.setProperty('--text-color', '#212529');
            document.documentElement.style.setProperty('--text-muted', '#6c757d');
            document.documentElement.style.setProperty('--background-color', '#ffffff');
            document.documentElement.style.setProperty('--card-bg', '#f8f9fa');
            document.documentElement.style.setProperty('--border-color', '#dee2e6');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            document.documentElement.style.setProperty('--primary-color', '#1a1a2e');
            document.documentElement.style.setProperty('--secondary-color', '#16213e');
            document.documentElement.style.setProperty('--accent-color', '#0f3460');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--text-muted', '#b0b0b0');
            document.documentElement.style.setProperty('--background-color', '#121212');
            document.documentElement.style.setProperty('--card-bg', '#1e1e2e');
            document.documentElement.style.setProperty('--border-color', '#2a2a3a');
        }
    });
});// Última actualización: ju.,  4 de sep. de 2025 15:49:18
// Última modificación: ju.,  4 de sep. de 2025 16:06:23
