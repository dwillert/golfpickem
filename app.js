const express = require('express')
const app = express()
const port = 8080
app.listen(port, () => {
    console.log(`app running on port ${port}`)
});
app.use("/", express.static("src"));

app.get('/', (req, res)=>{
    res.sendStatus(200);
})

