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

//点击弹出模态框 异步渲染,要用事件委托

$('tbody').on('click','.btn',function () {
  $('#userModal').modal('show');
  var id = $(this).parent().data('id');
  // console.log(id);
  var isDelete = $(this).hasClass('btn-danger')?0:1;
  $('.btn_confirm').off().on('click',function () {
    
    $.ajax({
      type:'post',
      url:'/user/updateUser',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function (info) {
        if(info.success){
          //关闭模态框
          $("#userModal").modal("hide");
          //重新渲染表格
          render();
        }
      }
    })
  })
})






})