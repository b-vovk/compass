const { HOST, AUTH_USERNAME, AUTH_PASSWORD, AUTH_CLIENT_ID } = process.env;

if (!HOST) {
  throw new Error('HOST needs to be set');
}

if (!AUTH_USERNAME || !AUTH_PASSWORD || !AUTH_CLIENT_ID) {
  throw new Error(
    'AUTH_USERNAME, AUTH_PASSWORD and AUTH_CLIENT_ID needs to be set'
  );
}
