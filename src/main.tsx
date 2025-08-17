import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("main.tsx is executing");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (!rootElement) {
  console.error("Root element not found!");
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
console.log("React root created");

root.render(<App />);
console.log("Render called");
