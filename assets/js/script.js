document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // HEADER / SCROLL
    // =====================================================

    const header = document.querySelector(".site-header");

    if (header) {
        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 40);
        };

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

        updateHeader();
    }


    // =====================================================
    // MENÚ MÓVIL
    // =====================================================

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav) {

        toggle.addEventListener("click", () => {
            nav.classList.toggle("open");

            const isOpen = nav.classList.contains("open");

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // =====================================================
    // HERO SLIDER
    // =====================================================

    const slides = Array.from(
        document.querySelectorAll(".hero-slide")
    );

    const heroDots = Array.from(
        document.querySelectorAll(".slider-dots button")
    );

    let currentSlide = 0;
    let heroInterval = null;


    function showSlide(index) {

        if (!slides.length) return;

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        slides.forEach((slide, number) => {

            slide.classList.toggle(
                "active",
                number === index
            );

        });


        heroDots.forEach((dot, number) => {

            dot.classList.toggle(
                "active",
                number === index
            );

        });


        currentSlide = index;

    }


    if (slides.length > 1) {

        showSlide(0);

        heroInterval = setInterval(() => {

            showSlide(
                currentSlide + 1
            );

        }, 5500);


        heroDots.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                showSlide(index);

            });

        });

    }


    // =====================================================
    // ANIMACIONES REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // =====================================================
    // MODAL DE TALLERES Y TERAPIAS
    // =====================================================

    const modal =
        document.getElementById("programModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalObjective =
        document.getElementById("modalObjective");

    const modalBenefits =
        document.getElementById("modalBenefits");

    const modalWork =
        document.getElementById("modalWork");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalIcon =
        document.getElementById("modalIcon");

    const modalClose =
        document.querySelector(".program-modal-close");

    const modalAction =
        document.querySelector(".program-modal-action");

    const modalOverlay =
        document.querySelector(".program-modal-overlay");


    const modalData = {

        recaidas: {
            category: "TALLER",
            icon: "bi-shield-check",
            title: "Taller de prevención de recaídas",

            description:
                "Busca fortalecer la capacidad de reconocer situaciones de riesgo y preparar respuestas antes de que aparezca una recaída.",

            objective:
                "Reconocer factores de riesgo y desarrollar estrategias para enfrentarlos.",

            benefits:
                "Mayor preparación, autocuidado y herramientas para afrontar situaciones difíciles.",

            work: [
                "Identificación de desencadenantes y señales de alerta.",
                "Desarrollo de estrategias de afrontamiento.",
                "Planificación de respuestas ante situaciones de riesgo.",
                "Fortalecimiento de hábitos y apoyos protectores."
            ]
        },


        fisico: {
            category: "TALLER",
            icon: "bi-activity",
            title: "Taller de acondicionamiento físico",

            description:
                "La actividad física puede complementar los procesos de recuperación y favorecer el bienestar físico y psicológico.",

            objective:
                "Promover hábitos saludables y actividad física como complemento del proceso.",

            benefits:
                "Mejor condición física, manejo del estrés y fortalecimiento de rutinas saludables.",

            work: [
                "Mejora del estado físico y calidad de vida.",
                "Apoyo al manejo del estrés y estado de ánimo.",
                "Fomento de rutinas y hábitos saludables.",
                "Disciplina, constancia y logro personal."
            ]
        },


        teatro: {
            category: "TALLER",
            icon: "bi-masks",
            title: "Taller de teatro",

            description:
                "Un espacio de expresión y participación grupal que puede favorecer habilidades de comunicación, creatividad y confianza.",

            objective:
                "Favorecer la expresión, comunicación y participación mediante actividades teatrales.",

            benefits:
                "Mayor confianza, creatividad, comunicación y trabajo colaborativo.",

            work: [
                "Expresión emocional y creatividad.",
                "Comunicación y escucha activa.",
                "Participación y trabajo colaborativo.",
                "Fortalecimiento de confianza y habilidades sociales."
            ]
        },


        cognitivas: {
            category: "TALLER",
            icon: "bi-lightbulb",
            title: "Taller de habilidades cognitivas",

            description:
                "Actividades estructuradas para ejercitar capacidades cognitivas relevantes para la vida cotidiana y el proceso de recuperación.",

            objective:
                "Estimular habilidades cognitivas necesarias para desenvolverse en la vida cotidiana.",

            benefits:
                "Apoyo a la atención, memoria, organización y resolución de problemas.",

            work: [
                "Atención y concentración.",
                "Memoria y organización.",
                "Planificación y resolución de problemas.",
                "Flexibilidad y toma de decisiones."
            ]
        },


        familiar: {
            category: "TERAPIA",
            icon: "bi-people",
            title: "Terapia familiar",

            description:
                "La familia puede desempeñar un papel importante dentro del proceso de recuperación cuando participa de acuerdo con el plan terapéutico.",

            objective:
                "Fortalecer los vínculos familiares y entregar herramientas para acompañar el proceso.",

            benefits:
                "Mejor comunicación, apoyo familiar y establecimiento de límites saludables.",

            work: [
                "Charlas y talleres de orientación parental.",
                "Orientación personalizada a cada apoderado o grupo familiar.",
                "Participación familiar en reuniones y actividades.",
                "Fortalecimiento de relaciones afectivas.",
                "Herramientas para comunicación y responsabilidad familiar.",
                "Información sobre la enfermedad de la adicción y pautas de conducta."
            ]
        },


        individual: {
            category: "TERAPIA",
            icon: "bi-person-heart",
            title: "Terapia individual",

            description:
                "Un espacio personalizado para trabajar aspectos relacionados con el proceso de recuperación de cada persona.",

            objective:
                "Comprender factores asociados y desarrollar herramientas personales para el proceso.",

            benefits:
                "Atención personalizada, acompañamiento y estrategias adaptadas a cada proceso.",

            work: [
                "Identificación de causas y factores asociados.",
                "Apoyo en el proceso de recuperación.",
                "Aprendizaje de herramientas para manejar situaciones de riesgo.",
                "Trabajo personalizado de objetivos."
            ]
        },


        urbanidad: {
            category: "TERAPIA",
            icon: "bi-house-heart",
            title: "Terapia de urbanidad",

            description:
                "El residente participa en actividades cotidianas asumiendo responsabilidades y roles dentro de la convivencia.",

            objective:
                "Fortalecer habilidades sociales, responsabilidades cotidianas y convivencia.",

            benefits:
                "Mayor autonomía, cooperación, responsabilidad y adaptación a espacios compartidos.",

            work: [
                "Práctica de responsabilidades cotidianas.",
                "Convivencia y cooperación.",
                "Modales y comportamiento en espacios compartidos.",
                "Asunción de roles dentro de actividades grupales."
            ]
        }

    };


    function openModal(key) {

        if (!modal) return;

        const data = modalData[key];

        if (!data) return;


        if (modalCategory) {
            modalCategory.textContent =
                data.category;
        }


        if (modalTitle) {
            modalTitle.textContent =
                data.title;
        }


        if (modalDescription) {
            modalDescription.textContent =
                data.description;
        }


        if (modalObjective) {
            modalObjective.textContent =
                data.objective;
        }


        if (modalBenefits) {
            modalBenefits.textContent =
                data.benefits;
        }


        if (modalIcon) {

            modalIcon.className =
                `bi ${data.icon}`;

        }


        if (modalWork) {

            modalWork.innerHTML = "";

            data.work.forEach(item => {

                const li =
                    document.createElement("li");

                li.textContent = item;

                modalWork.appendChild(li);

            });

        }


        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    document
        .querySelectorAll(".info-button")
        .forEach(button => {

            button.addEventListener("click", event => {

                event.preventDefault();

                const key =
                    button.dataset.modal;

                openModal(key);

            });

        });


    modalClose?.addEventListener(
        "click",
        closeModal
    );


    modalAction?.addEventListener(
        "click",
        closeModal
    );


    modalOverlay?.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("open")
            ) {

                closeModal();

            }

        }
    );


    // =====================================================
    // CONTADORES
    // =====================================================

    const counters =
        document.querySelectorAll(".counter");

    const statsSection =
        document.querySelector(".stats-section");

    let countersStarted = false;


    function animateCounter(counter) {

        const target =
            Number(counter.dataset.target);

        if (Number.isNaN(target)) return;


        const duration = 2200;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            counter.textContent =
                value.toLocaleString("es-CL");


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent =
                    target.toLocaleString("es-CL");

            }

        }


        requestAnimationFrame(update);

    }


    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(
            (counter, index) => {

                setTimeout(
                    () => {

                        animateCounter(counter);

                    },
                    index * 180
                );

            }
        );

    }


    if (statsSection && counters.length) {

        if ("IntersectionObserver" in window) {

            const statsObserver =
                new IntersectionObserver(
                    entries => {

                        if (
                            entries.some(entry =>
                                entry.isIntersecting
                            )
                        ) {

                            startCounters();

                            statsObserver.disconnect();

                        }

                    },
                    {
                        threshold: 0.1,
                        rootMargin: "0px 0px -10% 0px"
                    }
                );


            statsObserver.observe(
                statsSection
            );

        } else {

            startCounters();

        }

    }


    // =====================================================
    // CARRUSEL DE TESTIMONIOS
    // =====================================================

    const track =
        document.querySelector(
            ".testimonials-track"
        );

    const prevButton =
        document.querySelector(
            ".testimonial-prev"
        );

    const nextButton =
        document.querySelector(
            ".testimonial-next"
        );

    const testimonialSlider =
        document.querySelector(
            ".testimonials-slider"
        );

    const testimonialDots =
        document.querySelector(
            ".testimonial-dots"
        );


    if (
        track &&
        prevButton &&
        nextButton
    ) {

        const testimonials =
            Array.from(
                track.querySelectorAll(
                    ".testimonial"
                )
            );


        let currentIndex = 0;

        let autoSlide = null;


        function getVisibleItems() {

            if (window.innerWidth <= 650) {
                return 1;
            }

            if (window.innerWidth <= 1000) {
                return 2;
            }

            return 3;

        }


        function getMaxIndex() {

            return Math.max(
                0,
                testimonials.length -
                getVisibleItems()
            );

        }


        function createDots() {

            if (!testimonialDots) return;

            testimonialDots.innerHTML = "";


            const maxIndex =
                getMaxIndex();


            for (
                let index = 0;
                index <= maxIndex;
                index++
            ) {

                const button =
                    document.createElement("button");

                button.type = "button";

                button.setAttribute(
                    "aria-label",
                    `Ir al testimonio ${index + 1}`
                );


                if (index === currentIndex) {

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    () => {

                        currentIndex = index;

                        updateSlider();

                        restartAutoSlide();

                    }
                );


                testimonialDots.appendChild(
                    button
                );

            }

        }


        function updateDots() {

            if (!testimonialDots) return;

            testimonialDots
                .querySelectorAll("button")
                .forEach((dot, index) => {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                });

        }


        function updateSlider() {

            if (!testimonials.length) {
                return;
            }


            const visibleItems =
                getVisibleItems();


            const viewportWidth =
                track.parentElement
                    .offsetWidth;


            const gap = 24;


            const itemWidth =
                (
                    viewportWidth -
                    gap *
                    (visibleItems - 1)
                ) /
                visibleItems;


            const movement =
                currentIndex *
                (itemWidth + gap);


            track.style.transform =
                `translate3d(-${movement}px, 0, 0)`;


            updateDots();

        }


        function nextSlide() {

            const maxIndex =
                getMaxIndex();


            if (currentIndex >= maxIndex) {

                currentIndex = 0;

            } else {

                currentIndex++;

            }


            updateSlider();

        }


        function previousSlide() {

            const maxIndex =
                getMaxIndex();


            if (currentIndex <= 0) {

                currentIndex = maxIndex;

            } else {

                currentIndex--;

            }


            updateSlider();

        }


        function startAutoSlide() {

            clearInterval(
                autoSlide
            );


            if (
                testimonials.length <=
                getVisibleItems()
            ) {

                return;

            }


            autoSlide =
                setInterval(
                    nextSlide,
                    5500
                );

        }


        function restartAutoSlide() {

            startAutoSlide();

        }


        nextButton.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoSlide();

            }
        );


        prevButton.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoSlide();

            }
        );


        if (testimonialSlider) {

            testimonialSlider.addEventListener(
                "mouseenter",
                () => {

                    clearInterval(
                        autoSlide
                    );

                }
            );


            testimonialSlider.addEventListener(
                "mouseleave",
                () => {

                    startAutoSlide();

                }
            );

        }


        window.addEventListener(
            "resize",
            () => {

                const maxIndex =
                    getMaxIndex();


                currentIndex =
                    Math.min(
                        currentIndex,
                        maxIndex
                    );


                createDots();

                updateSlider();

            }
        );


        createDots();

        updateSlider();

        startAutoSlide();

    }


    // =====================================================
    // AÑO AUTOMÁTICO DEL FOOTER
    // =====================================================

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


});