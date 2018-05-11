function signInCallback(authResult){
  if(authResult['code']){

    //oculta el signo de login
    $('#signinButton').attr('style', 'display: none');

    //envia un codigo de un solo uso al servidor, si el servidor responde
    //escribe login Successfully
    $.ajax({
      type:'POST',
      url: '/gconnect?state="{{STATE}}"',
      processData: false,
      data: authResult['code'],
      contentType: 'application/octet-stream; charset=utf-8',
      success: function(result){
        if(result){
          $('#result').html('Login Succesful! </br>' + result + '</br>Redirecting...');
          setTimeout(function(){
            window.location.href = "/restaurant";
          }, 4000);
        }else if (authResult['error']){
          console.log("There was an error: " + authResult['error']);
        }else{
          $('#result').html('Failed to make a server-side call. Check your configuration and console.');
        }
      }
    });
  }
}
