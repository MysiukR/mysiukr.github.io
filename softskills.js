
        let breathLevel = 0;
        function checkAnswer(button, isCorrect) {
            if (button.disabled) return;
            button.disabled = true;

            let progress = document.getElementById("progress");
            let medal = document.getElementById("medal");
            if (isCorrect) {
                breathLevel = Math.min(100, breathLevel + 20);
            } else {
                breathLevel = Math.max(0, breathLevel - 10);
            }
            progress.style.width = breathLevel + "%";
            if (breathLevel === 100) {
                medal.style.display = "block";
            } else {
                medal.style.display = "none";
            }
        }

        function insertPhrase() {
            let phrase = document.getElementById("phraseSelect").value;
            let emailEditor = document.getElementById("emailEditor");
            emailEditor.value += "\n" + phrase;
        }

        // Function to update the email body with the recipient's name
        function updateEmailBody() {
            let recipient = document.getElementById("recipient").value;
            let emailEditor = document.getElementById("emailEditor");
            
            // Заміна всіх випадків "[Ім'я]" на введене значення
            let updatedEmail = emailEditor.value.replace(/\[Ім'я\]/g, recipient); // Заміна всіх випадків
            emailEditor.value = updatedEmail;
        }

        function checkEmail() {
            let sender = document.getElementById("sender").value;
            let recipient = document.getElementById("recipient").value;
            let subject = document.getElementById("subject").value;
            let cc = document.getElementById("cc").value;
            let bcc = document.getElementById("bcc").value;
            let emailContent = document.getElementById("emailEditor").value;
            let alertBox = document.getElementById("emailAlert");

            // Validate the email fields
            let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!recipient || !emailRegex.test(recipient)) {
                alertBox.innerHTML = "Будь ласка, введіть коректну адресу одержувача.";
                return;
            }
            if (cc && !emailRegex.test(cc)) {
                alertBox.innerHTML = "Будь ласка, введіть коректну адресу в CC.";
                return;
            }
            if (bcc && !emailRegex.test(bcc)) {
                alertBox.innerHTML = "Будь ласка, введіть коректну адресу в BCC.";
                return;
            }

            // Check if all required fields are filled
            if (!sender || !subject || emailContent.trim() === "") {
                alertBox.innerHTML = "Будь ласка, заповніть всі обов'язкові поля.";
            } else {
                alertBox.innerHTML = "Лист складено коректно!";
                alertBox.style.color = "green";
            }
        }