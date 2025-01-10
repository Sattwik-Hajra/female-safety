const mongoose = require('mongoose');
const newPost = require('./models/post');

main().then(() => console.log('connected successfully')).catch((e => console.log(e)))
async function main() {
    await mongoose.connect('mongodb://localhost:27017/Pbl');
}
newPost.insertMany([
    {
        username: "abc",
        message: "thsi is ...."
    },
    {
        username: "xyz",
        message: "secondd message"
    }
]);