export default class InvoicesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getCustomerInvoicesPending = async (id, from, to) =>
    await this.dao.getCustomerInvoicesPending(id, from, to);

  getInvoicesCommission = async (from, to) =>
    await this.dao.getInvoicesCommission(from, to);

  getInvoicesPending = async (from, to) =>
    await this.dao.getInvoicesPending(from, to);

  getOverdueInvoices = async (from, to) =>
    await this.dao.getOverdueInvoices(from, to);

  getServiceWorkInvoice = async (codigo, serviceworkNro) =>
    await this.dao.getServiceWorkInvoice(codigo, serviceworkNro);
}
