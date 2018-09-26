$(function () {


    let img = document.querySelector('#images');
    //当你选择文件的时候，value值会发生改变，触发change事件
    img.onchange = function () {
        //获取选中的文件信息：文件内容
        console.log(this.files[0]);
        let _this = this;
        // 使用ajax发送图片到服务器
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/uploads');
        //创建一个表单数据对象
        let formdata = new FormData();  //创建一个表单数据对象 可以理解为创建一个  <form>  </form>  
        formdata.append("images", _this.files[0]);        //往表单里面追加input  name="images"  value="文件"
        console.log(formdata);
        //不用设置请求头
        // console.log(formdata);
        // console.log(formdata);
        xhr.send(formdata);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                console.log(data);

                document.querySelector('#img').src = data.data[0];

                document.querySelector('#imgval').value = data.data[0];

                document.querySelector("#userhead").src=data.data[0];
            }
        }
    }
    $("#imgval1").on("click", () => {
        console.log($("#imgval").val())
        $.ajax({
            url: "/user/2",
            type: 'POST',
            data: $("#imgval").val(),
            dataType: 'JSON',
            // data: $('#imgsubmit').serialize(),
            // data:data.field,
            success: function (result) {
                console.log(result);
            }
        });
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。 
    })
})