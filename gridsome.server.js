// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  api.loadSource(async ({ addCollection, addMetadata }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    const routerMaps = addCollection({
      typeName: "RouterMap",
    });
    [
      {
        path: "/projects",
        meta: {
          icon: "el-icon-office-building",
          title: "开源项目",
        },
      },
      {
        path: "/blogs",
        meta: {
          icon: "el-icon-edit-outline",
          title: "博客列表",
        },
      },
      {
        path: "/socials",
        meta: {
          icon: "el-icon-bangzhu",
          title: "社交圈",
        },
      },
      {
        path: "/news",
        meta: {
          icon: "el-icon-star-off",
          title: "最新动态",
        },
      },
    ].forEach((item) => {
      routerMaps.addNode(item);
    });
  });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
