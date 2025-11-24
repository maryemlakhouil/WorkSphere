//-----------------------
//  GLOBAL DECLARATION
//-----------------------
// Récupération des employés depuis LocalStorage
const employees = JSON.parse(localStorage.getItem("employee")) || [];

// Fermeture des modals via le bouton "close"
const closeModalBtn = document.querySelectorAll(".close-Modal-btn");

closeModalBtn.forEach((E) => {
  E.addEventListener("click", () => {
    const parent = E.closest(".modal");
    parent.classList.add("hidden");
  });
});
//-------------------------------------
//     OUVRIR / FERMER MODAL AJOUT
//-------------------------------------

const ouvrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

// Modal sélection employés
const selectModal = document.getElementById("add-modal");
const openSelectModal = () => selectModal.classList.remove("hidden");
const closeSelectModal = () => selectModal.classList.add("hidden");

// RÈGLES D'ACCÈS DE Chaque Salle 

const zoneAcces = {
  "conference": ["Manager", "Receptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
  "servers":   ["Techniciens IT", "Manager", "Nettoyage"],
  "security": ["Agents de sécurité", "Manager", "Nettoyage"],
  "reception": ["Receptionnistes", "Manager", "Nettoyage"],
  "personnel": ["Manager", "Receptionnistes", "Techniciens IT", "Agents de sécurité", "Nettoyage", "Autres rôles"],
  "archive": ["Manager"]
};

// Limites de capacité par salle
const zoneLimits = {
  conference: 10,
  servers: 2,
  security: 2,
  reception: 3,
  personnel: 6,
  archive: 1,
};
//-------------------------
//  OUVERTURE / FERMETURE
//-------------------------

//1- Ouvrir modal d'ajout
ouvrirModal.addEventListener("click", () => modal.classList.remove("hidden"));

// 2-Fermer modal d'ajout
fermerModal.addEventListener("click", () => modal.classList.add("hidden"));
//---------------------------
// AFFICHAGE LISTE EMPLOYÉS
//--------------------------

const staffList = document.getElementById("stafflist");

function afficherEmployees(employees) {
  console.log(employees)
  // Affiche seulement les employés NON assignés
  const unassigned = employees.filter((emp) => !emp.localisation);

  staffList.innerHTML = "";

  unassigned.forEach((employee) => {
    const card = document.createElement("div");

    // Affichage juste du nom (Dernier mot)
    const nomComplet = employee.nomComplet.split(" ");
    const nom = nomComplet[nomComplet.length - 1];

    card.className =
      "bg-white p-3 rounded-xl shadow flex gap-3 items-center cursor-pointer";
    card.setAttribute("data-id", employee.id);

    card.innerHTML = `
      <div class="flex">
        <img src="${employee.image}" alt="staff image" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
        <h3 class="font-semibold text-[.4rem] md:text-[0.8rem] mt-2 md:mt-3 md:ml-4">
          ${nom} 
          <br>
          <span class="md:text-[.8rem] text-gray-500">${employee.role}</span>
        </h3>
      </div>
    `;

    // Ouvrir les détails au clic
    card.addEventListener("click", () => {
      detailsmodal.classList.remove("hidden");
      afficherDate(employee);
    });

    staffList.appendChild(card);
  });
}

// ===============================
//     Modal Details D'employée
// ===============================

const detailsmodal = document.getElementById("detailsModal");

function afficherDate(employee) {
  const image = detailsmodal.querySelector("img");
  const name = detailsmodal.querySelector(".nom");
  const email = detailsmodal.querySelector(".email");
  const role = detailsmodal.querySelector(".role");
  const phone = detailsmodal.querySelector(".telephone");
  const place = detailsmodal.querySelector(".localisation");
  const Experience = detailsmodal.querySelector(".Experience");

  Experience.innerHTML = ``;

  // Remplissage informations
  name.textContent = employee.nomComplet;
  email.textContent = employee.email;
  role.textContent = employee.role;
  phone.textContent = employee.telephone;
  place.textContent = employee.localisation || "Non assigné";

  image.src = employee.image || "../img/Profil.jpg";

  // Boucle expériences
  employee.experiences.forEach((exp) => {
    Experience.innerHTML += `
      <div>
        <p>Titre d'experience: <span>${exp.titre}</span></p>
        <p>date debut : <span>${exp.debut}</span></p>
        <p>date fin: <span>${exp.fin}</span></p>
        <br>
      </div>
    `;
  });
}

afficherEmployees(employees);

// ==================================
// Formulaire d'ajouter Un employée
// ==================================

const formulaire = document.getElementById("employeeForm");

// Inputs
const inputNom = document.getElementById("nomComplet");
const inputEmail = document.getElementById("email");
const inputTelephone = document.getElementById("telephone");
const imageInput = document.getElementById("imageUrl");
const imageConteneur = document.getElementById("imageConteneur");

// Prévisualisation image
imageInput.addEventListener("input", () => {
  imageConteneur.src =
    imageInput.value.trim() !== "" ? imageInput.value : "img/Profil.jpg";
});

// Regex validations
const nomRegex = /^[A-Za-zÀ\s'-]{2,50}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const telephoneRegex = /^0[6-7]\d{8}$/;

// Soumission formulaire
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  // Vérifications simples
  if (!nomRegex.test(inputNom.value)) return alert("Nom invalide");
  if (!emailRegex.test(inputEmail.value)) return alert("Email invalide");
  if (!telephoneRegex.test(inputTelephone.value))
    return alert("Téléphone invalide");

  // Collecte des expériences
  const blockExp = document.querySelectorAll(".expBlock");
  let experience = [];

  for (let block of blockExp) {
    const titre = block.querySelector(".expTitre").value.trim();
    const debut = block.querySelector(".expdebut").value;
    const fin = block.querySelector(".expfin").value;

    if (!titre || !debut || !fin)
      return alert("Champs d'expérience incomplets");

    if (new Date(debut) >= new Date(fin))
      return alert("La date de début doit être avant la fin");

    experience.push({ titre, debut, fin });
  }

  // Création de l'objet employé
  const employee = {
    id: Date.now(),
    nomComplet: inputNom.value,
    role: document.getElementById("Role").value,
    image: imageInput.value || "img/Profil.jpg",
    email: inputEmail.value,
    telephone: inputTelephone.value,
    experiences: experience,
    localisation: null,
  };

  employees.push(employee);
  localStorage.setItem("employee", JSON.stringify(employees));

  alert("Employé ajouté !");
  afficherEmployees(employees);

  modal.classList.add("hidden");
  formulaire.reset();
  imageConteneur.src = "img/Profil.jpg";
  experienceList.innerHTML = "";
});

