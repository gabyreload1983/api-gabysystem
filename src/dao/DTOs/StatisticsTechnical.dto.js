export default class StatisticsTechnicalDto {
  constructor(code_technical) {
    this.code_technical = code_technical;
    this.finished = 0;
    this.withoutRepair = 0;
    this.assembly = 0;
    this.tickets = 0;
    this.total = 0;
  }
}
