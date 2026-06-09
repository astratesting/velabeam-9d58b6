"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Register
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, workspaceName }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      // Auto sign-in
      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setError("Account created but sign-in failed. Please try logging in.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create account" subtitle="Start building sites in minutes">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-accent/10 border border-red-accent/30 rounded-8 px-3 py-2 text-13 text-red-accent">
            {error}
          </div>
        )}
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          minLength={8}
        />
        <Input
          label="Workspace name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="e.g. My Agency"
          required
        />
        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>
      </form>
      <p className="text-center text-13 text-text-secondary mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-cobalt hover:underline">Sign in</Link>
      </p>
    </AuthCard>
  );
}
