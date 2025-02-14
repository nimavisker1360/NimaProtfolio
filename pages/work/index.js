// components
import WorkSlider from "../../components/WorkSlider";
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import ParticlesContainer from "../../components/ParticlesContainer";

const Work = () => {
  return (
    <div className="h-full bg-primary/30 py-36 flex items-center">
      <Circles />
      <ParticlesContainer />
      <div className="container mx-auto text-sm  ">
        <div className="flex flex-col xl:flex-row gap-x-8 ">
          {/* text */}
          <div className="text-left pt-[120px] flex xl:w-[30vw] xl:pt-0  flex-col lg:text-left  mb-4">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-12"
            >
              My work <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              • Implemented websites, and landing pages 𝐟𝐫𝐨𝐦 𝐜𝐨𝐧𝐜𝐞𝐩𝐭 𝐭𝐨
              𝐝𝐞𝐩𝐥𝐨𝐲𝐦𝐞𝐧𝐭.
              <br />
              • Assessed UX and UI designs for technical feasibility.
              <br /> • We have a talented pool of technical professionals
              experienced in the latest technology solutions, skilled and
              passionate for 𝐅𝐫𝐨𝐧𝐭-𝐞𝐧𝐝 , 𝐁𝐚𝐜𝐤𝐞𝐧𝐝
            </motion.p>
          </div>

          {/* slider */}
          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Work;
