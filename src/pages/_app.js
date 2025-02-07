import '../styles/global.scss';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <div className="appContainer">
      <Navbar />
      <main className="content">
        <AnimatePresence mode="wait">
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default MyApp;
