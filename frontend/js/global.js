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

    if (element.innerText == "Retirer du panier") {
        element.innerText = "Ajouter au panier";
        element.classList = 'btn btn btn-primary text-white';
        nbProduitsPanier -= 1;

        /* ------------- Enleve le produit du local storage --------- */

        let tabID = JSON.parse(localStorage.getItem('tabID'));
        console.log("#enlever le " + recupererID + " dans le storage");

        // Retrouver l'index du produit concerné dans le tableau
        index = tabID.indexOf(recupererID);

        // Supprimer l'id du tableau
        tabID.splice(index, 1);

        // Mettre à jour le storage avec un nouveau tableau
        localStorage.setItem("tabID", JSON.stringify(tabID));

        console.log(tabID);

    } else {
        element.innerText = "Retirer du panier";
        element.classList = 'btn btn-success text-white';
        nbProduitsPanier += 1;

        /* ------------- Ajoute le produit au local storage --------- */

        //let tabID = localStorage.getItem('tabID').split(',');

        // Si tabID existe pas dans le local Storage, on initialise avec un tableau vide
        // Si il existe, on récupère sa valeur
        let tabID = retournerTabID();

        console.log(tabID);
        console.log("#ajout de " + recupererID + " dans le storage");

        // Ajoute l'id au tableau
        tabID.push(recupererID);

        // Mettre à jour le storage avec un nouveau tableau
        localStorage.setItem('tabID', JSON.stringify(tabID));
        console.log(tabID);
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
    retourne la longueur du tableau grâce à l'ID (soit le nombre de produit)  */

function retournerNbProduitsPanier() {
    let nbProduitPanier = 0;
    if (localStorage.getItem('tabID') != null){
        let tabID = localStorage.getItem('tabID').split(',');
        nbProduitPanier = tabID.length;
    }
    return nbProduitPanier;
}

function retournerTabID() {
    return localStorage.getItem('tabID') != null  ? JSON.parse(localStorage.getItem('tabID')) : [];
}
