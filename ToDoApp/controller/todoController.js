var bodyParser = require('body-parser')
var urlencodeParser = bodyParser.urlencoded({ extended: false })
// var mongoose = require('mongoose')
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
var data = {
    todo: [],
    done: []
}
module.exports = function (app) {
    //get data
    app.get('/todo', (req, res) => {
        res.render('todo', { todos: data })
    })
    //transit data
    app.post('/todo:marker', urlencodeParser, (req, res) => {
        //use a marker to 
        var marker = req.params.marker;
        switch (marker) {
            case 'todo-add':
                data.todo.push(req.body);
                break;
            case 'todo-recover':
                var index = data.done.findIndex(function (item) {
                    return (item.content + item.randNum) == (req.body.content + req.body.randNum);
                })
                data.done.splice(index, 1);
                data.todo.push(req.body);
                break;
            case 'completed':
                var index = data.todo.findIndex(function (item) {
                    return (item.content + item.randNum) == (req.body.content + req.body.randNum);
                })
                data.todo.splice(index, 1);
                data.done.push(req.body);
                break;
            default:
                console.log('Oops, something wrong.');
        }
        res.json(data);
    })
    //delete data
    //NOTE: if content contains english mark?, # or %, it can not be deleted directly
    app.delete('/todo:context', (req, res) => {
        var context = req.params.context;
        data.todo = data.todo.filter(function (item) {
            return (item.content + item.randNum) !== context;
        });
        data.done = data.done.filter(function (item) {
            return (item.content + item.randNum) !== context;
        });
        res.json(data);
    })
}