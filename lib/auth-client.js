import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession, updateUser } = createAuthClient();

export async function signInWithGoogle() {
  return signIn.social({
    provider: "google",
    callbackURL: "/",
  });
}