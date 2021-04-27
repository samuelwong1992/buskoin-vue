<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  name: "Logout",
  components: {},
  mounted: function () {
    this.$nextTick(() => {
      this.$store.commit("LOGOUT");
      this.$router.push({ name: "Home" });
    });
  },
};
</script>
