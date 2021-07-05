<template>
  <Layout>
    <div>
      <el-card
        shadow="never"
        style="
          min-height: 400px;
          margin-bottom: 20px;
          padding: 0px 0px 20px 0px;
        "
      >
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            :label="'作者 ' + $page.writers.pageInfo.totalItems"
            name="writers"
            style="padding: 5px"
          >
            <div>
              <div v-if="$page.writers.edges.length">
                <el-row style="min-height: 200px">
                  <el-col
                    :span="8"
                    v-for="(item, index) in $page.writers.edges"
                    :key="'followers' + index"
                    style="padding: 10px"
                  >
                    <el-card
                      shadow="hover"
                      style="font-size: 13px; color: #606266; line-height: 20px"
                    >
                      <i class="el-icon-star-off"></i>&emsp;
                      <g-link
                        :to="`/socials/details/${item.node.id}`"
                        style="text-decoration: none; cursor: pointer"
                        >{{ item.node.name }}</g-link
                      >
                      <br />
                      <i class="el-icon-message"></i>&emsp;
                      <!-- <a
                      :href="item.htmlUrl"
                      target="_blank"
                      style="text-decoration: none; cursor: pointer"
                      >TA的主页</a
                    > -->
                      <br />
                      <g-image
                        :src="$page.metadata.strapiUrl + item.node.picture.url"
                        style="width: 100%; border-radius: 5px; margin-top: 5px"
                      />
                    </el-card>
                  </el-col>
                </el-row>
                <div style="text-align: center; margin-top: 10px">
                  <Pager :info="$page.writers.pageInfo" />
                </div>
              </div>
              <div
                style="
                  min-height: 300px;
                  margin-bottom: 20px;
                  padding: 20px 0px 20px 0px;
                  text-align: center;
                "
                v-else
              >
                <font style="font-size: 30px; color: #dddddd">
                  <b>(￢_￢) 没有一个粉丝</b>
                </font>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </Layout>
</template>
<page-query>
query($page: Int) {
  writers: allStrapiWriters(page: $page, perPage: 10) @paginate {
    edges {
      node {
        id
        name
        picture{
          url
        }
        articles {
          title
        }
      }
    }
    pageInfo {
      totalPages
      currentPage
      totalItems
    }
  }

  metadata {
      strapiUrl
  }
}
</page-query>
<script>
import { Pager } from "gridsome";

export default {
  name: "socials",
  components: {
    Pager,
  },
  data() {
    return {
      activeTab: "writers",
    };
  },
  computed: {},

  methods: {},
};
</script>