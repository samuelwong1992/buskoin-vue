<template>
  <div class="tip">
    <div class="scanner-container">
      <p v-on:click="onClickLabel">tipa</p>
      {{ qr_code }}
      <QrcodeStream @decode="onDecode"></QrcodeStream>
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "Tip",
  data: function () {
    return {
      qr_code: "",
    };
  },
  components: {
    QrcodeStream,
  },
  methods: {
    onClickLabel() {
      this.$router.push({ name: "TipUser", params: { id: "123" } });
    },
    onDecode(decodedString) {
      console.log(decodedString);
      this.$router.push({ name: "TipUser", params: { id: "123" } });
      this.qr_code = "abcd";
    },
  },
};
</script>

<style lang="scss" scoped>
.tip {
  display: flex;
}
.scanner-container {
  margin: auto;
  width: 100px;
  height: 100px;
}
</style>
