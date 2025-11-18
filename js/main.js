const modal = document.getElementById("addWorkerModal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.onclick = () => modal.classList.remove("hidden");
closeModalBtn.onclick = () => modal.classList.add("hidden");

// Optional: click outside closes
modal.onclick = (e) => {
  if (e.target === modal) modal.classList.add("hidden");
};
