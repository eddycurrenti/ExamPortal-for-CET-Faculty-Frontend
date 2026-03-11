const token = localStorage.getItem("token")

const headers = {
"Authorization": "Bearer " + token,
"Content-Type":"application/json"
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

async function loadExam(){

const res = await fetch(
BASE_URL + "/createExam/getAlltheTests",
{ headers }
)

const exams = await res.json()

const exam = exams.find(e=>e._id === examId)

document.getElementById("examTitle").innerText = exam.title

loadQuestions()

}


async function loadQuestions(){

const subject = document.getElementById("subject").value

const res = await fetch(
BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
{ headers }
)

const data = await res.json()

const list = document.getElementById("questionList")

list.innerHTML = ""

if(data.message){
list.innerHTML = `<p>${data.message}</p>`
return
}

data.forEach((q,index)=>{

list.innerHTML += `

<div class="item">

<div class="question-title">
${index+1}. ${q.questionText}
</div>

<div class="question-subject">
${q.subject}
</div>

<div class="actions">

<button class="primary" onclick="removeQuestion('${q._id}')">
Remove
</button>

<button class="primary" onclick="reorderQuestion('${q._id}', ${index+1})">
Change Order
</button>

<button class="primary" onclick="replaceQuestion('${q._id}')">
Replace
</button>

</div>

</div>

`

})

}



async function removeQuestion(questionId){

if(!confirm("Remove this question?")) return

await fetch(
BASE_URL + "/addQuestions/editExamQuestions",
{
method:"PUT",
headers,
body:JSON.stringify({
examId,
action:"remove",
questionId
})
}
)

loadQuestions()

}



async function reorderQuestion(questionId,currentIndex){

const newOrder = prompt("Enter new order")

if(!newOrder) return

await fetch(
BASE_URL + "/addQuestions/editExamQuestions",
{
method:"PUT",
headers,
body:JSON.stringify({
examId,
action:"reorder",
questionId,
newOrder:Number(newOrder)
})
}
)

loadQuestions()

}



async function replaceQuestion(questionId){

const newQuestionId = prompt("Enter new question id")

if(!newQuestionId) return

await fetch(
BASE_URL + "/addQuestions/editExamQuestions",
{
method:"PUT",
headers,
body:JSON.stringify({
examId,
action:"replace",
questionId,
newQuestionId
})
}
)

loadQuestions()

}



async function deleteExam(){

if(!confirm("Delete this exam?")) return

const res = await fetch(
BASE_URL + "/delete/delete/" + examId,
{
method:"DELETE",
headers
}
)

const data = await res.json()

alert(data.message)

window.location.href="dashboard.html"

}

loadExam()


// const token = localStorage.getItem("token")

// const headers = {
// "Authorization": "Bearer " + token
// }

// const urlParams = new URLSearchParams(window.location.search)
// const examId = urlParams.get("examId")

// async function loadExam(){

// const res = await fetch(
// BASE_URL + "/createExam/getAlltheTests",
// { headers }
// )

// const exams = await res.json()

// const exam = exams.find(e=>e._id === examId)

// document.getElementById("examTitle").innerText =
// exam.title

// loadQuestions()

// }


// async function loadQuestions(){

// const res = await fetch(
// BASE_URL + "/addQuestions/examQuestions/" + examId,
// { headers }
// )

// const data = await res.json()

// const list = document.getElementById("questionList")

// list.innerHTML = ""

// data.forEach(q=>{

// list.innerHTML += `

// <div class="item">

// <b>${q.questionText}</b>

// <br>

// ${q.subject}

// </div>

// `

// })

// }


// async function deleteExam(){

// if(!confirm("Delete this exam?")) return

// const res = await fetch(
// BASE_URL + "/delete/delete/" + examId,
// {
// method:"DELETE",
// headers
// }
// )

// const data = await res.json()

// alert(data.message)

// window.location.href="dashboard.html"

// }

// loadExam()