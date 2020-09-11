module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "301bf5e779d20e5794f586e9235772a4"),
    },
  },
  cron: {
    enabled: true,
  },
});
