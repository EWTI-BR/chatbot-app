import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Para estilizar o chatbot
import botImage from "./assets/Clippit.png";

const apiServer = process.env.REACT_APP_API_SERVER;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    // Adicionar a pergunta do usuário ao chat
    const newMessage = { sender: "user", text: userInput };
    setMessages([...messages, newMessage]);

    try {
      // Enviar pergunta para a API
      const response = await axios.post(apiServer + "/attendant", {
        question: userInput,
      });

      // Adicionar a resposta do chatbot ao chat
      const botMessage = { sender: "bot", text: response.data };
      setMessages([...messages, newMessage, botMessage]);

      // Limpar a caixa de entrada do usuário
      setUserInput("");
    } catch (error) {
      console.error("Erro ao se comunicar com a API:", error);
    }
  };
  // Função para reiniciar a conversa
  const resetConversation = () => {
    setMessages([]);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUserInput();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="bot-window">
        <div className="chat-window">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="user-window">
        <div className="clipper-info">
          <img src={botImage} alt="Bot" className="bot-image" />
        </div>
        <div className="bot-info">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta..."
            className="chat-input"
          />
          <button onClick={handleUserInput} className="send-button">
            Enviar
          </button>
          <div>
            <button onClick={resetConversation} className="reset-button">Reiniciar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
