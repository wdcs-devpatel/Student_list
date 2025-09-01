students = [
  { studentId: 1, name: "Ram", grade: 85, course: "BTech"},
  { studentId: 2, name: "Shyam", grade: 100, course: "Mtech"},
  { studentId: 3, name: "Gopal", grade: 70, course: "Mechanical"},
  { studentId: 4, name: "Hanuman", grade: 95, course: "Pharmacy" },
  { studentId: 5, name: "Krishna", grade: 60, course: "Micro Biology" },
  { studentId: 6, name: "Shreeji", grade: 55, course: "Civil" }
];

function showtable(students) {
let tablebody = document.getElementById("tablebody");
tablebody.innerHTML = "";

students.map((student, arr) => {
        let row = 
        `<tr>
       <td> ${student.studentId} </td>
       <td> ${student.name} </td>
      <td> ${student.grade} </td>
       <td>${student.course}</td>
    <td> <button onclick="deletestudent(${arr})">Delete</button> </td>
       </tr>`;
    tablebody.innerHTML += row;
  });

}
 showtable(students);

  function deletestudent(arr) {
  students.splice(arr, 1);
  showtable(students);
}

 function searchStudent() {

  let value = document.getElementById("searchBox").value.toLowerCase();

  let find = students.filter(stu => stu.name.toLowerCase().includes(value));
  showtable(find);
}

function Asc() {
  students.sort((a, b) => a.grade - b.grade);

  showtable(students);
}

function Desc() {
  students.sort((a, b) => b.grade - a.grade);
  showtable(students);
}


