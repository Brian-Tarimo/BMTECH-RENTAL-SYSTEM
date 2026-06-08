const {
    getForecasts,
  } = require("../services/forecastService");
  
  const getForecastData = async (req, res) => {
  
    try {
  
      const data =
        await getForecasts();
  
      res.json(data);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message,
      });
  
    }
  };
  
  module.exports = {
    getForecastData,
  };