// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "Gridsome",
  metadata: {
    backgroundColorLeft: "#155799",
    backgroundColorRight: "#159957",
    fontColor: "#333",
    githubUsername: "kanweiwei",
    blogTitle: "Camol - 博客",
    blogDescribe: "终身学习",
    strapiUrl: process.env.GRIDSOME_STRAPI_URL,
    avatarUrl:
      "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=94eece6e3887e9504242fb6825087f75/86d6277f9e2f07080ad6ebadeb24b899a801f248.jpg",
  },
  plugins: [
    {
      use: "@gridsome/source-strapi",
      options: {
        apiURL: process.env.GRIDSOME_STRAPI_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ["projects", "articles", "writers"],
        // singleTypes: ['impressum'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        // loginData: {
        //   identifier: '',
        //   password: ''
        // }
      },
    },
  ],
  templates: {
    StrapiProjects: [
      {
        path: "/projects/details/:id",
        component: "./src/templates/Project.vue",
      },
    ],
    StrapiArticles: [
      {
        path: "/blogs/details/:id",
        component: "./src/templates/Blog.vue",
      },
    ],
    StrapiWriters: [
      {
        path: "/socials/details/:id",
        component: "./src/templates/Writer.vue",
      },
    ],
  },
};
