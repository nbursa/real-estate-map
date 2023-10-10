<template>
    <carousel class="mb-4" :autoplay="2000" :items-to-show="1" :items-to-scroll="1" :wrap-around="true"
        :navigation-enabled="true" :min-swipe-distance="1" :current-slide.sync="currentSlide" @change="onCarouselChange">
        <slide v-for="(pictureUrl, pictureIndex) in props.property.pictures" :key="pictureIndex">
            <img class="carousel__item" :src="pictureUrl" alt="Slide" />
        </slide>
        <template #addons>
            <navigation />
            <pagination />
        </template>
    </carousel>
</template>
  
<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

import { ref, watch } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const props = defineProps(['property'])

const currentSlide = ref<number>(0);

const onCarouselChange = (newSlideIndex: number) => {
    currentSlide.value = newSlideIndex;
};

watch(() => props.property, () => {
    currentSlide.value = 0;
});
</script>
  