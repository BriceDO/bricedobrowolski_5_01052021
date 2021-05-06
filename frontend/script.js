fetch('http://localhost:3000/api/teddies')
.then(response => response.json())
.then(data => {

    data.forEach(article => {
        //genererHTMLArticle(article);
        displayArticle(article);
    });
})

// Ancienne méthode
function genererHTMLArticle(article) {

    // Récupérer le parent principal
    let baliseParent = document.getElementById('articles');

    // Balise <article> card
    let baliseArticle = document.createElement('article');
    baliseArticle.className = "card my-2";

    // Balise <div> card-body shadow
    let baliseCardBody = document.createElement('div');
    baliseCardBody.className = "card-body shadow";

    // Balise <div> row
    let baliseRow = document.createElement('div');
    baliseRow.className = "row";

    // Balise <aside> col-md-3
    let baliseColMD3 = document.createElement('aside');
    baliseColMD3.className = "col-md-3";

    // Balise <aside> col-md-3 le deuxieme
    let baliseColMD3_ = baliseColMD3.cloneNode(true);

    // Balise <img>
    let baliseIMG = document.createElement('img');
    baliseIMG.className = "img-fluid rounded mb-3 mb-md-0";
    baliseIMG.src = article.imageUrl;

    // Balise <div> col-md-6
    let baliseColMD6 = document.createElement('div');
    baliseColMD6.className = "col-md-6";

    // Balise <a> Titre du produit
    let baliseLienNom = document.createElement('a');
    baliseLienNom.className = "mt-2 h5";
    baliseLienNom.innerText = article.name;

    // Balise <p> Description
    let baliseDescription = document.createElement('p');
    baliseDescription.className = "pt-2";
    baliseDescription.innerText = article.description;

    // Balise <aside> col-md-3

    // Balise <div> price-wrap
    let balisePriceWrap = document.createElement('div');
    balisePriceWrap.className = "price-wrap mt-2";

    // Balise <span> Prix
    let balisePrix = document.createElement('span');
    balisePrix.className = "price h5";
    balisePrix.innerText = article.price;

    // Balise <bouton> Acheter
    let baliseBoutonAcheter = document.createElement('a');
    baliseBoutonAcheter.className = "btn btn-primary";
    baliseBoutonAcheter.innerText = "Acheter";

    // Balise <bouton> Détails
    let baliseBoutonDetails = document.createElement('a');
    baliseBoutonDetails.BoutonDetails = "btn btn-light";
    baliseBoutonDetails.BoutonDetails = "Détails";

    // Affecter les enfants aux parents

    baliseColMD3_.appendChild(baliseIMG);

    baliseColMD6.appendChild(baliseLienNom);
    baliseColMD6.appendChild(baliseDescription);

    baliseColMD3.appendChild(balisePrix);
    baliseColMD3.appendChild(baliseBoutonAcheter);
    baliseColMD3.appendChild(baliseBoutonDetails);

    baliseRow.appendChild(baliseColMD3_);
    baliseRow.appendChild(baliseColMD6);
    baliseRow.appendChild(baliseColMD3);

    baliseCardBody.appendChild(baliseRow);
    baliseArticle.appendChild(baliseCardBody);

    // Balise principale
    baliseParent.appendChild(baliseArticle);

}       

// Nouvelle méthode
function displayArticle(article) {

    let html = '<article class="card my-2" id="'+ article.id +'"> \
    <div class="card-body shadow"> \
        <div class="row"> \
            <aside class="col-md-3"> \
                <img src="'+ article.imageUrl +'" class="img-fluid rounded mb-3 mb-md-0"></a> \
            </aside> \
            <div class="col-md-6"> \
                <a href="#" class="mt-2 h5">'+ article.name +'</a> \
                <p class="pt-2">'+ article.description +' \
            </div> \
            <aside class="col-md-3"> \
                <div class="price-wrap mb-1 "> \
                    <span class="price h5"> '+ article.price +'€ </span> \
                </div> \
                <a href="#" class="btn btn-primary"> Aujouter au panier </a>  \
                <a href="produit.html" class="btn btn-light"> Details </a> \
                </p><br> \
            </aside> \
        </div> \
    </div> \
</article>';

    // Récupérer le parent principal
    let baliseParent = document.getElementById('articles');

    baliseParent.innerHTML = baliseParent.innerHTML + html;

}