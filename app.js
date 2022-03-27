const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Competitive programming is a sport, perhaps even a form of art. It’s an activity that requires creativity and analytical thinking to tackle difficult coding problems.Competitive programming includes events (usually held over the internet) where participants, called sport programmers, solve specific problems or puzzles.Competitive programming includes events (usually held over the internet) where participants, called sport programmers, solve specific problems or puzzles"
const aboutContent = "You can Practice Programming and challenge yourself with Brainstorming problems at sites like codeforces , codechef , hackerrank , leetcode , topcode , atcoder , hacker earth etc.";
const contactContent = "I am a sophomore at YMCA Faridabad , pursuing Btech from IT Branch. I love solving programming Problems . I am relatively a beginner to CP but i work very hard . My dream is to work at a very good company as software developer and also to give comfort life to my parents. I am from hansi/hisar city , i am a punjabi and our roots are in Multan region of punjab. ";

const app = express();
mongoose.connect('mongodb+srv://Paras_Nagpal:P1ras234@cluster0.suwiu.mongodb.net/blogDB' , {useNewUrlParser : true });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const postSchema = {
  title : String ,
  content : String
};

const Post = mongoose.model("Post" , postSchema);


app.get('/' , function(req,res){
  Post.find({} , function(err,posts){
    res.render("home" , {
      startingContent : homeStartingContent ,
      posts : posts
    })
  })
});

app.get('/about' , function(req,res){
  res.render("about" , {aboutContent : aboutContent })
});

app.get('/contact' , function(req,res){
  res.render("contact" , {contactContent : contactContent })
});

app.get('/compose' , function(req,res){
  res.render("compose")
});

app.post('/compose' , function(req,res){
//  console.log(req.body.postBody)
  const post = new Post({
       title : req.body.postTitle ,
       content : req.body.postBody
  });
   post.save(function(err){
     if(!err){
       res.redirect("/")
     }
   })
});

app.get("/posts/:postId" , function(req,res){
//  const requestedTitle = _.lowerCase( req.params.postName)    ;
  const requestedPostId = req.params.postId ;
//  posts.forEach(function(post){
//  const storedTitle =   _.lowerCase(post.title)   ;
     Post.findOne({_id : requestedPostId} , function(err,post){
       res.render("post" , {
         title : post.title ,
         content : post.content
       })
     })


  //})
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server has been started successfully");
});
