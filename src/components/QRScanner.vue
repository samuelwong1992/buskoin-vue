<template>
  <qrcode-stream></qrcode-stream>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: "QRScanner",
  components: {
    QrcodeStream,
  },
};
</script>
