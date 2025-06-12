import FootballFieldSimulator from "./components/football-field-simulator"

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">Football Field Simulator</h1>
        <FootballFieldSimulator />
      </div>
    </main>
  )
}
