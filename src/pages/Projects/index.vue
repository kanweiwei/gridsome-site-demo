<template>
  <Layout>
    <div style="min-height: 600px">
      <!-- <el-card shadow="never" style="margin-bottom: 20px">
        <el-input
          placeholder="请输入关键字"
          v-model="searchKey"
          clearable
          style="width: 300px"
        ></el-input>
        <el-button
          @click="search"
          icon="el-icon-search"
          style="margin-left: 10px"
          circle
          plain
        ></el-button>
        <el-button
          @click="$share()"
          icon="el-icon-share"
          type="warning"
          style="margin-left: 10px"
          plain
          circle
        ></el-button>
      </el-card> -->

      <div
        v-if="
          $page.allStrapiProjects.edges &&
          $page.allStrapiProjects.edges.length > 0
        "
      >
        <el-card
          shadow="hover"
          v-for="(item, index) in $page.allStrapiProjects.edges"
          :key="'pro' + index"
          style="margin-bottom: 20px"
        >
          <template>
            <div slot="header">
              <el-row>
                <el-col :span="16">
                  <span>
                    <a
                      style="text-decoration: none; cursor: pointer"
                      @click="goDetails(item.node.id)"
                    >
                      <i class="el-icon-service"></i>&nbsp;&nbsp;
                      {{ item.node.repo }}
                    </a>
                  </span>
                </el-col>
                <el-col :span="8">
                  <div style="text-align: right">
                    <el-button
                      @click="goGithub(item.node.user, item.node.repo)"
                      style="padding: 3px 0"
                      type="text"
                      icon="el-icon-back"
                      >前往GitHub</el-button
                    >
                  </div>
                </el-col>
              </el-row>
            </div>

            <div
              style="
                font-size: 1.1rem;
                line-height: 1.5;
                color: #303133;
                padding: 10px 0px 0px 0px;
              "
            >
              {{ item.node.description }}
            </div>
            <div
              style="
                font-size: 1.1rem;
                color: #303133;
                padding: 10px 0px 0px 0px;
              "
            >
              <el-row>
                <el-col :span="16" style="padding-top: 5px">
                  <RepoInfo
                    :user="item.node.user"
                    :repo="item.node.repo"
                    type="star"
                  />
                  <RepoInfo
                    :user="item.node.user"
                    :repo="item.node.repo"
                    type="fork"
                  />
                </el-col>
                <el-col :span="8" style="text-align: right">
                  <el-tag size="small" type="danger" v-if="item.node.license">{{
                    item.node.license
                  }}</el-tag>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-card>
        <div style="text-align: center">
          <Pager :info="$page.allStrapiProjects.pageInfo" />
        </div>
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="
          !$page.allStrapiProjects.edges ||
          $page.allStrapiProjects.edges.length == 0
        "
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有开源项目 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int) {
  allStrapiProjects(page: $page, perPage: 10) @paginate {
    edges {
      node {
        id
        repo
        user
        description
        content
      }
    }
    pageInfo {
      totalPages
      currentPage
      totalItems
    }
  }
}
</page-query>
<script>
import { Pager } from "gridsome";

export default {
  name: "projects",
  components: {
    Pager,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    goDetails(id) {
      this.$router.push(`/projects/details/${id}`);
    },
    goGithub(user, repo) {
      window.open(`https://github.com/${user}/${repo}`);
    },
  },
};
</script>