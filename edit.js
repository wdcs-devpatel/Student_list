document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const Editing = index !== null;
    const students = JSON.parse(sessionStorage.getItem('studentsData')) || [];
    let student = Editing ? students[index] : null;

    const otpSection = document.getElementById("otp-section");
    const studentFormSection = document.getElementById("student-form-section");
    const verifyBtn = document.getElementById("verify-btn");
    const otpInput = document.getElementById("otp-input");
    const otpError = document.getElementById("otp-error");

    let generatedOTP = generateOTP();

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    if (Editing) {
        alert("Your OTP is: " + generatedOTP); 
         function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
      
    }
    //hello
        
        
        otpSection.style.display = "block";
        studentFormSection.style.display = "none";

        verifyBtn.onclick = () => {
            const enteredOTP = otpInput.value.trim();

            if (enteredOTP === generatedOTP) {
                otpSection.style.display = "none";
                studentFormSection.style.display = "block";
                loadStudentData();
            } else {
                
                otpInput.value = ""; 

                
                otpError.innerText = "Invalid OTP. Try again after 5 minutes.";
                otpError.style.display = "block";

                otpInput.disabled = true;
                verifyBtn.disabled = true;

                setTimeout(() => {
                    generatedOTP = generateOTP();
                   
                    alert("New OTP: " + generatedOTP);

                    otpInput.disabled = false;
                    verifyBtn.disabled = false;
                    otpError.style.display = "none";
                }, 300000);
            }
        };
    }
    else {
        otpSection.style.display = "none";
        studentFormSection.style.display = "block";
        loadStudentData();
    }

    function loadStudentData() {
        if (student) {
            document.getElementById("studentIndex").value = index;
            document.getElementById("studentId").value = student.studentId;
            document.getElementById("studentId").readOnly = true;
            document.getElementById("name").value = student.name || '';
            document.getElementById("street").value = student.personalInfo.address.street || '';
            document.getElementById("course").value = student.course || '';
            document.getElementById("city").value = student.personalInfo.address.city || '';
            document.getElementById("country").value = student.personalInfo.address.country || '';
            document.getElementById("pincode").value = student.personalInfo.address.pincode || '';

            const teachersContainer = document.getElementById("teachers-container");
            teachersContainer.innerHTML = "";
            student.subjects.forEach((sub, i) => {
                const div = document.createElement("div");
                div.classList.add("dynamic-section");
                div.innerHTML = `
                    <h2>Subject: <input type="text" value="${sub.subName}" readonly></h2>
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
            let totalScore = 0;

            if (student.result.length) {
                student.result.forEach((res, i) => {
                    totalScore += res.score;
                    const div = document.createElement("div");
                    div.classList.add("dynamic-section");
                    div.innerHTML = `
                        <h3>${res.subject} Marks</h3>
                        <div class="edit-field">
                            <label for="score-${i}">${res.subject} Score</label>
                            <input type="number" id="score-${i}" value="${res.score}" data-subject="${res.subject}">
                            <div class="error-message" id="score-error-${i}"></div>
                        </div>
                    `;
                    scoresContainer.appendChild(div);
                });

                const average = (totalScore / student.result.length).toFixed(2);
                const grade = Grade(average);

                const avgDiv = document.createElement("div");
                avgDiv.classList.add("edit-field");
                avgDiv.innerHTML = `
                    <label for="average-grade">Average Grade</label>
                    <input type="text" id="average-grade" value="${average} (${grade})" readonly>
                `;
                scoresContainer.appendChild(avgDiv);
            }
        } else {
            document.getElementById("studentId").value = students.length ? (Math.max(...students.map(s => s.studentId)) + 1) : 1;
            document.getElementById("studentId").readOnly = false;

            const teachersContainer = document.getElementById("teachers-container");
            teachersContainer.innerHTML = `
                <div class="dynamic-section">
                    <h2>Subject: <input type="text" id="subject-0" value=""></h2>
                    <div class="edit-field">
                        <label for="teacher-0">Teacher Name</label>
                        <input type="text" id="teacher-0">
                        <div class="error-message" id="teacher-name-error-0"></div>
                    </div>
                    <div class="edit-field">
                        <label for="email-0">Teacher Email</label>
                        <input type="email" id="email-0">
                        <div class="error-message" id="teacher-email-error-0"></div>
                    </div>
                </div>
            `;

            const scoresContainer = document.getElementById("scores-container");
            scoresContainer.innerHTML = `
                <div class="dynamic-section">
                    <h3>Math Marks</h3>
                    <div class="edit-field">
                        <label for="score-0">Math Score</label>
                        <input type="number" id="score-0">
                        <div class="error-message" id="score-error-0"></div>
                    </div>
                </div>
                <div class="dynamic-section">
                    <h3>Science Marks</h3>
                    <div class="edit-field">
                        <label for="score-1">Science Score</label>
                        <input type="number" id="score-1">
                        <div class="error-message" id="score-error-1"></div>
                    </div>
                </div>
                <div class="dynamic-section">
                    <h3>English Marks</h3>
                    <div class="edit-field">
                        <label for="score-2">English Score</label>
                        <input type="number" id="score-2">
                        <div class="error-message" id="score-error-2"></div>
                    </div>
                </div>
            `;
        }

        document.getElementById("edit-form").addEventListener("submit", e => {
            e.preventDefault();

            if (validateForm()) {
                if (student) {
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
                        res.score = parseFloat(scoreInput.value) || 0;
                    });

                    students[index] = student;
                } else {
                    const newStudent = {
                        studentId: parseInt(document.getElementById("studentId").value),
                        name: document.getElementById("name").value,
                        course: document.getElementById("course").value,
                        personalInfo: {
                            address: {
                                street: document.getElementById("street").value,
                                city: document.getElementById("city").value,
                                country: document.getElementById("country").value,
                                pincode: document.getElementById("pincode").value
                            }
                        },
                        subjects: [
                            { subName: document.getElementById("subject-0").value, teacher: { name: document.getElementById("teacher-0").value, contactInfo: { email: document.getElementById("email-0").value } } }
                        ],
                        result: [
                            { subject: "Math", score: parseFloat(document.getElementById("score-0").value) || 0 },
                            { subject: "Science", score: parseFloat(document.getElementById("score-1").value) || 0 },
                            { subject: "English", score: parseFloat(document.getElementById("score-2").value) || 0 }
                        ]
                    };
                    students.push(newStudent);
                }

                sessionStorage.setItem('studentsData', JSON.stringify(students));
                window.location.href = 'index.html';
            }
        });

        function Grade(avg) {
            const score = parseFloat(avg);
            if (score >= 90) return "A";
            if (score >= 80) return "B";
            if (score >= 70) return "C";
            if (score >= 60) return "D";
            return "F";
        }

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

            return isValid;
        }
    }
});