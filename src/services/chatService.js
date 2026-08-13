// groqService.js
import axios from 'axios';
import { GROQ_API_KEY } from '@env';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/* Module-level state */
let conversationHistory = [];
let lastRequestTime = 0;

const MIN_DELAY = 1500; // 1.5s between requests

/* Helpers */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/* Public API */
export const sendMessage = async (message) => {
  try {
    // Throttling
    const now = Date.now();
    const diff = now - lastRequestTime;

    if (diff < MIN_DELAY) {
      await sleep(MIN_DELAY - diff);
    }

    // Build messages for Groq
    const messages = [
      ...conversationHistory.map(m => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    const reply = response.data.choices[0].message.content;

    lastRequestTime = Date.now();

    // Update local history
    conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: Date.now(),
    });

    conversationHistory.push({
      role: 'assistant',
      content: reply,
      timestamp: Date.now(),
    });

    // Keep history small
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }

    return reply;
  } catch (error) {
    console.error(
      'Groq API Error:',
      error.response?.data || error.message
    );

    if (error.response?.status === 429) {
      throw new Error('Too many requests. Please slow down.');
    }

    throw new Error('Failed to get response. Please try again.');
  }
};

export const clearHistory = () => {
  conversationHistory = [];
};

export const getHistory = () => {
  return conversationHistory;
};

export const getHistoryLength = () => {
  return conversationHistory.length;
};

// Export everything as a module
export default {
  sendMessage,
  clearHistory,
  getHistory,
  getHistoryLength
};