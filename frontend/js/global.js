const ENDPOINT = 'http://localhost:3000/api/teddies/';
let nbProduitsPanier = 0;

    // Cette fonction récupère l'API

async function getData(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    }
    catch(error) {
        console.error(error);
    }
}

    // Relié à la fonction displayArticleListe de index.html
function ajouterPanier(element) {

    if (element.innerText == "Retirer du panier") {
        element.innerText = "Ajouter au panier";
        element.classList = 'btn btn btn-primary text-white';
        nbProduitsPanier -= 1;

    } else {
        element.innerText = "Retirer du panier";
        element.classList = 'btn btn-success text-white';
        nbProduitsPanier += 1;

    }

    rafraichirAlertePanier();
}

function rafraichirAlertePanier() {
    let alertePanier = document.querySelector('.alerte-panier');

    if (nbProduitsPanier == 0){
        alertePanier.innerHTML = 'Vous n\'avez pas de produit dans votre <a href="/frontend/panier.html">panier<a>';
    } else {
        alertePanier.innerHTML = `Vous avez ${nbProduitsPanier} produit(s) dans votre <a href="/frontend/panier.html">panier<a>`;
    }
}

function retournerNbProduitsPanier() {
    let nbProduitPanier = 0;

    if (localStorage.getItem('tabID') != null){
        let tabID = localStorage.getItem('tabID').split(',');
        nbProduitPanier = tabID.length;
    }
    return nbProduitPanier;
}

localStorage.setItem('tabID', ['5be9c8541c9d440000665243', '5beaa8bf1c9d440000a57d94']);