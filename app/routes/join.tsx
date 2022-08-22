import type { ActionArgs, LoaderArgs, MetaFunction, } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useRef, useEffect } from "react";

import { getUserId, createUserSession } from "~/session.server";

import { createUser, getUserByEmail, getUserByDisplay } from "~/lib/auth";
import { safeRedirect, validateEmail } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const display = formData.get("display");
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null, display: null, name: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required", display: null, name: null } },
      { status: 400 }
    );
  }

  if (typeof name !== "string" || name.length === 0) {
    return json(
      { errors: { email: null, name: "Name is required", display: null, password: null } },
      { status: 400 }
    );
  }


  if (typeof display !== "string" || display.length === 0) {
    return json(
      { errors: { email: null, display: "Display is required", name: null, password: null } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short", display: null, name: null } },
      { status: 400 }
    );
  }

  if (name.length < 2) {
    return json(
      { errors: { email: null, name: "Name is too short", display: null, password: null } },
      { status: 400 }
    );
  }

  if (display.length < 2) {
    return json(
      { errors: { email: null, display: "Display name is too short", name: null, password: null } },
      { status: 400 }
    );
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
          display: null,
          name: null
        },
      },
      { status: 400 }
    );
  }

  const existingDisplay = await getUserByDisplay(display);
  if (existingDisplay) {
    return json(
      {
        errors: {
          display: "This display name is already in use",
          password: null,
          email: null,
          name: null
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(name, display, email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const nameRef = useRef<HTMLInputElement>(null);
  const displayRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.display) {
      displayRef.current?.focus();
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                ref={nameRef}
                id="name"
                required
                autoFocus={true}
                name="name"
                type="name"
                autoComplete="name"
                aria-invalid={actionData?.errors?.name ? true : undefined}
                aria-describedby="name-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.name && (
                <div className="pt-1 text-red-700" id="name-error">
                  {actionData.errors.name}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="display"
              className="block text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <div className="mt-1">
              <input
                ref={displayRef}
                id="display"
                required
                autoFocus={true}
                name="display"
                type="display"
                autoComplete="display"
                aria-invalid={actionData?.errors?.display ? true : undefined}
                aria-describedby="display-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.display && (
                <div className="pt-1 text-red-700" id="display-error">
                  {actionData.errors.display}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button
            type="submit"
            className="w-full rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create Account
          </button>
          <div className="flex items-center justify-center">
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                className="text-blue-500 underline"
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
