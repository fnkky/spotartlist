<template>
  <button
    class="btn btn-sm btn-ghost"
    @click="toggle"
  >
    <svg
      v-if="props.modelValue"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
</template>

<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const toggle = () => {
  requestAnimationFrame(() => {
    emit('update:modelValue', !props.modelValue)
  })
}

</script>
