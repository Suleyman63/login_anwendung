<template>
    <!-- slot ermöglicht es, dynamischen Inhalt in eine Komponente einzufügen. -->
    <button 
      class="custom-button" 
      @click="handleClick">
      <slot></slot>
    </button>
</template>
  
  
<script setup lang="ts">
  
  // Funktion, um einen Ereignisbus zu erstellen
  const createEventBus = () => {
      const listeners = new Set<Function>();
    
      // Funktion zum Auslösen eines Ereignisses
      const emit = (event: string, ...args: any[]) => {
          listeners.forEach(listener => listener(event, ...args));
        }
      
      // Funktion zum Abonnieren eines Ereignisses
      const on = (event: string, callback: Function) => {
          listeners.add(callback);
          return () => listeners.delete(callback);
        }
    return { emit, on };
  }
  

  // Ereignisbus erstellen
  const eventBus = createEventBus();
  

  // Funktion zum Behandeln des "click"-Ereignisses
  const handleClick = () => {
    eventBus.emit('click');
  };
  
</script>
  
  
<style>
  .custom-button {
    width: 100%;
    border-radius: 40px;
    background: #fff;
    color: #3D4045;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 1em;
    font-weight: 600;
    display: block;
    height: 50px;
    outline: none;
    border: none;
    transition: .5s;
  }
  
  .custom-button:hover {
    background: #3D4045;
    color: #fff;
    animation: 20s ease-in-out;
  }

</style>