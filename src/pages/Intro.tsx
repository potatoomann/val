import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Intro() {
    const navigate = useNavigate();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const [audioStarted, setAudioStarted] = useState(false);

    const handleStart = () => {
        navigate("/name");
    };

    useEffect(() => {
        const startSound = () => {
            if (audioStarted || !audioRef.current) return;

            const audio = audioRef.current;
            audio.volume = 0;
            audio.play().catch(e => console.error("Audio play failed", e));
            setAudioStarted(true);

            let vol = 0;
            const fade = setInterval(() => {
                if (vol < 0.5) {
                    vol += 0.02;
                    audio.volume = Math.min(vol, 0.5);
                } else {
                    clearInterval(fade);
                }
            }, 200);

            // One-time listener
            document.removeEventListener("click", startSound);
            document.removeEventListener("keydown", startSound);
        };

        document.addEventListener("click", startSound);
        document.addEventListener("keydown", startSound);

        // Glitch Effect Interval
        const glitchInterval = setInterval(() => {
            if (titleRef.current) {
                titleRef.current.classList.add("glitch");
                setTimeout(() => {
                    if (titleRef.current) titleRef.current.classList.remove("glitch");
                }, 200);
            }
        }, 5000);

        return () => {
            document.removeEventListener("click", startSound);
            document.removeEventListener("keydown", startSound);
            clearInterval(glitchInterval);
        };
    }, [audioStarted]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-black flex flex-col items-center justify-center text-red-600 font-['Creepster'] tracking-widest overflow-hidden relative"
        >
            <audio ref={audioRef} src="/sounds/horror.mp3" loop />

            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-50 pointer-events-none"></div>

            {/* Horror Effects */}
            <div className="fog"></div>
            <div className="red-glow"></div>

            {/* Flying Bat */}
            <div className="bat-container">
                <svg className="bat" viewBox="0 0 512 512">
                    <path fill="black" d="M256 96c-32 0-64 64-64 64l-64-32-32 64 64 32-64 64 64 32 32-64 32 64 64-32-64-64 64-32-32-64-64 32s-32-64-64-64z" />
                </svg>
            </div>

            {/* CSS Ghost */}
            <div className="ghost"></div>

            <motion.h1
                ref={titleRef}
                className="text-5xl md:text-9xl mb-8 md:mb-12 text-center drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] flicker-text z-20 relative px-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    x: [-2, 2, -2, 2],
                    y: [1, -1, 1]
                }}
                transition={{
                    scale: { duration: 1, ease: "easeOut" },
                    opacity: { duration: 1 },
                    x: { repeat: Infinity, duration: 0.1, delay: 1 },
                    y: { repeat: Infinity, duration: 0.1, delay: 1 }
                }}
            >
                WELCOME<br />MORTAL
            </motion.h1>

            <motion.button
                onClick={handleStart}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                whileHover={{ scale: 1.1, backgroundColor: "#7f1d1d", color: "#ffffff" }}
                whileTap={{ scale: 0.95 }}
                className="text-xl md:text-2xl border-2 md:border-4 border-red-800 px-6 py-3 md:px-8 md:py-4 text-red-600 transition-colors duration-300 font-['Press_Start_2P'] uppercase z-20 bg-black relative"
            >
                Enter If You Dare
            </motion.button>
        </motion.div>
    );
}
