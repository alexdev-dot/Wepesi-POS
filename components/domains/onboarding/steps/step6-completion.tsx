import { ArrowRight, Package, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Step6CompletionProps {
  onGoToDashboard: () => void
  onAddProducts: () => void
}

export function Step6Completion({ onGoToDashboard, onAddProducts }: Step6CompletionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      {/* Success Icon */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-4 sm:mb-6"
      >
        <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-primary/10">
          <motion.div
            initial={{ rotate: -180 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
          >
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" strokeWidth={2} />
          </motion.div>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight"
      >
        🎉 Your business is ready!
      </motion.h1>

      {/* Description */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6"
      >
        Your POS workspace has been successfully created. You can now start adding products and making sales.
      </motion.p>

      {/* Success Features */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6"
      >
        {[
          { icon: Package, color: "bg-primary/10", iconColor: "text-primary", title: "Add Products", desc: "Build inventory" },
          { icon: CheckCircle, color: "bg-green-100", iconColor: "text-green-600", title: "Make Sales", desc: "Process transactions" },
          { icon: CheckCircle, color: "bg-purple-100", iconColor: "text-purple-600", title: "Track Analytics", desc: "Monitor growth" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-50 rounded-lg p-2 sm:p-3"
          >
            <div className="flex justify-center mb-1.5 sm:mb-2">
              <div className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full ${feature.color} flex items-center justify-center`}>
                <feature.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${feature.iconColor}`} />
              </div>
            </div>
            <h3 className="text-[10px] sm:text-xs font-semibold text-slate-900 mb-0.5 sm:mb-1">{feature.title}</h3>
            <p className="text-[10px] sm:text-xs text-slate-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
        className="flex flex-col gap-2 sm:gap-3"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onGoToDashboard}
            className="group h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold bg-primary hover:bg-primary/90 transition-all"
          >
            Go to Dashboard
            <motion.span
              className="ml-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onAddProducts}
            variant="outline"
            className="h-10 sm:h-11 rounded-lg text-xs sm:text-sm font-semibold border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Package className="h-4 w-4 mr-2" />
            Start Adding Products
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer Note */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
        className="mt-4 sm:mt-6 text-[10px] sm:text-xs text-slate-500"
      >
        You can always customize these settings later from your dashboard
      </motion.p>
    </motion.div>
  )
}
