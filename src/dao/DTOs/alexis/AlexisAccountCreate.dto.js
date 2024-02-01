export default class AlexisAccountCreateDto {
  constructor(item) {
    this.internalId = item.internalId;
    this.date = item.date;
    this.type = item.type;
    this.value = item.value;
    this.observation = item.observation;
    this.yearApply = item.yearApply;
  }
}
