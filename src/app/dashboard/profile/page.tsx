"use client";

import React, { useEffect, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Shield,
  Sparkles,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY ?? "";

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("student");
  const [plan, setPlan] = useState("free");

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoadingProfile(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        const res = await fetch(
          `${API_URL}/users/profile/${encodeURIComponent(email)}`,
          { cache: "no-store" },
        );
        const data = res.ok ? await res.json() : null;

        setName(data?.name || session?.user?.name || "");
        setPhone(data?.phone || "");
        setBio(data?.bio || "");
        setImage(data?.image || session?.user?.image || "");
        setRole(
          String(
            data?.role ||
              (session?.user as { role?: string } | undefined)?.role ||
              "student",
          ).toLowerCase(),
        );
        setPlan(
          String(
            data?.plan ||
              (session?.user as { plan?: string } | undefined)?.plan ||
              "free",
          ).toLowerCase(),
        );
      } catch {
        setName(session?.user?.name || "");
        setImage(session?.user?.image || "");
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [email, isPending, session?.user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, or WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    if (!IMGBB_API_KEY) {
      toast.error("NEXT_PUBLIC_IMGBB_API_KEY is missing in .env.local");
      return;
    }

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const result = await res.json();
      if (!res.ok || !result?.data?.display_url) {
        throw new Error(result?.error?.message || "ImgBB upload failed");
      }

      setImage(result.data.display_url);
      toast.success("Photo uploaded! Click Save Changes to apply.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to upload image",
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!name.trim()) {
      toast.error("Full name is required.");
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(
        `${API_URL}/users/profile/${encodeURIComponent(email)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            bio: bio.trim(),
            image: image.trim(),
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to update profile");
      }

      // Sync BetterAuth session so Navbar avatar & name update right away
      await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not save profile changes",
      );
    } finally {
      setSaving(false);
    }
  };

  if (isPending || loadingProfile) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 animate-pulse rounded-xl bg-card" />
        <div className="h-96 animate-pulse rounded-2xl bg-card" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <p className="font-manrope text-[10px] font-extrabold tracking-[0.16em] uppercase text-brand-orange">
          ACCOUNT SETTINGS
        </p>
        <h1 className="mt-1 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
          Update Profile
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Card: Live Avatar & Role/Plan Summary */}
        <aside className="flex flex-col items-center rounded-2xl bg-card p-6 text-center lg:col-span-4">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-surface-warm">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={name || "Profile picture"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-brand-orange" />
              )}
            </div>

            <label
              htmlFor="profile-photo-upload"
              title="Upload new photo"
              className="absolute -right-2 -bottom-2 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-brand-orange text-[#141519] shadow-sm transition-transform hover:scale-105"
            >
              {uploadingImage ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </label>
            <input
              id="profile-photo-upload"
              type="file"
              accept="image/*"
              disabled={uploadingImage}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <h2 className="mt-4 font-heading text-xl font-extrabold text-foreground">
            {name || "Your Name"}
          </h2>
          <p className="mt-0.5 break-all font-manrope text-xs text-muted-foreground">
            {email}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-surface-warm px-3 py-1.5 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase text-foreground">
              <Shield className="h-3 w-3 text-brand-orange" />
              <span>{role}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 font-manrope text-[10px] font-extrabold tracking-[0.14em] uppercase ${
                plan === "pro"
                  ? "bg-brand-orange text-[#141519]"
                  : "bg-surface-warm text-foreground"
              }`}
            >
              {plan === "pro" && <Sparkles className="h-3 w-3" />}
              <span>{plan === "pro" ? "PRO PLAN" : "FREE PLAN"}</span>
            </span>
          </div>

          <p className="mt-5 font-manrope text-[11px] leading-relaxed text-muted-foreground">
            Click the camera icon to upload a PNG, JPG, or WEBP photo directly
            via ImgBB (max 5MB).
          </p>
        </aside>

        {/* Right Card: Profile Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-card p-6 sm:p-8 lg:col-span-8"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="profile-name"
              className="block font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-foreground"
            >
              FULL NAME *
            </label>
            <div className="relative mt-2">
              <User className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="profile-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl bg-surface-warm py-3 pr-4 pl-11 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Read-only Email */}
          <div>
            <label
              htmlFor="profile-email"
              className="block font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-muted-foreground"
            >
              EMAIL ADDRESS (READ-ONLY)
            </label>
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="profile-email"
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl bg-surface-warm/60 py-3 pr-4 pl-11 font-manrope text-sm text-muted-foreground"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="profile-phone"
              className="block font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-foreground"
            >
              PHONE NUMBER
            </label>
            <div className="relative mt-2">
              <Phone className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="profile-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +880 17XX-XXXXXX"
                className="w-full rounded-xl bg-surface-warm py-3 pr-4 pl-11 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="profile-bio"
              className="block font-manrope text-[11px] font-extrabold tracking-[0.14em] uppercase text-foreground"
            >
              BIO / ACADEMIC SUMMARY
            </label>
            <textarea
              id="profile-bio"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={
                role === "tutor"
                  ? "Share your teaching experience, university background, and core subjects..."
                  : "Tell tutors about your current class/grade, learning goals, and preferred schedule..."
              }
              className="mt-2 w-full rounded-xl bg-surface-warm p-4 font-manrope text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-brand-orange focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 font-manrope text-xs font-extrabold tracking-[0.14em] uppercase text-[#141519] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>SAVING CHANGES...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>SAVE CHANGES</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
