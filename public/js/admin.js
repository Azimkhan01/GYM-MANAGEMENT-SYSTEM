
let password = document.getElementById("password")
let username = document.getElementById("username")
document.getElementById("submit").disabled = true;
document.getElementById("submit").style.background = "green"
password.addEventListener("change",(e)=>{
if(username.value && password.value)
{
  if(username.value == "admin" && password.value == "123456")
  {
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").style.background = " #5cb85c";
    
  }else{
    document.getElementById("submit").style.background = "red";
    // document.getElementById("submit").disabled = true;
  }
}
else{
    document.getElementById("submit").disabled = true;
    
}
})