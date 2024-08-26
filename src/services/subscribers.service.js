import Subscribers from "../dao/mongoManagers/Subscribers.js";
import SubscribersRepository from "../repository/Subscribers.repository.js";
import * as customersService from "./customers.service.js";

const subscribersManager = new Subscribers();
const subscribersRepository = new SubscribersRepository(subscribersManager);

export const getSubscriber = async (id) =>
  await subscribersRepository.getSubscriber(id);

export const getSubscriberByCode = async (code) =>
  await subscribersRepository.getSubscriberByCode(code);

export const getSubscriberByEmail = async (email) =>
  await subscribersRepository.getSubscriberByEmail(email);

export const getSubscribers = async () =>
  await subscribersRepository.getSubscribers();

export const create = async ({ customer }) => {
  const subscriber = await getSubscriberByCode(customer.codigo);
  if (!subscriber) {
    await customersService.addSubscriber(customer.codigo);
    return await subscribersRepository.create(customer);
  }

  await customersService.addSubscriber(customer.codigo);
  const updatedSubcriber = { ...subscriber, status: true };

  return await subscribersRepository.update(subscriber.id, updatedSubcriber);
};

export const update = async (id, subscriber) =>
  await subscribersRepository.update(id, subscriber);

export const remove = async (id) => await subscribersRepository.remove(id);
