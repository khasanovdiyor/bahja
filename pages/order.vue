<template>
  <div>
    <TheContact />
    <TheHeader />
    <div class="w-1/3 mx-auto border-2 my-8 border-gray-200 pb-8">
      <p
        class="w-full px-5 flex items-center py-6 h-8 text-sm mx-auto font-semibold bg-black text-white uppercase"
      >
        buyurtma
      </p>
      <div class="w-full px-5 mx-auto">
        <form class="w-full">
          <div class="input-group my-8">
            <label for="input" class="font-semibold text-sm uppercase"
              >ismingiz</label
            >
            <input
              type="text"
              class="p-2 pl-3 mt-2 w-full bg-gray-200 "
              placeholder="Ism"
            />
          </div>
          <div class="input-group">
            <label for="input" class="font-semibold text-sm py-5 uppercase"
              >Telefon raqamingiz</label
            >
            <input
              type=""
              class="p-2 pl-3 mt-2 w-full bg-gray-200 "
              placeholder="+998-**-***-**-**"
            />
          </div>
        </form>
        <hr class="my-8" />
        <button
          type="submit"
          class="w-1/2 flex items-center justify-center mx-auto text-sm font-semibold uppercase  py-6 h-8 bg-black text-white"
        >
          buyurtma berish
        </button>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
