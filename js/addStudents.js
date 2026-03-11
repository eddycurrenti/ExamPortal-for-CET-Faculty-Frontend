async function loadStudents(){

const res = await fetch(
BASE_URL+"/addStudent/allTheStudents",
{
headers:authHeader()
})

const data = await res.json()

const div = document.getElementById("students")

div.innerHTML=""

data.students.forEach(s=>{

div.innerHTML+=`

<div class="item">

${s.username}

<button onclick="add('${s._id}')">

Add

</button>

</div>

`

})

}

async function add(id){

await fetch(
BASE_URL+"/addStudent/saveThes",
{

method:"POST",

headers:{
"Content-Type":"application/json",
...authHeader()
},

body:JSON.stringify({
studentId:id
})

})

alert("Student Added")

}

loadStudents()