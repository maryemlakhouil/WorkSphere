// ouvrir / Fermer Modal d'ajout

const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

// Règles d’accès par salle 
const zoneAcces = {
  "conference": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
  "servers": ["Techniciens IT", "Manager", "Nettoyage"],
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

// let room1 = document.getElementById("room1");
// let room2 = document.getElementById("room2");
// let room3 = document.getElementById("room3");
// let room4 = document.getElementById("room4");
// let room5 = document.getElementById("room5");
// let room6 = document.getElementById("room6");

// function enregistrerWorkers(data) {
//   localStorage.setItem("worker", JSON.stringify(data));
// }

// function ZoneComple(zoneName) {
//   const workers = chargerWorkers();
//   const count = workers.filter(w => w.zone_work === "container_" + zoneName).length;
//   return count >= (zoneLimits[zoneName] || Infinity);
// }

// function RoleEstAutoriseInZone(role, zone) {
//   return zoneAcces[zone]?.includes(role);
// }
// Afficher liste unassing 

// function renderStafflist() {
//   const container = document.getElementById("stafflist");
//   container.innerHTML = "";
  
//   const workers = chargerWorkers();
  
//   workers
//   .filter((w) => !w.is_worked)
//   .forEach((w) => {
//     const div = document.createElement("div");
//     div.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center";
    
//     div.innerHTML = `
//     <img src="${w.photo}" class="rounded-full w-12 h-12 object-cover">
//     <div class="flex flex-col">
//     <span class="font-bold">${w.fullName}</span>
//     <span class="text-gray-500 text-sm">${w.role}</span>
//     </div>
//     <button class="removeFromRoom text-red-600 font-bold text-lg px-2">x</button>
//     `;
    
//     div.querySelector(".removeFromRoom").addEventListener("click", () => {
//       w.is_worked = false;
//       w.zone_work = "";
//       enregistrerWorkers(workers);
//       renderStafflist();
//       renderZones();
//     });
    
//     container.appendChild(div);
//   });
// }

// Rendre Les Zones 
// function renderZones() {
//   const workers = chargerWorkers();
  
//   // vider les conteneurs
//   document.querySelectorAll(".zone-members").forEach((z) => (z.innerHTML = ""));
  
//   workers
//   .filter((w) => w.is_worked)
//   .forEach((w) => {
//     const container = document.getElementById(w.zone_work);
    
//     if (!container) return;
    
//     let div = document.createElement("div");
//     div.className =
//     "card bg-white p-2 rounded shadow flex gap-2 items-center relative";
    
//     div.innerHTML = `
//     <img src="${w.photo}" class="rounded-full w-12 h-12 object-cover">
//     <div>
//     <p class="font-bold">${w.fullName}</p>
//     <p class="text-xs text-gray-500">${w.role}</p>
//     </div>
//     <button class="remove text-red-600 absolute right-2 top-2 font-bold">x</button>
//     `;
    
//     // supprimer et renvoyer dans Unassigned
//     div.querySelector(".remove").addEventListener("click", () => {
//       w.is_worked = false;
//       w.zone_work = "";
//       enregistrerWorkers(workers);
//       renderStafflist();
//       renderZones();
//     });
//     container.appendChild(div);
//   });
// }
//

// function AfficherWorkersAdmie(zoneName, containerEl) {
//   const workers = chargerWorkers();
//   const allowed = zoneAcces[zoneName] || [];
  
//   containerEl.innerHTML = "";
  
//   workers
//   .filter((w) => !w.is_worked && allowed.includes(w.role))
//   .forEach((w) => {
//     const card = document.createElement("div");
//     card.className =
//     "card cursor-pointer bg-white p-2 rounded shadow flex gap-3 items-center";
    
//     card.innerHTML = `
//     <img src="${w.photo}" class="rounded-full w-12 h-12">
//     <div>
//     <p class="font-bold">${w.fullName}</p>
//     <p class="text-sm text-gray-600">${w.role}</p>
//     </div>
//     `;
    
//     card.addEventListener("click", () =>
//       assignWorkerToZone(w.id, zoneName, containerEl)
//   );
  
//   containerEl.appendChild(card);
// });
// }
// Affecter worker 
// function assignWorkerToZone(id, zoneName, zoneContainer) {
//   const workers = chargerWorkers();
//   const worker = workers.find((w) => w.id === id);
  
//   if (!worker) return;
  
//   // Vérifier rôle
//   if (!RoleEstAutoriseInZone(worker.role, zoneName)) {
//     return alert(" Role non autorisé dans cette zone !");
//   }
  
//   // Vérifier limite
//   if (ZoneComple(zoneName)) {
//     return alert(" Zone pleine !");
//   }
  
//   // Affecter
//   worker.is_worked = true;
//   worker.zone_work = "container_" + zoneName;
  
//   enregistrerWorkers(workers);
  
//   renderStafflist();
//   renderZones();
// }
// 
// document.querySelectorAll(".zone-add").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const room = btn.closest(".room");
//     const zoneName = room.getAttribute("room-name");
//     const container = room.querySelector(".zone-members");
    
//     AfficherWorkersAdmie(zoneName, container);
//   });
// });


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
const nameRegex = /^[A-Za-zÀ\s'-]{2,50}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const phoneRegex = /^0[6-7]\d{8}$/;

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameRegex.test(inputName.value)) {
    alert(" Le nom de employé est invalide");
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
    id: Date.now(),
    fullName: inputName.value,
    role: document.getElementById("Role").value,
    photo: photoInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    phone: inputPhone.value,
    experiences: experiences,
    is_worked: false,
    zone_work: "",
  };
  ajouterWorker(worker);
  alert(" Worker ajouté avec succès !");
  //  Fermeture modal + reset
  modal.classList.add("hidden");
  formulaire.reset();
  previewPhoto.src = "img/Profil.jpg";
  experienceList.innerHTML = "";
});

