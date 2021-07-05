<template>
  <Layout>
    <div style="min-height: 600px">
      <div v-if="$page.blogs.edges && $page.blogs.edges.length > 0">
        <el-card
          shadow="hover"
          v-for="(item, index) in $page.blogs.edges"
          :key="'p' + index"
          style="margin-bottom: 20px"
        >
          <div slot="header">
            <el-row>
              <el-col :span="16">
                <span>
                  <a
                    style="text-decoration: none; cursor: pointer"
                    @click="goDetails(item.node.id)"
                  >
                    <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                    {{ item.node.title }}
                  </a>
                </span>
              </el-col>
              <el-col :span="8"> </el-col>
            </el-row>
          </div>
          <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
            最近更新 {{ item.node.updated_at | date }}
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
        </el-card>
        <div style="text-align: center">
          <Pager :info="$page.blogs.pageInfo" />
        </div>
      </div>

      <el-card
        shadow="never"
        style="
          margin-bottom: 20px;
          padding: 20px 0px 20px 0px;
          text-align: center;
        "
        v-if="!$page.blogs.edges || $page.blogs.edges.length == 0"
      >
        <font style="font-size: 30px; color: #dddddd">
          <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
        </font>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int) {
  blogs: allStrapiArticles(page: $page, perPage: 10) @paginate {
    edges {
      node {
        id
        title
        image {
          url
          width
          height
        }
        content
        description
        slug
        published_at
        created_at
        updated_at
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
  name: "blogs",
  components: { Pager },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goDetails(id) {
      this.$router.push("/blogs/details/" + id);
    },
  },
};
</script>