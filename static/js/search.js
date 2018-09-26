$(function() {

			//查询
			$('.form_search').on('click', '.btn_search', function() {
					// console.log($(this))
					$.ajax({
							url: '/btnsearch',
							type: 'GET',
							dataType: 'JSON',
							data: $('.form_search').serialize(),
							success: function(result) {
								console.log(result.movies);
								$('.cont_con_row').children().remove();
								for (let m of result.movies) {
									
									$('.cont_con_row').append('<div class="movie_card"><a href="/onemovie?m_id='+m.m_id+'"><img src="'+m.m_image+'"/><span><span style="width: 186px; display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+m.m_name+'</span><span class="small label label-success">'+m.m_score+'</span></span><div class="card_cover"><div class="caption"><h3>'+m.m_name+'</h3><p>'+m.m_director+'</p></div></div></a></div>');
									}
								}
							});
					});
			})
