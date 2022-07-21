const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// For testing purposes 
app.get("/", (req, res) => {
    res.send("OK");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});