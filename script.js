const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const save = document.getElementById("save");
// Button submit
const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    // Validate url
    if (url === "") {
        alert("Please enter a URL");
    } else {
        showSpinner();
        // Show spinner for 1 sec
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            showScanner();
        }, 1000);
    }
};

// Generate QR code
const generateQRCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });
};

// Clear QR code and save button
const clearUI = () => {
    qr.innerHTML = "";
    const saveBtn = document.getElementById("save-link");
    if (saveBtn) {
        saveBtn.remove();
    }
};

// hide  scanner
const showScanner = () => {
    const scanner = document.getElementById("qrcode");
    scanner.style.display = "block";
};

// Show spinner
const showSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
};

const onSaveSubmit = (e) => {
    e.preventDefault();

    const saveUrl = qr.querySelector("canvas").toDataURL();
    downloadQRCode(saveUrl, "qrcode.png");
};

// Function to download the QR code image
const downloadQRCode = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ... (Existing code)

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
save.addEventListener("click", onSaveSubmit);