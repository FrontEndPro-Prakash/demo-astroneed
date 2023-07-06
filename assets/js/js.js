/** Menu active **/
document.querySelectorAll('.nav-item').forEach((l) => {
    l.addEventListener('click', () => { 
		document.querySelector('#navbarToggler').classList.remove('show');
		document.querySelector('.navbar-toggler').classList.add('collapsed');
		document.querySelector('.navbar-toggler').setAttribute('aria-expanded', false)
	})
})
$(document).on('click', 'a.nav-link,.footNav', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top - $(".mainHeader").height()
	}, 100);
});
/** /Menu active **/
/** Copyright date **/
var year = new Date();
document.querySelector('date').textContent = year.getFullYear();
/** /Copyright date **/
/** PHP mailer **/
$(document).ready(function(event) {
	function showMessage(message, status, element) {
		$(element).html(`<div class="p-2 text-center rounded-0 alert alert-${(status == '1') ? 'success': 'error'}" role="alert">${message}</div>`);
		setTimeout(() => {
			$(element).html('');
		}, 10000)
	}

	function loader(element, status = true, content = "Submit") {
		if (status) {
			$(element).html(`Send Enquiry <div class="spinner-border" role="status">
			<span class="visually-hidden">Loading...</span>
			</div>`);
		} else {
			$(element).html(content);
		}
	}
	$("#contactUsForm").submit(function(e) {
		e.preventDefault();
	}).validate({
		rules: {
			f_name: "required",
// 			phone: {
// 				required: true,
// 				number: true,
// 			},
			u_need: "required",
			message: "required",
		},
		messages: {
			f_name: "Please enter your Name.",
// 			phone: {
// 				required: "Please enter your Phone no.",
// 				number: "Please enter valid Phone no.",
// 			},
			u_need: "Please enter your Need.",
			message: "Please enter your Message.",
		},
		submitHandler: function(form) {
			loader('#contactUsForm button[type="submit"]');
			var f_name = $(form).find("#f_name").val();
			var phone = $(form).find("#phone").val();
			var u_need = $(form).find("#u_need").val();
			var message = $(form).find("#message").val();
			$.ajax({
				url: "sendM.php?s="+new Date().getTime(),
				type: "post",
				cache: false,
				data: {
					f_name: f_name,
					phone: phone,
					u_need: u_need,
					message: message,
				},
				success: function(res) {
				    res = JSON.parse(res);
					$(form).find('input, textarea').val('');
					loader('#contactUsForm button[type="submit"]', false);
					showMessage(res.message, res.success, "#response-div");
				}
			})
		}
	});
	// Modal Contact
	let textLink = document.querySelectorAll('[enquiry-attr]')
	let removeText = document.querySelector('#get-touch .close')
	let enquiryFor = "";
	textLink.forEach(e => {
		e.addEventListener('click', e =>{
		// console.log(e.target.getAttribute('enquiry-attr'));
		enquiryFor = e.target.getAttribute('enquiry-attr')
		})
	});
	removeText.addEventListener('click', e => {
		// alert('dsgsdgdsgdsg')
		enquiryFor = ""
	})
	

	$("#contactUsFormModal").submit(function(e) {
		e.preventDefault();
	}).validate({
		rules: {
			f_name: "required",
// 			phone: {
// 				required: true,
// 				number: true,
// 			},
			message: "required",
		},
		messages: {
			f_name: "Please enter your Name.",
// 			phone: {
// 				required: "Please enter your Phone no.",
// 				number: "Please enter valid Phone no.",
// 			},
			message: "Please enter your Message.",
		},
		submitHandler: function(form) {
			loader('#contactUsFormModal button[type="submit"]');
			var f_name = $(form).find("#f_name").val();
			var phone = $(form).find("#phone").val();
			var message = $(form).find("#message").val();
			$.ajax({
				url: "sendM.php?s="+new Date().getTime(),
				type: "post",
				cache: false,
				data: {
					f_name: f_name,
					phone: phone,
					enquiry_for: enquiryFor,
					message: message,
				},
				success: function(res) {
				    res = JSON.parse(res);
					$(form).find('input, textarea').val('');
					loader('#contactUsFormModal button[type="submit"]', false);
					showMessage(res.message, res.success, "#response-div2");
				}
			})
		}
	});
	// Modal Contact
})
/** /PHP mailer **/