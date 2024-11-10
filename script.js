// Track selected seats and booked seats
let selectedSeats = [];
let bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || []; // Retrieve booked seats from localStorage

// Function to create seat grid
function createSeatGrid() {
    const seatContainer = document.getElementById('seatSelection');
    seatContainer.innerHTML = ''; // Clear previous grid
    selectedSeats = []; // Reset selected seats

    // Generate 100 seats
    for (let i = 0; i < 100; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.innerText = i + 1;

        // Disable booked seats
        if (bookedSeats.includes(i)) {
            seat.classList.add('booked');
            seat.innerText = "Booked";
        } else {
            seat.addEventListener('click', function () {
                toggleSeatSelection(seat, i);
            });
        }

        seatContainer.appendChild(seat);
    }
}

// Toggle seat selection
function toggleSeatSelection(seat, index) {
    if (seat.classList.contains('selected')) {
        seat.classList.remove('selected');
        selectedSeats = selectedSeats.filter(seatIndex => seatIndex !== index);
    } else {
        seat.classList.add('selected');
        selectedSeats.push(index);
    }

    // Show the proceed button if any seat is selected
    const proceedButton = document.getElementById('proceedButton');
    proceedButton.style.display = selectedSeats.length > 0 ? "block" : "none";
}

// Open seat selection modal
function openSeatModal() {
    createSeatGrid(); // Refresh grid when opening
    document.getElementById('seatModal').style.display = "block";
}

// Close seat selection modal
function closeSeatModal() {
    document.getElementById('seatModal').style.display = "none";
}

// Show booking modal
function showBookingModal() {
    closeSeatModal();
    document.getElementById('movieTitleModal').innerText = "Alien Hand 3";
    document.getElementById('amountModalDetails').innerText = `Amount: ₹${selectedSeats.length * 120}`;
    document.getElementById('bookingModal').style.display = "block";
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = "none";
}

// Show QR Code Modal for payment
function showQRCodeModal() {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const messageContainer = document.getElementById('qrMessageContainer');
    
    const upiUrl = `upi://pay?pa=9160068402@ybl&pn=AlienHand3&am=${selectedSeats.length * 120}&cu=INR`;

    qrCodeContainer.innerHTML = '';
    new QRCode(qrCodeContainer, upiUrl);

    messageContainer.innerHTML = `    
        <p>Scan to pay ₹${selectedSeats.length * 120}. After payment, copy your transaction ID and paste below:  </p>
        <input type="text" id="transactionIdInput" placeholder="Enter Transaction ID">
        <button onclick="confirmPayment()">Submit Transaction ID</button>
    `;

    document.getElementById('qrCodeModal').style.display = "block";
}

// Close QR code modal
function closeQRCodeModal() {
    document.getElementById('qrCodeModal').style.display = "none";
}

// Confirm payment by checking transaction ID and generating a ticket
function confirmPayment() {
    const transactionId = document.getElementById('transactionIdInput').value;

    if (transactionId) {
        // Add selected seats to booked seats
        bookedSeats = [...bookedSeats, ...selectedSeats];
        
        // Save booked seats to localStorage
        localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));

        // Generate PDF Ticket
        generatePDF(transactionId);

        // Reset selected seats after booking
        selectedSeats = [];
        closeQRCodeModal();
    } else {
        alert("Please enter a valid transaction ID.");
    }
}

// Generate PDF Ticket with booking details
function generatePDF(transactionId) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const imageUrl = 'https://i.postimg.cc/BnqffJgr/1685668637841.png';
    doc.addImage(imageUrl, 'PNG', 30, 70, 180, 180);

    const movieTitle = "Alien Hand 3";
    const seatNumbers = selectedSeats.map(seat => seat + 1).join(", ");
    const amount = selectedSeats.length * 120;

    doc.setFontSize(12);
    doc.text('Thank you for booking your ticket with us!', 10, 50);

    // Add instructions
    doc.text('Please make sure to keep your ticket safe. Your seat(s) are confirmed after payment.', 10, 60);
    doc.text('Instructions: Show this ticket at the cinema for entry.', 10, 70);

    doc.text(`Movie: ${movieTitle}`, 10, 10);
    doc.text(`Seats: ${seatNumbers}`, 10, 20);
    doc.text(`Transaction ID: ${transactionId}`, 10, 30);
    doc.text(`Amount: ₹${amount}`, 10, 40);

    // Get the current date and time
    const currentDate = new Date();
    
    // Format the date and time (you can adjust this format as needed)
    const formattedDate = currentDate.toLocaleString(); // Default format: "MM/DD/YYYY, HH:MM:SS AM/PM"

    // Add the current date and time of the booking
    doc.text('Booking Date and Time: ' + formattedDate, 10, 90);

    doc.save(`Ticket_${transactionId}.pdf`);
}

// Function to close QR Code Modal after ticket generation
function closeQRCodeModal() {
    document.getElementById('qrCodeModal').style.display = "none";
}
