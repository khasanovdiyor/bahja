<template>
  <div class="border-gray-400">
    <div
      class="footer px-5 md:px-16 pt-10 bg-gray-200 block md:flex justify-center justify-between"
    >
      <div
        class="flex w-12/12 md:w-1/2 mx-auto mr-0 md:mr-10 sm:mr-10 lg:mr-0
         justify-between
      "
      >
        <div class="categories w-2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">KATEGORIYA</h3>
          <ul class="text-gray-600">
            <li><a href="#" class="hover:underline">Ayollar </a></li>
            <li><a href="#" class="hover:underline">Erkaklar</a></li>
            <li><a href="#" class="hover:underline">Aksessuarlar</a></li>
          </ul>
        </div>
        <div class="information w-2/5  leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">MA'LUMOTLAR</h3>
          <ul class="text-gray-600">
            <li><a href="#" class="hover:underline">Biz haqimizda</a></li>
            <li><a href="#" class="hover:underline">Bog'lanish</a></li>
          </ul>
        </div>
      </div>

      <div
        class="flex w-12/12 md:w-1/2 mx-auto sm:mr-10 md:mr-0 mt-5 md:mt-0
         justify-between
      "
      >
        <div class="links w-2/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">IJTIMOIY TARMOQLAR</h3>

          <nuxt-link to="instagram.com" class="flex text-gray-600"
            ><img
              src="../assets/images/instagramblack.svg"
              alt="instagram logo"
              class="w-5 mr-5"
            />instagram
          </nuxt-link>

          <nuxt-link to="telegram.me" class="flex text-gray-600">
            <img
              src="../assets/images/telegramblack.svg"
              alt="telegram logo"
              class="w-5 mr-5"
            />telegram
          </nuxt-link>
        </div>
        <div class="contacts w-2/5 md:3/5 leading-loose">
          <h3 class="font-semibold mb-3 text-gray-700">BOG'LANISH</h3>
          <ul class="text-gray-600">
            <li>
              <a href="#" class="flex">
                <img
                  src="../assets/images/placeholder.svg"
                  alt=""
                  class="w-5 mr-3"
                />
                Biz haqimizda</a
              >
            </li>
            <li>
              <p class="flex">
                <img src="../assets/images/phone.svg" alt="" class="w-5 mr-3" />
                +93 627-58-98
              </p>
            </li>
            <li>
              <a href="#" class="flex">
                <img
                  src="../assets/images/envelope.svg"
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
      class="w-full text-center border-t border-gray-400 block mx-auto py-2 text-sm bg-gray-200 text-gray-500"
      >Bahja.uz Copyright &copy; 2021
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
