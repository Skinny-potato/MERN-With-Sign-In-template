const port = import.meta.env.SERVER_PORT || 5000;
const localHost = import.meta.env.SERVER_HOST || "localhost";
const domain = `http://${localHost}:${port}`;

export const config = { domain, localHost, port };
