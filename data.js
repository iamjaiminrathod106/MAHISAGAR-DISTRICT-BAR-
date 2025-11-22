document.addEventListener('DOMContentLoaded', () => {
  const lawyerGrid = document.getElementById('lawyer-grid');
  const searchInput = document.getElementById('searchInput');
  let lawyers = [];

  // Fetch data from Google Sheets Web App
  fetch("https://script.google.com/macros/s/AKfycbwGAPK6kVr3y6KGAGLPYIf1zbYZwR08vcLVg7fk06wIoFn0969N15GVGsjE0D6LC1Q/exec")
    .then(res => res.json())
    .then(data => {
      lawyers = data;

      // Sort New → Old based on enrolment year
      lawyers.sort((a, b) => {
        const yearA = parseInt(a.Enrolment?.match(/\d{4}$/)?.[0] || 0);
        const yearB = parseInt(b.Enrolment?.match(/\d{4}$/)?.[0] || 0);
        return yearB - yearA; // New → Old
      });

      displayLawyers(lawyers);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      lawyerGrid.innerHTML = "<p style='text-align:center;'>Failed to load data.</p>";
    });

  // Function to display lawyers
  function displayLawyers(list) {
    lawyerGrid.innerHTML = '';
    if (list.length === 0) {
      lawyerGrid.innerHTML = '<p style="text-align:center; grid-column:1 / -1;">No results found.</p>';
      return;
    }

    list.forEach(lawyer => {
      const card = document.createElement('div');
      card.className = 'lawyer-card';
      card.innerHTML = `
        <img src="${lawyer.Image}" alt="${lawyer.Name}">
        <h3>${lawyer.Name}</h3>
        <span class="specialty-tag">${lawyer.Specialty}</span>
        <p class="enrolment">Enr No: ${lawyer.Enrolment}</p>
        <div class="contact-info">
          <p><i class="fa-solid fa-phone"></i> ${lawyer.Phone}</p>
          <p><i class="fa-solid fa-envelope"></i> ${lawyer.Email}</p>
          <p><i class="fa-solid fa-map-marker-alt"></i> ${lawyer.Address}</p>
        </div>`;
      lawyerGrid.appendChild(card);
    });
  }

  // Search filter with New → Old sorting
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filtered = lawyers.filter(l =>
      l.Name.toLowerCase().includes(searchTerm) ||
      l.Specialty.toLowerCase().includes(searchTerm) ||
      l.Enrolment.toLowerCase().includes(searchTerm)
    );

    // Sort filtered list New → Old
    filtered.sort((a, b) => {
      const yearA = parseInt(a.Enrolment?.match(/\d{4}$/)?.[0] || 0);
      const yearB = parseInt(b.Enrolment?.match(/\d{4}$/)?.[0] || 0);
      return yearB - yearA;
    });

    displayLawyers(filtered);
  });
});
