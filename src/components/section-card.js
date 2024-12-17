import { motion } from 'framer-motion'
import { Star, Headphones, Lock } from 'lucide-react'

export function SectionCard({ title, isLocked, isActive, hasAudio, onClick }) {
  return (
    <motion.div
      className={`relative flex flex-col items-center gap-2 ${
        isActive ? 'cursor-pointer' : 'opacity-50'
      }`}
      whileHover={isActive ? { scale: 1.05 } : {}}
      onClick={isActive ? onClick : undefined}
    >
      {isLocked ? (
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
      ) : hasAudio ? (
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
          <Headphones className="w-6 h-6 text-emerald-400" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
          <Star className="w-6 h-6 text-emerald-400" />
        </div>
      )}
      {!isLocked && (
        <div className="w-1 h-16 bg-emerald-400" />
      )}
    </motion.div>
  )
}

