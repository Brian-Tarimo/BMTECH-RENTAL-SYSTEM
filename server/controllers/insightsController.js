const {
    generateInsights,
  } = require("../services/insightsService");
  
  const getInsights = async (req, res) => {
    try {
  
      const data =
        await generateInsights();
  
      res.json(data);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
  
    }
  };
  
  module.exports = {
    getInsights,
  };