$(function(){
    var form = layui.form; 
    form.on('submit(updateuser)', function(data){
        // console.log(url1)
        $.ajax({
            url: "/user/1",
            type: 'POST',
            dataType: 'JSON',
            data: $('#updateuser').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
                if(result.a == 'ok'){
                    if(confirm("信息修改成功，是否重新登录")){
                        window.location.href = '/logsignup/login';
                    }
                    
                }
                if(result.a == 'u_not'){
                    $('input[name="u_name"]').parent().next('.layui-form-mid').html('账号已存在');
                    return ;
                }  
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
    //   $("#imgval1").on("click",()=>{
    //     $.ajax({
    //         url: "/user/2",
    //         type: 'POST',
    //         // data:$("imgval").val(),
    //         dataType: 'JSON',
    //         data: $('#imgsubmit').serialize(),
    //         // data:data.field,
    //         success: function (result) {
    //             console.log(result); 
    //         }
    //     });
    //     return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。 
    //   })
      
})