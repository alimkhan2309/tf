<template>
  <div class="blob-bg">
    <canvas ref="canvas"></canvas>
    <div class="blob-content"><slot/></div>
  </div>
</template>

<script>
export default {
  name: 'GlowingBlob',
  mounted() {
    // Set up canvas and draw initial gradient
    const canvas = this.$refs.canvas;
    this.ctx = canvas.getContext('2d');
    // Pre-generate a small noise pattern for dithering
    const noiseSize = 100;
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = noiseSize;
    noiseCanvas.height = noiseSize;
    const nCtx = noiseCanvas.getContext('2d');
    const noiseData = nCtx.createImageData(noiseSize, noiseSize);
    for (let i = 0; i < noiseData.data.length; i += 4) {
      const v = Math.random() * 255;
      noiseData.data[i] = v;
      noiseData.data[i+1] = v;
      noiseData.data[i+2] = v;
      noiseData.data[i+3] = 255;
    }
    nCtx.putImageData(noiseData, 0, 0);
    // Create a repeating pattern from the noise
    this.noisePattern = this.ctx.createPattern(noiseCanvas, 'repeat');

    // Bind and listen for resize to redraw
    this.drawBlob = this.drawBlob.bind(this);
    window.addEventListener('resize', this.drawBlob);
    // Initial draw
    this.drawBlob();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.drawBlob);
  },
  methods: {
    drawBlob() {
      const canvas = this.$refs.canvas;
      const ctx = this.ctx;
      const container = this.$el;
      // Match canvas size to container, accounting for devicePixelRatio
      const rect = container.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const width = size;
      const height = size;
      const dpr = window.devicePixelRatio || 1;
      // Reset transform before scaling or clearing
      ctx.setTransform(1, 0, 0, 1, 0, 0);
        canvas.width = Math.floor(width * 2);
        canvas.height = Math.floor(height * 2);
        canvas.width = width * dpr;
      canvas.height = height * dpr;
        // canvas.width = Math.floor(width);
        // canvas.height = Math.floor(height);
    //   canvas.width = width;
    //   canvas.height = height;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      
      // Scale drawing context for high-DPI
      ctx.scale(dpr, dpr);
      // Clear previous drawing
      ctx.clearRect(0, 0, width, height);
      
      // Draw radial gradient from #9A4EFF to transparent
      const centerX = width / 2;
      const centerY = height / 2;
    //   const radius = Math.sqrt(centerX*centerX + centerY*centerY) * 1.2;
        const radius = size/2;
      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      grad.addColorStop(0, '#9A4EFF');
      grad.addColorStop(1, 'rgba(154,78,255,0)'); // same color, fully transparent
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Overlay subtle noise pattern for dithering (low opacity)
      ctx.save();
      ctx.globalAlpha = 0.02;  // very low opacity (2%)
      ctx.fillStyle = this.noisePattern;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }
}
</script>

<style scoped>
.blob-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden; /* hide blur overflow */
  /* z-index:0; */
}
.blob-bg canvas {
  border-radius: 50%;
  filter: blur(60px);
  /* Optionally boost brightness or contrast via filter if needed */
}
.blob-content {
  position: relative;
  z-index: 1;
  /* Your text/content styling here */
}
</style>
