<template>
  <qrcode-stream></qrcode-stream>
</template>

<script>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: "QRScanner",
  components: {
	QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
};
</script>