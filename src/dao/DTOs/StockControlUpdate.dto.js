export default class StockControlUpdateDto {
  constructor(stockControl) {
    this.code = stockControl.code;
    this.description = stockControl.description;
    this.quantitySystem = stockControl.quantitySystem;
    this.quantityReal = stockControl.quantityReal;
    this.status = stockControl.status;
  }
}
