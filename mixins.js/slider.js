import { directive } from "vue-awesome-swiper";

export default {
  directives: {
    swiper: directive
  },
  data() {
    return {
      slides: [],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      swiperOptionThumbs: {
        loop: false,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    };
  },
  methods: {
    changeSlider() {
      this.sliderImages = this.product.variations[0].images;
    },
    syncSliders() {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.$swiper;
        const swiperThumbs = this.$refs.swiperThumbs.$swiper;
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;
      });
    }
  }
};
