import { clients, saveClients } from "./data.js";
import { generateId, renderTable } from "./utils.js";

const form = document.getElementById("clientForm");
const tableBody = document.querySelector("#clientsTable tbody");

function renderClients() {
  renderTable(tableBody, clients, client => `
    <tr>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.company}</td>
      <td>
        <button onclick="deleteClient(${client.id})">Delete</button>
      </td>
    </tr>
  `);
}
window.deleteClient = id => {
  const index = clients.findIndex(c => c.id === id);
  if (index > -1) {
    clients.splice(index, 1);
    saveClients();
    renderClients();
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const company = document.getElementById("company").value;
  const notes = document.getElementById("notes").value;

  if (!name || !email || !company) {
    alert("Please fill all required fields");
    return;
  }

  clients.push({ id: generateId(), name, email, company, notes });
  saveClients();
  form.reset();
  renderClients();
});

renderClients();