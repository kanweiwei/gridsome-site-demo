<template>
  <div>
    <el-card shadow="never">
      <el-menu :default-active="active" @select="onSelect">
        <el-menu-item
          v-for="item in $static.allRouterMap.edges"
          :key="item.node.path"
          :index="item.node.path"
        >
          <template>
            <i :class="item.node.meta.icon"></i>
            <span slot="title">{{ item.node.meta.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>
<static-query>
query {
  allRouterMap {
    edges {
      node {
        path
        meta {
          icon
          title
        }
      }
    }
  }
}
</static-query>
<script>
export default {
  components: {},
  data() {
    return {
      active: "",
      parentUrl: "",
      menuList: [],
    };
  },
  computed: {},
  mounted() {
    console.log(this.$static);
    let arr = this.$route.path.split("/");
    this.active = "/" + arr[1];
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
  },
};
</script>

