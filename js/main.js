// DECLARATION GLOBAL
const employees = JSON.parse(localStorage.getItem("employee")) || [];

// ouvrir / Fermer Modal d'ajout
const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");
// Règles d’accès par salle 
const zoneAcces = {
  "conference": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
  "servers":   ["Techniciens IT", "Manager", "Nettoyage"],
  "security": ["Agents de sécurité", "Manager", "Nettoyage"],
  "Réception": ["Réceptionnistes", "Manager", "Nettoyage"],
  "personnel": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
  "archive": ["Manager"]
};
const zoneLimits = {
  conference: 10,
  servers: 2,
  security: 2,
  Réception: 3,
  personnel: 6,
  archive: 1
};
// Ouvrir modal
ouvrirModal.addEventListener("click", () => {
  modal.classList.remove("hidden");
});
// Fermer modal
fermerModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});
//  REACTIVER LECTURE LOCAL STORAGE
// function chargerEmployee() {
//   return JSON.parse(localStorage.getItem("employee")) || [];
// }
// Local Storage
// function enregistrerWorkers(data) {
//   localStorage.setItem("employee", JSON.stringify(data));
// }
// Verifier Si la zone est pleine
// function ZoneEstpleine(zoneName) {
//   const workers = chargerEmployee();
//   const count = workers.filter(w => w.zone_work === "container_" + zoneName).length;
//   return count >= (zoneLimits[zoneName]);
// }

// function RoleEstAutoriseInZone(role, zone) {
//   return zoneAcces[zone]?.includes(role);
// }

// Conteneurs
const staffList = document.getElementById("stafflist");


// Afficher Employees Fonction
function afficherEmployees(employees) {
  staffList.innerHTML = '';
  employees.forEach(employee => {
    const card = document.createElement("div");
    const nomComplet = employee.nomComplet.split(' ');
    const nom = nomComplet[nomComplet.length - 1];
    card.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center cursor-pointer";

    card.innerHTML = `
                <div class="flex">
                  <img src="${employee.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${nom} <br> <span class="md:text-[.8rem] text-gray-400">${employee.role}</</span></h3>
                </div>
                <div class="flex ">
                <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
                </div>
    `;
    staffList.appendChild(card);
  });
}
afficherEmployees(employees);
// Formulaire 
const formulaire = document.getElementById("employeeForm");

// Inputs
const inputNom = document.getElementById("nomComplet");
const inputEmail = document.getElementById("email");
const inputTelephone = document.getElementById("telephone");
const imageInput = document.getElementById("imageUrl");
const imageConteneur = document.getElementById("imageConteneur");
const localisation = "Unassigned Staff";

imageInput.addEventListener("input", () => {
  if (imageInput.value.trim() !== "") {
    imageConteneur.src = imageInput.value;
  } else {
    imageConteneur.src = "img/Profil.jpg";
  }
});

