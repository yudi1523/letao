$(function () {
  var currentPage= 1;
  var pageSize=2;
  render();
  function render() {
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
 
        var html = template('tpl',info);
        $('tbody').html(html);
        //分页
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function (a,b,c,page) {
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $('.btn_add').on('click',function () {
    $('#addModal').modal('show')
  })

  //表单校验

  $('form').bootstrapValidator({
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName:{

        validators:{
          notEmpty:{
            message:"请输入一级分类的名称"
          }
        }

      }
    }
  })
//
  
})