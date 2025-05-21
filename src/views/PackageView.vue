<template>
  <section class="package-view">
    <div class="header">
      <div class="wrap">
        <h4 class="highlight">Packages</h4>
        <h2>Choose Your Perfect Package</h2>
      </div>
      <p>Select a package that best fits your needs and let's create something amazing together.</p>
    </div>

    <PackageCardDeck 
      :packages="packages"
      :selected-package="selectedPackage"
      @compare="handleCompare"
      @select="handleSelect"
    />

    <!-- <TableSection 
      ref="tableSection"
      :packages="packages"
      :compare-features="compareFeatures"
      class="comparison-section"
    /> -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PackageCardDeck from '@/components/PackageCardDeck.vue';
import TableSection from '@/views/PackageSections/TableSection.vue';
import packagesData from '@/assets/data/packages.json';

const route = useRoute();
const router = useRouter();
const packages = ref(packagesData.packages);
const compareFeatures = ref(packagesData.compareFeatures);
const selectedPackage = ref(route.params.selectedPackage);
const tableSection = ref(null);

const handleCompare = () => {
  tableSection.value?.$el.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
};

const handleSelect = (packageId) => {
  console.log('Selected package:', packageId);
};

onMounted(() => {
  if (selectedPackage.value && !packages.value.find(p => p.id === selectedPackage.value)) {
    router.replace({ name: 'packages' });
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.package-view {
  min-height: 100vh;
  padding-top: 80px; // Account for navbar
  background: $black;
  color: $white;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    text-align: center;
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 $s;

    .wrap {
      height: fit-content;
      margin-bottom: $s;
    }

    h4 {
      margin-bottom: $xs;
    }

    p {
      color: $body-clr;
      max-width: 600px;
      margin: 0 auto;
    }
  }
}

.comparison-section {
  width: 100%;
  margin-top: $l;
  padding: $m 0;
}
</style>
