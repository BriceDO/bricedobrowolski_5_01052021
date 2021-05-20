// Convertir la chaîne du local storage en tableau 
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
                    avec en paramètrel'ID du produit
                    Le paramètre doit avoir baliseArticle.id pour fonctionner.  */
 
                 btnRetirer.addEventListener("click", () => {
                       retirerPanier(baliseArticle.id);
                 });

                let articles = document.querySelector('#articles');
                articles.appendChild(clone);

                // -------- RECAP DE LA COMMANDE ----------- //

                let baliseRecap = document.querySelector('.recap');

                
                 if (tabID.length > 0){
                   montantAjoute = produit.price;
                    montantTotal += montantAjoute; 
                    console.log(montantTotal);
                 }
            
                 if (tabID.length == 0) {
                       baliseRecap.innerHTML = 'Vous n\'avez pas de produit dans votre panier.';
                 } else {
                     baliseRecap.innerHTML = `Votre commande contient ${tabID.length} produit(s) pour un montant total de ${montantTotal}.`;
                  }
            }
        }
    }
})

// Retire tous les produits
function retirerPanier(id) {

    // Retire visuellement
    document.getElementById(id).remove();

    // Retrouver l'index du produit concerné dans le tableau
    index = tabID.indexOf(id);

    // Supprimer la ligne "récapitulatif de commande"
    

    // Supprimer l'id du tableau
    tabID.splice(index,1);

    // Met à jour le storage avec le tableau à jour
    localStorage.setItem("tabID", tabID);
}

// Retirer un produit
 let btnToutRetirer = document.getElementById("clear-cart").addEventListener("click", () => {

     // Retirer du local Storage
    localStorage.removeItem('tabID');

     // Retirer visuellement
    document.querySelector('#articles').innerHTML = "";
    document.getElementById("clear-cart").remove();
  })




// Au clique du btn valider, envoie les informations du formulaire ainsi que les ID des produits sélectionnés
let btnValider = document.getElementById("formulaireCommande");
// btnValider.addEventListener("submit", envoyer);


