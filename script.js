function updateCourses() {
    const program = document.getElementById("program").value;
    const course = document.getElementById("course");
    const major = document.getElementById("major");

    const courses = {
        "CAT": ["Civil Engineering"],
        "CTE": ["BEED", "BSED"],
        "CICS": ["BSIT", "BSCS"]
    };

    const majors = {
        "BEED": ["Major in Math", "Major in English", "Major in Physical Education"],
        "BSED": ["Major in Math", "Major in English", "Major in Physical Education"],
        "BSIT": ["Software Development", "Network Administration"],
        "BSCS": ["Artificial Intelligence", "Data Science"],
        "Civil Engineering": [] // No majors for Civil Engineering
    };

    // Reset course and major dropdowns
    course.innerHTML = "<option value=''>-- Select Course --</option>";
    major.innerHTML = "<option value=''>-- Select Major --</option>";

    if (program in courses) {
        courses[program].forEach(c => {
            const option = document.createElement("option");
            option.value = c;
            option.textContent = c;
            course.appendChild(option);
        });
    }

    course.addEventListener("change", function () {
        const selectedCourse = course.value;

        // Reset majors
        major.innerHTML = "<option value=''>-- Select Major --</option>";

        if (selectedCourse in majors) {
            majors[selectedCourse].forEach(m => {
                const option = document.createElement("option");
                option.value = m;
                option.textContent = m;
                major.appendChild(option);
            });
        }
    });
}
