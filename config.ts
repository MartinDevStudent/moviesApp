let config;

try {
  config = await fetch("./config.json").then((response) => response.json());
} catch {
  // ignored
}

export const APIConfig = {
  API: {
    endpoints: [
      {
        name: "appApi",
        endpoint:
          config?.apiUrl ??
          "https://xqd2bkrhk7.execute-api.eu-west-1.amazonaws.com/dev/",
      },
      {
        name: "authApi",
        endpoint:
          config?.authUrl ??
          "https://xqd2bkrhk7.execute-api.eu-west-1.amazonaws.com/dev/",
      },
    ],
  },
};
