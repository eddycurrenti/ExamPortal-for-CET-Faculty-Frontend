async function createExam(){

await fetch(
BASE_URL+"/createExam/createTest",
{
method:"POST",

headers:{
"Content-Type":"application/json",
...authHeader()
},

body:JSON.stringify({
title:title.value,
duration:duration.value,
totalMarks:marks.value
})
})

alert("Exam created")

window.location.href="dashboard.html"

}