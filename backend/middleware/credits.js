const prisma = require('../lib/prisma');

// Credit costs for each feature
const CREDIT_COSTS = {
  'legal-chat': 1,
  'describe-problem': 1,
  'risk-radar': 3,
  'strategy': 2,
  'rights': 1,
  'constitution': 1
};

function checkCredits(featureName) {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const creditCost = CREDIT_COSTS[featureName] || 1;

      // Check if user has enough credits
      if (user.credits_remaining < creditCost) {
        return res.status(402).json({
          error: 'Insufficient credits',
          message: 'Credits exhausted. Please upgrade to continue.',
          credits_remaining: user.credits_remaining,
          credits_required: creditCost,
          upgrade_required: true
        });
      }

      // Store credit cost for later deduction
      req.creditCost = creditCost;
      req.featureName = featureName;
      next();
    } catch (error) {
      console.error('Credit check error:', error);
      res.status(500).json({ error: 'Failed to check credits' });
    }
  };
}

async function deductCredits(req, res, next) {
  try {
    const { user, creditCost, featureName } = req;

    // Deduct credits
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        credits_remaining: {
          decrement: creditCost
        }
      }
    });

    // Log usage
    await prisma.usageLog.create({
      data: {
        user_id: user.id,
        feature_used: featureName,
        credits_deducted: creditCost
      }
    });

    // Attach updated credits to response
    res.locals.credits_remaining = updatedUser.credits_remaining;
    
    next();
  } catch (error) {
    console.error('Credit deduction error:', error);
    // Continue even if logging fails
    next();
  }
}

module.exports = { checkCredits, deductCredits, CREDIT_COSTS };
