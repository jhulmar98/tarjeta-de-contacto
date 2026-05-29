/* =========================================================
   TARJETA DIGITAL INTELIGENTE
   VERSIÓN PRODUCCIÓN
========================================================= */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* =========================================================
   FIREBASE
========================================================= */

const firebaseConfig = {

    apiKey: "AIzaSyAUSuxryQ_TUu2zep40lRmeSWag3InWR1E",

    authDomain: "escuadron-de-drones.firebaseapp.com",

    projectId: "escuadron-de-drones",

    storageBucket: "escuadron-de-drones.firebasestorage.app",

    messagingSenderId: "429468499741",

    appId: "1:429468499741:web:e99b8d00d4bd1d7cccebf4",

    measurementId: "G-HKMWJ0JB22"
};

const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);

/* =========================================================
   USUARIOS
   SOLO EDITAS AQUÍ
========================================================= */

const usuarios = {

    "2001": {

        nombre:
            "Jhulmar Márquez",

        cargo:
            "Ingeniero Mecatrónico",

        telefono:
            "51999999999",

        web:
            "https://www.upc.edu.pe/",

        video:
            "https://youtu.be/DZy4IOVy1Kg"
    },

    "2002": {

        nombre:
            "Ricardo García",

        cargo:
            "Supervisor",

        telefono:
            "51988888888",

        web:
            "https://www.upc.edu.pe/",

        video:
            "https://youtu.be/DZy4IOVy1Kg"
    },

    "2003": {

        nombre:
            "Livia Gonzalo",

        cargo:
            "Coordinadora",

        telefono:
            "51977777777",

        web:
            "https://www.upc.edu.pe/",

        video:
            "https://youtu.be/DZy4IOVy1Kg"
    },

    "2004": {

        nombre:
            "Guido Escalante",

        cargo:
            "Gerente",

        telefono:
            "51966666666",

        web:
            "https://www.upc.edu.pe/",

        video:
            "https://youtu.be/DZy4IOVy1Kg"
    }

};

/* =========================================================
   LEER CÓDIGO DEL QR
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );

const codigo =
    params.get("codigo");

/* =========================================================
   VALIDAR QR
========================================================= */

if (
    !codigo ||
    !usuarios[codigo]
) {

    alert(
        "Código QR inválido"
    );

    throw new Error(
        "Código QR inválido"
    );
}

const usuario =
    usuarios[codigo];

/* =========================================================
   MOSTRAR DATOS
========================================================= */

document
.getElementById(
    "nombreUsuario"
)
.textContent =
    usuario.nombre;

document
.getElementById(
    "cargoUsuario"
)
.textContent =
    usuario.cargo;

/* =========================================================
   VIDEO
========================================================= */

function obtenerVideoID(url){

    const regex =
        /(?:youtu\.be\/|v=)([^&]+)/;

    const match =
        url.match(regex);

    return match
        ? match[1]
        : "";
}

const videoID =
    obtenerVideoID(
        usuario.video
    );

document
.getElementById(
    "videoUsuario"
)
.src =

`https://www.youtube.com/embed/${videoID}?autoplay=1&mute=1&playsinline=1`;

/* =========================================================
   SITIO WEB
========================================================= */

document
.getElementById(
    "btnWeb"
)
.href =
    usuario.web;

/* =========================================================
   GUARDAR CONTACTO
========================================================= */

document
.getElementById(
    "btnGuardarContacto"
)
.addEventListener(
    "click",
    function(e){

        e.preventDefault();

        const vCard =

`BEGIN:VCARD
VERSION:3.0
FN:${usuario.nombre}
TITLE:${usuario.cargo}
TEL;TYPE=CELL:${usuario.telefono}
URL:${usuario.web}
END:VCARD`;

        const blob =
            new Blob(
                [vCard],
                {
                    type:"text/vcard"
                }
            );

        const fileURL =
            URL.createObjectURL(
                blob
            );

        window.location.href =
            fileURL;
    }
);

/* =========================================================
   REGISTRAR VISITANTE
========================================================= */

document
.getElementById(
    "btnRegistrar"
)
.addEventListener(
    "click",
    registrarVisitante
);

async function registrarVisitante(){

    const nombre =
        document
        .getElementById(
            "nombreVisitante"
        )
        .value
        .trim();

    const telefono =
        document
        .getElementById(
            "telefonoVisitante"
        )
        .value
        .trim();

    if(
        !nombre ||
        !telefono
    ){

        alert(
            "Ingrese nombre y teléfono"
        );

        return;
    }

    try{

        const ahora =
            new Date();

        await addDoc(
            collection(
                db,
                "leads"
            ),
            {

                codigo_qr:
                    codigo,

                persona_escaneada:
                    usuario.nombre,

                cargo_persona:
                    usuario.cargo,

                telefono_persona:
                    usuario.telefono,

                nombre_visitante:
                    nombre,

                telefono_visitante:
                    telefono,

                fecha:
                    ahora.toLocaleDateString(),

                hora:
                    ahora.toLocaleTimeString(),

                timestamp:
                    Date.now()
            }
        );

        /* =====================================
           DESBLOQUEAR CONTENIDO
        ===================================== */

        document
        .getElementById(
            "overlay"
        )
        .style.display =
            "none";

        document
        .getElementById(
            "contenido"
        )
        .classList.remove(
            "bloqueado"
        );

    }
    catch(error){

        console.error(
            error
        );

        alert(
            "Error al registrar"
        );
    }
}

/* =========================================================
   LOG
========================================================= */

console.log(
    "Código:",
    codigo
);

console.log(
    "Usuario:",
    usuario.nombre
);