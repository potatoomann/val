import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface AskNameProps {
    setChoices: (choices: any) => void;
    choices: any;
}

export default function AskName({ setChoices, choices }: AskNameProps) {
    const navigate = useNavigate();
    const [name, setName] = useState(choices.name || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            setChoices({ ...choices, name });
            navigate("/color");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-zinc-900 text-green-500 font-['Press_Start_2P'] flex flex-col items-center justify-center w-full overflow-hidden relative px-4"
        >
            <div className="mb-8">
                <motion.img
                    src="/cat-love.gif"
                    className="w-24 h-24 md:w-32 md:h-32 grayscale opacity-80"
                    alt="Mysterious Cat"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ delay: 0.2 }}
                />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full">
                <motion.h2
                    className="text-lg md:text-2xl text-center leading-loose"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Who summons the spirits? <br />
                    <span className="text-xs md:text-sm text-zinc-500">(What is your name?)</span>
                </motion.h2>

                <motion.input
                    type="text"
                    className="bg-zinc-800 border-b-2 border-green-500 text-center text-xl md:text-2xl py-2 outline-none w-full max-w-md focus:border-green-300 transition-colors"
                    placeholder="Your Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />

                <motion.button
                    type="submit"
                    disabled={!name}
                    className="mt-4 px-6 py-2 border-2 border-green-700 hover:bg-green-900 disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    CONFIRM
                </motion.button>
            </form>
        </motion.div>
    );
}
