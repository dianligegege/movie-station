$(function () {
    let form = layui.form;

    //选择日期组件
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //执行一个laydate实例
        laydate.render({
            elem: '.timeselect', //指定元素
            type: 'date'
        });
    });

    //在线添加电影信息
    form.on('submit(addmovie)', function (data) {
        $.ajax({
            url: '/admin/addmovie',
            type: 'POST',
            dataType: 'JSON',
            data: $('#addmovie').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //删除电影资源 / 审核不通过
    $('.movielist').on('click', '.delmo', function () {
        //这里应该有删除确定提示--TODO
        let m_id = $(this).attr('m_id');
        $.ajax({
            url: '/admin/delmovie',
            type: 'GET',
            dataType: 'JSON',
            data: { m_id: m_id },
            success: function (result) {
                console.log(result);
                if (result.r == 'success') {
                    window.location.reload();
                }
            }
        });
    });

    //更改电影资源
    form.on('submit(updatemo)', function (data) {
        $.ajax({
            url: '/admin/updatemo',
            type: 'POST',
            dataType: 'JSON',
            data: $('#updatemo').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //审核通过
    form.on('submit(checkpass)',function(data){
        $.ajax({
            url: '/admin/checkpass',
            type: 'POST',
            dataType: 'JSON',
            data: $('#checkin').serialize(),
            // data:data.field,
            success: function (result) {
                window.location.href='/admin/moviecheck'
                console.log(result);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //审核不通过
    form.on('submit(checkno)',function(data){
        console.log(data.field.m_id);
        $.ajax({
            url: '/admin/delmovie',
            type: 'GET',
            dataType: 'JSON',
            data: { m_id: data.field.m_id },
            success: function (result) {
                console.log(result);
                if (result.r == 'success') {
                window.location.href='/admin/moviecheck'
                }
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });


    //用户
    //禁止登录
    $('.movielist').on('click', '.userno', function () {
        //这里应该有删除确定提示--TODO
        let u_id = $(this).attr('u_id');
        $.ajax({
            url: '/admin/userno',
            type: 'GET',
            dataType: 'JSON',
            data: {u_id: u_id },
            success: function (result) {
                console.log(result);
                if (result.r == 'success') {
                    window.location.reload();
                }
            }
        });
    });
    
});


