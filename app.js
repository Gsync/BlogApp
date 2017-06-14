/*jshint esversion:6*/

const express         = require('express'),
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override'),
      mongoose        = require('mongoose'),
      app             = express(),
      PORT            = process.env.PORT || 5000;

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

// CREATE COLLECTION DATA
// Blog.create({
//     title: "Test Blog",
//     image: "images/scene.jpg",
//     body: "Beautiful scenery"
//             });

//---RESTFUL ROUTES---//

//Index Route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("Error!");
    } else {
  res.render("index", {blogs: blogs});
    }
  });
});

//Root Route
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

//New Route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//Create Route
app.post("/blogs", function(req, res) {
  Blog.create(req.body.blog, function(err) {
    if (err) {
      console.log("Error!");
    } else {
      res.redirect("/blogs");
    }
  });
});

//Show Route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      console.log("Error!");
    } else {
      res.render("show", {blog: blog});
    }
  });
});

//Edit Route
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {blog: blog});
    }
  });
});

//Update Route
app.put("/blogs/:id", function(req, res) {
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id); //Redirects to show page
    }
  });
});

app.listen(PORT, function() {
  console.log("Server is running on: " + PORT);
});
