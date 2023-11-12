var express = require('express');
var router = express.Router();
var user_schema = require('../models/user')

var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/adddata', async function (req, res, next) {
  try {
    console.log(req.body);
    var data = await user.create(req.body)
    res.status(201).json({
      status: 'success',
      data
    })
  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'err'
    })
  }
});


router.post('/logindata', async function (req, res) {
  try {
    var data = await user_schema.find({ email: req.body.email })
    var [data] = data
    if (req.body.email == data.email) {
      var id = data._id
      var token = jwt.sign({ id }, 'hello');
      console.log(token);
      res.status(201).json({
        status: 'success',
        data,
        token
      })
    }
    else {
      console.log('error new');
      res.status(401).json({
        status: 'error'
      })
    }
  }
  catch {
    console.log('error');
    res.status(401).json({
      status: 'error'
    })
  }
})


router.post('/token',  async function (req, res, next) {
  try {
    console.log(req.headers.authorization);
    var decoded = jwt.verify(req.headers.authorization, 'hello');

    var data = await user_schema.findById(decoded.id)
    console.log(data);
    res.status(201).json({
      status: 'success',
      data
    })
  }
  catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'err'
    })
  }
});


module.exports = router;
