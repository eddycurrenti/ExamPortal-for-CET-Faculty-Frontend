const token = localStorage.getItem("token")

const headers = {
"Authorization": "Bearer " + token
}

const urlParams = new URLSearchParams(window.location.search)
const examId = urlParams.get("examId")

async function loadQuestions(){

const subject = document.getElementById("subject").value

const res = await fetch(
BASE_URL + "/addQuestions/getQues/" + examId + "/" + subject,
{
headers
}
)

const data = await res.json()

const list = document.getElementById("list")

list.innerHTML=""

if(!Array.isArray(data)){
list.innerHTML = `<p>${data.message || "No questions found"}</p>`
return
}

data.forEach(q=>{

list.innerHTML += `

<div class="item">

<div class="question-title">
${q.questionText}
</div>

<button class="primary"
onclick="addQuestion('${q._id}')">

Add

</button>

</div>

`

})

}



async function addQuestion(id){

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
order:1

})

})

const data = await res.json()

alert(data.message || "Question Added")

}