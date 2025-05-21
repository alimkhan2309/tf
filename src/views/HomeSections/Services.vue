<template>
    <section ref="servicesSection">
        <div class="container">
            <div class="header">
                <h2>My Services</h2>
                <p>From brand identity to full-stack web development, I craft cohesive digital experiences that elevate your business. My services include brand design, UI/UX design, responsive web design, and custom website development. Delivered with a strategic blend of creativity and clean code to help you stand out online.</p>
            </div>
            <Accordion 
                :services="servicesData" 
                :start-animation="isInView"
            ></Accordion>
        </div>
    </section>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Accordion from '@/components/Accordion.vue';
import servicesData from '@/assets/data/services.json';

const servicesSection = ref(null);
const isInView = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                isInView.value = true;
                // Once animation is triggered, we can disconnect the observer
                observer.disconnect();
            }
        },
        {
            // Trigger when 30% of the section is visible
            threshold: 0.6,
            rootMargin: '0px'
        }
    );

    if (servicesSection.value) {
        observer.observe(servicesSection.value);
    }
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

section {
    height: fit-content;
    background-color: $violet-dark;

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 64px;
        
        .header {
            h2 {
                color: $white;
                margin: 0;
            }
        }
    }
}
</style>