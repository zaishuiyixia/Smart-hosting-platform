/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
$(function(){
	
	 $('body').running();
	
	$(window).bind("scroll",function(){ 

		var top=$(window).scrollTop();
		
		$('.list .item').each(function(){
			if ($(this).offset().top -top< $(window).height() - 200){
				$('.list .item').removeClass('selected');
				$(this).addClass('selected');
			};							   
		})
		
	});  
	 
			
})

