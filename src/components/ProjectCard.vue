<template>
    <div class="card" 
         :class="{popular: id===1}"
         @click="$emit('click')"
         role="button"
         tabindex="0">
        <img :src="imageUrl" :alt="title" class="card-image" />
        <div class="card-content">
            <div class="card-tags">
                <Tag :text="tag1" type="secondary" />
                <Tag :text="tag2" type="primary" />
            </div>
            <h3 class="card-title">{{ title }}</h3>
            <p>{{ description }}</p>
            <Button class="button" text="View Package" type="arrow"/>
        </div>
    </div>
</template>

<script>

import Tag from './Tag.vue';
import Button from './Button.vue'
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tag1: {
            type: String,
            required: true
        },
        tag2: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    components: {
        Tag, Button
    }
};
</script>

<style scoped lang="scss">

@import '@/assets/styles/variables.scss';

.card {
    display: flex;
    flex-direction: column;
    max-width: 512px;
    aspect-ratio: 192/217;
    overflow: hidden;
    padding:8px;
    text-align: left;
    color: $body-clr;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 32px;
    background-color:#EFE3FF;
    background-color:$purple-dark;
    transition: transform 0.2s;
    cursor: pointer;

    &:focus {
        outline: 2px solid $violet;
        outline-offset: 2px;
    }

    &.card.popular {
        background-color: $violet2;
        background-color: #AE71FF;
        transform: translateY(-2px);
        color: $dark;
        p {
            color: $violet-dark;
        }
    }
    
    &.card:hover {
        transform: translateY(-5px);
    }
    .card-image {
        width: 100%;
        height: auto;
    }
    
    
    .card-content {
        padding: 8px;
        display: flex;
        flex-direction:column;
        align-items: start;
        justify-content: start;
        flex:1;
        min-height: 0;
        
        .card-title {
            font-size: 1.5rem;
            margin-top:4%;
        }
        
        .card-description {
            font-size: 1rem;
            color: #555;
            margin: 0 0 16px;
        }
        .button {
            margin-top:auto;
        }
        
        .card-tags {
            display: flex;
            width: stretch;
            justify-content:space-between;
        }
    }
}


</style>