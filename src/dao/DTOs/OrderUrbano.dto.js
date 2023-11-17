export default class OrderUrbanoDto {
  constructor(order) {
    this.nrocompro = order.nrocompro;
    this.codigo = order.code;
    this.nombre = order.client;
    this.telefono = order.phone;
    this.codiart = order.sector;
    this.descart = order.description;
    this.serie = order.serie;
    this.operador = order.saler;
    this.falla = order.fail;
    this.accesorios = order.accesories;
    this.prioridad = order.priority;
  }
}
