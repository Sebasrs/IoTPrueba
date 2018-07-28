$('div:nth-child(2) input').change(function(){
  console.log();
  if($(this).val() === ''){
    alert('El area esta vacia');
  }
});

$('div:nth-child(2) textarea').change(function(){
  console.log($(this).val());
  if($(this).val() === ''){
    alert('El area esta vacia');
  }
});

$('#selectors input').change(function(){
  $('div:not(:first)').animate({opacity : 0});
  $('div:nth-child('+ $(this).val() +')').animate({opacity : 1});
});

//
//temperatura
$.get("https://fcc-weather-api.glitch.me/api/current?lat=9.937542&lon=-84.061180", function(data, status){
        $('#temperatura').html(data.main.temp);
    });
