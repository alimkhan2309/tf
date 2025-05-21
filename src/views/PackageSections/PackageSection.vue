<template>
    <div class="project-package-card" :class="borderColor">
      <div class="left">
        <h3>Essential Package</h3>
        <p class="price">800 AED</p>
      </div>
      <div class="right">
        <ul>
          <li>Responsive Website</li>
          <li>Custom Design & Branding</li>
          <li>Up to 5 Sections</li>
          <li>Basic SEO Setup</li>
          <li>CMS Integration</li>
        </ul>
        <div class="buttons">
          <button class="compare">Compare</button>
          <button class="order">Order</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectPackageCard',
    props: {
      borderColor: {
        type: String,
        default: 'green'
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  .project-package-card {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    border: 2px solid;
    border-radius: 2rem;
    width: clamp(320px, 90vw, 900px);
    background-color: #0d0c10;
    color: white;
    transition: all 0.3s ease-in-out;
  
    &.green {
      border-color: #3ce76e;
    }
    &.purple {
      border-color: #9353f8;
    }
    &.orange {
      border-color: #ffb347;
    }
  
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
  
      h3 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .price {
        font-size: 2rem;
        font-weight: 600;
      }
    }
  
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      gap: 1rem;
      text-align: right;
  
      ul {
        list-style: disc;
        padding-left: 1rem;
      }
  
      .buttons {
        display: flex;
        gap: 1rem;
  
        .compare {
          background: #6f42c1;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          cursor: pointer;
        }
  
        .order {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          cursor: pointer;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .project-package-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
  
      .right {
        align-items: center;
      }
    }
  }
  </style>