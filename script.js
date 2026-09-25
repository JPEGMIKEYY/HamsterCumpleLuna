const inicio = document.getElementById("inicio");
const clickOpen = document.getElementById("clickOpen");
const musica = document.getElementById("musica");
const escena = document.getElementById("escena");

const puerta = document.getElementById("puerta");
const globos = document.getElementById("globos");
const confeti = document.getElementById("confeti");
const hamster = document.getElementById("hamster");
const hamsterMano = document.getElementById("hamsterMano");
const hamsterManoFinal = document.getElementById("hamsterManoFinal");
const tarjetaMano = document.getElementById("tarjetaMano");
const mensajeCumple = document.getElementById("mensajeCumple");



/* =========================
   INICIAR EXPERIENCIA
   ========================= */

clickOpen.addEventListener("click", iniciar);


function iniciar() {

    // Evitar múltiples clics
    clickOpen.disabled = true;

        musica.currentTime = 0;
    musica.volume = 0.2;
    musica.play();


    // Mostrar la escena
    escena.style.visibility = "visible";


    // Comenzar desde 100%
   escena.style.transform = "translateX(-50%) scale(1)";


    // Reiniciar la puerta
    puerta.currentTime = 0;


    // Reproducir puerta
    puerta.play();


    // Desaparecer pantalla negra
    inicio.style.opacity = "0";


    // Eliminar pantalla negra después de la transición
    setTimeout(() => {

        inicio.style.display = "none";

    }, 2000);


    // Zoom de la escena
    puerta.animate(
    [
        {
            transform: "scale(1)"
        },
        {
            transform: "scale(2)"
        }
    ],
    {
        duration: 5000,
        easing: "ease-in",
        fill: "forwards"
    }
);


    // Esperar a que termine la puerta
    puerta.addEventListener("ended", iniciarEscenaFinal, {
        once: true
    });
}


/* =========================
   ESCENA FINAL
   ========================= */

function iniciarEscenaFinal() {

    // Ocultar puerta
    puerta.style.display = "none";


    // Mostrar globos
    globos.style.display = "block";


    // Mostrar confeti
    confeti.style.display = "block";


    // Reiniciar ambos
    globos.currentTime = 0;
    confeti.currentTime = 0;


    // Reproducir globos
    globos.play();


    // Reproducir confeti
    confeti.play();


    // Cuando terminen los globos,
    // entra el hámster
    globos.addEventListener("ended", entrarHamster, {
        once: true
    });
}

function entrarHamster() {

    // Mostrar hámster
    hamster.style.display = "block";


    // Animación de entrada
    const animacion = hamster.animate(
        [
            {
                transform: "translate(-50%, -40%) scale(0.55)"
            },
            {
                transform: "translate(-50%, -50%) scale(1.08)"
            },
            {
                transform: "translate(-50%, -48%) scale(0.92, 1.05)"
            },
            {
                transform: "translate(-50%, -51%) scale(1.03, 0.97)"
            },
            {
                transform: "translate(-50%, -50%) scale(1)"
            }
        ],
        {
            duration: 900,
            easing: "ease-out",
            fill: "forwards"
        }
    );


    // Cuando termine el rebote
    animacion.finished.then(() => {

        // Esperar un poquito antes de sacar la mano
        setTimeout(() => {

            cambiarAmano();

        }, 500);

    });
}

function cambiarAmano() {

    hamster.style.display = "none";

    tarjetaMano.style.display = "none";
    tarjetaMano.style.opacity = "0";
    tarjetaMano.classList.remove("respirando");

    hamsterMano.style.display = "block";

    hamsterMano.currentTime = 0;

    hamsterMano.play();

    hamsterMano.addEventListener(
        "timeupdate",
        mostrarTarjeta
    );

    hamsterMano.addEventListener(
        "ended",
        () => {

            hamsterMano.removeEventListener(
                "timeupdate",
                mostrarTarjeta
            );

            hamsterMano.style.display = "none";

            hamsterManoFinal.style.display = "block";

            // Asegurar que la tarjeta permanezca visible
            tarjetaMano.style.display = "block";
            tarjetaMano.style.opacity = "1";
            tarjetaMano.style.zIndex = "10";

            // Mantener respiración
            tarjetaMano.classList.add("respirando");

            // Mostrar mensaje
            mostrarMensaje();

        },
        {
            once: true
        }
    );
}

function mostrarTarjeta() {

    if (
        hamsterMano.duration > 0 &&
        hamsterMano.currentTime >= hamsterMano.duration / 2
    ) {

        // Evitar que vuelva a ejecutarse
        hamsterMano.removeEventListener(
            "timeupdate",
            mostrarTarjeta
        );

        // Mostrar tarjeta
        tarjetaMano.style.display = "block";

        // Animación de aparición
        const entrada = tarjetaMano.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translate(-50%, -50%) scale(0.95)"
                },
                {
                    opacity: 1,
                    transform:
                        "translate(-50%, -50%) scale(1)"
                }
            ],
            {
                duration: 400,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        // Cuando termina la aparición
        entrada.finished.then(() => {

            entrada.cancel();

            tarjetaMano.style.opacity = "1";

            // Empezar respiración
            tarjetaMano.classList.add("respirando");

        });
    }
}
function mostrarMensaje() {

    mensajeCumple.style.display = "block";

    mensajeCumple.animate(
        [
            {
                opacity: 0,
                transform: "translate(-50%, 20px)"
            },
            {
                opacity: 1,
                transform: "translate(-50%, 0)"
            }
        ],
        {
            duration: 800,
            easing: "ease-out",
            fill: "forwards"
        }
    );
}
// =========================
// INTERACCIÓN TARJETA
// =========================

tarjetaMano.addEventListener("click", () => {
    window.location.href = "tarjeta.html";
});