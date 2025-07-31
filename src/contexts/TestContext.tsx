import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { questions } from '@/data/questions';

// 定义答题进度和结果的类型
interface TestState {
  currentQuestionIndex: number;
  answers: Record<number, number>; // 问题ID到答案的映射
  isComplete: boolean;
  progress: number;
  results: {
    attachmentType: 'secure' | 'fearful' | 'preoccupied' | 'dismissing' | null;
    avoidanceScore: number | null;
    anxietyScore: number | null;
    scores: {
      secure: number;
      fearful: number;
      preoccupied: number;
      dismissing: number;
    } | null;
  };
  handleAnswerSubmit: (questionId: number, value: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  calculateResults: () => void;
  resetTest: () => void;
}

const TestContext = createContext<TestState | undefined>(undefined);

export function TestProvider({ children }: { children: ReactNode }) {
  // 初始化测试状态
  const [testState, setTestState] = useState<Omit<TestState, keyof TestContextActions>>({
    currentQuestionIndex: 0,
    answers: {},
    isComplete: false,
    progress: 0,
    results: {
      attachmentType: null,
      avoidanceScore: null,
      anxietyScore: null,
      scores: null
    }
  });

  // 更新进度
  useEffect(() => {
    const progress = (Object.keys(testState.answers).length / questions.length) * 100;
    setTestState(prev => ({ ...prev, progress }));
    
    // 检查是否完成所有问题
    if (Object.keys(testState.answers).length === questions.length && !testState.isComplete) {
      calculateResults();
      setTestState(prev => ({ ...prev, isComplete: true }));
    }
  }, [testState.answers]);

  // 处理答案提交
  const handleAnswerSubmit = (questionId: number, value: number) => {
    setTestState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value
      }
    }));
  };

  // 导航到下一题
  const goToNextQuestion = () => {
    if (testState.currentQuestionIndex < questions.length - 1) {
      setTestState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  // 导航到上一题
  const goToPreviousQuestion = () => {
    if (testState.currentQuestionIndex > 0) {
      setTestState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };

  // 计算测试结果
  const calculateResults = () => {
    // 处理反向计分
    const processedAnswers: Record<number, number> = {};
    
    questions.forEach(question => {
      const answer = testState.answers[question.id];
      if (question.isReverseScored && answer !== undefined) {
        processedAnswers[question.id] = 8 - answer; // 反向计分公式: tempi = 8 - 原始分
      } else if (answer !== undefined) {
        processedAnswers[question.id] = answer;
      }
    });

    // 计算回避维度(A) - 所有奇数题的平均分
    const avoidanceQuestions = questions.filter(q => q.id % 2 === 1);
    const avoidanceScores = avoidanceQuestions.map(q => processedAnswers[q.id]);
    const validAvoidanceScores = avoidanceScores.filter(score => score !== undefined) as number[];
    const avoidanceScore = validAvoidanceScores.reduce((sum, score) => sum + score, 0) / validAvoidanceScores.length;

    // 计算焦虑维度(B) - 所有偶数题的平均分
    const anxietyQuestions = questions.filter(q => q.id % 2 === 0);
    const anxietyScores = anxietyQuestions.map(q => processedAnswers[q.id]);
    const validAnxietyScores = anxietyScores.filter(score => score !== undefined) as number[];
    const anxietyScore = validAnxietyScores.reduce((sum, score) => sum + score, 0) / validAnxietyScores.length;

    // 计算四种依恋类型的得分
    const secureScore = (avoidanceScore * 3.2893296) + (anxietyScore * 5.4725318) - 11.5307833;
    const fearfulScore = (avoidanceScore * 7.2371075) + (anxietyScore * 8.1776448) - 32.3553266;
    const preoccupiedScore = (avoidanceScore * 3.9246754) + (anxietyScore * 9.7102446) - 28.4573220;
    const dismissingScore = (avoidanceScore * 7.3654621) + (anxietyScore * 4.9392039) - 22.2281088;

    // 确定最高得分的依恋类型
    const scores = { secure: secureScore, fearful: fearfulScore, preoccupied: preoccupiedScore, dismissing: dismissingScore };
    const attachmentType = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0] as 'secure' | 'fearful' | 'preoccupied' | 'dismissing';

    // 更新结果状态
    setTestState(prev => ({
      ...prev,
      results: {
        attachmentType,
        avoidanceScore,
        anxietyScore,
        scores
      }
    }));
  };

  // 重置测试
  const resetTest = () => {
    setTestState({
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false,
      progress: 0,
      results: {
        attachmentType: null,
        avoidanceScore: null,
        anxietyScore: null,
        scores: null
      }
    });
  };

  return (
    <TestContext.Provider value={{
      ...testState,
      handleAnswerSubmit,
      goToNextQuestion,
      goToPreviousQuestion,
      calculateResults,
      resetTest
    }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const context = useContext(TestContext);
  if (context === undefined) {
    throw new Error('useTestContext must be used within a TestProvider');
  }
  return context;
}

// 定义上下文中的方法类型
interface TestContextActions {
  handleAnswerSubmit: (questionId: number, value: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  calculateResults: () => void;
  resetTest: () => void;
}
