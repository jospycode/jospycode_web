import React, { useEffect, useState } from 'react';
import './styles.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section[id]');
    const prevBtn = document.getElementById('carruselPrev');
    const nextBtn = document.getElementById('carruselNext');
    const carrusel = document.getElementById('carrusel');

    // Animación de escritura línea por línea para el globo del avatar
    const globoElement = document.getElementById('avatarGlobo');
    const contactoSection = document.getElementById('Contacto');

    const globoObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          globoElement?.classList.add('animate-typing');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (contactoSection) {
      globoObserver.observe(contactoSection);
    }

    // Header Compacto al Hacer Scroll
    const controlarHeaderScroll = () => {
      if (header) {
        if (window.scrollY > 30) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }
    };

    // Scrollspy (Destacar sección activa)
    const activarScrollspy = () => {
      const scrollY = window.pageYOffset;
      const headerHeight = header ? header.offsetHeight : 0;
      const isAtBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50;

      if (isAtBottom) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const contactoLink = document.querySelector('header nav ul li a[href*="#Contacto"]');
        if (contactoLink) contactoLink.classList.add('active');
        return;
      }

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - headerHeight - 60;
        const sectionId = current.getAttribute('id');
        const currentLink = document.querySelector(`header nav ul li a[href*="${sectionId}"]`);

        if (currentLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => link.classList.remove('active'));
            currentLink.classList.add('active');
          }
        }
      });
    };

    const handleScroll = () => {
      controlarHeaderScroll();
      activarScrollspy();
    };

    window.addEventListener('scroll', handleScroll);
    controlarHeaderScroll();
    activarScrollspy();

    // Desplazamiento Suave con Compensación
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          setMenuOpen(false);

          const headerHeight = header ? header.offsetHeight : 0;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 10;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => anchor.addEventListener('click', handleAnchorClick));

    // Navegación del Carrusel
    const obtenerAnchoDesplazamiento = () => {
      const primeraCarta = carrusel?.querySelector('.carta-carrusel');
      return primeraCarta ? primeraCarta.offsetWidth + 24 : (carrusel?.clientWidth || 300);
    };

    const handlePrev = () => {
      if (carrusel) carrusel.scrollBy({ left: -obtenerAnchoDesplazamiento(), behavior: 'smooth' });
    };

    const handleNext = () => {
      if (carrusel) carrusel.scrollBy({ left: obtenerAnchoDesplazamiento(), behavior: 'smooth' });
    };

    prevBtn?.addEventListener('click', handlePrev);
    nextBtn?.addEventListener('click', handleNext);

    // Animaciones de Aparición (incluyendo tarjetas, detalles estadísticos y títulos)
    const elementosParaAnimar = document.querySelectorAll('.carta, .carta-carrusel, .plan, .contacto-detalles, .inicio-texto, .info .detalles, h3, h4');
    elementosParaAnimar.forEach((el) => el.classList.add('reveal-element'));

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    elementosParaAnimar.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      anchors.forEach((anchor) => anchor.removeEventListener('click', handleAnchorClick));
      prevBtn?.removeEventListener('click', handlePrev);
      nextBtn?.removeEventListener('click', handleNext);
      observer.disconnect();
      globoObserver.disconnect();
    };
  }, []);

  return (
    <>
      <header>
        <div className="contenido-logo">
          <a href="#Inicio">
            <img src="/Jospy_code1.png" alt="Jospy Code" className="logo" />
          </a>
        </div>

        <button 
          className={`menu-hamburguesa ${menuOpen ? 'active' : ''}`} 
          id="hamburger-btn" 
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="linea"></span>
          <span className="linea"></span>
          <span className="linea"></span>
        </button>

        <nav id="nav-menu" className={menuOpen ? 'open' : ''}>
          <ul>
            <li><a href="#Inicio" className="menu">Inicio</a></li>
            <li><a href="#Sobre-Nosotros" className="menu">Sobre Nosotros</a></li>
            <li><a href="#Planes" className="menu">Planes</a></li>
            <li><a href="#Contacto" className="menu">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* Sección Inicio */}
        <section className="inicio" id="Inicio">
          <div className="inicio-texto">
            <h2>
              Impulsamos tu negocio con sitios web <span className="texto-azul">rápidos, modernos y efectivos.</span>
            </h2>
            <span className="inicio-subtitulo">Transformamos ideas en experiencias digitales.</span>
            
            <div className="hero-botones">
              <a href="mailto:jospycode@gmail.com" className="btn-hero">
                <img src="/Correo.png" alt="Correo" className="btn-icon" />
                <span>Enviar Correo</span>
              </a>
              <a href="https://wa.me/525612021714" className="btn-hero" target="_blank" rel="noopener noreferrer">
                <img src="/Whatsapp.png" alt="WhatsApp" className="btn-icon" />
                <span>Enviar WhatsApp</span>
              </a>
            </div>

            <hr className="hero-divider" />

            <div className="info">
              <div className="detalles">
                <b>100%</b>
                <p>Diseño adaptable en moviles</p>
              </div>
              <div className="detalles">
                <b>&lt;2s</b>
                <p>Carga ultra rapida</p>
              </div>
              <div className="detalles">
                <b>SEO</b>
                <p>Optimizado para Google</p>
              </div>
            </div>
          </div>

          <div className="contenido-avatar1">
            <img src="/Avatar_Sueter.png" alt="Avatar Jospy Code" className="avatar-1" />
          </div>
        </section>

        {/* Sección Sobre Nosotros */}
        <section className="sobre-nosotros" id="Sobre-Nosotros">
          <div className="nosotros-info">
            <a href="#Sobre-Nosotros" className="sup-indice">Sobre Nosotros</a>
            <h3>Creamos la presencia digital que tu empresa merece.</h3>
            <p>
              En jospy code somos una empresa joven apasionada por la tecnología y
              el diseño web minimalista.
            </p>
            <p>
              Entendemos los retos de las pequeñas y medianas empresas para
              destacar en el entorno digital. Por eso, nos enfocamos en construir
              soluciones a la medida, eliminando lo innecesario y entregando
              herramientas claras, atractivas y funcionales que ayudan a hacer
              crecer tu marca.
            </p>
          </div>
          <div className="nosotros-cartas">
            <div className="carta">
              <div className="carta-encabezado">
                <span className="titulo">Nuestra Misión</span>
              </div>
              <p>
                Democratizar el acceso a sitios web de alta calidad para empresas
                que buscan proyectar confianza y destacar rápidamente.
              </p>
            </div>
            <div className="carta">
              <div className="carta-encabezado">
                <span className="titulo">Nuestra Visión</span>
              </div>
              <p>
                Ser el aliado estratégico en desarrollo web de confianza para
                pequeños negocios y emprendedores.
              </p>
            </div>
            <div className="carta">
              <div className="carta-encabezado">
                <span className="titulo">Filosofía de Diseño</span>
              </div>
              <p>
                Apostamos por la elegancia, los colores sólidos, la claridad
                tipográfica e interfaces intuitivas que facilitan la navegación de
                tu cliente final.
              </p>
            </div>
          </div>
        </section>

        {/* Sección Carrusel */}
        <section className="carrusel-contenido">
          <h4>¿Por qué elegir Jospy Code?</h4>
          <p className="subtitulo">
            Tu sitio web debe transmitir profesionalismo desde el primer segundo.
          </p>
          <div className="carrusel-wrapper">
            <button className="carrusel-btn prev" id="carruselPrev" aria-label="Anterior">&#x2039;</button>
            
            <div className="carrusel" id="carrusel">
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Diseño Adaptable<br />(Responsive)</span>
                <hr />
                <p>Tu página web lucirá perfecta en smartphones, tablets y computadoras de escritorio de cualquier tamaño.</p>
              </div>
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Velocidad Extrema</span>
                <hr />
                <p>Código limpio y optimizado para que tu sitio cargue en menos de 2 segundos, evitando perder clientes.</p>
              </div>
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Enfoque en Ventas</span>
                <hr />
                <p>Estructura limpia orientada a conseguir contactos directos a través de formularios e integración con WhatsApp.</p>
              </div>
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Soporte Continuo</span>
                <hr />
                <p>Te acompañamos después del lanzamiento para asegurar que tu plataforma opere siempre de manera impecable.</p>
              </div>
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Seguridad Web (SSL)</span>
                <hr />
                <p>Protegemos la información de tus usuarios y garantizamos una navegación segura y confiable bajo estándares actuales.</p>
              </div>
              <div className="carta-carrusel">
                <span className="carrusel-titulo">Diseño UI/UX Moderno</span>
                <hr />
                <p>Creamos interfaces atractivas que priorizan la experiencia del usuario y facilitan la interacción con tu marca.</p>
              </div>
            </div>

            <button className="carrusel-btn next" id="carruselNext" aria-label="Siguiente">&#x203A;</button>
          </div>
        </section>

        {/* Sección Planes */}
        <section className="contenido-planes" id="Planes">
          <h4>Planes Transparentes y a Medida</h4>
          <p className="subtitulo">Elige la solución que mejor se adapte a las necesidades actuales de tu empresa</p>
          <div className="planes">
            <div className="plan plan1">
              <h5>IDEAL PARA CAMPAÑAS</h5>
              <span className="plan-nombre">Landing Page</span>
              <p className="plan-desc">Página de una sola sección diseñada específicamente para captar clientes o vender un producto puntual.</p>
              <ul>
                <li>1 Sección principal de alto impacto</li>
                <li>Botón flotante de WhatsApp</li>
                <li>Formulario de contacto funcional</li>
                <li>Diseño 100% adaptable a móviles</li>
                <li>Entrega rápida en 3-5 días</li>
              </ul>
              <a href="#Contacto" className="bton">Cotizar Landing Page</a>
            </div>

            <div className="plan plan2">
              <div className="badge-popular">Más Popular</div>
              <h5>NEGOCIOS EN CRECIMIENTO</h5>
              <span className="plan-nombre">Sitio Multi-página</span>
              <p className="plan-desc">Página web completa con hasta 5 secciones, ideal para empresas que ofrecen varios servicios.</p>
              <ul>
                <li>Hasta 5 secciones (Inicio, Nosotros, Servicios, etc.)</li>
                <li>Optimización básica para Google (SEO)</li>
                <li>Formulario de contacto directo</li>
                <li>Integración de redes sociales</li>
                <li>Enlace directo a WhatsApp</li>
              </ul>
              <a href="#Contacto" className="bton">Cotizar Sitio Completo</a>
            </div>

            <div className="plan plan3">
              <h5>VENTAS EN LÍNEA</h5>
              <span className="plan-nombre">E-commerce / A Medida</span>
              <p className="plan-desc">Tienda online o desarrollo personalizado según las necesidades complejas de tu modelo de negocio.</p>
              <ul>
                <li>Catálogo de productos y checkout</li>
                <li>Pasarelas de pago online</li>
                <li>Panel para administrar productos</li>
                <li>Diseño exclusivo a medida</li>
                <li>Capacitación de uso incluida</li>
              </ul>
              <a href="#Contacto" className="bton">Cotizar A Medida</a>
            </div>
          </div>
        </section>

        {/* Sección Contacto */}
        <section className="contacto" id="Contacto">
          <div className="contacto-col-texto">
            <h4>¿Tienes un proyecto en mente?<br />Hablemos.</h4>
            <p className="contacto-subtitulo">
              En jospy code estamos listos para ayudarte a lanzar o renovar el sitio web de tu negocio. Ponte en contacto directamente con nosotros a través de cualquiera de nuestros medios.
            </p>
            <div className="contacto-info">
              <a href="https://wa.me/525612021714" className="contacto-detalles" target="_blank" rel="noopener noreferrer">
                <div className="contacto-icono-caja">
                  <img src="/Whatsapp.png" alt="Whatsapp" className="logo-contacto" />
                </div>
                <div className="contacto-texto">
                  <span className="contacto-etiqueta">Whatsapp Directo</span>
                  <span className="contacto-dato">+52 56 1202 1714</span>
                </div>
              </a>
              <a href="mailto:jospycode@gmail.com" className="contacto-detalles">
                <div className="contacto-icono-caja">
                  <img src="/Correo.png" alt="Correo" className="logo-contacto" />
                </div>
                <div className="contacto-texto">
                  <span className="contacto-etiqueta">Correo Electrónico</span>
                  <span className="contacto-dato">jospycode@gmail.com</span>
                </div>
              </a>
              <div className="contacto-detalles">
                <div className="contacto-icono-caja">
                  <img src="/Horario.png" alt="Horario" className="logo-contacto" />
                </div>
                <div className="contacto-texto">
                  <span className="contacto-etiqueta">Horario De Atención</span>
                  <span className="contacto-dato">Lunes a Viernes: 9:00 AM - 7:00 PM<br />Sábado y Domingo: 9:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="avatar-seccion">
            <div className="avatar-globo" id="avatarGlobo">
              <span className="typing-line line-1">Gracias por visitar Jospy Code.</span>
              <span className="typing-line line-2">¡Espero que volvamos a hablar pronto!</span>
            </div>
            <div className="avatar-imagen-recorte">
              <img src="/Avatar_Camisa.png" alt="Avatar Jospy Code" className="avatar2" />
            </div>
          </div>
        </section>

        <hr className="footer-divider" />

        {/* Footer */}
        <footer>
          <div className="footer-col footer-logo">
            <img src="/Jospy_code1.png" alt="Jospy Code" />
          </div>
          <div className="footer-col footer-redes">
            <h6>Nuestras Redes Sociales</h6>
            <div className="footer-social-icons">
              <a href="https://facebook.com/share/1DwgB9L3mP" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <img src="/Facebook.png" alt="Facebook" className="social-footer-icon" />
              </a>
              <a href="https://www.instagram.com/jospy_code?srtk=dHA3dm1|NTFjMTgx" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/Insta.png" alt="Instagram" className="social-footer-icon" />
              </a>
            </div>
          </div>
          <div className="footer-col footer-copy">
            <h6>© 2026 Jospy Code. Todos los derechos reservados.</h6>
          </div>
        </footer>
      </main>
    </>
  );
}