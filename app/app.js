class MVC {
    constructor()
    {
        this.router = null;
    }
    dispatchRoute(controllerInstance) {
        // Vérifie que le contrôleur est un contrôleur valide
        if (!controllerInstance.hasOwnProperty('template') || !controllerInstance.executeHttpRequest) {
            return console.warn(`Le controller ${controllerInstance.constructor.name} est invalide.`);
        }

        // Exécute une requête HTTP GET pour récupérer la vue, et définir la chaîne de promesses pour traiter la réponse
        fetch(controllerInstance.template) //"view"
            .then(response => response.text()) // Renvoie d'une promesse avec le contenu de la réponse HTTP.
            .then(htmlContent => {
                // La réponse HTTP contient le HTML de la vue à injecter.
                document.querySelector('main').innerHTML = htmlContent;

                // Exécution du gestionnaire de la vue.
                controllerInstance.executeHttpRequest();
            });
    };
    redirectTo(template){
        // Demande au routeur de charger une nouvelle route.
        app.mvc.router.navigateTo(template);
    }
};

let mvc = new MVC();
let app = {mvc}

// L'application est exportée afin d'être accessible par d'autres modules.
export default app;