// Regex
const nomRegex = /^[A-Za-zÀ\s'-]{2,50}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const telephoneRegex = /^0[6-7]\d{8}$/;

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nomRegex.test(inputNom.value)) {
    alert(" Le nom de employé est invalide");
    return;
  }

  if (!emailRegex.test(inputEmail.value)) {
    alert(" Adresse email invalide");
    return;
  }

  if (!telephoneRegex.test(inputTelephone.value)) {
    alert(" Numéro de téléphone invalide ");
    return;
  }

  const blockExp = document.querySelectorAll(".expBlock");
  let experiences = [];

  for (let block of blockExp) {
    const titre = block.querySelector(".expTitre").value.trim();
    const debut = block.querySelector(".expdebut").value;
    const fin = block.querySelector(".expfin").value;

    if (!titre || !debut || !fin) {
      alert("remplir Tous les champs d'expérience .");
      return;
    }
    if (new Date(debut) >= new Date(fin)) {
      alert("La date de début doit être avant la date de fin.");
      return;
    }
    experiences.push({ titre, debut, fin });
  }

  //  Création de l'objet Worker
  const employee = {
    id: Date.now(),
    nomComplet: inputNom.value,
    role: document.getElementById("Role").value,
    image: imageInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    telephone: inputTelephone.value,
    experiences: experiences,
    localisation: localisation,
  };

  employees.push(employee);
  localStorage.setItem("employee", JSON.stringify(employees));
  alert(" Empoyer ajouté avec succès !");
  afficherEmployees(employees);
  modal.classList.add("hidden");
  formulaire.reset();
  imageConteneur.src = "img/Profil.jpg";
  experienceList.innerHTML = "";
});



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
               class="expTitre p-2 border rounded bg-white" required>

        <div class="flex gap-2">
            <input type="date" class="expdebut p-2 border rounded bg-white" required>
            <input type="date" class="expfin p-2 border rounded bg-white" required>
        </div>

        <button type="button" class="removeExp w-fit bg-red-600 border border-gray-400 p-2 cursor-pointer rounded text-sm ">
            Supprimer
        </button>
    `;
    // Suppression d'une expérience
    expDiv.querySelector(".removeExp").addEventListener("click", () => {
        expDiv.remove();
    });
    experienceList.appendChild(expDiv);

});

// Rendre Les Zones 
// function renderZones() {
//   const workers = chargerEmployee();

//   // vider les conteneurs
//   document.querySelectorAll(".zone-members").forEach((z) => (z.innerHTML = ""));

//   workers.filter((w) => w.is_worked).forEach((w) => {
//       const container = document.getElementById(w.zone_work);
//       if (!container) return;
      
//       // retirer employé de la zone
//       card.querySelector(".remove").addEventListener("click", () => {
//         w.is_worked = false;
//         w.zone_work = "";
//         enregistrerWorkers(workers);
//         renderStafflist();
//         renderZones();
//       });

//       container.appendChild(card);
//     });
// }

function AfficherWorkersAdmie(zoneName, containerEl) {
  
  const allowed = zoneAcces[zoneName] || [];

  containerEl.innerHTML = "";

  employees.filter((w) => !w.is_worked && allowed.includes(w.role)).forEach((w) => {
      const card = document.createElement("div");
      card.className ="cursor-pointer bg-white p-2 rounded-xl shadow flex gap-3 items-center w-full hover:bg-gray-100";
      card.innerHTML = `
                <img src="${w.photo}" class="w-10 h-10 object-cover">
                <div>
                    <p class="font-bold">${w.fullName}</p>
                    <p class="text-sm text-gray-600">${w.role}</p>
                </div>
            `;
      card.addEventListener("click", () => assignWorkerToZone(w.id, zoneName));
      containerEl.appendChild(card);
    });
}
// Affecter worker 
function assignWorkerToZone(id, zoneName) {
  const workers = chargerEmployee();
  const w = workers.find((w) => w.id === id);

  if (!w) return;

  // Vérifier rôle
  if (!RoleEstAutoriseInZone(w.role, zoneName)) {
    return alert("Ce rôle n'est pas autorisé dans cette zone.");
  }
  // Vérifier limite
  if (ZoneEstpleine(zoneName)) {
    return alert("Cette zone est pleine !");
  }
  // Affecter
  w.is_worked = true;
  w.zone_work = "container_" + zoneName;
  enregistrerWorkers(workers);
  renderStafflist();
  renderZones();
}

document.querySelectorAll(".zone-add").forEach(btn => {
  btn.addEventListener("click", () => {
    const room = btn.closest(".room");
    const zoneName = room.getAttribute("room-name");
    // const container = room.querySelector(".zone-members");
    AfficherWorkersAdmie(zoneName, room);
  });
});


//  AFFICHAGE STAFF NON ASSIGNÉS 

// function renderStafflist() {
//   const container = document.getElementById("stafflist");
//   container.innerHTML = "";

//   const workers = chargerEmployee();

//   workers.filter(w => !w.is_worked).forEach(worker => {
//       const card = document.createElement("div");
//       card.className = "bg-white p-3 shadow flex gap-3 items-center";

//       card.innerHTML = `
//                 <div class="flex">
//                   <img src="${worker.photo}" alt="staff image" 
//                        class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">

//                   <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">
//                     ${worker.fullName} <br> 
//                     <span class="md:text-[.8rem] text-gray-400">${worker.role}</span>
//                   </h3>
//                 </div>

//                 <div class="flex">
//                   <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
//                 </div>
//       `;
//       // Bouton remove
//       card.querySelector(".removeFromRoom").addEventListener("click", () => {
//         const workers = chargerEmployee();
//         const w = workers.find(w => w.id === worker.id);
//         if (w) {
//           w.is_worked = false;
//           w.zone_work = "";
//           localStorage.setItem("worker", JSON.stringify(workers));
//         }
//         card.remove();
//       });

//       container.appendChild(card);
//     });
// }

//  CHARGER LES WORKERS APRÈS REFRESH
// document.addEventListener("DOMContentLoaded", () => {
//   renderStafflist();
// });

// MOdal detaille
function openDetails(worker) {
  const modal = document.getElementById("detailsModal");

  modal.querySelector(".detailPhoto").src = worker.photo;
  modal.querySelector(".name").textContent = worker.fullName;
  modal.querySelector(".role").textContent = worker.role;
  modal.querySelector(".email").textContent = worker.email;
  modal.querySelector(".phone").textContent = worker.phone;

  modal.querySelector(".location").textContent = worker.is_worked
    ? worker.zone_work.replace("container_", "")
    : "Unassigned";

  const expContainer = modal.querySelector(".Experience");
  expContainer.innerHTML = "";
  worker.experiences.forEach((exp) => {
   const p = document.createElement("p");
   p.textContent = `• ${exp.title} (${exp.debut} → ${exp.fin})`;
   expContainer.appendChild(p);
  });

  modal.classList.remove("hidden");
}
// fermer modal
document.getElementById("closeDetails").addEventListener("click", () => {
    document.getElementById("detailsModal").classList.add("hidden");
});

