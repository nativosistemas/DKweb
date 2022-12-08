$("#menu-close").click(function(e) {
	e.preventDefault();
	$("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#sidebar-wrapper").toggleClass("active");
});

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

//ofertas
$('.s-h_off_fxd').click(function() {
	if ($(".off_fxd_cont").height() < 3){				
		$(".off_fxd_cont").animate({'height':200},500);
		$(".s-h_off_fxd").animate({"bottom":200},500).html('<i class="fa fa-angle-down"></i>Ocultar ofertas');
		return false;
	}else{
		$(".s-h_off_fxd").animate({"bottom":2},500).html('<i class="fa fa-angle-up"></i>Mostrar ofertas');
		$(".off_fxd_cont").animate({"height":2},500);
		return false;
	}
});

$(document.body).ready(function() {
	$('.owl-carousel').owlCarousel({
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem : false,
		pagination: false,
		items:3,
		loop:true,
		responsiveClass:true,
		margin: 0,
		responsive:{
			0:{
				items:1,
			},
			600:{
				items:2,
			},
			1200:{
				items:2,
			},
		},
		navigation:true,
		navigationText: [
			"<i class='fa fa-angle-left'></i>",
			"<i class='fa fa-angle-right'></i>"
		],
		autoPlay : 2500,
		stopOnHover : true,
	})
});
