const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(situation) {
  const prompt = `Given this legal situation, provide three strategic approaches:

Situation: ${situation}

Provide:
1. Conservative Strategy (low-risk, cautious approach)
2. Balanced Strategy (moderate approach)
3. Aggressive Strategy (assertive approach)

For each strategy include:
- Description
- Pros
- Cons
- Timeline

Return as JSON:
{
  "conservative": {
    "description": "...",
    "pros": ["pro 1", "pro 2"],
    "cons": ["con 1", "con 2"],
    "timeline": "..."
  },
  "balanced": { ... },
  "aggressive": { ... }
}`;

  const systemMessage = 'You are a legal strategy advisor. Provide multiple strategic approaches for legal situations. Always respond with valid JSON.';
  
  const response = await generateCompletion(prompt, systemMessage);
  
  try {
    const parsed = JSON.parse(response);
    return {
      ...parsed,
      disclaimer: DISCLAIMER
    };
  } catch (error) {
    return {
      conservative: {
        description: 'Seek mediation and negotiate settlement',
        pros: ['Lower cost', 'Faster resolution', 'Less adversarial'],
        cons: ['May not get full desired outcome'],
        timeline: '2-4 months'
      },
      balanced: {
        description: 'Prepare for litigation while pursuing settlement',
        pros: ['Flexible approach', 'Multiple options'],
        cons: ['Moderate cost and time'],
        timeline: '4-8 months'
      },
      aggressive: {
        description: 'Immediate litigation with full legal action',
        pros: ['Strong position', 'Maximum leverage'],
        cons: ['High cost', 'Time-consuming', 'Relationship damage'],
        timeline: '8-18 months'
      },
      disclaimer: DISCLAIMER
    };
  }
}

module.exports = { run };
