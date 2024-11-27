let whatsapp = document.getElementById("whatsapp");
whatsapp.addEventListener("change", (e) => {
  fetch(`${window.location.origin}/memberApi`)
    .then((data) => data.json())
    .then((r) => {
      for (i = 0; i < r.length; i++) {
        if (r[i]["whatsapp"] == e.target.value) {
          let submit = document.getElementById("submit");
          submit.disabled = true;
          submit.style.backgroundColor = "tomato";
          document.getElementById(
            "data_status"
          ).innerHTML = `<p style="color:tomato">${e.target.value} already exist</p>`;
          return;
        } else {
          document.getElementById("data_status").innerHTML = ``;
          let submit = document.getElementById("submit");
          submit.disabled = false;
          submit.style.backgroundColor = "#007BFF";
        }
      }
    });
});



  let submit  = document.getElementById("submit")
  submit.addEventListener("click",(e)=>{
    submit.textContent = "Adding Member ..."
    submit.style.backgroundColor = "tomato"
  })


  const fileInput = document.getElementById('file-upload');
const fileNameDisplay = document.getElementById('file-upload-name');

fileInput.addEventListener('change', function() {
    const fileName = this.files[0]?.name || 'No file selected';
    fileNameDisplay.textContent = fileName;
});
