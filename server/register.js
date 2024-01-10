"use strict";

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "images-category",
    plugin: "images-category",
    type: "json",
  });
};
