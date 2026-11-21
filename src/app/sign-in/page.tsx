"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.54-1.14 2.85-2.4 3.72v3.05h3.88c2.27-2.09 3.665-5.17 3.665-8.21Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

export default function SignInPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const entries = Object.fromEntries(formData.entries());

    console.log("Sign In Form Submit (Email & Password):", entries);
  };

  const handleGoogleSignIn = () => {
    console.log("Sign In with Google clicked");
  };

  return (
    <section className="w-full bg-surface-warm py-14 text-foreground transition-colors duration-200 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        {/* Left Editorial Column */}
        <div className="flex flex-col justify-between border-b border-foreground/20 pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-10 lg:pb-0">
          <div>
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              WELCOME BACK / SIGN IN
            </p>

            <h1 className="mt-4 font-heading text-4xl leading-[1.02] font-extrabold tracking-tight text-foreground sm:text-5xl">
              Pick up right
              <span className="mt-1 block text-brand-orange">
                where you left off.
              </span>
            </h1>

            <p className="mt-5 max-w-md font-manrope text-sm leading-relaxed text-muted-foreground">
              Sign in to manage tuition applications, listings, and your Mentor
              Lagbe profile.
            </p>
          </div>

          <div className="mt-10 border-t border-foreground/20 pt-6 font-manrope text-xs text-muted-foreground">
            Need help? Contact{" "}
            <a
              href="mailto:rahmanrajdee@gmail.com"
              className="font-bold text-foreground hover:text-brand-orange"
            >
              rahmanrajdee@gmail.com
            </a>
          </div>
        </div>

        {/* Right Sign In Form */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-4">
          <div className="bg-card p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="signin-email"
                  className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="rahmanrajdee@gmail.com"
                  className="mt-2 w-full border border-foreground/20 bg-background px-4 py-3 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-orange focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="signin-password"
                  className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  PASSWORD
                </label>
                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="mt-2 w-full border border-foreground/20 bg-background px-4 py-3 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-orange focus:outline-none"
                />
              </div>

              {/* Email & Password Submit */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-brand-orange px-6 py-4 font-manrope text-xs font-extrabold tracking-[0.15em] uppercase text-[#141519] transition-colors hover:bg-[#ff7242]"
              >
                <span>SIGN IN</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              {/* Google Sign In */}
              <div className="border-t border-border/20 pt-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-foreground/20 bg-background px-5 py-3 font-manrope text-xs font-bold tracking-[0.12em] uppercase text-foreground transition-colors hover:border-foreground/50 hover:bg-muted"
                >
                  <GoogleLogo />
                  <span>CONTINUE WITH GOOGLE</span>
                </button>
              </div>
            </form>

            <p className="mt-6 font-manrope text-xs text-muted-foreground">
              New to Mentor Lagbe?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-foreground underline decoration-brand-orange underline-offset-4 hover:text-brand-orange"
              >
                Create a free account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
