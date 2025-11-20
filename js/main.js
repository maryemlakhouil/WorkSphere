// ouvrir / Fermer Modal d'ajout

const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

let room1 = document.getElementById("room1");
let room2 = document.getElementById("room2");
let room3 = document.getElementById("room3");
let room4 = document.getElementById("room4");
let room5 = document.getElementById("room5");
let room6 = document.getElementById("room6");


// Règles d’accès par salle 
function AfficherWorker(roomName,containerr){

  const zoneAcces = {
      "conference": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
      "personnel": ["Manager", "Réceptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
      "servers": ["Techniciens IT", "Manager", "Nettoyage"],
      "security": ["Agents de sécurité", "Manager", "Nettoyage"],
      "Réception": ["Réceptionnistes", "Manager", "Nettoyage"],
      "archive": ["Manager"]
  };
  containerr.innerHTML = "";
    let workers = JSON.parse(localStorage.getItem("worker")) || [];
    let rolesAcceptes = zoneAcces[roomName] || [];
    
    for (let i = 0; i < workers.length; i++) {
        let emp = workers[i];
      if (emp.is_worked==false && rolesAcceptes.includes(emp.Role)) {
            
            containerr.innerHTML += `
                <div class="card cursor-pointer hover:bg-blue-100 shadow-lg rounded-xl p-4 m-2 flex items-center gap-4" data-id="${emp.id}">
                    <img src="${emp.photo}" class="rounded-full w-20 h-20">
                    <div class="flex flex-col">
                        <h5 class="font-bold">${emp.id}</h5>
                        <h2 class="font-bold text-lg">${emp.fullName}</h2>
                        <p class="text-gray-600">${emp.Role}</p>
                    </div>
                </div>
            `;
        }
    }

   
    containerr.addEventListener("click",function (e){
        let card = e.target.closest(".card");
        if (!card) return;
        let id = parseInt(card.getAttribute("data-id"));
        let data = JSON.parse(localStorage.getItem("worker")) || [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                data[i].is_worked = true;
                data[i].zone_work = containerr.id;
                window.location.reload();
                break;
                
            }
        }

        localStorage.setItem("worker", JSON.stringify(data));
        AfficherCarte(data);
        afficherEmployesZone(roomName, containerr);
        alert("Ce worker est afficher dans  " + room_name);
    });
}

function  aficher_data(){
    let workers = JSON.parse(localStorage.getItem("worker")) || [];
    for(data of workers){

    if(data.is_worked){

   document.getElementById(_data_.zone_work).innerHTML+=
              `<div class="card cursor-pointer hover:bg-blue-100 shadow-lg rounded-xl p-4 m-2 flex items-center gap-4" data-id="${_data_.id}">
                    <img src="${data.photo}" class="rounded-full w-20 h-20">
                    <div class="flex flex-col">
                        <h5 class="font-bold">${data.id}</h5>
                        <h2 class="font-bold text-lg">${data.fullName}</h2>
                        <p class="text-gray-600">${data.Role}</p>
                    </div>
                </div>
             `;
    }
}
}

room1.addEventListener("click",()=>{
  AfficherWorker("Salle de conférence", document.getElementById("container_conference"))

})
//localStorage.removeItem("employer")
aficher_data()


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
const nameRegex = /^[A-Za-zÀ\s'-]{2,50}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const phoneRegex = /^0[6-7]\d{8}$/;

// Validation date expérience

// function validerDates(debut, fin) {
//   return new Date(debut) < new Date(fin);
// }

formulaire.addEventListener("submit", (e) => {
  e.preventDefault();


  if (!nameRegex.test(inputName.value)) {
    alert(" Le fullName est invalide");
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
                <button class="removeFromRoom text-red-600 font-bold text-lg px-2">x</button>
       
  `;
  staffList.appendChild(card);
  activerBoutonRemove(card);
}

// function activerBoutonRemove(card) {
//   const btn = card.querySelector(".removeFromRoom");
//   const unassignedList = document.getElementById("stafflist");

//   btn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     unassignedList.appendChild(card);
//   });
// }

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

    experienceList.appendChild(expDiv);

    // Suppression d'une expérience
    expDiv.querySelector(".removeExp").addEventListener("click", () => {
        expDiv.remove();
    });
    
});

const rooms = document.querySelectorAll(".room");
// tester si un role autorizé dans une zone
function EstAutorisee(role, zone) {
  return zoneAcces[zone].includes(role);
}




