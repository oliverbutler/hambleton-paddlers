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
      defaultFrom: env("EMAIL_FROM"),
      defaultReplyTo: env("EMAIL_REPLY_TO"),
    },
  },
  // upload: {
  //   provider: "aws-s3",
  //   providerOptions: {
  //     accessKeyId: env("AWS_ACCESS_KEY_ID"),
  //     secretAccessKey: env("AWS_ACCESS_SECRET"),
  //     region: env("AWS_REGION"),
  //     params: {
  //       Bucket: env("AWS_BUCKET"),
  //     },
  //   },
  // },
});
