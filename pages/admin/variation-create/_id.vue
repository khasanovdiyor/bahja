<template>
  <div>
    <!-- <AdminSidebar /> -->
    <div>
      <div
        v-if="showSuccess"
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-green-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          ></path>
        </svg>
        <i>O'zgarish qo'shildi</i>
        <span
          class="absolute right-10 cursor-pointer"
          @click="showSuccess = false"
          >X</span
        >
      </div>
      <div
        v-if="showFail"
        class="flex fixed z-40 top-0 py-2 w-9/12 bg-red-500 text-lg text-white text-center"
      >
        <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current mx-5">
          <path
            d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
          ></path>
        </svg>
        <i> O'zgarish qo'shishda xatolik yuz berdi, qayta urinib ko'ring</i>
        <span
          class="absolute font-bold right-10 cursor-pointer"
          @click="showFail = false"
          >X</span
        >
      </div>
      <h2 class="text-xl font-bold text-gray-800 pt-10">O'zgarish qoshish</h2>

      <div>
        <div class="input-group block my-4">
          <label
            for="input"
            class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >nom</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model="$v.variation.name.$model"
          />
          <div
            class="text-red-400"
            v-if="!$v.variation.name.required && $v.variation.name.$dirty"
          >
            <i class="text-sm">{{ requiredMessage }}</i>
          </div>
        </div>
        <div class="input-group block my-4">
          <label
            for="input"
            class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >kod</label
          >
          <input
            type="text"
            class="border-2 rounded-md text-sm w-1/2 py-2 pl-5"
            v-model="variation.product_code"
          />
          <div
            class="text-red-400"
            v-if="
              !$v.variation.product_code.required &&
              $v.variation.product_code.$dirty
            "
          >
            <i class="text-sm"> {{ requiredMessage }}</i>
          </div>
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >tavsif</label
          >
          <textarea
            class="w-1/2 border-2 text-sm py-2 pl-5"
            v-model="$v.variation.description.$model"
          >
          </textarea>
          <div
            class="text-red-400"
            v-if="
              !$v.variation.description.required &&
              $v.variation.description.$dirty
            "
          >
            <i class="text-sm"> {{ requiredMessage }}</i>
          </div>
        </div>
        <div class="my-4">
          <label class="block font-bold text-gray-600 uppercase text-sm mb-2"
            >kategoriya</label
          >
          <multiselect
            v-model="$v.selectedVariationCategories.$model"
            tag-placeholder="Ushbu kategoriayni qo'shing"
            placeholder="Kategoriya izlang yoki qo'shing"
            label="name"
            track-by="id"
            :options="categories"
            :multiple="true"
            @tag="addTag"
            @select="selectVariationCategories"
          ></multiselect>
          <div
            class="text-red-400"
            v-if="
              !$v.selectedVariationCategories.required &&
              $v.selectedVariationCategories.$dirty
            "
          >
            <i class="text-sm"> {{ requiredMessage }}</i>
          </div>
        </div>

        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >son</label
          >
          <input
            type="text"
            class="w-1/2 rounded-md border-2 text-sm py-2 pl-5"
            v-model="$v.variation.quantity.$model"
            v-mask="priceMask"
          />
          <div
            class="text-red-400"
            v-if="
              !$v.variation.quantity.required && $v.variation.quantity.$dirty
            "
          >
            <i class="text-sm"> {{ requiredMessage }}</i>
          </div>
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >narx</label
          >
          <input
            type="string"
            class="w-1/2 rounded-md border-2 text-sm py-2 pl-5"
            v-model="$v.variation.price.$model"
            v-mask="priceMask"
          />
          <div
            class="text-red-400"
            v-if="!$v.variation.price.required && $v.variation.price.$dirty"
          >
            <i class="text-sm"> {{ requiredMessage }}</i>
          </div>
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >Asosiy rasm</label
          ><input
            type="file"
            accept="image/*"
            @change="previewVariationImage"
            class="w-1/2 rounded-md border-2 text-sm py-2 pl-5"
          />
          <div v-if="variation.image">
            <div>
              <div class="w-56 h-64 my-5 border shadow-sm">
                <img
                  :src="variation.image"
                  class="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="my-4">
          <label class="block text-gray-600 font-bold uppercase text-sm mb-2"
            >galereya rasmlari</label
          ><input
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="previewVariationMultiImage"
            class="border-2 rounded-md bg-white text-sm w-1/2 py-2 pl-5"
          />
          <div v-if="variation.images" class="flex flex-wrap">
            <div
              v-for="(item, index) in variation.images"
              :key="index"
              class="w-56 h-64 my-5 border shadow-sm relative"
            >
              <img :src="item" class="object-cover w-full h-full" />
              <span
                @click="removeImage(index)"
                class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full"
                >X</span
              >
            </div>
          </div>
          <!-- <img src="~/assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>
        <div class="mb-10">
          <h2 class="font-bold text-xl text-gray-800 my-4">Attributlar</h2>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-200">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                >
                  is main
                </th>

                <th
                  scope="col"
                  class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                >
                  key
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                >
                  label
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 text-left text-xs font-bold text-gray-600 uppercase"
                >
                  value
                </th>
                <th
                  scope="col"
                  class="px-6 py-2 w-40 text-left text-xs font-bold text-gray-600 uppercase"
                >
                  o'chirish
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
                <td class="py-1 border">
                  <input
                    type="text"
                    class="border w-full text-sm px-5 py-4 rounded-md h-5"
                    v-model="attrib.value"
                  />
                </td>
                <td class="px-2 py-1 border">
                  <div>
                    <img
                      src="~/assets/images/delete.svg"
                      class="w-5 h-5 mx-auto cursor-pointer"
                      alt="delete"
                      @click="RemoveAttribute(variation, index)"
                    />
                  </div>
                </td>
              </tr>
              <tr class="border" v-if="showAddNewKey">
                <td class="px-6 py-1 border">
                  <div class="flex items-center text-gray-600">
                    <input
                      type="checkbox"
                      class="border w-5 h-5 pl-5"
                      v-model="attribute.is_main"
                    />
                  </div>
                </td>

                <td class="py-1 border">
                  <div class="flex items-center text-gray-600">
                    <input
                      type="text"
                      class="w-full border-2 rounded-md text-sm px-5 py-2"
                      v-model="attribute.key"
                    />
                  </div>
                </td>
                <td class="py-1 border">
                  <div class="flex items-center text-gray-600">
                    <input
                      type="text"
                      class="w-full border-2 rounded-md text-sm px-5 py-2"
                      v-model="attribute.label"
                    />
                  </div>
                </td>
                <td class="py-1 border">
                  <div class="flex items-center text-gray-600">
                    <input
                      type="text"
                      class="w-full border-2 rounded-md text-sm px-5 py-2"
                      v-model="attribute.value"
                    />
                  </div>
                </td>
                <td class="px-6 py-1 border">
                  <div class="flex items-center text-gray-600 justify-center">
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
            class="block bg-gray-800 cursor-pointer w-24 text-sm text-center rounded-md px-3 text-white my-2 py-2"
          >
            Qoshish
          </div>
        </div>
        <div class="text-red-400" v-if="!$v.variation.attributes.minLength">
          Kamida {{ $v.variation.attributes.$params.minLength.min }} ta attribut
          kiritish shart
        </div>
        <button
          @click="createVariation"
          class="block bg-gray-800 text-sm text-center rounded-md px-3 text-white my-2 py-2"
        >
          Mahsulotni saqlash
        </button>
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
      showAddNewKey: false,
      variationImages: [],
      showSuccess: false,
      requiredMessage: "To'ldirish shart",
      selectedVariationCategories: null,
      showFail: false,
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
  validations: {
    selectedVariationCategories: {
      required
    },
    variation: {
      name: {
        required
      },
      product_code: {
        required
      },
      quantity: {
        required
      },
      price: {
        required
      },
      description: {
        required
      },
      attributes: {
        required,
        minLength: minLength(2)
      },
      categories: {
        required
      }
    }
  },
  methods: {
    selectVariationCategories(value, id) {
      this.variation.categories.push(value.id);
    },
    addTag(newTag) {
      this.selectedCategories.push(newTag);
    },
    addVariationAttribute() {
      this.variation.attributes.push(this.attribute);
      this.attribute = {};
      this.showAddNewKey = false;
    },
    RemoveAttribute(product, index) {
      product.attributes.splice(index, 1);
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
    removeImage(index) {
      console.log(this.preview_list);
      this.variation.images.splice(index, 1);
    },
    createVariation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loader = this.$loading.show();
        this.variation.parent_id = this.$route.params.id;
        this.$axios
          .post("product/variation-create/", this.variation)
          .then(res => {
            console.log(res);
            loader.hide();
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            });
            this.productVariation = {};
          })
          .catch(err => {
            loader.hide();
            this.showFail = true;
            setTimeout(() => {
              this.showFail = false;
            });
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getCategories();
  }
};
</script>
