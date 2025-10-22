document.addEventListener('DOMContentLoaded', () => {
  const lawyerGrid = document.getElementById('lawyer-grid');
  const searchInput = document.getElementById('searchInput');
  let lawyers = [];

  
  fetch("https://script.google.com/macros/s/AKfycbz4oUPsn1gp6yJ0VIfL9slR2bgewTtuC_0PnXJyTfKd_1UT0CN5-9rYiX5zqsR3T9g/exec") // <-- paste your own Web App URL here
    .then(res => res.json())
    .then(data => {
      lawyers = data;
      displayLawyers(lawyers);
    })
    .catch(err => {
      console.error("Error fetching data:", err);
      lawyerGrid.innerHTML = "<p style='text-align:center;'>Failed to load data.</p>";
    });

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

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filtered = lawyers.filter(l =>
      l.Name.toLowerCase().includes(searchTerm) ||
      l.Specialty.toLowerCase().includes(searchTerm) ||
      l.Enrolment.toLowerCase().includes(searchTerm)
    );
    displayLawyers(filtered);
  });
});
