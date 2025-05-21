<template>
    <div class="tag" :class="type">
        <p>{{ text }}</p>
    </div>
</template>


<script>
export default {
    props: ['text', 'type']
}
</script>


<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.tag {
    border-radius: 3px;
    width: fit-content;
    
    &.primary {
        background-color: $violet;
        p {color: $white;}
    }
    
    &.secondary {
        background-color: $body-clr;
    }
    p {
        font-weight: bold;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 1rem;
        color: $dark;
    }
}

</style>