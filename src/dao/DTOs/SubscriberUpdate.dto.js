export default class SubscriberUpdateDto {
  constructor(subscriber) {
    this.name = subscriber.nombre;
    this.address = subscriber.direccion;
    this.phone = subscriber.telefono;
    this.city = subscriber.ciudad;
    this.cuit = subscriber.cuit;
    this.balance = subscriber.saldo;
    this.condition = subscriber.condicion;
    this.email = subscriber.email;
    this.list = subscriber.lista;
    this.status = subscriber.status;
    this.totalEquipments = subscriber.totalEquipments;
    this.totalServers = subscriber.totalServers;
    this.equipments = subscriber.equipments;
  }
}
