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


// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAATH_41xPWHK7FWORsbKvFZNjgN0nwzS8",
    authDomain: "zppsulibrary-3f15b.firebaseapp.com",
    projectId: "zppsulibrary-3f15b",
    storageBucket: "zppsulibrary-3f15b.firebasestorage.app",
    messagingSenderId: "693170608073",
    appId: "1:693170608073:web:d680a3a237e3119f75fa18"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    const lastname = document.getElementById("lastname").value;
    const givenname = document.getElementById("givenname").value;
    const mi = document.getElementById("mi").value;
    const program = document.getElementById("program").value;
    const course = document.getElementById("course").value;
    const major = document.getElementById("major").value || null; // Optional field
    const patronType = document.getElementById("patron-type").value;
    const schoolYear = document.getElementById("school-year").value;
    const semester = document.getElementById("semester").value;

    try {
        // Add data to Firestore
        await addDoc(collection(db, "zppsulibrary"), {
            lastname,
            givenname,
            mi,
            program,
            course,
            major,
            patronType,
            schoolYear,
            semester,
            createdAt: new Date().toISOString() // Add timestamp
        });

        alert("Registration successful!");
        event.target.reset(); // Clear the form
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to register. Please try again.");
    }
});
