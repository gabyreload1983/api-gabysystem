export default class InvoicesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getInvoicesCommission = async (from, to) =>
    await this.dao.getInvoicesCommission(from, to);

  getInvoicesPending = async (from, to) =>
    await this.dao.getInvoicesPending(from, to);

  getOverdueInvoices = async (from, to, condition) =>
    await this.dao.getOverdueInvoices(from, to, condition);

  getServiceWorkInvoice = async (codigo, serviceworkNro) =>
    await this.dao.getServiceWorkInvoice(codigo, serviceworkNro);
}
