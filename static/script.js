$(document).ready(function(){

	$.ajax({
		method : 'GET',
		url : '/api1',
		dataType : 'json',
		data : {
			'proc' : 'going'
		},
		success : function(res){
			for (var i = res.name.length - 1; i >= 0; i--) 
			{
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
		event.preventDefault();


		$.ajax({
			method : 'POST',
			url : '/couriers',
			dataType : 'json',
			data : {'name' : name,
				'sum' : sum},
			success : function(){
				console.log('успех');
				$('#sum').val('');
				alert("Успех");
			},
			error : function(){
				console.log('error');
			},
		});

		});
	$('#list').ready(function(){
		$('#sort').on('submit', function(event){
			event.preventDefault();
			start = $('#start').val();
			end = $('#end').val();
			//console.log(start.toString());
			//console.log(end.toString());
			event.preventDefault();
			$.ajax({
				url : '/api2',
				dataType : 'json',
				method : 'GET',
				data : {'start' : start,
					'end' : end},
				success: function(res){
					console.log(start);					
					for (var i = 0; i < res.name.length; i++) {	
					var newLi = document.createElement('li');
  					newLi.innerHTML = '<p>Имя: ' + res.name[i] + ' Сумма: '
  					 + res.data[i].sum + ' Дата: ' + res.data[i].date + 
  					 ' Время: ' + res.data[i].time + '</p>';
					list.appendChild(newLi);
				};
				},

				error: function(res){
					console.log('ajax error2');
				},
			});
		});
	});
});
