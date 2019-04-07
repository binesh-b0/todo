var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    todo.methods.newTask(data.id, data.title, data.status)
        .send({ from: coinbase, gas : 6000000 });
    res.send("task added")
});

module.exports = router;
