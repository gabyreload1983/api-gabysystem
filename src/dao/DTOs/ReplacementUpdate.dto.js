export default class ReplacementUpdateDto {
  constructor(replacement) {
    this.orderNumber = replacement.orderNumber;
    this.requests = replacement.requests;
    this.description = replacement.description;
    this.supplier = replacement.supplier;
    this.cost = replacement.cost;
    this.deliveryCost = replacement.deliveryCost;
    this.finalPrice = replacement.finalPrice;
    this.deliveryDate = replacement.deliveryDate;
    this.customerConfirmation = replacement.customerConfirmation;
    this.status = replacement.status;
    this.linkSupplier = replacement.linkSupplier;
    this.notes = replacement.notes;
    this.images = replacement.images;
    this.archived = replacement.archived;
  }
}
