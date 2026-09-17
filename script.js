/* =========================================
   KIT MIMO PROFESSOR
   SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       FAQ — ABRIR / FECHAR
    ========================================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Fecha todos os outros FAQs
            faqItems.forEach((otherItem) => {
                otherItem.classList.remove("active");

                const otherAnswer = otherItem.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Abre o selecionado
            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }

        });

    });


    /* =========================================
       ROLAGEM SUAVE DOS BOTÕES
    ========================================= */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       ANIMAÇÃO DAS SEÇÕES AO ENTRAR NA TELA
    ========================================= */

    const animatedElements = document.querySelectorAll(
        ".benefit-card, .gallery-item, .bonus-card, .offer-card, .content-grid"
    );

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // Não observa novamente
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    animatedElements.forEach((element) => {

        element.classList.add("animate");

        observer.observe(element);

    });


    /* =========================================
       EFEITO NOS BOTÕES
    ========================================= */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.add("clicked");

            setTimeout(() => {
                button.classList.remove("clicked");
            }, 180);

        });

    });


    /* =========================================
       EFEITO DE ENTRADA NO HERO
    ========================================= */

    const heroContent = document.querySelector(".hero-content");

    if (heroContent) {

        setTimeout(() => {
            heroContent.classList.add("hero-loaded");
        }, 100);

    }


    /* =========================================
       ANO AUTOMÁTICO NO FOOTER
    ========================================= */

    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

});
/* =========================================
   CARROSSEL KIT MIMO PROFESSOR
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".mimo-carousel");

    if (!carousel) return;


    const track = carousel.querySelector(".mimo-track");
    const slides = carousel.querySelectorAll(".mimo-slide");

    const prev = carousel.querySelector(".mimo-prev");
    const next = carousel.querySelector(".mimo-next");

    const dotsContainer = document.querySelector(".mimo-dots");


    let current = 0;


    /* =========================================
       CRIAR BOLINHAS AUTOMATICAMENTE
    ========================================= */

    slides.forEach(function (slide, index) {

        const dot = document.createElement("button");

        dot.className = "mimo-dot";

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "Ir para imagem " + (index + 1)
        );


        dot.addEventListener("click", function () {

            current = index;

            update();

        });


        dotsContainer.appendChild(dot);

    });


    const dots = dotsContainer.querySelectorAll(".mimo-dot");


    /* =========================================
       ATUALIZAR
    ========================================= */

    function update() {

        track.style.transform =
            "translateX(-" + (current * 100) + "%)";


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === current
            );

        });

    }


    /* =========================================
       PRÓXIMA
    ========================================= */

    next.addEventListener("click", function () {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        update();

    });


    /* =========================================
       ANTERIOR
    ========================================= */

    prev.addEventListener("click", function () {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        update();

    });


    /* =========================================
       SWIPE NO CELULAR
    ========================================= */

    let startX = 0;


    track.addEventListener("touchstart", function (event) {

        startX = event.touches[0].clientX;

    }, { passive: true });


    track.addEventListener("touchend", function (event) {

        const endX = event.changedTouches[0].clientX;

        const distance = startX - endX;


        if (distance > 50) {

            current++;

            if (current >= slides.length) {
                current = 0;
            }

            update();

        }


        if (distance < -50) {

            current--;

            if (current < 0) {
                current = slides.length - 1;
            }

            update();

        }

    }, { passive: true });


    /* =========================================
       AUTO PLAY
    ========================================= */

    let autoplay = setInterval(function () {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        update();

    }, 5000);


    /* =========================================
       PAUSAR QUANDO INTERAGIR
    ========================================= */

    carousel.addEventListener("mouseenter", function () {

        clearInterval(autoplay);

    });


    carousel.addEventListener("mouseleave", function () {

        autoplay = setInterval(function () {

            current++;

            if (current >= slides.length) {
                current = 0;
            }

            update();

        }, 5000);

    });


    /* =========================================
       INICIAR
    ========================================= */

    update();

});

