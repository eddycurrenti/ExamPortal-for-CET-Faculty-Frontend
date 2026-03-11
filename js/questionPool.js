async function createQuestion(){

await fetch(
BASE_URL+"/createQuestion/newQues",
{
method:"POST",

headers:{
"Content-Type":"application/json",
...authHeader()
},

body:JSON.stringify({

questionText:text.value,
subject:subject.value,

options:[
a.value,
b.value,
c.value,
d.value
],

correctAnswer:Number(correct.value),
Marks:Number(marks.value)

})

})

alert("Question created")

}