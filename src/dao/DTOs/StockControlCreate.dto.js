export default class StockControlCreateDto {
  constructor(stockControl) {
    this.code = stockControl.code;
    this.description = stockControl.description;
    this.quantitySystem = stockControl.quantitySystem;
    this.quantityReal = stockControl.quantityReal;
  }
}
