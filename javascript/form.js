const campNaixament = document.getElementById("naixament");
campNaixament.max = new Date().toISOString().split("T")[0];

function cridaSubmit1(event) {
    event.preventDefault();

    const formulari = document.getElementById("formulari");
    const nom = formulari.elements["nom"].value;
    const pokemon = formulari.elements["pokemon"].value;
    const naixament = formulari.elements["naixament"].value;

    if (!naixament) return;

    const [anyNaix, mesNaix, diaNaix] = naixament.split("-").map(Number);

    const avui = new Date();
    const anyActual = avui.getFullYear();
    const mesActual = avui.getMonth() + 1;
    const diaActual = avui.getDate();

    let edat = anyActual - anyNaix;
    if (mesActual < mesNaix || (mesActual === mesNaix && diaActual < diaNaix)) {
        edat--;
    }

    const fa18Avui = edat === 18 && mesActual === mesNaix && diaActual === diaNaix;

    if (fa18Avui) {
        alert("Felicitats " + nom + "! Avui fas 18 anys i has escollit " + pokemon + ".");
    } else if (edat >= 18) {
        alert("Ja tens 18 anys, el teu " + pokemon + " està en camí.");
    } else {
        alert("Oops! Encara no ets major d'edat, tens " + edat + " anys. Torna més endavant.");
    }
}