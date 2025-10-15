const port = import.meta.env.VITE_PORT || 5000;
const localHost = import.meta.env.VITE_HOST || "localhost";
const domain = `http://${localHost}:${port}`;

export const config = { domain, localHost, port };
