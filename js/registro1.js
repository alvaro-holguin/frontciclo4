// creamos variables  globales para  la   funcion   crear 
/*$(document).ready(() => {
    generaridLogin();
})*/

const generaridLogin = () => {
    $.ajax({
        url:"http://localhost:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            GenerarId(respuesta);       
        }
    });
}

let idRegistro = []
//funcion que genera el id basado en el length de la respuesta de la funcion traerinfiadmnin
let GenerarId = (respuesta) => {
    for (let i = 0; i < respuesta.length; i++) {
        idRegistro =(respuesta[i].id)+1
      }
      console.log(idRegistro)
}

const crear = () => {
    generaridLogin();
    const identification = $("#identification").val();
    const name = $("#name").val();
    const address = $("#address").val();
    const cellPhone = $("#cellPhone").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const confirmarpassword = $("#confirmarpassword").val();
    const zone = $("#zone").val();
    const type = $("#type").val();
    re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  
    if (
      identification.length === 0 ||
      name.length === 0 ||
      address.length === 0 ||
      cellPhone.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      zone.length === 0 ||
      type.length === 0
    ) {
      //nos  envia  esta  alerta  de  no puede haber  campos   vacios
      alert("no pueden haber campos vacios");
      return;
      //validamos si   es un email valido   o   no
    } else if (!re.exec(email)) {
      alert("email no valido");
      return;
    } else if (password !== confirmarpassword) {
      alert("password not  permited");
      return;
      // si  pasword no tiene  masde  6 letras eniamos la  alerta   de pásswoerd debe  tener  mas  de 6  letras
    } else if (password.length < 6) {
      alert("password debe  tener  mas  de  6 letras");
      return;
    } else if (validarEmail(),generaridLogin()) return;
  };
  
  function crearUsuario() {
    let myData = {
      id: idRegistro,
      identification: $("#identification").val(),
      name: $("#name").val(),
      address: $("#address").val(),
      cellPhone: $("#cellPhone").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      zone: $("#zone").val(),
      type: $("#type").val(),
    };
    console.log(myData);
  
    $.ajax({
      url: "http://localhost:8080/api/user/new",
      type: "POST",
      dataType: "JSON",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(myData),
      statusCode: {
        201: function () {
          alert("Usuario Creado");
          limpiarCampos();
        },
      },
    });
  
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
  
  const limpiarCampos = () => {
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");  
    $("#cellPhone").val("");
    $("#email").val("");
    $("#password").val("");
    $("#zone").val("");
    $("#type").val("");
    /*    setTimeout(()=>{
           
           }, 1000);  */
  };
  
  const validarEmail = () => {
    const email = $("#email").val();
    console.log(email);
    //Generar una peticion tipo ajax para validar si  existe  email
  
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/api/user/emailexist/" + email,
      dataType: "json",
      success: function (respuesta) {
        console.log(respuesta);
        if (respuesta === true) {
          alert("ya existe usuario con  ese Email");
          limpiarCampos();
          return;
        } else {
          crearUsuario();
        }
      },
      error: function (xhr, status) {
        console.log(xhr);
  
        console.log(status);
      },
    });
  };
  
  

