<template>
  <div class="form-control">
    <input :type="props.Type" :required="props.Required" v-model="localValue" />
    <label>
      <span
        v-for="(letter, index) in label"
        :style="{ transitionDelay: getDelay(index) }"
        >{{ letter }}</span
      >
    </label>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  Type: String,
  Label: String,
  Required: Boolean
});
const label = computed(() => props.Label.split(""));
function getDelay(index) {
  return index * 50 + "ms";
}
const emit = defineEmits(["update:modelValue"]);

// Use a ref for the local copy of the input value
const localValue = ref(props.modelValue);

// Watch localValue for changes and emit updates
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped>
.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 280px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px var(--color-heading) solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: var(--color-heading);
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: var(--raisin-black);
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: var(--raisin-black);
  transform: translateY(-30px);
}
</style>
