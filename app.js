let selectedMovie = "";
let selectedSeats = [];
let ticketPrice = 200; // Default price for each seat

// Select Movie Function
function selectMovie(movieName) {
    selectedMovie = movieName;
    showSeatSelection();
}

// Display Seat Selection Modal
function showSeatSelection() {
    let seatContainer = document.getElementById("seatSelection");
    seatContainer.innerHTML = ""; // Reset seat container

    // Create seat grid
    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        seat.textContent = "Seat " + i;
        seat.onclick = () => toggleSeat(i);
        seatContainer.appendChild(seat);
    }

    // Show seat selection modal
    document.getElementById("seatModal").style.display = "block";
}

// Toggle Seat Selection
function toggleSeat(seatNumber) {
    const seatElement = document.querySelector(`.seat:nth-child(${seatNumber})`);
    if (selectedSeats.includes(seatNumber)) {
        selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
        seatElement.classList.remove("selected");
    } else {
        selectedSeats.push(seatNumber);
        seatElement.classList.add("selected");
    }
    updateAmount();
}

// Update Amount
function updateAmount() {
    document.getElementById("amountModalDetails").innerText = `Amount: ₹${selectedSeats.length * ticketPrice}`;
}

// Close Seat Selection Modal
function closeSeatModal() {
    document.getElementById("seatModal").style.display = "none";
}

// Show Booking Modal
function showBookingModal() {
    document.getElementById("seatModal").style.display = "none";
    document.getElementById("bookingModal").style.display = "block";
    document.getElementById("movieTitleModal").innerText = selectedMovie;
    updateAmount();
}

// Close Booking Modal
function closeBookingModal() {
    document.getElementById("bookingModal").style.display = "none";
}

// Show QR Code Modal
function showQRCodeModal() {
    generateQRCode();
    document.getElementById("bookingModal").style.display = "none";
    document.getElementById("qrCodeModal").style.display = "block";
}

// Generate QR Code
function generateQRCode() {
    const qrData = `Movie: ${selectedMovie}\nSeats: ${selectedSeats.join(", ")}\nAmount: ₹${selectedSeats.length * ticketPrice}`;
    QRCode.toCanvas(document.getElementById("paymentQRCode"), qrData, function (error) {
        if (error) console.error(error);
    });
}

// Close QR Code Modal
function closeQRCodeModal() {
    document.getElementById("qrCodeModal").style.display = "none";
}
