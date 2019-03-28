var bodyParser = require('body-parser')
// var mongoose = require('mongoose')
var urlencodeParser = bodyParser.urlencoded({ extended: false })
// connect remote database======================
// mongoose.connect('mongodb+srv://root:root@cluster0-g1e1r.azure.mongodb.net/test?retryWrites=true')
//create schema=================================
// var todoSchema = new mongoose.Schema({
//     item: String
// })
// save data to database========================
// var Todo = mongoose.model('Todo', todoSchema)
// Todo({ item: 'hello world' }).save(function (err, data) {
//     if (err) throw err;
//     console.log('item saved')
// })
var data = [
    { item: 'welcome to be here' },
    { item: 'have you finished your work today' },
    { item: 'good to see you here' },
    { item: 'you readlly did a great job today' }
]

module.exports = function (app) {
    //get data
    app.get('/todo', (req, res) => {
        res.render('todo', { todos: data })
    })
    //transit data
    app.post('/todo', urlencodeParser, (req, res) => {
        data.push(req.body);
    })
    //delete data
    app.delete('/todo:context', (req, res) => {
        // console.log(req.params.context)
        data = data.filter(function (item) {
            return item.item !== req.params.context;
        });
        res.json(data);
    })
}