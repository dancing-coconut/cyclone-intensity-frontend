import { motion, AnimatePresence } from 'framer-motion';

const MiniChatbot = ({ visible }) => {
    const variants = {
        hidden: { opacity: 0},
        enter: { opacity: 1},
        exit: { opacity: 0},
      };

    return(
        <AnimatePresence>
            {visible?
            <motion.div 
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: "linear" }}
            className='rounded-lg absolute z-[1500] right-0 bottom-0 bg-white overflow-hidden'>
              <iframe className="rounded-lg shadow-2xl shadow-zinc-950" width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/e94e4dc9-5391-4087-8221-ec7bb543eee6"></iframe>
            </motion.div>
            :""}
        </AnimatePresence>
    )
}

export default MiniChatbot