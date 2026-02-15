const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(message) {
  const systemMessage = `You are a knowledgeable legal assistant. Provide helpful, accurate legal information while being clear that you're providing educational information, not legal advice. Be conversational but professional.`;
  
  const response = await generateCompletion(message, systemMessage);
  
  return {
    response,
    disclaimer: DISCLAIMER
  };
}

module.exports = { run };
