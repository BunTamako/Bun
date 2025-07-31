import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import QuestionPage from "@/pages/QuestionPage";
import ResultsPage from "@/pages/ResultsPage";
import { TestProvider } from '@/contexts/TestContext';

export default function App() {
  return (
    <TestProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<QuestionPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </TestProvider>
  );
}
