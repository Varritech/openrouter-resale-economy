/**
 * OpenRouter-style Credit Resale Starter
 * 
 * This is a minimal implementation showing the core pattern:
 * - Developer buys credits
 * - Requests proxy through router
 * - Router selects cheapest provider
 * - Margin captured on each request
 */

const express = require('express');
const app = express();
app.use(express.json());

// Mock database (replace with PostgreSQL in production)
let creditBalances = {}; // { userId: balanceInCents }
let providerRates = {
  'openai-gpt4': { costPerM: 3000, pricePerM: 4000 }, // $3.00 cost, $4.00 price per 1M tokens
  'anthropic-claude': { costPerM: 2500, pricePerM: 3500 },
  'google-gemini': { costPerM: 1500, pricePerM: 2200 }
};

// Middleware: Check credit balance
const checkCredits = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  const estimatedCost = req.body?.estimatedTokens * providerRates[req.body?.model]?.pricePerM / 1000000;
  
  if (!creditBalances[userId] || creditBalances[userId] < estimatedCost * 100) {
    return res.status(402).json({ error: 'Insufficient credits', balance: creditBalances[userId] || 0 });
  }
  
  req.userId = userId;
  req.estimatedCost = estimatedCost;
  next();
};

// Smart routing: Select cheapest available provider for requested capability
function selectProvider(capability) {
  // In production, add health checks, latency tracking, quality scores
  const providers = Object.entries(providerRates)
    .filter(([key]) => key.includes(capability.toLowerCase()))
    .sort(([, a], [, b]) => a.costPerM - b.costPerM); // Cheapest first
  
  return providers[0]?.[0] || 'openai-gpt4';
}

// Buy credits endpoint
app.post('/credits/purchase', (req, res) => {
  const { userId, amount } = req.body; // amount in dollars
  
  if (!userId || !amount) {
    return res.status(400).json({ error: 'userId and amount required' });
  }
  
  creditBalances[userId] = (creditBalances[userId] || 0) + (amount * 100);
  
  res.json({ 
    success: true, 
    balance: creditBalances[userId],
    message: `Added $${amount} in credits`
  });
});

// Unified completion endpoint
app.post('/v1/completions', checkCredits, async (req, res) => {
  const { userId, estimatedCost } = req;
  const { model, prompt } = req.body;
  
  // Select optimal provider based on model/capability
  const selectedProvider = selectProvider(model || 'general');
  const rate = providerRates[selectedProvider];
  
  console.log(`Routing to ${selectedProvider} (cost: $${rate.costPerM/1000}/1M tokens)`);
  
  // In production: Actually call the provider API here
  // For demo: Return mock response
  const mockResponse = {
    id: 'mock-completion-' + Date.now(),
    object: 'text_completion',
    created: Date.now(),
    model: selectedProvider,
    choices: [{ text: 'This is a mock response from ' + selectedProvider }]
  };
  
  // Deduct credits (in production, track actual token usage)
  const actualCost = estimatedCost * 0.8; // Assume we overestimated by 20%
  const margin = estimatedCost - actualCost;
  creditBalances[userId] -= estimatedCost * 100;
  
  console.log(`Margin captured: $${margin.toFixed(4)}`);
  
  res.json({
    ...mockResponse,
    usage: {
      provider: selectedProvider,
      costToUser: estimatedCost,
      ourCost: actualCost,
      margin: margin
    }
  });
});

// Balance check endpoint
app.get('/credits/balance', (req, res) => {
  const userId = req.headers['x-user-id'];
  
  res.json({
    userId,
    balance: creditBalances[userId] || 0,
    balanceFormatted: `$${((creditBalances[userId] || 0) / 100).toFixed(2)}`
  });
});

// Admin: View margin analytics
app.get('/admin/analytics', (req, res) => {
  const totalCreditsSold = Object.values(creditBalances).reduce((sum, b) => sum + b, 0);
  
  res.json({
    totalCreditsInSystem: `$${(totalCreditsSold / 100).toFixed(2)}`,
    activeUsers: Object.keys(creditBalances).length,
    averageMargin: '20%', // Based on rate configuration
    topProvider: 'openai-gpt4'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Credit resale router running on port ${PORT}`);
  console.log(`\nTest it:`);
  console.log(`POST /credits/purchase - Buy credits`);
  console.log(`POST /v1/completions - Make routed request`);
  console.log(`GET /credits/balance - Check balance`);
});

module.exports = app;
