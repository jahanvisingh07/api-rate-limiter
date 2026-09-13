const express = require('express');
const app = express();

// Our "local notepad" since the cloud one is blocked by your network
const localNotepad = {};

const rateLimiter = (req, res, next) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const maxRequests = 5;

    // 1. If this is their first visit, set their tally to 0
    if (!localNotepad[userIp]) {
        localNotepad[userIp] = 0;
        
        // Start a 60-second timer to wipe their record clean
        setTimeout(() => {
            localNotepad[userIp] = 0;
        }, 60000);
    }

    // 2. Add a tally mark for this visit
    localNotepad[userIp] += 1;

    // 3. The Bouncer Logic
    if (localNotepad[userIp] > maxRequests) {
        return res.status(429).send("Too many requests! The bouncer blocked you. Wait 60 seconds.");
    }

    // Let them in!
    next();
};

app.use(rateLimiter);

app.get('/', (req, res) => {
    res.send("Welcome to the secret club! You got past the bouncer.");
});

app.listen(3000, () => {
    console.log("Server is running instantly on http://localhost:3000");
});