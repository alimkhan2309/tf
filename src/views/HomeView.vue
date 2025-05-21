<template>
<div class="home">
    <Hero />
    <Services />
    <Portfolio/>
    <Advantages />
    <Project />
    <FormView />
  </div>
</template>

<script>
import Hero from './HomeSections/Hero.vue';
import Services from './HomeSections/Services.vue';
import Advantages from './HomeSections/Advantages.vue';
import Project from './HomeSections/Project.vue';
import Portfolio from './HomeSections/Portfolio.vue';
import FormView from './FormSection.vue'

export default {
  name: 'HomeView',
  components: {
    Hero, Services, Advantages,Project,Portfolio, FormView
  }
}
</script>

<style scoped lang="scss">
// .NavigationBar {
//   // position:fixed;
//   display: flex;
// }
</style>
