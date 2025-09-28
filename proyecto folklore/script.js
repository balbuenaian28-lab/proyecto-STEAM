// ===================================
// Lógica para el acordeón (Sección Folclore)
// ===================================

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = header.nextElementSibling;
        const isActive = item.classList.contains('active');

        // Cierra todos los acordeones
        document.querySelectorAll('.accordion-item').forEach(activeItem => {
            activeItem.classList.remove('active');
            activeItem.querySelector('.accordion-content').style.maxHeight = 0;
            activeItem.querySelector('.accordion-content').style.padding = '0 25px';
        });

        // Si no estaba activo, ábrelo
        if (!isActive) {
            item.classList.add('active');
            // Calcula la altura para mostrar el contenido
            content.style.maxHeight = (content.scrollHeight + 50) + 'px'; 
            content.style.padding = '25px';
        }
    });
});


// ===================================
// Lógica del Minijuego "Messi Chutando"
// ===================================

function lanzarPenal(direccion) {
    const resultadoDiv = document.getElementById('resultado-penal');
    const porteroDiv = document.getElementById('portero-anim');
    const ballDiv = document.getElementById('ball-anim');
    const messageOverlay = document.getElementById('message-overlay');
    const kickBtns = document.querySelectorAll('.kick-btn');

    // Deshabilitar botones durante la animación
    kickBtns.forEach(btn => btn.disabled = true);
    
    // Reiniciar estilos de animaciones
    ballDiv.className = 'ball'; 
    porteroDiv.className = 'portero'; 
    messageOverlay.classList.remove('show');
    resultadoDiv.textContent = ''; 
    
    // 1. El portero se mueve a una dirección aleatoria
    const direccionesPortero = ['left', 'center', 'right'];
    const atajada = direccionesPortero[Math.floor(Math.random() * direccionesPortero.length)];

    porteroDiv.classList.add(`move-${atajada}`); // Anima al portero
    ballDiv.style.opacity = '1'; // Mostrar el balón

    // 2. Animar el balón hacia la dirección elegida
    ballDiv.classList.add(`kick-${direccion}`);

    // 3. Determinar resultado después de que la animación termine (600ms)
    setTimeout(() => {
        let mensaje = "";
        let color = "";
        let overlayText = "";

        if (direccion !== atajada) {
            // GOL
            mensaje = "⚽ ¡GOOOOOLAZO! ¡Messi la clavó en el ángulo!";
            color = "#007bff"; 
            overlayText = "¡GOL!";
            ballDiv.style.opacity = '0';
        } else {
            // ATAJADA
            mensaje = "🧤 ¡ATAJADA! El arquero voló y la sacó con las uñas.";
            color = "#dc3545"; 
            overlayText = "¡ATAJÓ!";
             // La bola se detiene
            ballDiv.classList.remove(`kick-${direccion}`); 
            ballDiv.style.left = porteroDiv.style.left; 
            ballDiv.style.bottom = '40px'; 
        }

        resultadoDiv.innerHTML = mensaje;
        resultadoDiv.style.color = color;

        messageOverlay.textContent = overlayText;
        messageOverlay.style.color = color;
        messageOverlay.classList.add('show');

        // 4. Resetear después de 2 segundos
        setTimeout(() => {
            kickBtns.forEach(btn => btn.disabled = false);
            ballDiv.className = 'ball'; 
            porteroDiv.className = 'portero'; 
            messageOverlay.classList.remove('show');
            resultadoDiv.textContent = 'Elige dónde chutar...';
            resultadoDiv.style.color = 'var(--color-text-light)';
        }, 2000); 
    }, 600); 
}


// ===================================
// Animación de Entrada al hacer Scroll (Intersection Observer)
// ===================================

const scrollFadeIns = document.querySelectorAll('.scroll-fade-in');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px',
    threshold: 0.1 
});

scrollFadeIns.forEach(el => observer.observe(el));


// ===================================
// Efecto Parallax y Navegación Activa al Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateScrollEffects() {
    // 1. Efecto Parallax para el Hero
    const heroBg = document.querySelector('.hero-bg-image');
    if (heroBg) {
        let scrollPosition = window.pageYOffset;
        heroBg.style.transform = 'translateY(' + scrollPosition * 0.4 + 'px)'; 
    }

    // 2. Navegación Activa
    let current = '';
    const navBarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navBarHeight;
        if (window.pageYOffset >= sectionTop - 1) { 
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Escuchar eventos de scroll
window.addEventListener('scroll', updateScrollEffects);

// Inicializar al cargar la página
window.addEventListener('load', updateScrollEffects);