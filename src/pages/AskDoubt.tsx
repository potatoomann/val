import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AskDoubt() {
    const navigate = useNavigate();
    const [runAwayCount, setRunAwayCount] = useState(0);

    const handleRunAway = (e: React.MouseEvent) => {
        // Simple "run away" logic by random translation, lightweight version of the No button
        const btn = e.target as HTMLButtonElement;
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        setRunAwayCount(c => c + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, zoom: 0.8 }}
            animate={{ opacity: 1, zoom: 1 }}
            exit={{ opacity: 0, zoom: 1.2 }}
            className="min-h-screen bg-black text-red-600 font-['Creepster'] flex flex-col items-center justify-center w-full overflow-hidden relative p-4"
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 pointer-events-none"></div>

            <motion.h1
                className="text-4xl md:text-7xl text-center mb-8 md:mb-12 tracking-wider z-10 leading-tight"
                animate={{
                    textShadow: ["0 0 5px red", "0 0 20px red", "0 0 5px red"],
                    scale: [1, 1.02, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                WAIT... <br /> ARE YOU SURE??
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center z-10 font-['Press_Start_2P'] w-full justify-center">
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#b91c1c", color: "white" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/summon")}
                    className="px-6 py-3 md:px-8 md:py-4 border-4 border-red-800 text-red-600 text-lg md:text-2xl bg-black transition-colors"
                >
                    YES, I'M BRAVE!
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/summon")}
                    className="px-4 py-2 md:px-6 md:py-3 border-2 border-zinc-700 text-zinc-500 text-xs md:text-base hover:text-zinc-300"
                >
                    I have no choice...
                </motion.button>
            </div>

            {/* Floating 'Run Away' text that is hard to click optionally, 
                or just a button that moves away if they try to click it 
            */}
            <motion.button
                onMouseEnter={handleRunAway}
                onClick={handleRunAway}
                className="absolute bottom-20 text-xs text-zinc-800 hover:text-red-900 transition-colors cursor-pointer"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                {runAwayCount > 2 ? "THERE IS NO ESCAPE" : "run away..."}
            </motion.button>

        </motion.div>
    );
}
