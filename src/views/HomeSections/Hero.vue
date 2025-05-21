<template>
    <section class="hero">
        <Blob class="blob blob-2" />
        <!-- <Blob class="blob blob-1" />s -->
        <!-- <img class="ellipse" src="@/assets/images/ellipse.png" alt=""> -->
        <!-- <div class="blur"></div> -->
        <!-- <Blob class="blob blob-3" /> -->
        <div class="container">
          <Motion
            :initial="{ y: 50, opacity: 0 }"
            :animate="{ y: 0, opacity: 1 }"
            :transition="{ duration: 1, delay: 0.5 }"
            class="w-full md:w-1/2 flex flex-col items-start space-y-6"
          > 
          <div class="content">
            <h5>Hello, I'm Alim</h5>
            <!-- <p class="">Sleek, smart, and custom—from logo to launch.</p> -->
            <h1>Create <span class="highlight">stunning</span> digital experiences</h1>
            <!-- <h1>Sleek, smart, and custom. <br/>From logo to <span class="highlight">launch.</span> </h1> -->
              <p>I design and build custom digital experiences for professionals, creatives, and service-based businesses who care deeply about how they show up online. From branding to user experience to custom development, I turn your vision into a high-impact, high-converting presence.</p>
              <a href="#form-cta">
                <Button text="Get Free Consultation" type="primary" />
              </a>
            </div>
          </Motion>
          
          
          <Motion
          :initial="{ x: 400, opacity: 0 }"
          :animate="{ x: 0, opacity: 1 }"
          :transition="{ duration: 1, easing: 'ease-in-out' }"
          
          >
          <div class="profile">
            <div class="mask">
                <img src="@/assets/images/profile.jpg" alt="profile-image">
              </div>
            </div>
          </Motion>
        </div>
        <Motion
          :initial="{ y: 50, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ duration: 0.5, delay: 1 }"
          class="motion-wrapper"
        >
        <GlassBar class="fact-bar" />
      </Motion>
    </section>
</template>


<script setup>

import Button from '@/components/Button.vue'
import Blob from '@/components/Blob.vue'
import GlassBar from '@/components/GlassBar.vue'
import { Motion } from '@motionone/vue'

const components = {
    Button,
    Blob,
    GlassBar
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

section {
    position: relative;
    text-align: left;
    min-height: 100vh;
    overflow: hidden;
    z-index: 3;
    background-color: transparent;
    padding: $vertical-padding $horizontal-padding;
    display: flex;
    flex-direction: column;
    
    .container {
        // background-color:gray;
        width: 100%;
        display: flex; 
        // flex-wrap: wrap; 
        align-items: center;
        justify-content: start;
        z-index:5;
        margin:0;
        // margin-bottom:$m;
        gap: 128px;
        .content {
          min-width: 300px;
          flex: 1 1 327px;
          max-width: 940px;
          
          h5 {
            color: $white;
            font-weight: bold;
          }
          p {
            width: 85%;
          }

        h1 {
          font-weight: bold;
          padding-bottom: 20px;
          background-image: linear-gradient(to right, $violet -100%, white);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 100%;
        }

        p {
          color: rgb(255, 255, 255);
          margin-bottom: 40px;
          line-height: 1.5;
        }
      }

      .profile {
        flex: 0 1 auto;
      //   display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;

        .mask {
          width: clamp(160px, 22vw, 400px);
          aspect-ratio: 1 / 1;
          scale: 1.25;

          -webkit-mask-image: url('@/assets/images/hero-shape-mask.png');
          mask-image: url('@/assets/images/hero-shape-mask.png');
          mask-repeat: no-repeat;
          mask-size: contain;
          mask-position: center;
          -webkit-mask-size: contain;
          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;

          img {
            width: 100%;
            height: auto;
            display: block;
            transform: translateY(10%);
          }
        }
        }
    }
    .motion-wrapper {
      width: 100%;
      display: block;
      .fact-bar {
        margin-top: 64px;
        position:relative;
        // z-index: 10;
    }
  }

}
.blob {
  position: absolute;
  width: 100vw;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.35;

  &.blob-1 {
    top: -80%;
    left: -45%;
  }

  &.blob-2 {
    top: 50%;
    left: 5%;
    transform: translateY(-50%) scaleX(2);
    opacity: 0.8;

    svg {
      width: 1;
    }
  }

  &.blob-3 {
    bottom: 0;
    left: 0;
  }
}

@media(max-width:800px) {
    section {
        justify-content:start;
        height:fit-content;
        padding:$vertical-padding $horizontal-padding;
        .container {
            height:fit-content;
            flex-direction: column-reverse;
            gap:0;
            // align-items: start;
            // justify-content: start;
            .profile {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .mask {
                    width:164.06px;
                }
            }
        }
    }
}

</style>