// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";
import RepoInfo from "~/components/RepoInfo.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as util from "./util";
import dayjs from "dayjs";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("RepoInfo", RepoInfo);

  Vue.filter("date", (str) => {
    return dayjs(str).format("YYYY-MM-DD HH:mm:ss");
  });

  Vue.use(ElementUI);

  Vue.prototype.$util = util;
}
