const loginApi = "http://localhost:5678/api/users/login";  //variable qui me permet où envoyer l'email et le mdp

document.getElementById("loginForm").addEventListener("submit", handleSubmit);  //quand je clique sur le bouton envoyer on va appeler la fct handlesubmit, prendre l'info ecrite et l'envoyer

async function handleSubmit(event) {      //executer le form    
    event.preventDefault();  //empeche le rechargement de la page

    let user = {                   //objet qui va contenir mon email et mdp
        email : document.getElementById("email").value,
        password : document.getElementById("password").value
    };
    
    let response = await fetch(loginApi, {     //envoie des données à l'API, j'envoie une requete fetch
        method : "POST",                        
        headers : {                                 
            "Content-Type" : "application/json",            //données envoyées au format JSON
        },
        body : JSON.stringify(user),                        //convertir l'objet user en texte pour le lire 
    });
    if (response.status != 200) {                        //si le mot de passe ou le mail est erroné alors afficher un message d'erreur
        const error = document.createElement("div");
        error.className = "errorLogin";
        error.innerHTML = "Mot de passe ou Mail incorrect";
        document.querySelector("form").prepend(error);
    } else {
        
    

    let result = await response.json();                 //recupere la reponse de l'API
    console.log(result);

    const token = result.token;         //stockage du token quand on réussi à se connecter
    localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
    

    window.location.href = "index.html";    //redirection sur la page index
    }
}
