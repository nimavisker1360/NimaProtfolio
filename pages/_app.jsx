import "../styles/globals.css";
    
import Layout from "../components/Layout";
import Transition from "../components/Transition";

import { useRouter } from "next/router";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { appWithTranslation } from 'next-i18next/pages';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <MotionConfig reducedMotion="user">
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div key={router.route} className="min-h-screen">
            <Transition />
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}

export default appWithTranslation(MyApp);
