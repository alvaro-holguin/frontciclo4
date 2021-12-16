const traerInfoProds = () => {
    $.ajax({
        url:"http://129.151.113.197:8080/api/gadget/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            TablaGadget(respuesta);
            
        }
    });
}

// crear tabla para gadget
const TablaGadget = (respuesta) =>{
    let TableProds = `<table class='table table-bordered text-center'
    thead>
        <tr class="table-primary" >
            <th>Codigo</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability </th>
            <th>Quantity</th>
            <th>Photography</th>
            <th colspan='3'>Options</th>
        </tr>
    </thead>`;

    for(i=0;i<respuesta.length;i++){
        TableProds+= `
        <tr class="table-light">
            <td>${respuesta[i].id}</td>
            <td>${respuesta[i].brand}</td>
            <td>${respuesta[i].category}</td>
            <td>${respuesta[i].name}</td>
            <td>${respuesta[i].description}</td>
            <td>${respuesta[i].price}</td>
            <td>${respuesta[i].availability }</td>
            <td>${respuesta[i].quantity}</td>
            <td>${respuesta[i].photography}</td>
            <td> <button class='btn btn-primary' onclick='openModal(${respuesta[i].id})'>Actualizar</button>
            <td> <button class='btn btn-danger' onclick='deleteGadget(${respuesta[i].id})'>Borrar</button>
        </tr>`;
    }

    TableProds+="</table>";
    $("#tablaGadget").html(TableProds);
}

// leer funcion cuando inicie la pagina
$(document).ready(() => {
    traerInfoProds();
})

// funcion para Guardar Productos
const saveGadget = () =>{

    const id = $("#codigo").val();
    const brand = $("#brand").val();
    const category = $("#category").val();
    const name = $("#name").val();
    const description= $("#description").val();
    const price= $("#price").val();
    const availability = $("#availability").val();
    const quantity= $("#quantity").val();
    const photography= $("#photography").val();

    const payload = {
        id: id,
        brand:brand,
        category:category,
        name :name,
        description: description,
        price : price,
        availability: availability,
        quantity : quantity,
        photography:photography
    };

    //validar que no se ingresen campos vacios
    if ( id.length == 0 || brand.length == 0 || category.length == 0 || name.length == 0 || description.length == 0 || 
        price.length == 0 || availability.length == 0 || quantity.length == 0 || photography.length == 0){
            alert("no se pueden ingresar campos vacios");
            return;
        }

    console.log(payload);

    $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(payload),
        
        url:"http://129.151.113.197:8080/api/gadget/new",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se Guardado correctamente");
            alert("Se Guardado correctamente");
            limpiarGadget();
            traerInfoProds();
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
             // window.location.reload()
            alert("No fue posible guardar el producto");
        }
    }); 


    console.log(payload);
}
// variable goblal para almacenar el id
    let idUpdate=[]
    
// funcion para abrir la ventana modala    
const openModal = (idModal) =>{
    $("#modal-body");
    $("#ModalUpdate").modal('show');
    idUpdate.push(idModal);
}

// funcion para actualizar los productos
const updateGadget = () =>{ 
    const id = idUpdate[0];
    const brand = $("#brandU").val();
    const category = $("#categoryU").val();
    const name = $("#nameU").val();
    const description= $("#descriptionU").val();
    const price= $("#priceU").val();
    const availability = $("#availabilityU").val();
    const quantity= $("#quantityU").val();
    const photography= $("#photographyU").val();

    const payload = {
        id,
        brand:brand,
        category:category,
        name :name,
        description: description,
        price : price,
        availability: availability,
        quantity : quantity,
        photography:photography
    };

    if ( id.length == 0 || brand.length == 0 || category.length == 0 || name.length == 0 || description.length == 0 || 
        price.length == 0 || availability.length == 0 || quantity.length == 0 || photography.length == 0){
            alert("no se pueden ingresar campos vacios");
            return;
        }

    console.log(payload);

    $.ajax({
        type:'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(payload),
        
        url:"http://129.151.113.197:8080/api/gadget/update",
       
        
        success:function(response) {
                console.log(response);
            console.log("Se actualizo correctamente");
            alert("Se actualizo correctamente");
            vaciarModal();
            traerInfoProds();
            $("#ModalUpdate").modal('hide');
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("No se actualizo correctamente");
    
        }
    });
}


const deleteGadget = (idDelete) =>{

    payload = {
        id:idDelete
    }

    $.ajax({
        url:"http://129.151.113.197:8080/api/gadget/"+idDelete,
        type:"DELETE",
        data:JSON.stringify(payload),
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(){
            traerInfoProds();
            alert("Se ha Eliminado.")
        }
    });
}

// funcion para Limpiar campos Gadget
const limpiarGadget = () =>{
    $("#codigo").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#name").val("");
    $("#description").val("");
    $("#price").val("");
    $("#availability").val("");
    $("#quantity").val("");
    $("photography").val("");
}

const vaciarModal = () =>{
    $("#codigoU").val("");
    $("#brandU").val("");
    $("#categoryU").val("");
    $("#nameU").val("");
    $("#descriptionU").val("");
    $("#priceU").val("");
    $("#availabilityU").val("");
    $("#quantityU").val("");
    $("#photographyU").val("");
}
