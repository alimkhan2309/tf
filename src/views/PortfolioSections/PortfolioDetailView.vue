<template>
  <section>
    <div class="container">
      <h2>{{ projectName }}</h2>
      <div class="pdf-wrapper">
        <object
          v-if="pdfUrl"
          class="pdf-frame"
          :data="pdfUrl"
          type="application/pdf"
        >
          <div class="fallback">
            <p>Unable to display PDF directly. 
              <a :href="pdfUrl" download class="download-link">Download PDF</a>
            </p>
          </div>
        </object>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectName = route.params.projectName
const error = ref(null)
const pdfUrl = ref(null)

console.log('Project name from route:', projectName)

const pdfMap = {
  'nexacloud': require('@/assets/data/nexacloud.pdf'),
  'alruba': require('@/assets/data/AlRuba.pdf'),
  'haus&hue': require('@/assets/data/haus&hue.pdf')
}

const loadPdf = () => {
  console.log('Attempting to load PDF for project:', projectName)
  try {
    const pdfFile = pdfMap[projectName.toLowerCase()]
    if (!pdfFile) {
      throw new Error(`No PDF mapping found for ${projectName}`)
    }

    // The require call returns an object with a default property containing the URL
    pdfUrl.value = pdfFile.default || pdfFile
    console.log('PDF URL set to:', pdfUrl.value)
  } catch (err) {
    error.value = 'Error loading PDF'
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      projectName,
      pdfMap: Object.keys(pdfMap)
    })
  }
}

onMounted(() => {
  loadPdf()
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables.scss';

section {
  height: fit-content;
  padding: $vertical-padding 0;
}

.pdf-wrapper {
  position: relative;
  width: 100%;
  padding-top: 141.4%; // A4 aspect ratio
  margin-top: 1.5rem;
  background: $dark;
  border-radius: $border-radius;
}

.pdf-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: $border-radius;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.fallback {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: $white;
  
  a {
    color: $violet;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white;
  font-size: $body;
}

.download-link {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: $violet;
  color: $white;
  border-radius: $btn-border-radius;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: darken($violet, 10%);
    transform: translateY(-2px);
  }
}
</style>
