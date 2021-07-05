<template>
  <iframe
    :src="
      'https://ghbtns.com/github-btn.html?user=' +
      user +
      '&repo=' +
      repo +
      '&type=' +
      type +
      '&count=true&size=large'
    "
    frameborder="0"
    scrolling="0"
    width="170"
    height="30"
    title="GitHub"
  ></iframe>
</template>

<script>
export default {
  name: "repo-info",
  props: ["user", "repo", "type"],
};
</script>

<style>
</style>