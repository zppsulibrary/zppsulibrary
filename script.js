function updateCourses() {
    const program = document.getElementById("program").value;
    const course = document.getElementById("course");
    const major = document.getElementById("major");

    // Mapping programs to courses
    const courses = {
        "CTE": ["BEED", "BSED"],
        "CICS": ["BSIT", "BSCS"],
        "CET": ["BSCE", "BSIT"],
    };

    // Mapping courses to majors
    const majors = {
        "BEED": [""],
        "BSED": ["Major in Math", "Major in English"],
        "BSIT": ["Software Development", "Network Administration"],
        "BSCS": ["Artificial Intelligence", "Data Science"],
        "BSIT": ["Civil Technology", "Refrigeration and Airconditioning Technology"],
    };

    // Reset course and major dropdowns
    course.innerHTML = "<option value=''>-- Select Course --</option>";
    major.innerHTML = "<option value=''>-- Select Major --</option>";

    // Populate courses based on selected program
    if (program in courses) {
        courses[program].forEach(courseName => {
            const option = document.createElement("option");
            option.value = courseName;
            option.textContent = courseName;
            course.appendChild(option);
        });
    }

    // Add event listener for course change to update majors
    course.addEventListener("change", function () {
        const selectedCourse = course.value;

        // Reset majors
        major.innerHTML = "<option value=''>-- Select Major --</option>";

        if (selectedCourse in majors) {
            majors[selectedCourse].forEach(majorName => {
                const option = document.createElement("option");
                option.value = majorName;
                option.textContent = majorName;
                major.appendChild(option);
            });
        }
    });
}