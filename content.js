function analyzeEmail() {
const attachments = document.querySelectorAll("div[aria-label*='Attachment'], span[download]");

attachments.forEach(file => {
    const filename = file.innerText.toLowerCase();

    if (filename.includes(".exe") ||
        filename.includes(".zip") ||
        filename.includes(".scr") ||
        filename.includes(".bat") ||
        filename.includes(".js")) {
        score += 30;
        reasons.push("Suspicious attachment: " + filename);
    }
});


    const emailBody = document.querySelector("div[role='main']");
    if (!emailBody) return;

    const text = emailBody.innerText.toLowerCase();
    let score = 0;
    let reasons = [];

    const keywords = [

    "registration fee",
    "processing fee",
    "security deposit",
    "refundable amount",
    "payment required",
    "transaction fee",
    "training fee",
    "onboarding fee",
    "service charge",
    "transfer the amount",
    "make the payment",
    "payment confirmation",
    "wire transfer",
    "upi payment",
    "bank transfer",
    "crypto payment",
    "bitcoin",
    "send money",

    "urgent",
    "within 24 hours",
    "immediate joining",
    "act immediately",
    "limited seats",
    "last date today",
    "offer expires soon",
    "final reminder",
    "as soon as possible",
    "deadline approaching",

    "no interview required",
    "interview waived",
    "guaranteed job",
    "100% placement",
    "instant selection",
    "confirmed offer",
    "direct joining",
    "high salary package",
    "work from home earn",
    "easy income",
    "no experience required",

    "send otp",
    "share your otp",
    "verify your account",
    "confirm your details",
    "update your kyc",
    "submit documents urgently",
    "provide aadhar",
    "provide pan card",
    "submit bank details",
    "login credentials",

    "hr department",
    "recruitment team",
    "offer letter attached",
    "appointment letter",
    "document verification",
    "background check",
    "company registration process",
    "mandatory registration",
    "company policy requires payment",

    "international hiring",
    "global recruitment",
    "overseas placement",
    "visa processing fee",
    "relocation assistance with fee",
    "foreign job opportunity",
    "direct company payroll"
];


    keywords.forEach(word => {
        if (text.includes(word)) {
            score += 10;
            reasons.push("Detected: " + word);
        }
    });

    if (text.includes("₹") || text.includes("$")) {
        score += 15;
        reasons.push("Money related content detected");
    }

    if (score > 100) {
    score = 100;
}

    displayResult(score, reasons);
}

function displayResult(score, reasons) {
    let riskBox = document.getElementById("jobshield-box");

    if (!riskBox) {
        riskBox = document.createElement("div");
        riskBox.id = "jobshield-box";
        riskBox.style.position = "fixed";
        riskBox.style.top = "20px";
        riskBox.style.right = "20px";
        riskBox.style.padding = "15px";
        riskBox.style.borderRadius = "8px";
        riskBox.style.fontSize = "14px";
        riskBox.style.fontWeight = "bold";
        riskBox.style.zIndex = "9999";
        document.body.appendChild(riskBox);
    }

    riskBox.style.backgroundColor =
        score > 40 ? "red" :
        score > 20 ? "orange" :
        "green";

    riskBox.style.color = "white";

    riskBox.innerHTML = `
        JobShield AI<br>
        Risk Score: ${score}%<br>
        ${score > 40 ? "HIGH RISK" : score > 20 ? "MEDIUM RISK" : "LOW RISK"}
    `;
}

let timeout;

const observer = new MutationObserver(() => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        analyzeEmail();
    }, 1000); // wait 1 second 
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
