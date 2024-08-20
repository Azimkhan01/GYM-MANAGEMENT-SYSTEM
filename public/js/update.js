 let membershipId = document.getElementById("membership-id");
 let whatsapp =document.getElementById("whatsapp");
 let name=document.getElementById("name");
 let gmail =document.getElementById("gmail");
 let membershipDate =document.getElementById("membership-date");
 let membershipDuration = document.getElementById("membership-duration");
 let feesPaid = document.getElementById("fees-paid");


whatsapp.addEventListener("change",async (e)=>{
    await fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
        // console.log(r)
         let status = document.getElementById("status")
            status.innerHTML = ``
        let submit = document.getElementById("submit")
            submit.disabled = false;
        // console.log("running")
      r.map((v)=>{
        if(v["whatsapp"] == e.target.value)
        {
         membershipId.value = v["id"];
         name.value = v["name"];
         gmail.value = v["gmail"];
         membershipDate.value = v["membership_date"];
         membershipDuration.value = v["membership_duration"];
         feesPaid.value = v["fees_paid"];
         let status = document.getElementById("status")
         status.innerHTML = ``
     let submit = document.getElementById("submit")
         submit.disabled = false;
         return
        //  console.log("running");
         
        }else{
            let submit = document.getElementById("submit")
            submit.disabled = true;
            let status = document.getElementById("status")
            status.innerHTML = `<p style="color:red">No data found</p>`
        }
      })
    })
})