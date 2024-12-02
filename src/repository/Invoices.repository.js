export default class InvoicesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getInvoicesCommission = async (from, to) =>
    await this.dao.getInvoicesCommission(from, to);

  getInvoicesPending = async (from, to) =>
    await this.dao.getInvoicesPending(from, to);

  getServiceWorkInvoice = async (codigo, serviceworkNro) =>
    await this.dao.getServiceWorkInvoice(codigo, serviceworkNro);

  getInvoiceSubscribers = async (from, to) =>
    await this.dao.getInvoiceSubscribers(from, to);
}
