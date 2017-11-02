var express         =   require("express");
var bodyParser      =   require("body-parser");
var mongoose        =   require("mongoose");
var app             =   express();
var request         =   require("request");
var methodOverride  =   require("method-override");

//app config

mongoose.connect("mongodb://shreyasmurali:shreyas123@ds245615.mlab.com:45615/redditstyleblog");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//mongoose modek config
var blogSchema = new mongoose.Schema({
    
    title   :   String,
    image   :   String,
    body    :   String,
    created :   {type : Date, default : Date.now }
});



var Blog = mongoose.model("Blog",blogSchema);
//RESTful Routes

// Blog.create({
//     title :"test2",
//     image : "https://thumb7.shutterstock.com/display_pic_with_logo/1295602/400068991/stock-photo-the-taj-mahal-is-an-ivory-white-marble-mausoleum-on-the-south-bank-of-the-yamuna-river-in-the-400068991.jpg",
//     body : "test 2 body"
    
// });


app.get("/",function(req,res)
{
  res.redirect("/blogs");  
});
//index
app.get("/blogs",function(req,res)
{
    Blog.find({},function(err,blogs)
    {
        if (err)
        {console.log(err);}
        else
        {res.render("index",{blogs:blogs});}
    });
    
});
//new
app.get("/blogs/new",function(req,res){
    res.render("new");
}
);
//create
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newblog){
        if(err){console.log(err);}
        else
        {
            res.redirect("/blogs");
        }
    });
});
//show

app.get("/blogs/:id", function(req,res)
{
    Blog.findById(req.params.id, function(err,blogs)
    {
        if(err)
        {
        console.log(err);
            
        }
        
        else
        {
            res.render("show", {blogs:blogs});
            
        }
    });
    
});
//edit
app.get("/blogs/:id/edit",function(req, res) {
    Blog.findById(req.params.id,function(err,blog)
    {
        if(err)
        console.log(err);
      else
      
    res.render("edit",{blog:blog});  
    });
});

//update
app.put("/blogs/:id",function (req,res){
Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog)
{
    if (err){
    res.redirect("/blogs");
    }
    else
    {res.redirect("/blogs/"+req.params.id);
    }
});

   
});


//destroy
app.delete("/blogs/:id",function(req,res)
{
    Blog.findByIdAndRemove(req.params.id,function(err)
{
    if (err){
    res.redirect("/blogs");
    }
    else
    {res.redirect("/blogs");
    }
});

});

//server up
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server is up!");
});
