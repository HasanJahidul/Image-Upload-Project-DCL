import React from "react";
import useInput from "../../hooks/useInput";
import { authService } from "../../service";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
} from "../../consts";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SignInPage = () => {
  const { user } = useAuth();
  const emailInputController = useInput();
  const passwordInputController = useInput();
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const { data: response } = await authService.post(`auth/sign-in`, {
        email: emailInputController.value,
        password: passwordInputController.value,
      });
      setCookie(ACCESS_TOKEN_COOKIE_KEY, response.access_token);
      setCookie(REFRESH_TOKEN_COOKIE_KEY, response.refresh_token);
      console.log({ response });
      toast.success("Logged in successful");
      router.replace(`/dashboard`);
    } catch (error) {
      console.log("sign-in : ", error);
      toast.error("Invalid email or Password");
    }
  };
  if (user === undefined) return <h1>Loading...</h1>;
  if (!!user) router.replace(`/dashboard`);
  if (user === null)
    return (
      <div
        className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-purple-700 to-amber-700"
      >
        <form
          className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
          action=""
        >
          <h1 className="text-center text-3xl">Log In</h1>
          <div className="flex flex-col space-y-2">
            <label className="text-sm ">Email</label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="email"
              placeholder="Your Email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm ">Password</label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="password"
              placeholder="Your Password"
              name="password"
              id="password"
            />
          </div>

          <button
            className="w-full px-10 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
            type="submit"
          >
            Sign In
          </button>

          <p className="text-right">
            dont have an account?
            <Link href="/auth/sign-up">
              <a className="text-blue-600 text-lg font-bold hover:underline ">
                Sign Up
              </a>
            </Link>
          </p>
        </form>
      </div>
    );
};

export default SignInPage;
