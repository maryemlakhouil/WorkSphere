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

  const blockExp = document.querySelectorAll(".expBlock");

  let experiences = [];
  for(let block of blockExp) {
    const title = block.querySelector(".expTitle").value.trim();
    const debut = block.querySelector(".expdebut").value;
    const fin = block.querySelector(".expEnd").value;

    if (!title || !debut || !fin) {
      alert("remplir Tous les champs d'expérience .");
      return;
    }

    if (new Date(debut) >= new Date(fin)) {
      alert("La date de début doit être avant la date de fin.");
      return;
    }

    experiences.push({ title, debut,fin });
  }

  //  Création de l'objet Worker
  const worker = {
    fullName: inputName.value,
    role: document.getElementById("Role").value,
    photo: photoInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    phone: inputPhone.value,
    experiences: experiences,
  };

  alert(" Worker ajouté avec succès !");

  //  Fermeture modal + reset
  modal.classList.add("hidden");
  formulaire.reset();
});
 // Sélection du bouton "Add Experience"
const addExperience = document.querySelector(".addExperience");
const experienceList = document.getElementById("experienceList");

//  Ajouter une nouvelle expérience

addExperience.addEventListener("click", () => {

    const expDiv = document.createElement("div");
    expDiv.className = "expBlock w-full border p-3 rounded bg-gray-100 flex flex-col gap-2";

    expDiv.innerHTML = `
        <input type="text" 
               placeholder="Titre de l'expérience"
               class="expTitle p-2 border rounded bg-white" required>

        <div class="flex gap-2">
            <input type="date" class="expdebut p-2 border rounded bg-white" required>
            <input type="date" class="expfin p-2 border rounded bg-white" required>
        </div>

        <button type="button" class="removeExp bg-red-400 text-white px-2 py-1 rounded w-fit">
            Supprimer
        </button>
    `;

    experienceList.appendChild(expDiv);

    // Suppression d'une expérience
    expDiv.querySelector(".removeExp").addEventListener("click", () => {
        expDiv.remove();
    });
});
