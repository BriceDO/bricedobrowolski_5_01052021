// Récupère la chaine des paramètres dans l'url
const queryString = window.location.search;

// Utilise la classe URLSearchParams pour parser (couper) les paramètres
const urlParams = new URLSearchParams(queryString);

// Récupère la valeur de la clé ID
nom = urlParams.get('nom');
prenom = urlParams.get('prenom');
email = urlParams.get('email');
adresse = urlParams.get('adresse');
ville = urlParams.get('ville');

envoyer(nom, prenom, email, adresse, ville);

// -------- ENVOI DU FORMULAIRE AU SERVEUR ----------- //

function envoyer(nom, prenom, email, adresse, ville) {
    fetch(ORDERPOINT,{
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify({
                contact : {
                    firstName: nom,
                    lastName : prenom,
                    address : adresse,
                    city : ville,
                    email : email
                },
                products : retournerTabID()
                })
    })
    .then(function(res){
        if (res.ok) {
            return res.json();
        }
    })

    // Recupère l'ID de la commande et le prix total pour les afficher sur la page
    .then(function(reponse){
        document.querySelector('.idCommande').innerText = reponse.orderId;
        montantTotal = 0;
        for (product of reponse.products){
            montantTotal += product.price;
        }
        document.querySelector('.montantTotal').innerText = `Le montant total de votre commande est de ${montantTotal}.`;
    });
}