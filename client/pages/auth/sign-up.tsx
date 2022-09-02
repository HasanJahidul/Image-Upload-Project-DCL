import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { SignUpDto } from "../../dtos";
import { z, ZodError } from "zod";
import { toastZodErrors } from "../../utils/ZodUtils";
import toast from "react-hot-toast";
import { authService } from "../../service";

const SignUp = () => {
  const router = useRouter();
  const [config, setConfig] = useState<SignUpDto>({
    email: "",
    password: "",
    name: "",
  });
  const handleSignUpClick = async () => {
    try {
      const { email, password, name } = z
        .object({
          email: z.string(),
          password: z.string(),
          name: z.string(),
        })
        .parse(config);
      const res = await authService
        .post(`auth/signup`, {
          email,
          password,
          name,
        })
        .then((res) => {
          console.log("me" + res);

          // toast.success(res.data.message.jso);
          router.push("/auth/sign-in");
        })
        .catch((err) => {
          for (var i in err.response.data.message)
            toast.error(err.response.data.message[i]);
        });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        toastZodErrors(error);
      } else {
        if (typeof error === "string") toast.error(error);
        const errorMessage = z
          .string()
          .safeParse((error as any).response.data.message);
        if (errorMessage.success) {
          toast.error(errorMessage.data);
        }
      }
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center
    bg-gradient-to-br from-purple-700 to-amber-700"
    >
      <div className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5">
        <h1 className="text-center text-3xl">Sign Up</h1>
        <div className="flex flex-col space-y-2">
          <label className="text-sm ">Name</label>
          <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            type="name"
            placeholder="Your Name"
            name="name"
            id="name"
            value={config.name}
            onChange={(e) => setConfig((c) => ({ ...c, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm ">Email</label>
          <input
            className="w-96 px-3 py-2 rounded-md border border-slate-400"
            type="email"
            placeholder="Your Email"
            name="email"
            id="email"
            value={config.email}
            onChange={(e) =>
              setConfig((c) => ({ ...c, email: e.target.value }))
            }
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
            value={config.password}
            onChange={(e) =>
              setConfig((c) => ({ ...c, password: e.target.value }))
            }
          />
        </div>

        <button
          className="w-full px-10 py-2 bg-blue-600 text-white rounded-md
            hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
          type="submit"
          onClick={handleSignUpClick}
        >
          Sign In
        </button>

        <p className="text-right">
          Already have an account?
          <Link href="/auth/login">
            <a className="text-blue-600 text-lg font-bold hover:underline ">
              Login
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
