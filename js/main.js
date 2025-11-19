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

const previewPhoto = document.getElementById("PreviewPhoto");
photoInput.addEventListener("input", () => {
  if (photoInput.value.trim() !== "") {
    previewPhoto.src = photoInput.value;
  } else {
    previewPhoto.src = "img/Profil.jpg";
  }
});

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
    const fin = block.querySelector(".expfin").value;

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
  ajouterWorker(worker);
  alert(" Worker ajouté avec succès !");

  //  Fermeture modal + reset
  modal.classList.add("hidden");
  formulaire.reset();
  previewPhoto.src = "img/Profil.jpg";
  experienceList.innerHTML = "";
});
// Fonction D'ajouter un worker 

function ajouterWorker(worker) {
  const card = document.createElement("div");
  const staffList= document.getElementById("stafflist")
  card.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center";

  card.innerHTML = `
                <div class="flex">
                  <img src="${worker.photo}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${worker.fullName} <br> <span class="md:text-[.8rem] text-gray-400">${worker.role}</</span></h3>
                </div>
                <div class="flex">
                  <button class="mr-1 text-red-600 text-[.5rem] md:text-[1.2rem] mt-3 font-semibold">Edit</button>
                </div>
       
  `;
  staffList.appendChild(card);
}
 // Sélection du bouton "Add Experience" 

const addExperience = document.querySelector("#addExperience");
const experienceList = document.getElementById("experienceList");

//  Ajouter une nouvelle expérience

addExperience.addEventListener("click", () => {

    const expDiv = document.createElement("div");
    expDiv.className = "expBlock w-full border  p-3 rounded flex flex-col gap-2";

    expDiv.innerHTML = `
        <input type="text" 
               placeholder="Titre de l'expérience"
               class="expTitle p-2 border rounded bg-white" required>

        <div class="flex gap-2">
            <input type="date" class="expdebut p-2 border rounded bg-white" required>
            <input type="date" class="expfin p-2 border rounded bg-white" required>
        </div>

        <button type="button" class="w-fit bg-red-600 border border-gray-400 p-2 cursor-pointer rounded text-sm ">
            Supprimer
        </button>
    `;

    experienceList.appendChild(expDiv);

    // Suppression d'une expérience
    expDiv.querySelector(".removeExp").addEventListener("click", () => {
        expDiv.remove();
    });
    
});

// Acces Roles 

const accessRules = {
  Réceptionnistes: ["Réception"],
  "Techniciens IT": ["Salle des serveurs"],
  "Agents de sécurité": ["Salle de sécurité"],
  Manager: [
    "Réception",
    "Salle des serveurs",
    "Salle de sécurité",
    "Salle du personnel",
    "Salle d'archives",
    "Salle de conférence",
  ],
  Nettoyage: [
    "Réception",
    "Salle des serveurs",
    "Salle de sécurité",
    "Salle du personnel",
    "Salle de conférence",
  ],
  "Autres rôles": ["Réception", "Salle du personnel", "Salle de confirence"],
};



