// Основной JavaScript код для сайта стоматологии

document.addEventListener('DOMContentLoaded', function() {
    
    // Мобильное меню
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Анимация навигации при скролле
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Кнопка "Наверх"
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Анимация чисел в статистике
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Запуск анимации при появлении элемента в viewport
    function checkVisibility() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                if (!stat.classList.contains('animated')) {
                    animateCounter(stat);
                    stat.classList.add('animated');
                }
            }
        });
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Проверка при загрузке
    
    // Плавающий элемент
    const floatingTooth = document.getElementById('floatingTooth');
    let angle = 0;
    
    function floatAnimation() {
        angle += 0.5;
        const y = Math.sin(angle * Math.PI / 180) * 20;
        floatingTooth.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
    
    // Форма записи
    const bookingForm = document.getElementById('bookingForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');
    const modalOk = document.getElementById('modalOk');
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Здесь обычно отправка формы на сервер
        // Для демо просто показываем модальное окно
        
        successModal.classList.add('active');
        
        // Сброс формы
        bookingForm.reset();
    });
    
    // Закрытие модального окна
    function closeModal() {
        successModal.classList.remove('active');
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOk.addEventListener('click', closeModal);
    
    // Закрытие модального окна при клике вне его
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeModal();
        }
    });
    
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.service-card, .team-card, .tech-card, .review-card');
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Установка начальных стилей для анимации
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Проверка при загрузке
    
    // Подсветка активного раздела в навигации
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Интерактивные карточки услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
    
    // Форма подписки на рассылку
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            alert('Спасибо за подписку! Теперь вы будете получать наши новости.');
            emailInput.value = '';
        }
    });
    
    // Анимация для заголовков секций
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    function animateSectionTitles() {
        sectionTitles.forEach(title => {
            const rect = title.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', animateSectionTitles);
    animateSectionTitles();
});