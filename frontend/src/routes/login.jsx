import { Icon } from "@iconify/react";
import TextInput from "../components/shared/TextInput";
import PasswordInput from "../components/shared/passwordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { makeUnauthenticatedPOSTRequest } from "../utils/ServerHelper";
import { useCookies } from "react-cookie";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      // alert("Success");
      navigate("/home");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="flex justify-center p-3 border-b border-solid border-gray-400 w-full">
        <Icon icon="logos:spotify" width="100" />
      </div>
      <div className="w-1/4 py-5 flex items-center justify-center flex-col">
        <div className="font-bold mb-12">To Continue, Log in to Spotanna</div>
        <TextInput
          placeholder="Email address or username"
          label="Email address or username"
          className="my-2"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          value={password}
          setValue={setPassword}
        />
        <div className="w-full flex items-start justify-end my-6 ">
          <button
            className="bg-green-500 text-sm p-2 px-6 rounded-full font-semibold "
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOG IN
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300 "></div>
        <div className="my-5 font-semibold text-xl">Don't have an account</div>
        <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-2 rounded-full font-bold">
          <Link to="/signup">SIGN UP FOR SPOTANNA</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
