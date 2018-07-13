$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
function render() {
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function (info) {
      console.log(info);
      var html = template('tpl',info);
      $('tbody').html(html);
      //分页
      $("#page").bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage: currentPage,
        totalPages: Math.ceil(info.total/pageSize),
        onPageClicked:function (a,b,c,page) {
          currentPage = page;
          render();
        }
      });
    }
  })
}



})