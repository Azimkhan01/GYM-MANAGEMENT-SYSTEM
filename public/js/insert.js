let whatsapp = document.getElementById("whatsapp")
whatsapp.addEventListener("change",(e)=>{
fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
console.log(r)
// r.map((value)=>{
//     if(value["whatsapp"] == e.target.value)
//     {   let submit = document.getElementById("submit")
//         submit.disabled = true;
//         submit.style.backgroundColor = "tomato"
//         document.getElementById("data_status").innerHTML = `<p style="color:tomato">${e.target.value} already exist</p>`
//         return;
//     }else{
//         document.getElementById("data_status").innerHTML = ``
//         let submit = document.getElementById("submit")
//         submit.disabled = false
//         submit.style.backgroundColor = "#007BFF"
//     }
    
// });
 for(i=0;i<r.length;i++)
{
    if(r[i]["whatsapp"] == e.target.value)
    {
        let submit = document.getElementById("submit")
        submit.disabled = true;
        submit.style.backgroundColor = "tomato"
        document.getElementById("data_status").innerHTML = `<p style="color:tomato">${e.target.value} already exist</p>`
        return;
    }
    else{
        document.getElementById("data_status").innerHTML = ``
        let submit = document.getElementById("submit")
        submit.disabled = false
        submit.style.backgroundColor = "#007BFF"
    }
}
})
})