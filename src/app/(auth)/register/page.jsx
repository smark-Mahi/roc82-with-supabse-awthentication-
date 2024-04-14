"use client";
import OTP from "../../../component/OTP";
import Button from "../../../component/Reusablecomponents/Button";
import Input from "../../../component/Reusablecomponents/Input";
import { getLoggername, setAuth } from "../../../helpers/token";
import Link from "next/link";
import { useGlobalContext } from "../../../Hooks/globalStates";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Register = () => {
  const userName = getLoggername();
  const router = useRouter();
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    loading,
    setLoading,
  } = useGlobalContext();

  async function createUserHandler(e) {
    e.preventDefault();
    if (name && email && password && password.length >= 8) {
      setLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(response, data, "resp");
      if (response.ok) {
        console.log("success");
      } else {
        toast.error(data.message);
      }
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setAuth(data.user.name);
    }
  }

  useLayoutEffect(() => {
    if (userName) {
      router.push("/");
    }
  }, []);

  return (
    <>
      {!userName ? (
        <div className=" h-screen flex justify-center pt-24">
          <div className="w-[576px] h-[550px] flex flex-col  items-center gap-6 border border-solid border-[#c7c7c7] rounded-xl py-8">
            <h1 className="text-2xl font-bold ">Create your account</h1>
            <form action="" className="flex flex-col gap-4">
              <Input label="Name" type="text" val={name} setVal={setName} />
              <Input label="Email" type="email" val={email} setVal={setEmail} />
              <Input
                label="Password"
                type="password"
                val={password}
                setVal={setPassword}
              />
              <Button
                type={loading ? "Please wait..." : "CREATE ACCOUNT"}
                onClick={createUserHandler}
              />
            </form>
            <p>
              Have an Account?&nbsp;&nbsp;
              <Link href="/login">
                <span className="font-bold cursor-pointer">LOGIN</span>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <OTP />
      )}
    </>
  );
};

export default Register;
