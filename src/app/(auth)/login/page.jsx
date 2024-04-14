"use client";
import { useGlobalContext } from "../../../Hooks/globalStates";
import Button from "../../../component/Reusablecomponents/Button";
import Input from "../../../component/Reusablecomponents/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLoggername, setAuth } from "../../../helpers/token";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const { email, password, setEmail, setPassword, loading, setLoading } =
    useGlobalContext();
  const router = useRouter();
  const username = getLoggername();
  async function loginHandler(e) {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      const response = await fetch("/api/existingUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(response, data, "resp");
      if (response.ok) {
        setAuth(data.user.name);
        toast.success("welcome back" + "  " + data.user.name);
        router.push("/");
      } else {
        toast.error(data.message);
        router.push("/register");
      }
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }

  useLayoutEffect(() => {
    if (username) {
      router.push("/");
    }
  }, []);
  return (
    <div className=" h-screen flex justify-center pt-24">
      <div className="w-[576px] h-[550px] flex flex-col  items-center gap-6 border border-solid border-[#c7c7c7] rounded-xl py-8">
        <h1 className="text-2xl font-bold ">Login</h1>
        <div>
          <h2 className="text-xl font-bold tracking-wider">
            Welcome back to ECOMMERCE
          </h2>
          <p className="font-semibold text-md text-center">
            The next gen bussiness marketplace
          </p>
        </div>
        <form action="" className="flex flex-col gap-4">
          <Input label="Email" type="email" val={email} setVal={setEmail} />
          <Input
            label="Password"
            type="password"
            val={password}
            setVal={setPassword}
          />
          <Button
            type={loading ? "Please wait..." : "LOGIN"}
            onClick={loginHandler}
          />
          <hr className=" w-full mt-4" />
        </form>
        <p>
          Dont you Have an Account?&nbsp;&nbsp;
          <Link href="/register">
            <span className="font-bold cursor-pointer">SIGN UP</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
