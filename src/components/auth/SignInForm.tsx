import { useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { appSetting } from "../../../appSetting";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { showLoginSuccess, showLoginError } from "../../utils/swalFire"; // sesuaikan path-nya


interface DecodedUser {
  username: string,
  name: string,
  identity: string,
  phone: string,
  email: string,
  code: string,
  roles_code: string,
  roles_name: string,
  cities_name: string,
  provinces_name: string
  status: string
  iat: number;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${appSetting.apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
    showLoginError(data.message);
    return;
  }

    // Simpan token dan data user
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));

    const decoded: DecodedUser = jwtDecode(data.token);
    console.log("JWT Decoded:", decoded);

    // Tampilkan notifikasi sukses
    showLoginSuccess(decoded.name);

    // Arahkan user berdasarkan role
    switch (decoded.roles_code) {
      case "A-0":
        navigate("/dashboard");
        break;
      case "M-1":
      case "M-2":
      case "M-3":
        navigate("/landing");
        break;
      default:
        alert("Role tidak dikenali. Hubungi admin.");
        break;
    }
  } catch (err) {
    console.error("Login error:", err);
    navigate("/check-verify-email-notice");
  }
};


  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <Label>
                    Username <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  <Button onClick={handleSubmit} type="button" className="w-full bg-green-500 shadow-theme-xs hover:bg-green-600" size="sm">
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-green-500 hover:text-green-600 dark:text-green-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
