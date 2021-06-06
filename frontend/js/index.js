function displayArticleListe(article) {

    /* Cette fonction inclut les élèments de l'article dans les balises concernées dans index.html 
        en créant un template et en le clonant en dessous de la balise articles */

    // 1. Récupérer le template de l'article
    let templateArticle = document.querySelector('#template');
    let clone = document.importNode(template.content, true);

    // Image
    let baliseIMG = clone.querySelector('.image');
    baliseIMG.src = article.imageUrl;

    // Titre
    let baliseTitre = clone.querySelector('.titre');
    baliseTitre.textContent = article.name;

    // Description
    let baliseDescription = clone.querySelector('.description');
    baliseDescription.textContent = article.description;

    // Prix
    let balisePrix = clone.querySelector('.price');
    balisePrix.textContent = article.price;

    // Bouton ajouter au panier
    let btnAjouter = clone.querySelector('.panier');

    // Savoir si l'ID du produit est dans le panier (tabID)
    tabID = retournerTabID();

    if (estDansLePanier(article._id, tabID)){
        btnAjouter.classList = 'btn btn btn-success text-white';
        btnAjouter.innerText = "Retirer du panier";
    }

    // Au clique du bouton, lance une fonction qui va appeler la fonction ajouterRetirerPanier avec en paramètre le btn HTML concerné
    btnAjouter.addEventListener('click', function() {ajouterRetirerPanier(btnAjouter, article._id)});

    // Le bouton .details et le titre du produit redirigent vers la page produit
    let btnDetail = clone.querySelector('.details');
    btnDetail.href = "produit.html?id="+article._id;
    baliseTitre.href = "produit.html?id="+article._id;

    // Injecte le clone du template dans le HTML en dessous de la balise #articles
    let articles = document.querySelector('#articles');
    articles.appendChild(clone);
}

function afficherTousLesProduits() {

    // Fait appel à l'API pour afficher tous les produits
    getData(ENDPOINT)
        .then(data => {
            data.forEach(article => {
                displayArticleListe(article);
            });
        })
}

afficherTousLesProduits();
rafraichirAlertePanier();