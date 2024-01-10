import { prefixPluginTranslations } from "@strapi/helper-plugin";
import ImagesIcon from "./components/Images/ImagesIcon";

export default {
  register(app) {
    app.customFields.register({
      name: "images-category",
      pluginId: "images-category", // the custom field is created by a images plugin
      type: "json", // the selection will be stored as a json
      intlLabel: {
        id: "images-category.images-category.label",
        defaultMessage: "Images Category",
      },
      intlDescription: {
        id: "images-category.images-category.description",
        defaultMessage: "View multiple images by category",
      },
      icon: ImagesIcon, // don't forget to create/import your icon component
      components: {
        Input: async () => import("./components/Images/ImagesPluginInput"),
      },
      options: {
        // declare options here
      },
    });
  },

  bootstrap(app) {},
};
