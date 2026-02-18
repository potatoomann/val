import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Intro from "./pages/Intro";
import AskName from "./pages/AskName";
import AskColor from "./pages/AskColor";
import AskActivity from "./pages/AskActivity";
import AskDoubt from "./pages/AskDoubt";
import Summon from "./pages/Summon";
import Proposal from "./pages/Proposal";

// --- Types ---
export interface UserChoices {
  name: string;
  songTitle: string; // Keeping these for type compatibility, though unused now
  songLink: string;
  isSpotify: boolean;
  color: string;
  food: string; // Keeping for compatibility
  activity: string;
}

export default function App() {
  const location = useLocation();
  const [choices, setChoices] = useState<UserChoices>({
    name: "",
    songTitle: "",
    songLink: "",
    isSpotify: false,
    color: "bg-pink-200",
    food: "",
    activity: "",
  });

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Intro />} />
        <Route path="/name" element={<AskName setChoices={setChoices} choices={choices} />} />
        <Route path="/color" element={<AskColor setChoices={setChoices} choices={choices} />} />
        <Route path="/activity" element={<AskActivity setChoices={setChoices} choices={choices} />} />
        <Route path="/doubt" element={<AskDoubt />} />
        <Route path="/summon" element={<Summon />} />
        <Route path="/proposal" element={<Proposal choices={choices} />} />
      </Routes>
    </AnimatePresence>
  );
}
