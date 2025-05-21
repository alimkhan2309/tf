<template>
<section>
    <div class="header">
        <div class="wrap">
            <h4 class="highlight">Invest</h4>
            <h2>Simple Pricing. No Surprises.</h2>
        </div>
        <p>From landing pages to full platforms, our fixed-price packages offer clear deliverables with no hidden fees and real results.</p>
    </div>

    <div class="cards-row">
      <ProjectCard
        v-for="(card, index) in cards"
        :key="index"
        v-bind="card"
        :id="index"
        @click="navigateToPackage(card.packageId)"
      />
    </div>
</section>    
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProjectCard from '@/components/ProjectCard.vue';
import starterImg from '@/assets/images/projects/Starter.png';
import businessImg from '@/assets/images/projects/Business.png';
import enterpriseImg from '@/assets/images/projects/Enterprise.png';

export default {
  components: {
    ProjectCard
  },
  setup() {
    const router = useRouter();
    const cards = [
      {
        title: 'Starter Package',
        description: 'Perfect for small businesses and startups looking to establish an online presence.',
        tag1: 'Affordable',
        tag2: '10-day guarantee',
        imageUrl: starterImg,
        packageId: 'essential'
      },
      {
        title: 'Business Package',
        description: 'Ideal for growing businesses that need a professional and scalable website.',
        tag1: 'Professional',
        tag2: 'Scalable',
        imageUrl: businessImg,
        packageId: 'professional'
      },
      {
        title: 'Enterprise Package',
        description: 'Comprehensive solutions for large enterprises with advanced requirements.',
        tag1: 'Comprehensive',
        tag2: 'Advanced',
        imageUrl: enterpriseImg,
        packageId: 'enterprise'
      }
    ];

    const navigateToPackage = (packageId) => {
      router.push({ 
        name: 'packages',
        params: { selectedPackage: packageId }
      });
    };

    return {
      cards,
      navigateToPackage
    };
  }
};
</script>

<style scoped lang="scss"> 

@import "@/assets/styles/variables.scss";

section {
    height: fit-content;
    color: $white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap:4rem;
    background-color: $violet-dark;
    padding: $vertical-padding $horizontal-padding;

    // .header {
      
    // }
    
    .cards-row {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(309px, max-content));
        justify-content: center;
        align-items: center;
        // background-color:gray;
        gap: 2rem;
        margin-top: 24px;
        // min-height:445px;
        // height: fit-content;
        // display: flex;
        // flex-wrap: wrap;
    }
}

// @media (max-width:800px) {
//     .cards-row {
//         grid-template-columns: 1fr 1fr;
//         background-color: red;
//     }
// }

</style>