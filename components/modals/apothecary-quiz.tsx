"use client"

import { useState } from "react"
import { X, CheckCircle, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useUIStore } from "@/store/ui-store"
import { useCartStore } from "@/store/cart-store"
import { PRODUCTS } from "@/lib/data"

type QuizStep = "questions" | "results"

interface QuizAnswer {
  concern: string
  skinType: string
  goal: string
}

const questions = [
  {
    id: "concern",
    question: "What is your primary skin concern?",
    options: ["Hydration", "Anti-Aging", "Acne Care", "Brightening", "Sensitivity"],
  },
  {
    id: "skinType",
    question: "How would you describe your skin type?",
    options: ["Dry", "Oily", "Combination", "Sensitive", "Balanced"],
  },
  {
    id: "goal",
    question: "What is your primary skincare goal?",
    options: ["Prevention", "Treatment", "Maintenance", "Transformation", "Relief"],
  },
]

export default function ApothecaryQuiz() {
  const isQuizModalOpen = useUIStore((s) => s.isQuizModalOpen)
  const closeQuizModal = useUIStore((s) => s.closeQuizModal)
  const addToCart = useCartStore((s) => s.addToCart)

  const [step, setStep] = useState<QuizStep>("questions")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer>({
    concern: "",
    skinType: "",
    goal: "",
  })
  const [recommendedProducts, setRecommendedProducts] = useState<typeof PRODUCTS>([])

  const handleAnswer = (option: string) => {
    const questionId = questions[currentQuestion].id as keyof QuizAnswer
    const newAnswers = { ...answers, [questionId]: option }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateRecommendations(newAnswers)
      setStep("results")
    }
  }

  const generateRecommendations = (finalAnswers: QuizAnswer) => {
    const recommended = PRODUCTS.filter((product) =>
      product.skinConcerns.includes(finalAnswers.concern)
    ).slice(0, 3)

    setRecommendedProducts(recommended)
  }

  const handleReset = () => {
    setCurrentQuestion(0)
    setAnswers({ concern: "", skinType: "", goal: "" })
    setStep("questions")
  }

  const handleAddAllToCart = () => {
    recommendedProducts.forEach((product) => {
      addToCart(product, 1)
    })
    closeQuizModal()
  }

  return (
    <AnimatePresence>
      {isQuizModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeQuizModal}
            className="fixed inset-0 bg-[#222222] z-50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative w-full max-w-2xl bg-[#f5f5f0] rounded-lg overflow-hidden shadow-2xl p-8 md:p-12"
            >
              <button
                onClick={closeQuizModal}
                className="absolute top-4 right-4 z-10 p-2 hover:bg-[#e8e2d9] text-[#222222] rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Close quiz"
              >
                <X className="w-5 h-5" />
              </button>

              {step === "questions" && (
                <div className="space-y-8">
                  <div>
                    <p className="text-sm text-[#4a4a4a] mb-2">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                    <div className="w-full bg-[#e8e2d9]/40 h-1 rounded-full">
                      <div
                        className="bg-[#222222] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#222222] mb-8">
                      {questions[currentQuestion].question}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {questions[currentQuestion].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAnswer(option)}
                          className="p-4 border border-[#e8e2d9] hover:border-[#222222] hover:bg-[#e8e2d9]/20 text-left text-sm font-medium text-[#222222] transition-all duration-300 cursor-pointer rounded-sm"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "results" && (
                <div className="space-y-8 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </motion.div>

                  <div>
                    <h2 className="font-serif text-3xl text-[#222222] mb-2">Your Ritual Created</h2>
                    <p className="text-sm text-[#4a4a4a]">
                      Based on your answers, we recommend these formulations
                    </p>
                  </div>

                  <div className="space-y-3 my-8">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="p-4 bg-[#e8e2d9]/20 rounded-sm text-left">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-[#4a4a4a] font-mono mb-1">{product.number}</p>
                            <p className="font-serif text-lg text-[#222222]">{product.name}</p>
                            <p className="text-xs text-[#4a4a4a] mt-1">{product.tagline}</p>
                          </div>
                          <p className="font-semibold text-[#222222]">${product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleReset}
                      className="py-3 border border-[#222222] text-[#222222] hover:bg-[#e8e2d9]/50 text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                    >
                      Retake Quiz
                    </button>
                    <button
                      onClick={handleAddAllToCart}
                      className="py-3 bg-[#222222] hover:bg-[#4a4a4a] text-[#f5f5f0] text-xs font-semibold tracking-[0.15em] uppercase rounded-sm transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>Add to Bag</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
