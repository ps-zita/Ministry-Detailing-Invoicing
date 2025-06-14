document.addEventListener("DOMContentLoaded", function() {
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const invoicePreview = document.getElementById("invoicePreview");
  
    // Check that required elements exist before attaching events.
    if (!generateBtn) {
      console.error('Element with id "generateBtn" not found.');
      return;
    }
    if (!downloadBtn) {
      console.error('Element with id "downloadBtn" not found.');
      return;
    }
    if (!invoicePreview) {
      console.error('Element with id "invoicePreview" not found.');
      return;
    }
  
    generateBtn.addEventListener("click", function() {
      // Get all form values
      const company = document.getElementById("company").value;
      const address = document.getElementById("address").value;
      const invoiceNumber = document.getElementById("invoiceNumber").value;
      const date = document.getElementById("date").value;
      const services = document.getElementById("services").value;
      const receiverName = document.getElementById("receiverName").value;
      const gst = document.getElementById("gst").value;
      const abn = document.getElementById("abn").value;
  
      // Generate invoice preview HTML with logo on the top right and details below
      const invoiceHTML = `
        <div class="invoice-header">
          <img src="log.png" alt="Logo" class="logo">
        </div>
        <div class="invoice-details">
          <div class="detail"><strong>Company:</strong> ${company}</div>
          <div class="detail"><strong>Address:</strong> ${address}</div>
          <div class="detail"><strong>Invoice Number:</strong> ${invoiceNumber}</div>
          <div class="detail"><strong>Date:</strong> ${date}</div>
          <div class="detail"><strong>Services:</strong> ${services}</div>
          <div class="detail"><strong>Receiver Name:</strong> ${receiverName}</div>
          <div class="detail"><strong>GST:</strong> ${gst}</div>
          <div class="detail"><strong>ABN:</strong> ${abn}</div>
        </div>
      `;
      invoicePreview.innerHTML = invoiceHTML;
      downloadBtn.style.display = "block";
    });
  
    // Download PDF using html2pdf.js once the invoice preview is generated.
    downloadBtn.addEventListener("click", function() {
      const element = document.getElementById("invoicePreview");
      const opt = {
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      };
  
      html2pdf().set(opt).from(element).save()
        .then(() => {
          console.log("PDF generated and download initiated.");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    });
  });