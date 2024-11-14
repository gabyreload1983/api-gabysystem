export default class ReplacementCreateDto {
  constructor(replacement) {
    this.orderNumber = replacement.orderNumber;
    this.technical_code = replacement.technical_code;
    this.description = replacement.description;
    this.images = replacement.images;
    this.supplier_code = replacement.supplier_code;
    this.supplier = replacement.supplier;
    this.cost = replacement.cost;
    this.finalPrice = replacement.finalPrice;
    this.delay = replacement.delay;
    this.shipmment = replacement.shipmment;
    this.customerConfirmation = replacement.customerConfirmation;
    this.status = replacement.status;
    this.linkSupplier = replacement.linkSupplier;
    this.notes = replacement.notes;
  }
}
