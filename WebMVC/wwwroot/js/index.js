const _modeloProducto = {
    id:0,
    codigo:"",
    marca: "",
    modelo: "",
    estado: 0,
    fecha_registro: "",
}


function MostrarProductos() {
    fetch("/Home/listaProductos")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response)
        })
        .then(responseJson => {
            if (responseJson.length > 0) {
                $("#tablaProductos tbody").html("");
                responseJson.forEach((producto) => {
                    $("#tablaProductos tbody").append(
                        $("<tr>").append(
                            $("<td>").text(producto.id),
                            $("<td>").text(producto.codigo),
                            $("<td>").text(producto.marca),
                            $("<td>").text(producto.modelo),
                            $("<td>").text(producto.estado),
                            $("<td>").text(producto.fecha_registro),
                            $("<td>").append(
                                $("<button>").addClass("btn btn-primary btn-sm boton-editar-Producto").text("Editar").data("dataProducto", producto),
                                $("<button>").addClass("btn btn-danger btn-sm ms-2 boton-eliminar-Producto").text("Eliminar").data("dataProducto", producto),
                            )
                        )
                    )
                })

            }
        })
}


document.addEventListener("DOMContentLoaded", function () {
    MostrarProductos();
    /*
    fetch("/Home/listaDepartamentos")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response)
        })
        .then(responseJson => {
            if (responseJson.length > 0) {
                responseJson.forEach((item) => {
                    $("#cboDepartamento").append(
                        $("<option>").val(item.idDepartamento).text(item.nombre)
                    )

                })
            }
        })
    $("#txtFechaContrato").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true
    })
    */
}, false)


function MostrarModal() {
    $("#txtCodigo").val(_modeloProducto.codigo);
    $("#cboMarca").val(_modeloProducto.marca);
    $("#txtModelo").val(_modeloProducto.modelo)
    $("#modalProducto").modal("show");
}

$(document).on("click", ".boton-nuevo-Producto", function () {
    _modeloProducto.codigo = 0;
    _modeloProducto.marca = "";
    _modeloProducto.modelo = 0;
    MostrarModal();
})

$(document).on("click", ".boton-editar-Producto", function () {
    const _Producto = $(this).data("dataProducto");
    _modeloProducto.id = _Producto.id;
    _modeloProducto.codigo = _Producto.codigo;
    _modeloProducto.marca = _Producto.marca;
    _modeloProducto.modelo = _Producto.modelo;
    MostrarModal();

})

$(document).on("click", ".boton-guardar-cambios-Producto", function () {

    const modelo = {
        id: _modeloProducto.id,
        codigo: $("#txtCodigo").val(),
        marca: $("#txtMarca").val(),
        modelo: $("#txtModelo").val(),
    }


    if (_modeloProducto.id == 0) {

        fetch("/Home/guardarProducto", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(modelo)
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response)
            })
            .then(responseJson => {

                if (responseJson.valor) {
                    $("#modalProducto").modal("hide");
                    Swal.fire("Listo!", "Producto fue creado", "success");
                    MostrarProductos();
                }
                else
                    Swal.fire("Lo sentimos", "No se puedo crear", "error");
            })

    } else {

        fetch("/Home/editarProducto", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(modelo)
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response)
            })
            .then(responseJson => {

                if (responseJson.valor) {
                    $("#modalProducto").modal("hide");
                    Swal.fire("Listo!", "Producto fue actualizado", "success");
                    MostrarProductos();
                }
                else
                    Swal.fire("Lo sentimos", "No se puedo actualizar", "error");
            })

    }


})


$(document).on("click", ".boton-eliminar-Producto", function () {

    const _Producto = $(this).data("dataProducto");

    Swal.fire({
        title: "Esta seguro?",
        text: `Eliminar Producto "${_Producto.nombreCompleto}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, volver"
    }).then((result) => {

        if (result.isConfirmed) {

            fetch(`/Home/eliminarProducto?id=${_Producto.id}`, {
                method: "DELETE"
            })
                .then(response => {
                    return response.ok ? response.json() : Promise.reject(response)
                })
                .then(responseJson => {

                    if (responseJson.valor) {
                        Swal.fire("Listo!", "Producto fue elminado", "success");
                        MostrarProductos();
                    }
                    else
                        Swal.fire("Lo sentimos", "No se puedo eliminar", "error");
                })
        }
    })
})