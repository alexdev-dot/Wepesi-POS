import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Step1WelcomeProps {
  onNext: () => void
}

export function Step1Welcome({ onNext }: Step1WelcomeProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="mb-4 sm:mb-6"
      >
        <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4 sm:mb-6">
          <motion.span 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="text-2xl sm:text-3xl"
          >
            🛒
          </motion.span>
        </div>
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 sm:mb-3 tracking-tight"
      >
        Welcome to POS System 👋
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6"
      >
        Let's get your business set up in just a few minutes.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        className="bg-slate-50 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8"
      >
        <p className="text-xs sm:text-sm text-slate-700">
          ⏱️ Estimated setup time: <span className="font-semibold text-primary">3-5 minutes</span>
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
      >
        <Button
          onClick={onNext}
          className="group w-full h-10 sm:h-12 rounded-xl text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 transition-all"
        >
          Get Started
          <motion.span
            className="ml-2"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
