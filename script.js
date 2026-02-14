// --- CONFIGURACIÓN ---
const FECHA_INICIO = new Date('2013-12-21T00:00:00'); 
const MENSAJE = "Mi lugar seguro, siempre será al lado de tu corazón 💕...";

// Paleta de colores para los corazones
const COLORES_CORAZON = [
    '#b71c1c', // Rojo Oscuro
    '#ff4d6d', // Rojo Claro (Original)
    '#ffcdd2'  // Rojo Pastel / Rosa
];

// --- FUNCIONES DE TIEMPO ---
function obtenerTiempoTranscurrido() {
    const ahora = new Date();
    let anios = ahora.getFullYear() - FECHA_INICIO.getFullYear();
    
    // Ajuste de aniversario
    const aniversarioEsteAnio = new Date(FECHA_INICIO);
    aniversarioEsteAnio.setFullYear(ahora.getFullYear());
    if (ahora < aniversarioEsteAnio) {
        anios--;
    }

    const ultimoAniversario = new Date(FECHA_INICIO);
    ultimoAniversario.setFullYear(FECHA_INICIO.getFullYear() + anios);

    const diferencia = ahora - ultimoAniversario;
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / 1000 / 60) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    return `${anios} Años ${dias} Días ${horas} Horas ${minutos} Minutos y ${segundos} Segundos juntos...`;
}

// Función para actualizar el contador en tiempo real (se llama después del tipeo)
function iniciarReloj() {
    setInterval(() => {
        document.getElementById('tiempo').innerText = obtenerTiempoTranscurrido();
    }, 1000);
}

// --- GENERACIÓN DEL ÁRBOL ---
function crearArbol() {
    const container = document.getElementById('tree-container');
    const numHojas = 200; 
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight - 180;

    for (let i = 0; i < numHojas; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-leaf';
        
        // Asignar color aleatorio
        const colorAleatorio = COLORES_CORAZON[Math.floor(Math.random() * COLORES_CORAZON.length)];
        heart.style.backgroundColor = colorAleatorio;

        // Fórmula del corazón
        const t = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 8; 
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);

        x = x * r + centerX;
        y = -y * r + centerY; 

        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;

        const scale = Math.random() * 0.8 + 0.4;
        heart.style.transform = `scale(${scale}) rotate(-45deg)`;
        
        heart.style.animation = `bloom 1s ease-out forwards`;
        heart.style.animationDelay = `${Math.random() * 2 + 3.5}s`; 

        container.appendChild(heart);
    }
}

// --- EFECTO MECANOGRAFÍA ---
function typeWriter(texto, elementoId, velocidad, callback) {
    const elemento = document.getElementById(elementoId);
    elemento.innerHTML = "";
    
    // Hacemos visible el contenedor padre
    if(elementoId === 'tiempo') {
        document.getElementById('contador-container').classList.remove('hidden');
        document.getElementById('contador-container').classList.add('visible');
    } else {
        elemento.classList.remove('hidden');
        elemento.classList.add('visible');
    }
    
    let i = 0;
    function tipear() {
        if (i < texto.length) {
            elemento.innerHTML += texto.charAt(i);
            i++;
            setTimeout(tipear, velocidad);
        } else {
            if (callback) callback();
        }
    }
    tipear();
}

// --- SECUENCIA MAESTRA ---
window.onload = function() {
    // 1. Árbol y Hojas (CSS handlea el inicio)
    crearArbol();

    // 2. Título (Aparece a los 6s)
    setTimeout(() => {
        const titulo = document.getElementById('titulo');
        const titulo_2 = document.getElementById('titulo_2');
        titulo.classList.remove('hidden');
        titulo.classList.add('visible');
        titulo_2.classList.remove('hidden');
        titulo_2.classList.add('visible');
        
        // 3. Escribir Mensaje (A los 7s)
        setTimeout(() => {
            typeWriter(MENSAJE, 'mensaje-texto', 50, () => {
                
                // 4. Escribir Contador (Cuando termine el mensaje)
                // Calculamos el tiempo una vez para el efecto tipeo
                const tiempoInicial = obtenerTiempoTranscurrido();
                
                setTimeout(() => {
                    typeWriter(tiempoInicial, 'tiempo', 50, () => {
                        // 5. Activar reloj en tiempo real y Firma
                        iniciarReloj();
                        const firma = document.getElementById('firma');
                        const firma_2 = document.getElementById('firma_2');
                        firma.classList.remove('hidden');
                        firma.classList.add('visible');
                        firma_2.classList.remove('hidden');
                        firma_2.classList.add('visible');
                    });
                }, 500);
            });
        }, 1000);

    }, 6000); 
};

// --- PÉTALOS DE FONDO ---
function crearPetalo() {
    const petalo = document.createElement('div');
    petalo.innerHTML = '🌸';
    petalo.style.position = 'fixed';
    petalo.style.top = '-20px';
    petalo.style.left = Math.random() * window.innerWidth + 'px';
    petalo.style.fontSize = (Math.random() * 10 + 10) + 'px';
    petalo.style.zIndex = '0';
    petalo.style.opacity = Math.random() * 0.5 + 0.2;
    
    const duracion = Math.random() * 3 + 4;
    petalo.style.transition = `top ${duracion}s linear, opacity ${duracion}s`;
    
    document.body.appendChild(petalo);

    setTimeout(() => {
        petalo.style.top = (window.innerHeight + 50) + 'px';
        petalo.style.opacity = '0';
    }, 100);

    setTimeout(() => petalo.remove(), duracion * 1000);
}
setInterval(crearPetalo, 400);

// --- CONTROL DE MÚSICA DE FONDO ---
window.addEventListener('load', () => {
    const audio = document.getElementById('musica');
    
    // Ajustar volumen suave (30% para que no tape tu voz si le hablas)
    audio.volume = 0.3; 

    // Intentar reproducir automáticamente
    const promesa = audio.play();

    if (promesa !== undefined) {
        promesa.catch(error => {
            console.log("Autoplay bloqueado por el navegador. Esperando interacción.");
            
            // Si falla, agregar un detector de clic en TODA la página
            // La música sonará apenas ella toque la pantalla o haga clic en cualquier lado
            document.body.addEventListener('click', () => {
                audio.play();
                audio.volume = 0.3;
            }, { once: true });
        });
    }
});