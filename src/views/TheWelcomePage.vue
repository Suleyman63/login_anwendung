<template>
  <div class="welcome-section">
    <div>
      <h1 >WELCOME PAGE</h1>
    </div>
    <div>
      <h4 class="username">Hallo, {{ username }}!</h4>
    </div>
    <div class="btn-div">
      <CustomButton class="btn-logout" @click="handleLogout">
       Ausloggen
      </CustomButton>
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { computed } from 'vue';
  import { useLoginStore } from '@/stores/login';
  import { useRouter } from 'vue-router';
  import CustomButton from '../components/CustomButton.vue';
  
   
  // LoginStore-Hook
   const loginStore = useLoginStore();
  // Die computed Funktion, um den username abzurufen
   const username = computed(() => loginStore.userData?.username);
  // Die useRouter Funktion, um den Router abzurufen
   const router = useRouter();


  // Die Methode resetUserData verwendet des loginStore, 
  // um die Benutzerdaten zurückzusetzen. 
  const handleLogout = () => {
      loginStore.resetUserData();
      router.push('/theLoginPage');
  };
</script>


<style scoped>
  .welcome-section{
    position:absolute;
    top:40%;
    left:50%;
    margin-top:-40px; 
    margin-left:-100px;
    text-align: center;
  }
  .username{
    font-weight: bold;
    color: red;
    font-size: 20px;
  }
  .btn-div{
    display: flex;
    justify-content: center;
  }
  .btn-logout{
    margin-top: 30px;
    border: none;
    border-radius: 25px;
    background: #C2A15A;
    color: #fff;
    padding: 10px;
    width: 150px;
    font-size: 16px;
    cursor: pointer;
  }
  .btn-logout:hover{
    background: #3D4045;
    color: #fff;
  }

</style>

