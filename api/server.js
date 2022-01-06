const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("../api/routes/api/users.js");
const config = require('config');
const app = express();
const fs = require("fs");
require('dotenv').config();
const tls = require('spdy');
const key_file = process.env.KEY_FILE 
const cert_file = process.env.CERT_FILE 


//const options = {
// key: fs.readFileSync(key_file),
// cert: fs.readFileSync(cert_file),
 
//}

//const server = tls.createServer(options, app);
// Body parser middleware
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
// DB Config
const db = config.get('mongoURI');
// Connect to MongoDB
mongoose
    .connect(
        db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", usersRouter);

/* //Serve static assets if in production
if (process.env.NODE_ENV = "production") {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
 */

//const port = process.env.PORT || 5000;
//server.listen(port, (error)=>{
    //if (error){
        //console.log("An error occured", error);
    //}
    //else {
        ///console.log("Server Successfuly connected");
    //}
//});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
