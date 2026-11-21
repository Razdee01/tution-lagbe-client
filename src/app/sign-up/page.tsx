"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, UserCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";

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

export default function SignUpPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<"Student" | "Tutor">(
    "Student",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      role: selectedRole.toLowerCase() as "student" | "tutor",
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  };
  const handleGoogleSignUp = () => {
    console.log("Sign Up with Google clicked", { role: selectedRole });
  };

  return (
    <section className="w-full bg-surface-warm py-14 text-foreground transition-colors duration-200 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
        {/* Left Editorial Column */}
        <div className="flex flex-col justify-between border-b border-foreground/20 pb-8 lg:col-span-5 lg:border-r lg:border-b-0 lg:pr-10 lg:pb-0">
          <div>
            <p className="font-manrope text-[11px] font-extrabold tracking-[0.18em] uppercase text-brand-orange">
              JOIN THE NETWORK / SIGN UP
            </p>

            <h1 className="mt-4 font-heading text-4xl leading-[1.02] font-extrabold tracking-tight text-foreground sm:text-5xl">
              Create your account.
              <span className="mt-1 block text-brand-orange">
                Start for $0.
              </span>
            </h1>

            <p className="mt-5 max-w-md font-manrope text-sm leading-relaxed text-muted-foreground">
              Every new account starts on the{" "}
              <strong className="text-foreground">Free</strong> plan
              automatically. Pick whether you&apos;re joining as a student or a
              tutor across Bangladesh.
            </p>
          </div>

          <div className="mt-10 border-t border-foreground/20 pt-6">
            <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
              DEFAULT PLAN ON REGISTRATION
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-heading text-2xl font-extrabold text-foreground">
                FREE TIER
              </span>
              <span className="bg-brand-lavender px-2.5 py-1 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-[#141519]">
                PLAN: FREE
              </span>
            </div>
          </div>
        </div>

        {/* Right Sign Up Form */}
        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-4">
          <div className="bg-card p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection ('Student' or 'Tutor') */}
              <div>
                <span className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground">
                  SELECT ROLE
                </span>

                <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {(["Student", "Tutor"] as const).map((roleOption) => {
                    const active = selectedRole === roleOption;
                    return (
                      <label
                        key={roleOption}
                        className={`flex cursor-pointer items-center justify-between border p-4 transition-colors ${
                          active
                            ? "border-[#141519] bg-[#141519] text-[#FAF8F5]"
                            : "border-foreground/20 bg-background text-foreground hover:border-foreground/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="role"
                            value={roleOption}
                            checked={active}
                            onChange={() => setSelectedRole(roleOption)}
                            className="sr-only"
                          />
                          {roleOption === "Student" ? (
                            <GraduationCap
                              className={`h-4 w-4 ${
                                active
                                  ? "text-brand-orange"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ) : (
                            <UserCheck
                              className={`h-4 w-4 ${
                                active
                                  ? "text-brand-orange"
                                  : "text-muted-foreground"
                              }`}
                            />
                          )}
                          <div>
                            <span className="block font-heading text-sm font-extrabold">
                              {roleOption}
                            </span>
                            <span
                              className={`block font-manrope text-[11px] ${
                                active
                                  ? "text-[#FAF8F5]/75"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {roleOption === "Student"
                                ? "Browse & apply to tuitions"
                                : "Post listings & teach"}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`h-3 w-3 border ${
                            active
                              ? "border-brand-orange bg-brand-orange"
                              : "border-foreground/30"
                          }`}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  FULL NAME
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Walid Rahman Rajdee"
                  className="mt-2 w-full border border-foreground/20 bg-background px-4 py-3 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-orange focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="signup-email"
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
                  htmlFor="signup-password"
                  className="block font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-muted-foreground"
                >
                  PASSWORD
                </label>
                <input
                  id="signup-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="mt-2 w-full border border-foreground/20 bg-background px-4 py-3 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-orange focus:outline-none"
                />
              </div>

              {/* Email & Password Submit */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center gap-2 bg-brand-orange px-6 py-4 font-manrope text-xs font-extrabold tracking-[0.15em] uppercase text-[#141519] transition-colors hover:bg-[#ff7242]"
              >
                <span>CREATE ACCOUNT</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>

              {/* Google Sign Up */}
              <div className="border-t border-border/20 pt-5">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="flex w-full cursor-pointer items-center justify-center gap-2.5 border border-foreground/20 bg-background px-5 py-3 font-manrope text-xs font-bold tracking-[0.12em] uppercase text-foreground transition-colors hover:border-foreground/50 hover:bg-muted"
                >
                  <GoogleLogo />
                  <span>CONTINUE WITH GOOGLE</span>
                </button>
              </div>
            </form>

            <p className="mt-6 font-manrope text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-foreground underline decoration-brand-orange underline-offset-4 hover:text-brand-orange"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
