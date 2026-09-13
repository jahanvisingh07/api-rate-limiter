API Rate Limiter: The Digital Bouncer 🛑
  https://api-rate-limiter-ver1.onrender.com


Unrestricted traffic spikes can easily overwhelm backend systems and degrade user experience. This project serves as a custom API rate limiter built with Node.js and Express, designed to act as a middleware "bouncer." It monitors incoming traffic and temporarily blocks users who exceed request thresholds, ensuring the backend remains stable and responsive.

🚀 Try It Live

You can test the rate limiter in action right now directly in your browser:

  - Click the Live Demo badge above (or navigate to  https://api-rate-limiter-ver1.onrender.com
).

  - Rapidly refresh the page 6 times.

  - Watch the system intercept the 6th request with a 429 Too Many Requests block.

🧠 How It Works Under the Hood
The Rule: A user is permitted exactly 5 requests every 60 seconds.

The ID Check: The server extracts the real IP address of the incoming request, safely bypassing cloud proxies using the x-forwarded-for header.

The Memory: It tracks request tallies in a high-speed local memory dictionary for instant, zero-latency lookups.

The Block: If an IP hits the route 6 times within a minute, the system intercepts the request and returns the 429 error before it can hit the main server.

The Cleanup: To prevent memory leaks, an asynchronous timer automatically clears the user's record after the 60-second window closes.

🛠️ Tech Stack
Backend: Node.js, Express.js

Deployment: Render (Web Service)

Architecture: Middleware pattern, In-memory data store

🔮 Architecture & Future Scope
This current iteration is optimized for a single-server instance, utilizing local memory for instant execution. For a production-grade environment scaled horizontally across multiple servers, the local JavaScript object would be replaced with a Redis cluster. This upgrade would provide a centralized, high-speed data store, ensuring rate limits are synchronized globally across all load-balanced instances.
