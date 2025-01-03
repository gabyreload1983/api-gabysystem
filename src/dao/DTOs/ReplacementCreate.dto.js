export default class ReplacementCreateDto {
  constructor(replacement) {
    this.orderNumber = replacement?.orderNumber || "";
    this.technical_code = replacement.technical_code;
    this.description = replacement.description;
    this.images = replacement?.images || "";
    this.supplier_code = replacement?.supplier_code || "";
    this.supplier = replacement?.supplier || "";
    this.cost = replacement?.cost || 0;
    this.finalPrice = replacement?.finalPrice || 0;
    this.delay = replacement?.delay || 0;
    this.shipmment = replacement?.shipmment || "";
    this.customerConfirmation = replacement?.customerConfirmation || false;
    this.status = replacement?.status || "";
    this.linkSupplier = replacement?.linkSupplier || "";
    this.notes = replacement?.notes || "";
  }
}
