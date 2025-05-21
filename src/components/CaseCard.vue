<template>
  <div class="gallery-card">
    <img :src="imgSrc" :alt="title" class="gallery-img" />
    <div class="overlay">
      <h3 class="title">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CaseCard',
  props: {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return require('@/assets/images/' + this.image);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery-card {
  width: 100%;
  max-width: 512px;
  aspect-ratio: 502/738;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  background: #181818;
  cursor: pointer;
  transition: box-shadow 0.3s;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);

  &:hover {
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    .overlay {
      opacity: 1;
      pointer-events: auto;
    }
    .title {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: filter 0.4s;
}

.overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: 32px;
  background: linear-gradient(to top, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.7) 40%, rgba(20,20,20,0.0) 100%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}

.title {
  color: #fff;
  font-size: 2rem;
  font-family: 'Satoshi', sans-serif;
  margin: 0;
  opacity: 1;
  transform: translateY(30px);
  transition: transform 0.4s, opacity 0.4s;
}
</style>
