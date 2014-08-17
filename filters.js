var marked = require('marked');
var swig = require('swig');

module.exports = function(swig) {

  var page_link = function (userRequest) {
    return "<a href='/individual/"+userRequest.url_name+"'>"+userRequest.title+"</a>";
  };

  page_link.safe = true;

  swig.setFilter('page_link', page_link);

  var marked = require('marked');
  var markedFilter = function (body) {
    return marked(body);
  };
  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);
};