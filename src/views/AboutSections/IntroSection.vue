<template>
  <section class="intro">
    <Blob class="background-blob" />
    <div class="container">
      <div class="content" v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        :delay="300">
        <div class="wrap">
            <h5>About Me</h5>
            <h1>Turning <span class="highlight">Vision</span> into Digital Reality</h1>
        </div>
        <p>As a frontend developer specializing in creating unique digital experiences, I blend technical expertise with creative design to build websites that not only look stunning but also perform exceptionally.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Motion } from '@motionone/vue'
import Blob from '@/components/Blob.vue'
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.intro {
  height: fit-content;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  .background-blob {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.5;
  }
  
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: $vertical-padding $horizontal-padding;
    position: relative;
    z-index: 1;
  }

  .content {
    max-width: 940px;
    display: flex;
    flex-direction: column;
    gap: $r;
    text-align: center; // Centers text
    
    h5 {
      color: $violet;
    }

    h1 {
      line-height: 1.1;
      font-size: clamp(2.5rem, 5vw, 4.5rem); // Responsive font size
      margin-top:-1rem;
    }

    p {
      max-width: 65ch;
      opacity: 0.8;
      margin: 0 auto; // Centers paragraph
      font-size: clamp(1rem, 1.2vw, 1.25rem); // Responsive font size
    }
  }
}

@media (max-width: 768px) {
  .intro {
    .container {
      width: 100%;
      //   margin:auto;
      padding:$vertical-padding 0;
    }
    .content {
        padding:0;
        margin: $vertical-padding $horizontal-padding;
      text-align: left; // Left align on mobile
      
      p {
        margin: 0; // Remove center alignment on mobile
      }
    }
  }
}
</style>