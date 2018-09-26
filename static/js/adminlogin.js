$(function () {
    var form = layui.form;
    //验证码刷新
    $('#codeimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });
    // 管理员登录
    
    form.on('radio(filter)', function(data){
        // console.log(data)
       if(data.value=="admin"){
           url1="/logsignup/login"
       }
      });
      form.on('radio(filter1)', function(data){
        // console.log(data)
       if(data.value=="user"){
           url1="/logsignup/login/1"
       }
      }); 

    // let url1="/logsignup/login";
    let url1;

    form.on('submit(login)', function(data){
        console.log(url1)
        $.ajax({
            url: url1,
            type: 'POST',
            dataType: 'JSON',
            data: $('#adminlogin').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
                if(result.a == 'u_not'){
                    $('input[name="a_name"]').parent().next('.layui-form-mid').html('管理员账号不存在');
                    return ;
                }
                if(result.a == 'p_err'){
                    $('input[name="a_password"]').parent().next('.layui-form-mid').html('密码错误');
                    return ;
                }
                if(result.a == 'ok'){
                    window.location.href = '/admin';
                }
                if(result.r == 'u_not'){
                    $('input[name="a_name"]').parent().next('.layui-form-mid').html('账号不存在');
                    return ;
                }
                if(result.r == 'p_err'){
                    $('input[name="a_password"]').parent().next('.layui-form-mid').html('密码错误');
                    return ;
                }
                if(result.u == 'ok'){
                    console.log(666)
                    window.location.href = '/';
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    $('.admin-login').click(function () {
        if($('.layui-form-danger').length){
            return ;
        }
        $('.H').html('');
        
    });



 // 用户注册
 form.on('submit(signup)', function(data){
    $.ajax({
        url: '/logsignup/signup',
        type: 'POST',
        dataType: 'JSON',
        data: $('#adminlogin').serialize(),
        // data:data.field,
        success: function (result) {
            console.log(result);
            if(result.r == 'error'){
                $('input[name="u_name"]').parent().next('.layui-form-mid').html('账号已存在');
                return ;
            }
            if(result.r == 'ok'){
                window.location.href = '/logsignup/login';
            }
        }
    });
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
$('.admin-login').click(function () {
    if($('.layui-form-danger').length){
        return ;
    }
    $('.H').html('');
    
});


});