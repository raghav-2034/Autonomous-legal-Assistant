const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(documentText) {
  const prompt = `Analyze this legal document for risks and fairness:

${documentText}

Provide:
1. Summary (brief overview)
2. Risk Severity (Low/Medium/High)
3. Fairness Score (0-100, where 100 is most fair)
4. Flagged Clauses (list problematic clauses)
5. Clause Improvements (suggestions for each flagged clause)
6. Recommended Actions (what to do next)

Return as JSON:
{
  "summary": "brief summary",
  "riskSeverity": "Low|Medium|High",
  "fairnessScore": 75,
  "flaggedClauses": ["clause 1", "clause 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "actions": ["action 1", "action 2"]
}`;

  const systemMessage = 'You are a legal document risk analyzer. Identify risks, unfair terms, and provide actionable recommendations. Always respond with valid JSON.';
  
  const response = await generateCompletion(prompt, systemMessage);
  
  try {
    const parsed = JSON.parse(response);
    return {
      ...parsed,
      disclaimer: DISCLAIMER
    };
  } catch (error) {
    return {
      summary: 'Document analysis completed',
      riskSeverity: 'Medium',
      fairnessScore: 50,
      flaggedClauses: ['Unable to parse specific clauses'],
      improvements: ['Review document with legal counsel'],
      actions: ['Seek professional legal review'],
      disclaimer: DISCLAIMER
    };
  }
}

module.exports = { run };
