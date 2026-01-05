/*
 * Copyright [ 2020 - 2024 ] [Matthew Buckton]
 * Copyright [ 2024 - 2026 ] [Maps Messaging B.V.]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/lib/auth";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

const fallback = "/dashboard" as const;

interface LoginSearchParams {
  redirect: string;
}

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): LoginSearchParams => ({
    redirect: (search.redirect as string) || fallback,
  }),
  beforeLoad: ({ search }) => {
    const { isAuthenticated } = authService;
    if (isAuthenticated()) {
      throw redirect({ to: search.redirect });
    }
  },
});

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { redirect } = Route.useSearch();

  useEffect(() => {
    if (isAuthenticated()) {
      void router.invalidate();
      router.history.push(redirect);
    }
  }, [isAuthenticated, router, redirect]);

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Logo className="w-[300px]" />
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
