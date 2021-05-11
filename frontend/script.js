function afficherTousLesProduits() {

    /* Cette fonction est appliquée sur index.html et fait appel à l'API pour afficher tous les produits */

    fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(data => {
        data.forEach(article => {
            displayArticleListe(article);
        });
    })
}

function afficherLeProduit() {
    id = recupererId();
    chercherEtAfficherArticle(id);
}

function displayArticleProduit(article) {

    // Cette fonction inclut les élèments de l'article dans les balises concernées dans produit.html 
    
    // Image
    let baliseIMG = document.querySelector('.image');
    baliseIMG.src = article.imageUrl;

    // Titre
    let baliseTitre = document.querySelector('.titre');
    baliseTitre.textContent = article.name;

    // Description
    let baliseDescription = document.querySelector('.description');
    baliseDescription.textContent = article.description;

    // Prix
    let balisePrix = document.querySelector('.price');
    balisePrix.textContent = article.price;

    // Couleurs
    // Je cible la balise qui sera le parent de la liste des couleurs
    let baliseParentCouleur = document.querySelector('.couleur');

    // Je boucle le tableau des couleurs
    for (const element of article.colors){

        // Je créé une div qui ajoute les couleurs dans le bouton "choisissez votre couleur"
        let baliseEnfantCouleur = document.createElement('div');
        baliseEnfantCouleur.className = "dropdown-item";
        baliseEnfantCouleur.innerText = element;

        // J'ajoute les div créées au parent
        baliseParentCouleur.appendChild(baliseEnfantCouleur);
    }
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

function chercherEtAfficherArticle(id) {

    /* Cette fonction fait appel à l'API et vérifie si l'ID
        est la même que celle d'un des articles, si oui, retourne ses propriétés */

    fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(data => {
    data.forEach(article => {
        if (id === article._id){
            displayArticleProduit(article);
        }
    });
    }) 
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