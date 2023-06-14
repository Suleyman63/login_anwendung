
// Typdefinition für API-Antwort.
export type  ApiResponse = {
  // Gibt an, ob die API-Anfrage erfolgreich war oder nicht.
    success: boolean;
    // wenn success true ist.
    user?: { username: string };
    // wenn success false ist.
    error?: string;
}
  

  // Benutzeranmeldedaten zu überprüfen, indem sie eine API-Anfrage simuliert. 
  // Das Ergebnis der Funktion ist ein Promise, das ein ApiResponse-Objekt zurückgibt.
  const simulateAPIRequest = async (
    email: string,
    password: string
  ): Promise<ApiResponse> => {
    if (email === 'test@example.com' && password === 'passwort') {
      const user = {
        username: 'TestUser',
      };
      return {
        success: true,
        user: user,
      };
    } else {
      return {
        success: false,
        error: 'Falsche E-Mail oder Passwort.',
      };
    }
  };
  
  export default simulateAPIRequest;