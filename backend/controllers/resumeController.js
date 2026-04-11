// backend/controllers/resumeController.js
import fs from 'fs';
import { PDFParse } from 'pdf-parse'; // ye pdf parse bohot purani library jisko ham directly import nhi karsakte
import genAI from '../config/gemini.js';

export const analyzeResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }


    
    // 2. Extract text using pdf-parse
    const parser = new PDFParse({ url: req.file.path });
    const pdfData = await parser.getText();
    const parsedText = pdfData.text;


    // Optional: Delete the temporary file to save space
    fs.unlinkSync(req.file.path);

    // Ask Gemini to analyze the text and return JSON
    const prompt = `You are an expert technical recruiter analyzing a resume.
    
    Extract the following information from the resume text below and format your response STRICTLY as a JSON object, with no markdown formatting, no backticks, and no extra text.
    
    Required JSON structure:
    {
      "skills": ["skill1", "skill2"],
      "projects": ["Project Name 1", "Project Name 2"],
      "experience_summary": "A brief 2-sentence summary of their overall experience."
    }

    Resume Text:
    ${parsedText}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite-preview' });
    const result = await model.generateContent(prompt);
    
    // Clean up response in case Gemini includes markdown like ```json ... ```
    let responseText = result.response.text();
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const resumeAnalysis = JSON.parse(responseText);

    res.json({ success: true, analysis: resumeAnalysis });

  } catch (error) {
    console.error('Resume Analysis Error:', error);
    // Ensure we delete the file if an error occurs
    if (req.file && fs.existsSync(req.file.path)) {
       fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};
