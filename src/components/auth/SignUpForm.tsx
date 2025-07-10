import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Label from "../form/Label";
import Select, { SingleValue } from "react-select";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import { appSetting } from "../../../appSetting";

// dropdown custom style
const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f0fdf4" : "white",
    borderColor: state.isFocused ? "#22c55e" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(34, 197, 94, 0.3)" : undefined,
    "&:hover": {
      borderColor: "#22c55e",
    },
    padding: "2px",
    fontSize: "14px",
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 9999,
    fontSize: "14px",
  }),
};

interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

interface OptionType {
  value: number;
  label: string;
}

export default function SignUpForm() {
  const [provinsiOptions, setProvinsiOptions] = useState<OptionType[]>([]);
  const [kotaOptions, setKotaOptions] = useState<OptionType[]>([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState<OptionType | null>(null);
  const [selectedKota, setSelectedKota] = useState<OptionType | null>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState<{
    username: string;
    password: string;
    name: string;
    identity: string;
    phone: string;
    email: string;
    cityId: number | "";
    codeReferral: string;
  }>({
    username: "",
    password: "",
    name: "",
    identity: "",
    phone: "",
    email: "",
    cityId: "",
    codeReferral: "",
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/getAllProvinces")
      .then((res) => res.json())
      .then((response) => {
        const data: Province[] = response.data;
        const formatted = data.map((prov) => ({
          value: prov.id,
          label: prov.name,
        }));
        setProvinsiOptions(formatted);
      })
      .catch((err) => console.error("Error fetching provinsi:", err));
  }, []);

  const handleProvinsiChange = (option: SingleValue<OptionType>) => {
    setSelectedProvinsi(option);
    setSelectedKota(null);
    setFormData((prev) => ({ ...prev, cityId: "" }));

    if (!option) return;

    fetch(`http://localhost:3001/api/getCityByProvinceId/${option.value}`)
      .then((res) => res.json())
      .then((response) => {
        const data: City[] = response.data;
        const formatted = data.map((city) => ({
          value: city.id,
          label: city.name,
        }));
        setKotaOptions(formatted);
      })
      .catch((err) => console.error("Error fetching kota:", err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi wajib
    if (
      !formData.username ||
      !formData.password ||
      !formData.name ||
      !formData.identity ||
      !formData.phone ||
      formData.cityId === ""
    ) {
      alert("Mohon lengkapi semua field yang bertanda * (wajib), termasuk Kota.");
      return;
    }

    if (!isChecked) {
      alert("Silakan setujui Terms and Conditions sebelum melanjutkan.");
      return;
    }

    try {
      const res = await fetch(`${appSetting.apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/verify-email-notice");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar py-10">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Daftar Member
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan detail Anda untuk mendaftar!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label>Username *</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div>
              <Label>Password *</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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
              <Label>Name *</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label>NIK *</Label>
              <Input
                name="identity"
                value={formData.identity}
                onChange={handleChange}
                placeholder="Your identity number"
              />
            </div>
            <div>
              <Label>Phone *</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
              />
            </div>

            {/* Provinsi */}
            <div>
              <Label>Provinsi</Label>
              <Select
                options={provinsiOptions}
                value={selectedProvinsi}
                onChange={handleProvinsiChange}
                styles={customStyles}
                placeholder="Pilih Provinsi"
                classNamePrefix="react-select"
              />
            </div>

            {/* Kota */}
            <div>
              <Label>Kota *</Label>
              <Select
                options={kotaOptions}
                value={selectedKota}
                onChange={(opt) => {
                  setSelectedKota(opt);
                  setFormData((prev) => ({
                    ...prev,
                    cityId: opt ? opt.value : "",
                  }));
                }}
                styles={customStyles}
                placeholder="Pilih Kota"
                isDisabled={!selectedProvinsi}
                classNamePrefix="react-select"
              />
            </div>

            <div>
              <Label>Code Refferal</Label>
              <Input
                name="codeReferral"
                value={formData.codeReferral}
                onChange={handleChange}
                placeholder="Kode Referensi"
              />
            </div>

            <div className="flex items-center gap-3">
              <Checkbox
                className="w-5 h-5"
                checked={isChecked}
                onChange={setIsChecked}
              />
              <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                Dengan mendaftar, Anda setuju pada{" "}
                <span className="text-gray-800 dark:text-white/90">
                  Terms and Conditions
                </span>{" "}
                dan{" "}
                <span className="text-gray-800 dark:text-white">
                  Privacy Policy
                </span>
                .
              </p>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-green-500 shadow-theme-xs hover:bg-green-600"
            >
              Sign Up
            </button>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Sudah punya akun?{" "}
                <Link
                  to="/signin"
                  className="text-green-500 hover:text-green-600 dark:text-green-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
