import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import PasswordGenerator from "../components/PasswordGenerator";
import { Trash2, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // fetch passwords from backend
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await API.get("/passwords");
        setPasswords(res.data);
      } catch (err) {
        setMsg("Failed to load passwords");
      }
    };
    fetchPasswords();
  }, []);

  // add new password
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!site || !username || !password) {
      setMsg("All fields are required");
      return;
    }
    try {
      const res = await API.post("/passwords", { site, username, password });
      setPasswords([...passwords, res.data]);
      setSite("");
      setUsername("");
      setPassword("");
      setMsg("Password added successfully!");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setMsg("Error saving password");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/passwords/${id}`);
      setPasswords(passwords.filter((p) => p._id !== id));
    } catch (err) {
      setMsg("Error deleting password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔐 Password Vault</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Add new password */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Add New Password</h2>
          <form onSubmit={handleAdd} className="space-y-3">
            <input
              type="text"
              placeholder="Website / App"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Username / Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Save Password
            </button>
          </form>

          {msg && (
            <p className="text-center mt-3 text-sm text-blue-600 font-semibold">
              {msg}
            </p>
          )}

          <div className="mt-6">
            <PasswordGenerator onGenerate={setPassword} />
          </div>
        </div>

        {/* Right side - List passwords */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3">Saved Passwords</h2>
          {passwords.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              No saved passwords yet.
            </p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-3 py-2 text-left">Site</th>
                  <th className="border px-3 py-2 text-left">Username</th>
                  <th className="border px-3 py-2 text-left">Password</th>
                  <th className="border px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwords.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{p.site}</td>
                    <td className="border px-3 py-2">{p.username}</td>
                    <td className="border px-3 py-2">{p.password}</td>
                    <td className="border px-3 py-2 text-center">
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
