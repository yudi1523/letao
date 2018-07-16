$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        var html = template('tpl',info);
        $('tbody').html(html);
        //渲染分页
        $('#page').bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本
          size: 'small',  //设置分页控件的大小
          currentPage: currentPage, //设置当前页
          totalPages: Math.ceil(info.total / info.size), //设置总页数,需要计算
          onPageClicked: function(a,b,c,p){
            currentPage = p ;
            render();
          }
        })
      }
    })
  }

  //点显示模态框
  $('.btn_add').on('click',function () {
    $('#addModal').modal('show');
    //请求ajax渲染第一个分类
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function (info) {
        var html = template('tpl2',info);
        $('.dropdown-menu').html(html);
     
       
      }
    })
  })

  //给每一个a注册点击事件
  $('.dropdown-menu').on('click','a',function () {
    var id = $(this).data('id');
    $('.dropdownText').text($(this).text());
    $('#categoryId').val(id);
    //手动校验成功

    $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //图片上传功能
  $("#fileupload").fileupload({
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      $('.img-box img').attr('src',data.result.picAddr);
      $('[name="brandLogo"]').val(data.result.picAddr)
      //手动校验成功
      $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
});

//表单校验
var $form = $("form");
$form.bootstrapValidator({
        excluded: [],
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
          //校验用户名，对应name表单的name属性
          categoryId: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择一级分类'
              },
            }
          },
          brandName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择一级分类'
              },
            }
          },
          brandLogo: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请选择一级分类'
              },
            }
          }
        }
  
    })

    //给表单注册验证成功事件
    $("#form").on('success.form.bv', function (e) {
      e.preventDefault();
      //使用ajax提交逻辑
      $.ajax({
        type:'post',
        url:'/category/addSecondCategory',
        data:$form.serialize(),
        success:function (info) {
          if(info.success){
            //模态框隐藏
            $('#addModal').modal('hide');
            //重新渲染
            currentPage = 1;
            render();

            //清空模态框
            $form[0].reset();
            $form.data('bootstrapValidator').resetForm();
            //手动重置
            $(".dropdownText").text("请选择一级分类");
            $("[name='categoryId']").val('');
            $(".img-box img").attr("src", "images/none.png");
            $("[name='brandLogo']").val('');

          }
        }
      })
  });
})