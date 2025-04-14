import "../styles/globals.css";
    
import StarsCanvas from "../components/sub/StartComponent";
import Layout from "../components/Layout";
import Transition from "../components/Transition";

import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-full">
          <Transition />
          <StarsCanvas />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default appWithTranslation(MyApp);
