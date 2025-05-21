<template>
    <button :class="`btn btn-${type}`" @click="handleClick">
        <span>
            {{ text }}
        </span>
        <img 
        v-if="type==='arrow'"
        :src="arrowIcon" 
        alt="arrow" 
        class="icon" />
    </button>
</template>

<script>

import arrowIcon from'@/assets/images/svg/arrow.svg'

export default {
    name: "Button",
    props: {
        type: {
            type: String,
            default: "primary",
        },
        text: {
            type: String,
            default: "Click Me",
        },
    },
    setup() {
        return {
            arrowIcon
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

$primary-color: #F2E9FF;

.btn {
    width:fit-content;
    display: flex;
    flex-direction: row;
    padding: 16px 40px;
    border-radius: $btn-border-radius;
    font-size: $btn-font-size;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.btn-primary {
        background-color: $btn-background-color;
        color: $black;

        &:hover {
            background-color: darken($btn-background-color, 10%);
        }
    }

    &.btn-secondary {
        background-color: transparent;
        color: #fff;

        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }
    &.btn-arrow {
        padding: 5px 15px;
        background-color: $body-clr;
        color: $dark;
        border: none;
        font-size: $small;
        gap: 5px;

        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }

    &.btn-mobile-cta {
        background: $highlight;
        color: $white;
        padding: clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px);
        font-size: clamp(16px, 3vw, 20px);
        position: relative;
        border: none;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                45deg,
                rgba($white, 0.1),
                rgba($white, 0)
            );
            transform: translateX(-100%);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba($violet, 0.25);
            
            &::before {
                transform: translateX(100%);
            }
        }

        &:active {
            transform: translateY(0);
        }
    }
}


</style>