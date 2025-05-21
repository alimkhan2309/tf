<template>
  <div class="card" 
       @mouseenter="hover = true" 
       @mouseleave="hover = false">
    <div class="wrap">
      <img class="icon" 
           :src="cardImageUrl" 
           :alt="cardTitle" 
           :style="id === 1 ? `opacity: ${hover ? 0 : 1}; transition: opacity 0.6s;` : ''" />
      <h5>{{ cardTitle }}</h5>
      <p>{{ cardDetails }}</p>
      
      <!-- Sparkle animation (only for first card) -->
      <div v-if="id === 1"
           class="sparkle-animation"
           :class="{ active: hover, deactivating: !hover }">          
        <img v-for="n in 5"
             :key="n"
             :src="star"
             alt="star"
             class="star"
             :class="'star-' + n" />
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/assets/images/svg/star.svg';

export default {
  props: {
    cardObject: Object,
    id: Number,
    appearDelay: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      star,
      hover: false
    };
  },
  computed: {
    cardTitle() {
      return this.cardObject.cardTitle;
    },
    cardDetails() {
      return this.cardObject.cardDetails;
    },
    cardImageUrl() {
      return require(`@/assets/images/advantages/${this.cardObject.cardIconUrl}`);
    }
  }
};
</script>

<style scoped lang="scss">
.card {
  aspect-ratio: 1;
  background: transparent;
  border: 1px solid rgba(250, 250, 250, 0.7);
  border-radius: 42px;
  position: relative;
  transform: translateY(50px);
  opacity: 0;
  
  .wrap {
    display: flex;
    flex-direction: column;
    margin: 32px 24px;

    img {
      width: 50px;
    }
  }

  .sparkle-animation {
    position: absolute;
    top: 15%;
    left: 12%;
    width: 0;
    height: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;

    .star {
      position: absolute;
      width: 20px;
      opacity: 0;
      animation: none;
      filter: drop-shadow(0 0 8px #fffdef);
    }

    &.active {
      .star-1 {
        animation: sparkle-up-left 0.6s ease-out forwards;
        width: 12px;
      }
      .star-2 {
        animation: sparkle-up-right 0.6s ease-out forwards 0.1s;
        width: 18px;
      }
      .star-3 {
        animation: sparkle-down-left 0.6s ease-out forwards 0.2s;
        width: 16px;
      }
      .star-4 {
        animation: sparkle-down-right 0.6s ease-out forwards 0.15s;
        width: 20px;
      }
      .star-5 {
        animation: sparkle-center 0.6s ease-out forwards 0.12s;
        width: 24px;
      }
    }
  }
  .sparkle-animation.deactivating {
      .star-1 {
          animation: sparkle-up-left-reverse 0.4s ease-out forwards;
      }
      .star-2 {
          animation: sparkle-up-right-reverse 0.4s ease-out forwards 0.05s;
      }
      .star-3 {
          animation: sparkle-down-left-reverse 0.4s ease-out forwards 0.1s;
      }
      .star-4 {
          animation: sparkle-down-right-reverse 0.4s ease-out forwards 0.08s;
      }
      .star-5 {
          animation: sparkle-center-reverse 0.4s ease-out forwards 0.06s;
      }
      }
}

@media (max-width:576px) {
  .card {
    aspect-ratio: 0;
    height:fit-content;
    width:stretch;
    // width: stretch;
    border: solid 0.1px rgba(250, 250, 250, 0.7);
    border-radius: 8.33px;
  }
}










/* KEYFRAMES */
@keyframes sparkle-up-left {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-130px, -110px) scale(1.2);
    opacity: 1;
  }
}
@keyframes sparkle-up-right {
  0% {
    transform: translate(0, 0) scale(0.6);
    opacity: 1;
  }
  100% {
    transform: translate(100px, -100px) scale(1.2);
    opacity: 1;
  }
}
@keyframes sparkle-down-left {
  0% {
    transform: translate(0, 0) scale(0.6);
    opacity: 1;
  }
  100% {
    transform: translate(-50px, -100px) scale(1.2);
    opacity: 1;
  }
}
@keyframes sparkle-down-right {
  0% {
    transform: translate(-5px, 10px) scale(0.6);
    opacity: 1;
  }
  100% {
    transform: translate(50px, -150px) scale(1.2);
    opacity: 1;
  }
}
@keyframes sparkle-center {
  0% {
    transform: scale(1.6);
    opacity: 1;
  }
  100% {
    transform: translate(0, -50px) scale(2.6);
    opacity: 1;
  }
}

@keyframes sparkle-up-left-reverse {
0% {
  transform: translate(-130px, -110px) scale(1.2);
  opacity: 1;
}
100% {
  transform: translate(0, 0) scale(1);
  opacity: 0;
}
}

@keyframes sparkle-up-right-reverse {
0% {
  transform: translate(100px, -100px) scale(1.2);
  opacity: 1;
}
100% {
  transform: translate(0, 0) scale(0.6);
  opacity: 0;
}
}

@keyframes sparkle-down-left-reverse {
0% {
  transform: translate(-50px, -100px) scale(1.2);
  opacity: 1;
}
100% {
  transform: translate(0, 0) scale(0.6);
  opacity: 0;
}
}

@keyframes sparkle-down-right-reverse {
0% {
  transform: translate(50px, -150px) scale(1.2);
  opacity: 1;
}
100% {
  transform: translate(-5px, 10px) scale(0.6);
  opacity: 0;
}
}

@keyframes sparkle-center-reverse {
0% {
  transform: translate(0, -50px) scale(2.6);
  opacity: 1;
}
100% {
  transform: scale(1.6);
  opacity: 0;
}
}


</style>
