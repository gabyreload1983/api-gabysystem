export default class SalesCommissionUpdateDto {
  constructor(invoice) {
    this.purchaseOrder = invoice.purchaseOrder;
    this.deliveryCost = invoice.deliveryCost;
    this.delivery = invoice.delivery;
    this.deliveryState = invoice.deliveryState;
    this.profit = invoice.renta;
    this.stateInvoice = invoice.stateInvoice;
    this.paymentDate = invoice.paymentDate;
  }
}
