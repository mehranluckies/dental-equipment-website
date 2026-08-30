<template>
    <div ref="target" :class="['reveal', { 'reveal--visible': isVisible }]">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const target = ref<HTMLElement | null>(null);
const isVisible = ref(false);

let observer: IntersectionObserver;

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true;
                observer.unobserve(entry.target); 
            }
        },
        {
            threshold: 0.15,
        }
    );

    if (target.value) observer.observe(target.value);
});

onUnmounted(() => {
    observer?.disconnect();
});
</script>

<style scoped>
.reveal {
    opacity: 0;
    transform: translateY(50px);
    transition:
        opacity 0.7s ease,
        transform 1s ease;
    will-change: opacity, transform;
}

.reveal--visible {
    opacity: 1;
    transform: translateY(0);
}
</style>