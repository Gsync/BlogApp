/*jshint esversion:6*/

const express     = require('express'),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      app         = express(),
      PORT        = process.env.PORT || 5000;

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//DATABASE CONFIG
mongoose.connect("mongodb://localhost/blogapp");

//DB SCHEMA
var blogSchema = new mongoose.Schema({
                           title:   String,
                           image:   String,
                           body:    String,
                           created: {type: Date, default: Date.now}
                                    });

var Blog = mongoose.model("Blog", blogSchema);

//CREATE COLLECTION DATA
Blog.create({
    title: "Test Blog",
    image: ""
            });

//RESTFUL ROUTES

app.get("/", function(req, res) {
  res.send("<h1>hello from server</h1>");
});



app.listen(PORT, function() {
  console.log("Server is running on: " + PORT);
});