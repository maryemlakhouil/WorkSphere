// DECLARATION GLOBAL
const employees = JSON.parse(localStorage.getItem("employee")) || [];
const closeModalBtn  = document.querySelectorAll(".close-Modal-btn");
closeModalBtn.forEach(E =>{
  E.addEventListener("click",()=>{
    const parent = E.closest(".modal")
    parent.classList.add("hidden");
})
})
// ouvrir / Fermer Modal d'ajout
const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

const selectModal = document.getElementById("add-modal");

const openSelectModal = () => selectModal.classList.remove('hidden');
const closeSelectModal = () => selectModal.classList.add('hidden');

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
// Conteneurs
const staffList = document.getElementById("stafflist");

// Afficher Employees Fonction
function afficherEmployees(employees) {
  const unassigned = employees.filter(em => !em.localisation )
  staffList.innerHTML = '';
  unassigned.forEach(employee => {
    const card = document.createElement("div");
    const nomComplet = employee.nomComplet.split(' ');
    const nom = nomComplet[nomComplet.length - 1];
    card.className = "bg-white p-3 rounded-xl shadow flex gap-3 items-center cursor-pointer";
    card.setAttribute("data-id", employee.id);

    card.innerHTML = `
                <div class="flex">
                  <img src="${employee.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${nom} <br> <span class="md:text-[.8rem] text-gray-400">${employee.role}</</span></h3>
                </div>
                `;
                // <div class="flex ">
                // <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
                // </div>
    card.addEventListener("click",()=>{
      detailsmodal.classList.remove('hidden')
      afficherDate(employee);
      console.log(employee);
    })
    staffList.appendChild(card);
  });
}
const detailsmodal = document.getElementById("detailsModal");
function afficherDate(employee){
  const image= detailsmodal.querySelector('img')
     const name = detailsmodal.querySelector('.nom');
     const email = detailsmodal.querySelector('.email');
     const role = detailsmodal.querySelector('.role');
     const phone = detailsmodal.querySelector('.telephone');
     const place = detailsmodal.querySelector('.location');
     const Experience= detailsmodal.querySelector('.Experience');
     Experience.innerHTML =``;
     name.textContent = employee.nomComplet;
     email.textContent = employee.email;
     role.textContent = employee.role;
     phone.textContent =employee.telephone;
     place.textContent = employee.localisation;
     image.src = employee.image || '../img/Profil.jpg'
     employee.experiences.forEach(exp =>{
         Experience.innerHTML += `<div>
                                 <p>Title: <span>${exp.titre}</span></p>
                                  <p>start date: <span>${exp.debut}</span></p>
                                  <p>End date: <span>${exp.fin}</span></p>
                                  <br>
                                 </div>
         `;
     })
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
  let experience = [];

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
    experience.push({ 
      "titre":titre,
      "debut": debut,
      "fin": fin });
  }

  //  Création de l'objet Worker
  const employee = {
    id: Date.now(),
    nomComplet: inputNom.value,
    role: document.getElementById("Role").value,
    image: imageInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    telephone: inputTelephone.value,
    experiences: experience,
    localisation: null
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
function asigneEmployer(room, zonemember, zoneName) {
  const newList = employees.filter(employee => zoneAcces[zoneName].includes(employee.role));
    if (zonemember.childElementCount >= zoneLimits[zoneName]) {
      alert("zonelimit");
      return
    }
    selectModal.querySelector(".assign").innerHTML = "";

    newList.forEach(employee =>{
      const card = document.createElement("div");
      const nomComplet = employee.nomComplet.split(" ");
      const nom = nomComplet[nomComplet.length - 1];
      card.className ="chooseEmp bg-white p-3 rounded-xl shadow flex gap-3 items-center cursor-pointer";
      card.setAttribute("data-id",employee.id);
      card.innerHTML = `
                <div class="flex">
                  <img src="${employee.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${nom} <br> <span class="md:text-[.8rem] text-gray-400">${employee.role}</</span></h3>
                </div>
                `;
       
      // <div class="flex ">
      // <button class="removeFromRoom text-red-600 font-bold mt-3 text-lg px-2">x</button>
      // </div>
      selectModal.querySelector(".assign").appendChild(card);
      card.addEventListener("click",(e)=>{
        if (zonemember.childElementCount >= zoneLimits[zoneName]) {
          alert("zonelimit");
          return
        }
         const card2 = card.cloneNode(true);
        closeSelectModal();
        card2.innerHTML = `
                <div class="flex bg-gray-200">
                  <img src="${employee.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${nom} <br> <span class="md:text-[.8rem] text-gray-400">${employee.role}</</span></h3>
                  <button class="remover">x</button>
                </div>

                `;
      
          zonemember.appendChild(card2)
        employee.localisation = zoneName;
        afficherEmployees(employees); 
        

        card2.querySelector('.remover').addEventListener('click' ,()=>{
          card2.remove();
          employee.localisation=null;
          afficherEmployees(employees); 
        })
        const element = e.target.closest('.chooseEmp');
        document.querySelector(`#stafflist [data-id="${element.getAttribute("data-id")}"]`).remove();
     
        
        // afficherEmployees(EmpAffiche);
      })
    })
      const container = room.querySelector(".zone-members");
}
document.querySelectorAll(".zone-add").forEach(btn => {
  btn.addEventListener("click", () => {
    openSelectModal();
    const room = btn.closest(".room");
    const zonemember = room.querySelector(".zone-members");
    const zoneName = room.getAttribute("room-name");

    asigneEmployer(room, zonemember, zoneName);
  });
});




function retelecharger(){
  employees.forEach(emp=>{
    if(emp.localisation){
      const chambreparent = document.querySelector(`[room-name= "${emp.localisation}"]`);
      const chambre = chambreparent.querySelector('.zone-members');
      const card2 = document.createElement("div");
      card2.innerHTML = `
                <div class="flex bg-gray-200">
                  <img src="${emp.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
                  <h3 class="font-bold text-[.7rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">${emp.nom} <br> <span class="md:text-[.8rem] text-gray-400">${emp.role}</</span></h3>
                  <button class="remover">x</button>
                </div>

                `;
      chambre.appendChild(card2);
      console.log(chambre)
      
    }
  })
}
retelecharger();