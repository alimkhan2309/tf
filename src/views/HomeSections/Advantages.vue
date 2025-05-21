<template>
    <section ref="advantagesSection">
        <div class="torch" ref="torch"></div>

        <div class="container">
          <div class="header">
            <h4 class="highlight">Advantages</h4>
            <h2>Why Clients Choose Me</h2>
            <p>I combine design, strategy, and execution to deliver standout digital experiences that drive results.</p>
          </div>
          <div class="grid" ref="cardsGrid">
            <AdvantageCard 
            v-for="(card, index) in advantages" 
            :key="index"
            :card-object="card"
            :id="index"
            :appear-delay="index * 0.1"
            ref="cards"
            />
          </div>
        </div>
    </section>
</template>

<script setup>
import AdvantageCard from '@/components/AdvantageCard.vue';
import advantagesRaw from '@/assets/data/advantages.json';
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const advantages = computed(() =>
  advantagesRaw.filter(card => card && card.cardIconUrl)
);

const torch = ref(null);
const advantagesSection = ref(null);
const cards = ref([]);

const moveTorch = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  if (torch.value) {
    torch.value.style.setProperty('--x', `${x}px`);
    torch.value.style.setProperty('--y', `${y}px`);
  }
};

onMounted(() => {
  window.addEventListener('mousemove', moveTorch);

  // Create intersection observer for the section
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        // Trigger animations when section comes into view
        animateCards();
        observer.disconnect();
      }
    },
    {
      threshold: 0.2 // Trigger when 20% of the section is visible
    }
  );

  if (advantagesSection.value) {
    observer.observe(advantagesSection.value);
  }
});

const animateCards = () => {
  // Get all card elements
  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });
};

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', moveTorch);
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

section {
    height: fit-content;
    background-color: $dark-black;
    color: $white;
    margin-top:128px;

    .header {
        text-align: left;
    }
    .grid {
        align-items: start;
        justify-content:start;
        margin: $m $r;
        width:stretch;
        
        display: grid;
        grid-template-columns: auto auto auto;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        gap: $s;

        .card {
            opacity: 0;
            transform: translateY(50px);
            will-change: transform, opacity;
        }
    }
    .torch {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 2;
        background: radial-gradient(
            circle at var(--x) var(--y),
            rgba(154, 78, 255, 0.5) 100px,
            transparent 200px
        );
        filter: blur(100px);
        mix-blend-mode: multiply;

        transition: background 0.05s ease-out;
    }
}

@media (max-width:576px) {
  section {
    .container {
      justify-content: center;
      align-items: center;
      width: stretch;
      margin:16px;
    
      .grid {
        width: stretch;
        margin-inline:0;
        grid-template-columns: 1fr ;
        grid-template-columns: repeat(auto-fill, 1fr);
      }
    }
  }
}
</style>