import LoginForm from "@/components/auth/login-form"
import { viewport } from "../viewport"

export const metadata = {
  title: "Login | Coinvote.cash",
  description: "Log in to your Coinvote.cash account to manage your profile and votes.",
}

export default function LoginPage() {
  return <LoginForm />
}

export { viewport }

