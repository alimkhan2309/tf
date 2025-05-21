<template>
    <section>
        <div class="container">

            <div class="header">
                <div class="wrap">
                    <h4 class="highlight">Portfolio</h4>
                    <h2>My Latest Work</h2>
                </div>
                <p>Explore recent projects across different industries. From elegant designs to robust development, I bring ideas to life.</p>
            </div>
        </div>

        <div class="grid">
            <div class="grid-item"
            v-for="(item, index) in portfolio"
            :key="index">
            
            <router-link 
                :to="`/portfolio/${formatTitle(item.title)}`"
            >

                <CaseCard 
                :title="item.title"
                :image="item.image"
                />
            </router-link>
        </div>
    </div>
    </section>
</template>

<script setup>
import CaseCard from '@/components/CaseCard.vue';

const portfolio = [
    {
    "title":"Haus & Hue",
    'image': 'real-estate-portfolio.png',
    'pdfName': 'haus&hue.pdf'  // Added explicit PDF filename
    },
    {
    "title":"Al Ruba",
    'image': 'beauty-website-design-portfolio.png',
    'pdfName': 'AlRuba.pdf'
    },
    {
    "title":"NexaCloud",
    'image': 'tech-industry-portfolio.png',
    'pdfName': 'nexacloud.pdf'
    },
]

function formatTitle(title) {
  // Find the matching portfolio item
  const item = portfolio.find(p => p.title === title);
  if (item) {
    // Return the PDF name without the extension
    return item.pdfName.replace('.pdf', '');
  }
  // Fallback to the old formatting if no match found
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';
section {
    height:fit-content;
    padding: $vertical-padding $horizontal-padding;

    .container {
        margin: 0 auto;
    }
    // width:100%;
    h2 {
        color:$white;
    }
    .grid {
        display: grid;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(309px, max-content));
        justify-content: center;
        align-items: center;
        // background-color:gray;
        gap: 2rem;
        padding: 24px;
    }
}
</style>