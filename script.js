document.addEventListener("DOMContentLoaded", function() {
    // Set the workerSrc for pdf.js to avoid deprecated API usage warning
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js";
  
    document.getElementById('generateBtn').addEventListener('click', function() {
      // Get invoice form values
      const invoiceNumber = document.getElementById('invoiceNumber').value;
      const customerName = document.getElementById('customerName').value;
      const amount = document.getElementById('amount').value;
  
      // Specify the PDF template file URL.
      // Make sure invoice_template.pdf is available in the same directory or adjust the path accordingly.
      const pdfUrl = 'invoice_template.pdf';
  
      // Load the PDF template using PDF.js
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      loadingTask.promise.then(function(pdf) {
          // Get the first page of the PDF template
          pdf.getPage(1).then(function(page) {
              const scale = 1.5;
              const viewport = page.getViewport({ scale: scale });
              const canvas = document.getElementById('pdfCanvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
  
              // Render the PDF page into the canvas context.
              const renderContext = {
                  canvasContext: context,
                  viewport: viewport
              };
              page.render(renderContext).promise.then(function() {
                  // After rendering the PDF template, overlay invoice text
                  context.font = "20px Arial";
                  context.fillStyle = "red";
  
                  // Example positions for overlay text; adjust as needed for your template
                  context.fillText("Invoice: " + invoiceNumber, 50, 100);
                  context.fillText("Customer: " + customerName, 50, 140);
                  context.fillText("Amount: $" + amount, 50, 180);
              });
          });
      }).catch(function (reason) {
          console.error("Error loading the PDF template: " + reason);
      });
    });
  });