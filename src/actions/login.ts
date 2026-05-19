'use server';

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirectTo") as string || "/en/account";

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
  } catch (error) {
    throw new Error("Invalid credentials");
  }
}