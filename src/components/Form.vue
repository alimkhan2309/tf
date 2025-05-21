<template>
    <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group" 
             :class="{ 'error': v$.name.$error }"
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :enter="{ opacity: 1, y: 0 }"
             :delay="100">
            <label for="name">Name</label>
            <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                :aria-invalid="v$.name.$error"
                :aria-describedby="v$.name.$error ? 'name-error' : undefined"
                @blur="v$.name.$touch()"
            />
            <span v-if="v$.name.$error" class="error-message" id="name-error" role="alert">
                {{ v$.name.$errors[0].$message }}
            </span>
        </div>

        <div class="form-group" 
             :class="{ 'error': v$.email.$error }"
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :enter="{ opacity: 1, y: 0 }"
             :delay="200">
            <label for="email">Email</label>
            <input 
                type="email" 
                id="email"
                v-model="formData.email"
                :aria-invalid="v$.email.$error"
                :aria-describedby="v$.email.$error ? 'email-error' : undefined"
                @blur="v$.email.$touch()"
            />
            <span v-if="v$.email.$error" class="error-message" id="email-error" role="alert">
                {{ v$.email.$errors[0].$message }}
            </span>
        </div>

        <div class="form-group" 
             :class="{ 'error': v$.message.$error }"
             v-motion
             :initial="{ opacity: 0, y: 20 }"
             :enter="{ opacity: 1, y: 0 }"
             :delay="300">
            <label for="message">Message</label>
            <textarea 
                id="message"
                v-model="formData.message"
                :aria-invalid="v$.message.$error"
                :aria-describedby="v$.message.$error ? 'message-error' : undefined"
                @blur="v$.message.$touch()"
            ></textarea>
            <span v-if="v$.message.$error" class="error-message" id="message-error" role="alert">
                {{ v$.message.$errors[0].$message }}
            </span>
        </div>

        <div v-if="submitError" class="form-error" role="alert">
            {{ submitError }}
        </div>

        <Button 
            type="submit" 
            :text="isSubmitting ? 'Sending...' : 'Submit'"
            :disabled="isSubmitting || v$.$error"
            :class="{ 'loading': isSubmitting }"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="400"
        />

        <div v-if="submitSuccess" 
             class="success-message" 
             role="status"
             v-motion
             :initial="{ opacity: 0, scale: 0.9 }"
             :enter="{ opacity: 1, scale: 1 }">
            Thank you! Your message has been sent successfully.
        </div>
    </form>
</template>

<script>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';
import { Motion } from '@motionone/vue';
import Button from "@/components/Button.vue";

export default {
    name: "ContactForm",
    components: {
        Button,
        Motion,
    },
    setup() {
        const formData = reactive({
            name: '',
            email: '',
            message: ''
        });

        const isSubmitting = ref(false);
        const submitError = ref(null);
        const submitSuccess = ref(false);

        const noHtml = helpers.withMessage(
            'Invalid characters detected',
            value => !/<[^>]*>/.test(value)
        );

        const rules = {
            name: { 
                required: helpers.withMessage('Name is required', required),
                minLength: helpers.withMessage('Name must be at least 2 characters', minLength(2)),
                noHtml 
            },
            email: { 
                required: helpers.withMessage('Email is required', required),
                email: helpers.withMessage('Please enter a valid email address', email),
                noHtml
            },
            message: { 
                required: helpers.withMessage('Message is required', required),
                minLength: helpers.withMessage('Message must be at least 10 characters', minLength(10)),
                noHtml
            }
        };

        const v$ = useVuelidate(rules, formData);

        const handleSubmit = async () => {
            submitError.value = null;
            submitSuccess.value = false;

            const isValid = await v$.value.$validate();
            if (!isValid) return;

            try {
                isSubmitting.value = true;

                if (!checkRateLimit()) {
                    throw new Error('Please wait a moment before submitting again');
                }

                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message. Please try again later.');
                }

                submitSuccess.value = true;
                resetForm();

            } catch (error) {
                submitError.value = error.message;
                console.error('Form submission error:', error);
            } finally {
                isSubmitting.value = false;
            }
        };

        const resetForm = () => {
            Object.keys(formData).forEach(key => formData[key] = '');
            v$.value.$reset();
        };

        const checkRateLimit = () => {
            const lastSubmit = localStorage.getItem('lastFormSubmit');
            const now = Date.now();
            if (lastSubmit && now - parseInt(lastSubmit) < 15000) {
                return false;
            }
            localStorage.setItem('lastFormSubmit', now.toString());
            return true;
        };

        return {
            formData,
            v$,
            isSubmitting,
            submitError,
            submitSuccess,
            handleSubmit
        };
    }
};
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

form {
    width: 100%;
    max-width: 100%;
    background: linear-gradient(
        315deg,
        rgba(88, 88, 88, 0.15) 0%,
        rgba(84, 84, 75, 0.1275) 57%,
        rgba(255, 255, 255, 0.15) 100%
    );
    padding: clamp(1.5rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    backdrop-filter: blur(25px);
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 8px;
        padding: 1px;
        background: linear-gradient(180deg, rgba(250, 250, 250, 1), rgba(250, 250, 250, 0));
        mask: linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
        mask-composite: exclude;
        pointer-events: none;
    }

    .form-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        text-align:left;
        align-items: stretch;
        gap: 0.5rem;
        box-sizing: border-box;
        transition: transform 0.3s ease, opacity 0.3s ease;

        &.error {
            input, textarea {
                border: 1px solid $orange;
                background-color: rgba($orange, 0.1);
                animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
            }
        }

        label {
            font-size: 1rem;
            font-weight: 500;
            color: $white;
            width: 100%;
            overflow-wrap: break-word;
            transition: color 0.3s ease;
        }

        input, textarea {
            width: 100%;
            padding: 0.75rem 1rem;
            background-color: rgba(255, 255, 255, 0.08);
            color: $white;
            font-size: 1rem;
            border: 1px solid transparent;
            border-radius: 4px;
            box-sizing: border-box;
            transition: all 0.3s ease;
            
            &:focus {
                outline: none;
                border-color: $violet;
                background-color: rgba($violet, 0.1);
                transform: translateY(-2px);
            }

            &:hover {
                background-color: rgba(255, 255, 255, 0.12);
            }

            &[aria-invalid="true"] {
                border-color: $orange;
                background-color: rgba($orange, 0.1);
            }
        }

        textarea {
            min-height: 100px;
            max-height: 200px;
            resize: vertical;
        }

        .error-message {
            color: $orange;
            font-size: 0.875rem;
            animation: slideDown 0.3s ease forwards;
        }
    }

    .form-error {
        color: $orange;
        text-align: center;
        margin-top: 16px;
        animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    .success-message {
        color: $green;
        text-align: center;
        margin-top: 16px;
        animation: scaleIn 0.3s ease forwards;
    }

    button {
        transition: all 0.3s ease;

        &:hover:not(:disabled) {
            transform: translateY(-2px);
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        &.loading {
            position: relative;
            &::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
        }
    }
}

@keyframes shake {
    10%, 90% {
        transform: translateX(-1px);
    }
    20%, 80% {
        transform: translateX(2px);
    }
    30%, 50%, 70% {
        transform: translateX(-4px);
    }
    40%, 60% {
        transform: translateX(4px);
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
    form {
        padding: 1.5rem 1rem;
    }
}

@media (max-width: 480px) {
    form {
        margin: 0 auto;
        width: 100%;
        border-radius: 0;
        
        .form-group {
            input, textarea {
                font-size: 16px;
            }
        }
    }
}
</style>