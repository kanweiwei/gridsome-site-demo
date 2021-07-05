<template>
  <Layout>
    <div style="min-height: 600px">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.title }}</span>
        </div>
        <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
          发布 {{ blog.created_at | date }} <br />
          更新 {{ blog.updated_at | date }}
        </div>
        <div
          style="
            font-size: 1.1rem;
            line-height: 1.5;
            color: #303133;
            border-bottom: 1px solid #e4e7ed;
            padding: 5px 0px 5px 0px;
          "
        >
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <div
          v-html="markdown(blog.content)"
          class="markdown-body"
          style="padding-top: 20px"
        ></div>
      </el-card>
      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!blog.id"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query{
    blogs: allStrapiArticles(sortBy: "created_at", limit:1) {
    	edges {
        node {
          id
          title
          description
          content
          created_at
          updated_at
        }
      }
  }
}
</page-query>
<script>
const Markdown = require("markdown-it");
const md = new Markdown();

export default {
  data() {
    return {};
  },
  computed: {
    blog() {
      if (this.$page.blogs.edges.length) {
        return this.$page.blogs.edges[0].node;
      }
      return {};
    },
  },
  methods: {
    markdown(html) {
      if (!html) return "";
      return md.render(html);
    },
  },
};
</script>