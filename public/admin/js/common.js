/* 进度条 */
//禁用圆环
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function () {
  //开启进度条

  NProgress.start();
})
$(document).ajaxStop(function () {
  setTimeout(function () {
    //关闭进度条
    NProgress.done();
  },500);
})

//二级分类显示与隐藏功能
$('.child ').prev().on('click',function () {
  $(this).next().slideToggle();
})
//侧边栏显示与隐藏
$('.icon_menu').on('click',function () {
  console.log(11);
  $('.lt_aside').toggleClass('now');
  $('.lt_main').toggleClass('now');
  $(".lt_topbar").toggleClass('now');
})

//退出功能
$('.icon_logout').on('click',function () {

  console.log(111);
  $('#logoutModal').modal('show');
})
$('.btn_logout').on('click',function () {
  console.log(111);
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function (info) {
     
      if(info.success){
        //退出成功
        location.href = 'login.html';
      }
    }
  })
})
