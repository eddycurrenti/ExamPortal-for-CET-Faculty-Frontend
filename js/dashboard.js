const token = localStorage.getItem("token")

if(!token){
window.location.href = "login.html"
}

const headers = {
"Authorization": "Bearer " + token
}

async function loadDashboard(){

try{

/* get student count */

const studentRes = await fetch(
BASE_URL + "/addStudent/stats",
{ headers }
)

const studentData = await studentRes.json()

document.getElementById("studentCount").innerText =
studentData.students || 0



/* get exams */

const examRes = await fetch(
BASE_URL + "/createExam/getAlltheTests",
{ headers }
)

const exams = await examRes.json()

document.getElementById("examCount").innerText =
Array.isArray(exams) ? exams.length : 0



const list = document.getElementById("examList")
list.innerHTML = ""


if(!Array.isArray(exams)){
list.innerHTML = "<p>No exams created yet</p>"
return
}


/* load stats for each exam */

for(const exam of exams){

const statRes = await fetch(
BASE_URL + "/createExam/examStats/" + exam._id,
{ headers }
)

const stats = await statRes.json()

let subjects = ""

if(Array.isArray(stats)){
stats.forEach(s=>{
subjects += `${s._id}: ${s.count} | `
})
}

list.innerHTML += `
<div class="exam">

<div>

<div class="exam-title">${exam.title}</div>

<div class="exam-info">
Duration: ${exam.duration} minutes
</div>

<div class="exam-info">
${subjects || "No questions added"}
</div>

</div>

<div class="exam-actions">
<button class="primary" onclick="toggleExam('${exam._id}')">
${exam.visibility ? "Hide Exam" : "Publish Exam"}
</button>

<button class="primary"
onclick="location.href='addQuestions.html?examId=${exam._id}'">
Add Questions
</button>

<button class="primary"
onclick="openExam('${exam._id}')">
Manage
</button>

</div>

</div>
`

}

}
catch(err){

console.error(err)

document.getElementById("examList").innerHTML =
"<p>Failed to load dashboard</p>"

}

}

function openExam(id){

window.location.href = "manageExam.html?examId=" + id

}

loadDashboard()

async function toggleExam(examId){

const res = await fetch(
BASE_URL + "/createExam/visible/" + examId,
{
method:"PUT",
headers:authHeader()
}
)

const data = await res.json()

alert(data.message)

loadDashboard()

}