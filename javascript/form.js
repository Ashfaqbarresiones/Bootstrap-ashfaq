    function cridaSubmit1(event) {
      event.preventDefault();

      // dades des del formulari

      const formulari = document.getElementById("formulari");
      let nom = formulari.elements["nom"].value;
      let pokemon = formulari.elements["pokemon"].value;
      let naixament = formulari.elements["naixament"].value;

      // separant la data de naixament

      if (!naixament) return;
      const [anyNaix, mesNaix, diaNaix] = naixament.split('-').map(Number);

      const avui = new Date();

      const diaActual = avui.getDate();
      const mesActual = avui.getMonth() + 1;
      const anyActual = avui.getFullYear();

      // l'edat
      let edat = anyActual - anyNaix;


      if (mesActual < mesNaix || (mesActual === mesNaix && diaActual < diaNaix)) {
        edat--;
      }

      // si té 18 anys avui

      const compleixavui = (anyActual - anyNaix === 18) && (mesActual === mesNaix) && (diaActual === diaNaix);

      // FINAL

      if (compleixavui) {
        alert("Felicitats! " + nom + " avui fas 18 anys i has escollit el pokémon" + pokemon )
      }
      else if (edat >= 18) {
        alert("Ja tens 18 anys, el teu pokemon " + pokemon + " està en camí")
      }
      else{
        alert("oops! encara no ets menor d'edat tens " + edat + " anys, torna més endavant")
      }

    }