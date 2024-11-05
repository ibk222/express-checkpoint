const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Custom middleware to verify the time of the request
function timeCheck(req, res, next) {
  const currentHour = new Date().getHours();
  if (currentHour < 9 || currentHour > 17) {
    return res
      .status(403)
      .send("Access is restricted to business hours (9 AM - 5 PM).");
  }
  next();
}

// Use the custom middleware
app.use(timeCheck);

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/services", (req, res) => {
  res.sendFile(__dirname + "/public/services.html");
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/public/contact.html");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
