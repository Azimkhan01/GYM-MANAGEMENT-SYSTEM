let yValue = Array(12).fill(0); // Initialize an array with 12 zeros

function addMonth(month) {
    // Increment the value for the given month
    if (month >= 0 && month < 12) {
        yValue[month]++;
    }
}

function getExpiredMemberships(data) {
    const today = new Date();
    return data.filter(member => {
        const expiryDate = new Date(member.expiry);
        return expiryDate < today;
    });
}

fetch("http://127.0.0.1:8000/memberApi")
    .then(data => data.json())
    .then(r => {
        let totalMembers = document.getElementById("totalMembers");
        totalMembers.innerHTML = r.length;

        const expiredMemberships = getExpiredMemberships(r);
        let totalExpiries = document.getElementById("totalExpiries");
        totalExpiries.innerHTML = expiredMemberships.length;

        let xValue = [];
        let barColors = [
            "#FF5733", "#33FF57", "#3357FF", "#F0F33F", "#FF33F6", "#33FFF0",
            "#F4A742", "#4A90E2", "#E94E77", "#B5E8E0", "#D4E157", "#E67E22"
        ];

        let now = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Populate xValue with month names
        for (let i = 0; i < 12; i++) {
            xValue[i] = monthNames[i];
        }

        // Process dates
        let allDate = r.map(member => member.membership_date);
        let year = now.getFullYear();

        for (let i = 0; i < allDate.length; i++) {
            let mon = new Date(allDate[i]);
            if (mon.getFullYear() === year) {
                let monthIndex = mon.getMonth();
                if (monthIndex <= now.getMonth()) {
                    addMonth(monthIndex);
                }
            }
        }

        // Adjust colors based on yValue
        for (let i = 0; i < yValue.length; i++) {
            if (yValue[i] < 5) {
                barColors[i] = "tomato";
            }
        }

        // Create the chart
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValue,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValue
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: `Member per Month in ${now.getFullYear()}`
                }
            }
        });
    });
