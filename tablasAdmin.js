
// Muestra la infromacion existente en la base de datos

const traerInfoAdmin = () => {
    $.ajax({
        url:"http://localhost:8080/api/user/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            crearTabla(respuesta);
            
           let idAdmin = respuesta.length+1;
           console.log(idAdmin)
            
        }
    });
}
// funcion para crear una tabla con la informacion existentes en la base de datos

const crearTabla = (respuesta) => {

    let myTable = "<table class='table table-bordered text-center' thead><tr><th>identification</th><th>name</th><th>address</th>"+
    "<th>cellPhone</th><th>email</th><th>password</th><th>zone</th><th>type</th>"+
    "<th colspan='3'>OPCIONES</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].identification+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].cellPhone+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].zone+"</td>";
        myTable+="<td>"+respuesta[i].type+"</td>";
        myTable+="<td> <button onclick=' actualizarAdmin("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button class='botonborrar' onclick='borrarAdmin("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    // muestra la tabla en el html
    myTable+="</table>";
    $("#tablaAdmin").html(myTable);
}

// Funcion para Guardar la informacion ingresada en el formaulario
const guardarInfoAdmin = (idAdmin) =>{

    const id = idAdmin;
    const identification = $("#identification").val();
    const name = $("#name").val();
    const address = $("#address").val();  
    const cellPhone = $("#cellPhone").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const zone = $("#zone").val();
    const type = $("#type").val();

    const payload = {
        id,
        identification: identification,
        name: name,
        cellPhone: cellPhone,
        email: email,
        password: password,
        address: address,
        zone: zone,
        type: type
    };

    // validar que no se ingresen campos vacios
    //if ( identification.length == 0 || name.length == 0 || address.length == 0 || cellPhone.length == 0 || 
      //  email.length == 0 || password.length == 0 || zone.length == 0 || type.length == 0){
     //       alert("no se pueden ingresar campos vacios");
      //      return;
    //}
        
        $.ajax({
            type:'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(payload),
            
            url:"http://localhost:8080/api/user/new",
           
            
            success:function(response) {
                    console.log(response);
                console.log("Se Guardado correctamente");
                alert("Cuenta creada de forma correcta");
                traerInfoAdmin();
                limpiarCampos();
        
            },
            
            error: function(jqXHR, textStatus, errorThrown) {
                 // window.location.reload()
                alert("No fue posible crear la cuenta");
        
        
            }
        });    
    
    console.log(payload);
}

// funcion para actualizar la inforemacion Existente 
const actualizarAdmin = (idActualizar) =>{

    // variable para actualizar por id
    const id = idActualizar;

    const identification = $("#identification").val();
    const name = $("#name").val();
    const address = $("#address").val();  
    const cellPhone = $("#cellPhone").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const zone = $("#zone").val();
    const type = $("#type").val();

    // validar que no se ingresen campos vacios
    if ( identification.length == 0 || name.length == 0 || address.length == 0 || cellPhone.length == 0 || 
        email.length == 0 || password.length == 0 || zone.length == 0 || type.length == 0){
            alert("no se pueden ingresar campos vacios");
            return;
    }

    // creamos una variable donde los datos quedan almacenado para envairlo al put
    let payload = {
        id,
        identification: identification,
        name: name,
        cellPhone: cellPhone,
        email: email,
        password: password,
        address: address,
        zone: zone,
        type: type
    };

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
            limpiarCampos();
            traerInfoAdmin();
    
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

