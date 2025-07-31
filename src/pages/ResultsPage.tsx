import { useNavigate } from 'react-router-dom';
import { useTestContext } from '@/contexts/TestContext';
import { resultAnalysis } from '@/data/questions';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { results, resetTest, isComplete, calculateResults } = useTestContext();
  
  // 确保结果已计算
  useEffect(() => {
    if (isComplete && !results.attachmentType) {
      calculateResults();
    }
  }, [isComplete, results.attachmentType, calculateResults]);
  
  // 如果测试未完成，重定向到问题页面
  if (!isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">正在计算您的结果...</p>
        </div>
      </div>
    );
  }
  
  if (!results.attachmentType) {
    return null;
  }
  
  const analysis = resultAnalysis[results.attachmentType];
  
  // 生成结果图片URL
  const imagePrompt = encodeURIComponent(analysis.imagePrompt);
  const imageUrl = `https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=%24%7BimagePrompt%7D&sign=fe5f52000e3a388bcc4aa2a9660fe107`;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">成人依恋量表（ECR）结果</h1>
          <p className="text-lg text-gray-600">你的依恋类型分析</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={imageUrl}
                    alt={analysis.title}
                    className="w-full h-auto rounded-xl shadow-lg object-cover"
                  />
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium mb-4">
                    你的依恋类型
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{analysis.title}</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h3 className="font-semibold text-gray-700 mb-2">维度得分</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">回避维度</p>
                        <p className="text-2xl font-bold text-blue-500">{results.avoidanceScore?.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">焦虑维度</p>
                        <p className="text-2xl font-bold text-pink-500">{results.anxietyScore?.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{analysis.description}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => {
              resetTest();
              navigate('/');
            }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
}