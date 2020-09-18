module.exports = ({ env }) => {
  return {
    defaultConnection: "default",
    connections: {
      default: {
        connector: "mongoose",
        settings: {
          uri: env("DATABASE_URI"),
        },
        options: {
          ssl: true,
        },
      },
    },
  };
};
