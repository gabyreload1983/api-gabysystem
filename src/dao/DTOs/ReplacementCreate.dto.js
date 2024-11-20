export default class ReplacementCreateDto {
  constructor(replacement) {
    this.orderNumber = replacement?.orderNumber || null;
    this.technical_code = replacement.technical_code;
    this.description = replacement.description;
    this.images = replacement?.images || null;
    this.supplier_code = replacement?.supplier_code || null;
    this.supplier = replacement?.supplier || null;
    this.cost = replacement?.cost || 0;
    this.finalPrice = replacement?.finalPrice || 0;
    this.delay = replacement?.delay || 0;
    this.shipmment = replacement?.shipmment || null;
    this.customerConfirmation = replacement?.customerConfirmation || false;
    this.status = replacement?.status || null;
    this.linkSupplier = replacement?.linkSupplier || null;
    this.notes = replacement?.notes || null;
  }
}