// ======================================
//  Ajout / Suppression d'une experience
// ======================================

const addExperience = document.querySelector("#addExperience");
const experienceList = document.getElementById("experienceList");

addExperience.addEventListener("click", () => {
  const expDiv = document.createElement("div");
  expDiv.className = "expBlock w-full border p-3 rounded flex flex-col gap-2";

  expDiv.innerHTML = `
    <input type="text" class="expTitre p-2 border rounded bg-white" placeholder="Titre" required>
    <div class="flex gap-2">
      <input type="date" class="expdebut p-2 border rounded bg-white" required>
      <input type="date" class="expfin p-2 border rounded bg-white" required>
    </div>
    <button type="button" class="removeExp w-fit bg-red-600 text-white p-2 rounded text-sm">Supprimer</button>
  `;

  // Bouton supprimer
  expDiv.querySelector(".removeExp").addEventListener("click", () => {
    expDiv.remove();
  });

  experienceList.appendChild(expDiv);
});

// =================================
// Assignation d'employé a une salle
// ==================================

function asigneEmployer(room, zonemember, zoneName) {
  
    console.log(room, zonemember, zoneName);
  // Filtrer employés autorisés a entrer dans la salle
  const newList = employees.filter((employee) =>
    zoneAcces[zoneName].includes(employee.role)
  );

  // Vérifier capacité de la salle 
  if (zonemember.childElementCount >= zoneLimits[zoneName]) {
    alert("Zone pleine");
    return;
  }

  selectModal.querySelector(".assign").innerHTML = "";

  newList.forEach((employee) => {
    const card = document.createElement("div");

    const nomComplet = employee.nomComplet.split(" ");
    const nom = nomComplet[nomComplet.length - 1];

    card.className =
      "chooseEmp  p-2 rounded-xl shadow flex gap-3 items-center cursor-pointer";
    card.setAttribute("data-id", employee.id);

    card.innerHTML = `
      <div class="flex">
        <img src="${employee.image}" alt="staff" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
        <h3 class="font-semibold text-[.7rem] md:text-[.8rem] mt-2 md:mt-3 md:ml-4">
          ${nom}
          <br>
          <span class="text-gray-400">${employee.role}</span>
        </h3>
      </div>
    `;

    selectModal.querySelector(".assign").appendChild(card);

    // Clic pour assigner
    card.addEventListener("click", (e) => {
      if (zonemember.childElementCount >= zoneLimits[zoneName]) {
        alert("Zone pleine");
        return;
      }

      const card2 = card.cloneNode(true);
      

      closeSelectModal();

      card2.innerHTML = `
        <div data-supadd="${employee.id}" class=" flex bg-gray-200 items-center rounded-lg">
          <img src="${employee.image}" alt="staff" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
          <h3 class="font-semibold text-[.7rem] md:text-[.8rem] ml-4">
            ${nom}
            <br>
            <span class="text-gray-400">${employee.role}</span>
          </h3>
          <button class="remover ml-auto mr-2 text-red-600 font-bold">x</button>
        </div>
      `;
      console.log(card2)
      console.log(zonemember);
     
      let allroom = Array.from(document.querySelector("#wgrid").children);
      allroom.forEach(ele => {
        let cart = ele.querySelector(`[data-supadd="${employee.id}"]`);
        if(cart){
          cart.parentElement.remove()
        }
      })

      zonemember.appendChild(card2);

      // Marquer localisation pour stockage
      employee.localisation = zoneName;
      localStorage.setItem("employee", JSON.stringify(employees));

      // Mettre à jour liste employés non assignés
      afficherEmployees(employees);

      // Suppression depuis zone
      card2.querySelector(".remover").addEventListener("click", () => {
        card2.remove();
        employee.localisation = null;
        localStorage.setItem("employee", JSON.stringify(employees));
        afficherEmployees(employees);
      });

      // Retirer depuis stafflist
      // document.querySelector(`#stafflist [data-id="${employee.id}"]`)?.remove();
      const element = e.target.closest('.chooseEmp');
      document.querySelector(`#stafflist [data-id="${element.getAttribute("data-id")}"]`)?.remove();

    });
  });
  
  const container = room.querySelector(".zone-members");

}

// Ouverture selectModal depuis bouton "+"
document.querySelectorAll(".zone-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    openSelectModal();
    const room = btn.closest(".room");
    const zonemember = room.querySelector(".zone-members");
    const zoneName = room.getAttribute("room-name");
    asigneEmployer(room, zonemember, zoneName);
  });
});

// ===============================
//     RECHARGEMENT DES EMPLOYÉS
// ===============================

function retelecharger() {
  employees.forEach((emp) => {
    if (emp.localisation) {
      const room = document.querySelector(`[room-name="${emp.localisation}"]`);
      if (!room) return console.warn("Salle introuvable :", emp.localisation);

      const zone = room.querySelector(".zone-members");

      const card2 = document.createElement("div");
      card2.innerHTML = `
        <div data-supadd="${emp.id}"  class="flex bg-gray-200 items-center rounded-sm">
          <img src="${emp.image}" class="rounded-full w-9 h-8 m-2 md:m-3 md:w-14 md:h-14 object-cover">
          <h3 class="font-semibold text-gray-700 text-[.7rem] md:text-[.8rem] ml-4">
            ${emp.nomComplet}
            <br>
            <span class="text-gray-400 font-medium">${emp.role}</span>
          </h3>
          <button class="remover ml-auto mr-2 text-red-700 font-bold">x</button>
        </div>
      `;
      zone.appendChild(card2);

      // Bouton retirer
      card2.querySelector(".remover").addEventListener("click", () => {
        card2.remove();
        emp.localisation = null;
        localStorage.setItem("employee", JSON.stringify(employees));
        afficherEmployees(employees);
      });
    }
  });
}

retelecharger();
