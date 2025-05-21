<template>
  <div class="card-deck">
    <swiper
      :modules="modules"
      :effect="'cards'"
      :grab-cursor="true"
      :initial-slide="initialSlide"
      :centered-slides="true"
      :cards-effect="{
        rotate: true,
        perSlideRotate: 4,
        perSlideOffset: 8,
      }"
      class="package-swiper"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="card in sortedCards" :key="card.id" class="package-card">
        <div class="card-content">
          <h3>{{ card.title }}</h3>
          <p class="price">{{ card.price }}</p>
          <p class="original-price" v-if="card.originalPrice">{{ card.originalPrice }}</p>
          <p class="audience">{{ card.targetAudience }}</p>
          <ul class="features">
            <li v-for="feature in card.features" :key="feature">{{ feature }}</li>
          </ul>
          <p class="addon" v-if="card.addOnNote">{{ card.addOnNote }}</p>          
          <div class="buttons">
            <router-link to="/#form-cta">
              <Button text="Get Started" type="primary" @click="$emit('select', card.id)" />
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    
    <div class="navigation-buttons">
      <button class="nav-button prev" @click="slidePrev" :disabled="!canSlidePrev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="nav-button next" @click="slideNext" :disabled="!canSlideNext">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Button from './Button.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards, Keyboard, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

const props = defineProps({
  packages: {
    type: Array,
    required: true
  },
  selectedPackage: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['compare', 'select']);

const swiperInstance = ref(null);
const canSlidePrev = ref(false);
const canSlideNext = ref(true);

const sortedCards = computed(() => {
  if (!props.selectedPackage) return props.packages;
  const selectedIndex = props.packages.findIndex(p => p.id === props.selectedPackage);
  if (selectedIndex === -1) return props.packages;
  return props.packages;
});

const initialSlide = computed(() => {
  if (!props.selectedPackage) return 0;
  return props.packages.findIndex(p => p.id === props.selectedPackage);
});

const modules = [EffectCards, Keyboard, Navigation];

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  updateNavButtons(swiper);
};

const onSlideChange = () => {
  if (swiperInstance.value) {
    updateNavButtons(swiperInstance.value);
  }
};

const updateNavButtons = (swiper) => {
  canSlidePrev.value = !swiper.isBeginning;
  canSlideNext.value = !swiper.isEnd;
};

const slidePrev = () => {
  swiperInstance.value?.slidePrev();
};

const slideNext = () => {
  swiperInstance.value?.slideNext();
};
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.card-deck {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.package-swiper {
  width: 500px;
  height: 700px;
}

.package-card {
  background: linear-gradient(135deg, rgba($violet-dark, 0.95), rgba($black, 0.98));
  border-radius: $border-radius;
  padding: $r;
  color: $white;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: $border-radius;
    padding: 1px;
    background: linear-gradient(135deg, $violet, rgba($cyan, 0.5));
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.5;
  }

  .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.25rem;

    h3 {
      font-size: 1.75rem;
      font-weight: bold;
      margin: 0;
      background: linear-gradient(135deg, $white, rgba($violet, 0.8));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .price {
      font-size: 2.5rem;
      font-weight: bold;
      margin: 0;
      color: $violet;
      text-shadow: 0 0 20px rgba($violet, 0.3);
    }

    .original-price {
      font-size: 1rem;
      color: rgba($white, 0.5);
      text-decoration: line-through;
      margin: -1rem 0 0 0;
    }

    .audience {
      font-size: 1rem;
      color: rgba($white, 0.8);
      line-height: 1.5;
      margin: 0;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba($violet, 0.2);
    }

    .features {
      flex: 1;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: rgba($violet-dark, 0.1);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba($violet, 0.3);
        border-radius: 2px;
      }

      li {
        display: flex;
        align-items: flex-start;
        color: rgba($white, 0.9);
        font-size: 1rem;
        line-height: 1.4;

        &::before {
          content: "✓";
          color: $violet;
          margin-right: 0.75rem;
          font-weight: bold;
          flex-shrink: 0;
        }
      }
    }

    .addon {
      font-size: 0.9rem;
      color: rgba($white, 0.6);
      margin: 0;
      font-style: italic;
      padding-top: 0.5rem;
      border-top: 1px solid rgba($violet, 0.2);
    }

    .buttons {
      display: flex;
      justify-content: center;
      margin-top: auto;
      a {
        text-decoration: none;
      }
    }
  }
}

.navigation-buttons {
  position: absolute;
  width: 100%;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  pointer-events: none;
  z-index: 10;

  .nav-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba($violet, 0.1);
    border: 1px solid rgba($violet, 0.3);
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    pointer-events: auto;

    &:hover:not(:disabled) {
      background: rgba($violet, 0.2);
      border-color: rgba($violet, 0.5);
      transform: scale(1.1);
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
}

@media (max-width: 768px) {
  .card-deck {
    padding: 1rem 0.25rem;
    height: auto;
    min-height: 100vh;
  }

  .package-swiper {
    width: 100vw;
    max-width: 100vw;
    min-width: 0;
    height: min(90vw, 90vh);
    max-height: 90vh;
    min-height: 320px;
    box-sizing: border-box;
  }

  .package-card {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 1rem !important;
    border-radius: $border-radius;
    .card-content {
      padding: 1rem !important;
      gap: 0.75rem;
      h3 {
        font-size: 1.2rem;
      }
      .price {
        font-size: 1.5rem;
      }
      .audience,
      .original-price,
      .addon {
        font-size: 0.9rem;
      }
      .features li {
        font-size: 0.95rem;
      }
    }
  }

  .navigation-buttons {
    padding: 0 0.5rem;
    .nav-button {
      width: 36px;
      height: 36px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}

@media (max-width: 480px) {
  .package-swiper {
    width: 100vw;
    max-width: 100vw;
    height: min(80vw, 80vh);
    max-height: 80vh;
    min-height: 220px;
    box-sizing: border-box;
  }
  .package-card {
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
    padding: 0.5rem !important;
    .card-content {
      padding: 0.5rem !important;
      h3 {
        font-size: 1rem;
      }
      .price {
        font-size: 1.1rem;
      }
      .features li {
        font-size: 0.85rem;
      }
    }
  }
}
</style>
