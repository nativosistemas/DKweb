
//btn to up
$(window).scroll(function(){
	if ($(this).scrollTop() > 400) {
		$('.buttonontop').fadeIn();
	} else {
		$('.buttonontop').fadeOut();
	}	

}); 
$('.buttonontop').click(function(){
	$("html, body").animate({ scrollTop: 0 }, 600);
	return false;
});

var h = $(window).height();
var $document = $(document),
	$element = $('#hdr');
	$document.scroll(function() {
	  if ($document.scrollTop() >= 150){
		$('#hdr').removeClass("navbar-default navbar-static-top");
		$('#hdr').addClass("navbar-inverse navbar-fixed-top");
		$element.fadeIn(0);
	  } else {
		$('#hdr').removeClass("navbar-inverse navbar-fixed-top");
		$('#hdr').addClass("navbar-default navbar-static-top");
	  }
	}
);