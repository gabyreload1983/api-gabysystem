export default class OrdersUpdateDto {
  constructor(order) {
    this.state = order.estado;
    this.diagnosis = order.diag;
    this.ubication = order.ubicacion;
    this.tier = order.prioridad;
    this.description = order.descart;
    this.accessories = order.accesorios;
    this.saler = order.operador;
    this.technical = order.tecnico;
    this.failure = order.falla;
    this.diagnosisTechnical = order.diagnostico;
    this.price = Number(order.costo);
    this.total = Number(order.total);
    this.dateOut = order.diagnosticado;
    this.orderProducts = order.products;
  }
}
