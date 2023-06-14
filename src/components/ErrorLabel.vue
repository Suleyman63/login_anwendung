<template>
  <div class="error">{{ errorMessage}}</div>
</template>
  
<script setup lang="ts">
import { computed } from 'vue';
import { useLoginStore } from '@/stores/login';
  
  
  // Die Berechnung basiert auf den Werten emailError, 
  // passwordError und loginError im Login-Store.
  const loginStore = useLoginStore();

  // computed festgelegt, um dynamisch den aktuellen Wert der 
  // Fehlermeldung aus dem Login-Store abzurufen.
  const errorMessage = computed(() => {
    return loginStore.emailError || 
           loginStore.passwordError || 
           loginStore.loginError;
  });
  
</script>
  
<style scoped>
  .error {
    color: red;
  }
</style>
  