export default class AlexisAccountCreateDto {
  constructor(item) {
    this.internalId = item.invoiceId;
    this.date = item.date;
    this.type = item.type;
    this.value = item.value;
    this.observation = item.observation;
  }
}
