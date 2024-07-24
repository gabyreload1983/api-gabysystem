export default class OrderUrbanoUpdateDto {
  constructor(order) {
    this.codigo = order.codigo;
    this.nombre = order.nombre;
    this.direccion = order.direccion;
    this.telefono = order.telefono;
    this.tiposerv = order.tiposerv;
    this.codiart = order.codiart;
    this.descart = order.descart;
    this.esquema = order.esquema;
    this.facvta = order.facvta;
    this.garantia = order.garantia;
    this.provedor = order.provedor;
    this.faccpa = order.faccpa;
    this.garantiap = order.garantiap;
    this.serie = order.serie;
    this.operador = order.operador;
    this.equipo = order.equipo;
    this.ingresado = order.ingresado;
    this.falla = order.falla;
    this.accesorios = order.accesorios;
    this.detalles = order.detalles;
    this.estado = order.estado;
    this.seteado = order.seteado;
    this.diag = order.diag;
    this.diagnosticado = order.diagnosticado;
    this.ubicacion = order.ubicacion;
    this.ubicado = order.ubicado;
    this.diagnostico = order.diagnostico;
    this.prioridad = order.prioridad;
    this.repahasta = order.repahasta;
    this.estimada = order.estimada;
    this.tecnico = order.tecnico;
    this.asignado = order.asignado;
    this.costo = order.costo;
    this.egresado = order.egresado;
    this.vienede = order.vienede;
    this.hacia = order.hacia;
    this.opcional = order.opcional;
    this.pendiente = order.pendiente;
    this.nroenvio = order.nroenvio;
    this.estrma = order.estrma;
    this.textoenvio = order.textoenvio;
    this.textorespuesta = order.textorespuesta;
    this.nrorecibo = order.nrorecibo;
  }
}
