var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    //Get all todos
    app.get('/api/todos/', function (req, res) {

        Todos.find({
                username: new RegExp(/\w/, 'i')
            },
            function (err, todos) {
                if (err) throw err;

                res.send(todos);
            });

    });


    //Get by username
    app.get('/api/todos/:uname', function (req, res) {

        Todos.find({
                username: req.params.uname
            },
            function (err, todos) {
                if (err) throw err;

                res.send(todos);
            });

    });

    //Get by ID
    app.get('/api/todo/:id', function (req, res) {
        Todos.findById({
                _id: req.params.id
            },
            function (err, todo) {
                if (err) throw err;

                res.send(todo);
            });
    });

    app.post('/api/todo', function (req, res) {
        if (req.body.id) {
            Todos.findByIdAndUpdate(req.body.id, {
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            }, function (err, todo) {
                if (err) throw err;

                res.send('Successfully saved');
            });
        } else {

            var newTodo = Todos({
                username: 'testnew',
                todo: req.body.todo,
                isDone: req.body.isDone,
                hasAttachment: req.body.hasAttachment
            });
            newTodo.save(function (err) {
                if (err) throw err;

                res.send('Successfully added');
            });
        }

    });

    app.delete('/api/todo', function (req, res) {

        Todos.findByIdAndRemove(req.body.id, function (err) {
            if (err) throw err;

            res.send('Successfully deleted');
        });

    });

};