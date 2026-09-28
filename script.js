// ==========================================
// SMARTSTUDY
// SMART AUTOMATIC STUDY PLANNER
// ==========================================


// ==========================================
// ELEMENTS
// ==========================================

const subjectsContainer =
    document.getElementById("subjectsContainer");

const addSubjectButton =
    document.getElementById("addSubject");

const generatePlanButton =
    document.getElementById("generatePlan");

const savePlanButton =
    document.getElementById("savePlan");

const clearPlanButton =
    document.getElementById("clearPlan");

const timetableContainer =
    document.getElementById("timetableContainer");

const resultMessage =
    document.getElementById("resultMessage");

const themeButton =
    document.getElementById("themeButton");

const subjectCount =
    document.getElementById("subjectCount");

const exportCSVButton =
    document.getElementById("exportCSV");

const printPlanButton =
    document.getElementById("printPlan");


// ==========================================
// GLOBAL DATA
// ==========================================

let generatedPlan = [];


// ==========================================
// UPDATE SUBJECT NUMBERS
// ==========================================

function updateSubjectNumbers() {

    const cards =
        document.querySelectorAll(
            ".subject-card"
        );

    cards.forEach(function(card, index) {

        const number =
            card.querySelector(
                ".subject-number"
            );

        number.textContent =
            index + 1;

    });


    subjectCount.textContent =
        cards.length;

}


// ==========================================
// ADD SUBJECT
// ==========================================

addSubjectButton.addEventListener(
    "click",
    function() {

        const subjectCard =
            document.createElement("div");

        subjectCard.classList.add(
            "subject-card"
        );


        subjectCard.innerHTML = `

            <div class="subject-top">

                <div class="subject-number">
                    1
                </div>

                <button
                    type="button"
                    class="remove-subject"
                >
                    ×
                </button>

            </div>


            <input
                type="text"
                class="subject-name"
                placeholder="Subject name"
            >


            <textarea
                class="syllabus"
                placeholder="Enter one topic per line

Example:
Unit 1 - Introduction
Unit 2 - Graphs
Unit 3 - Trees"
            ></textarea>


            <div class="subject-options">

                <div>

                    <label>
                        Difficulty
                    </label>

                    <select class="difficulty">

                        <option value="easy">
                            Easy
                        </option>

                        <option
                            value="medium"
                            selected
                        >
                            Medium
                        </option>

                        <option value="hard">
                            Hard
                        </option>

                    </select>

                </div>


                <div>

                    <label>
                        Priority
                    </label>

                    <select class="priority">

                        <option value="low">
                            Low
                        </option>

                        <option
                            value="medium"
                            selected
                        >
                            Medium
                        </option>

                        <option value="high">
                            High
                        </option>

                    </select>

                </div>

            </div>

        `;


        subjectsContainer.appendChild(
            subjectCard
        );


        updateSubjectNumbers();

    }
);


// ==========================================
// REMOVE SUBJECT
// ==========================================

subjectsContainer.addEventListener(
    "click",
    function(event) {

        if (
            event.target.classList.contains(
                "remove-subject"
            )
        ) {

            const cards =
                document.querySelectorAll(
                    ".subject-card"
                );


            if (cards.length === 1) {

                alert(
                    "You need at least one subject."
                );

                return;

            }


            event.target
                .closest(".subject-card")
                .remove();


            updateSubjectNumbers();

        }

    }
);


// ==========================================
// DIFFICULTY SCORE
// ==========================================

function getDifficultyScore(
    difficulty
) {

    if (difficulty === "easy") {
        return 1;
    }

    if (difficulty === "medium") {
        return 2;
    }

    return 3;

}


// ==========================================
// PRIORITY SCORE
// ==========================================

function getPriorityScore(
    priority
) {

    if (priority === "low") {
        return 1;
    }

    if (priority === "medium") {
        return 2;
    }

    return 3;

}


// ==========================================
// CAPITALIZE
// ==========================================

function capitalize(text) {

    return (
        text.charAt(0).toUpperCase() +
        text.slice(1)
    );

}


// ==========================================
// GENERATE PLAN
// ==========================================

