
function analyzeEmail() {
    chrome.tabs.sendMessage(tabs[0].id, { action: "scanEmail" });


attachments.forEach(file => {
    const filename = file.innerText.toLowerCase();

    if (filename.includes(".exe") ||
        filename.includes(".zip") ||
        filename.includes(".scr") ||
        filename.includes(".bat") ||
        filename.includes(".js")) {
        
        let score = response.score;
        let reasons = response.reasons;
    }
});


    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "scanEmail" }, function (response) {

            if (!response) {
                document.getElementById("riskLevel").innerText = "Open a Gmail email to scan.";
                return;
            }
            score += 30;
            reasons.push("Suspicious attachment: " + filename);
            

            let percentage = Math.min(score * 15, 100);
            document.getElementById("riskScore").innerText = percentage;

            let riskBox = document.getElementById("riskLevel");

            if (percentage >= 70) {
                riskBox.innerText = "⚠️ HIGH RISK - Likely Job Scam";
                riskBox.style.backgroundColor = "red";
            } else if (percentage >= 40) {
                riskBox.innerText = "⚠️ MEDIUM RISK - Suspicious Email";
                riskBox.style.backgroundColor = "orange";
            } else {
                riskBox.innerText = "✅ LOW RISK - Seems Safe";
                riskBox.style.backgroundColor = "green";
            }

            scanBtn.addEventListener("click", async () => {
                setStatus("Checking email...");
                const emailText = await getCurrentEmailText();
                const score = analyzeEmail(emailText);
                updateUI(score);
            });

            
            let reasonsList = document.getElementById("reasonsList");
            reasonsList.innerHTML = "";

            reasons.forEach(reason => {
                let li = document.createElement("li");
                li.innerText = reason;
                reasonsList.appendChild(li);
            });
        });
    });
}
