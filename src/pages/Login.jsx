import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hata, setHata] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHata("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setHata(data.error || "Giriş başarısız");
      } else {
        localStorage.setItem("admin", JSON.stringify(data));
        onLogin(data); // App.jsx → setAdmin()
        navigate("/dashboard", { replace: true }); // ✅ yönlendirme
      }
    } catch (err) {
      console.error("Login hatası:", err);
      setHata("Bağlantı hatası");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Yönetici Girişi
        </h2>

        {hata && <div className="text-red-500 mb-2">{hata}</div>}

        <input
          type="text"
          placeholder="Kullanıcı adı"
          className="w-full border p-2 mb-2 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          className="w-full border p-2 mb-4 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
