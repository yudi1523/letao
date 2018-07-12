$(function () {
  //校验表单
  var $form = $('form');
  $form.bootstrapValidator({
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:3,
            max:6,
            message:'密码长度是3-6位'
          },
          callback:{
            message:'用户名错误'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:'用户密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度是6-12位'
          },
          callback:{
            message:'用户名密码错误'
          }
        }
      }
    },
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

  });

  //表单验证完成后,发送ajax请求验证用户名密码,跳转
 $form.on('success.form.bv',function (e) {
  e.preventDefault();//阻止默认事件
   //发送ajax请求
   console.log('hja');
   $.ajax({
     type:'post',
     url:'/employee/employeeLogin',
     data:$form.serialize(),
     success:function (info) {
       if(info.success){
        location.href = 'index.html';
       }
       if(info.error === 1000 ){
        $form.data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
      }
      if(info.error === 1001 ){
        $form.data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
      }
     }
   })
 })

 //重置按钮

 $('[type="reset"]').on('click',function () {
  $form.data('bootstrapValidator').resetForm(true);
 })
});