<template>
  <div class="my-6">
    <h3 class="uppercase font-bold mb-2">Xaridorlar fikri</h3>
    <div class="flex">
      <star-rating
        :increment="0.5"
        :rating="selectedProduct.rating"
        :show-rating="false"
        :max-rating="5"
        inactive-color="#ccc"
        active-color="gold"
        :star-size="20"
      >
      </star-rating
      ><span class="mx-2 text-lg">2 ta fikr</span>
      <div
        class="flex ml-auto cursor-pointer"
        @click="showCommentBox = !showCommentBox"
      >
        <img
          src="~/assets/images/comment.svg"
          alt="comment icon"
          class="w-6 mr-2"
        />
        <span>Fikr bildirish</span>
      </div>
    </div>
    <div class="my-6" v-if="showCommentBox">
      <textarea
        name="comment"
        class="bg-gray-200 w-full h-24 py-2 px-4"
        placeholder="Fikringizni shu yerga qoldiring"
      ></textarea>
      <div class="flex justify-between items-center mt-2">
        <star-rating
          :increment="0.5"
          :rating="0"
          :show-rating="false"
          :max-rating="5"
          inactive-color="#ccc"
          active-color="gold"
          :star-size="15"
        >
        </star-rating>
        <button class="bg-black px-4 py-2 text-white">Fikr bildirish</button>
      </div>
    </div>
    <div>
      <div class="flex justify-between mt-6 mb-2">
        <span class="font-bold text-lg">Mirjahon</span>
        <div class="flex items-center">
          <span class="text-gray-600 mr-4">3 daqiqa oldin</span>
          <star-rating
            :increment="0.5"
            :rating="4"
            :show-rating="false"
            :max-rating="5"
            inactive-color="#ccc"
            active-color="gold"
            :star-size="15"
          >
          </star-rating>
        </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
        molestiae sapiente at qui blanditiis, deleniti repellendus saepe autem
        voluptatum iste rem ut quam eligendi. Cumque nemo tenetur possimus
        inventore minus?
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
