<template>
  <div>
    <div class="flex ">
      <AdminSidebar />
      <div class="px-5 mx-auto w-4/5 pt-10">
        <div
          v-if="showSuccess"
          class="fixed z-40 font-bold text-xl top-0 px-4 py-4 w-2/3 bg-green-400 text-white text-center"
        >
          Mahsulot yaratildi
          <span
            class="absolute right-6 cursor-pointer"
            @click="showNotification = false"
            >X</span
          >
        </div>
        <div
          v-if="showFail"
          class="fixed z-40 font-bold text-xl top-0 px-4 py-4 w-2/3 bg-green-400 text-white text-center"
        >
          Mahsulot yaratishda xatolik yuz berdi, qayta urinib koring
          <span
            class="absolute right-6 cursor-pointer"
            @click="showNotification = false"
            >X</span
          >
        </div>
        <tabs :options="{ useUrlFragment: false }">
          <tab name="Mahsulot qo'shish">
            <h2 class="text-xl font-bold uppercase">
              Mahsulot qoshish
            </h2>

            <div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold uppercase text-sm mb-2"
                  >Mahsulot nomi</label
                >
                <input
                  type="text"
                  class="border-2 text-sm w-1/2 py-2 pl-5"
                  v-model="product.name"
                />
              </div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold uppercase text-sm mb-2"
                  >Mahsulot kodi</label
                >
                <input
                  type="text"
                  class="border-2 text-sm w-1/2 py-2 pl-5"
                  v-model="product.product_code"
                />
              </div>
              <div class="my-4 block">
                <label class="block font-bold uppercase text-sm mb-2"
                  >Brend nomi {{ selectedBrand }}
                </label>
                <multiselect
                  v-model="selectedBrand"
                  :options="brands"
                  placeholder="Brand tanlang"
                  label="name"
                  track-by="name"
                ></multiselect>
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >tavsif</label
                >
                <textarea
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                  v-model="product.description"
                >
                </textarea>
              </div>
              <div class="my-4">
                <label class="w-1/2 block font-bold uppercase text-sm mb-2"
                  >kategoriyasi</label
                >
                <multiselect
                  v-model="selectedCategories"
                  tag-placeholder="Ushbu kategoriayni qo'shing"
                  placeholder="Kategoriya izlang yoki qo'shing"
                  label="name"
                  track-by="id"
                  :options="categories"
                  :multiple="true"
                  @tag="addTag"
                  @select="selectCategories"
                >
                </multiselect>
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >soni</label
                >
                <input
                  type="string"
                  class="w-1/2 border-2 text-sm  py-2 pl-5"
                  v-model="product.quantity"
                />
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >narxi</label
                >
                <input
                  type="string"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                  v-model="product.price"
                />
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >rasm qo'yish</label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewProductImage"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                />
                <div v-if="product.image">
                  <div>
                    <div class="w-56 h-56">
                      <img
                        :src="product.image"
                        class="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >galereya rasmlarini qo'shish</label
                ><input
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="previewProductMultiImage"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                />
                <div v-if="product.images" class="flex">
                  <div
                    v-for="(item, index) in product.images"
                    :key="index"
                    class="w-56 h-56 mr-4 relative"
                  >
                    <img
                      :src="item"
                      class="object-cover object-top w-full h-full"
                    />
                    <span
                      @click="removeImage(index, product.images)"
                      class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full "
                      >X</span
                    >
                  </div>
                </div>
                <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >Import</label
                >
                <input
                  type="checkbox"
                  class="border text-sm w-5 h-5 pl-5"
                  v-model="product.is_import"
                />
              </div>
              <div class="mb-10">
                <table class="min-w-full divide-y divide-gray-200 ">
                  <thead class="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
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
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        qo'shish/o'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      class="border"
                      v-for="(attr, index) in product.attributes"
                      :key="attr"
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
                            class=" w-full border-2 text-sm py-2 pl-5"
                            v-model="attr.key"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class=" w-full border-2 text-sm py-2 pl-5"
                            v-model="attr.label"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class=" w-full border-2 text-sm py-2 pl-5"
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

                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 text-sm py-2 pl-5"
                            v-model="attribute.key"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 text-sm py-2 pl-5"
                            v-model="attribute.label"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 text-sm py-2 pl-5"
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
                            class="cursor-pointer hover:underline"
                          >
                            Qo'shish
                          </div>
                        </div>
                      </td>
                      <div
                        class="fixed z-40 top-0 bottom-0 right-0 left-0 bg-gray-600 opacity-50 flex items-center justify-center"
                        v-if="showDeleteDialog"
                      >
                        <div class="w-1/3 bg-white py-4 px-10">
                          <span class="font-bold text-xl block mb-6"
                            >Ushbu Kategoriyani o'chirishni xohlaysizmi?</span
                          >
                          <div class="flex justify-between">
                            <button
                              @click="deleteCategory(selectedCategoryID)"
                              class="bg-red-600 text-white py-2 px-4"
                            >
                              Ha
                            </button>
                            <button
                              @click="showDeleteDialog = false"
                              class="bg-gray-600 text-white py-2 px-4"
                            >
                              Yo'q
                            </button>
                          </div>
                        </div>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <div
                  @click="showAddNewKey = true"
                  class="cursor-pointer ml-auto my-2 inline-block text-2xl bg-gray-800 text-white px-2 "
                >
                  +
                </div>
              </div>
              <button
                @click="createProduct"
                class="bg-gray-800 text-white py-2 px-4"
              >
                Mahsulot yaratish
              </button>
            </div>
          </tab>
          <tab name="O'zgarish qo'shish">
            <h2 class="text-xl font-bold uppercase">
              O'zgarish qoshish
            </h2>

            <div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold uppercase text-sm mb-2"
                  >Mahsulot nomi</label
                >
                <input
                  type="text"
                  class="border-2 text-sm w-1/2 py-2 pl-5"
                  v-model="variation.name"
                />
              </div>
              <div class="input-group block my-4">
                <label
                  for="input"
                  class="block font-bold uppercase text-sm mb-2"
                  >Mahsulot kodi</label
                >
                <input
                  type="text"
                  class="border-2 text-sm w-1/2 py-2 pl-5"
                  v-model="variation.product_code"
                />
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >tavsif</label
                >
                <textarea
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                  v-model="variation.description"
                >
                </textarea>
              </div>
              <div class="my-4">
                <label class="w-1/2 block font-bold uppercase text-sm mb-2"
                  >kategoriyasi</label
                >
                <multiselect
                  v-model="selectedVariationCategories"
                  tag-placeholder="Ushbu kategoriayni qo'shing"
                  placeholder="Kategoriya izlang yoki qo'shing"
                  label="name"
                  track-by="id"
                  :options="categories"
                  :multiple="true"
                  @tag="addTag"
                  @select="selectVariationCategories"
                ></multiselect>
              </div>

              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >soni</label
                >
                <input
                  type="string"
                  class="w-1/2 border-2 text-sm  py-2 pl-5"
                  v-model="variation.quantity"
                />
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >narxi</label
                >
                <input
                  type="string"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                  v-model="variation.price"
                />
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >rasm qo'yish</label
                ><input
                  type="file"
                  accept="image/*"
                  @change="previewVariationImage"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                />
                <div v-if="variation.image">
                  <div>
                    <div class="w-56 h-56">
                      <img
                        :src="variation.image"
                        class="object-cover object-top w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
              </div>
              <div class="my-4">
                <label class="block font-bold uppercase text-sm mb-2"
                  >galereya rasmlarini qo'shish</label
                ><input
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="previewVariationMultiImage"
                  class="w-1/2 border-2 text-sm py-2 pl-5"
                />
                <div v-if="variation.images" class="flex">
                  <div
                    v-for="(item, index) in variation.images"
                    :key="index"
                    class="w-56 h-56 mr-4 relative"
                  >
                    <img
                      :src="item"
                      class="object-cover object-top w-full h-full"
                    />
                    <span
                      @click="removeImage(index, variation.images)"
                      class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full "
                      >X</span
                    >
                  </div>
                </div>
                <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
              </div>
              <div class="mb-10">
                <h2 class="font-bold text-xl my-4">Attributlar</h2>
                <table class="min-w-full divide-y divide-gray-200 ">
                  <thead class="bg-gray-200">
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
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
                        class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                      >
                        qo'shish/o'chirish
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white">
                    <tr
                      class="border"
                      v-for="(attrib, index) in variation.attributes"
                      :key="attrib"
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
                      <td class="px-2 py-1 border">
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
                            class="w-full border-2 text-sm py-2 pl-5"
                            v-model="attribute.key"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 text-sm py-2 pl-5"
                            v-model="attribute.label"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-1 border">
                        <div class="flex items-center text-gray-500">
                          <input
                            type="text"
                            class="w-full border-2 text-sm py-2 pl-5"
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
                <div
                  @click="showAddNewKey = true"
                  class="cursor-pointer ml-auto my-2 inline-block text-2xl bg-gray-800 text-white px-2 "
                >
                  +
                </div>
              </div>
              <button
                @click="addVariation"
                class="bg-gray-800 text-white py-2 px-4"
              >
                Mahsulotni saqlash
              </button>
            </div>
            <div>
              <h2 class="font-bold text-xl my-4">
                Qo'shilgan o'zgarishlar {{ product.variations }}
              </h2>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      mahsulot nomi
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      mahsulot kodi
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      kategoriyasi
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-2 text-left text-sm font-bold text-gray-700 uppercase"
                    >
                      narxi so'm
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
                    v-for="varProduct in product.variations"
                    :key="varProduct.product_code"
                  >
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500 ">
                        <input
                          type="text"
                          class=" w-full border-2 text-sm py-2"
                          v-model="varProduct.name"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <div class="flex items-center text-gray-500">
                        <input
                          type="text"
                          class=" w-full border-2 text-sm py-2"
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
                          class=" w-full border-2 text-sm py-2"
                          v-model="varProduct.price"
                        />
                      </div>
                    </td>
                    <td class="px-2 py-1 border">
                      <input
                        type="text"
                        class=" w-full border-2 text-sm py-2"
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
import AdminSidebar from "~/components/admin/AdminSidebar.vue";
import BaseButton from "../../components/admin/BaseButton.vue";
export default {
  components: {
    AdminSidebar,
    BaseButton
  },
  data() {
    return {
      selectedBrand: {},
      selectedCategories: [],
      selectedVariationCategories: [],
      previewProduct: null,
      previewVariation: null,
      token: "8939c3ce7bdfcb37d68303016230815fc5d555af",
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
        variations: []
      },
      variation: {
        parent_id: 0,
        name: null,
        product_code: null,
        price: null,
        description: null,
        quantity: null,
        image: null,
        images: [],
        attributes: [],
        categories: []
      },
      attribute: {
        is_main: false,
        key: null,
        label: null,
        value: null
      }
    };
  },
  methods: {
    selectCategories(value, id) {
      this.product.categories.push(value.id);
    },
    selectVariationCategories(value, id) {
      this.variation.categories.push(value.id);
    },
    addProductAttribute() {
      this.product.attributes.push(this.attribute);
      this.variation = Object.assign({}, this.product);
      delete this.variation.brand;
      delete this.variation.is_import;
      delete this.variation.variations;
      this.variation.image = "";
      this.variation.images = [];
      this.attribute = {};
      this.showAddNewKey = false;
    },
    addVariationAttribute() {
      this.variation.attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    RemoveAttribute(product, index) {
      product.attributes.splice(index, 1);
    },
    addVariation() {
      this.product.variations.push(this.variation);
      this.variation = {
        attributes: []
      };
      this.showAddNewVariation = false;
    },
    RemoveVariation(index) {
      this.product.variations.splice(index, 1);
    },
    addImage(product) {
      product.images.push(image);
    },
    addTag(newTag) {
      this.selectedCategories.push(newTag);
    },
    removeImage(index, images) {
      images.splice(index, 1);
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
    createProduct() {
      let loader = this.$loading.show();
      this.product.brand = this.selectedBrand.id;
      this.$axios
        .post("product/create/", this.product, {
          headers: {
            Authorization: `Token ${this.token}`
          }
        })
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
          showFail = true;
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCategories();
    this.getBrands();
  }
};
</script>
<style scoped>
div.multiselect {
  min-width: 50%;
}
</style>
