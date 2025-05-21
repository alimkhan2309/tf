<template>
    <div class="accordion">
        <div
            v-for="(service, index) in services"
            :key="index"
            class="accordion-item"
            :class="{ active: activeIndex === index }"
            ref="items"
            @click="toggleAccordion(index)"
        >
            <div class="accordion-header">
                <h3>0{{ index + 1 }}</h3>
                <h4>{{ service.title  }}</h4>
                <span class="arrow" :class="{ rotated: activeIndex === index }">▼</span>
            </div>
            <transition name="drop">
                <div v-show="activeIndex === index" class="accordion-content">
                    <h5 class="description">{{ service.description }}</h5>
                    <ul class="deliverables">
                        <li v-for="(deliverable, i) in service.deliverables" :key="i">
                            <p>{{ deliverable }}</p>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { nextTick, watch } from 'vue';

export default {
    name: "Accordion",
    props: {
        services: {
            type: Object,
            required: false
        },
        startAnimation: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            activeIndex: null,
        };
    },
    watch: {
        startAnimation(newVal) {
            if (newVal) {
                this.animateItems();
            }
        }
    },
    methods: {
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        animateItems() {
            nextTick(() => {
                const items = this.$refs.items;
                if (!items || !items.length) return;

                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px)';
                    item.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`;
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                });
            });
        }
    },
    mounted() {
        // Only animate immediately if startAnimation is true
        if (this.startAnimation) {
            this.animateItems();
        }
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.accordion {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    height:fit-content;
    gap:16px;
    .accordion-item {
        // height: 94px;
        height: fit-content;
        background-color: $purple-dark;
        padding: 16px 28px; // ======================== make responsive 
        color: $body-clr;
        // margin-bottom: 10px;
        border-radius: $border-radius;
        overflow: hidden;
        // transition: background-color 0.3s ease;
        // transition: all 0.3s ease-out;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        gap: 16px; //======================================= make responisve

        opacity:0;
        transform: translateY(40px);
        transition: opacity 0.6 ease, transform 0.6 ease;
        &.active {
            background: linear-gradient(to right, #5C2F99, #1F1033);
        }

        .accordion-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;

            .number {
                font-size: $h3;
                font-weight: bold;
                margin-right: 10px;
            }

            .header {
                flex-grow: 1;
            }

            .arrow {
                transition: transform 0.3s ease;

                &.rotated {
                    transform: rotate(180deg);
                }
            }
        }

        .accordion-content {
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.1);
            text-align: start;
            border-radius: 16px;
            will-change: max-height, opacity, transform;

            .description {
                margin-bottom: 10px;
            }

            .deliverables {
                list-style: disc;
                padding-left: 20px;
            }
        }
    }
}

.drop-enter-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out, transform 0.3s ease-out;
}

.drop-leave-active {
  transition: max-height 0.01s ease-in, opacity 0.02s ease-in, transform 0.02s ease-in;
}

.drop-enter-from,
.drop-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.drop-enter-to,
.drop-leave-from {
  max-height: 1000px; // large enough to cover full content
  opacity: 1;
  transform: translateY(0);
}


</style>