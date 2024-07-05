export default class OrderUrbanoUpdateDto {
  constructor(order) {
    this.codigo = order.codigo;
    this.nombre = order.nombre;
    this.codiart = order.codiart;
    this.descart = order.descart;
    this.accesorios = order.accesorios;
    this.falla = order.falla;
    this.serie = order.serie;
    this.prioridad = order.prioridad;
  }
}
