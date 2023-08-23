export const isValidClientSecret = (clientSecret) => {
  const expectedClientSecret = process.env.KINDE_CLIENT_SECRET;
  return clientSecret === expectedClientSecret;
};
