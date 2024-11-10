 let selectedSeats = [];

function openSeatModal() {
    document.getElementById('seatModal').style.display = "block";
    createSeatGrid();
}

function closeSeatModal() {
    document.getElementById('seatModal').style.display = "none";
}

function createSeatGrid() {
    const seatContainer = document.getElementById('seatSelection');
    seatContainer.innerHTML = '';  // Clear previous grid
    selectedSeats = [];  // Reset selected seats

    for (let i = 0; i < 100; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerText = i + 1;
        seat.addEventListener('click', function () {
            toggleSeatSelection(seat, i);
        });
        seatContainer.appendChild(seat);
    }
}

function toggleSeatSelection(seat, index) {
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seatIndex => seatIndex !== index);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(index);
    }

    const proceedButton = document.getElementById('proceedButton');
    if (selectedSeats.length > 0) {
        proceedButton.style.display = "block";
    } else {
        proceedButton.style.display = "none";
    }
}

function showBookingModal() {
    if (selectedSeats.length > 0) {
        const movieTitle = 'Alien Hand 3';
        const amount = selectedSeats.length * 150; // Price per seat: 150

        document.getElementById('movieTitleModal').innerText = `Movie: ${movieTitle}`;
        document.getElementById('amountModalDetails').innerText = `Total: ₹${amount}`;

        document.getElementById('seatModal').style.display = "none";
        document.getElementById('bookingModal').style.display = "block";
    }
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = "none";
}

function showQRCodeModal() {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const messageContainer = document.getElementById('qrMessageContainer'); // Create a container for the message

    // Updated UPI URL with the provided UPI ID
    const upiUrl = `upi://pay?pa=9160068402@ybl&pn=MerchantName&mc=0000&tid=123456789&txn=123456789&am=${selectedSeats.length * 150}&cu=INR&url=https://www.example.com`;

    qrCodeContainer.innerHTML = '';
    new QRCode(qrCodeContainer, upiUrl);

    // Add a professional message next to the QR code
    messageContainer.innerHTML = `
    `;

    document.getElementById('qrCodeModal').style.display = "block";
}

function closeQRCodeModal() {
    document.getElementById('qrCodeModal').style.display = "none";
}
