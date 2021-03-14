<template>
  <div>
    <div class="grid grid-cols-4 grid-rows-2 gap-4 px-5 md:px-16">
      <div class="row-span-4 sm:row-span-2 col-span-4 sm:col-span-2">
        <splide :options="options" :slides="slides">
          <splide-slide v-for="slide in slides" :key="slide.src">
            <div
              :style="{ backgroundImage: 'url(' + slide.src + ')' }"
              class="h-24rem flex items-center justify-center bg-cover"
            >
              <div class="bg-white px-10 py-5">Some text</div>
            </div>
          </splide-slide>
        </splide>
      </div>
      <div
        class="row-span-2 col-span-2 sm:row-span-1 sm:col-span-1 flex items-center justify-center bg-cover"
        :style="{ backgroundImage: 'url(' + slides[3].src + ')' }"
      >
        <div class="bg-white px-10 py-5">Some text</div>
      </div>
      <div
        class="row-span-2 col-span-2 sm:row-span-1 sm:col-span-1 flex items-center justify-center bg-cover"
        :style="{ backgroundImage: 'url(' + slides[0].src + ')' }"
      >
        <div class="bg-white px-10 py-5">Some text</div>
      </div>
      <div
        class="row-span-2 col-span-4 sm:row-span-1 sm:col-span-2 flex items-center justify-center bg-cover"
        :style="{
          backgroundImage: 'url(' + slides[1].src + ')'
        }"
      >
        <div class="bg-white px-10 py-5">Some text</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      options: {
        type: "fade",
        autoplay: true,
        rewind: true,
        width: 800,
        perPage: 1,
        gap: "1rem"
      }
    };
  }
};
</script>

<style></style>
