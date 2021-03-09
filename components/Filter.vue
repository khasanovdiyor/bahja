<template>
  <div>
    <div
      class="filter px-5 md:px-16 p-5 block sm:flex justify-between w-full bg-gray-200 "
    >
      <div class="flex w-2/5 justify-between">
        <div class="leading-loose w-1/6 ">
          <h2 class="font-semibold mb-3 text-gray-700">RANGI</h2>
          <div class="h-40 scroll overflow-y-scroll">
            <ul class=" text-gray-600">
              <li
                class="text-sm  capitalize"
                :class="{ 'font-bold text-md text-gray-800': color.isCheked }"
                v-for="color in colors"
                :key="color.colorName"
              >
                <label
                  :for="color.colorName"
                  class="w-full h-full cursor-pointer"
                  ><input
                    type="checkbox"
                    :id="color.colorName"
                    class="hidden"
                    v-model="color.isCheked"
                  />

                  <div
                    class="rounded-full w-4 h-4 inline-block"
                    :class="color.className"
                  ></div>
                  {{ color.colorName }}</label
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="leading-loose w-1/6">
          <h2 class="font-semibold mb-3 text-gray-700">O'LCHAMI</h2>
          <ul class="text-gray-600">
            <li
              class="text-sm  capitalize"
              v-for="size in sizes"
              :key="size.sizeName"
            >
              <input
                type="checkbox"
                class="rounded-full cursor-pointer"
                :class="size.className"
              />
              {{ size.sizeName }}
            </li>
          </ul>
        </div>
      </div>

      <div class="flex w-2/5 justify-between">
        <div class="leading-loose w-1/6">
          <h2 class="font-semibold mb-3 text-gray-700">BRENDI</h2>
          <ul class="text-gray-600">
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">Adidas</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">Nice</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">Puma</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">Gucci</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">Monki</label>
            </li>
          </ul>
        </div>
        <div class="leading-loose w-1/6">
          <h2 class="font-semibold mb-3 text-gray-700">NARXI</h2>
          <ul class="text-gray-600">
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">200.000</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">170.000</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">159.000</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">245.000</label>
            </li>
            <li>
              <input type="checkbox" class="cursor-pointer" v-model="checked" />
              <label for="checkbox">183.000</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        {
          colorName: "qizil",
          className: "bg-red-500",
          isCheked: false
        },
        {
          colorName: "oq",
          className: "bg-white",
          isCheked: false
        },
        {
          colorName: "qora",
          className: "bg-black",
          isCheked: false
        },
        {
          colorName: "ko'k",
          className: "bg-blue-500",
          isCheked: false
        },
        {
          colorName: "yashil",
          className: "bg-green-500",
          isCheked: false
        },
        {
          colorName: "pushti",
          className: "bg-pink-500",
          isCheked: false
        },
        {
          colorName: "kulrang",
          className: "bg-gray-500",
          isCheked: false
        },
        {
          colorName: "binafsha",
          className: "bg-purple-500",
          isCheked: false
        }
      ],
      sizes: [
        {
          sizeName: "XL",
          className: ""
        },
        {
          sizeName: "L",
          className: ""
        },
        {
          sizeName: "M",
          className: ""
        },
        {
          sizeName: "S",
          className: ""
        },
        {
          sizeName: "XS",
          className: ""
        }
      ]
    };
  }
};
</script>
<style>
.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-thumb {
  background: #888;
}
</style>
