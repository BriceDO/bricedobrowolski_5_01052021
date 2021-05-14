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

    //Couleurs
    let baliseSelectCouleurs = document.querySelector('.select-couleurs');

    // Btn Ajouter
    let btnAjouter = document.querySelector('.panier');
    btnAjouter.addEventListener('click', function() {ajouterPanier(btnAjouter)});

    // Je boucle le tableau des couleurs
    for (const element of article.colors){

        // Je créé une div qui ajoute les couleurs dans le bouton "choisissez votre couleur"
        let optionCouleur = document.createElement('option');
        optionCouleur.innerText = element;

        // J'ajoute les div créées au parent
        baliseSelectCouleurs.appendChild(optionCouleur);
    }

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

function afficherLeProduit() {
    id = recupererId();
    let url = ENDPOINT + id;
    getData(url)
        .then(data => {
            displayArticleProduit(data);
        })
}

afficherLeProduit();
rafraichirAlertePanier();