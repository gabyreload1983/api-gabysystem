export default class OrderMongoDto {
  constructor(order, saleNote, saleNotePosition, saleNoteNumber) {
    this.nrocompro = order.nrocompro;
    this.saleNote = saleNote;
    this.saleNotePosition = saleNotePosition;
    this.saleNoteNumber = saleNoteNumber;
    this.state = order.estado;
    this.diagnosis = order.diag;
    this.ubication = order.ubicacion;
    this.dateIn = order.ingresado;
    this.tier = order.prioridad;
    this.description = order.descart;
    this.accessories = order.accesorios;
    this.saler = order.operador;
    this.technical = order.tecnico;
    this.failure = order.falla;
    this.diagnosisTechnical = order.diagnostico;
    this.price = Number(order.costo);
    this.total = Number(order.costo);
    this.dateOut = order.diagnosticado;
    this.orderProducts = order.products;
  }
}
