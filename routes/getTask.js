var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
  data = req.query;
  console.log(data);
  todo.methods.getTask(data.id)
      .call({ from: coinbase }).then((val) => {
          console.log(val); 
          res.render("index", {myData : val});
      })
});

module.exports = router;
