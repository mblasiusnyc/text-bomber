var express = require('express');
var router = express.Router();
var models = require('../models');

//--------REQUEST TO VIEW AN INDIVIDUAL PAGE--------------
router.get('/:url', function(req, res){
    var url_name = req.params.url;
  models.UserRequest.findOne({"url_name": url_name}, function(err, page){
    console.log(page);
    res.render('individual', { request: page});
  });
});



module.exports = router;