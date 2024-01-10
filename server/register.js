"use strict";

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "images",
    plugin: "images",
    type: "json",
  });
};
