<template>
    <div class="bar">
        <div class="wrap">
            <div class="fact">
                <h4>25+</h4>
                <div class="txt"><p>Websites Designed</p></div>
            </div>
            <div class="fact">
                <h4>4+</h4>
                <div class="txt"><p>Years Experience</p></div>
            </div>
            <div class="fact">
                <h4>50+</h4>
                <div class="txt"><p>Happy Clients</p></div>
            </div>
            <div class="fact">
                <h4>100%</h4>
                <div class="txt"><p>Success Rate</p></div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.bar {
  width: 100%;
  height: fit-content;
  border-radius: $border-radius;
  color: $white;
  position: relative;
  max-width: 100%;
  background: linear-gradient(
    120deg,
    rgba($violet, 0.08) 0%,
    rgba($blue, 0.08) 50%,
    rgba($violet, 0.08) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba($white, 0.05);
  box-shadow: 0 4px 24px -1px rgba($black, 0.1);
  overflow: hidden;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba($violet, 0.03) 0%,
      transparent 50%
    );
    animation: rotate 15s linear infinite;
    z-index: -1;
  }

  .wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    // padding: clamp(1.5rem, 1rem + 2vw, 2.5rem) 0;
    gap: clamp(1rem, 0.5rem + 2vw, 2rem);

    .fact {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: clamp(0.5rem, 0.25rem + 1vw, 1rem);
      
      h4 {
        font-size: clamp(2rem, 1.5rem + 2vw, 3rem);
        background: $highlight;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
      
      .txt {
        max-width: 80px;
        display: flex;
        align-items: center;
        height: 100%;
        
        p {
          font-size: $small;
          line-height: 1.2;
          margin: 0;
        }
      }
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .bar {
    border-radius: calc($border-radius / 2);
    
    .wrap {
      flex-direction: column;
      padding: $r $s;
      gap: $r;

      .fact {
        width: 100%;
        flex-direction: column;
        text-align: center;
        gap: $xs;

        .txt {
          max-width: 120px;
          text-align: center;
          
          p {
            width: 100%;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .bar {
    .wrap {
      padding: $s;
      gap: $r;
    }
  }
}
</style>