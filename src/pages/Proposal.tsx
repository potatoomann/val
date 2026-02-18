import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

interface ProposalProps {
    choices: any;
}

export default function Proposal({ choices }: ProposalProps) {
    const [noCount, setNoCount] = useState(0);
    const [yesPressed, setYesPressed] = useState(false);
    const yesButtonSize = noCount * 20 + 16;
    const audioRef = useRef<HTMLAudioElement | null>(null);



    const spawnHeart = () => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerText = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    };

    const handleYes = () => {
        setYesPressed(true);
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
        });

        // Spawn hearts
        const interval = setInterval(spawnHeart, 300);
        setTimeout(() => clearInterval(interval), 5000); // Stop spawning after 5s

        // Play Audio with Fade In
        if (!choices.isSpotify && audioRef.current) {
            const audio = audioRef.current;
            audio.volume = 0;
            audio.currentTime = 0; // Play from start (user provided edited file)
            audio.play().catch(e => console.log("Audio play failed", e));

            let vol = 0;
            const fade = setInterval(() => {
                if (vol < 0.6) {
                    vol += 0.05; // Fade in slightly faster
                    audio.volume = Math.min(vol, 1);
                } else {
                    clearInterval(fade);
                }
            }, 200);
        }
    };

    const shake = () => {
        document.body.style.animation = "shake 0.3s";
        setTimeout(() => {
            document.body.style.animation = "";
        }, 300);
    };

    useEffect(() => {
        // Cleanup hearts on unmount
        return () => {
            document.querySelectorAll('.heart').forEach(e => e.remove());
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`flex flex-col items-center justify-center min-h-screen w-full transition-colors duration-1000 ${choices.color} ${choices.color.includes('red') || choices.color.includes('purple') ? 'text-white' : 'text-zinc-900'}`}
        >
            {/* Audio Element for non-Spotify songs */}
            {!choices.isSpotify && (
                <audio ref={audioRef} src={choices.songLink} loop />
            )}

            {yesPressed ? (
                <>
                    <motion.img
                        src="/flower-cat.jpg"
                        alt="flower cat love"
                        className="rounded-lg shadow-2xl mb-6 w-full max-w-xs md:max-w-md h-auto border-4 border-white"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <motion.div
                        className="text-3xl md:text-6xl font-bold my-4 text-center leading-tight font-['Creepster'] drop-shadow-md px-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        YAY!!! <br /> I LOVE YOU {choices.name.toUpperCase()}!! ❤️
                    </motion.div>

                    <motion.div
                        className="text-lg md:text-2xl text-center font-['Press_Start_2P'] text-white leading-loose mt-4 md:mt-8 tracking-wider bg-black/40 p-4 md:p-6 rounded-xl backdrop-blur-sm border-2 border-white/20 shadow-xl max-w-md md:max-w-2xl mx-auto w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, staggerChildren: 3.5 }}
                    >
                        {[
                            "I love you, baby, and if it's quite alright",
                            "I need you, baby, to warm these lonely nights",
                            "I love you, baby, trust in me when I say",
                            "Oh pretty baby, don't let me down, I pray",
                            "Oh pretty baby, now that I have you, stay",
                            "And let me love you, baby, let me love you"
                        ].map((line, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-4 text-pink-200 drop-shadow-lg"
                            >
                                {line}
                            </motion.p>
                        ))}
                    </motion.div>

                    <audio autoPlay src="/iloveyoubaby.mp3" loop />

                </>
            ) : (
                <>
                    <motion.img
                        src="/cat-love.gif"
                        alt="cute cat"
                        className="rounded-lg shadow-2xl mb-8 w-full max-w-md h-auto border-4 border-white"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    />

                    <motion.h1
                        className="text-3xl md:text-6xl text-center font-bold my-4 leading-tight font-['Creepster'] drop-shadow-md px-4"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Will you be my Valentine, <span className="underline decoration-wavy">{choices.name}</span>?
                    </motion.h1>

                    <div className="flex flex-wrap flex-col md:flex-row gap-6 items-center justify-center mt-8 md:mt-12 w-full px-4">
                        <motion.button
                            className={`rounded-full bg-green-500 hover:bg-green-600 font-bold text-white px-8 py-4 md:px-10 md:py-5 shadow-xl active:scale-95 text-xl md:text-2xl`}
                            style={{ fontSize: yesButtonSize }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleYes}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            YES
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                setNoCount(noCount + 1);
                                shake();
                            }}
                            className="rounded-full bg-red-500 hover:bg-red-600 font-bold text-white px-8 py-4 md:px-10 md:py-5 shadow-xl active:scale-95 text-lg md:text-xl"
                            animate={{
                                y: [0, -15, 0],
                                x: [0, 5, -5, 3, -3, 0],
                                rotate: [0, 3, -3, 2, -2, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {noCount === 0 ? "No" : "Please? 🥺"}
                        </motion.button>
                    </div>
                </>
            )}
        </motion.div>
    );
}
