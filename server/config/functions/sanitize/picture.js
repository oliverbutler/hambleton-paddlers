const _ = require("lodash");

/**
 * This function sanitizes a picture, removing alot of meta-data
 *
 * @param {*} picture
 */
module.exports = (picture) => {
  if (!picture) return null;

  if (picture.formats)
    _.forOwn(picture.formats, (val, key) => {
      picture.formats[key] = val.url;
    });

  picture = _.pick(picture, ["name", "url", "width", "height", "formats"]);
  return picture;
};
