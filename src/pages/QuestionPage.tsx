import { useNavigate } from 'react-router-dom';
import { Question } from '@/components/Question';
import { ProgressBar } from '@/components/ProgressBar';
import { questions } from '@/data/questions';
import { useTestContext } from '@/contexts/TestContext';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function QuestionPage() {
  const navigate = useNavigate();
  const { 
    currentQuestionIndex, 
    answers, 
    progress, 
    handleAnswerSubmit, 
    goToNextQuestion, 
    goToPreviousQuestion,
    isComplete
  } = useTestContext();
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // 如果测试已完成，重定向到结果页面
  useEffect(() => {
    if (isComplete) {
      navigate('/results');
    }
  }, [isComplete, navigate]);
  
  const handleNext = () => {
    // 检查是否已回答当前问题
    if (answers[currentQuestion.id] !== undefined) {
      if (currentQuestionIndex === questions.length - 1) {
        // 最后一题，直接导航到结果页
        navigate('/results');
      } else {
        goToNextQuestion();
      }
    }
  };
  
  const handlePrevious = () => {
    goToPreviousQuestion();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">成人依恋量表（ECR）</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            请根据你在恋爱关系中的感受选择选项。若尚无恋爱经历，请参考与最亲近朋友的交往情况作答。
          </p>
        </div>
        
        <ProgressBar 
          progress={progress} 
          totalQuestions={questions.length} 
          currentQuestion={currentQuestionIndex} 
        />
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Question
              questionId={currentQuestion.id}
              questionText={currentQuestion.text}
              currentAnswer={answers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSubmit}
            />
          </motion.div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            上一题
          </button>
          
          <button
            onClick={handleNext}
            disabled={answers[currentQuestion.id] === undefined}
            className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
              answers[currentQuestion.id] === undefined
                ? 'bg-blue-300 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
            }`}
          >
            {currentQuestionIndex === questions.length - 1 ? '查看结果' : '下一题'}
          </button>
        </div>
      </div>
    </div>
  );
}