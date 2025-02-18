export default class SubscriberCreateDto {
  constructor(subscriber) {
    this.code = subscriber.codigo;
    this.name = subscriber.nombre;
    this.address = subscriber.direccion;
    this.phone = subscriber.telefono;
    this.city = subscriber.ciudad;
    this.cuit = subscriber.cuit;
    this.balance = subscriber.saldo;
    this.condition = 30;
    this.createdAt = subscriber.alta;
    this.email = subscriber.mail;
    this.list = subscriber.lista;
    this.status = true;
    this.totalEquipments = 0;
    this.totalServers = 0;
  }
}
