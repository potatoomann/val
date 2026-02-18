import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Summon() {
    const navigate = useNavigate();

    useEffect(() => {
        // Play sound effect
        const timerAudio = setTimeout(() => {
            try {
                const boom = new Audio("/sounds/boom.mp3");
                boom.volume = 0.5;
                boom.play().catch(e => console.log("Audio play failed (user interaction needed first?):", e));
            } catch (e) {
                console.log("Audio setup failed", e);
            }
        }, 3500);

        // Navigate to next page
        const timerNav = setTimeout(() => {
            navigate("/proposal");
        }, 4000);

        return () => {
            clearTimeout(timerAudio);
            clearTimeout(timerNav);
        };
    }, [navigate]);

    return (
        <motion.div
            className="summon-page text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="summon-glow"></div>

            <motion.h2
                className="summon-text font-['Press_Start_2P'] text-red-600 mb-4 relative z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
            >
                The spirits have chosen...
            </motion.h2>

            <motion.p
                className="summon-sub font-['Press_Start_2P'] text-red-800 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                Your fate is sealed.
            </motion.p>
        </motion.div>
    );
}
