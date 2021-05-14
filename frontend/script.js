

function afficherLeProduit() {
    id = recupererId();
    chercherEtAfficherArticle(id);
}



function displayArticleListe(article) {

    /* Cette fonction inclut les élèments de l'article dans les balises concernées dans index.html 
        en créant un template et en le clonant en dessous de la balise articles */

    // 1. Récupérer le template de l'article
    let templateArticle = document.querySelector('#template');
    let clone = document.importNode(template.content, true);

    // Image
    let baliseIMG = clone.querySelector('.image');
    console.log(article.imageUrl);
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

    // Le bouton .details et le titre du produit redirigent vers la page produit
    let btnDetail = clone.querySelector('.details');
    btnDetail.href = "produit.html?id="+article._id;
    baliseTitre.href = "produit.html?id="+article._id;

    // Injecte le clone du template dans le HTML en dessous de la balise #articles
    let articles = document.querySelector('#articles');
    articles.appendChild(clone);
}



function recupererId() {

    /* Cette fonction récupère l'ID de l'URL, en retourne sa valeur
       pour pouvoir l'utiliser après et afficher les propriétés de l'article */

    // Récupérer la chaine des paramètres dans l'url
    const queryString = window.location.search;

    // Utiliser la classe URLSearchParams pour parser (couper) les paramètres
    const urlParams = new URLSearchParams(queryString);

    // Récupérer la valeur de la clé ID
    id = urlParams.get('id');

    return id;
}