export default class ReplacementCreateDto {
  constructor(replacement) {
    this.orderNumber = replacement?.orderNumber;
    this.requests = replacement?.requests;
    this.description = replacement.description;
    this.supplier = replacement?.supplier;
    this.cost = replacement?.cost;
    this.finalPrice = replacement?.finalPrice;
    this.delay = replacement?.delay;
    this.customerConfirmation = replacement?.customerConfirmation;
    this.status = replacement?.status;
    this.linkSupplier = replacement?.linkSupplier;
    this.notes = replacement?.notes;
  }
}
