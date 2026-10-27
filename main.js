let students = [];


if (sessionStorage.getItem("students")) {
    students = JSON.parse(sessionStorage.getItem("students"));
    displayStudentList();
}   


userform.addEventListener("submit", (event) => {
    event.preventDefault();
    const studentidinput=studentid.value
    const studentnameinput = studentname.value;
    const studentcourseinput = studentcourse.value;

    if (   studentidinput&&studentnameinput && studentcourseinput) {

        const editstudentdetails = studentsedit.value;

        if (editstudentdetails == "") {

        students.push({id:studentidinput,name:studentnameinput,course:studentcourseinput});

        } else {
        students[editstudentdetails] = {id: studentidinput,name: studentnameinput,course: studentcourseinput};
         studentsedit.value = "";
    }
    } else {

        alert("Please fill the form completely");

    }
      displayStudentList();
      sessionStorage.setItem("students", JSON.stringify(students));
      userform.reset();
});


function displayStudentList() {

    studenttable.innerHTML = ""      

    students.forEach((item, index) => {

        studenttable.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                 <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.course}</td>
                <td>

                    <button onclick="editStudent(${index})"
                        class="btn btn-warning">
                        Edit
                    </button>

                    <button onclick="deleteStudent(${index})"
                        class="btn btn-danger">
                        Delete
                    </button>

                </td>
            </tr>
        `;
    });
}


function editStudent(studentindex) {

    const studentdetails = students[studentindex];

    console.log(studentdetails);

    studentid.value = studentdetails.id;
    studentname.value = studentdetails.name;
    studentcourse.value = studentdetails.course;
    studentsedit.value = studentindex;
}



function deleteStudent(studentindex) {

    if (confirm("Are you sure you want to delete student details?")) {
        students.splice(studentindex, 1);
        sessionStorage.setItem("students", JSON.stringify(students));
        displayStudentList();
    }
}