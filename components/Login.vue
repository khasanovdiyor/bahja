<template>
  <div>
    <span
      class="w-full md:w-1/3 px-5 flex items-center float-right pl-5 font-semibold h-8 bg-black text-white"
    >
      LOGIN
    </span>

    <div class="w-full md:w-1/3 py-8 px-5 ml-auto border-2 border-gray-300">
      <p class="text-gray-600 my-8 font-semibold">
        Ro'yxatdaan o'tgan bo'lsangiz login va parolni kiriting
      </p>
      <div class="w-full">
        <form class="w-full">
          <div class="input-group mb-8">
            <label for="input" class="font-semibold text-black"></label>
            <input
              type="text"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm "
              placeholder="Ism"
            />
          </div>
          <div class="input-group">
            <a href="#"
              ><p
                class=" inline-block text-sm font-semibold text-gray-600 float-right"
              >
                Parolni unutdingizmi?
              </p>
            </a>

            <label for="input" class="font-semibold text-black py-5"
              >PAROL</label
            >
            <input
              type="password"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm "
              placeholder="********"
            />
          </div>
        </form>
        <button
          type="submit"
          class="btn w-full mt-8 mx-auto text-center rounded-sm font-semibold py-2 bg-black text-white"
        >
          KIRISH
        </button>
      </div>

      <hr class="my-16" />

      <button
        type="submit"
        class="btn w-full text-center font-semibold py-2 bg-gray-200 rounded-md text-gray-600"
      >
        YANGI ACCOUNT YARATISH
      </button>
    </div>
  </div>
</template>
