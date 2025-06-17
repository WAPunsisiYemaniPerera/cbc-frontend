import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    function handleRegister() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/", {
            email,
            firstName,
            lastName,
            password,
            phone,
            role
        })
            .then((response) => {
                console.log("Registration successful!", response.data);
                toast.success("Registered successfully");
                navigate("/login");
                setLoading(false);
            })
            .catch((error) => {
                console.log("Registration Failed!!", error.response?.data);
                toast.error(error.response?.data?.message || "Registration failed");
                setLoading(false);
            });
    }

    return (
        <div className="min-h-screen w-full bg-[url('/login-bg.jpg')] bg-cover bg-center flex items-center justify-center px-4 py-10">
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md sm:max-w-lg lg:max-w-xl">
                <h2 className="text-3xl font-bold text-center text-gray-600 mb-6">Create an Account</h2>

                <div className="grid gap-4">
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="First Name"
                    />

                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Last Name"
                    />

                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="email"
                        placeholder="Email"
                    />

                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="text"
                        placeholder="Phone"
                    />

                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        placeholder="Password"
                    />

                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 px-4 border border-white text-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        placeholder="Confirm Password"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full h-12 mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-gray-600 text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="text-green-700 hover:underline ml-1">
                        Login Now
                    </Link>
                </p>
            </div>
        </div>
    );
}
