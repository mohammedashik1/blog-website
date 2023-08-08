import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from 'lodash';


const homeStartingContent =
  "An innovative software developer with the interest in softwareDevelopment, I am seeking a role which allows me to continue Learning and perfecting my skills as I provide high-quality work, am way to flexible and has a great leadership quality multiple tasks on daily basis";

const aboutContent =
  "you can talk about your day to day activites in my blog site.";

const contactContent =
  "contact me through gmail:";

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];


  
  app.get("/",function(req,res){
    res.render("home.ejs",{
      startingContent :homeStartingContent,
      posts : posts   
   });
    
  });

  app.get("/about",function(req,res){
    res.render("about.ejs", {aboutUs :aboutContent});

  });

  app.get("/contact",function(req,res){
    res.render("contact.ejs", {contactUs :contactContent});
  });

  app.get("/compose",function(req,res){
      res.render("compose.ejs");
  });


  app.post("/compose",function(req,res){
    const post = {
      Title : req.body.postTitle,
      Body  : req.body.postBody
    };
     posts.push(post);

     res.redirect("/");
  });

  app.get("/posts/:postName",function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.Title);
      
      if (storedTitle == requestedTitle){
          res.render("post.ejs" ,{
            Title : post.Title,
            Body : post.Body

          });
      }
    });

  });










  app.listen(3000, function () {
    console.log("Server started on port 3000");
  });