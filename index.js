const express = require('express');
const app = express();

const localNotepad = {};

const rateLimiter = (req, res, next) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const maxRequests = 5;

    if (!localNotepad[userIp]) {
        localNotepad[userIp] = 0;
        setTimeout(() => {
            localNotepad[userIp] = 0;
        }, 60000);
    }

    localNotepad[userIp] += 1;

    // THE GAME OVER SCREEN (Blocked)
    if (localNotepad[userIp] > maxRequests) {
        return res.status(429).send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>GAME OVER</title>
                <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
                <style>
                    body { background-color: #900000; color: #fff; font-family: 'Press Start 2P', cursive; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100vh; margin: 0; animation: shake 0.5s infinite; }
                    h1 { color: #ffeb3b; text-shadow: 4px 4px 0px #000; font-size: 40px; }
                    p { line-height: 1.5; font-size: 14px; margin-top: 20px;}
                    .sprite { font-size: 100px; margin-bottom: 20px; }
                    @keyframes shake { 0% { transform: translate(2px, 1px) rotate(0deg); } 10% { transform: translate(-1px, -2px) rotate(-1deg); } 20% { transform: translate(-3px, 0px) rotate(1deg); } 30% { transform: translate(0px, 2px) rotate(0deg); } 40% { transform: translate(1px, -1px) rotate(1deg); } 50% { transform: translate(-1px, 2px) rotate(-1deg); } 60% { transform: translate(-3px, 1px) rotate(0deg); } 70% { transform: translate(2px, 1px) rotate(-1deg); } 80% { transform: translate(-1px, -1px) rotate(1deg); } 90% { transform: translate(2px, 2px) rotate(0deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } }
                </style>
            </head>
            <body>
                <div class="sprite">🛑</div>
                <h1>GAME OVER</h1>
                <p>THE BOUNCER CAUGHT YOU SPAMMING.</p>
                <p>WAIT 60 SECONDS TO RESPAWN.</p>
            </body>
            </html>
        `);
    }

    next();
};

app.use(rateLimiter);

// THE LEVEL CLEARED SCREEN (Welcome)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Secret Club</title>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
            <style>
                body { background-color: #1a1a2e; color: #4ecca3; font-family: 'Press Start 2P', cursive; text-align: center; display: flex; flex-direction: column; justify-content: center; height: 100vh; margin: 0; }
                h1 { color: #fff; text-shadow: 4px 4px 0px #e94560; font-size: 40px; }
                p { line-height: 1.5; font-size: 12px; margin-top: 20px; color: #a9a9b3;}
                .sprite { font-size: 100px; animation: float 2s ease-in-out infinite; margin-bottom: 20px; }
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
            </style>
        </head>
        <body>
            <div class="sprite">👾</div>
            <h1>LEVEL 1 CLEARED</h1>
            <p>ACCESS GRANTED. YOU GOT PAST THE DIGITAL BOUNCER.</p>
        </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});