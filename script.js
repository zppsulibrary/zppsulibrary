function updateCourses() {
    const program = document.getElementById("program").value;
    const course = document.getElementById("course");

    const courses = {
        "CAT": ["Civil Engineering"],
        "CTE": ["BEED", "BSED"],
        "CICS": ["BSIT", "BSCS"]
    };

    course.innerHTML = "<option value=''>-- Select Course --</option>";

    if (program in courses) {
        courses[program].forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            course.appendChild(option);
        });
    }
}