"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { loginAction } from "@/lib/actions/login"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            action={async (formData) => {
              setLoading(true)
              setError("")
              try {
                await loginAction(formData)
              } catch (err: any) {
                setError("Invalid username or password")
                setLoading(false)
              }
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input name="username" required />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input type="password" name="password" required />
              </Field>

              <input type="hidden" name="role" value="ADMIN" />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
