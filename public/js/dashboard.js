function getExpiredMemberships(data) {
    const today = new Date();
    return data.filter(member => {
        const expiryDate = new Date(member.expiry);
        return expiryDate < today;
    });
}

fetch("http://127.0.0.1:8000/memberApi").then(data => data.json()).then((r)=>{
let totalMembers = document.getElementById("totalMembers")
totalMembers.innerHTML = r.length;
const expiredMemberships = getExpiredMemberships(r);
let totalExpiries = document.getElementById("totalExpiries");
totalExpiries.innerHTML = expiredMemberships.length
})







