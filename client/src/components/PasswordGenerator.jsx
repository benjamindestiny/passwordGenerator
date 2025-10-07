import { useState } from "react";

const PasswordGenerator = ({ onGenerate }) => {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPass = "";
    for (let i = 0; i < length; i++) {
      newPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPass);
    onGenerate(newPass);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-center">Password Generator</h3>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label>Length:</label>
        <input
          type="number"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          className="border rounded px-2 py-1 w-20"
        />
      </div>
      <div className="flex justify-between gap-2">
        <button
          onClick={generatePassword}
          className="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 flex-1"
        >
          Generate
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(password)}
          className="bg-gray-300 py-2 px-3 rounded hover:bg-gray-400"
        >
          Copy
        </button>
      </div>
      {password && (
        <p className="mt-3 text-center text-sm text-green-600 break-all">
          {password}
        </p>
      )}
    </div>
  );
};

export default PasswordGenerator;
