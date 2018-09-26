$(function(){
	//收藏
	$('.div1').on('click', '.btn_coll', function () {
		let m_id = $(this).attr('m_id');
		let c_status = $(this).attr('status');
		$.ajax({
			url: '/collection',
			type: 'GET',
			dataType: 'JSON',
			data: {m_id: m_id,c_status:c_status},
			success: function (result) {
				if (result.r == 'success') {
					// console.log(result)
					window.location.reload();
					// $('.btn_coll').attr(status='status').val(word);
					// console.log('收藏成功')
				}
			}
		});
	});
	//提交评论
	$('.btn_talk').on('click',function(){
		var text = $('#talk_text').val();
		if(text.length<5){
			alert('评论字数过少')
		} else {
			$.ajax({
				url: '/talk',
				type: 'POST',
				dataType: 'JSON',
				data: $('#form_talk').serialize(),
				success: function (result) {
					if (result.r == 'success') {
						window.location.reload();
						// console.log('评论成功')
					}
				}
			});
		}

	})
})