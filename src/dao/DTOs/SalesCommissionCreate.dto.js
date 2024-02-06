export default class SalesCommissionCreateDto {
  constructor(invoice) {
    this.date = invoice.fecha;
    this.customerCode = invoice.codigo;
    this.customer = invoice.razon;
    this.invoiceId = invoice.nrocompro;
    this.type = invoice.tipo;
    this.subTotal = invoice._subtotal;
    this.tax = invoice._iva;
    this.cost = invoice._costo;
    this.profit = invoice._renta;
    this.saler = invoice.operador;
    this.cameFrom = invoice.vienede.slice(0, 16);
  }
}
