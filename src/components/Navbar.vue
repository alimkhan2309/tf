<template>
    <nav class="navbar">
        <div class="navbar-content">
            <div class="logo">
                <router-link to="/">
                    <h3>ALIM</h3>
                </router-link>
            </div>
            
            <!-- Desktop Navigation -->
            <ul class="nav-links desktop-nav">
                <li v-for="(link, index) in links" :key="index">
                    <a :href="link.href" 
                       :style="{ '--i': index }">
                       {{ link.text }}
                    </a>
                </li>
            </ul>
            
            <!-- Mobile Burger Menu -->
            <div class="burger" 
                 :class="{ 'active': isMenuOpen }"
                 @click="toggleMenu"
                 role="button"
                 tabindex="0"
                 aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <!-- Mobile Navigation -->
            <div class="mobile-nav" :class="{ 'active': isMenuOpen }">
                <ul class="mobile-links">
                    <li v-for="(link, index) in links" 
                        :key="index"
                        :style="{ '--index': index }">
                        <a :href="link.href" 
                           @click="toggleMenu"
                           :class="{ 'active': currentSection === link.href }">
                            {{ link.text }}
                        </a>
                    </li>
                </ul>
                <div class="mobile-button">
                    <router-link to="/#form-cta">
                        <Button 
                            text="Start Your Project" 
                            type="mobile-cta"
                        />
                    </router-link>
                </div>
            </div>
            <router-link to="/#form-cta">

                <Button text="Get Started" type="arrow" class="nav-button desktop-only"/>
            </router-link>
        </div>
    </nav>
</template>

<script>
import Button from './Button.vue';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: "Navbar",
    components: {
        Button
    },
    setup() {
        const isMenuOpen = ref(false);
        const currentSection = ref('#home');
        
        const links = [
            { text: 'Home', href: '/' },
            { text: 'About', href: '/about' },
            { text: 'Services', href: '/packages' },
            { text: 'Contact', href: '/#form-cta' }
        ];

        const toggleMenu = () => {
            isMenuOpen.value = !isMenuOpen.value;
            document.body.style.overflow = isMenuOpen.value ? 'hidden' : '';
        };

        const updateCurrentSection = () => {
            const sections = links.map(link => link.href.substring(1));
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            
            if (current) {
                currentSection.value = '#' + current;
            }
        };

        onMounted(() => {
            window.addEventListener('scroll', updateCurrentSection);
            updateCurrentSection();
            
            // Initialize intersection observer for smooth section transitions
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        currentSection.value = '#' + id;
                    }
                });
            }, { threshold: 0.5 });

            links.forEach(link => {
                if (link.href.startsWith('#')) {
                    const element = document.querySelector(link.href);
                    if (element) observer.observe(element);
                }
            });
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', updateCurrentSection);
            document.body.style.overflow = '';
        });

        return {
            links,
            isMenuOpen,
            currentSection,
            toggleMenu
        };
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem $horizontal-padding;
    @include glassmorphism-nav();
    z-index: 1000;

    .navbar-content {
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }    .logo {
        a {
            text-decoration: none;
        }
        
        h3 {
            color: $white;
            font-weight: bold;
            font-size: 1.5rem;
            background: $highlight;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    }
}

.desktop-nav {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;

    li {
        a {
            color: $white;
            text-decoration: none;
            font-size: 1rem;
            position: relative;
            transition: color 0.3s ease;
            opacity: 0.8;
            transition: all 0.3s ease;
            
            &::after {
                content: '';
                position: absolute;
                width: 0;
                height: 2px;
                bottom: -4px;
                left: 0;
                background: $highlight;
                transition: width 0.3s ease;
            }

            &:hover {
                opacity: 1;
                &::after {
                    width: 100%;
                }
            }
        }
    }
}

.burger {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
    cursor: pointer;
    z-index: 1001;
    padding: 0;
    margin-left: auto;
    position: relative;
    
    span {
        display: block;
        width: 100%;
        height: 2px;
        background: $white;
        border-radius: 2px;
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        
        &:nth-child(1) { width: 100%; }
        &:nth-child(2) { width: 70%; }
        &:nth-child(3) { width: 90%; }
    }

    &:hover {
        span {
            background: $violet;
            &:nth-child(2) { width: 100%; }
            &:nth-child(3) { width: 100%; }
        }
    }

    &.active {
        span {
            background: $violet;
            
            &:nth-child(1) {
                transform: rotate(45deg) translate(6px, 5px);
                width: 100%;
            }
            &:nth-child(2) {
                opacity: 0;
                transform: translateX(-20px);
            }
            &:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -5px);
                width: 100%;
            }
        }
    }
}

.mobile-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, 
        rgba($violet-dark, 0.95) 0%,
        rgba($black, 0.98) 100%
    );
    backdrop-filter: blur(20px);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(
            circle at 30% 30%,
            rgba($violet, 0.1) 0%,
            transparent 70%
        );
        pointer-events: none;
    }

    &.active {
        opacity: 1;
        visibility: visible;

        .mobile-links li {
            opacity: 1;
            transform: translateY(0);
        }

        .mobile-button {
            opacity: 1;
            transform: translateY(0);
                a {
            text-decoration: none;
        }
        }
    }

    .mobile-links {
        list-style: none;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:end;
        gap: clamp(1.5rem, 4vh, 2.5rem);
        margin: 3rem 0 0 0;

        li {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            
            @for $i from 1 through 4 {
                &:nth-child(#{$i}) {
                    transition-delay: #{0.1 + ($i * 0.1)}s;
                }
            }

            a {
                font-family: 'Satoshi';
                font-size: clamp(1.5rem, 5vw, 2.5rem);
                color: rgba($white, 0.9);
                text-decoration: none;
                position: relative;
                padding: 0.5rem;
                transition: all 0.3s ease;
                letter-spacing: -0.02em;
                
                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -30px;
                    width: 0;
                    height: 2px;
                    background: $highlight;
                    transform: translateY(-50%);
                    transition: width 0.3s ease;
                    opacity: 0;
                }

                &:hover, &.active {
                    color: $white;
                    transform: translateX(30px);
                    
                    &::before {
                        width: 20px;
                        opacity: 1;
                    }
                }
            }
        }
    }

    .mobile-button {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        transition-delay: 0.5s;
        position: relative;
        margin-top: clamp(2rem, 6vh, 4rem);
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 0 $s;
        
        &::before {
            content: '';
            position: absolute;
            top: -2rem;
            left: 50%;
            transform: translateX(-50%);
            width: min(100px, 30%);
            height: 1px;
            background: linear-gradient(
                to right,
                transparent,
                rgba($white, 0.1),
                transparent
            );
        }

        :deep(.btn) {
            width: 100%;
            max-width: 300px;
            justify-content: center;
        }
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.nav-button {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
    animation-delay: 0.6s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .navbar {
        padding: 1rem;

        .navbar-content {
            position: relative;
            margin-inline: $horizontal-padding;
        }
    }
    
    .desktop-nav, .desktop-only {
        display: none;
    }

    .burger {
        display: flex;
        margin-right: 10px;
    }

    .mobile-nav {
        display: block;
    }
}
</style>