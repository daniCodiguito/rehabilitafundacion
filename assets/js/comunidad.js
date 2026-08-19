document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const photos = Array.from(
        document.querySelectorAll(".community-photo")
    );


    const lightbox =
        document.getElementById("communityLightbox");


    const lightboxImage =
        document.getElementById("lightboxImage");


    const lightboxTitle =
        document.getElementById("lightboxTitle");


    const lightboxCounter =
        document.getElementById("lightboxCounter");


    const closeButton =
        document.querySelector(".community-lightbox-close");


    const prevButton =
        document.querySelector(".community-lightbox-prev");


    const nextButton =
        document.querySelector(".community-lightbox-next");


    if (
        !photos.length ||
        !lightbox ||
        !lightboxImage
    ) {
        return;
    }


    let currentIndex = 0;



    // =====================================================
    // MOSTRAR FOTO
    // =====================================================

    function showPhoto(index) {


        if (index < 0) {

            index =
                photos.length - 1;

        }


        if (index >= photos.length) {

            index = 0;

        }


        currentIndex = index;


        const photo =
            photos[currentIndex];


        const image =
            photo.dataset.image;


        const title =
            photo.dataset.title || "Nuestra comunidad";


        lightboxImage.src = image;

        lightboxImage.alt = title;


        if (lightboxTitle) {

            lightboxTitle.textContent =
                title;

        }


        if (lightboxCounter) {

            lightboxCounter.textContent =
                `${String(currentIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

        }

    }



    // =====================================================
    // ABRIR
    // =====================================================

    function openLightbox(index) {

        showPhoto(index);


        lightbox.classList.add("open");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }



    // =====================================================
    // CERRAR
    // =====================================================

    function closeLightbox() {

        lightbox.classList.remove("open");


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        setTimeout(() => {

            if (
                !lightbox.classList.contains("open")
            ) {

                lightboxImage.src = "";

            }

        }, 350);

    }



    // =====================================================
    // CLIC EN FOTOS
    // =====================================================

    photos.forEach((photo, index) => {

        photo.addEventListener(
            "click",
            () => {

                openLightbox(index);

            }
        );

    });



    // =====================================================
    // ANTERIOR
    // =====================================================

    prevButton?.addEventListener(
        "click",
        () => {

            showPhoto(
                currentIndex - 1
            );

        }
    );



    // =====================================================
    // SIGUIENTE
    // =====================================================

    nextButton?.addEventListener(
        "click",
        () => {

            showPhoto(
                currentIndex + 1
            );

        }
    );



    // =====================================================
    // CERRAR
    // =====================================================

    closeButton?.addEventListener(
        "click",
        closeLightbox
    );



    // =====================================================
    // CLIC EN FONDO
    // =====================================================

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );



    // =====================================================
    // TECLADO
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {


            if (
                !lightbox.classList.contains("open")
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                showPhoto(
                    currentIndex - 1
                );

            }


            if (
                event.key === "ArrowRight"
            ) {

                showPhoto(
                    currentIndex + 1
                );

            }

        }
    );



    // =====================================================
    // SWIPE MÓVIL
    // =====================================================

    let touchStartX = 0;


    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            const touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (
                Math.abs(difference) < 50
            ) {

                return;

            }


            if (difference > 0) {

                showPhoto(
                    currentIndex + 1
                );

            } else {

                showPhoto(
                    currentIndex - 1
                );

            }

        },
        {
            passive: true
        }
    );



    // =====================================================
    // REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            ".community-gallery .reveal, " +
            ".community-intro .reveal, " +
            ".community-final .reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );


    } else {


        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }



    // =====================================================
    // AÑO FOOTER
    // =====================================================

    const year =
        document.getElementById("year");


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});