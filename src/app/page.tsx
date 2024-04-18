"use client";

import { useState } from "react";
import Link from "next/link";
import * as bcrypt from "bcryptjs";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export default function HomePage() {
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkHash, setCheckHash] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [copied, setCopied] = useState(false);

  function hashPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    setHash(hashedPassword);
  }

  function verifyPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isValid = bcrypt.compareSync(checkPassword, checkHash);
    setIsValid(isValid);
  }

  function copyPassword() {
    navigator.clipboard
      .writeText(hash)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((error) => {
        setCopied(false);
        console.log(error);
      });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-950">
      <header className="sticky top-0 z-10 border-b bg-white/80 px-4 py-3 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <LockIcon className="h-6 w-6" />
            <span>Password Hasher</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="#hashing"
            >
              Hashing
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="#checker"
            >
              Checker
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="#security"
            >
              Security
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto py-12 md:py-24" id="hashing">
          <div className="mx-4 grid gap-8 md:mx-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Password Hashing
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Securely hash your passwords using the latest algorithms. Get a
                unique hash that can be safely stored and used for
                authentication.
              </p>
              <form className="space-y-4" onSubmit={hashPassword}>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full text-white bg-zinc-900 hover:bg-zinc-950"
                  type="submit"
                >
                  Hash Password
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Hashed Password
              </h3>
              <div className="relative rounded-md border border-gray-200 bg-white p-4 font-mono text-sm shadow-sm dark:border-gray-800 dark:bg-gray-950">
                <span>
                  {copied ? (
                    "Copied!"
                  ) : (
                    <div>
                      {hash.length > 0 ? hash : "Enter a password to hash"}
                    </div>
                  )}
                </span>
                <Button
                  className="absolute top-2 right-2 h-7 w-7"
                  size="icon"
                  variant="ghost"
                  onClick={() => copyPassword()}
                >
                  <CopyIcon className="h-4 w-4" />
                  <span className="sr-only">Copy hash</span>
                </Button>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                This is your hashed password. You can now safely store this
                value in your database for authentication.
              </p>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-12 md:py-24" id="checker">
          <div className="mx-4 grid gap-8 md:mx-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Password Checker
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Verify if a password matches a hashed value. This can be used to
                authenticate users during login.
              </p>
              <form className="space-y-4" onSubmit={verifyPassword}>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    required
                    value={checkPassword}
                    type="password"
                    onChange={(e) => setCheckPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hash">Hashed Password</Label>
                  <Input
                    id="hash"
                    placeholder="Enter the hashed password"
                    required
                    type="text"
                    value={checkHash}
                    onChange={(e) => setCheckHash(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full text-white bg-zinc-900 hover:bg-zinc-950"
                  type="submit"
                >
                  Check Password
                </Button>
              </form>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Password Verification
              </h3>
              <div className="rounded-md border border-gray-200 bg-white p-4 font-mono text-sm shadow-sm dark:border-gray-800 dark:bg-gray-950">
                {isValid ? "Password is valid" : "Password is invalid"}
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                The password you entered matches the hashed value. This means
                the password is valid and can be used for authentication.
              </p>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-12 md:py-24" id="security">
          <div className="mx-4 grid gap-8 md:mx-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Password Security
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Learn best practices for securing your passwords and protecting
                your users' data.
              </p>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span>Use a strong, unique password for each account</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    Enable two-factor authentication whenever possible
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    Store passwords securely using a hashing algorithm like
                    bcrypt
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    Implement password policies to enforce strong passwords
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-4 w-4 flex-shrink-0" />
                  <span>
                    Regularly update and patch your systems to address
                    vulnerabilities
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Why Password Security Matters
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Protecting user passwords is crucial for maintaining the
                integrity and trust of your application. Weak or compromised
                passwords can lead to data breaches, identity theft, and
                financial loss. By following best practices for password
                security, you can safeguard your users' sensitive information
                and build a more secure and reliable platform.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white/80 px-4 py-6 backdrop-blur-md dark:bg-gray-950/80 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Password Hasher. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
