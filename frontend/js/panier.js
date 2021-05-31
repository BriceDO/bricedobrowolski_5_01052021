rafraichirPage();

// Rafraichit le panier et le recap de la commande
function rafraichirPage() {

    document.querySelector('#articles').innerHTML = "";
    let tabID = retournerTabID();

    getData(ENDPOINT)
    .then(data => {
    let montantTotal = 0;
    for(id of tabID) {
        for(produit of data) {
            if (id == produit._id){

                let templateArticle = document.querySelector('#template');
                let clone = document.importNode(template.content, true);
                
                // Ajoute l'ID dans la propriété ID du div qui contient l'article
                let baliseArticle = clone.querySelector('.article');
                baliseArticle.id = id;

                let baliseIMG = clone.querySelector('.image');
                baliseIMG.src = produit.imageUrl;

                let baliseTitre = clone.querySelector('.titre');
                baliseTitre.textContent = produit.name;

                let balisePrix = clone.querySelector('.prix');
                balisePrix.textContent = `Prix : ${produit.price}`;

                 // Bouton retirer au panier
                 let btnRetirer = clone.querySelector('.retirer');

                 /* Au clique du bouton retirer, on execute la fonction retirerPanier 
                    avec en paramètre l'ID du produit.
                    Le paramètre doit avoir baliseArticle.id pour fonctionner.  */
 
                 btnRetirer.addEventListener("click", () => {
                       retirerPanier(baliseArticle.id);
                 });

                let articles = document.querySelector('#articles');
                articles.appendChild(clone);

                 if (tabID.length > 0){
                    montantAjoute = produit.price;
                    montantTotal += montantAjoute; 
                 }
            }
        }
    }

    // -------- RECAP DE LA COMMANDE ----------- //
    // Modifie le recap de la commande lorsqu'on enlève un ou tous les produits
     let baliseRecap = document.querySelector('.recap');
     if (tabID.length == 0) {
        baliseRecap.innerHTML = 'Vous n\'avez aucun produit dans votre panier. Veuillez retourner à la page d\'acceuil pour faire votre choix.';
        document.getElementById("formulaireCommande").innerHTML = "";
        document.querySelector(".bloc-form").innerHTML = "";
        document.getElementById("clear-cart").remove();
     } else {
         baliseRecap.innerHTML = `Votre commande contient ${tabID.length} produit(s) pour un montant total de ${montantTotal}.`;
    }
})
}

// Retire un produit
function retirerPanier(id) {

    let tabID = retournerTabID();

    // Retrouve l'index du produit concerné dans le tableau
    index = tabID.indexOf(id);

    // Supprime l'id du tableau
    tabID.splice(index,1);

    // Met à jour le storage avec le tableau à jour
    localStorage.setItem("tabID", JSON.stringify(tabID));

    rafraichirPage();
}

// Retirer tous les produits
 let btnToutRetirer = document.getElementById("clear-cart").addEventListener("click", () => {

     // Retirer du local Storage
    localStorage.removeItem('tabID');

    rafraichirPage();
 })

// Au clique du btn valider, envoie les informations du formulaire ainsi que les ID des produits sélectionnés
let btnValider = document.getElementById("formulaireCommande");