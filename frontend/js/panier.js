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
            }
        }
    }
})

// Retire tous les produits
function retirerPanier(id) {

    // Retire visuellement
    document.getElementById(id).remove();

    // retrouver l'index du produit concerné dans le tableau
    index = tabID.indexOf(id);

    //supprimer l'id du tableau
    tabID.splice(index,1);

    //met à jour le storage avec le tableau à jour
    localStorage.setItem("tabID", tabID);
}

// Retire un produit

 let btnToutRetirer = document.getElementById("clear-cart").addEventListener("click", () => {
     // Retirer du local Storage
    localStorage.removeItem('tabID');

     // Retirer visuellement
    document.querySelector('#articles').innerHTML = "";
    document.getElementById("clear-cart").remove();
  })


// -------- RECAP DE LA COMMANDE ----------- //

// function recapCommande() {
//     let recap = document.querySelector('.recap');

//     if (nbProduitsPanier == 0){
//         recap.innerHTML = 'Vous n\'avez pas de produit dans votre panier';
//     } else {
//         recap.innerHTML = `Vous avez ${nbProduitsPanier} produit(s) dans votre panier`;
//     }
// }

// recapCommande();

// -------- ENVOI DU FORMULAIRE AU SERVEUR ----------- //

function envoyer(e) {

    e.preventDefault();

    fetch(ORDERPOINT,{
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({
                contact : {
                    firstName: document.getElementById('firstName').value,
                    lastName : document.getElementById('lastName').value,
                    address : document.getElementById('address').value,
                    city : document.getElementById('city').value,
                    email : document.getElementById('email').value
                },
                products : tabID
                })
    })
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value){
        console.log(value);
        /*
        document.getElementById("result")
        .innerText = value.postData.text;
        */
    });
}

document
  .getElementById("formulaireCommande")
  .addEventListener("submit", envoyer);



