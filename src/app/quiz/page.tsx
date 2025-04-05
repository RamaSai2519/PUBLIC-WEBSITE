'use client';

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase"; // Ensure this points to your Firebase setup
import { Button, Card, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

// Define the types
interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizData {
  id: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Save and fetch quiz data
  useEffect(() => {
    const saveQuizData = async (): Promise<void> => {
      const quizData: QuizData = {
        id: "bollywood_quiz",
        questions: [
          {
            "question": "Who is known as the 'First Superstar of Bollywood'?",
            "options": [
              "Rajesh Khanna",
              "Amitabh Bachchan",
              "Shammi Kapoor",
              "Dilip Kumar"
            ],
            "correctAnswer": "Rajesh Khanna"
          },
          {
            "question": "Which movie marked the debut of Amitabh Bachchan as an actor?",
            "options": [
              "Saat Hindustani",
              "Anand",
              "Sholay",
              "Zanjeer"
            ],
            "correctAnswer": "Saat Hindustani"
          },
          {
            "question": "Who played the iconic character of 'Basanti' in the movie Sholay?",
            "options": [
              "Hema Malini",
              "Rekha",
              "Jaya Bachchan",
              "Madhuri Dixit"
            ],
            "correctAnswer": "Hema Malini"
          },
          {
            "question": "Which Indian film was the first to be submitted for the Oscars?",
            "options": [
              "Mother India",
              "Mughal-e-Azam",
              "Lagaan",
              "Do Bigha Zamin"
            ],
            "correctAnswer": "Mother India"
          },
          {
            "question": "Who directed the critically acclaimed movie 'Satyam Shivam Sundaram'?",
            "options": [
              "Raj Kapoor",
              "Yash Chopra",
              "Bimal Roy",
              "Guru Dutt"
            ],
            "correctAnswer": "Raj Kapoor"
          },
          {
            "question": "Which movie featured the iconic dialogue 'Mogambo Khush Hua'?",
            "options": [
              "Mr. India",
              "Sholay",
              "Deewar",
              "Zanjeer"
            ],
            "correctAnswer": "Mr. India"
          },
          {
            "question": "Which was the first Bollywood movie to cross ₹100 crore at the box office?",
            "options": [
              "Hum Aapke Hain Koun",
              "Dilwale Dulhania Le Jayenge",
              "Sholay",
              "Gadar: Ek Prem Katha"
            ],
            "correctAnswer": "Hum Aapke Hain Koun"
          },
          {
            "question": "Who is known as the 'Tragedy King' of Bollywood?",
            "options": [
              "Dilip Kumar",
              "Guru Dutt",
              "Raj Kapoor",
              "Ashok Kumar"
            ],
            "correctAnswer": "Dilip Kumar"
          },
          {
            "question": "Which actress starred in the 1977 hit movie 'Amar Akbar Anthony'?",
            "options": [
              "Parveen Babi",
              "Shabana Azmi",
              "Zeenat Aman",
              "Hema Malini"
            ],
            "correctAnswer": "Parveen Babi"
          },
          {
            "question": "Which 1998 Bollywood movie is considered a landmark in the romance genre?",
            "options": [
              "Dilwale Dulhania Le Jayenge",
              "Kuch Kuch Hota Hai",
              "Hum Dil De Chuke Sanam",
              "Mohabbatein"
            ],
            "correctAnswer": "Kuch Kuch Hota Hai"
          },
          {
            "question": "Which film is based on the life of Indian cricketer Mahendra Singh Dhoni?",
            "options": [
              "M.S. Dhoni: The Untold Story",
              "Sachin: A Billion Dreams",
              "Lagaan",
              "83"
            ],
            "correctAnswer": "M.S. Dhoni: The Untold Story"
          },
          {
            "question": "Who composed the music for the movie 'Lagaan'?",
            "options": [
              "A.R. Rahman",
              "Jatin-Lalit",
              "Shankar-Ehsaan-Loy",
              "Anu Malik"
            ],
            "correctAnswer": "A.R. Rahman"
          },
          {
            "question": "Which Bollywood movie is based on the life of the Indian mathematician Shakuntala Devi?",
            "options": [
              "Shakuntala Devi",
              "The Sky Is Pink",
              "Neerja",
              "Panga"
            ],
            "correctAnswer": "Shakuntala Devi"
          },
          {
            "question": "Which actress won the National Award for her role in the movie 'Bandit Queen'?",
            "options": [
              "Seema Biswas",
              "Shabana Azmi",
              "Smita Patil",
              "Vidya Balan"
            ],
            "correctAnswer": "Seema Biswas"
          },
          {
            "question": "Which was the first Indian movie to be released in IMAX format?",
            "options": [
              "Dhoom 2",
              "Black",
              "Mughal-e-Azam",
              "Chota Chetan"
            ],
            "correctAnswer": "Mughal-e-Azam"
          },
          {
            "question": "Which Bollywood movie featured the song 'Jai Ho', which won an Oscar?",
            "options": [
              "Slumdog Millionaire",
              "Delhi-6",
              "Guru",
              "Rock On"
            ],
            "correctAnswer": "Slumdog Millionaire"
          },
          {
            "question": "Who directed the movie 'Gully Boy', inspired by Indian street rappers?",
            "options": [
              "Zoya Akhtar",
              "Farhan Akhtar",
              "Anurag Kashyap",
              "Imtiaz Ali"
            ],
            "correctAnswer": "Zoya Akhtar"
          },
          {
            "question": "Which Bollywood movie revolves around the sport of Kabaddi?",
            "options": [
              "Dangal",
              "Panga",
              "Chak De! India",
              "Sultan"
            ],
            "correctAnswer": "Panga"
          },
          {
            "question": "Which movie starring Rajinikanth became the highest-grossing Tamil movie of all time?",
            "options": [
              "2.0",
              "Kabali",
              "Sivaji: The Boss",
              "Baasha"
            ],
            "correctAnswer": "2.0"
          },
          {
            "question": "Which Bollywood movie features the iconic character 'Devdas'?",
            "options": [
              "Devdas (2002)",
              "Mughal-e-Azam",
              "Baazigar",
              "Sholay"
            ],
            "correctAnswer": "Devdas (2002)"
          }
        ]
        
      };

      await setDoc(doc(db, "quizzes", quizData.id), quizData);
    };

    const fetchQuizData = async (): Promise<void> => {
      const docRef = doc(db, "quizzes", "bollywood_quiz");
      const quizSnapshot = await getDoc(docRef);

      if (quizSnapshot.exists()) {
        setQuiz(quizSnapshot.data() as QuizData);
      }
    };

    // Call async functions
    saveQuizData();
    fetchQuizData();
  }, []);

  // Handle answer selection
  const handleAnswer = (selectedOption: string): void => {
    if (quiz?.questions[currentQuestion].correctAnswer === selectedOption) {
      setScore(score + 1);
    }

    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Render loading state
  if (!quiz) {
    return <Text>Loading...</Text>;
  }

  // Render final score
  if (isFinished) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Title level={3}>Quiz Completed!</Title>
        <Text>
          Your Score: {score}/{quiz.questions.length}
        </Text>
        <br />
        <Button type="primary" onClick={() => window.location.reload()}>
          Retry Quiz
        </Button>
      </div>
    );
  }

  // Render quiz questions
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Card>
        <Title level={4}>
          Question {currentQuestion + 1}/{quiz.questions.length}
        </Title>
        <Text>{quiz.questions[currentQuestion].question}</Text>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {quiz.questions[currentQuestion].options.map((option, index) => (
          <Col span={24} key={index}>
            <Button
              block
              onClick={() => handleAnswer(option)}
              style={{ marginBottom: "10px" }}
            >
              {option}
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Quiz;
