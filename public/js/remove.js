let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (e) => {
  fetch("http://127.0.0.1:8000/memberApi")
    .then((data) => data.json())
    .then((r) => {
      for (i = 0; i < r.length; i++) {
        // console.log(e.target.value)
        if (r[i]["id"] == e.target.value) {
          let resultSection = document.getElementById("resultSection");
          let deleteButton = document.getElementById("deleteButton");
          deleteButton.disabled = false;
          deleteButton.style.backgroundColor = "#444444";
          resultSection.innerHTML = `
      <div id="membershipDetails" class="membershipDetails">
      <img src="${r[i]["image"]}"  alt="${r[i]["name"]}" class="passport-image">
      <p><strong>ID:</strong> <span id="id">${r[i]["id"]}</span></p>
        <p><strong>Name:</strong> <span id="name">${r[i]["name"]}</span></p>
                <p><strong>Phone Number:</strong> <span id="phone">${r[i]["whatsapp"]}</span></p>
                <p><strong>Duration:</strong> <span id="duration">${r[i]["membership_duration"]}</span></p>
                <p><strong>Start Date:</strong> <span id="startDate">${r[i]["membership_date"]}</span></p>
                <p><strong>Expiry Date:</strong> <span id="expiryDate">${r[i]["expiry"]}</span></p></div>`;
          return;
        } else {
          // console.log("not found")
          let resultSection = document.getElementById("resultSection");
          resultSection.innerHTML =
            '<p id="resultText">Search result will appear here...</p>';
          let resultText = document.getElementById("resultText");
          resultText.textContent = `${e.target.value} not found`;
          let deleteButton = document.getElementById("deleteButton");
          deleteButton.disabled = true;
          deleteButton.style.backgroundColor = "tomato";
        }
      }
    });
});

let memberSearchInput = document.getElementById("memberSearchInput");

memberSearchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();

  fetch("http://127.0.0.1:8000/memberApi")
    .then((response) => response.json())
    .then((data) => {
      // Filter results based on the search term
      const results = data.filter(
        (item) =>
          item["name"].toLowerCase().includes(searchTerm) ||
          item["whatsapp"].toLowerCase().includes(searchTerm) ||
          item["id"].toLowerCase().includes(searchTerm) ||
          item["membership_date"].toLowerCase().includes(searchTerm)
      );

      if (results.length != data.length) {
        let searchTable = document.getElementById("searchTable");
        searchTable.innerHTML = "";
        results.filter((value) => {
          let tr = document.createElement("tr");
          tr.id = value["id"];
          tr.innerHTML = `<td>jp-1</td>
                            <td>${value["name"]}</td>
                            <td>${value["whatsapp"]}</td>
                            <td>${value["membership_date"]}</td>
                            <td>${value["membership_duration"]}</td>
                            <td>${value["expiry"]}</td>
                            <td>${value["fees_paid"]}</td>
                            <td>${value["offer"]}</td>`;

          searchTable.appendChild(tr);
        });
      } else {
        let searchTable = document.getElementById("searchTable");
        searchTable.innerHTML = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});
