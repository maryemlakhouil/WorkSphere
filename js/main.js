// ouvrir / Fermer Modal d'ajout
const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

// Ouvrir modal
ouvrirModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Fermer modal
fermerModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Formulaire
const formulaire = document.getElementById("workerForm");

// Inputs
const inputName = document.getElementById("FullName");
const inputEmail = document.getElementById("Email");
const inputPhone = document.getElementById("Phone");
const photoInput = document.getElementById("PhotoURL");

// Regex
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const phoneRegex = /^0[6-7]\d{8}$/;

// Validation date expérience
function validerDates(debut, fin) {
  return new Date(debut) < new Date(fin);
}

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();


  if (!nameRegex.test(inputName.value)) {
    alert(" Le nom est invalide");
    return;
  }

  if (!emailRegex.test(inputEmail.value)) {
    alert(" Adresse email invalide");
    return;
  }

  if (!phoneRegex.test(inputPhone.value)) {
    alert(" Numéro de téléphone invalide ");
    return;
  }

  //  Création de l'objet Worker
  const worker = {
    fullName: inputName.value,
    role: document.getElementById("Role").value,
    photo: photoInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    phone: inputPhone.value,
    // experiences: 
  };

  alert(" Worker ajouté avec succès !");

  //  Fermeture modal + reset
  modal.classList.add("hidden");
  formulaire.reset();
});
//
