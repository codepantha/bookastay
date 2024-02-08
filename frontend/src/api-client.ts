import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

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

export const login = async (formData: SignInFormData) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message);

  return data;
}

export const signOut = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!res.ok) throw new Error('Error during sign out');
}
