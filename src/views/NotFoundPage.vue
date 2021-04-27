<template>
  <div class="main">
    <not-found-component></not-found-component>
  </div>
</template>

<script>
import NotFoundComponent from "../components/NotFoundComponent.vue";

export default {
  name: "NotFound",
  components: {
    NotFoundComponent,
  },
};
</script>

<style lang="scss" scoped></style>
