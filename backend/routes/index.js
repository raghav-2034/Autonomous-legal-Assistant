const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/auth');
const { checkCredits, deductCredits } = require('../middleware/credits');

const chatAgent = require('../agents/chatAgent');
const classificationAgent = require('../agents/classificationAgent');
const riskAgent = require('../agents/riskAgent');
const strategyAgent = require('../agents/strategyAgent');
const rightsAgent = require('../agents/rightsAgent');
const constitutionAgent = require('../agents/constitutionAgent');

// Auth routes
const authRoutes = require('./auth');
router.use('/auth', authRoutes);

// Helper function to handle AI requests with credits
async function handleAIRequest(req, res, agentFn) {
  try {
    const result = await agentFn();
    
    // Deduct credits after successful response
    await deductCredits(req, res, () => {});
    
    res.json({
      ...result,
      credits_remaining: res.locals.credits_remaining
    });
  } catch (error) {
    throw error;
  }
}

// Protected AI routes with credit checks
router.post('/legal-chat', 
  authenticateToken, 
  checkCredits('legal-chat'), 
  async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required' });
      }

      await handleAIRequest(req, res, () => chatAgent.run(message));
    } catch (error) {
      console.error('Legal chat error:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  }
);

router.post('/describe-problem', 
  authenticateToken, 
  checkCredits('describe-problem'), 
  async (req, res) => {
    try {
      const { problem } = req.body;
      
      if (!problem || problem.trim().length === 0) {
        return res.status(400).json({ error: 'Problem description is required' });
      }

      await handleAIRequest(req, res, () => classificationAgent.run(problem));
    } catch (error) {
      console.error('Problem classification error:', error);
      res.status(500).json({ error: 'Failed to classify problem' });
    }
  }
);

router.post('/risk-radar', 
  authenticateToken, 
  checkCredits('risk-radar'), 
  async (req, res) => {
    try {
      const { document } = req.body;
      
      if (!document || document.trim().length === 0) {
        return res.status(400).json({ error: 'Document text is required' });
      }

      await handleAIRequest(req, res, () => riskAgent.run(document));
    } catch (error) {
      console.error('Risk analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze document risk' });
    }
  }
);

router.post('/strategy', 
  authenticateToken, 
  checkCredits('strategy'), 
  async (req, res) => {
    try {
      const { situation } = req.body;
      
      if (!situation || situation.trim().length === 0) {
        return res.status(400).json({ error: 'Situation description is required' });
      }

      await handleAIRequest(req, res, () => strategyAgent.run(situation));
    } catch (error) {
      console.error('Strategy generation error:', error);
      res.status(500).json({ error: 'Failed to generate strategies' });
    }
  }
);

router.post('/rights', 
  authenticateToken, 
  checkCredits('rights'), 
  async (req, res) => {
    try {
      const { scenario } = req.body;
      
      if (!scenario || scenario.trim().length === 0) {
        return res.status(400).json({ error: 'Scenario description is required' });
      }

      await handleAIRequest(req, res, () => rightsAgent.run(scenario));
    } catch (error) {
      console.error('Rights analysis error:', error);
      res.status(500).json({ error: 'Failed to analyze rights exposure' });
    }
  }
);

router.post('/constitution', 
  authenticateToken, 
  checkCredits('constitution'), 
  async (req, res) => {
    try {
      const { query } = req.body;
      
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: 'Query is required' });
      }

      await handleAIRequest(req, res, () => constitutionAgent.run(query));
    } catch (error) {
      console.error('Constitution explanation error:', error);
      res.status(500).json({ error: 'Failed to explain constitutional provision' });
    }
  }
);

module.exports = router;
