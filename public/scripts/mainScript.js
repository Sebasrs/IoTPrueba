function isValid(email){
  var emailRegularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(emailRegularExpression)){
    return true;
  }
  else{
    return false;
  }
}

$('div:nth-child(2) input').change(function(){
  console.log();
  if($(this).val() === ''){
    alert('El area esta vacia');
  }
  console.log($('input[type="email"]').val());
  if(!isValid($('input[type="email"]').val())){
    alert('El formato del correo esta mal');
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

//temperatura
$.ajax({url: "https://fcc-weather-api.glitch.me/api/current?lat=9.937542&lon=-84.061180", success: function(result){
  $('#temperatura').html(result.main.temp);
}});
