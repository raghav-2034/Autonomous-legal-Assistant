const OpenAI = require('openai');

if (!process.env.OPENROUTER_API_KEY) {
  console.warn('⚠️  OPENROUTER_API_KEY not found in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': process.env.YOUR_SITE_URL || 'http://localhost:3000',
    'X-Title': 'AI Legal Intelligence System',
  }
});

async function generateCompletion(prompt, systemMessage = 'You are a helpful legal assistant.') {
  try {
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error.message);
    throw new Error('Failed to generate AI response');
  }
}

module.exports = { openai, generateCompletion };
