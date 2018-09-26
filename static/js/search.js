$(function(){
    var form = layui.form; 
    form.on('submit(form)', function(data){
        // console.log(url1)
        $.ajax({
            url: "/search",
            type: 'POST',
            dataType: 'JSON',
            data: $('#moviesearch').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
            
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
})