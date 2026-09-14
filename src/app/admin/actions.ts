"use server";

export async function checkPassword(password: string) {
  const correctPassword = process.env.ADMIN_PASSWORD || "novumadmin";
  return password === correctPassword;
}
