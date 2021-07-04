<template>
  <div class="border-gray-400 mt-10">
    <div
      class="
        footer
        px-5
        md:px-16
        pt-10
        bg-gray-200
        block
        md:flex
        justify-between
      "
    >
      <div
        class="
          sm:flex
          w-full
          md:w-1/2
          mx-auto
          mr-0
          md:mr-10
          sm:mr-10
          lg:mr-0
          justify-between
        "
      >
        <div class="categories w-2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">KATEGORIYA</h3>
          <ul class="text-gray-600">
            <li>
              <nuxt-link
                to="/products/category/krosovka"
                class="hover:underline"
                >Krosovka
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/products/category/koylak" class="hover:underline"
                >Ko'ylak</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/products/category/shim" class="hover:underline"
                >Shim</nuxt-link
              >
            </li>
            <li>
              <nuxt-link to="/products/category/tufli" class="hover:underline"
                >Tufli</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="information w-2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">MA'LUMOTLAR</h3>
          <ul class="text-gray-600">
            <li>
              <nuxt-link to="/about" class="hover:underline"
                >Biz haqimizda
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="
          sm:flex
          w-full
          md:w-1/2
          mx-auto
          sm:mr-10
          md:mr-0
          mt-5
          md:mt-0
          justify-between
        "
      >
        <div class="links w-2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">IJTIMOIY TARMOQLAR</h3>

          <a
            href="https://www.instagram.com/bahja.uz/"
            class="flex text-gray-600 hover:underline"
            ><img
              src="~/assets/images/instagramblack.svg"
              alt="instagram logo"
              class="w-5 mr-5"
            />Instagram
          </a>

          <a
            href="https://t.me/bahja_uz"
            class="flex text-gray-600 hover:underline"
          >
            <img
              src="~/assets/images/telegramblack.svg"
              alt="telegram logo"
              class="w-5 mr-5"
            />Telegram
          </a>
        </div>
        <div class="contacts md:2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">BOG'LANISH</h3>
          <ul class="text-gray-600">
            <li>
              <a href="#" class="flex hover:underline">
                <img
                  src="~/assets/images/placeholder.svg"
                  alt=""
                  class="w-5 mr-3"
                />
                Bizning manzil</a
              >
            </li>
            <li>
              <p class="flex hover:underline">
                <img
                  src="~/assets/images/phone.svg"
                  alt="phone"
                  class="w-5 mr-3"
                />
                <a href="tel:+998994013937">+99 401 39 37</a>
              </p>
            </li>
            <li>
              <a href="#" class="flex hover:underline">
                <img
                  src="~/assets/images/envelope.svg"
                  alt=""
                  class="w-5 mr-3"
                />bahja@gmail.com</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <span
      class="
        w-full
        text-center
        border-t border-gray-400
        block
        mx-auto
        py-2
        text-sm
        bg-gray-200
        text-gray-500
      "
      >AtomLab.uz Copyright &copy; {{ getCurrentYear }}
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    getCurrentYear() {
      const date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style></style>