generatePlanButton.addEventListener(
    "click",
    function() {


        // ==================================
        // BASIC INFORMATION
        // ==================================

        const studentName =
            document
            .getElementById("studentName")
            .value
            .trim();


        const startDate =
            document
            .getElementById("examStart")
            .value;


        const examDate =
            document
            .getElementById("examDate")
            .value;


        const studyHours =
            Number(
                document
                .getElementById("studyHours")
                .value
            );


        // ==================================
        // VALIDATION
        // ==================================

        if (!studentName) {

            alert(
                "Please enter your name."
            );

            return;

        }


        if (!startDate) {

            alert(
                "Please select your study start date."
            );

            return;

        }


        if (!examDate) {

            alert(
                "Please select your exam date."
            );

            return;

        }


        if (
            studyHours <= 0 ||
            studyHours > 24
        ) {

            alert(
                "Please enter study hours between 1 and 24."
            );

            return;

        }


        // ==================================
        // DATES
        // ==================================

        const start =
            new Date(
                startDate + "T00:00:00"
            );


        const exam =
            new Date(
                examDate + "T00:00:00"
            );


        if (exam <= start) {

            alert(
                "Exam date must be after the study start date."
            );

            return;

        }


        // ==================================
        // TOTAL DAYS
        // ==================================

        const difference =
            exam.getTime() -
            start.getTime();


        const millisecondsPerDay =
            1000 *
            60 *
            60 *
            24;


        const totalDays =
            Math.ceil(
                difference /
                millisecondsPerDay
            );


        // ==================================
        // GET SUBJECTS
        // ==================================

        const cards =
            document.querySelectorAll(
                ".subject-card"
            );


        const subjects = [];


        cards.forEach(
            function(card) {

                const name =
                    card
                    .querySelector(
                        ".subject-name"
                    )
                    .value
                    .trim();


                const syllabus =
                    card
                    .querySelector(
                        ".syllabus"
                    )
                    .value
                    .trim();


                const difficulty =
                    card
                    .querySelector(
                        ".difficulty"
                    )
                    .value;


                const priority =
                    card
                    .querySelector(
                        ".priority"
                    )
                    .value;


                if (!name ||
                    !syllabus
                ) {

                    return;

                }


                const topics =
                    syllabus
                    .split("\n")
                    .map(
                        topic =>
                        topic.trim()
                    )
                    .filter(
                        topic =>
                        topic !== ""
                    );


                if (
                    topics.length === 0
                ) {

                    return;

                }


                const difficultyScore =
                    getDifficultyScore(
                        difficulty
                    );


                const priorityScore =
                    getPriorityScore(
                        priority
                    );


                const score =
                    difficultyScore +
                    priorityScore;


                subjects.push({

                    name: name,

                    topics: topics,

                    difficulty: difficulty,

                    priority: priority,

                    score: score,

                    currentTopic: 0

                });

            }
        );


        // ==================================
        // CHECK SUBJECTS
        // ==================================

        if (
            subjects.length === 0
        ) {

            alert(
                "Please add at least one subject with syllabus."
            );

            return;

        }


        // ==================================
        // TOTAL TOPICS
        // ==================================

        let totalTopics = 0;


        subjects.forEach(
            function(subject) {

                totalTopics +=
                    subject.topics.length;

            }
        );


        // ==================================
        // TOTAL HOURS
        // ==================================

        const totalStudyHours =
            totalDays *
            studyHours;


        // ==================================
        // CREATE PLAN
        // ==================================

        generatedPlan = [];


        let subjectIndex = 0;


        // ==================================
        // DAILY PLAN
        // ==================================

        for (
            let day = 0; day < totalDays; day++
        ) {


            const currentDate =
                new Date(start);


            currentDate.setDate(
                start.getDate() + day
            );


            const dateString =
                currentDate
                .toISOString()
                .split("T")[0];


            const formattedDate =
                currentDate.toLocaleDateString(
                    "en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            const dayPlan = {

                day: day + 1,

                date: dateString,

                formattedDate: formattedDate,

                revision: false,

                sessions: []

            };


            // ==================================
            // WEEKLY REVISION
            // ==================================

            const isRevisionDay =
                (
                    day + 1
                ) % 7 === 0;


            if (
                isRevisionDay &&
                day > 0
            ) {

                dayPlan.revision =
                    true;


                generatedPlan.push(
                    dayPlan
                );


                continue;

            }


            // ==================================
            // DAILY SESSIONS
            // ==================================

            const sessionCount =
                Math.max(
                    1,
                    Math.min(
                        studyHours,
                        subjects.length
                    )
                );


            for (
                let session = 0; session < sessionCount; session++
            ) {


                // ==============================
                // FIND HIGHEST PRIORITY SUBJECT
                // ==============================

                let selectedSubject =
                    null;


                let highestScore = -1;


                for (
                    let attempt = 0; attempt < subjects.length; attempt++
                ) {


                    const index =
                        (
                            subjectIndex +
                            attempt
                        ) %
                        subjects.length;


                    const candidate =
                        subjects[index];


                    if (
                        candidate.currentTopic >=
                        candidate.topics.length
                    ) {

                        continue;

                    }


                    if (
                        candidate.score >
                        highestScore
                    ) {

                        highestScore =
                            candidate.score;

                        selectedSubject =
                            candidate;

                    }

                }


                // ==============================
                // NO TOPICS
                // ==============================

                if (!selectedSubject) {

                    break;

                }


                // ==============================
                // GET TOPIC
                // ==============================

                const topic =
                    selectedSubject
                    .topics[
                        selectedSubject
                        .currentTopic
                    ];


                selectedSubject.currentTopic++;


                const selectedIndex =
                    subjects.indexOf(
                        selectedSubject
                    );


                subjectIndex =
                    (
                        selectedIndex + 1
                    ) %
                    subjects.length;


                // ==============================
                // MINUTES
                // ==============================

                const minutes =
                    Math.floor(
                        (
                            studyHours *
                            60
                        ) /
                        sessionCount
                    );


                dayPlan.sessions.push({

                    subject: selectedSubject.name,

                    topic: topic,

                    difficulty: selectedSubject.difficulty,

                    priority: selectedSubject.priority,

                    minutes: minutes,

                    completed: false

                });

            }


            generatedPlan.push(
                dayPlan
            );

        }


        // ==================================
        // REMAINING TOPICS
        // ==================================

        let remainingTopics = 0;


        subjects.forEach(
            function(subject) {

                remainingTopics +=
                    subject.topics.length -
                    subject.currentTopic;

            }
        );


        // ==================================
        // RESULT MESSAGE
        // ==================================

        resultMessage.innerHTML = `

            Hello <strong>${studentName}</strong>! 👋

            Your personalized study plan contains

            <strong>${totalDays} study days</strong>,

            <strong>${subjects.length} subjects</strong>

            and

            <strong>${totalTopics} topics</strong>.

            You have approximately

            <strong>${totalStudyHours} study hours</strong>

            available.

        `;


        // ==================================
        // DISPLAY PLAN
        // ==================================

        displayPlan(
            generatedPlan,
            remainingTopics
        );


        // ==================================
        // DASHBOARD
        // ==================================

        updateDashboard();


        // ==================================
        // SAVE AUTOMATICALLY
        // ==================================

        localStorage.setItem(
            "smartStudyData",
            JSON.stringify({
                studentName,
                startDate,
                examDate,
                studyHours,
                subjects,
                generatedPlan
            })
        );


        // ==================================
        // SCROLL
        // ==================================

        document
            .getElementById("result")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// DISPLAY PLAN
// ==========================================

function displayPlan(
    plan,
    remainingTopics
) {

    let html = "";


    if (
        remainingTopics > 0
    ) {

        html += `

            <div class="warning-box">

                ⚠️

                <strong>
                    ${remainingTopics}
                    topic(s) could not fit
                    into the current schedule.
                </strong>

                Increase your study hours
                or preparation days.

            </div>

        `;

    } else {

        html += `

            <div class="success-box">

                ✅

                <strong>
                    Complete Study Plan
                </strong>

                All syllabus topics have
                been successfully scheduled.

            </div>

        `;

    }


    html += `
        <div class="timetable">
    `;


    plan.forEach(
        function(day) {


            html += `

                <div class="day-card">

                    <div class="day-header">

                        <h3>
                            Day ${day.day}
                        </h3>

                        <p>
                            ${day.formattedDate}
                        </p>

                    </div>

                    <div class="sessions">

            `;


            if (
                day.revision
            ) {

                html += `

                    <div class="revision-session">

                        <h4>
                            🔄 Weekly Revision Day
                        </h4>

                        <p>
                            Revise the topics studied
                            during this week.
                            Practice questions,
                            review difficult concepts
                            and identify weak areas.
                        </p>

                    </div>

                `;

            } else if (
                day.sessions.length === 0
            ) {

                html += `

                    <div class="revision-session">

                        <h4>
                            🎯 Free Revision
                        </h4>

                        <p>
                            Use this time for revision,
                            practice questions and
                            preparation.
                        </p>

                    </div>

                `;

            }


            day.sessions.forEach(
                function(session, index) {


                    html += `

                        <div class="study-session">

                            <div class="session-number">

                                Session
                                ${index + 1}

                            </div>


                            <div class="session-content">

                                <h4>
                                    ${session.subject}
                                </h4>

                                <p>
                                    ${session.topic}
                                </p>


                                <span>
                                    ⏱
                                    ${session.minutes}
                                    minutes
                                </span>


                                <span>
                                    📚
                                    ${capitalize(
                                        session.difficulty
                                    )}
                                </span>


                                <span>
                                    ⭐
                                    ${capitalize(
                                        session.priority
                                    )}
                                    Priority
                                </span>


                                <div class="topic-complete">

                                    <label>

                                        <input
                                            type="checkbox"
                                            class="complete-checkbox"
                                            data-day="${day.day}"
                                            data-session="${index}"
                                            ${
                                                session.completed
                                                    ? "checked"
                                                    : ""
                                            }
                                        >

                                        Mark as completed

                                    </label>

                                </div>

                            </div>

                        </div>

                    `;

                }
            );


            html += `

                    </div>

                </div>

            `;

        }
    );


    html += `
        </div>
    `;


    timetableContainer.innerHTML =
        html;


    addCompletionListeners();

}


// ==========================================
// COMPLETION LISTENERS
// ==========================================

function addCompletionListeners() {

    const checkboxes =
        document.querySelectorAll(
            ".complete-checkbox"
        );


    checkboxes.forEach(
        function(checkbox) {

            checkbox.addEventListener(
                "change",
                function() {

                    const day =
                        Number(
                            this.dataset.day
                        );


                    const session =
                        Number(
                            this.dataset.session
                        );


                    generatedPlan[
                            day - 1
                        ].sessions[
                            session
                        ].completed =
                        this.checked;


                    localStorage.setItem(
                        "smartStudyPlan",
                        JSON.stringify(
                            generatedPlan
                        )
                    );


                    updateDashboard();

                }
            );

        }
    );

}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    if (
        generatedPlan.length === 0
    ) {

        return;

    }


    let days = 0;

    let topics = 0;

    let completed = 0;

    let hours = 0;

    const subjectSet =
        new Set();


    generatedPlan.forEach(
        function(day) {

            days++;


            day.sessions.forEach(
                function(session) {

                    topics++;

                    hours +=
                        session.minutes /
                        60;


                    subjectSet.add(
                        session.subject
                    );


                    if (
                        session.completed
                    ) {

                        completed++;

                    }

                }
            );

        }
    );


    const percentage =
        topics === 0 ?
        0 :
        Math.round(
            (
                completed /
                topics
            ) * 100
        );


    document.getElementById(
            "statDays"
        ).textContent =
        days;


    document.getElementById(
            "statSubjects"
        ).textContent =
        subjectSet.size;


    document.getElementById(
            "statTopics"
        ).textContent =
        topics;


    document.getElementById(
            "statHours"
        ).textContent =
        hours.toFixed(1);


    document.getElementById(
            "progressPercentage"
        ).textContent =
        percentage + "%";


    document.getElementById(
            "progressText"
        ).textContent =
        percentage +
        "% completed";


    document.getElementById(
            "progressFill"
        ).style.width =
        percentage + "%";

}


// ==========================================
// SAVE PLAN
// ==========================================

savePlanButton.addEventListener(
    "click",
    function() {

        const data = {

            studentName: document
                .getElementById(
                    "studentName"
                )
                .value,

            startDate: document
                .getElementById(
                    "examStart"
                )
                .value,

            examDate: document
                .getElementById(
                    "examDate"
                )
                .value,

            studyHours: document
                .getElementById(
                    "studyHours"
                )
                .value,

            generatedPlan: generatedPlan

        };


        localStorage.setItem(
            "smartStudyData",
            JSON.stringify(data)
        );


        alert(
            "Your study plan has been saved."
        );

    }
);


// ==========================================
// LOAD SAVED PLAN
// ==========================================

function loadSavedPlan() {

    const saved =
        localStorage.getItem(
            "smartStudyData"
        );


    if (!saved) {

        return;

    }


    try {

        const data =
            JSON.parse(saved);


        if (
            data.studentName
        ) {

            document.getElementById(
                    "studentName"
                ).value =
                data.studentName;

        }


        if (
            data.startDate
        ) {

            document.getElementById(
                    "examStart"
                ).value =
                data.startDate;

        }


        if (
            data.examDate
        ) {

            document.getElementById(
                    "examDate"
                ).value =
                data.examDate;

        }


        if (
            data.studyHours
        ) {

            document.getElementById(
                    "studyHours"
                ).value =
                data.studyHours;

        }


        if (
            data.generatedPlan &&
            data.generatedPlan.length > 0
        ) {

            generatedPlan =
                data.generatedPlan;


            displayPlan(
                generatedPlan,
                0
            );


            updateDashboard();

        }

    } catch (error) {

        console.log(
            "Could not load saved plan."
        );

    }

}


// ==========================================
// CLEAR PLAN
// ==========================================

clearPlanButton.addEventListener(
    "click",
    function() {

        const confirmation =
            confirm(
                "Are you sure you want to clear your saved plan?"
            );


        if (!confirmation) {

            return;

        }


        localStorage.removeItem(
            "smartStudyData"
        );

        localStorage.removeItem(
            "smartStudyPlan"
        );


        location.reload();

    }
);


// ==========================================
// DARK MODE
// ==========================================

themeButton.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "smartStudyDarkMode",
            darkMode
        );


        themeButton.textContent =
            darkMode ?
            "☀️" :
            "🌙";

    }
);


