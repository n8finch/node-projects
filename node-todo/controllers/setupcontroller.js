var Todos = require('../models/todoModel');

module.exports = function (app) {
    app.get('/api/setupTodos', function (req, res) {

        //seed the database
        var starterTodos = [{
                username: 'test',
                todo: 'Buy milk',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'tester',
                todo: 'Feed dog',
                isDone: false,
                hasAttachment: false
            },
            {
                username: 'testing',
                todo: 'Learn Node',
                isDone: false,
                hasAttachment: false
            },
        ];
        Todos.create(starterTodos, function (err, results) {
            res.send(results);
        });
    });
}