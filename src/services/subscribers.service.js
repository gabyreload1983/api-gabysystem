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

export const getSubscribers = async () => {
  const subscribers = await subscribersRepository.getSubscribers();
  return subscribers.filter((subscriber) => subscriber.status);
};

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

export const addEquipment = async (subscriber, newEquipment) =>
  await subscribersRepository.addEquipment(subscriber, newEquipment);

export const update = async (id, subscriberUpdate) =>
  await subscribersRepository.update(id, subscriberUpdate);

export const removeSubscription = async (subscriber) => {
  await customersService.removeSubscription(subscriber.code);
  const updatedSubcriber = { ...subscriber, status: false };
  return await subscribersRepository.update(subscriber._id, updatedSubcriber);
};
