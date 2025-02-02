// Override console.log globally BEFORE defining logger
console.__log = console.log;
console.log = (...args) => {}; // Disable all console.log calls

const allowedLogs = [
    "✅ Database connected successfully", 
    "✅ Your server is up and running...",
    "❌ Database connection failed", 
    "Server started on PORT 4000", 
];

exports.logger = (...args) => {
    if (allowedLogs.some(msg => args.includes(msg))) {
        console.__log(...args); // Use original console.log safely
    }
};
