export const incompleteValues = (...values) => values.some((value) => !value);

export const isValidOrder = (order) => {
  const requiredKeys = [
    "code",
    "client",
    "phone",
    "mail",
    "sector",
    "description",
    "serie",
    "fail",
    "accesories",
    "priority",
  ];

  const missingKeys = requiredKeys.filter(
    (requiredKey) => order.hasOwnProperty(requiredKey) === false
  );

  return missingKeys.length ? false : true;
};

export const isValidPhoneNumber = (number) => {
  if (number.length !== 10) return false;

  return number;
};
