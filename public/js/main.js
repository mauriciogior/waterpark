$(document).ready(function() {
	$('[data-toggle-modal]').on('click', function() {
		let id = $(this).attr('data-toggle-modal')
		$(id).modal('show')
	})
	$('select.dropdown').dropdown()
})