import Subscribers from "../dao/mongoManagers/Subscribers.js";
import SubscribersRepository from "../repository/Subscribers.repository.js";

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

export const create = async (subscriber) =>
  await subscribersRepository.create(subscriber);

export const update = async (id, subscriber) =>
  await subscribersRepository.update(id, subscriber);

export const remove = async (id) => await subscribersRepository.remove(id);
