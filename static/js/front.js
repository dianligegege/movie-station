$(function() {
	
	
	
	
	//轮播图
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal', // 垂直切换选项
		loop: true, // 循环模式选项
		// 如果需要分页器
		pagination: {
			el: '.swiper-pagination',
		},
		// 如果需要前进后退按钮
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
			hideOnClick: true,
		},
		// 如果需要滚动条
		scrollbar: {
			el: '.swiper-scrollbar',
			hide: true,
		},
	});

	//卡片hover效果
	$('.movie_card').on('mouseenter', function() {
		console.log($(this).children('.card_cover'))
		var card_cover = $(this).find('.card_cover');
		var img1 = $(this).find('img')[0];
		console.log(img1)
		card_cover.animate({
			top:'0px',
			opacity:'0.7',
		});
		img1.style.filter='blur(5px)'
	});
	
	$('.movie_card').on('mouseleave', function() {
		console.log($(this).children('.card_cover'))
		var card_cover = $(this).find('.card_cover');
		var img1 = $(this).find('img')[0];
		card_cover.animate({
			top:'200px',
			opacity:'0',
		});
		img1.style.filter='blur(0)'

	});


});
