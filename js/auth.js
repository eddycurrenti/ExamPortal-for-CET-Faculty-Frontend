function authHeader(){
return {
Authorization: "Bearer " + localStorage.getItem("token")
}
}

function logout(){
localStorage.removeItem("token")
window.location.href="login.html"
}