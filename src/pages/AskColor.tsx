import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const COLORS = [
    { id: "red", label: "Blood Red", class: "bg-red-500", text: "text-red-900" },
    { id: "pink", label: "Soft Pink", class: "bg-pink-300", text: "text-pink-900" },
    { id: "purple", label: "Midnight Purple", class: "bg-purple-600", text: "text-white" },
    { id: "blue", label: "Deep Blue", class: "bg-blue-800", text: "text-white" },
];

interface AskColorProps {
    setChoices: (choices: any) => void;
    choices: any;
}

export default function AskColor({ setChoices, choices }: AskColorProps) {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        },
        exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
    };

    const itemVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen bg-zinc-900 text-green-500 font-['Press_Start_2P'] flex flex-col items-center justify-center w-full overflow-hidden relative px-4"
        >
            <div className="mb-8">
                <img src="/cat-love.gif" className="w-24 h-24 md:w-32 md:h-32 grayscale opacity-80" alt="Mysterious Cat" />
            </div>

            <div className="flex flex-col items-center gap-8 w-full">
                <h2 className="text-lg md:text-xl text-center">Choose the color of your fate...</h2>
                <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                    {COLORS.map(c => (
                        <motion.button
                            key={c.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setChoices({ ...choices, color: c.class });
                                navigate("/activity");
                            }}
                            className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-zinc-700 transition-transform ${c.class}`}
                            title={c.label}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
