
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

        function insertPhraseEmail() {
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

        //scroll on logo
        document.getElementById("logo").addEventListener("click", function () {
            window.scrollTo({
              top: 0,
              behavior: "smooth"
            });
          });

                // Збираємо вибір навичок зірочками
        document.querySelectorAll('.stars .star').forEach(star => {
            star.addEventListener('click', function() {
                let value = this.getAttribute('data-value');
                this.parentNode.querySelectorAll('.star').forEach(star => {
                    star.classList.remove('selected');
                });
                for (let i = 0; i < value; i++) {
                    this.parentNode.children[i].classList.add('selected');
                }
            });
        });

        // Функція для генерації резюме
        function generateCV() {
            // Отримуємо значення введених даних
            const name = document.getElementById('name').value;
            const profession = document.getElementById('profession').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const university = document.getElementById('university').value;
            const degree = document.getElementById('degree').value;
            const previousJob = document.getElementById('previousJob').value;

            const technicalSkills = document.querySelectorAll('#skills .star.selected').length;
            const softSkills = document.querySelectorAll('#softSkills .star.selected').length;

            // Відображаємо ці дані в шаблоні резюме
            document.getElementById('cvName').textContent = name;
            document.getElementById('cvProfession').textContent = profession;
            document.getElementById('cvPhone').textContent = phone;
            document.getElementById('cvEmail').textContent = email;
            document.getElementById('cvUniversity').textContent = university;
            document.getElementById('cvDegree').textContent = degree;
            document.getElementById('cvPreviousJob').textContent = previousJob;
            document.getElementById('cvSkills').textContent = `Технічні навички: ${technicalSkills} з 5`;
            document.getElementById('cvSoftSkills').textContent = `М'які навички: ${softSkills} з 5`;

            // Приховуємо форму і показуємо шаблон резюме
            //document.getElementById('cvTemplate').style.display = 'flex';
            //document.getElementById('cvForm').style.display = 'none';
        }

      
