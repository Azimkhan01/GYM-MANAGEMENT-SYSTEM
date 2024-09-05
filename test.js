require("dotenv").config()

function getRandomDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end - start;
    const randomTime = Math.random() * diff + start.getTime();
    return new Date(randomTime).toISOString().split('T')[0];
}

function getRandomDuration() {
    const durations = ["1-month", "3-months", "6-months", "1-year"];
    return durations[Math.floor(Math.random() * durations.length)];
}

function getRandomFees() {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
}

function getRandomOffer() {
    const offers = ["10% off", "20% off", "Buy 1 Get 1 Free", "Free Trial", "15% off on next purchase"];
    return offers[Math.floor(Math.random() * offers.length)];
}

function getImageURL(id) {
    return `/public/image/${id}.jpg`;
}

const data = [];

for (let i = 1; i <= 1000; i++) {
    const membershipDate = getRandomDate("2023-01-01", "2024-12-31");
    const duration = getRandomDuration();
    const expiry = getRandomDate(membershipDate, "2025-12-31");
    const feesPaid = getRandomFees();
    const offer = getRandomOffer();
    const image = '/public/image/jp-1.jpg';

    const entry = {
        id: `${process.env.gymName}-${i}`,
        name: `Name ${i}`,
        whatsapp: `7${Math.floor(Math.random() * 1000000000)}`,
        gmail: `user${i}@example.com`,
        membership_date: membershipDate,
        membership_duration: duration,
        fees_paid: feesPaid,
        expiry: expiry,
        offer: offer,
        image: image
    };

    data.push(entry);
}

const {membership} = require("./database/registeredUser");
let enter = membership.create(data);
console.log(enter)
