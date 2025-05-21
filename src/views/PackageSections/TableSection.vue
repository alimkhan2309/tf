<template>
  <section class="comparison-table">
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="feature-header">Features</th>
            <th v-for="pkg in packages" :key="pkg.id" 
                :class="{ 'professional': pkg.id === 'professional' }">
              {{ pkg.title }}
              <div class="price">{{ pkg.price }}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in compareFeatures" :key="feature.feature">
            <td class="feature-name">{{ feature.feature }}</td>
            <td v-for="pkg in packages" :key="pkg.id"
                :class="{ 'professional': pkg.id === 'professional' }">
              <span class="checkmark" v-if="feature[pkg.id]">✓</span>
              <span class="cross" v-else>—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  packages: {
    type: Array,
    required: true
  },
  compareFeatures: {
    type: Array,
    required: true
  }
});

const isVisible = ref(false);

onMounted(() => {
  // Add animation delay for each row
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach((row, index) => {
    const checkmarks = row.querySelectorAll('.checkmark, .cross');
    checkmarks.forEach(el => {
      el.style.setProperty('--row-index', index);
    });
  });

  // Intersection Observer for table visibility
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    },
    {
      threshold: 0.2
    }
  );

  const table = document.querySelector('.comparison-table');
  if (table) {
    observer.observe(table);
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

.comparison-table {
  width: 100%;
  padding: 2rem;
  color: $white;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.table-container {
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: auto;
  background: linear-gradient(
    145deg,
    rgba($violet-dark, 0.4) 0%,
    rgba($violet-dark, 0.2) 100%
  );
  border-radius: $border-radius;
  padding: 1.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba($violet, 0.1);

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba($violet-dark, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($violet, 0.3);
    border-radius: 4px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba($violet, 0.5);
    }
  }
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 600px;

  th, td {
    padding: 1.25rem;
    text-align: center;
    border-bottom: 1px solid rgba($violet, 0.1);
    transition: background-color 0.3s ease;

    &:first-child {
      text-align: left;
      padding-left: 2rem;
    }

    &.professional {
      background: rgba($violet, 0.08);
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(
          90deg,
          transparent,
          $violet,
          transparent
        );
      }

      &:hover {
        background: rgba($violet, 0.12);
      }
    }
  }

  th {
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
    border-bottom: 2px solid rgba($violet, 0.2);
    padding-bottom: 1.5rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba($violet, 0.3),
        transparent
      );
    }

    .price {
      font-size: 1rem;
      opacity: 0.9;
      margin-top: 0.5rem;
      color: $violet;
      font-weight: normal;
    }
  }

  tr:hover td {
    background-color: rgba($violet, 0.05);
  }
}

.feature-header {
  min-width: 250px;
  font-size: 1.1rem;
}

.feature-name {
  color: rgba($white, 0.9);
}

.checkmark {
  color: $violet;
  font-weight: bold;
  font-size: 1.2rem;
  opacity: 0;
  animation: scaleIn 0.3s ease-out forwards;
  animation-delay: calc(var(--row-index, 0) * 0.1s);
}

.cross {
  color: rgba($white, 0.3);
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
  animation-delay: calc(var(--row-index, 0) * 0.1s);
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .comparison-table {
    padding: 1rem;
  }

  .table-container {
    padding: 1rem;
    border-radius: $border-radius;
  }

  .feature-header {
    min-width: 180px;
  }

  table {
    th, td {
      padding: 1rem;
      font-size: 0.95rem;

      &:first-child {
        padding-left: 1rem;
      }
    }

    th {
      font-size: 1rem;
      padding-bottom: 1.25rem;

      .price {
        font-size: 0.9rem;
      }
    }
  }
}
</style>