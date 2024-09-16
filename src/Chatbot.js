import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Para estilizar o chatbot
import botImage from "./assets/Clippit.png";

const apiServer = process.env.REACT_APP_API_SERVER;

const Chatbot = ({ dataFolder }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [userLogin, setUserLogin] = useState("");

  const handleLoginUserInput = async () => {
    if (!userLogin.trim()) return;

    try {
      // Enviar pergunta para a API
      const response = await axios.post(apiServer + "/login_" + dataFolder, {
        userLogin: userLogin,
      });

            // Adicionar a resposta do chatbot ao chat
            const botMessage = { sender: "bot", text: response.data };
            setMessages([...messages, botMessage]);

    } catch (error) {
      console.error("Erro ao se comunicar com a API:", error);
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    // Adicionar a pergunta do usuário ao chat
    const newMessage = { sender: "user", text: userInput };
    setMessages([...messages, newMessage]);

    try {
      // Enviar pergunta para a API
      const response = await axios.post(apiServer + "/attendant", {
        question: userInput,
        data_folder: dataFolder,
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
              {message.sender === "bot" ? (
              <div dangerouslySetInnerHTML={{ __html: message.text }} />
            ) : (
              <p>{message.text}</p>
            )}
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
        {dataFolder === "tamojunto" && (
          <div className="alianca-info">
            <input
              type="text"
              value={userLogin}
              onChange={(e) => setUserLogin(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite seu email..."
              className="chat-input"
            />
            <button onClick={handleLoginUserInput} className="send-button">
              Entrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
