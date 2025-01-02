'use client';

import React, { useTransition } from "react";
import { logout } from "../actions/auth";
import Link from "next/link";

export default function Navbar({ user, userRole }) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout(); 
    });
  };

  return (
    <nav style={styles.navbar}>
    <Link href={"/"} style={styles.title}>Meu App</Link>
    {userRole === "admin" && (
      <Link href="/dashboard" style={styles.link}>
        Admin Panel
      </Link>
    )}
    {user && <button style={styles.button} onClick={handleLogout} disabled={isPending}>
      {isPending ? "Saindo..." : "Sair"}
    </button>}
  </nav>
  );
}

const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "#fff",
    },
    title: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#fff"
    },
    button: {
      backgroundColor: "#f00",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: "5px",
      cursor: "pointer",
      opacity: 0.8,
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      marginRight: "15px",
    },
  };
  
