// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAATH_41xPWHK7FWORsbKvFZNjgN0nwzS8",
    authDomain: "zppsulibrary-3f15b.firebaseapp.com",
    projectId: "zppsulibrary-3f15b",
    storageBucket: "zppsulibrary-3f15b.appspot.com",
    messagingSenderId: "693170608073",
    appId: "1:693170608073:web:d680a3a237e3119f75fa18"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Update courses and majors dynamically
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
        courses[program].forEach(courseName => {
            const option = document.createElement("option");
            option.value = courseName;
            option.textContent = courseName;
            course.appendChild(option);
        });
    }

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

// Handle form submission
document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    // Get form data
    const lastname = document.getElementById("lastname").value;
    const givenname = document.getElementById("givenname").value;
    const mi = document.getElementById("mi").value;
    const program = document.getElementById("program").value;
    const course = document.getElementById("course").value;
    const major = document.getElementById("major").value || "None"; // Default to "None" if no major selected
    const patronType = document.getElementById("patron-type").value;
    const schoolYear = document.getElementById("school-year").value;
    const semester = document.getElementById("semester").value;

    // Prepare data to insert into Firestore
    const formData = {
        lastname,
        givenname,
        mi,
        program,
        course,
        major,
        patronType,
        schoolYear,
        semester,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add server-side timestamp
    };

    try {
        // Insert data into Firestore
        await db.collection("zppsulibrary").add(formData);
        alert("Registration submitted successfully!");
        e.target.reset(); // Reset the form
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting the form. Please try again.");
    }
});
