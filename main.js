document.addEventListener('DOMContentLoaded', () => {
    let students;
    const storedData = sessionStorage.getItem('studentsData');

    if (storedData) {
        students = JSON.parse(storedData);
    } else {
        students = [
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
                personalInfo: { address: { street: "22, Vasuki society", city: "Toronto", country: "Canda", pincode: "110001" } }
            },
            {
                studentId: 3,
                name: "Henry",
                course: "Pharmacy",
                subjects: [
                    { subName: "Physics", teacher: { name: "krish patel", contactInfo: { email: "krishpatel@gamil.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                ],
                result: [
                    { subject: "Math", score: 60 },
                    { subject: "Science", score: 90 },
                    { subject: "English", score: 70 }
                ],
                personalInfo: { address: { street: "20, vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
            },
            {
                studentId: 4,
                name: "joffrey",
                course: "Pharmacy",
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
                course: "Pharmacy",
                subjects: [
                    { subName: "Physics", teacher: { name: "gopal", contactInfo: { email: "gopal@gamil.com", address: "45 Green Avenue", mobile: "9876501234" } } }
                ],
                result: [
                    { subject: "Math", score: 60 },
                    { subject: "Science", score: 90 },
                    { subject: "English", score: 70 }
                ],
                personalInfo: { address: { street: "20, vrundavan", city: "Delhi", country: "India", pincode: "189101" } }
            },
            {
                studentId: 5,
                name: "murphy",
                course: "Pharmacy",
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
    }

    const calculatePercentage = (results) => {
        let total = results.reduce((sum, r) => sum + r.score, 0);
        return (total / results.length).toFixed(2);
    };

    const calculateGrade = (percentage) => {
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 50) return "D";
        return "F";
    };

    const showtable = (studentList) => {
        const tablebody = document.getElementById("table");
        tablebody.innerHTML = "";

        studentList.forEach((student, arr) => {
            let percentage = calculatePercentage(student.result);
            let grade = calculateGrade(percentage);
            let row = `
                <tr>
                    <td>${student.studentId}</td>
                    <td>${student.name}</td>
                    <td>${student.personalInfo.address.city}</td> 
                    <td>${student.course}</td>
                    <td>${percentage}%</td>
                    <td>${grade}</td>
                    <td>
                        <select onchange="Actions(this.value, ${arr})">
                            <option value="">Action</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
                    </td>
                </tr>`;
            tablebody.innerHTML += row;
        });
    };

    showtable(students);

    window.searchStudent = () => {
        const value = document.getElementById("searchbar").value.toLowerCase();
        const find = students.filter(stu => stu.name.toLowerCase().includes(value));
        showtable(find);
    };

    const Asc = () => {
        students.sort((a, b) => calculatePercentage(a.result) - calculatePercentage(b.result));
    };

    const Desc = () => {
        students.sort((a, b) => calculatePercentage(b.result) - calculatePercentage(a.result));
    };

    let Ascending = true;
    window.AscDesc = () => {
        const icon = document.getElementById("grades");
        if (Ascending) {
            Asc(); icon.textContent = "↑";
        } else {
            Desc(); icon.textContent = "↓";
        }
        Ascending = !Ascending;
        showtable(students);
    };

    window.Actions = (action, arr) => {
        if (action === "delete") {
            if (confirm("Are you sure you want to delete this student?")) {
                students.splice(arr, 1);
                sessionStorage.setItem('studentsData', JSON.stringify(students));
                showtable(students);
            }
        } else if (action === "edit") {
            window.location.href = `edit.html?index=${arr}`;
        }
    };
});