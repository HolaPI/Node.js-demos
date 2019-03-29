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
// var data = {
//     todo: [
//         {
//             content: 'welcome to be here',
//             randNum: '123'
//         },
//         {
//             content: 'have you finished your work today',
//             randNum: ''
//         },
//         {
//             content: 'good to see you here',
//             randNum: ''
//         },
//         {
//             content: 'you readlly did a great job today',
//             randNum: ''
//         }
//     ],
//     done: [
//         {
//             content: 'wow, quite a nice today',
//             randNum: ''
//         },
//         {
//             content: 'this is a testing line',
//             randNum: ''
//         }
//     ]
// }
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
        if (marker === 'todo') {
            data.todo.push(req.body);
        }
        if (marker === 'completed') {
            var index = data.todo.findIndex(function (item) {
                return (item.content + item.randNum) == (req.body.content + req.body.randNum);
            })
            data.todo.splice(index, 1);
            data.done.push(req.body);
        }
        res.json(data);
    })
    //delete data
    app.delete('/todo:context', (req, res) => {
        data.todo = data.todo.filter(function (item) {
            return (item.content + item.randNum) !== req.params.context;
        });
        data.done = data.done.filter(function (item) {
            return (item.content + item.randNum) !== req.params.context;
        });
        res.json(data);
        // console.log(data)
    })
}