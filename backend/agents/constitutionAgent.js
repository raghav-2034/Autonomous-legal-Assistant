const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(query) {
  const prompt = `Explain the following constitutional provision in simple language:

Query: ${query}

Provide:
1. Simple Explanation (easy to understand)
2. Key Points (main takeaways)
3. Examples (real-world applications)
4. Related Provisions (connected articles)

Return as JSON:
{
  "explanation": "simple explanation",
  "keyPoints": ["point 1", "point 2"],
  "examples": ["example 1", "example 2"],
  "relatedProvisions": ["provision 1", "provision 2"]
}`;

  const systemMessage = 'You are a constitutional law educator. Explain constitutional provisions in simple, accessible language. Always respond with valid JSON.';
  
  const response = await generateCompletion(prompt, systemMessage);
  
  try {
    const parsed = JSON.parse(response);
    return {
      ...parsed,
      disclaimer: DISCLAIMER
    };
  } catch (error) {
    return {
      explanation: 'Constitutional provisions require careful interpretation.',
      keyPoints: ['Consult legal resources', 'Seek expert guidance'],
      examples: ['Context-dependent applications'],
      relatedProvisions: ['Multiple provisions may apply'],
      disclaimer: DISCLAIMER
    };
  }
}

module.exports = { run };
