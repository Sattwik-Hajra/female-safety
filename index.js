const express = require('express');
const app = express();
const mongoose = require('mongoose');
const newPost = require('./models/post')
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

main().then(() => console.log('connected successfully')).catch((e => console.log(e)))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/Pbl');
}
app.get('/', (req, res) => {
    res.render("index.ejs");
});
app.get("/videos", (req, res) => {
    res.render("videos.ejs");
});
app.get("/gadgets", (req, res) => {
    res.render("gadgets.ejs");
});
app.get("/helplines", (req, res) => {
    res.render("helplines.ejs");
})
app.get("/rights", (req, res) => {
    res.render("rights.ejs");
});
app.get('/alert',(req,res)=>{
    res.render('alert.ejs')
})

app.get('/aa', (req, res) => {

    res.render('new.ejs');
});

///////posts rout
app.get('/posts', async (req, res) => {
    let posts = await newPost.find()

    res.render('posts.ejs', { posts });
});
app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});
app.post('/posts', (req, res) => {
    let { username, message } = req.body;
    console.log(username, message);
    let newpost1 = new newPost({
        username,
        message,
        createdAt: Date.now()

    })
    newpost1.save();
    res.redirect('/posts');
});

app.get('/posts/:id/edit', async (req, res) => {
    let id = req.params.id;

    let post = await newPost.findById(id);

    res.render('edit.ejs', { post });
});
app.put('/posts/:id', async (req, res) => {
    let id = req.params.id;
    let { username, message } = req.body;

    await newPost.findByIdAndUpdate(id, { username: username, message: message, createdAt: Date.now() }, { runValidators: true, new: true });
    res.redirect('/posts');

});
app.delete('/posts/:id', async (req, res) => {
    let id = req.params.id;
    await newPost.findByIdAndDelete(id);
    res.redirect('/posts');

});

app.get('*',(req,res)=>{
    res.send('404 no such route found')
})

app.listen(8080,(req,res)=>{
    console.log('The app is listing on port number 8080 ');
});