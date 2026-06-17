import React from "react";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {

    const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-20 min-h-[85vh] flex items-center">

      <div className="grid lg:grid-cols-2 gap-30 items-center w-full">

        <div>
            <motion.p 
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0}}
            className="text-cyan-400 font-medium">
              UI Arena
            </motion.p>

            <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.1}}
            className="mt-4 text-5xl sm:text-7xl text-slate-100 font-bold leading-tight">
              Build interfaces.
              <br />
              Not tutorials.
            </motion.h1>

            <motion.p
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6,delay:0.2}}
            className="mt-6 text-slate-400 text-lg max-w-xl">
                    Recreate real UI components, complete challenges and improve through hands-on frontend practice.
            </motion.p>

            <motion.button
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.3}}
            onClick={()=>navigate('/challenges')}
            className="group mt-8 bg-cyan-500 text-slate-100 hover:bg-cyan-800 cursor-pointer text-2xl transition-all duration-300 px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
              Start Building
            </motion.button>

        </div>

        <img src={assets.hero} className="hidden md:block"/>
        

      </div>

    </section>
  );
};

export default Hero;