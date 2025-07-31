import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface QuestionProps {
  questionId: number;
  questionText: string;
  currentAnswer: number | undefined;
  onAnswerSelect: (questionId: number, value: number) => void;
}

export function Question({ questionId, questionText, currentAnswer, onAnswerSelect }: QuestionProps) {
  const [selectedValue, setSelectedValue] = useState<number | undefined>(currentAnswer);
  
  // 当currentAnswer变化时更新selectedValue
  useEffect(() => {
    setSelectedValue(currentAnswer);
  }, [currentAnswer]);
  
  // 选项标签
  const optionLabels = [
    "非常不同意", "很不同意", "不太同意", "一般", "不太同意", "很同意", "非常同意"
  ];
  
  const handleOptionChange = (value: number) => {
    setSelectedValue(value);
    onAnswerSelect(questionId, value);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">问题 {questionId}</h3>
        <p className="text-lg text-gray-700">{questionText}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <motion.div
            key={value}
            onClick={() => handleOptionChange(value)}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all duration-300",
              selectedValue === value 
                ? "bg-blue-500 text-white shadow-lg transform scale-105" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-bold mb-1">{value}</span>
            <span className="text-xs text-center hidden md:block">{optionLabels[value - 1]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
