"use client";

import { balancer, popularQuestions } from "@/constants/messages";
import { useAppSelector } from "@/hooks/redux";
import { Spin } from "antd";
import { useRef, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

const Chat = () => {
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const { income, expense } = useAppSelector((state) => state.finances);

  const fetchAnalysis = async (message: string): Promise<void> => {
    if (!message.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const formattedMessage = message + balancer;

    setMessage("");
    setAnalysis("");
    setLoading(true);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { income, expense },
          message: formattedMessage,
        }),
        signal: controller.signal,
      });

      const analysisResult = await response.json();
      setAnalysis(analysisResult.choices[0].message.content);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error(error);
      setAnalysis("Failed to retrieve analysis.");
    }

    setLoading(false);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <div className="bg-gray-700 border border-gray-500 rounded-lg shadow-md p-3 flex flex-col gap-3  min-h-[513px]">
        <div className="flex gap-1 items-center">
          <h1 className="text-gray-200">AI analytics</h1>
          <RiRobot2Line color="#131836" />
        </div>
        <div className="overflow-y-auto">
          {loading && (
            <div className="flex gap-2 items-center">
              <p className="text-gray-200">Analyzing your data</p>
              <Spin size="small" />
            </div>
          )}
          {analysis && <p className="text-gray-200">{analysis}</p>}
        </div>
        <div className="mt-auto relative">
          <input
            className="bg-gray-200 rounded-xl border border-gray-500 w-full h-11 focus:outline-none p-3 text-gray-500 pr-10"
            placeholder={
              "Ask any question about your finances, I will help you"
            }
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                fetchAnalysis(message);
              }
            }}
          />
          <FaRegPaperPlane
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => fetchAnalysis(message)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        {popularQuestions.map((question, idx) => {
          return (
            <div
              className="bg-blue-200 rounded-md p-1 mt-3 border border-gray-400 cursor-pointer"
              key={idx}
              onClick={() => fetchAnalysis(question)}
            >
              <p>{question}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Chat;
