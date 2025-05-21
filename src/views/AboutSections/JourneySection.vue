<template>
<section class="journey">
    <div class="container">
    <div class="content">
        <div class="timeline" v-motion
        :initial="{ opacity: 0, x: -50 }"
        :enter="{ opacity: 1, x: 0 }"
        :delay="400">
        <div class="milestone" v-for="(milestone, index) in milestones" :key="index"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="500 + (index * 100)">
            <span class="year">{{ milestone.year }}</span>
            <h4>{{ milestone.title }}</h4>
            <p>{{ milestone.description }}</p>
        </div>
        </div>
    </div>
    </div>
</section>
</template>

<script setup>
import { Motion } from '@motionone/vue'

const milestones = [
{
    year: '2020',
    title: 'Started Web Development Journey',
    description: 'Began learning frontend development and built my first websites.'
},
{
    year: '2021',
    title: 'Freelance Developer',
    description: 'Started taking on client projects and developing custom solutions.'
},
{
    year: '2022',
    title: 'Agency Collaboration',
    description: 'Partnered with design agencies to deliver high-end web experiences.'
},
{
    year: '2023',
    title: 'Portfolio Expansion',
    description: 'Specialized in creating unique digital experiences for various industries.'
}
]
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.journey {
.timeline {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $m;
    padding: $r 0;

    .milestone {
    @include glassmorph($bgcolor, $bento-border-color);
    padding: $r;
    border-radius: $border-radius;
    position: relative;
    
    .year {
        color: $violet;
        font-size: $h5;
        font-weight: bold;
        margin-bottom: $xs;
        display: block;
    }

    h4 {
        margin-bottom: $s;
    }

    p {
        opacity: 0.8;
        font-size: $body;
    }
    }
}
}

@media (max-width: 768px) {
.journey {
    .timeline {
    grid-template-columns: 1fr;
    gap: $r;
    }
}
}
</style>