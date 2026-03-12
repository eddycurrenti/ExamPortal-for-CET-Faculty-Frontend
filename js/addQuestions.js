// const token = localStorage.getItem("token")

// const headers = {
// "Authorization": "Bearer " + token
// }

// const urlParams = new URLSearchParams(window.location.search)
// const examId = urlParams.get("examId")

// async function loadQuestions(){

// const subject = document.getElementById("subject").value

// const res = await fetch(
// BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
// {
// headers
// }
// )

// const data = await res.json()

// const list = document.getElementById("list")

// list.innerHTML=""

// if(!Array.isArray(data)){
// list.innerHTML = `<p>${data.message || "No questions found"}</p>`
// return
// }

// data.forEach(q=>{

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



// async function addQuestion(id){

// const res = await fetch(
// BASE_URL + "/addQuestions/addToExam",
// {
// method:"POST",

// headers:{
// "Content-Type":"application/json",
// ...headers
// },

// body:JSON.stringify({

// examId,
// questionId:id,
// order:1

// })

// })

// const data = await res.json()

// alert(data.message || "Question Added")

// }

// loadQuestions()

const token = localStorage.getItem("token")

if(!token){
window.location.href = "login.html"
}

const headers = {
Authorization: "Bearer " + token
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

/* subtopics map */

const subtopics = {

Physics:[
"Mechanics",
"Thermodynamics",
"Optics",
"Modern Physics"
],

Mathematics:[
"Algebra",
"Calculus",
"Coordinate Geometry",
"Probability"
],

"Physical Chemistry":[
"Thermodynamics",
"Kinetics",
"Electrochemistry"
],

"Organic Chemistry":[
"Hydrocarbons",
"Reactions",
"Biomolecules"
],

"Inorganic Chemistry":[
"Periodic Table",
"Coordination Compounds",
"Chemical Bonding"
]

}

/* populate subtopics when subject changes */

document.getElementById("subject").addEventListener("change", ()=>{

const subject = document.getElementById("subject").value
const subSelect = document.getElementById("subTopic")

subSelect.innerHTML = `<option value="">All Subtopics</option>`

if(subtopics[subject]){

subtopics[subject].forEach(st=>{
subSelect.innerHTML += `<option value="${st}">${st}</option>`
})

}

})

/* load questions from pool */

async function loadQuestions(){

const subject = document.getElementById("subject").value
const subTopic = document.getElementById("subTopic").value

try{

const res = await fetch(
BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
{ headers }
)

const data = await res.json()

const list = document.getElementById("list")

list.innerHTML=""

/* if API returned message */

if(!Array.isArray(data)){
list.innerHTML = `<p>${data.message || "No questions found"}</p>`
return
}

/* filter by subtopic if selected */

const filtered = subTopic
? data.filter(q => q.subTopic === subTopic)
: data

if(filtered.length === 0){
list.innerHTML = "<p>No questions for this subtopic</p>"
return
}

/* render questions */

filtered.forEach(q=>{

list.innerHTML += `

<div class="item">

<div class="question-title">
${q.questionText}
</div>

<div class="question-subtopic">
${q.subTopic}
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

/* add question to exam */

async function addQuestion(id){

try{

const res = await fetch(
BASE_URL + "/addQuestions/addToExam",
{
method:"POST",

headers:{
"Content-Type":"application/json",
...headers
},

body:JSON.stringify({

examId,
questionId:id,
order: Date.now()

})

}
)

const data = await res.json()

alert(data.message || "Question Added")

}
catch(err){

console.error(err)
alert("Failed to add question")

}

}

/* load questions on page start */

loadQuestions()