// Récupère les produits
const ENDPOINT = 'http://localhost:3000/api/teddies/';

// Récupére l'ID de la commande
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
    /*  Relié à la fonction displayArticleListe de index.html
        Change l'innerText ainsi que la couleur du bouton et 
        Incrémente ou décrémente lorsque "ajouter/retirer au panier" est cliqué */

function ajouterPanier(element, recupererID) {

    if (element.innerText == "Retirer du panier") {
        element.innerText = "Ajouter au panier";
        element.classList = 'btn btn btn-primary text-white';
        nbProduitsPanier -= 1;

        /* ------------- Enleve le produit du local storage --------- */

        let tabID = JSON.parse(localStorage.getItem('tabID'));
        
        // Retrouver l'index du produit concerné dans le tableau
        index = tabID.indexOf(recupererID);

        // Supprimer l'id du tableau
        tabID.splice(index, 1);

        // Mettre à jour le storage avec un nouveau tableau
        localStorage.setItem("tabID", JSON.stringify(tabID));

    } else {
        element.innerText = "Retirer du panier";
        element.classList = 'btn btn-success text-white';
        nbProduitsPanier += 1;

        /* ------------- Ajoute le produit au local storage --------- */

        // Si tabID existe pas dans le local Storage, on initialise avec un tableau vide
        // Si il existe, on récupère sa valeur
        let tabID = retournerTabID();

        // Ajoute l'id au tableau
        tabID.push(recupererID);

        // Mettre à jour le storage avec un nouveau tableau
        localStorage.setItem('tabID', JSON.stringify(tabID));
    }

    rafraichirAlertePanier();
}

// Change l'alerte lorsque 1 produit ou + sont sélectionnés
function rafraichirAlertePanier() {
    let alertePanier = document.querySelector('.alerte-panier');
    let tabID = retournerTabID();

    if (tabID.length == 0){
        alertePanier.innerHTML = 'Vous n\'avez pas de produit dans votre <a href="/frontend/panier.html">panier<a>';
    } else {
        alertePanier.innerHTML = `Vous avez ${tabID.length} produit(s) dans votre <a href="/frontend/panier.html">panier<a>`;
    }
}

// Determine s'il y a un produit dans le panier et retourne la longueur du tableau grâce à l'ID (soit le nombre de produit)
//inutilisé
function retournerNbProduitsPanier() {
    let nbProduitPanier = 0;
    if (localStorage.getItem('tabID') != null){
        let tabID = localStorage.getItem('tabID').split(',');
        nbProduitPanier = tabID.length;
    }
    return nbProduitPanier;
}

// Si le tabID est différent de null, alors on récupère un tableau d'ID.
// Sinon, on récupère un tableau vide.

function retournerTabID() {
    return localStorage.getItem('tabID') != null  ? JSON.parse(localStorage.getItem('tabID')) : [];
}
