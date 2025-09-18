let students = [
  { studentId: 1, name: "Ram", grade: 85, course: "BTech" },
  { studentId: 2, name: "Shyam", grade: 62, course: "Mtech" },
  { studentId: 3, name: "Gopal", grade: 70, course: "Mechanical" },
  { studentId: 4, name: "Hanuman", grade: 95, course: "Pharmacy" },
  { studentId: 5, name: "Krishna", grade: 100, course: "Micro Biology" },
  { studentId: 6, name: "Shreeji", grade: 55, course: "Civil" }
];

let Ascending = true;

function showtable(students) {
    let tablebody = document.getElementById("table");
    tablebody.innerHTML = "";

    students.map((student, arr) => {
        let row = 
        `<tr>
            <td>${student.studentId}</td>
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.course}</td>
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
}
                                                            
showtable(students);
function searchStudent() {
    let value = document.getElementById("searchbar").value.toLowerCase();
    let find = students.filter(stu => stu.name.toLowerCase().includes(value));

    if (find.length === 0) {
        alert("No matching student found.");
    }
    showtable(find);
}

function Asc(){
    students.sort((a,b)=> a.grade-b.grade);
}


function Desc() {
    students.sort((a, b) => b.grade - a.grade);
    showtable(students);
}

function AscDesc() {
    if (Ascending) {
        Asc();
    } else {
        Desc();
    }
    Ascending = !Ascending;
    showtable(students);
}


function Actions(action, arr) {
    if (action === "delete") {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(arr, 1);
            showtable(students);
        }
    } else if (action === "edit") {
        let newName = prompt("Enter new name:", students.name);

        let newGrade = prompt("Enter new grade:", students.grade);
        let newCourse = prompt("Enter new course:", students.course);

    
    if (newName && newGrade && newCourse) {
            students[arr].name = newName;
            students[arr].grade = newGrade;
            students[arr].course = newCourse;
            showtable(students);
        }
    }
}
