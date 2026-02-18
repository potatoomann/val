import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ACTIVITIES = [
    { id: "demons", label: "Summoning Demons", icon: "😈" },
    { id: "bank", label: "Robbing a Bank", icon: "💰" },
    { id: "notebook", label: "Watching 'The Notebook'", icon: "📓" },
    { id: "tacos", label: "Eating Tacos... in the dark", icon: "🌮" },
];

interface AskActivityProps {
    setChoices: (choices: any) => void;
    choices: any;
}

export default function AskActivity({ setChoices, choices }: AskActivityProps) {
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
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="min-h-screen bg-zinc-900 text-green-500 font-['Press_Start_2P'] flex flex-col items-center justify-center w-full overflow-hidden relative"
        >
            <div className="mb-8">
                <img src="/cat-love.gif" className="w-32 h-32 grayscale opacity-80" alt="Mysterious Cat" />
            </div>

            <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-4">
                <h2 className="text-lg md:text-2xl text-center leading-relaxed">
                    What is your idea of a <span className="text-red-600">Perfect Date</span>?
                </h2>

                <div className="flex flex-col gap-3 md:gap-4 w-full">
                    {ACTIVITIES.map(a => (
                        <motion.button
                            key={a.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, x: 10, backgroundColor: "#1f2937" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                setChoices({ ...choices, activity: a.label });
                                navigate("/doubt");
                            }}
                            className="p-3 md:p-4 border-2 border-zinc-700 hover:border-green-500 transition-colors bg-zinc-800/50 flex items-center gap-4 text-left w-full group"
                        >
                            <span className="text-2xl md:text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{a.icon}</span>
                            <span className="text-xs md:text-base group-hover:text-green-300 transition-colors">{a.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
