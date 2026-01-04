const express=require("express");
const app=express();
const port=8080
const path=require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride=require("method-override")
app.use(methodOverride("_method"));


app.use(express.urlencoded({extended:true}));
let posts=[
    {   id:uuidv4(),
        username:"Niraj2882kumar",
        content:"its been a while",
    },
    {    id:uuidv4(),
        username:"Aman",
        content:"here i am at nashik",
    },

]

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
res.render ("index.ejs",{posts})
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})

app.get("/posts/:id",(req,res)=>{
  
    const {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    console.log(post);
    
    if (!post) {
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs",{post});

})

app.patch("/posts/:id/",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect(`/posts`);
})

app.get("/posts/:id/delete",(req,res)=>{
    let {id}=req.params;
    let post=posts.findIndex(p=>id==p.id);
     if (post !== -1) {
        posts.splice(post, 1); // delete post
    }
    res.redirect("/posts")
})

app.post("/posts", (req, res) => {
    const { id,username, content } = req.body;

    posts.push({   id: uuidv4(),username, content });
console.log(req.body);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    const {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})

app.listen(port,()=>{
    console.log(`app is listening to ${port}`);
})