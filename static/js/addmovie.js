$(function(){

    $('#addbds').on('click',function(){
    
        $(this).before('<input type="text" name="bds_name" autocomplete="off" class="layui-input">')
    });
    $('#addxls').on('click',function(){
    
        $(this).before('<input type="text" name="xls_name" autocomplete="off" class="layui-input">')
    });
    
})


