<template>
  <div>
    <span
      class="w-full md:w-1/3 px-5 flex items-center float-right pl-5 font-semibold h-8 bg-black text-white"
    >
      REGISTRATSIYA
    </span>
    <div class="w-full md:w-1/3 py-8 px-5 ml-auto border-2 border-gray-300">
      <form class="w-full">
        <div class="input-group mb-8">
          <label for="input" class="font-semibold text-black">ISM </label>
          <input
            type="text"
            class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm "
            placeholder="Ism"
          />
        </div>
        <div class="input-group mb-8">
          <label for="input" class="font-semibold text-black py-5"
            >FAMILIYA</label
          >
          <input
            type="text"
            class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm "
            placeholder="Familiya"
          />
        </div>
        <div class="input-group mb-8">
          <label for="input" class="font-semibold text-black"
            >EMAIL yoki TELEFON RAQAM</label
          >
          <input
            type="email"
            class="p-2 pl-3 mt-2 w-full bg-gray-200 rounded-sm "
            placeholder=""
          />
        </div>
      </form>
      <hr class="my-8" />
      <button
        type="submit"
        class="w-full bg-black font-semibold text-white p-2"
      >
        TASDIQLASH
      </button>
    </div>
  </div>
</template>
