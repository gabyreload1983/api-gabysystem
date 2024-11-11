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
  const { data: fileData } = await axios.get(`${process.env.ABONADOS_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN_SUBSCRIBERS}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!fileData) return;
  const fileContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  const uuids = JSON.parse(fileContent);

  const exists = uuids.includes(newEquipment.uuid);

  if (exists) return false;

  const newUUIDs = [...uuids, newEquipment.uuid];

  const sha = fileData.sha;
  const updatedContent = Buffer.from(
    JSON.stringify(newUUIDs, null, 2)
  ).toString("base64");

  const res = await axios.put(
    `${process.env.ABONADOS_URL}`,
    {
      message: "Update UUIDs in data.json",
      content: updatedContent,
      sha: sha,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN_SUBSCRIBERS}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (res?.status !== 200) return;

  return await subscribersRepository.addEquipment(subscriber, newEquipment);
};

export const updateEquipmentById = async (id, updatedEquipment) =>
  await subscribersRepository.updateEquipmentById(id, updatedEquipment);

export const removeEquipmentById = async (equipmentToRemove) => {
  const { data: fileData } = await axios.get(`${process.env.ABONADOS_URL}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN_SUBSCRIBERS}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!fileData) return;
  const fileContent = Buffer.from(fileData.content, "base64").toString("utf-8");
  const uuids = JSON.parse(fileContent);

  const exists = uuids.includes(equipmentToRemove.uuid);

  if (!exists) return false;

  const newUUIDs = uuids.filter((uuid) => uuid !== equipmentToRemove.uuid);

  const sha = fileData.sha;
  const updatedContent = Buffer.from(
    JSON.stringify(newUUIDs, null, 2)
  ).toString("base64");

  const res = await axios.put(
    `${process.env.ABONADOS_URL}`,
    {
      message: "Update UUIDs in data.json",
      content: updatedContent,
      sha: sha,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN_SUBSCRIBERS}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (res?.status !== 200) return;

  return await subscribersRepository.removeEquipmentById(equipmentToRemove._id);
};

export const update = async (id, subscriberUpdate) =>
  await subscribersRepository.update(id, subscriberUpdate);

export const removeSubscription = async (subscriber) => {
  await customersService.removeSubscription(subscriber.code);
  const updatedSubcriber = { ...subscriber, status: false };
  return await subscribersRepository.update(subscriber._id, updatedSubcriber);
};
