// Récupérer les travaux

//console.log(localStorage.getItem("token"));
document.addEventListener("DOMContentLoaded", () => {
async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const works = await response.json();
    console.log(works);

    // Sauvegarder les travaux pour le filtrage
    window.allWorks = works;

    // Afficher tous les travaux par défaut
    works.forEach(work => addFigure(work));

  } catch (error) {
    console.error(error.message);
  }
}
getWorks();

// Ajouter un élément à la galerie
function addFigure(data) {
  const figure = document.createElement("figure");
  figure.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
    <figcaption>${data.title}</figcaption>
  `;
  document.querySelector(".gallery").append(figure);
}

// Récupérer les catégories
async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const categories = await response.json();
    console.log(categories);

    // Ajouter le bouton "Tous"
    setFilter({ id: null, name: "Tous" });

    // Ajouter les autres catégories
    categories.forEach(category => setFilter(category));

  } catch (error) {
    console.error(error.message);
  }
}
getCategories();

// Ajouter un filtre

function setFilter(data) {
  const div = document.createElement("div");
  div.textContent = data.name;
  div.classList.add(".divFilter");
  div.dataset.id = data.id; // Sauvegarder l'ID de la catégorie

  // Ajouter un événement de clic pour filtrer
  div.addEventListener("click", () => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; // reinitialise la galerie

    const categoryId = data.id;

      let filteredWorks = window.allworks

      console.log(window.allWorks, filteredWorks)
    if (categoryId) {
      filteredWorks = window.allWorks.filter(work => work.categoryId === categoryId)
      filteredWorks.forEach(work => addFigure(work));
    } else {
      window.allWorks.forEach(work => addFigure(work));
    }
    

    // Mettre à jour le style actif pour le filtre
    document.querySelectorAll(".divFilter > *").forEach(btn => btn.classList.remove("active"));
    div.classList.add("active"); //ajoute la classe active lorsque le bouton est cliqué
  });

  document.querySelector(".divFilter").append(div);
}

function activeAdmin() {
  const token = localStorage.getItem("token"); // Récupération du token
  if (token) {
    console.log("Token détecté :", token);

    // activation du visuel editMod
    const editMod = document.createElement("div");
    editMod.className = "editMod";
    editMod.innerHTML = '<p><a href="#modal1" class="js-modal"><i class="fa-regular fa-pen-to-square"></i> Mode édition activé</a></p>';
    document.body.prepend(editMod);
  }
}

activeAdmin();

let modal = null

const openModal = function (e) {
  e.preventDefault()

  const target = document.querySelector(e.target.getAttribute("href"));

  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
  if (modal === null) return
  e.preventDefault();

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null;
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

const focusInModal = function (e) {
  e.preventDefault()
}

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener("click", openModal);
});

window.addEventListener('keydown', function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e)
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e)
  }
})

});