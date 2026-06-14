alert("Welcome to HariyaliMitra 🌱");
 
function searchCrop() {
    let input = document.getElementById("searchInput");
    if (!input) return;
    let search = input.value.toLowerCase();
    if (search === "wheat" || search === "gehu") {
        window.location.href = "wheat.html";
    } else if (search === "rice" || search === "chawal") {
        window.location.href = "rice.html";
    } else if (search === "rose" || search === "gulab") {
        window.location.href = "rose.html";
    } else if (search === "jasmine") {
        window.location.href = "jasmine.html";
    } else if (search === "mustard" || search === "sarso") {
        window.location.href = "mustard.html";
    } else if (search === "sugarcane") {
        window.location.href = "sugarcane.html";
    } else if (search === "marigold") {
        window.location.href = "marigold.html";
    } else if (search === "lily") {
        window.location.href = "lily.html";
    } else {
        alert("Not found");
    }
}
 
if (document.getElementById("searchInput")) {
    document.getElementById("searchInput")
        .addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                searchCrop();
            }
        });
}
 
function calculateYield() {
    let acre = Number(document.getElementById("acre").value);
    let yieldPerAcre = Number(document.getElementById("yield").value);
    let total = acre * yieldPerAcre;
    if (document.getElementById("result")) {
        document.getElementById("result").innerText = total + " Quintals";
    }
}
 
function calculateWater() {
    let area = Number(document.getElementById("fieldArea").value);
    let water = Number(document.getElementById("waterPerAcre").value);
    let total = area * water;
    document.getElementById("waterResult").innerText = total + " Liters Required";
}
 
function calculateFertilizer() {
    let area = Number(document.getElementById("fertArea").value);
    let fertilizer = Number(document.getElementById("fertPerAcre").value);
    let total = area * fertilizer;
    document.getElementById("fertResult").innerText = total + " Kg Fertilizer Required";
}
 
function sendMessage() {
    let name = document.getElementById("name").value;
    if (name === "") {
        alert("Please enter your name");
        return;
    }
    document.getElementById("contactResult").innerText =
        "Thank you " + name + "! Your message has been received.";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}
 
function subscribeUser() {
    let phone = document.getElementById("phoneNumber").value;
    if (phone === "") {
        alert("Please enter your phone number");
        return;
    }
    document.getElementById("subscribeResult").innerText = "✅ Thank you for subscribing!";
    document.getElementById("phoneNumber").value = "";
}
 
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
 
async function generateOTP() {
    let email = document.getElementById("email").value;
    if (!email) {
        alert("Please enter email");
        return;
    }
const { error } = await supabaseClient.auth.signInWithOtp({
    email: email,
    options: {
        shouldCreateUser: true
    }
});
    if (error) {
        document.getElementById("otpDisplay").innerText = "❌ OTP Failed: " + error.message;
    } else {
        document.getElementById("otpDisplay").innerText = "✅ OTP Sent to your email!";
    }
}
 
async function verifyOTP() {
    let email = document.getElementById("email").value;
    let otp = document.getElementById("userOTP").value;

    const { data, error } = await supabaseClient.auth.verifyOtp({
        email: email,
        token: otp,
        type: 'magiclink'
    });

    if (error) {
        document.getElementById("loginResult").innerText = "❌ Invalid OTP";
        return;
    }

    let userResponse = await fetch("/check-user?email=" + email);
    let userResult = await userResponse.json();

    if (userResult.status === "FOUND") {
        localStorage.setItem("fullname", userResult.fullname);
        localStorage.setItem("email", userResult.email);
        document.getElementById("loginResult").innerText = "✅ Login Successful";
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);
    } else {
        document.getElementById("loginResult").innerText = "❌ Account Not Found";
    }
}
 
async function registerUser() {
    let fullname = document.getElementById("name").value;
    let email = document.getElementById("email").value;
 
    let response = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: fullname, email: email })
    });
 
    let result = await response.text();
    document.getElementById("registerResult").innerText = result;
}
 function startVoiceSearch() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Voice search is not supported in this browser. Try Chrome.");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.interimResults = false;

    recognition.onstart = function () {
        document.getElementById("voiceBtn").innerText = "🎙️ Listening...";
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("searchInput").value = transcript;
        document.getElementById("voiceBtn").innerText = "🎤";
        searchCrop();
    };

    recognition.onerror = function () {
        document.getElementById("voiceBtn").innerText = "🎤";
        alert("Could not hear you, try again.");
    };

    recognition.onend = function () {
        document.getElementById("voiceBtn").innerText = "🎤";
    };

    recognition.start();
}