// ==========================================
// LOAD DARK MODE
// ==========================================

function loadDarkMode() {

    const darkMode =
        localStorage.getItem(
            "smartStudyDarkMode"
        );


    if (
        darkMode === "true"
    ) {

        document.body.classList.add(
            "dark"
        );

        themeButton.textContent =
            "☀️";

    }

}


// ==========================================
// EXPORT CSV
// ==========================================

exportCSVButton.addEventListener(
    "click",
    function() {

        if (
            generatedPlan.length === 0
        ) {

            alert(
                "Generate a study plan first."
            );

            return;

        }


        let csv =
            "Day,Date,Session,Subject,Topic,Difficulty,Priority,Minutes,Completed\n";


        generatedPlan.forEach(
            function(day) {

                if (
                    day.revision
                ) {

                    csv +=
                        `${day.day},${day.date},Revision,Weekly Revision,Revision Day,,,0,No\n`;

                    return;

                }


                day.sessions.forEach(
                    function(
                        session,
                        index
                    ) {

                        csv +=
                            `"${day.day}",` +
                            `"${day.date}",` +
                            `"Session ${index + 1}",` +
                            `"${session.subject}",` +
                            `"${session.topic}",` +
                            `"${session.difficulty}",` +
                            `"${session.priority}",` +
                            `"${session.minutes}",` +
                            `"${session.completed ? "Yes" : "No"}"\n`;

                    }
                );

            }
        );


        const blob =
            new Blob(
                [csv], {
                    type: "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "SmartStudy_Timetable.csv";


        link.click();


        URL.revokeObjectURL(
            url
        );

    }
);


// ==========================================
// PRINT / PDF
// ==========================================

printPlanButton.addEventListener(
    "click",
    function() {

        if (
            generatedPlan.length === 0
        ) {

            alert(
                "Generate a study plan first."
            );

            return;

        }


        window.print();

    }
);


// ==========================================
// INITIALIZE
// ==========================================

updateSubjectNumbers();

loadDarkMode();

loadSavedPlan();