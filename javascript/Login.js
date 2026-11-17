
const formulari = document.getElementById("formulari");

const dni = document.getElementById("DNI");
const naixament = document.getElementById("naixament");
const password = document.getElementById("password");
const confirmarPassword = document.getElementById("confirmar-password");

const provincia = document.getElementById("provincia");
const municipi = document.getElementById("municipi");

const pfp = document.getElementById("pfp");
const preview = document.getElementById("preview");

const lletres = "TRWAGMYFPDXBNJZSQVHLCKE";

const municipis = {
    barcelona: ["Barcelona", "Badalona", "Terrassa", "Sabadell", "Mataró", "Granollers"],
    girona: ["Girona", "Figueres", "Blanes", "Olot", "Salt", "Lloret de Mar"],
    lleida: ["Lleida", "Balaguer", "Tàrrega", "Mollerussa", "Cervera", "Solsona"],
    tarragona: ["Tarragona", "Reus", "Valls", "Salou", "Cambrils", "Tortosa"]
};

const avui = new Date();
const dataAvui = new Date(
    avui.getTime() - avui.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

naixament.max = dataAvui;

provincia.addEventListener("change", function () {
    municipi.innerHTML = '<option value="">Selecciona un municipi</option>';

    const llista = municipis[this.value];

    if (llista) {
        llista.forEach(function (nom) {
            const opcio = document.createElement("option");
            opcio.value = nom;
            opcio.textContent = nom;
            municipi.appendChild(opcio);
        });

        municipi.disabled = false;
    } else {
        municipi.innerHTML = '<option value="">Primer selecciona una província</option>';
        municipi.disabled = true;
    }

    municipi.classList.remove("is-valid", "is-invalid");
});

function validarDNI(valor) {
    valor = valor.toUpperCase().replace(/[\s-]/g, "");

    let numero;

    if (/^\d{8}[A-Z]$/.test(valor)) {
        numero = parseInt(valor.substring(0, 8), 10);
    } else if (/^[XYZ]\d{7}[A-Z]$/.test(valor)) {
        const prefix = {
            X: "0",
            Y: "1",
            Z: "2"
        };

        numero = parseInt(prefix[valor[0]] + valor.substring(1, 8), 10);
    } else {
        return false;
    }

    return valor[valor.length - 1] === lletres[numero % 23];
}

function validarEdat(valor) {
    if (!valor) return false;

    const naixement = new Date(valor + "T00:00:00");
    const avui = new Date();

    let edat = avui.getFullYear() - naixement.getFullYear();

    const mes = avui.getMonth() - naixement.getMonth();

    if (mes < 0 || (mes === 0 && avui.getDate() < naixement.getDate())) {
        edat--;
    }

    return !isNaN(naixement.getTime()) && valor <= dataAvui && edat >= 18;
}

function validarContrasenyes() {
    const correcte = password.value.length >= 8;
    const coincideixen = confirmarPassword.value === password.value &&
        confirmarPassword.value.length > 0;

    password.setCustomValidity(
        correcte ? "" : "La contrasenya ha de tenir almenys 8 caràcters."
    );

    confirmarPassword.setCustomValidity(
        coincideixen ? "" : "Les contrasenyes no coincideixen."
    );

    password.classList.toggle("is-valid", correcte);
    password.classList.toggle("is-invalid", !correcte && password.value.length > 0);

    confirmarPassword.classList.toggle("is-valid", coincideixen);
    confirmarPassword.classList.toggle("is-invalid", !coincideixen && confirmarPassword.value.length > 0);

    return correcte && coincideixen;
}

dni.addEventListener("input", function () {
    this.value = this.value.toUpperCase();

    const correcte = validarDNI(this.value);

    this.classList.toggle("is-valid", correcte);
    this.classList.toggle("is-invalid", this.value.length > 0 && !correcte);
});

naixament.addEventListener("change", function () {
    const correcte = validarEdat(this.value);

    this.classList.toggle("is-valid", correcte);
    this.classList.toggle("is-invalid", !correcte && this.value !== "");
});

password.addEventListener("input", validarContrasenyes);
confirmarPassword.addEventListener("input", validarContrasenyes);

pfp.addEventListener("change", function () {
    const fitxer = this.files[0];

    if (fitxer) {
        if (!fitxer.type.startsWith("image/")) {
            this.value = "";
            alert("Selecciona un fitxer d'imatge vàlid.");
            return;
        }

        if (fitxer.size > 5 * 1024 * 1024) {
            this.value = "";
            alert("La imatge no pot superar els 5 MB.");
            return;
        }

        preview.src = URL.createObjectURL(fitxer);
    }
});

formulari.addEventListener("submit", function (event) {
    event.preventDefault();

    const dniCorrecte = validarDNI(dni.value);
    const edatCorrecta = validarEdat(naixament.value);
    const contrasenyesCorrectes = validarContrasenyes();

    dni.classList.toggle("is-valid", dniCorrecte);
    dni.classList.toggle("is-invalid", !dniCorrecte);

    naixament.classList.toggle("is-valid", edatCorrecta);
    naixament.classList.toggle("is-invalid", !edatCorrecta);

    const formulariCorrecte = formulari.checkValidity() &&
        dniCorrecte &&
        edatCorrecta &&
        contrasenyesCorrectes;

    if (!formulariCorrecte) {
        formulari.querySelectorAll(":invalid").forEach(function (camp) {
            camp.classList.add("is-invalid");
        });

        const primerError = formulari.querySelector(":invalid");

        if (primerError) {
            primerError.focus();
        }

        return;
    }

    alert("Registre completat correctament! Benvingut al Pokémon Trainer Club.");

    formulari.reset();

    municipi.innerHTML = '<option value="">Primer selecciona una província</option>';
    municipi.disabled = true;

    preview.src = "../imgs/login.jpg";

    formulari.querySelectorAll(".is-valid, .is-invalid").forEach(function (camp) {
        camp.classList.remove("is-valid", "is-invalid");
    });

    pfp.value = "";
});
