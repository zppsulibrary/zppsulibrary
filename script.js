function updateCourses() {
    const program = document.getElementById("program").value;
    const course = document.getElementById("course");
    const major = document.getElementById("major");

    // Mapping programs to courses
    const courses = {
        "CAT": ["Civil Engineering"],
        "CTE": ["BEED", "BSED"],
        "CICS": ["BSIT", "BSCS"]
    };

    // Mapping courses to majors
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

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAATH_41xPWHK7FWORsbKvFZNjgN0nwzS8",
    authDomain: "zppsulibrary-3f15b.firebaseapp.com",
    projectId: "zppsulibrary-3f15b",
    storageBucket: "zppsulibrary-3f15b.firebasestorage.app",
    messagingSenderId: "693170608073",
    appId: "1:693170608073:web:5a92d9c695a10bc975fa18"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to update courses based on selected program
function updateCourses() {
    const program = document.getElementById('program').value;
    const courseSelect = document.getElementById('course');
    const majorSelect = document.getElementById('major');

    // Clear previous options
    courseSelect.innerHTML = '<option value="">-- Select Course --</option>';
    majorSelect.innerHTML = '<option value="">-- Select Major --</option>';

    if (program === 'CAT') {
        courseSelect.innerHTML += '<option value="BSIT">BSIT</option>';
        majorSelect.innerHTML += '<option value="Web Development">Web Development</option>';
    } else if (program === 'CTE') {
        courseSelect.innerHTML += '<option value="BSEd">BSEd</option>';
        majorSelect.innerHTML += '<option value="Math">Math</option>';
    } else if (program === 'CICS') {
        courseSelect.innerHTML += '<option value="BSCS">BSCS</option>';
        majorSelect.innerHTML += '<option value="Data Science">Data Science</option>';
    }
}

// Handle form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const lastname = document.getElementById('lastname').value;
    const givenname = document.getElementById('givenname').value;
    const mi = document.getElementById('mi').value;
    const program = document.getElementById('program').value;
    const course = document.getElementById('course').value;
    const major = document.getElementById('major').value;
    const patronType = document.getElementById('patron-type').value;
    const schoolYear = document.getElementById('school-year').value;
    const semester = document.getElementById('semester').value;

    // Add a new document to the "registrations" collection
    db.collection('registrations').add({
        lastname: lastname,
        givenname: givenname,
        mi: mi,
        program: program,
        course: course,
        major: major,
        patronType: patronType,
        schoolYear: schoolYear,
        semester: semester,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Registration successful!');
        // Optionally, reset the form
        document.querySelector('form').reset();
    })
    .catch((error) => {
        console.error('Error adding document: ', error);
        alert('There was an error submitting your registration. Please try again.');
    });
});