"use client";

import { signup } from "../actions/signup";
import { useActionState } from "react";
import style from "./style.module.css";
import Link from "next/link";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <>
      <form action={action}>
        <fieldset>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" />
          {state?.errors?.name && (
            <p className={style.errorMessage}>{state.errors.name}</p>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" />
          {state?.errors?.email && (
            <p className={style.errorMessage}>{state.errors.email}</p>
          )}
        </fieldset>
        <fieldset>
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" name="password" />
          {state?.errors?.password && (
            <p className={style.errorMessage}>{state.errors.password}</p>
          )}
        </fieldset>

        <button disabled={pending}>
          {pending ? "Submitting..." : "Sign up"}
        </button>
      </form>
      <Link href={"/login"}>Já tem uma conta? Faça login</Link>
    </>
  );
}
