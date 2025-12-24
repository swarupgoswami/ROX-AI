// const {GoogleGenAI}=require('@google/genai');
// const {conceptExplainPrompt, questionAnswerPrompt}=require('../utils/prompts');

// const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// const generateInterviewQuestions=async(req,res)=>{
//     try{
//        const {role,experince,topicsToFocus,numberOfQuestions}=req.body;

//        if(!role || !experince || !topicsToFocus || !numberOfQuestions){
//         return res.status(400).json({
//             message:"Missing required fields"
//         });
//        }

//        const prompt=questionAnswerPrompt(role,experince,topicsToFocus,numberOfQuestions);

//        const response=await ai.models.generateContent({
//         model:"gemini-1.5-flash",
//         contents:prompt,
//        })


//        let rawText= response.candidates?.[0]?.content?.parts?.[0]?.text || "";

//        const cleanedText=rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();

//        const data=JSON.parse(cleanedText);

//        res.status(200).json(data);
//     }catch(error){
//        res.status(500).json({message:"failed to genearte questions",
//         error:error.message
//        });
//        console.error("Error generating interview questions:",error.message);

//     }
// };



// const generateConceptExplanation=async(req,res)=>{
//     try {
//         const {question}=req.body;
//         if(!question){
//             return res.status(400).json({message:"missing required fields"});
//         }


//         const prompt=conceptExplainPrompt(question);

//         const response= await ai.models.generateContent({
//             model:"gemini-1.5-flash",
//             contents:prompt,
//         });


//         let rawText= response.candidates?.[0]?.content?.parts?.[0]?.text || "";

//         const cleanedText=rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();

//         const data=JSON.parse(cleanedText);


//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({message:"failed to generate Concept explanation",error:error.message});
//     }
// };


// module.exports={generateInterviewQuestions,generateConceptExplanation};


// const {GoogleGenAI}=require('@google/genai');
// const {conceptExplainPrompt, questionAnswerPrompt}=require('../utils/prompts');

// const ai=new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

// const generateInterviewQuestions=async(req,res)=>{
//     try{
//        const {role,experince,topicsToFocus,numberOfQuestions}=req.body;

//        if(!role || !experince || !topicsToFocus || !numberOfQuestions){
//         return res.status(400).json({
//             message:"Missing required fields"
//         });
//        }

//        const prompt=questionAnswerPrompt(role,experince,topicsToFocus,numberOfQuestions);

//        const response=await ai.models.generateContent({
//         model:"gemini-2.0-flash-lite",
//         contents:prompt,
//        })


//        let rawText=response.text;

//        const cleanedText=rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();

//        const data=JSON.parse(cleanedText);

//        res.status(200).json(data);
//     }catch(error){
//        console.log(error.message);
//        res.status(500).json({message:"failed to genearte questions",
//         error:error.message
//        });

//     }
// };



// const generateConceptExplanation=async(req,res)=>{
//     try {
//         const {question}=req.body;
//         if(!question){
//             return res.status(400).json({message:"missing required fields"});
//         }


//         const prompt=conceptExplainPrompt(question);

//         const response= await ai.models.generateContent({
//             model:"gemini-2.0-flash-lite",
//             contents:prompt,
//         });


//         let rawText=response.text;

//         const cleanedText=rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();

//         const data=JSON.parse(cleanedText);


//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({message:"failed to generate Concept explanation",error:error.message});
//     }
// };


// module.exports={generateInterviewQuestions,generateConceptExplanation};


const Groq = require('groq-sdk');
const JSON5 = require('json5');
const { conceptExplainPrompt, questionAnswerPrompt } = require('../utils/prompts');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Simple cleaning - just remove markdown blocks
const cleanJsonString = (str) => {
    let cleaned = str.trim();
    
    if (cleaned.startsWith('```json')) {
        cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.substring(3);
    }
    
    if (cleaned.endsWith('```')) {
        cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    
    return cleaned.trim();
};

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experince, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experince || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const prompt = questionAnswerPrompt(role, experince, topicsToFocus, numberOfQuestions);

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,  // Lower temperature for more consistent JSON
            max_tokens: 2000,
        });

        let rawText = completion.choices[0].message.content;
        const cleanedText = cleanJsonString(rawText);
        
        // Use JSON5 which handles malformed JSON better
        const data = JSON5.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to generate questions",
            error: error.message
        });
        console.error("Error generating interview questions:", error.message);
    }
};

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "missing required fields" });
        }

        const prompt = conceptExplainPrompt(question);

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 2000,
        });

        let rawText = completion.choices[0].message.content;
        const cleanedText = cleanJsonString(rawText);
        
        // Use JSON5
        const data = JSON5.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "failed to generate Concept explanation",
            error: error.message
        });
        console.error("Error generating concept explanation:", error.message);
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };