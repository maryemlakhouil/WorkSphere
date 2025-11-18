// ouvrir / Fermer Modal d'ajout

const ovrirModal = document.getElementById("openModal");
const fermerModal = document.getElementById("closeModal");
const modal = document.getElementById("addWorkerModal");

ovrirModal.addEventListener("click",() =>{
    modal.classList.remove("hidden");
});

fermerModal.addEventListener("click",() =>{
    modal.classList.add("hidden");
});

const formulaire = document.getElementById("workerForm");

formulaire.addEventListener("submit",(e)=>{
  e.preventDefault();

  // objet worker
  const worker = {
    fullName: document.getElementById("FullName").value,
    role: document.getElementById("Role").value,
    photo: photoInput.value || "img/Profil.jpg",
    email: document.getElementById("Email").value,
    phone: document.getElementById("Phone").value,
  };
  alert("ajouter worker avec succes !");

  modal.classList.add("hidden");
  formulaire.reset();

  // Validation Regex

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
  const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
  const phoneRegex = /^0[6-7]\d{8}$/;

  function validerDates(debut, fin) {
    return new Date(debut) < new Date(fin);
  }
  // message d'erreurs
  if (!nameRegex.test(fullName.value)) {
    alert("le nom est invalide");
    return;
  }

  if (!emailRegex.test(email.value)) {
    alert("email est invalide ");
    return;
  }

  if (!phoneRegex.test(phone.value)) {
    alert("le numero de telephone est invalide");
    return;
  }

  // VALIDATION DES EXPERIENCES
  const expBlocks = document.querySelectorAll("#experienceList > div");

  let experiences = [];

  for (let block of expBlocks) {
    const title = block.querySelector(".expTitle").value.trim();
    const start = block.querySelector(".expStart").value;
    const end = block.querySelector(".expEnd").value;

    if (!title || !start || !end) {
      alert("Experience fields cannot be empty");
      return;
    }

    if (!validateExperienceDates(start, end)) {
      alert("Start date must be earlier than end date");
      return;
    }

    experiences.push({
      title,
      start,
      end,
    });
  }
});


