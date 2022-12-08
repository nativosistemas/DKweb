$(function () {            
	$('#opciones_avanzadas').click(function() {
		var nodo = $(this).attr("id");
		if($("#filtros_"+nodo).is(":visible")){
			$("#filtros_"+nodo).slideUp(300);
			$("#eye_"+nodo).removeClass("fa fa-eye-slash");
			$("#eye_"+nodo).addClass("fa fa-eye");
			return false;
		}else{
			$("#eye_"+nodo).removeClass("fa fa-eye");
			$("#eye_"+nodo).addClass("fa fa-eye-slash");
			$("#filtros_"+nodo).slideDown(300);
			return false;
		}
	});
});