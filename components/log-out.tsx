"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupAction } from "@/lib/actions/signup";
import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[0-9]).{8,}$/; // min 8 chars + at least one digit

export default function SignupForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailValid = EMAIL_REGEX.test(email);
  const passwordValid = PASSWORD_REGEX.test(password);
  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const emailError = email && !emailValid ? "Enter a valid email address." : "";
  const passwordError =
    password && !passwordValid
      ? "Password must be at least 8 characters and contain a digit."
      : "";
  const confirmError =
    confirmPassword && !passwordsMatch ? "Passwords do not match." : "";

  const isFormValid = emailValid && passwordValid && passwordsMatch;

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            if (!isFormValid) return;
            setLoading(true);
            setError("");
            try {
              await signupAction(formData);
              
            } catch (err: any) {
              setError("User Already Exists");
              setLoading(false);
            }
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError ? (
                <FieldDescription className="text-red-500">
                  {emailError}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError ? (
                <FieldDescription className="text-red-500">
                  {passwordError}
                </FieldDescription>
              ) : (
                <FieldDescription>
                  Must be at least 8 characters long and contain a digit.
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmError ? (
                <FieldDescription className="text-red-500">
                  {confirmError}
                </FieldDescription>
              ) : (
                <FieldDescription> </FieldDescription>
              )}
            </Field>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={
                    !isFormValid ? "opacity-50 cursor-not-allowed" : ""
                  }
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
                <Button variant="outline" type="button">
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
