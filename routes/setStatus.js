var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    data = req.body;
    console.log(data);
    todo.methods.setStatus(data.id, data.status)
        .send({ from: coinbase, gas : 6000000 });
    res.send("status changed")
});

module.exports = router;
