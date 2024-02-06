export default class SalesCommissionUpdateDto {
  constructor(invoice) {
    this.purchaseOrder = invoice.purchaseOrder;
    this.deliveryCost = invoice.deliveryCost;
    this.delivery = invoice.delivery;
    this.deliveryState = invoice.deliveryState;
    this.profit = invoice.profit;
    this.invoiceState = invoice.invoiceState;
    this.paymentDate = invoice.paymentDate;
    this.isProfitApply = invoice.isProfitApply;
    this.isValid = invoice.isValid;
  }
}
