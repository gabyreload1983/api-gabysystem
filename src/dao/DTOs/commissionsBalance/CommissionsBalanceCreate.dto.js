export default class CommissionsBalanceCreateDto {
  constructor(item) {
    this.date = item.date;
    this.type = item.type;
    this.subTotal = item.subTotal;
    this.rent = item.rent;
    this.observation = item.observation;
    this.invoiceId = item.invoiceId;
  }
}
