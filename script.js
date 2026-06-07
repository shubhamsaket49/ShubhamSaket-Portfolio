$(document).ready(function () {

    // =========================
    // Mobile Menu Toggle
    // =========================

    $('#menu').click(function () {

        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');

    });

    // =========================
    // Header Effects
    // =========================

    $(window).on('scroll load', function () {

        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if ($(window).scrollTop() > 100) {

            $('header').addClass('sticky');

        } else {

            $('header').removeClass('sticky');

        }

        // Back To Top Button

        if ($(window).scrollTop() > 500) {

            $('.top').fadeIn();

        } else {

            $('.top').fadeOut();

        }

    });

    // =========================
    // Smooth Scrolling
    // =========================

    $('a[href*="#"]').on('click', function (e) {

        e.preventDefault();

        $('html, body').animate({

            scrollTop: $($(this).attr('href')).offset().top - 70

        }, 700);

    });

    // =========================
    // Active Navigation Link
    // =========================

    $(window).scroll(function () {

        let scrollDistance = $(window).scrollTop();

        $('section').each(function () {

            if ($(this).position().top - 150 <= scrollDistance) {

                let sectionID = $(this).attr('id');

                $('.navbar ul li a').removeClass('active');

                $('.navbar ul li a[href="#' + sectionID + '"]')
                    .addClass('active');

            }

        });

    });

    // =========================
    // Reveal Animation
    // =========================

    const revealElements = document.querySelectorAll(

        '.skill-card, .project-card, .timeline-item, .education-card, .coding-card, .cert-card, .stat-box'

    );

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    revealElements.forEach((el) => {

        observer.observe(el);

    });

    // =========================
    // Counter Animation
    // =========================

    const counters = document.querySelectorAll('.stat-box h2');

    counters.forEach(counter => {

        const updateCounter = () => {

            const target = counter.innerText;

            const numericValue = parseInt(target);

            if (isNaN(numericValue)) return;

            let count = 0;

            const speed = numericValue / 40;

            const interval = setInterval(() => {

                count += speed;

                if (count >= numericValue) {

                    counter.innerText = target;
                    clearInterval(interval);

                } else {

                    counter.innerText = Math.floor(count) + '+';

                }

            }, 30);

        };

        const statObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        updateCounter();

                        statObserver.unobserve(entry.target);

                    }

                });

            }

        );

        statObserver.observe(counter);

    });

    // =========================
    // Typing Effect
    // =========================

    const roles = [

        "Senior Unity Developer",
        "VR Developer",
        "AR Developer",
        "XR Developer",
        "Simulation Developer",
        "C# Engineer"

    ];

    let roleIndex = 0;

    let charIndex = 0;

    const typingElement = document.getElementById("typing-text");

    function typeEffect() {

        if (!typingElement) return;

        if (charIndex < roles[roleIndex].length) {

            typingElement.innerHTML += roles[roleIndex].charAt(charIndex);

            charIndex++;

            setTimeout(typeEffect, 100);

        }
        else {

            setTimeout(eraseEffect, 2000);

        }

    }

    function eraseEffect() {

        if (charIndex > 0) {

            typingElement.innerHTML =
                roles[roleIndex].substring(0, charIndex - 1);

            charIndex--;

            setTimeout(eraseEffect, 50);

        }
        else {

            roleIndex++;

            if (roleIndex >= roles.length) {

                roleIndex = 0;

            }

            setTimeout(typeEffect, 300);

        }

    }

    typeEffect();

});