/* =========================================
   CARROSSEL DE AVALIAÇÕES
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".avaliacoes-carousel");

    if (!carousel) return;

    const track = carousel.querySelector(".avaliacoes-track");
    const slides = carousel.querySelectorAll(".avaliacoes-slide");

    const prev = carousel.querySelector(".avaliacoes-prev");
    const next = carousel.querySelector(".avaliacoes-next");

    const dotsContainer =
        document.querySelector(".avaliacoes-dots");

    let current = 0;

    /* CRIAR BOLINHAS */

    slides.forEach(function (slide, index) {

        const dot = document.createElement("button");

        dot.className = "avaliacoes-dot";
        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "Ver avaliação " + (index + 1)
        );

        dot.addEventListener("click", function () {

            current = index;
            update();

        });

        dotsContainer.appendChild(dot);

    });

    const dots =
        dotsContainer.querySelectorAll(".avaliacoes-dot");


    /* ATUALIZAR CARROSSEL */

    function update() {

        track.style.transform =
            "translateX(-" + (current * 100) + "%)";

        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === current
            );

        });

    }


    /* PRÓXIMA */

    next.addEventListener("click", function () {

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        update();

    });


    /* ANTERIOR */

    prev.addEventListener("click", function () {

        current--;

        if (current < 0) {
            current = slides.length - 1;
        }

        update();

    });


    /* SWIPE NO CELULAR */

    let startX = 0;

    track.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        function (event) {

            const endX =
                event.changedTouches[0].clientX;

            const distance =
                startX - endX;


            if (distance > 50) {

                current++;

                if (current >= slides.length) {
                    current = 0;
                }

                update();

            }


            if (distance < -50) {

                current--;

                if (current < 0) {
                    current = slides.length - 1;
                }

                update();

            }

        },
        { passive: true }
    );


    /* INICIAR */

    update();

});

/* =====================================
   POPUP COMPRAS
===================================== */

/* =====================================
   POPUP DE COMPRAS ALEATÓRIO
===================================== */


const salesNotification = 
document.getElementById("salesNotification");


const customers = [

{
name:"Mariana",
product:"Kit Mimo Professor Premium"
},

{
name:"Juliana",
product:"Kit Mimo Professor Básico"
},

{
name:"Camila",
product:"Kit Mimo Professor Premium"
},

{
name:"Fernanda",
product:"Kit Mimo Professor Básico"
},

{
name:"Patrícia",
product:"Kit Mimo Professor Premium"
},

{
name:"Amanda",
product:"Kit Mimo Professor Básico"
},

{
name:"Beatriz",
product:"Kit Mimo Professor Premium"
},

{
name:"Larissa",
product:"Kit Mimo Professor Premium"
},

{
name:"Carolina",
product:"Kit Mimo Professor Básico"
},

{
name:"Renata",
product:"Kit Mimo Professor Premium"
},

{
name:"Vanessa",
product:"Kit Mimo Professor Básico"
},

{
name:"Aline",
product:"Kit Mimo Professor Premium"
},

{
name:"Priscila",
product:"Kit Mimo Professor Premium"
},

{
name:"Tatiane",
product:"Kit Mimo Professor Básico"
},

{
name:"Débora",
product:"Kit Mimo Professor Premium"
},

{
name:"Luciana",
product:"Kit Mimo Professor Básico"
},

{
name:"Sabrina",
product:"Kit Mimo Professor Premium"
},

{
name:"Bianca",
product:"Kit Mimo Professor Premium"
},

{
name:"Rafaela",
product:"Kit Mimo Professor Básico"
},

{
name:"Carla",
product:"Kit Mimo Professor Premium"
}


];


let lastCustomer = -1;



function showSalesNotification(){


if(!salesNotification) return;



let randomCustomer;



// evita repetir a mesma pessoa

do {

    randomCustomer = Math.floor(
        Math.random() * customers.length
    );


} while(randomCustomer === lastCustomer);



lastCustomer = randomCustomer;



// troca os textos

document.getElementById("customerName")
.innerHTML =
customers[randomCustomer].name + " comprou";


document.getElementById("customerProduct")
.innerHTML =
customers[randomCustomer].product;



// mostra popup

salesNotification.classList.add("show");



// desaparece depois de 5 segundos

setTimeout(()=>{

    salesNotification.classList.remove("show");

},5000);



}



// primeira aparição depois de 8 segundos

setTimeout(()=>{

showSalesNotification();

},8000);




// repete a cada 45 segundos

setInterval(()=>{

showSalesNotification();

},45000);