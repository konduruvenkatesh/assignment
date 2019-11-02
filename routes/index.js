var express = require('express');
var router = express.Router();
let salaryController = require("../controller/salaryController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/calculateSalary', salaryController.calculateSalary);

module.exports = router;
