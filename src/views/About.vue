<template>
  <main>
    <IntroSection />
    <JourneySection />
  </main>
</template>

<script setup>
import IntroSection from './AboutSections/IntroSection.vue'
import JourneySection from './AboutSections/JourneySection.vue'
</script>

<style scoped lang="scss">
main {
  width: 100%;
  min-height: 100vh;
}
</style>