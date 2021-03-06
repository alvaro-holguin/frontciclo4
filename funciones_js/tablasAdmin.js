$(document).ready(() => {
    traerInfoAdmin();
})

// Muestra la infromacion existente en la base de datos
const traerInfoAdmin = () => {
    $.ajax({
        url:"http://localhost:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            crearTabla(respuesta);
            AlmacenarId(respuesta);
            //console.log(guardarid)
            
        }
    });
}
//variable global que almacena el id
let idSave = []
//funcion que genera el id basado en el length de la respuesta de la funcion traerinfiadmnin
let AlmacenarId = (respuesta) => {
    for (let i = 0; i < respuesta.length; i++) {
        idSave =(respuesta[i].id)+1
      }
      console.log(idSave)
}
console.log(idSave);

// funcion para crear una tabla con la informacion existentes en la base de datos

const crearTabla = (respuesta) => {

    let myTable = `<table class='table table-bordered text-center'
    thead>
        <tr class="table-primary">
            <th>identification</th>
            <th>name</th>
            <th>address</th>
            <th>cellPhone</th>
            <th>email</th>
            <th>password</th>
            <th>zone</th>
            <th>type</th>
            <th colspan='3'>Options</th>
        </tr>
    </thead>`;



    for(i=0;i<respuesta.length;i++){
        myTable+=`
        <tr class="table-light">
            <td>${respuesta[i].identification}</td>
            <td>${respuesta[i].name}</td>
            <td>${respuesta[i].address}</td>
            <td>${respuesta[i].cellPhone}</td>
            <td>${respuesta[i].email}</td>
            <td>${respuesta[i].password}</td>
            <td>${respuesta[i].zone}</td>
            <td>${respuesta[i].type}</td>
            <td> <button class='btn btn-primary' onclick='actualizarAdmin(${respuesta[i].id})'>Actualizar</button>
            <td> <button  class='btn btn-danger' onclick='borrarAdmin(${respuesta[i].id})'>Borrar</button>
        </tr>`;
    }
    // muestra la tabla en el html
    myTable+="</table>";
    $("#tablaAdmin").html(myTable);
}
  
// Funcion para Guardar la informacion ingresada en el formaulario
const guardarInfoAdmin = () => {
  const id = idSave;
  const identification = $("#identification").val();
  const name = $("#name").val();
  const address = $("#address").val();
  const cellPhone = $("#cellPhone").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const zone = $("#zone").val();
  const type = $("#type").val();
  re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

  const payload = {
    id,
    identification: identification,
    name: name,
    cellPhone: cellPhone,
    email: email,
    password: password,
    address: address,
    zone: zone,
    type: type,
  };

  // validar que no se ingresen campos vacios
  if (
      identification.length == 0 || name.length == 0 || address.length == 0 || cellPhone.length == 0 ||
      email.length == 0 || password.length == 0 || zone.length == 0 || type.length == 0) {
      alert("no se pueden ingresar campos vacios");
      return;
      //validar que el email se correcto
    }else if(!re.exec(email)){
      alert("Email No Valido")
      return;
    }

  $.ajax({
    url: "http://localhost:8080/api/user/emailexist/"+email,
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      //validacion de si existe un correo
      if (respuesta == true) {
        alert("Email ya existe");
        return;
      } else {
        $.ajax({
          type: "POST",
          contentType: "application/json; charset=utf-8",
          dataType: "JSON",
          data: JSON.stringify(payload),

          url: "http://localhost:8080/api/user/new",
          success: function (response) {
            console.log(response);
            console.log("Se Guardado correctamente");
            alert("Se Guardado correctamente");
            limpiarCampos();
            traerInfoAdmin();
          },
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // window.location.reload()
      alert("No se guardo correctamente");
    },
  });
};

let adminid=[]
    
const actualizarAdmin = (idactu) =>{
    $("#modal-body");
    $("#myModal").modal('show');
    adminid=(idactu);
}

// funcion para actualizar la inforemacion Existente 
const actuModal = () =>{
    
    console.log(adminid);
    // variable para actualizar por id
    const id = adminid;
    const identificationM = $("#identificationM").val();
    const nameM = $("#nameM").val();
    const addressM = $("#addressM").val();  
    const cellPhoneM = $("#cellPhoneM").val();
    const emailM = $("#emailM").val();
    const passwordM= $("#passwordM").val();
    const zoneM = $("#zoneM").val();
    const typeM = $("#typeM").val();

    // validar que no se ingresen campos vacios
  if ( identificationM.length == 0 || nameM.length == 0 || addressM.length == 0 || cellPhoneM.length == 0 || 
        emailM.length == 0 || passwordM.length == 0 || zoneM.length == 0 || typeM.length == 0){
            alert("no se pueden ingresar campos vacios");
            return;
    }

    // creamos una variable donde los datos quedan almacenado para envairlo al put
    let payload = {
        id,
        identification: identificationM,
        name: nameM,
        cellPhone: cellPhoneM,
        email: emailM,
        password: passwordM,
        address: addressM,
        zone: zoneM,
        type: typeM
    };

    console.log(payload);

    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(payload),
        
        url:"http://localhost:8080/api/user/update",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se actualizo correctamente");
            alert("Se actualizo correctamente");
            limpiarModal();
            traerInfoAdmin();
            $("#myModal").modal('hide');
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se actualizo correctamente");
    
        }
    });
}


const borrarAdmin = (idBorrar) => {
    //creamos una variable donde almacenamos el id
    payload = {
      // id = idBorrar
    }

    $.ajax({
        url:"http://localhost:8080/api/user/"+idBorrar,
        type:"DELETE",
        data:JSON.stringify(payload),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(){
            traerInfoAdmin();
            alert("Se ha Eliminado.")
        }
    });
}


const limpiarCampos = () =>{
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");  
    $("#cellPhone").val("");
    $("#email").val("");
    $("#password").val("");
    $("#zone").val("");
    $("#type").val("");
}

const limpiarModal = () =>{
    $("#identificationM").val("");
    $("#nameM").val("");
    $("#addressM").val("");  
    $("#cellPhoneM").val("");
    $("#emailM").val("");
    $("#passwordM").val("");
    $("#zoneM").val("");
    $("#typeM").val("");
}