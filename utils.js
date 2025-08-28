export function generateId() {
    return Date.now();
  }
  
  // Render table rows
  export function renderTable(tableBody, items, renderRow) {
    tableBody.innerHTML = "";
    items.forEach(item => {
      tableBody.innerHTML += renderRow(item);
    });
  }