
// const token = localStorage.getItem("token")

// if (!token) {
//     window.location.href = "login.html"
// }

// const headers = {
//     Authorization: "Bearer " + token
// }

// const urlParams = new URLSearchParams(window.location.search)
// const examId = urlParams.get("examId")
// /* load questions from pool */

// async function loadQuestions(){

// const subject = document.getElementById("subject").value

// const res = await fetch(
// BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
// { headers }
// )

// const data = await res.json()

// const list = document.getElementById("list")
// const subSelect = document.getElementById("subTopic")

// list.innerHTML = ""

// if(!Array.isArray(data)){
// list.innerHTML = `<p>${data.message || "No questions found"}</p>`
// return
// }

// /* extract unique subtopics from backend data */

// const subtopics = [...new Set(data.map(q => q.subTopic))]

// subSelect.innerHTML = `<option value="">All Subtopics</option>`

// subtopics.forEach(st=>{
// subSelect.innerHTML += `<option value="${st}">${st}</option>`
// })

// /* render all questions initially */

// renderQuestions(data)

// }

// /* render function */

// function renderQuestions(data){

// const list = document.getElementById("list")
// const subTopic = document.getElementById("subTopic").value

// list.innerHTML=""

// const filtered = subTopic
// ? data.filter(q => q.subTopic === subTopic)
// : data

// filtered.forEach(q=>{

// list.innerHTML += `

// <div class="item">

// <div class="question-title">
// ${q.questionText}
// </div>

// <div class="question-subtopic">
// ${q.subTopic}
// </div>

// <button class="primary"
// onclick="addQuestion('${q._id}')">
// Add
// </button>

// </div>

// `

// })

// }

// /* add question to exam */

// async function addQuestion(id) {

//     try {

//         const res = await fetch(
//             BASE_URL + "/addQuestions/addToExam",
//             {
//                 method: "POST",

//                 headers: {
//                     "Content-Type": "application/json",
//                     ...headers
//                 },

//                 body: JSON.stringify({

//                     examId,
//                     questionId: id,
//                     order: Date.now()

//                 })

//             }
//         )

//         const data = await res.json()

//         alert(data.message || "Question Added")

//     }
//     catch (err) {

//         console.error(err)
//         alert("Failed to add question")

//     }

// }

// /* load questions on page start */


// document.getElementById("subTopic").addEventListener("change", ()=>{
// loadQuestions()
// })
// loadQuestions()

/* =========================
   AUTH + BASIC SETUP
========================= */

const token = localStorage.getItem("token")

if (!token) {
    window.location.href = "login.html"
}

const headers = {
    Authorization: "Bearer " + token
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

/* store fetched questions */

let cachedQuestions = []

/* =========================
   LOAD QUESTIONS FROM API
========================= */

async function loadQuestions(){

const subject = document.getElementById("subject").value
const subTopic = document.getElementById("subTopic").value

if(!subject || !subTopic){
alert("Select subject and subtopic")
return
}

try{

const res = await fetch(
BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject + "/" + subTopic,
{ headers }
)

if(!res.ok){
const text = await res.text()
console.error("API error:", text)
return
}

const data = await res.json()

const list = document.getElementById("list")

list.innerHTML = ""

if(!Array.isArray(data)){
list.innerHTML = `<p>${data.message || "No questions found"}</p>`
return
}

data.forEach(q=>{

list.innerHTML += `

<div class="item">

<div>
<div class="question-title">
${q.questionText}
</div>

<div class="question-subtopic">
${q.subTopic}
</div>
</div>

<button class="primary"
onclick="addQuestion('${q._id}')">
Add
</button>

</div>

`

})

}
catch(err){

console.error(err)

document.getElementById("list").innerHTML =
"<p>Failed to load questions</p>"

}

}

async function loadSubTopics(){

const subject = document.getElementById("subject").value

if(!subject) return

const res = await fetch(
BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
{ headers }
)

if(!res.ok){
const text = await res.text()
console.error("API error:", text)
return
}

const data = await res.json()

const subSelect = document.getElementById("subTopic")

subSelect.innerHTML = `<option value="">Select Subtopic</option>`

if(!Array.isArray(data)) return

const subtopics = [...new Set(data.map(q => q.subTopic))]

subtopics.forEach(st=>{
subSelect.innerHTML += `<option value="${st}">${st}</option>`
})

}
/* =========================
   RENDER QUESTIONS
========================= */

function renderQuestions() {

    const list = document.getElementById("list")
    const subTopic = document.getElementById("subTopic").value

    list.innerHTML = ""

    const filtered = subTopic
        ? cachedQuestions.filter(q => q.subTopic === subTopic)
        : cachedQuestions

    if (filtered.length === 0) {
        list.innerHTML = "<p>No questions for this subtopic</p>"
        return
    }

    filtered.forEach(q => {

        list.innerHTML += `

        <div class="item">

            <div>

                <div class="question-title">
                    ${q.questionText}
                </div>

                <div class="question-subtopic">
                    ${q.subTopic}
                </div>

            </div>

            <button class="primary"
                onclick="addQuestion('${q._id}')">
                Add
            </button>

        </div>

        `

    })

}

/* =========================
   ADD QUESTION TO EXAM
========================= */

async function addQuestion(questionId) {

    try {

        const res = await fetch(
            BASE_URL + "/addQuestions/addToExam",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },

                body: JSON.stringify({
                    examId,
                    questionId,
                    order: Date.now()
                })

            }
        )

        const data = await res.json()

        alert(data.message || "Question Added")

    }
    catch (err) {

        console.error(err)
        alert("Failed to add question")

    }

}

/* =========================
   EVENT LISTENERS
========================= */

document.getElementById("subject")
.addEventListener("change", loadSubTopics)

document.getElementById("subTopic")
.addEventListener("change", loadQuestions)
/* =========================
   OPTIONAL AUTO LOAD
========================= */

/* if subject already selected */

window.addEventListener("DOMContentLoaded", () => {

    const subject = document.getElementById("subject").value

    if (subject) {
        loadQuestions()
    }

})