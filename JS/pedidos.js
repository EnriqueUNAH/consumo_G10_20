var UrlGETpedidos = 'http://34.68.196.220:90/G10_20/Pedidos/controller/pedidos.php?op=GetPedidos';
var UrlPostPRoveedor = 'http://34.68.196.220:90/G10_20/Pedidos/controller/pedidos.php?op=InsertarPedido';
var UrlGepedido = 'http://34.68.196.220:90/G10_20/Pedidos/controller/pedidos.php?op=GetUno';
var URlPutPedido = 'http://34.68.196.220:90/G10_20/Pedidos/controller/pedidos.php?op=UpdatePedido';
var urldeletepedido = 'http://34.68.196.220:90/G10_20/Pedidos/controller/pedidos.php?op=deletePedido';


$(document).ready(function(){
    cargarPedidos();
});

function cargarPedidos(){
    $.ajax({
        url: UrlGETpedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var valores = '';

            for(i=0; i<MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i]. ID + '</td>'+
                '<td>'+MiItems[i]. ID_SOCIO +'</td>'+
                '<td>'+MiItems[i]. FECHA_PEDIDO +'</td>'+
                '<td>'+MiItems[i]. DETALLE +'</td>'+
                '<td>'+MiItems[i]. SUB_TOTAL +'</td>'+
                '<td>'+MiItems[i]. TOTAL_ISV +'</td>'+
                '<td>'+MiItems[i]. TOTAL +'</td>'+
                '<td>'+MiItems[i]. FECHA_ENTREGA +'</td>'+
                '<td>'+MiItems[i]. ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="cargarPedido('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarPedido()">Eliminar</button>'
                '</td>'+
                '</tr>';
            }
            $('.Pedidos').html(valores);
        }

    });
}

function agregarPedido(){
    var datospedido = {
        ID_SOCIO: $('#ID_socio').val(),
        FECHA_PEDIDO: $('#Fecha_pedido').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SubTotal').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlPostPRoveedor,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        succes: function(response){
            console.log(response);
        }
    });
    alert("Proveerdor Agregado")
}

function cargarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    }
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: UrlGepedido,
        type: 'POST',
        data:datospedidojson,
        datatype: 'application/json',
        success:function(response){
            var MiItems = response
            $('#ID_socio').val(MiItems[0].ID_SOCIO);
            $('#Fecha_pedido').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SubTotal').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar= '<input type="submit" id="btnactualizar" onclick="ActualizarPedido('+MiItems[0].ID+')"'+
            'value="Actualizar pedido" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarPedido(idpedido){
    var datospedido = {
        ID: idpedido,
        ID_SOCIO: $('#ID_socio').val(),
        FECHA_PEDIDO: $('#Fecha_pedido').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SubTotal').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: URlPutPedido,
        type: 'PUT',
        data: datospedidojson,
        datatype:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado")
}

function EliminarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    }
    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
        url: urldeletepedido,
        type: 'DELETE',
        data:datospedidojson,
        datatype: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}