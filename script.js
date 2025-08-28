// script.js

document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('output');

  // Add loading row
  const loadingRow = document.createElement('tr');
  loadingRow.id = 'loading';
  const loadingCell = document.createElement('td');
  loadingCell.colSpan = 2;
  loadingCell.textContent = 'Loading...';
  loadingRow.appendChild(loadingCell);
  tbody.appendChild(loadingRow);

  // Global start time
  const start = performance.now();

  // Function to create a promise with random delay between 1 and 3 seconds
  function createPromise() {
    const delayMs = Math.random() * 2000 + 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        const end = performance.now();
        const timeTaken = (end - start) / 1000;
        resolve(timeTaken);
      }, delayMs);
    });
  }

  // Create three promises
  const p1 = createPromise();
  const p2 = createPromise();
  const p3 = createPromise();

  // Use Promise.all to wait for all promises
  Promise.all([p1, p2, p3]).then((times) => {
    // Remove loading row
    tbody.removeChild(loadingRow);

    // Add rows for each promise
    ['Promise 1', 'Promise 2', 'Promise 3'].forEach((name, i) => {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      nameCell.textContent = name;
      const timeCell = document.createElement('td');
      timeCell.textContent = times[i].toFixed(3);
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tbody.appendChild(row);
    });

    // Add total row (max time, which is the time the longest promise took)
    const maxTime = Math.max(...times);
    const totalRow = document.createElement('tr');
    const totalNameCell = document.createElement('td');
    totalNameCell.textContent = 'Total';
    const totalTimeCell = document.createElement('td');
    totalTimeCell.textContent = maxTime.toFixed(3);
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    tbody.appendChild(totalRow);
  });
});
