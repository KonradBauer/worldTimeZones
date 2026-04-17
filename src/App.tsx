import { AnalogClock } from "./components/AnalogClock.tsx";

function App() {
  return (
    <div>
      <AnalogClock size="small" />
      <AnalogClock />
      <AnalogClock size="small" />
    </div>
  );
}

export default App;
