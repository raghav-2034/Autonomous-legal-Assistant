const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(scenario) {
  const prompt = `Analyze this scenario for constitutional rights exposure:

Scenario: ${scenario}

Identify:
1. Affected Constitutional Rights (e.g., Right to Equality, Freedom of Speech, Right to Life, etc.)
2. Relevant Articles (constitutional articles involved)
3. Severity Level (Low/Medium/High/Critical)
4. Explanation (how rights are affected)

Return as JSON:
{
  "affectedRights": ["right 1", "right 2"],
  "articles": ["Article 14", "Article 19"],
  "severityLevel": "Medium",
  "explanation": "detailed explanation"
}`;

  const systemMessage = 'You are a constitutional rights expert. Analyze scenarios for rights violations and constitutional implications. Always respond with valid JSON.';
  
  const response = await generateCompletion(prompt, systemMessage);
  
  try {
    const parsed = JSON.parse(response);
    return {
      ...parsed,
      disclaimer: DISCLAIMER
    };
  } catch (error) {
    return {
      affectedRights: ['Unable to determine specific rights'],
      articles: ['Consult constitutional expert'],
      severityLevel: 'Medium',
      explanation: 'A detailed analysis requires professional legal review.',
      disclaimer: DISCLAIMER
    };
  }
}

module.exports = { run };
