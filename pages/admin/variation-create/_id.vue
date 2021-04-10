<template>
  <div class="min-h-screen flex">
    <AdminSidebar />
    <div class="px-10 mb-10">
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-green-600 text-white"
        v-if="showSuccess"
      >
        <div>
          <span>O'zgarish qo'shildi</span>
        </div>
        <div
          class="text-white px-4 cursor-pointer"
          @click="showSuccess = false"
        >
          X
        </div>
      </div>
      <div
        class="py-2 px-4 flex fixed w-1/2 mx-auto text-xl justify-between bg-red-600 text-white"
        v-if="showFail"
      >
        <div>
          <span
            >O'zgarish qo'shishda xatolik yuz berdi, qayta urinib koring</span
          >
        </div>
        <div class="text-white px-4 cursor-pointer" @click="showFail = false">
          X
        </div>
      </div>
      <h2 class="text-xl font-bold uppercase pt-10">O'zgarish qoshish</h2>

      <div>
        <div class="input-group block my-4">
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Mahsulot nomi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="$v.variation.name.$model"
          />
          <div
            class="text-red-400"
            v-if="!$v.variation.name.required && $v.variation.name.$dirty"
          >
            {{ requiredMessage }}
          </div>
        </div>
        <div class="input-group block my-4">
          <label for="input" class="block font-bold uppercase text-sm mb-2"
            >Mahsulot kodi</label
          >
          <input
            type="text"
            class="border-2 text-sm w-1/2 py-2 pl-5"
            v-model="variation.product_code"
          />
          <div
            class="text-red-400"
            v-if="
              !$v.variation.product_code.required &&
              $v.variation.product_code.$dirty
            "
          >
            {{ requiredMessage }}
          </div>
        </div>
        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2">tavsif</label>
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
            {{ requiredMessage }}
          </div>
        </div>
        <div class="my-4">
          <label class="w-1/2 block font-bold uppercase text-sm mb-2"
            >kategoriyasi</label
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
            {{ requiredMessage }}
          </div>
        </div>

        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2">soni</label>
          <input
            type="string"
            class="w-1/2 border-2 text-sm py-2 pl-5"
            v-model="$v.variation.quantity.$model"
          />
          <div
            class="text-red-400"
            v-if="
              !$v.variation.quantity.required && $v.variation.quantity.$dirty
            "
          >
            {{ requiredMessage }}
          </div>
        </div>
        <div class="my-4">
          <label class="block font-bold uppercase text-sm mb-2">narxi</label>
          <input
            type="string"
            class="w-1/2 border-2 text-sm py-2 pl-5"
            v-model="$v.variation.price.$model"
            v-mask="priceMask"
          />
          <div
            class="text-red-400"
            v-if="!$v.variation.price.required && $v.variation.price.$dirty"
          >
            {{ requiredMessage }}
          </div>
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
              <img :src="item" class="object-cover object-top w-full h-full" />
              <span
                @click="removeImage(index)"
                class="absolute top-4 right-4 bg-white w-6 h-6 flex items-center justify-center cursor-pointer rounded-full"
                >X</span
              >
            </div>
          </div>
          <!-- <img src="../assets/images/link.svg" class="w-5 inline-block" /> -->
        </div>
        <div class="mb-10">
          <h2 class="font-bold text-xl my-4">Attributlar</h2>
          <table class="min-w-full divide-y divide-gray-200">
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
                  <div class="flex items-center text-gray-500 justify-center">
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
            class="cursor-pointer ml-auto my-2 inline-block text-2xl bg-gray-800 text-white px-2"
          >
            +
          </div>
        </div>
        <div class="text-red-400" v-if="!$v.variation.attributes.minLength">
          Kamida {{ $v.variation.attributes.$params.minLength.min }} ta
          attribute kiritish shart
        </div>
        <button
          @click="createVariation"
          class="bg-gray-800 text-white py-2 px-4"
        >
          Mahsulotni saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AdminSidebar from "~/components/admin/AdminSidebar";
import { required, minLength } from "vuelidate/lib/validators";
import priceMask from "~/mixins.js/priceMask.js";
export default {
  components: {
    AdminSidebar,
  },
  data() {
    return {
      priceMask: priceMask,
      showAddNewKey: false,
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
  validations: {
    selectedVariationCategories: {
      required,
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
        reader.onload = (e) => {
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
          reader.onload = (e) => {
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
          .then((res) => {
            console.log(res);
            loader.hide();
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            });
            this.productVariation = {};
          })
          .catch((err) => {
            loader.hide();
            this.showFail = true;
            setTimeout(() => {
              this.showFail = false;
            });
            console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getCategories();
  },
};
</script>

<style></style>
