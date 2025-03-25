// controllers/farm.controller.js
const FarmForm = require('../models/FarmForm');

const farmController = {
    // Create new farm or check if exists
    async createOrGetFarm(req, res) {  // ✅ Corrected function syntax
      try {
        const { farmName } = req.body;
        const userId = req.user.id; 
  
        if (!farmName) {
          return res.status(400).json({
            success: false,
            message: 'Farm name is required'
          });
        }
  
        // Check if farm already exists for this user
        let farm = await FarmForm.findOne({ farmName, userId });
        
        if (farm) {
          return res.status(200).json({
            success: true,
            message: 'Farm already exists',
            farm,
            isExisting: true
          });
        }
  
        // Create new farm if it doesn't exist
        farm = new FarmForm({
          farmName,
          userId
        });
  
        await farm.save();
  
        res.status(201).json({
          success: true,
          message: 'Farm created successfully',
          farm,
          isExisting: false
        });
  
      } catch (error) {
        console.error('Farm creation error:', error);
        res.status(500).json({
          success: false,
          message: 'Error processing farm',
          error: error.message
        });
      }
    },
  
    // Get all farms for a user
    async getUserFarms(req, res) {  // ✅ Corrected function syntax
      try {
        const userId = req.user.id;
        const farms = await FarmForm.find({ userId });
        
        res.status(200).json({
          success: true,
          farms
        });
      } catch (error) {
        console.error('Get farms error:', error);
        res.status(500).json({
          success: false,
          message: 'Error fetching farms',
          error: error.message
        });
      }
    }
  };
  
  module.exports = farmController;
  