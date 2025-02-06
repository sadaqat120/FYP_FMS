const fs = require("fs");
const path = require("path");
require('dotenv').config();
const folderPath = path.resolve(
  __dirname,
  "../../FmsTrainingData"
);

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

/**
 * Uploads the given file to Gemini.
 *
 * See https://ai.google.dev/gemini-api/docs/prompting_with_media
 */
async function uploadToGemini(filePath, mimeType) {
  const uploadResult = await fileManager.uploadFile(filePath, {
    mimeType,
    displayName: path.basename(filePath),
  });
  const file = uploadResult.file;
  return file;
}

/**
 * Waits for the given files to be active.
 */
async function waitForFilesActive(files) {
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
}

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const sendMessage = async (req, res) => {
  const { userMessage, lang } = req.body;

  // Prepend language-specific instruction to the runtime message only
  let runtimeMessage;
  if (lang === "urdu") {
    runtimeMessage = `Answer in Urdu: ${userMessage}`;
  } else if (lang === "english") {
    runtimeMessage = `Answer in English: ${userMessage}`;
  } else {
    return res.status(400).json({ error: "Invalid language selection" });
  }

  // Get all files in the directory
  const filesInFolder = fs.readdirSync(folderPath);
  const files = [];

  for (const fileName of filesInFolder) {
    const filePath = path.join(folderPath, fileName);

    // Determine MIME type based on file extension
    let mimeType;
    if (fileName.endsWith(".pdf")) {
      mimeType = "application/pdf";
    } else if (fileName.endsWith(".png")) {
      mimeType = "image/png";
    } else {
      console.warn(`Skipping unsupported file type: ${fileName}`);
      continue;
    }
    
    // Upload file and add to list
    const uploadedFile = await uploadToGemini(filePath, mimeType);
    files.push(uploadedFile);
  }

  // Wait for all files to be active
  await waitForFilesActive(files);

  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "If the user question in urdu, then respond in urdu, and if in english, then response in English. You are **FMS ChatBot**, in the website name: Farm Management System, also known as the FMS. and its all 6 services are the crops Management, Livestock Management, resource management, custom reminders creation, report generation, and the chatbot for assisting the queries. named as the fara and you have to answer questions in the following fields: 1. **Crop Management**: Planting schedules, seed selection, irrigation techniques, fertilization, pest control, disease management, and harvesting practices.  2. **Livestock Management**: Animal health, breeding practices, feeding schedules, vaccination, housing systems, milking, meat production, and animal tracking.  3. **Resource Management**: Equipment, seeds, fertilizers, labor allocation, water usage, storage facilities, and budgeting.  4. **Weather Analysis**: Weather forecasts, seasonal planning, and climate impact on farming.  5. **Financial Management**: Cost tracking, budgeting, profitability analysis, revenue management, market pricing, and financial planning.  6. **Sustainable Farming**: Crop rotation, soil conservation, water management, organic farming, and energy efficiency.  7. **Government Policies**: Agricultural subsidies, financial aid programs, insurance schemes, and farming regulations.  8. **Market Trends**: Crop and livestock price analysis, demand forecasts, and best market opportunities.  9. **Post-Harvest Management**: Storage, processing, transportation, and value-added product creation.  10. **Agricultural Technology**: IoT devices, drones, GPS systems, and sensors for monitoring farm activities.  11. **Soil Health**: Soil testing, nutrient management, erosion control, and improvement techniques.  12. **Pest and Disease Management**: Identification, treatment, and prevention for crops and livestock.  13. **Advanced Farming Techniques**: Hydroponics, aquaponics, permaculture, and precision farming.  14. **Custom Reminders**: Scheduling and alerts for irrigation, fertilization, planting, and harvesting.  15. **Machinery Guidance**: Recommendations for tractors, plows, sprayers, harvesters, and other farming equipment.  16. **Precision Farming**: GPS-based mapping, resource application, and field monitoring.  17. **Water Management**: Irrigation system design, rainwater harvesting, and water conservation methods.  18. **Animal Husbandry**: Livestock breeding, feed optimization, health monitoring, and farm animal care.  19. **Farm Record-Keeping**: Tracking crop yields, expenses, resource usage, and inventory management.  20. **Climate Change Adaptation**: Strategies to deal with changing weather patterns and extreme conditions.  21. **Community Resources**: Connecting with local cooperatives, farming networks, and market collectives.  22. **Biodiversity Conservation**: Importance of pollinators, preserving native plants, and managing farm ecosystems.  23. **Organic Farming**: Certification processes, market demand, and eco-friendly practices.  24. **Export Guidelines**: Processes for exporting crops and livestock, regulatory compliance, and trade best practices.  25. **Renewable Energy**: Solar power, wind turbines, biogas systems, and energy-efficient farming solutions.  26. **Disaster Management**: Emergency plans for droughts, floods, pest outbreaks, and livestock diseases.  27. **Aquaculture**: Fish farming techniques, water quality management, and feeding practices.  28. **Forestry and Agroforestry**: Tree planting, intercropping, and sustainable timber production.  29. **Beekeeping**: Honey production, hive management, and pollination services.  30. **Agri-Tourism**: Setting up farm visits, workshops, and agribusiness events.  31. **Seed Technology**: Genetically modified seeds, hybrid varieties, and seed storage methods.  32. **Fertilizer Guidance**: Organic vs. chemical fertilizers, application techniques, and nutrient cycles.  33. **Poultry Farming**: Chicken, duck, and turkey farming, egg production, and disease management.  34. **Greenhouse Farming**: Controlled environment agriculture, crop types, and technology.  35. **Fisheries Management**: Fish breeding, pond management, and aquaculture practices.  36. **Bio-Fertilizers and Composting**: Composting techniques, vermiculture, and eco-friendly soil amendments.  37. **Herbal and Medicinal Plants**: Cultivation, market demand, and processing.  38. **Farm Infrastructure**: Designing irrigation systems, building barns, greenhouses, and storage facilities.  39. **Energy-Efficient Practices**: Using solar dryers, wind energy, and low-energy equipment.  40. **Agri-Education**: Providing farming knowledge, tips, and best practices for beginners and experienced farmers.  41. **Livelihood Support**: Assisting with side businesses like dairy farming, poultry, and agri-tourism.   42. **Waste Management**: Recycling farm waste, composting, and creating bio-energy.  43. **Land Leasing and Expansion**: Advice on leasing land for farming or expanding operations.  44. **Farm Legal Assistance**: Help with land disputes, compliance, and agricultural laws.  45. **Innovations in Farming**: Latest trends in smart farming, robotics, and artificial intelligence in agriculture.  46. **Crop Insurance**: Types, coverage, and how to claim benefits.  47. **Farm Design and Layout**: Optimizing land use, crop positioning, and infrastructure planning.  48. **Medicinal Plant Cultivation**: Growing and marketing plants for herbal medicine.  49. **Seasonal Farming**: Planning seasonal crops for maximum yield and profit.  50. **Dairy Farming**: Milk production, processing, and marketing techniques.   These fields comprehensively address the needs of farmers while including broader, innovative agricultural concepts. As FMS ChatBot, your purpose is to provide accurate, actionable, and insightful information across these areas. also you can consider that can help to farmers or the question can  be of our farmers about his work , so you are never bound to only these 50, you can think if question can be consider, so if question is valid, you have to try to answer on your knowledge, and if you did not have like real time data or anything then try to reach by your own by searching and getting teh results to try to exact meet te best meet for teh user question answers. but if you  think that the question od not relating to these or totally out of the boundry then do not consider that and do not response that, so analyze each question very well.",
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(runtimeMessage);

    let response = result.response.text();
    if (lang === "urdu") response = "اردو میں جواب: " + response;

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: "Chatbot failed to respond" });
  }
};

const trainChatbot = async () => {
  const folderPath = path.resolve("path-to-FMS-documents");
  const files = fs
    .readdirSync(folderPath)
    .filter((file) => [".pdf", ".png"].includes(path.extname(file)));

  const uploadedFiles = await Promise.all(
    files.map((fileName) =>
      fileManager.uploadFile(path.join(folderPath, fileName), {
        mimeType: fileName.endsWith(".pdf") ? "application/pdf" : "image/png",
        displayName: path.basename(fileName),
      })
    )
  );

  await Promise.all(
    uploadedFiles.map(
      (file) =>
        new Promise(async (resolve, reject) => {
          let fileData;
          do {
            fileData = await fileManager.getFile(file.name);
          } while (fileData.state === "PROCESSING");

          if (fileData.state !== "ACTIVE") reject(fileData);
          resolve();
        })
    )
  );
};

module.exports = { sendMessage, trainChatbot };
