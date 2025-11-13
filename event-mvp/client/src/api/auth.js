// client/src/api/auth.js
const API_URL = "http://localhost:3000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("📩 Respuesta del backend:", data);

    if (!response.ok) {
      throw new Error(data.error || "Error en el inicio de sesión");
    }

    return data;
  } catch (error) {
    console.error("💥 Error en loginUser:", error);
    throw error;
  }
};
