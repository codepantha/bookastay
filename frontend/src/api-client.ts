import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const res = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  })

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message)
  }
}

export const validateToken = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Invalid token');
  }

  return res.json();
};
