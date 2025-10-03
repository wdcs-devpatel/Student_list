    document.addEventListener('DOMContentLoaded', () => {
        let students = JSON.parse(sessionStorage.getItem('studentsData')) || [
            {
                studentId: 1,
                name: "John",
                course: "BTech",
                subjects: [
                    { subName: "Math", teacher: { name: "Dev Patel", contactInfo: { email: "dev@gmail.com", address: "123 School Road", mobile: "9638960495" } } }
                ],
                result: [
                    { subject: "Math", score: 91 },
                    { subject: "Science", score: 95 },
                    { subject: "English", score: 25 }
                ],
                personalInfo: { address: { street: "5, new york Park Lane", city: "New York", country: "USA", pincode: "382481" } }
            },
            {
                studentId: 2,
                name: "Simon",
                course: "MTech",
                subjects: [
                    { subName: "Physics", teacher: { name: "Nirmal vaidya", contactInfo: { email: "Nirmalvaidya@gmail.com", address: "", mobile: "9876501234" } } }
                ],
                result: [
                    { subject: "Math", score: 70 },
                    { subject: "Science", score: 50 },
                    { subject: "English", score: 80 }
                ],
                personalInfo: { address: { street: "22, Vasuki society", city: "Toronto", country: "Canada", pincode: "110001" } }
            },
            {
                studentId: 3,
                name: "Henry",
                course: "pharmacy",
                subjects: [
                    { subName: "Physics", teacher: { name: "Krish Patel", contactInfo: { email: "krishpatel@gmail.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                ],
                result: [
                    { subject: "Math", score: 60 },
                    { subject: "Science", score: 90 },
                    { subject: "English", score: 70 }
                ],
                personalInfo: { address: { street: "20, Vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
            },
            {
                    studentId: 4,
                    name: "joffrey",
                    course: "microbiology",
                    subjects: [
                        { subName: "Physics", teacher: { name: "kishan", contactInfo: { email: "kishanl@gamil.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                    ],
                    result: [
                        { subject: "Math", score: 54 },
                        { subject: "Science", score: 80 },
                        { subject: "English", score: 70 }
                    ],
                    personalInfo: { address: { street: "20, vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
                },
                {
                    studentId: 4,
                    name: "tom",
                    course: "chemistry",
                    subjects: [
                        { subName: "Physics", teacher: { name: "gopal", contactInfo: { email: "gopal@gamil.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                    ],
                    result: [
                        { subject: "Math", score: 60 },
                        { swubject: "Science", score: 90 },
                        { subject: "English", score: 70 }
                    ],
                    personalInfo: { address: { street: "20, vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
                },
                {
                    studentId: 5,
                    name: "murphy",
                    course: "civil     5",
                    subjects: [
                        { subName: "Physics", teacher: { name: "krish patel", contactInfo: { email: "krishpatel@gamil.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                    ],
                    result: [
                        { subject: "Math", score: 60 },
                        { subject: "Science", score: 90 },
                        { subject: "English", score: 70 }
                    ],
                    personalInfo: { address: { street: "20, vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
                }
        ];

        sessionStorage.setItem('studentsData', JSON.stringify(students));

        function calculatePercentage(results) {
            let total = results.reduce((sum, r) => sum + r.score, 0);
            return (total / results.length).toFixed(2);
        }

        function calculateGrade(percentage) {
            if (percentage >= 90) return "A+";
            if (percentage >= 80) return "A";
            if (percentage >= 70) return "B";
            if (percentage >= 60) return "C";
            if (percentage >= 50) return "D";
            return "F";
        }

        function showtable(studentList) {
            const tablebody = document.getElementById("table");
            tablebody.innerHTML = "";
            studentList.forEach((student, index) => {
                let percentage = calculatePercentage(student.result);
                let grade = calculateGrade(percentage);
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${student.personalInfo.address.city}</td>
                    <td>${student.course}</td>
                    <td>${percentage}%</td>
                    <td>${grade}</td>
                    <td>
                        <select class="action-select" data-index="${index}">
                            <option value="">Action</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </td>
                `;
                tablebody.appendChild(row);
            });
        }

        showtable(students);

        const searchbar = document.getElementById("searchbar");
        searchbar.addEventListener("keyup", () => {
            const value = searchbar.value.toLowerCase();
            const filtered = students.filter(s => s.name.toLowerCase().includes(value));
            showtable(filtered);
        });

        let Ascending = true;
        function AscDesc() {
            if (Ascending) {
                students.sort((a, b) => calculatePercentage(a.result) - calculatePercentage(b.result));
                document.getElementById("grades").textContent = "↑";
            } else {
                students.sort((a, b) => calculatePercentage(b.result) - calculatePercentage(a.result));
                document.getElementById("grades").textContent = "↓";
            }
            Ascending = !Ascending;
            showtable(students);
        }

        document.getElementById("table").addEventListener("change", (e) => {
            if (e.target.classList.contains("action-select")) {
                const action = e.target.value;
                const index = parseInt(e.target.dataset.index);
                if (action === "delete") {
                    if (confirm("Are you sure you want to delete this student?")) {
                        students.splice(index, 1);
                        sessionStorage.setItem('studentsData', JSON.stringify(students));
                        showtable(students);
                    }
                } else if (action === "edit") {
                    window.location.href = `edit.html?index=${index}`;
                }
                e.target.value = ""; 
            }
        });
        
        window.AscDesc = AscDesc;
    });
