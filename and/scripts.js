const pdfInput = document.getElementById('pdfInput');
const uploadSection = document.getElementById('uploadSection');
const loadingScreen = document.getElementById('loadingScreen');
const preprocessBar = document.getElementById('preprocessBar');
const progress = document.getElementById('progress');
const outputSuccess = document.getElementById('outputSuccess');
const errorScreen = document.getElementById('errorScreen');

// Handle PDF upload
pdfInput.addEventListener('change', function () {
  const file = pdfInput.files[0];
  if (file) {
    uploadSection.style.display = 'none';
    loadingScreen.classList.add('show');
    
    // Call backend to process the PDF
    const formData = new FormData();
    formData.append("pdf", file);
    
    fetch('/process_pdf', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      loadingScreen.classList.remove('show');
      if (data.success) {
        preprocessBar.classList.add('show');
        preprocessData();
      } else {
        showError();
      }
    })
    .catch(err => {
      showError();
    });
  }
});

// Simulate preprocessing progress
function preprocessData() {
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      preprocessBar.classList.remove('show');
      outputSuccess.classList.add('show');
    } else {
      width += 10;
      progress.style.width = width + '%';
    }
  }, 500);
}

function showError() {
  loadingScreen.classList.remove('show');
  errorScreen.classList.add('show');
}
