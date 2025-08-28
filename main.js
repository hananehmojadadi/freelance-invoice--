import { clients, invoices } from "./data.js";

const totalClients = document.getElementById("totalClients");
const totalInvoices = document.getElementById("totalInvoices");
const totalValue = document.getElementById("totalValue");
const paidStats = document.getElementById("paidStats");

function updateDashboard() {
  totalClients.textContent = clients.length;
  totalInvoices.textContent = invoices.length;
  totalValue.textContent = "$" + invoices.reduce((sum, i) => sum + i.amount, 0);
  paidStats.textContent = `${invoices.filter(i => i.paid).length} / ${invoices.filter(i => !i.paid).length}`;
}
updateDashboard();

// Load random quote
async function loadQuote() {
  try {
    const res = await fetch("data/quotes.json");
    const quotes = await res.json();
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quoteText").textContent = random.text;
    document.getElementById("quoteAuthor").textContent = random.author || "Unknown";
  } catch (err) {
    document.getElementById("quoteText").textContent = "Error loading quotes";
  }
}
loadQuote();