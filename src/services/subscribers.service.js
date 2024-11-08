import axios from "axios";
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

export const getEquipmentById = async (id) =>
  await subscribersRepository.getEquipmentById(id);

export const getEquipmentByUUID = async (uuid) =>
  await subscribersRepository.getEquipmentByUUID(uuid);

export const addEquipment = async (subscriber, newEquipment) => {
  const { data: fileData } = await axios.get(`${ABONADOS_URL}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN_SUBSCRIBERS}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!fileData) return;
  const fileContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  const uuids = JSON.parse(fileContent);

  const exists = uuids.includes(newEquipment.uuid);
  if (exists) return;

  // data.push(newEquipment.uuid);
  // const updatedContent = [...data];

  // const res = await axios.put(
  //   `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
  //   {
  //     message: "Actualizar UUIDs en data.json",
  //     content: updatedContent,
  //     sha: sha,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${GITHUB_TOKEN}`,
  //       Accept: "application/vnd.github.v3+json",
  //     },
  //   }
  // );

  // return await subscribersRepository.addEquipment(subscriber, newEquipment);
};

export const updateEquipmentById = async (id, updatedEquipment) =>
  await subscribersRepository.updateEquipmentById(id, updatedEquipment);

export const removeEquipmentById = async (id) =>
  await subscribersRepository.removeEquipmentById(id);

export const update = async (id, subscriberUpdate) =>
  await subscribersRepository.update(id, subscriberUpdate);

export const removeSubscription = async (subscriber) => {
  await customersService.removeSubscription(subscriber.code);
  const updatedSubcriber = { ...subscriber, status: false };
  return await subscribersRepository.update(subscriber._id, updatedSubcriber);
};
