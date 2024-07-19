<template>
  <div class="form-control">
    <input
      :type="props.Type"
      :required="props.Required"
      v-model="localValue"
      :class="{ invalid: !isValid }"
    />
    <label>
      <span
        v-for="(letter, index) in label"
        :style="{ transitionDelay: getDelay(index) }"
        >{{ letter }}</span
      >
    </label>
    <p class="message" v-if="!isValid">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: String,
  Type: String,
  Label: String,
  Required: Boolean,
  validator: Function,
  errorMessage: String
});
const label = computed(() => props.Label.split(""));
function getDelay(index) {
  return index * 50 + "ms";
}
const emit = defineEmits(["update:modelValue"]);

const localValue = ref(props.modelValue);

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const isValid = computed(() => {
  if (localValue.value.length < 1) return true;
  if (!props.validator) return true;
  return props.validator(localValue.value);
});
</script>

<style scoped>
.message {
  color: var(--incorrect-answer);
  font-size: 12px;
}
.form-control {
  position: relative;
  margin: 10px 0 25px;
  width: 280px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px var(--contrasting-gray) solid;
  display: block;
  width: 100%;
  padding: 8px 0;
  font-size: 15px;
  color: var(--color-heading);
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: var(--zafre);
}

.form-control label {
  position: absolute;
  top: 3px;
  left: 0;
  pointer-events: none;
  color: var(--contrasting-gray);
  font-weight: 700;
}

.form-control label span {
  display: inline-block;
  font-size: 13px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: var(--zafre);
  transform: translateY(-20px);
}
.form-control .invalid {
  color: var(--incorrect-answer);
}

.form-control .invalid:focus + label span,
.form-control .invalid:invalid + label span {
  color: var(--incorrect-answer);
}
.form-control input.invalid {
  border-bottom-color: var(--incorrect-answer);
}
</style>
