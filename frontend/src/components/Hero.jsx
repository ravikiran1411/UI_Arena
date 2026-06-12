import React from "react";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { motion } from 'framer-motion'
import { useNavigate } from "react-router-dom";

const Hero = () => {

    const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-20 min-h-[85vh] flex items-center">

      <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

        <div>

            <motion.p 
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0}}
            className="text-rose-500 font-medium">
                UI Arena
            </motion.p>

            <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.1}}
            className="mt-4 text-5xl sm:text-7xl font-bold leading-tight">
                Build interfaces.
                <br />
                Not tutorials.
            </motion.h1>

            <motion.p
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.6,delay:0.2}}
            className="mt-6 text-neutral-400 text-lg max-w-xl">
                    Recreate real UI components, complete challenges and improve through hands-on frontend practice.
            </motion.p>

            <motion.button
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5,delay:0.3}}
            onClick={()=>navigate('/challenges')}
            className="group mt-8 bg-rose-500 hover:bg-rose-600 transition-all duration-300 px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
                Start Building
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300"/>
            </motion.button>

        </div>


        <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center"
        >

          <div className="-rotate-1 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 w-full max-w-md shadow-xl">

            <div className="flex justify-between items-start">

              <div>
                <h3 className="text-2xl font-semibold">
                  Responsive Navbar
                </h3>

                <p className="text-neutral-500 mt-1">
                  Easy * 342 Solved
                </p>
              </div>

              <span className="text-emerald-500 text-sm font-medium">
                Active
              </span>

            </div>

            <div className="mt-8">

              <p className="text-neutral-300 font-medium mb-4">
                Requirements
              </p>

              <div className="space-y-4">

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                  <span className="text-neutral-400">
                    Brand Logo
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Circle
                    size={18}
                    className="text-neutral-600"
                  />
                  <span className="text-neutral-400">
                    Mobile Menu
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Circle
                    size={18}
                    className="text-neutral-600"
                  />
                  <span className="text-neutral-400">
                    Responsive Layout
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500"
                  />
                  <span className="text-neutral-400">
                    Navigation Links
                  </span>
                </div>

              </div>

            </div>

            <div className="mt-8 pt-5 border-t border-neutral-800">

              <p className="text-neutral-500 text-sm">
                Last submission
              </p>

              <p className="mt-1 text-neutral-300">
                2 mins ago
              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;