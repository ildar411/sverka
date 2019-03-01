$(document).ready(function(){
	$.ajax({
		method : 'GET',
		url : '/api1',
		dataType : 'json',
		data : {
			'proc' : 'going'
		},
		success : function(res){
			for (var i = res.name.length - 1; i >= 0; i--) {
				var newLi = document.createElement('option');
  				newLi.innerHTML = '<option value="' + res.name[i].name + '">' + res.name[i].name + '</option>';
				couriers.appendChild(newLi);
			};
		},
		error : function(res){
			console.log(res);
		},
	});
	$('#add').on('submit', function(event){
		name = $('#couriers').val();
		sum = $('#sum').val();


		$.ajax({
			method : 'POST',
			url : '/couriers',
			dataType : 'json',
			data : {'name' : name,
				'sum' : sum},
			success : function(){
				console.log('успех');
			},
			error : function(){
				console.log('error');
			},
		});

		});
	$('#list').ready(function(){
		$('#add').on('submit', function(event){
			start = $('#start').val();
			end = $('#end').val();
			$.ajax({
				url : '/api2',
				dataType : 'json',
				method : 'GET',
				data : {'start' : start,
					'end' : end},
				success: function(res){
					var newLi = document.createElement('li');
  					newLi.innerHTML = '<p>Имя: ' + res.rows.name + ' Сумма: ' + res.rows.sum + ' Дата: ' + res.rows.date + ' Время: ' + res.rows.time + '</p>';
					list.appendChild(newLi);
					
		
				},

				error: function(res){
					console.log('ajax error2');
				},
			});
		});
	});
});
