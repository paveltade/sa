<template>
  <div class="subnet-calculator">
    <h2>Калькулятор подсетей</h2>

    <div class="input-group">
      <label>IP адрес:</label>
      <input
        v-model="ip"
        type="text"
        placeholder="192.168.1.150"
        @keyup.enter="calculate"
      />
      <p v-if="!isValid && ip" class="error">Неверный формат IP адреса</p>
    </div>

    <div class="input-group">
      <label>Маска сети:</label>
      <select v-model="selectedMask">
        <option
          v-for="mask in masks"
          :key="mask.value"
          :value="mask.value"
        >
          {{ mask.label }}
        </option>
      </select>
    </div>

    <button
      class="button"
      :disabled="!isValid"
      @click="calculate"
    >
      Рассчитать
    </button>

    <div v-if="result" class="result">
      <h3>Результаты:</h3>
      <p><b>IP:</b> {{ ip }}</p>
      <p><b>Маска:</b> {{ selectedMask }}</p>
      <p><b>Адрес сети:</b> {{ result.network }}</p>
      <p><b>Количество адресов:</b> {{ result.count }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { masks } from '@/constants/masks'
import { isIpValid } from '@/utils/ipValidation'
import { getNetworkAddress } from '@/utils/networkAddress'
import { getAddressesCount } from '@/utils/addressCount'

const ip = ref('')
const selectedMask = ref(masks[24].value)
const result = ref(null)

const isValid = computed(() => isIpValid(ip.value))

function calculate() {
  if (!isValid.value) return
  result.value = {
    network: getNetworkAddress(ip.value, selectedMask.value),
    count: getAddressesCount(selectedMask.value)
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/main';

.subnet-calculator {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .error {
    color: var(--error-color);
    font-size: 0.9em;
  }

  .result {
    background: var(--bg-light);
    padding: 10px;
    border-radius: 6px;
  }
}
</style>