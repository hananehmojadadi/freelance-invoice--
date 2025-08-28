import { clients, invoices, saveInvoices } from "./data.js";
import { generateId, renderTable } from "./utils.js";

const form = document.getElementById("invoiceForm");
const tableBody = document.querySelector("#invoicesTable tbody");
const clientSelect = document.getElementById("clientSelect");

function populateClients() {
  clientSelect.innerHTML = clients.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
}

function renderInvoices() {
  renderTable(tableBody, invoices, inv => `
    <tr>
      <td>${clients.find(c => c.id == inv.clientId)?.name || "Unknown"}</td>
      <td>${inv.service}</td>
      <td>$${inv.amount}</td>
      <td>${inv.date}</td>
      <td>${inv.paid ? "Paid" : "Unpaid"}</td>
      <td>
        <button onclick="markPaid(${inv.id})">Mark Paid</button>
        <button onclick="deleteInvoice(${inv.id})">Delete</button>
      </td>
    </tr>
  `);
}

window.markPaid = id => {
  const invoice = invoices.find(i => i.id === id);
  if (invoice) {
    invoice.paid = true;
    saveInvoices();
    renderInvoices();
  }
};

window.deleteInvoice = id => {
  const index = invoices.findIndex(i => i.id === id);
  if (index > -1) {
    invoices.splice(index, 1);
    saveInvoices();
    renderInvoices();
  }
};

form.addEventListener("submit", e => {
  e.preventDefault();
  const clientId = clientSelect.value;
  const service = document.getElementById("service").value;
  const description = document.getElementById("description").value;
  const amount = +document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  invoices.push({ id: generateId(), clientId, service, description, amount, date, paid: false });
  saveInvoices();
  form.reset();
  renderInvoices();
});

populateClients();
renderInvoices();