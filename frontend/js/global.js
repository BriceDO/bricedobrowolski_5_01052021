// Récupère les produits
const ENDPOINT = 'http://localhost:3000/api/teddies/';

// Récupére l'ID de la commande
const ORDERPOINT = 'http://localhost:3000/api/teddies/order';

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
    // Ajoute ou retire du panier en fonction de la condition
function ajouterRetirerPanier(element, recupererID) {

    if (element.innerText == "Retirer du panier") {
        ajouterPanier(element, recupererID);

    } else {
        retirerPanier(element, recupererID);
    }

    rafraichirAlertePanier();
}

    // Modifie le visuel du bouton et ajoute un ID au local storage
function ajouterPanier(element, recupererID) {
    element.innerText = "Ajouter au panier";
    element.classList = 'btn btn btn-primary text-white';

    /* ------------- Enleve le produit du local storage --------- */

    let tabID = JSON.parse(localStorage.getItem('tabID'));
    
    // Retrouver l'index du produit concerné dans le tableau
    index = tabID.indexOf(recupererID);

    // Supprimer l'id du tableau
    tabID.splice(index, 1);

    // Mettre à jour le storage avec un nouveau tableau
    localStorage.setItem("tabID", JSON.stringify(tabID));
}

    // Modifie le visuel du bouton et retire un ID au local storage
function retirerPanier(element, recupererID) {
    element.innerText = "Retirer du panier";
    element.classList = 'btn btn-success text-white';

    /* ------------- Ajoute le produit au local storage --------- */

    let tabID = retournerTabID();

    // Ajoute l'id au tableau
    tabID.push(recupererID);

    // Mettre à jour le storage avec un nouveau tableau
    localStorage.setItem('tabID', JSON.stringify(tabID));
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

// Si le tabID est différent de null (donc si il contient contient quelque chose), alors on récupère un tableau d'ID.
// Sinon, on récupère un tableau vide.

function retournerTabID() {
    return localStorage.getItem('tabID') != null  ? JSON.parse(localStorage.getItem('tabID')) : [];
}
