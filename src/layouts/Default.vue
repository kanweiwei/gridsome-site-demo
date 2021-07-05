<template>
  <div>
    <section
      class="page-header"
      :style="
        'background-image: linear-gradient(120deg, ' +
        $static.metadata.backgroundColorLeft +
        ', ' +
        $static.metadata.backgroundColorRight +
        ');color: ' +
        $static.metadata.fontColor +
        ';'
      "
    >
      <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
        <el-tooltip
          effect="dark"
          :content="fullButton.full ? '退出' : '全屏'"
          placement="bottom-end"
        >
          <el-button
            @click="full"
            :icon="fullButton.full ? 'el-icon-close' : 'el-icon-rank'"
            circle
          ></el-button>
        </el-tooltip>
      </div>
      <div
        v-for="(item, index) in randomIcon"
        :key="'ri' + index"
        :style="
          'position:absolute; top:' +
          item.top +
          'px; left:' +
          item.left +
          'px; z-index:1;'
        "
      >
        <font :style="'font-size: ' + item.size + 'px;color:#fff;'">
          <b>♪</b>
        </font>
      </div>
      <h1 class="project-name">{{ $static.metadata.blogTitle }}</h1>
      <h2 class="project-tagline">{{ $static.metadata.blogDescribe }}</h2>
      <a
        :href="'https://github.com/' + $static.metadata.githubUsername"
        class="btn"
        target="_blank"
        >GitHub主页</a
      >
    </section>
    <div
      style="
        position: relative;
        z-index: 2;
        margin: auto;
        margin-top: -30px;
        max-width: 64rem;
      "
    >
      <el-card shadow="never" :body-style="{ padding: '0px' }">
        <el-row>
          <el-col :span="10">
            <el-menu
              @select="selectTopbar"
              :default-active="topbar.active"
              mode="horizontal"
              menu-trigger="click"
            >
              <el-submenu index="#more">
                <template slot="title">了解博主</template>
                <el-menu-item index="#githubHome">github主页</el-menu-item>
                <el-menu-item index="#blog">其他博客</el-menu-item>
              </el-submenu>
              <el-submenu index="#webSites" v-if="webSites.length > 0">
                <template slot="title">其他网站</template>
                <el-menu-item
                  :index="'#webSites-' + index"
                  v-for="(item, index) in webSites"
                  :key="'#webSites' + index"
                  >{{ item.name }}</el-menu-item
                >
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="4" :offset="8" style="text-align: right">
            <div style="font-size: 20px; color: #606266; margin-top: 5px">
              <b>{{ $static.metadata.githubUsername }}</b>
            </div>
            <div style="color: #606266">
              <i class="el-icon-location"></i>&nbsp;{{
                location ? location : "未填写地址"
              }}
              <br />
            </div>
          </el-col>
          <el-col :span="2" style="text-align: center">
            <img
              v-popover:bigAvatar
              :src="$static.metadata.avatarUrl"
              style="
                margin-top: 4px;
                margin-right: 10px;
                width: 52px;
                height: 52px;
                border-radius: 5px;
                border: 1px solid #ebeef5;
              "
            />
            <el-popover
              ref="bigAvatar"
              placement="top-start"
              :title="$static.metadata.githubUsername"
              width="200"
              trigger="hover"
            >
              <i class="el-icon-star-on"></i>&emsp;{{ name }}
              <br />
              <i class="el-icon-location"></i>&emsp;{{ location }}
              <br />
              <img
                :src="$static.metadata.avatarUrl"
                style="width: 200px; height: 200px"
              />
            </el-popover>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right: 10px">
          <sidebar></sidebar>
        </el-col>
        <el-col :span="18" style="padding-left: 10px">
          <slot />
        </el-col>
      </el-row>
    </section>
    <section class="foot">
      <foot></foot>
    </section>
  </div>
</template>
<static-query>
query {
  metadata {
    backgroundColorLeft
    backgroundColorRight
    fontColor
    githubUsername
    avatarUrl
    blogTitle
    blogDescribe
  }
}
</static-query>
<script>
import Sidebar from "../components/Sidebar.vue";
import AppMain from "../components/AppMain.vue";
import Foot from "../components/Footer.vue";
export default {
  components: {
    Sidebar,
    AppMain,
    Foot,
  },
  data() {
    return {
      fullButton: {
        full: false,
      },
      topbar: {
        active: "",
      },
      randomIcon: [],
      webSites: [
        {
          name: "掘金",
          url: "https://juejin.cn/user/3755587449389911",
        },
      ],
      name: "kanweiwei",
      location: "wuxi",
    };
  },
  mounted() {},
  methods: {
    selectTopbar(index) {
      //取消菜单选中状态
      this.topbar.active = this.topbar.active == "" ? " " : "";
      switch (index) {
        case "#githubHome":
          window.open(
            "https://github.com/" + this.$static.metadata.githubUsername
          );
          break;
        case "#blog":
          if (this.blog) {
            window.open(
              (this.blog.match(/https?:\/\//i) ? "" : "https://") + this.blog
            );
          } else {
            this.$message({
              message: "博主没有其他博客",
              type: "info",
            });
          }
          break;
        default:
          if (/#webSites-\d+/.test(index)) {
            let i = parseInt(index.split("-")[1]);
            let url = this.webSites[i].url;
            window.open((url.match(/https?:\/\//i) ? "" : "https://") + url);
          }
          break;
      }
    },
    full() {
      if (!this.fullButton.full) {
        this.$util.fullScreen();
        this.fullButton.full = true;
      } else {
        this.$util.fullExit();
        this.fullButton.full = false;
      }
    },
  },
};
</script>

<style>
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}

.project-name {
  font-size: 3.25rem;
  margin-top: 0;
  margin-bottom: 0.1rem;
  color: #fff;
}

.project-tagline {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  font-weight: normal;
  opacity: 0.7;
  color: #fff;
}

.btn:hover {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

a:hover {
  text-decoration: underline;
}

a:active,
a:hover {
  outline: 0;
}

.btn {
  padding: 0.75rem 1rem;
  display: inline-block;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  border-style: solid;
  border-width: 1px;
  border-radius: 0.3rem;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

a {
  color: #1e6bb8;
  text-decoration: none;
}

.btn + .btn {
  margin-left: 1rem;
}

.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 800px;
}

.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>