$(function () {
  var currentPage= 1;
  var pageSize=5;
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
//表单验证完成后阻止默认时间,并发送ajax请求
  $('form').on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$('form').serialize(),
      success:function (info) {
        if(info.success){

        //添加成功
        //关闭模态框
        $('#addModal').modal('hide');
        //重新渲染第一页
        currentPage = 1;
        render();

        //模态框数据重置
        $('form').data('bootstrapValidator').resetForm(true);
        $('form')[0].reset();
        }
      }
    })
  })

  
})