<template>
  <div>
    <div class="w-1/2 float-right border-2 bg-gray-100 px-5">
      <div class="input-group block my-4">
        <label for="input" class="block font-bold uppercase text-sm mb-2"
          >Mahsulot nomi</label
        >
        <input type="text" class="border-2 text-sm w-64 py-2 pl-5" />
      </div>
      <div class="my-4 block">
        <label class="block font-bold uppercase text-sm mb-2">Brend nomi</label>
        <select class="w-64 border-2 text-sm py-2 ">
          <option disabled></option>
          <option class="">Adidas</option>
          <option class="">Nice</option>
          <option class="">Adidas</option>
          <option class="">Nice</option>
          <option class="">Nice</option>
        </select>
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">tavsif</label>
        <textarea class="border-2 text-sm w-64 py-2 pl-5"> </textarea>
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2"
          >katigoriyasi</label
        >
        <select class="w-64 border-2 text-sm py-2 ">
          <option disabled value=""></option>
          <option class="">Oyoq kiyimlar</option>
          <option class="">Ko'ylaklar</option>
          <option class="">Oyoq kiyimlar</option>
          <option class="">Ro'mol</option>
          <option class="">Ro'mol</option>
        </select>
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">Import</label>
        <input type="checkbox" class="border text-sm w-5 h-5 pl-5" />
      </div>
      <p class="text-center font-bold uppercase my-8">
        o'zgarishlarni qo'shish
      </p>

      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">rangi</label>
        <select class="w-64 border-2 text-sm py-2 ">
          <option disabled></option>
          <option class="">Qizil</option>
          <option class="">Sariq</option>
          <option class="">Yashil</option>
          <option class="">Qora</option>
          <option class="">Oq</option>
        </select>
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">soni</label>
        <input type="string" class="border-2 text-sm w-64 py-2 pl-5" />
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">o'lchami</label>
        <input type="string" class="border-2 text-sm w-64 py-2 pl-5" />
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2">narxi</label>
        <input type="string" class="border-2 text-sm w-64 py-2 pl-5" />
      </div>
      <div class="my-4">
        <label class="block font-bold uppercase text-sm mb-2"
          >rasm qo'yish</label
        ><input type="file" class="border-2 text-sm w-64 py-2 pl-5" />

        <img src="../assets/images/link.svg" class="w-5 inline-block" />
      </div>
    </div>
  </div>
</template>
