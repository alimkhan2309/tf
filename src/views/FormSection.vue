<template>
<section id="form-cta">
    <div class="container">
        <div class="content" v-motion 
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="300">
            <Tag text="10 day delivery guarantee" type="primary"/>
            <h2>Custom websites built for agencies</h2>
            <h4>Save 30% on your first project.</h4>
            <p class="subtitle">Make your first impression unforgettable. I design high performing websites tailored for event planners, entertainers, and more. Complete with booking systems, sleek galleries, and mobile-ready designs.</p>
        </div>
        <div class="form-wrapper" v-motion 
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0 }"
            :delay="500">
            <Form/>
        </div>
    </div>
    <Blob class="my-blob"></Blob>
</section>
</template>

<script>
import { Motion } from '@motionone/vue'
import Form from "@/components/Form.vue";
import Tag from "@/components/Tag.vue";
import Blob from "@/components/Blob.vue";

export default {
    name: "AboutSection",
    components: {
        Form,
        Tag,
        Blob,
        Motion
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

section {
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    position: relative;
    padding: $vertical-padding 0;
    overflow: hidden;

    .container {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: clamp(2rem, 5vw, 8rem);
        max-width: 1440px;
        margin: 0 auto;
        padding: 0 $horizontal-padding;
        
        @media (max-width: 1024px) {
            flex-direction: column;
            text-align: center;
            gap: 4rem;
        }

        .content {
            flex: 1;
            max-width: 600px;
            text-align: left;
            
            @media (max-width: 1024px) {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 100%;
            }

            h2 {
                margin: 1rem 0;
            }

            h4 {
                color: $violet;
                margin-bottom: 1rem;
            }

            .subtitle {
                opacity: 0.9;
                line-height: 1.6;
            }
        }        .form-wrapper {
            flex: 1;
            max-width: 587px;
            width: 100%;
            padding: 1rem;
            box-sizing: border-box;
        }
    }

    .my-blob {
        position: absolute;
        z-index: 1;
        opacity: 0.5;
        filter: blur(100px);
        transform: scale(1.5);
    }
}
</style>