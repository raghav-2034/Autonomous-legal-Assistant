const { generateCompletion } = require('../lib/openai');

const DISCLAIMER = 'This information is for educational purposes only and does not constitute legal advice.';

async function run(input) {
  const prompt = `Analyze the following legal problem and provide:
1. Case Category (e.g., Criminal, Civil, Family, Property, Constitutional, etc.)
2. Relevant Legal Sections (list applicable laws or sections)
3. Suggested Next Steps (practical advice)

Problem: ${input}

Return your response in this JSON format:
{
  "category": "category name",
  "sections": ["section 1", "section 2"],
  "nextSteps": ["step 1", "step 2", "step 3"]
}`;

  const systemMessage = 'You are a legal classification expert. Analyze legal problems and categorize them accurately. Always respond with valid JSON.';
  
  const response = await generateCompletion(prompt, systemMessage);
  
  try {
    const parsed = JSON.parse(response);
    return {
      ...parsed,
      disclaimer: DISCLAIMER
    };
  } catch (error) {
    return {
      category: 'General Legal Matter',
      sections: ['Unable to determine specific sections'],
      nextSteps: ['Consult with a qualified attorney', 'Gather relevant documents', 'Document timeline of events'],
      disclaimer: DISCLAIMER
    };
  }
}

module.exports = { run };
