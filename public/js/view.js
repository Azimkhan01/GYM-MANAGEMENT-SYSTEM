let filter = document.getElementById("filter");

function isExpired(expiryDate) {
        
    const now = new Date();
    const expiry = new Date(expiryDate);
    return expiry < now;
}

let sendMail = document.getElementById("sendMail");
sendMail.style.backgroundColor = "lightgreen"
sendMail.disabled = false
let tableBody = document.getElementById("table_body");
    fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
    r.map((v)=>{
     let tr = document.createElement("tr")
     tr.innerHTML = `   <td>${v["id"]}</td>
                         <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td> 
                        <td>${v["name"]}</td>
                        <td>${v["whatsapp"]}</td>
                        <td>${v["gmail"]}</td>
                        <td>${v["membership_date"]}</td>
                        <td>${v["membership_duration"]}</td>
                        <td>${v["fees_paid"]}</td>
                        <td>${v["expiry"]}</td>`
    tableBody.appendChild(tr);
    });
    })

filter.addEventListener("change",(e)=>{


    

if(e.target.value == "all")
{
    sendMail.style.backgroundColor = "tomato"
sendMail.disabled = true

    let tableBody = document.getElementById("table_body");
    tableBody.innerHTML = ""
    fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
    r.map((v)=>{
     let tr = document.createElement("tr")
     tr.innerHTML = `   <td>${v["id"]}</td>
                        <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td>
                        <td>${v["name"]}</td>
                        <td>${v["whatsapp"]}</td>
                        <td>${v["gmail"]}</td>
                        <td>${v["membership_date"]}</td>
                        <td>${v["membership_duration"]}</td>
                        <td>${v["fees_paid"]}</td>
                        <td>${v["expiry"]}</td>`
    tableBody.appendChild(tr);
    });
    })

}else{
    let tableBody = document.getElementById("table_body");
    tableBody.innerHTML = ""
    fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
    r.map((v)=>{
    if(isExpired(v["expiry"]))
    {
        sendMail.disabled = false;
        sendMail.style.backgroundColor = "lightgreen"
        let tr = document.createElement("tr")
        tr.innerHTML = `   <td>${v["id"]}</td>
                           <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td>
                           <td>${v["name"]}</td>
                           <td>${v["whatsapp"]}</td>
                           <td>${v["gmail"]}</td>
                           <td>${v["membership_date"]}</td>
                           <td>${v["membership_duration"]}</td>
                           <td>${v["fees_paid"]}</td>
                           <td>${v["expiry"]}</td>`
                           
       tableBody.appendChild(tr);
    }
    });
    })
}

})

document.getElementById("printButton").addEventListener("click", function() {
    window.print();
});


// document.addEventListener("DOMContentLoaded", function() {

//     const printButton = document.getElementById("printButton");

    
//     printButton.addEventListener("click", function() {
        
//         const tableContent = document.getElementById("membership-table").outerHTML;

        
//         const printWindow = window.open('', '', 'height=600,width=800');

        
//         printWindow.document.write('<html><head><title>Print Table</title>');

        
//         printWindow.document.write('<style>');
//         printWindow.document.write('table { width: 100%; border-collapse: collapse; }');
//         printWindow.document.write('th, td { border: 1px solid #000; padding: 10px; text-align: left; }');
//         printWindow.document.write('</style>');
//         printWindow.document.write('</head><body>');
//         printWindow.document.write(tableContent);
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//     });
// });

