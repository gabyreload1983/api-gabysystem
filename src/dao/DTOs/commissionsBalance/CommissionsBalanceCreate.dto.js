export default class CommissionsBalanceCreateDto {
  constructor(item) {
    this.date = item.date;
    this.type = item.type;
    this.value = item.value;
    this.observation = item.observation;
    this.numberId = item.numberId;
  }
}
