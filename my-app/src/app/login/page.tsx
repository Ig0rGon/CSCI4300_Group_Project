"use client";
import Login from "../components/Login";
import { signIn } from "next-auth/react";

export default function LoginPage() {

  return (
   <div>
    <Login />
   </div>
  );
}