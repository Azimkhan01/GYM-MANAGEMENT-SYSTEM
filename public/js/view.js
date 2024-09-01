let filter = document.getElementById("filter");
let commaNumber = document.getElementById("commaNumber")
let copy = document.getElementById("copy")
copy.style.display = "none"
function isExpired(expiryDate) {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
}

 function copyIt() {
  // Get the text element
  var text = document.getElementById("commaNumber").innerText;
  
  // Create a temporary input element to copy the text
  var tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  
  // Select the text and copy it
  tempInput.select();
  document.execCommand("copy");
  
  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Show feedback message
  document.getElementById("commaNumber").innerText = "Text copied to clipboard!";

  copy.style.display = "none"
}

let sendMail = document.getElementById("sendMail");
sendMail.style.backgroundColor = "tomato";
sendMail.disabled = false;
let tableBody = document.getElementById("table_body");

fetch("http://127.0.0.1:8000/memberApi")
  .then((data) => data.json())
  .then((r) => {
    r.map((v) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `   <td>${v["id"]}</td>
                         <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td> 
                        <td>${v["name"]}</td>
                        <td>${v["whatsapp"]}</td>
                        <td>${v["gmail"]}</td>
                        <td>${v["membership_date"]}</td>
                        <td>${v["membership_duration"]}</td>
                        <td>${v["fees_paid"]}</td>
                        <td>${v["expiry"]}</td>
                        <td>${v["offer"]}</td>`;
      tableBody.appendChild(tr);
    });
  });

filter.addEventListener("change", (e) => {
  if (e.target.value == "all") {
    sendMail.style.backgroundColor = "tomato";
    sendMail.disabled = true;

    tableBody.innerHTML = "";
    fetch("http://127.0.0.1:8000/memberApi")
      .then((data) => data.json())
      .then((r) => {
        r.map((v) => {
          let tr = document.createElement("tr");
          tr.innerHTML = `   <td>${v["id"]}</td>
                        <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td>
                        <td>${v["name"]}</td>
                        <td>${v["whatsapp"]}</td>
                        <td>${v["gmail"]}</td>
                        <td>${v["membership_date"]}</td>
                        <td>${v["membership_duration"]}</td>
                        <td>${v["fees_paid"]}</td>
                        <td>${v["expiry"]}</td>
                        <td>${v["offer"]}</td>`;
          tableBody.appendChild(tr);
        });
      });
  } else {
    tableBody.innerHTML = "";

    fetch("http://127.0.0.1:8000/memberApi")
      .then((data) => data.json())
      .then((r) => {
        r.sort((a, b) => new Date(a["expiry"]) - new Date(b["expiry"]));

        r.map((v) => {
          if (isExpired(v["expiry"])) {
            sendMail.disabled = false;
            sendMail.style.backgroundColor = "lightgreen";

            let tr = document.createElement("tr");
            tr.innerHTML = `
                    <td>${v["id"]}</td>
                    <td><img src="${v["image"]}" alt="${v["name"]}" class="passport"></td>
                    <td>${v["name"]}</td>
                    <td>${v["whatsapp"]}</td>
                    <td>${v["gmail"]}</td>
                    <td>${v["membership_date"]}</td>
                    <td>${v["membership_duration"]}</td>
                    <td>${v["fees_paid"]}</td>
                    <td>${v["expiry"]}</td>
                        <td>${v["offer"]}</td>`;
                    ;

            tableBody.appendChild(tr);
          }
        });
      });
  }
});

document.getElementById("printButton").addEventListener("click", function () {
  window.print();
});

function getExpiredList() {
  // Fetch data from the API and filter for expired memberships
  fetch("http://127.0.0.1:8000/memberApi")
    .then((data) => data.json())
    .then((r) => {
      let expiredList = []; // Correctly declare the expiredList array
      // Loop through the data to find expired memberships
      let expiredWhatsapp = []
      // console.log(expiredWhatsapp+"is the ")
      for (let i = 0; i < r.length; i++) {
        if (isExpired(r[i]["expiry"])) {
          expiredList.push(r[i]["expiry"]);
          let example ="+91"+(r[i]["whatsapp"])
          expiredWhatsapp.push(example)
          
        }
      }
      console.log(expiredWhatsapp)
      // Sort the expired list by date
      expiredList.sort((a, b) => new Date(a) - new Date(b)); // Use the correct variable name
      copy.style.display = "flex"  
      
      document.getElementById("commaNumber").innerHTML = expiredWhatsapp.join(","); // Log the sorted expired list
    })
    .catch((error) => {
      console.error("Error fetching membership data:", error);
    });
}

document.getElementById('sendMail').addEventListener('click', function() {
  document.getElementById("sendMail").style.backgroundColor = 'tomato'
  document.getElementById("sendMail").innerHTML = "Sending please wait...."
  // Add your actual reminder sending logic here
});