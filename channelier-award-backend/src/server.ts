import app from './app';
let port=process.env.NODE_ENV=='prod'?5003:5002

app.listen(port, async function() {
    console.log("server running...");
});