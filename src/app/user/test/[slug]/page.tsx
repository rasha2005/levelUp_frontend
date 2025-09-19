"use client"

import { getQuestionById, getTest, updateTestResult } from "@/app/lib/api/userApi";
import Question from "@/app/utils/interface/Question";
import { Test } from "@/app/utils/interface/Test";
import UserHeader from "@/components/user/userHeader";
import { useParams } from "next/navigation";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function TestPage() {
    const params = useParams()
    const slotId = params.slug
    const [step, setStep] = useState<"instructions" | "question" | "result">("instructions");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [test, setTest] = useState<Test>();
    const [questionIds, setQuestionIds] = useState<string[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [score, setScore] = useState(0);
  
   
    
    const fetchTest = async () => {
      const data = await getTest(slotId); 
     
      if(data.data.response.data){
          setTest(data.data.response.data);
          setQuestionIds(data.data.response.data.questions);

      }
    };
  
    useEffect(() => {
      if (slotId) fetchTest();
    }, [slotId]);
  
    const handleNext = async () => {
      if (currentQuestion) {
        const selected = answers[currentQuestion.id];
        if (selected === currentQuestion.answer) {
          setScore((prev) => prev + 1);
        }
      }
      const nextIndex = currentIndex + 1;


      if (nextIndex < questionIds.length) {
        setCurrentIndex(nextIndex);
        const qData = await getQuestionById(questionIds[nextIndex]);
        setCurrentQuestion(qData.data.response.data);
      } else {
        await updateTestResult(slotId ,score)
        setStep("result");
       
      }
    };

    const handleStart = async() => {
      setStep("question");
      const qId = questionIds[0];
      const qData = await getQuestionById(qId); 
      setCurrentQuestion(qData.data.response.data);
    }
  
    const handleSelect = (option: string) => {
      if (currentQuestion) {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
      }
    };
  
    return (
      <>
  <UserHeader />

  {/* Page background */}
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-10">
    <div className="max-w-2xl mx-auto px-4">
      {/* Outer Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">

        {/* ===== Instructions ===== */}
        {step === "instructions" && (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-blue-700">Test Instructions</h2>
            <ul className="space-y-2 text-gray-700 text-left list-disc list-inside">
              <li>Read each question carefully.</li>
              <li>Select one option before clicking <b>Next</b>.</li>
              <li>True/False questions have only two choices.</li>
                <li className="font-semibold text-red-600">
      ⚠️ Once you leave or back out of the test, you won’t be able to retake it.
    </li>
            </ul>
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition"
              onClick={handleStart}
            >
              🚀 Start Test
            </button>
          </div>
        )}

        {/* ===== Question View ===== */}
        {step === "question" && currentQuestion && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700">
                Question {currentIndex + 1} of {test?.questions.length}
              </h3>
              <p className="mt-2 text-gray-900 text-xl font-semibold">
                {currentQuestion.text}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {(currentQuestion.type === "truefalse"
                ? ["True", "False"]
                : currentQuestion.options
              ).map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 border p-3 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition ${
                    answers[currentQuestion.id] === opt
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt}
                    checked={answers[currentQuestion.id] === opt}
                    onChange={() => handleSelect(opt)}
                    className="accent-blue-600 w-4 h-4"
                  />
                  <span className="text-gray-800">{opt}</span>
                </label>
              ))}
            </div>

            <button
              className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl disabled:bg-gray-400 transition"
              disabled={!answers[currentQuestion.id]}
              onClick={handleNext}
            >
              {currentIndex === (test?.questions.length ?? 0) - 1
                ? "Finish ✅"
                : "Next ➡️"}
            </button>
          </div>
        )}

        {/* ===== Result View ===== */}
        {step === "result" && test && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-blue-700">🎯 Test Result</h2>

            <p className="text-lg text-gray-700">
              You scored{" "}
              <span className="font-semibold text-blue-700">{score}</span> out of{" "}
              {test.questions.length}
            </p>

            <div className="text-gray-600">
              Percentage:
              <span className="ml-1 font-semibold">
                {((score / test.questions.length) * 100).toFixed(1)}%
              </span>
            </div>

            <p className="text-gray-800">
              {score === test.questions.length
                ? "🎉 Perfect score! Amazing work."
                : score >= test.questions.length / 2
                ? "👍 Good job! Keep practicing to improve further."
                : "📚 Don’t worry, review and try again."}
            </p>

            <div className="flex justify-center gap-4">
            <Link href="/user/home">
  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition">
    Go to Dashboard
  </button>
</Link>
              <button
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl shadow transition"
                onClick={() => window.location.reload()}
              >
                🔄 Retake Test
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
      </>
    );
  }
  