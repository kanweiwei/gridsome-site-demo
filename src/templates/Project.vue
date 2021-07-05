<template>
  <Layout>
    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px">
        <div slot="header">
          <el-row>
            <el-col :span="12">
              <span>{{ $page.project.repo }}</span>
            </el-col>
            <el-col :span="12">
              <div style="text-align: right">
                <el-button
                  @click="goGithub($page.project.user, $page.project.repo)"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-back"
                  >前往GitHub</el-button
                >
                <el-button
                  @click="more"
                  style="padding: 3px 0"
                  type="text"
                  icon="el-icon-more-outline"
                  >更多项目</el-button
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
            padding: 20px 0px 0px 0px;
          "
        >
          {{ $page.project.description }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            color: #303133;
            padding: 15px 0px 15px 0px;
            border-bottom: 1px solid #e4e7ed;
          "
        >
          <el-row>
            <el-col :span="16" style="padding-top: 5px">
              <RepoInfo
                :user="$page.project.user"
                :repo="$page.project.repo"
                type="star"
              />
              <RepoInfo
                :user="$page.project.user"
                :repo="$page.project.repo"
                type="fork"
              />
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-tag size="small" type="danger" v-if="$page.project.license">{{
                $page.project.license
              }}</el-tag>
              <!-- <el-tag size="small" type="success">{{ project.language }}</el-tag> -->
            </el-col>
          </el-row>
        </div>
        <div
          v-html="markdown($page.project.content)"
          v-if="$page.project.content"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
        <div
          v-if="!$page.project.content"
          style="padding: 20px 0px 20px 0px; text-align: center"
        >
          <font style="font-size: 30px; color: #dddddd">
            <b>还没有介绍 (╯°Д°)╯︵ ┻━┻</b>
          </font>
        </div>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($id: ID!) {
    project: strapiProjects (id: $id) {
        id
        content
        description
        user
        repo
        license
    }
}
</page-query>
<script>
var MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {},

  methods: {
    goGithub(user, repo) {
      window.open(`https://github.com/${user}/${repo}`);
    },
    more() {
      this.$router.push("/projects");
    },
    markdown(html) {
      return md.render(html);
    },
  },
};
</script>