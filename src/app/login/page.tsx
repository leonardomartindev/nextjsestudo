"use client";

import { login } from "../actions/login";
import { useActionState } from "react";
import style from "../signup/style.module.css";
import Link from "next/link";

export default function SignUpForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <>
      <form action={action}>
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

        <button disabled={pending}>{pending ? "Enviando..." : "Login"}</button>
      </form>
      <Link href={"/signup"}>Não tem login? Cadastre-se aqui</Link>
    </>
  );
}
