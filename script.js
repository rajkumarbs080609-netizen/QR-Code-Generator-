const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCodeBox = document.querySelector('.qr-code');
const downloadBtn = document.getElementById('download-btn');

let qrDataUrl = '';

function isValidUrl(value) {
    try {
        const normalizedValue = /^https?:\/\//i.test(value) ? value : `https://${value}`;
        const url = new URL(normalizedValue);
        const hostname = url.hostname.toLowerCase();
        const hasValidDomain = hostname.includes('.') || hostname === 'localhost';
        return ['http:', 'https:'].includes(url.protocol) && hasValidDomain && !!hostname;
    } catch (error) {
        return false;
    }
}

function generateQRCode(text) {
    const value = text.trim();

    if (!value) {
        alert('Enter a valid URL');
        qrCodeBox.innerHTML = '<p>Please enter text or a URL</p>';
        downloadBtn.disabled = true;
        qrDataUrl = '';
        return;
    }

    if (!isValidUrl(value)) {
        alert('Enter a valid URL');
        qrCodeBox.innerHTML = '<p>Please enter a valid URL</p>';
        downloadBtn.disabled = true;
        qrDataUrl = '';
        return;
    }

    const qr = qrcode(0, 'L');
    qr.addData(value);
    qr.make();

    const imageUrl = qr.createDataURL(8, 0);
    qrDataUrl = imageUrl;
    qrCodeBox.innerHTML = `<img src="${imageUrl}" alt="QR Code" />`;
    downloadBtn.disabled = false;
}

generateBtn.addEventListener('click', () => {
    generateQRCode(qrInput.value);
});

qrInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        generateQRCode(qrInput.value);
    }
});

downloadBtn.addEventListener('click', () => {
    if (!qrDataUrl) return;

    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

downloadBtn.disabled = true;