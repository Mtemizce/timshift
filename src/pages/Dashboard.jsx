export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Hoş geldin, {admin?.name} 👋</h1>
      <p className="text-gray-600">Bugün neler yapmak istersin?</p>
    </div>
  );
}
