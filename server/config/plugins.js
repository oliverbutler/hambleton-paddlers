module.exports = ({ env }) => ({
  graphql: {
    endpoint: "/graphql",
    tracing: true,
    shadowCRUD: true,
    playgroundAlways: false,
    depthLimit: 7,
    amountLimit: 100,
  },
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_KEY"),
    },
    settings: {
      defaultFrom: "oliver@oliverbutler.uk",
      defaultReplyTo: "oliver@oliverbutler.uk",
    },
  },
});
