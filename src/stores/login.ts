import { defineStore } from 'pinia';


// Die UserData interface definiert 
interface UserData {
  username: string;
}


// Die LoginState interface definiert den Zustand für den Login-Bereich. 
// Sie enthält die mansche Eigenschaften
interface LoginState {
  userData: UserData | null;
  emailError: string;
  passwordError: string;
  loginError: string;
}

export const useLoginStore = defineStore('login', {
  // Die Funktion wird als state bezeichnet und gibt 
  // ein Objekt zurück, das den Anfangszustand enthält.
  state: (): LoginState => ({
    userData: null,
    emailError: '',
    passwordError: '',
    loginError: '',
  }),

  actions: {
    // Methode zum Festlegen der Benutzerdaten in einem Objekt.
    setUserData(userData: UserData): void {
      this.userData = userData;
       localStorage.setItem('userData', JSON.stringify(userData));
    },
    // Methode zum Zurücksetzen der Benutzerdaten.
    resetUserData(): void {
      this.userData = null;
      localStorage.removeItem('userData'); 
    },
    // Methode zum Laden der Benutzerdaten aus dem localStorage.
    loadUserData(): void {
       const storedUserData = localStorage.getItem('userData');
       if (storedUserData) {
         this.userData = JSON.parse(storedUserData);
      }
    },

    // Diese Methoden dienen dazu, Fehlermeldungen in den entsprechenden 
    // Eigenschaften (loginError, emailError, passwordError) zu aktualisieren.
    setLoginError(errorMessage: string): void {
      this.loginError = errorMessage;
    },
    setEmailError(errorMessage: string): void {
      this.emailError = errorMessage;
    },
    setPasswordError(errorMessage: string): void {
      this.passwordError = errorMessage;
    },
  },
});
