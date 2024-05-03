import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(6, { message: "Username must be at least 6 char longs" })
  .max(20, { message: "Username cannot exceed 20 characters" })
  .regex(
    /^[a-z0-9]{6,20}$/,
    "Username must not contain special characters or uppercase letters"
  );
export const emailValidation = z.string().email({ message: "Invalid Email" });
export const passwordValidation = z
  .string()
  .min(8, { message: "Password should have minimum length of 8" })
  .max(15, "Password is too long")
  .regex(/^(?=.*[A-Z]).{8,}$/, {
    message:
      "Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
  });
export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});
