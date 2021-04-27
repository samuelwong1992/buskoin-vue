<template>
  <div class="container">
    <div class="content">
      <div class="centered">
        <h1 style="margin-bottom: 24px">Oh No!</h1>
        <h3 style="margin-top: 24px">
          We couldn't find the page you were looking for!
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundComponent",
  components: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 16px;
  color: white;
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
}

.centered {
  margin: auto;
}
</style>
