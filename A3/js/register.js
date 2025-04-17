const captchaTextEl = document.getElementById("captchaText");
const captchaInput = document.getElementById("captchaInput");
const registerForm = document.getElementById("registerForm");
const refreshBtn = document.getElementById("refreshCaptcha");

function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    captchaTextEl.textContent = captcha;
}

generateCaptcha();

refreshBtn.addEventListener("click", generateCaptcha);

registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("regPass").value;
    const confirm = document.getElementById("regConfirm").value;

    if (password !== confirm) {
        alert("Passwords do not match!");
        return;
    }

    if (captchaInput.value.trim().toUpperCase() !== captchaTextEl.textContent.trim().toUpperCase()) {
        alert("Incorrect CAPTCHA!");
        generateCaptcha();
        captchaInput.value = "";
        return;
    }

    alert("Registration successful!");
    window.location.href = "login.html"; // Redirect to login page
});
