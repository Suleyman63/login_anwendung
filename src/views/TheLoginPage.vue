<template>
  <div class="login-section">
    <div class="form-value">
      <form @submit="login">
        <ErrorLabel v-if="loginStore.loginError" />
        <div>
          <h2>Login</h2>
        </div>
        <div class="inputbox">
            <label for="email">E-Mail:</label>
            <input type="email" 
                    id="email" 
                    placeholder="test@example.com" 
                    v-model="email"
            >
            <ErrorLabel v-if="loginStore.emailError"/> 
        </div>
        <div class="inputbox">
            <label for="password">Passwort:</label>
            <input type="password" 
                    id="password" 
                    placeholder="passwort" 
                    v-model="password"
            >
            <ErrorLabel v-if="loginStore.passwordError" />
        </div>
        <div class="rememberbox">
            <input type="checkbox" 
                    id="remember" 
                    v-model="rememberMe"
            >
            <label for="remember">Anmeldedaten speichern</label>
        </div>
        <CustomButton type="submit">Anmelden</CustomButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

import { useLoginStore } from '@/stores/login';

import simulateAPIRequest from '../api/Api';
import type  { ApiResponse } from '../api/Api';

import ErrorLabel from '../components/ErrorLabel.vue'
import CustomButton from '../components/CustomButton.vue';



const loginStore = useLoginStore();
const router = useRouter();


// Hier ist ref()-Funktion verwendet, 
// um eine reactive Variable zu erstellen. 
// Reactive Variablen ermöglichen es, 
// den Zustand einer Variable zu verfolgen und 
// automatisch Komponenten zu aktualisieren, 
// die von dieser Variablen abhängen.
const email = ref('');
const password = ref('');
const rememberMe = ref(false);



// login function
const login = async (event: Event) => {
    // Verhindere das Standardverhalten des Events (Formularübermittlung)
    event.preventDefault();

    // Funktion zur Validierung der E-Mail-Adresse
    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Check E-Mail und password validation
    if (!validateEmail(email.value)) {
        loginStore.setEmailError('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return;
    }
    if (!password.value) {
        loginStore.setPasswordError('Bitte geben Sie ein gültiges Passwort ein.');
        return;
    }

    // In diesem Code wird eine asynchrone API-Anfrage simuliert, 
    // bei der die eingegebene E-Mail-Adresse und das Passwort verwendet werden. 
    // Die Funktion simulateAPIRequest erwartet diese Werte und gibt eine ApiResponse zurück.
    try {
        const response: ApiResponse = await simulateAPIRequest(email.value, password.value);
        if (response.success) {
            loginStore.setUserData(response.user!);
            router.push('/theWelcomePage');
        } else {
            loginStore.setLoginError(response.error!);
        }
    } catch (error) {
        loginStore.setLoginError('Fehler bei der API-Anfrage.');
    }
};


// In dieser Funktion wird überprüft, ob die "rememberMe"-Einstellung aktiviert ist.
// Wenn sie aktiviert ist, werden die E-Mail-Adresse und das Passwort aus den entsprechenden Eingabefeldern 
// (email.value und password.value) im lokalen Speicher gespeichert. 
const saveUserDataToLocalstorage = () => {
   if (rememberMe.value) {
     localStorage.setItem('email', email.value);
     localStorage.setItem('password', password.value);
   } else {
     localStorage.removeItem('email');
     localStorage.removeItem('password');
   }
};


 // Setze die E-Mail, Passwort, Login Fehlermeldung auf einen leeren String
const clearErrorMessages = () => {
    loginStore.setEmailError('');
    loginStore.setPasswordError('');
    loginStore.setLoginError('');
};


// Überwache Änderungen an den Variablen [email, password, rememberMe] 
// und rufe die Funktion saveUserDataToLocalstorage auf
watch([email, password, rememberMe], saveUserDataToLocalstorage, { deep: true });

// Überwache Änderungen an der Variable email, password und rufe die Funktion clearErrorMessages auf
watch(email, clearErrorMessages);
watch(password, clearErrorMessages);

</script>


<style scoped>
/* Google Font importiert */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  font-family: 'poppins', sans-serif;
  box-sizing: border-box;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-value {
  width: 450px;
  height: 500px;
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #C2A15A;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-section h2 {
  font-size: 2em;
  color: #fff;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
}

.inputbox {
  margin: 20px 0;
  width: 310px;
}

.inputbox label {
  color: #fff;
  font-size: 1.1em;
}

.inputbox input {
  width: 100%;
  height: 38px;
  border: none;
  border-radius: 20px;
  outline: none;
  font-size: 1em;
  padding: 0 25px 0 5px;
  margin-top: 3px;
}

input:focus {
  outline: none !important;
  border: 2px solid #719ECE;
}

::placeholder {
  font-style: italic;
  font-size: 13px;
}

.rememberbox {
  margin-bottom: 30px;
}

.rememberbox label {
  color: #fff;
  padding-left: 5px;
}
</style> 