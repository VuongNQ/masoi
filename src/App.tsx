import RoomControls from "./components/RoomControls";
import "./index.css"; // Assuming you have some global styles

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Ma Sói - Werewolf Game
          </h1>
        </header>

        <main>
          <RoomControls />
        </main>
      </div>
    </div>
  );
}

export default App;
