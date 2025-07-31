import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  
  const startTest = () => {
    navigate('/test');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">成人依恋量表（ECR）</h1>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">指导语</h2>
            <p className="text-lg text-gray-700 mb-6">
              请根据你在恋爱关系中的感受选择选项。若尚无恋爱经历，请参考与最亲近朋友的交往情况作答。
            </p>
            
            <div className="bg-blue-50 p-4 rounded-xl mb-6 text-left">
              <h3 className="font-semibold text-blue-800 mb-2">量表说明</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>共36道题目</li>
                <li>每题7个选项（1=非常不同意，7=非常同意）</li>
                <li>完成时间约5-8分钟</li>
              </ul>
            </div>
            
            <motion.button
              onClick={startTest}
              className="w-full py-4 bg-blue-500 text-white rounded-xl text-xl font-semibold shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              开始测试
            </motion.button>
          </div>
          
          <p className="text-sm text-gray-500">
            注：本测试仅供参考，不构成专业心理诊断。如有需要，请咨询专业心理医生。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
