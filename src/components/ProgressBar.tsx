import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  totalQuestions: number;
  currentQuestion: number;
}

export function ProgressBar({ progress, totalQuestions, currentQuestion }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <span>问题 {currentQuestion + 1}/{totalQuestions}</span>
        <span>{Math.round(progress)}% 完成</span>
      </div>
      
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