// ----------------------------
//  REACTIVER LECTURE LOCAL STORAGE
// ----------------------------

function chargerWorkers() {
  return JSON.parse(localStorage.getItem("worker")) || [];
}

// ----------------------------
//  AFFICHAGE STAFF NON ASSIGNÉS 
// ----------------------------

function renderStafflist() {
  const container = document.getElementById("stafflist");
  container.innerHTML = "";

  const workers = chargerWorkers();

  workers
    .filter(w => !w.is_worked)
    .forEach(worker => {

      const card = document.createElement("div");
      card.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center";

      card.innerHTML = `
                <div class="flex">
                  <img src="${worker.photo}" alt="staff image" 
                       class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">

                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">
                    ${worker.fullName} <br> 
                    <span class="md:text-[.8rem] text-gray-400">${worker.role}</span>
                  </h3>
                </div>

                <div class="flex">
                  <button class="mr-1 text-red-600 text-[.2rem] md:text-[1.2rem] mt-3 font-semibold">Edit</button>
                  <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
                </div>
      `;

      // Bouton remove
      card.querySelector(".removeFromRoom").addEventListener("click", () => {
        const workers = chargerWorkers();
        const w = workers.find(w => w.id === worker.id);
        if (w) {
          w.is_worked = false;
          w.zone_work = "";
          localStorage.setItem("worker", JSON.stringify(workers));
        }
        card.remove();
      });

      container.appendChild(card);
    });
}


// ----------------------------
//  CHARGER LES WORKERS APRÈS REFRESH
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  renderStafflist();
});

function ajouterWorker(worker) {
  let workers = JSON.parse(localStorage.getItem("worker")) || [];
  workers.push(worker);
  localStorage.setItem("worker", JSON.stringify(workers));

  const card = document.createElement("div");
  const staffList = document.getElementById("stafflist");
  card.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center";

  card.innerHTML = `
                <div class="flex">
                  <img src="${worker.photo}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${worker.fullName} <br> <span class="md:text-[.8rem] text-gray-400">${worker.role}</</span></h3>
                </div>
                <div class="flex ">
                <button class="mr-1 text-red-600 text-[.2rem] md:text-[1.2rem] mt-3 font-semibold">Edit</button>
                <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
                </div>
  `;
  // Bouton X = remettre en unassigned
  card.querySelector(".removeFromRoom").addEventListener("click", () => {
    worker.is_worked = false;
    worker.zone_work = "";
    localStorage.setItem("worker", JSON.stringify(workers));
    card.remove();
  });
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




















