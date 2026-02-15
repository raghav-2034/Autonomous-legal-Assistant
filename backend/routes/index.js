const express = require('express');
const router = express.Router();

const chatAgent = require('../agents/chatAgent');
const classificationAgent = require('../agents/classificationAgent');
const riskAgent = require('../agents/riskAgent');
const strategyAgent = require('../agents/strategyAgent');
const rightsAgent = require('../agents/rightsAgent');
const constitutionAgent = require('../agents/constitutionAgent');

router.post('/legal-chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await chatAgent.run(message);
    res.json(result);
  } catch (error) {
    console.error('Legal chat error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

router.post('/describe-problem', async (req, res) => {
  try {
    const { problem } = req.body;
    
    if (!problem || problem.trim().length === 0) {
      return res.status(400).json({ error: 'Problem description is required' });
    }

    const result = await classificationAgent.run(problem);
    res.json(result);
  } catch (error) {
    console.error('Problem classification error:', error);
    res.status(500).json({ error: 'Failed to classify problem' });
  }
});

router.post('/risk-radar', async (req, res) => {
  try {
    const { document } = req.body;
    
    if (!document || document.trim().length === 0) {
      return res.status(400).json({ error: 'Document text is required' });
    }

    const result = await riskAgent.run(document);
    res.json(result);
  } catch (error) {
    console.error('Risk analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze document risk' });
  }
});

router.post('/strategy', async (req, res) => {
  try {
    const { situation } = req.body;
    
    if (!situation || situation.trim().length === 0) {
      return res.status(400).json({ error: 'Situation description is required' });
    }

    const result = await strategyAgent.run(situation);
    res.json(result);
  } catch (error) {
    console.error('Strategy generation error:', error);
    res.status(500).json({ error: 'Failed to generate strategies' });
  }
});

router.post('/rights', async (req, res) => {
  try {
    const { scenario } = req.body;
    
    if (!scenario || scenario.trim().length === 0) {
      return res.status(400).json({ error: 'Scenario description is required' });
    }

    const result = await rightsAgent.run(scenario);
    res.json(result);
  } catch (error) {
    console.error('Rights analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze rights exposure' });
  }
});

router.post('/constitution', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const result = await constitutionAgent.run(query);
    res.json(result);
  } catch (error) {
    console.error('Constitution explanation error:', error);
    res.status(500).json({ error: 'Failed to explain constitutional provision' });
  }
});

module.exports = router;
