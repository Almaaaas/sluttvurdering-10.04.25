let quizSporsmal = [
    {
        spørsmål: "Hva er hovedstaten i Frankrike?",
        svar: ["Paris", "London", "Beirut", "Madrid"],
        korrekt: "Paris"
    },
    {
        spørsmål: "Hvilket bilde viser Eiffeltårnet?",
        type: "bildevalg",
        bilder: [
            {src: "quiz1.jpg", alt: "Pisa Tårnet", korrekt: false},
            {src: "quiz2.jpg", alt: "Burj Khalifa", korrekt: false},
            {src: "bilde1.jpg", alt: "Eiffel Tårnet", korrekt: true},
            {src: "quiz4.jpg", alt: "Taj Mahal", korrekt: false}
        ]
    },
    {
        spørsmål: "Hva er Paris kjent som?",
        svar: ["Lysbyen", "Mørkebyen", "Skinnebyen", "Artens by"],
        korrekt: "Lysbyen"
    },
    {
        spørsmål: "Hvilken av disse bakstene er byen kjent for?",
        svar: ["Skolebolle", "Sjokoladekake", "Crossaint", "Wienerpecan"],
        korrekt: "Crossaint"
    }
]

let navnInput = document.querySelector("#navninput")
let startKnapp = document.querySelector("#startquiz")
let quizInnhold = document.querySelector("#quizInnhold")
let resultatDiv = document.querySelector("#resultat")
let resultatListe = document.querySelector("#resultatliste")
let visResultatKnapp = document.querySelector("#visResultaterKnapp")
let resultatInnhold = document.querySelector("#resultatInnhold")
let leggTilNavn = document.querySelector("#ekstraNavn")
let leggTilPoeng = document.querySelector("#ekstraPoeng")
let leggTilKnapp = document.querySelector("#leggTilResultat")

let nåværendeSpørsmål = 0
let poeng = 0
let brukernavn = ""

startKnapp.addEventListener("click", startQuiz)
visResultatKnapp.addEventListener("click", visResultat)
leggTilKnapp.addEventListener("click", leggTilResultatManuelt)

function startQuiz() {
    brukernavn = navnInput.value.trim()
    if(brukernavn === ""){
        alert("Vennligst skriv inn navnet ditt før du starter quizen!")
        return
    }

    nåværendeSpørsmål = 0
    poeng = 0
    quizInnhold.innerHTML = ""
    resultatDiv.textContent = ""
    quizInnhold.style.display = "block" //!!!!!!!!!!!!!!!!!!!!//

    visSporsmal()
}

function visSporsmal(){
    quizInnhold.innerHTML = ""

    let spm = quizSporsmal[nåværendeSpørsmål]

    let spmEl = document.createElement("div")
    spmEl.innerHTML = "<h3>" + spm.spørsmål + "</h3>"

    if(spm.type === "bildevalg") {
        spm.bilder.forEach((bilde) => {
            let knapp = document.createElement("button")
            knapp.innerHTML = '<img src="' + bilde.src + '"width="150" height="100"/>'
            knapp.addEventListener("click", () => {
                if(bilde.korrekt) poeng++
                nesteSporsmal()
            })
            spmEl.appendChild(knapp)
        })
    } else {
        spm.svar.forEach((valg) => {
            let knapp = document.createElement("button")
            knapp.textContent = valg
            knapp.addEventListener("click", () => {
                if(valg === spm.korrekt) poeng++
                nesteSporsmal()
            })
            spmEl.appendChild(knapp)
        })
    }

    quizInnhold.appendChild(spmEl)
}

function nesteSporsmal(){
    nåværendeSpørsmål++
    if(nåværendeSpørsmål < quizSporsmal.length){
        visSporsmal()
    } else {
      avsluttQuiz()  
    }
}

function avsluttQuiz(){
    quizInnhold.innerHTML = ""
    resultatDiv.textContent = brukernavn + ", du fikk " + poeng + " poeng!"

    lagreResultat({navn: brukernavn, poeng: poeng})
    oppdaterResultatListe()
}

function lagreResultat(nyttResultat){
    let lagret = JSON.parse(localStorage.getItem("resultater")) || []
    lagret.push(nyttResultat)
    localStorage.setItem("resultater", JSON.stringify(lagret))
}

function oppdaterResultatListe(){
    resultatListe.innerHTML = ""
    let lagret = JSON.parse(localStorage.getItem("resultater")) || []

    lagret.sort((a, b) => b.poeng - a.poeng)

    lagret.forEach((r) => {
        let li = document.createElement("li")
        li.textContent = r.navn + ": " + r.poeng + " poeng"
        resultatListe.appendChild(li)
    })
}


function visResultat(){
    if(resultatInnhold.style.display === "none"){
        resultatInnhold.style.display = "block"
        visResultatKnapp.textContent = "Skjul tidligere resultater"
        oppdaterResultatListe()
    } else{
        resultatInnhold.style.display = "none"
        visResultatKnapp.textContent = "Vis tidligere resultater"
    }
}

function leggTilResultatManuelt(){
    let navn = leggTilNavn.value.trim()
    let poengverdi = parseInt(leggTilPoeng.value.trim())

    if(navn === "" || isNaN(poengverdi)){
        alert("Skriv inn gyldig navn og poeng!")
        return
    }

    lagreResultat({navn: navn, poeng: poengverdi})
    oppdaterResultatListe()

    leggTilNavn.value = ""
    leggTilPoeng.value = ""
}


