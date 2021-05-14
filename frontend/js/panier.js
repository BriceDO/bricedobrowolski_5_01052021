// Convertir la chaîne en tableau du local storage
let tabID = localStorage.getItem('tabID').split(',');

getData(ENDPOINT)
.then(data => {
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

                 //Bouton retirer au panier
                 let btnRetirer = clone.querySelector('.retirer');

                 /* Au clique du bouton retirer, on execute la fonction retirerPanier 
                    avec en paramètrel'ID du produit */
                 // Le paramètre est baliseArticle.id pour fonctionner.
                 // Avec la variable ID, cela ne fonctionne pas.   
                 btnRetirer.addEventListener("click", () => {
                       retirerPanier(baliseArticle.id);
                 });

                let articles = document.querySelector('#articles');
                articles.appendChild(clone);
            }
        }
    }
})

// Retire un seul produit du panier visuellement et du le local Storage
function retirerPanier(id) {
    document.getElementById(id).remove();
    console.log("effacer le id " + id + " du tableau suivant :");
    console.log(tabID);

    tabID.splice(id);

    console.log("**********");

    console.log("Voici le tableau à jour : ");
    console.log(tabID);

}

 // Retire tous les produits du panier visuellement et du le local storage

 let btnToutRetirer = document.getElementById("clear-cart").addEventListener("click", () => {
    localStorage.removeItem('tabID');
    document.querySelector('#articles').innerHTML = "";
    document.getElementById("clear-cart").remove();
  })

//   // Formulaire

//   let formNom = document.getElementById('nom');
//   formNom.addEventListener('input', function (e) {
//       let value = e.target.value;
      
//   })

