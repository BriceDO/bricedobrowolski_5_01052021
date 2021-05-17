const ENDPOINT = 'http://localhost:3000/api/teddies/';
const ORDERPOINT = 'http://localhost:3000/api/teddies/order';
let nbProduitsPanier = 0;

    // Récupère l'API

async function getData(url) {
    try {
        let response = await fetch(url);
        return await response.json();
    }
    catch(error) {
        console.error(error);
    }
}

    /* Relié à la fonction displayArticleListe de index.html
        Change l'innerText ainsi que la couleur du bouton et 
        Incrémente ou décrémente lorsque "ajouter/retirer au panier" est cliqué */

function ajouterPanier(element, recupererID) {

    let tabID = localStorage.getItem('tabID').split(',');

    if (element.innerText == "Retirer du panier") {
        element.innerText = "Ajouter au panier";
        element.classList = 'btn btn btn-primary text-white';
        nbProduitsPanier -= 1;

        console.log("#enlever le " + recupererID + " dans le storage");

        // retrouver l'index du produit concerné dans le tableau
        index = tabID.indexOf(recupererID);

        //supprimer l'id du tableau
        tabID.splice(recupererID, 1);

        //met à jour le storage avec le tableau à jour
        localStorage.setItem("tabID", recupererID);

        console.log(tabID);

    } else {
        element.innerText = "Retirer du panier";
        element.classList = 'btn btn-success text-white';
        nbProduitsPanier += 1;


      //  console.log("#ajout de " + recupererID + " dans le storage");
    }


    rafraichirAlertePanier();
}

    /* Change l'alerte lorsque 1 produit ou + sont sélectionnés */

function rafraichirAlertePanier() {
    let alertePanier = document.querySelector('.alerte-panier');

    if (nbProduitsPanier == 0){
        alertePanier.innerHTML = 'Vous n\'avez pas de produit dans votre <a href="/frontend/panier.html">panier<a>';
    } else {
        alertePanier.innerHTML = `Vous avez ${nbProduitsPanier} produit(s) dans votre <a href="/frontend/panier.html">panier<a>`;
    }
}

    /* Determine s'il y a un produit dans le panier et
    retourne la longueur du tableau (soit le nombre d'ID/produit)  */

function retournerNbProduitsPanier() {
    let nbProduitPanier = 0;
    if (localStorage.getItem('tabID') != null){
        let tabID = localStorage.getItem('tabID').split(',');
        nbProduitPanier = tabID.length;
    }
    return nbProduitPanier;
}

    // Exemple pour la page panier seulement
    // localStorage.setItem('tabID', ['5be9c8541c9d440000665243', '5beaa8bf1c9d440000a57d94']);

