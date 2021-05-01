<template>
  <div>
    <div class="flex min-h-screen">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 bg-gray-100 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-green-400 text-lg text-white text-center"
        >
          <i>Mahsulot yaratildi</i>
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 top-0 px-4 py-2 w-2/3 bg-red-400 text-lg text-white text-center"
        >
          <i> Mahsulot yaratishda xatolik yuz berdi, qayta urinib ko'ring</i>
        </div>
        <tabs :options="{ useUrlFragment: false }">
          <tab name="Asosiy ma'lumotlar">
            <h2 class="text-xl font-bold text-gray-700 mb-10">
              Asosiy ma'lumotlar
            </h2>

            <div class="">
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Nom</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.name.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.name.required && $v.product.name.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Kod</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.product_code.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.product.product_code.required &&
                    $v.product.product_code.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4 block">
                <label
                  class="block font-bold text-gray-600 uppercase text-sm mb-2"
                  >Brend
                </label>
                <multiselect
                  v-model.trim="$v.selectedBrand.$model"
                  :options="brands"
                  placeholder="Brand tanlang"
                  label="name"
                  track-by="name"
                  @select="selectBrand"
                ></multiselect>
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.selectedBrand.required && $v.selectedBrand.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >tavsif</label
                >
                <textarea
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.description.$model"
                >
                </textarea>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.product.description.required &&
                    $v.product.description.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="w-1/2 text-gray-600 block font-bold uppercase text-sm mb-1"
                  >kategoriya</label
                >
                <multiselect
                  v-model="selectedCategory"
                  :options="categories"
                  placeholder="Kategoriya tanlang"
                  label="name"
                  track-by="name"
                  @select="selectCategory"
                  @remove="removeCategory"
                >
                  <template
                    ><span class="text-red-500" slot="noResult"
                      >Bunday kategoriya topilmadi!</span
                    >
                  </template>
                </multiselect>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.selectedCategories.required &&
                    $v.selectedCategories.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >son</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model="$v.product.quantity.$model"
                  v-mask="priceMask"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.product.quantity.required && $v.product.quantity.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold relative text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >narx
                  <p class="inline-block text-xs absolute text-red-500">
                    &#10043;
                  </p>
                </label>
                <input
                  type="string"
                  placeholder=""
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.price.$model"
                  v-mask="priceMask"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.price.required && $v.product.price.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >Asosiy rasm</label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewProductImage"
                  class="border-2 rounded-md text-sm bg-white w-1/2 py-1 pl-5"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.image.required && $v.product.image.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
                <div v-if="product.image">
                  <div>
                    <div class="w-56 h-64 border shadow-sm my-5">
                      <img
                        :src="product.image"
                        class="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <div>
                  <label
                    class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                    >galereya rasmlari</label
                  ><input
                    type="file"
                    accept="image/*"
                    multiple="multiple"
                    @change="previewProductMultiImage"
                    class="border-2 rounded-md text-sm bg-white w-1/2 py-1 pl-5"
                  />
                  <div
                    class="text-red-400 text-sm"
                    v-if="
                      !$v.product.images.required && $v.product.images.$dirty
                    "
                  >
                    <i>{{ requiredMessage }}</i>
                  </div>
                </div>
                <div v-if="product.images" class="flex-grow">
                  <div
                    v-for="(item, index) in product.images"
                    :key="index"
                    class="w-56 h-64 border flex flex-grow relative shadow-sm my-5"
                  >
                    <img :src="item" class="object-cover w-full m-2 h-full" />
                    <span
                      @click="removeImage(index, product.images)"
                      class="absolute top-4 right-4 bg-white w-5 h-5 flex items-center justify-center cursor-pointer rounded-full"
                      >X</span
                    >
                  </div>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >Import</label
                >
                <input
                  type="checkbox"
                  class="border text-sm w-5 h-5 pl-5"
                  v-model="product.is_import"
                />
              </div>
              <div class="mb-10">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        is main
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        key
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        label
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        value
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 w-40 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        buyruqlar
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      class="border"
                      v-for="(attr, index) in product.attributes"
                      :key="index"
                    >
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="checkbox"
                            class="border w-full text-sm w-5 h-5 pl-5"
                            v-model="attr.is_main"
                          />
                        </div>
                      </td>

                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 rounded-md text-sm py-2 pl-5"
                            v-model="attr.key"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 rounded-md text-sm py-2 pl-5"
                            v-model="attr.label"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 rounded-md text-sm py-2 pl-5"
                            v-model="attr.value"
                          />
                        </div>
                      </td>
                      <td class="px-2 py-1 border">
                        <div
                          class="flex items-center text-gray-500 justify-between"
                        >
                          <div
                            @click="RemoveAttribute(product, index)"
                            class="cursor-pointer hover:underline"
                          >
                            <img
                              src="~/assets/images/delete.svg"
                              alt=""
                              class="w-6"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr class="border" v-if="showAddNewKey">
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="checkbox"
                            class="border w-full text-sm w-5 h-5 pl-5"
                            v-model="attribute.is_main"
                          />
                        </div>
                      </td>

                      <td class="py-1 border">
                        <div class="flex items-center">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5 mx-5 my-1 rounded-md"
                            v-model="attribute.key"
                          />
                        </div>
                      </td>
                      <td class="py-1 border">
                        <div class="flex items-center">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5 mx-5 my-1 rounded-md"
                            v-model="attribute.label"
                          />
                        </div>
                      </td>
                      <td class="py-1 border">
                        <div class="flex items-center">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5 mx-5 my-1 rounded-md"
                            v-model="attribute.value"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div
                          class="flex items-center text-gray-500 justify-center"
                        >
                          <div
                            @click="addProductAttribute"
                            class="cursor-pointer hover:underline hover:font-bold"
                          >
                            Qo'shish
                          </div>
                        </div>
                      </td>
                      <div
                        class="fixed z-40 bg-gray-500 opacity-50 flex items-center justify-center"
                        v-if="showDeleteDialog"
                      >
                        <div
                          class="w-1/3 opasity-0 rounded-md mx-auto bg-white py-4 px-10"
                        >
                          <span class="font-bold text-center text-xl block mb-6"
                            >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
                          >
                          <div class="flex justify-between">
                            <button
                              @click="deleteCategory(selectedCategoryID)"
                              class="bg-red-500 rounded-md text-white py-2 px-4"
                            >
                              Ha
                            </button>
                            <button
                              @click="showDeleteDialog = false"
                              class="bg-gray-500 rounded-md text-white py-2 px-4"
                            >
                              Yo'q
                            </button>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <button
                  @click="showAddNewKey = true"
                  class="block bg-gray-800 w-24 text-sm text-center rounded-md px-3 text-white my-2 py-2"
                >
                  Qo'shish
                </button>
              </div>
              <button
                @click="createProduct"
                class="block bg-gray-800 w- text-sm text-center rounded-md px-3 text-white my-2 py-2"
              >
                Mahsulot yaratish
              </button>
            </div>
          </tab>
          <tab name="O'zgartirish" class="w-full text-lg">
            <h2 class="text-xl font-bold text-gray-700 mb-10">O'zgartirish</h2>

            <div class="w-full">
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Nom</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.name.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.variation.name.required && $v.variation.name.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold text-gray-600 uppercase text-sm mb-1"
                  >Kod</label
                >
                <input
                  type="text"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.product_code.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.product_code.required &&
                    $v.variation.product_code.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >tavsif</label
                >
                <textarea
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.description.$model"
                >
                </textarea>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.description.required &&
                    $v.variation.description.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label class="w-1/2 block font-bold uppercase text-sm mb-1"
                  >kategoriya</label
                >
                <multiselect
                  v-model="$v.selectedVariationCategories.$model"
                  placeholder="Kategoriya qo'shing"
                  label="name"
                  track-by="id"
                  :options="categories"
                  :multiple="true"
                  @tag="addTag"
                  @select="selectVariationCategories"
                ></multiselect>
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.selectedVariationCategories.required &&
                    $v.selectedVariationCategories.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>

              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >son</label
                >
                <input
                  type="string"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.variation.quantity.$model"
                  v-mask="priceMask"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="
                    !$v.variation.quantity.required &&
                    $v.variation.quantity.$dirty
                  "
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >narx</label
                >
                <input
                  type="string"
                  class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
                  v-model.trim="$v.product.price.$model"
                />
                <div
                  class="text-red-400 text-sm"
                  v-if="!$v.product.price.required && $v.product.price.$dirty"
                >
                  <i>{{ requiredMessage }}</i>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >asosiy rasm </label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewVariationImage"
                  class="w-1/2 border-2 rounded-md bg-white text-sm py-2 pl-5"
                  placeholder="cdsafd"
                />
                <div v-if="variation.image">
                  <div class="w-56 h-64 my-5 border shadow-md">
                    <img :src="preview" class="object-cover w-full h-full" />
                  </div>
                </div>
              </div>
              <div class="my-4">
                <label
                  class="block font-bold text-gray-600 text-gray-600 uppercase text-sm mb-1"
                  >galereya rasmlari</label
                ><input
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="previewVariationMultiImage"
                  class="w-1/2 border-2 rounded-md bg-white text-sm py-2 pl-5"
                />
                <div v-if="variation.images" class="flex"></div>
              </div>
              <div class="mb-10">
                <h2 class="font-bold text-xl my-4">Attributlar</h2>
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-600 uppercase"
                      >
                        is main
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-600 uppercase"
                      >
                        key
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-600 uppercase"
                      >
                        label
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-600 uppercase"
                      >
                        value
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-600 uppercase"
                      >
                        buyruqlar
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      class="border"
                      v-for="(attrib, index) in variation.attributes"
                      :key="index"
                    >
                      <td class="px-6 py-1 border">
                        {{ attrib.is_main }}
                      </td>

                      <td class="px-6 py-1 border">
                        {{ attrib.key }}
                      </td>
                      <td class="px-6 py-1 border">
                        {{ attrib.label }}
                      </td>
                      <td class="px-6 py-1 border">
                        <input
                          type="text"
                          class="border w-full text-sm w-5 h-5 pl-5"
                          v-model="attrib.value"
                        />
                      </td>
                      <td class="px-2 py-1 mx-auto w-40 border">
                        <div
                          @click="RemoveAttribute(variation, index)"
                          class="cursor-pointer"
                        >
                          <img
                            src="~/assets/images/delete.svg"
                            class="w-5 h-5"
                            alt="pencil icon"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="border" v-if="showAddNewKey">
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="checkbox"
                            class="border w-full text-sm w-5 h-5 pl-5"
                            v-model="attribute.is_main"
                          />
                        </div>
                      </td>

                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5"
                            v-model="attribute.key"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5"
                            v-model="attribute.label"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full text-sm py-2 pl-5"
                            v-model="attribute.value"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div
                          class="flex items-center text-gray-500 justify-center"
                        >
                          <div
                            @click="addVariationAttribute"
                            class="cursor-pointer hover:underline"
                          >
                            Qo'shish
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  @click="showAddNewKey = true"
                  class="block bg-gray-800 w-24 text-sm text-center rounded-md px-3 mt-5 text-white py-2"
                >
                  qo'shish
                </button>
              </div>
              <div
                class="text-red-400 text-sm"
                v-if="!$v.variation.attributes.minLength"
              >
                Atributlar kamida
                {{ $v.variation.attributes.$params.minLength.min }} harf
                bo'lishi kerak
              </div>
              <button
                @click="addVariation"
                class="block bg-gray-800 text-sm text-center rounded-md px-3 mt-5 text-white py-2"
              >
                Saqlash
              </button>
            </div>
            <div>
              <h2 class="font-bold text-xl my-4">Qo'shilgan o'zgarishlar</h2>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      kodi
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      kategoriya
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700"
                    >
                      NARX (so'm)
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      o'lchami
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      O'chirish
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr
                    class="border"
                    v-for="(varProduct, index) in product.variations"
                    :key="index"
                  >
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.name"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.product_code"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <multiselect
                          v-model="varProduct.categories"
                          tag-placeholder="Ushbu kategoriayni qo'shing"
                          placeholder="Kategoriya izlang yoki qo'shing"
                          label="name"
                          track-by="id"
                          :options="categories"
                          :multiple="true"
                          @tag="addTag"
                        ></multiselect>
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class="w-full border-2 text-sm py-2"
                          v-model="varProduct.price"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <input
                        type="text"
                        class="w-full border-2 text-sm py-2"
                        v-model="varProduct.quantity"
                      />
                    </td>
                    <td class="px-2 py-1 border">
                      <div
                        class="flex items-center text-gray-500 justify-between"
                      >
                        <div
                          @click="RemoveVariation(index)"
                          class="cursor-pointer"
                        >
                          <img
                            src="~/assets/images/delete.svg"
                            class="w-5 h-5"
                            alt="pencil icon"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </tab>
        </tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";

export default {
  data() {
    return {
      priceMask: priceMask,
      requiredMessage: "To'ldirish shart",
      selectedBrand: {},
      selectedCategories: [],
      selectedVariationCategories: [],
      previewProduct: null,
      previewVariation: null,
      image: null,
      preview_list: [],
      image_list: [],
      showSuccess: false,
      showFail: false,
      showDeleteDialog: false,
      showVariationForm: false,
      showProductForm: false,
      showAddNewKey: false,
      showAddNewVariation: false,
      colors: [],
      brands: [],
      categories: [],
      isVariationEmpty: false,
      product: {
        parent_id: 0,
        name: null,
        product_code: null,
        brand: null,
        categories: [],
        price: null,
        description: null,
        is_import: false,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        variations: [],
      },
      variation: {
        parent_id: 0,
        name: null,
        product_code: null,
        price: 0,
        description: null,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        categories: [],
      },
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null,
      },
    };
  },
  watch: {
    product: {
      deep: true,
      handler() {
        this.variation = Object.assign({}, this.product);
        delete this.variation.variations;
        delete this.variation.is_import;
        delete this.variation.brand;
      },
    },
    "this.showFail": function (newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showFail = false;
        }, 3000);
      }
    },
    "this.showSuccess": function (newVal) {
      if (newVal == true) {
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      }
    },
  },
  validations: {
    selectedBrand: {
      required,
    },
    selectedCategories: {
      required,
    },
    selectedVariationCategories: {
      required,
    },
    product: {
      name: {
        required,
      },
      product_code: {
        required,
      },
      price: {
        required,
      },
      description: {
        required,
      },
      brand: {
        required,
      },
      quantity: {
        required,
      },
      image: {
        required,
      },
      images: {
        required,
      },
      attributes: {
        required,
        minLength: minLength(2),
      },
      categories: {
        required,
      },
    },
    variation: {
      name: {
        required,
      },
      product_code: {
        required,
      },
      quantity: {
        required,
      },
      price: {
        required,
      },
      description: {
        required,
      },
      attributes: {
        required,
        minLength: minLength(2),
      },
      categories: {
        required,
      },
    },
  },
  methods: {
    selectCategories(value, id) {
      this.product.categories.push(value.id);
    },
    selectBrand(value) {
      this.product.brand = value.id;
    },
    selectVariationCategories(value, id) {
      this.variation.categories.push(value.id);
    },
    addProductAttribute() {
      this.product.attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    addVariationAttribute() {
      this.variation.attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    RemoveAttribute(product, index) {
      product.attributes.splice(index, 3);
    },
    addVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.product.variations.push(this.variation);
        this.variation = {
          attributes: [],
        };
        this.showAddNewVariation = false;
      }
    },
    RemoveVariation(index) {
      this.product.variations.splice(index, 3);
    },
    addImage(product) {
      product.images.push(image);
    },
    addTag(newTag) {
      this.selectedCategories.push(newTag);
    },
    removeImage(index, images) {
      images.splice(index, 3);
    },
    previewProductImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.product.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewVariationImage(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = e => {
          this.variation.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewProductMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (this.product.images.length < 5)
              this.product.images.push(e.target.result);
            console.log("RESULT" + index, e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
    },
    previewVariationMultiImage(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            if (this.variation.images.length < 5)
              this.variation.images.push(e.target.result);
            console.log("RESULT" + index, e.target.result);
          };
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
      console.log("this.product:", this.product);
    },
    getBrands() {
      this.$axios
        .get("product/brand-list/")
        .then(res => {
          this.brands = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategories() {
      this.$axios
        .get("product/category-list/")
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    createProduct() {
      if (this.product.variations.length === 0) {
        this.isVariationEmpty = true;
      }

      if (this.isVariationEmpty && !this.$v.product.$invalid) {
        let loader = this.$loading.show();
        this.$axios
          .post("product/create/", this.product)
          .then(res => {
            console.log(res);
            this.showSuccess = true;
            this.productVariation = {};
            this.image_list = [];
            this.preview_list = [];
            this.image = null;
            this.preview = null;
            loader.hide();
          })
          .catch(err => {
            loader.hide();
            this.showFail = true;
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getCategories();
    this.getBrands();
  },
};
</script>
<style scoped>
div.multiselect {
  width: 50%;
}
</style>
