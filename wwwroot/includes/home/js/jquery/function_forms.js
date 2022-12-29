$().ready(function() {
	$("#FormRegistro").validate({
		rules: {
			nombre: "required",
			apellido: "required",
			r_social: "required",
			cuit: "required",
			email: { required:true, email:true},
			password: "required",
			repass: "required",
		},
	});
	$("#FormContact").validate({
		rules: {
			nombre: "required",
			r_social: "required",
			email: { required:true, email:true},
			asunto: "required",
			cuerpo: "required",
		},
	});
	$("#FormCv").validate({
		rules: {
			nombre: "required",
			dni: "required",
			email: { required:true, email:true},
			cuerpo: "required",
			file: "required",
		},
	});
});