import { prefixPluginTranslations } from "@strapi/helper-plugin";
import ImagesIcon from "./components/Images/ImagesIcon";

export default {
  register(app) {
    app.customFields.register({
      name: "images",
      pluginId: "images", // the custom field is created by a images plugin
      type: "json", // the selection will be stored as a json
      intlLabel: {
        id: "images.images.label",
        defaultMessage: "Images",
      },
      intlDescription: {
        id: "images.images.description",
        defaultMessage: "Enter multiple images",
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
