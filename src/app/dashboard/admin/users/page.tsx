"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { authHeaders, syncJwtToken } from "@/lib/jwt";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface UserRow {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  plan?: string;
}

export default function AdminUsersPage() {
  const { data: session, isPending } = authClient.useSession();
  const email = session?.user?.email ?? "";

  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async (adminEmail: string) => {
    setLoading(true);
    await syncJwtToken(adminEmail);
    const res = await fetch(`${API_URL}/admin/users`, {
      cache: "no-store",
      headers: authHeaders(),
    });
    const data = res.ok ? await res.json() : [];
    setUsers(Array.isArray(data) ? data : (data?.users ?? []));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isPending) return;
    if (!email) {
      setLoading(false);
      return;
    }
    loadUsers(email);
  }, [email, isPending, loadUsers]);

  const handleRoleChange = async (
    id: string,
    role: "student" | "tutor" | "admin",
  ) => {
    if (email) {
      await syncJwtToken(email);
    }

    const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
      method: "PATCH",
      headers: authHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      toast.error("Failed to update role");
      return;
    }

    toast.success(`Role updated to ${role}`);
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
        User Management
      </h1>

      {isPending || loading ? (
        <p className="mt-6 font-manrope text-sm text-muted-foreground">
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-card p-8 text-center">
          <p className="font-heading text-xl font-extrabold">No users found</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {users.map((user) => {
            const currentRole = (user.role || "student").toLowerCase();
            return (
              <div
                key={user._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-card p-5"
              >
                <div>
                  <p className="font-heading text-base font-extrabold">
                    {user.name || "Unnamed User"}
                  </p>
                  <p className="font-manrope text-xs text-muted-foreground">
                    {user.email} · Plan: {(user.plan || "free").toUpperCase()}
                  </p>
                </div>

                <select
                  value={currentRole}
                  onChange={(e) =>
                    handleRoleChange(
                      user._id,
                      e.target.value as "student" | "tutor" | "admin",
                    )
                  }
                  className="rounded-xl bg-surface-warm px-3.5 py-2 font-manrope text-xs font-extrabold uppercase focus:ring-2 focus:ring-brand-orange focus:outline-none"
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
