document.addEventListener('DOMContentLoaded', () => {
    const index = new URLSearchParams(window.location.search).get('index');
    const students = JSON.parse(sessionStorage.getItem('studentsData')) || [];
    const student = students[index];


    document.getElementById("studentIndex").value = index;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("name").value = student.name || '';
    document.getElementById("course").value = student.course || '';
    document.getElementById("street").value = student.personalInfo.address.street || '';
    document.getElementById("city").value = student.personalInfo.address.city || '';
    document.getElementById("country").value = student.personalInfo.address.country || '';
    document.getElementById("pincode").value = student.personalInfo.address.pincode || '';

    const teachersContainer = document.getElementById("teachers-container");
    teachersContainer.innerHTML = "";
    student.subjects.forEach((sub, i) => {
        const div = document.createElement("div");
        div.classList.add("dynamic-section");
        div.innerHTML = `
                    <h2>Subject: ${sub.subName}</h2>
                    <div class="edit-field">
                    <label for="teacher-${i}">Teacher Name</label>
                    <input type="text" id="teacher-${i}" value="${sub.teacher.name || ''}">
                    <div class="error-message" id="teacher-name-error-${i}"></div>
                    </div>
                    <div class="edit-field">
                    <label for="email-${i}">Teacher Email</label>
                    <input type="email" id="email-${i}" value="${sub.teacher.contactInfo.email || ''}">
                    <div class="error-message" id="teacher-email-error-${i}"></div>
                    </div>
                `;
        teachersContainer.appendChild(div);
    });

    const scoresContainer = document.getElementById("scores-container");
    scoresContainer.innerHTML = "";
    student.result.forEach((res, i) => {
        const div = document.createElement("div");
        div.classList.add("dynamic-section");
        div.innerHTML = `
            <h3>Subject: ${res.subject}</h3>
            <div class="edit-field">
              <label for="score-${i}">Score</label>
              <input type="number" id="score-${i}" value="${res.score}" data-subject="${res.subject}">
              <div class="error-message" id="score-error-${i}"></div>
            </div>
        `;
        scoresContainer.appendChild(div);
    });

    document.getElementById("edit-form").addEventListener("submit", e => {
        e.preventDefault();

        if (validateForm()) {
            student.name = document.getElementById("name").value;
            student.course = document.getElementById("course").value;
            student.personalInfo.address.street = document.getElementById("street").value;
            student.personalInfo.address.city = document.getElementById("city").value;
            student.personalInfo.address.country = document.getElementById("country").value;
            student.personalInfo.address.pincode = document.getElementById("pincode").value;

            student.subjects.forEach((sub, i) => {
                sub.teacher.name = document.getElementById(`teacher-${i}`).value;
                sub.teacher.contactInfo.email = document.getElementById(`email-${i}`).value;
            });

            student.result.forEach((res, i) => {
                const scoreInput = document.getElementById(`score-${i}`);
                res.score = parseFloat(scoreInput.value);
            });

            students[index] = student;
            sessionStorage.setItem('studentsData', JSON.stringify(students));
            alert("Student information updated successfully!");
            window.location.href = 'index.html';
        }
    });

    function validateForm() {
        let isValid = true;
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

        const name = document.getElementById("name").value.trim();
        if (name === '') {
            document.getElementById("name-error").textContent = "Name is required.";
            document.getElementById("name-error").style.display = 'block';
            isValid = false;
        }

        const course = document.getElementById("course").value.trim();
        if (course === '') {
            document.getElementById("course-error").textContent = "Course is required.";
            document.getElementById("course-error").style.display = 'block';
            isValid = false;
        }

        const street = document.getElementById("street").value.trim();
        if (street === '') {
            document.getElementById("street-error").textContent = "Street is required.";
            document.getElementById("street-error").style.display = 'block';
            isValid = false;
        }

        const city = document.getElementById("city").value.trim();
        if (city === '') {
            document.getElementById("city-error").textContent = "City is required.";
            document.getElementById("city-error").style.display = 'block';
            isValid = false;
        }

        const country = document.getElementById("country").value.trim();
        if (country === '') {
            document.getElementById("country-error").textContent = "Country is required.";
            document.getElementById("country-error").style.display = 'block';
            isValid = false;
        }

        const pincode = document.getElementById("pincode").value.trim();
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(pincode)) {
            document.getElementById("pincode-error").textContent = "Pincode must be a 6-digit number.";
            document.getElementById("pincode-error").style.display = 'block';
            isValid = false;
        }

        student.subjects.forEach((sub, i) => {
            const teacherName = document.getElementById(`teacher-${i}`).value.trim();
            if (teacherName === '') {
                document.getElementById(`teacher-name-error-${i}`).textContent = "Teacher name is required.";
                document.getElementById(`teacher-name-error-${i}`).style.display = 'block';
                isValid = false;
            }

            const teacherEmail = document.getElementById(`email-${i}`).value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(teacherEmail)) {
                document.getElementById(`teacher-email-error-${i}`).textContent = "Invalid email format.";
                document.getElementById(`teacher-email-error-${i}`).style.display = 'block';
                isValid = false;
            }
        });

        student.result.forEach((res, i) => {
            const scoreInput = document.getElementById(`score-${i}`);
            const score = parseFloat(scoreInput.value);

            if (isNaN(score) || score < 0 || score > 100) {
                document.getElementById(`score-error-${i}`).textContent = "Score must be a number between 0 and 100.";
                document.getElementById(`score-error-${i}`).style.display = 'block';
                isValid = false;
            }
        });

        return isValid;
    }
});