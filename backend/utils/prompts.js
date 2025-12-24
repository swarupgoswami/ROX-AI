// const questionAnswerPrompt=(role,experince,topicsToFocus,numberOfQuestion)=>(
//     `you are an AI trained to genearte technical interview question and answers.
    
//     task:
//     -role: ${role}
//     -candidate experince: ${experince} years
//     -Focus Topics: ${topicsToFocus}
//     -Write ${numberOfQuestion} interview questions.
//     -For Each question, generate a detailed but beginner-friendly answer.
//     -if the answer needs a code example , add a small block inside.
//     -Return a pure JSON array like:
//     [
//       {
//         "question":"Question here?",
//         "answer" : "Answer here."
//        },
//        ...
//     ]
//     Important: Do not add any extra text.Only return valid JSON`


// )


// const conceptExplainPrompt=(question)=>
//     `you are AI trained to generate explamnation for a given intreview question,
    
    
//     Task:
    
//     -Explain the following interview question and its concept in depth as if you are teaching beginner developer.
//     -Question: "${question}"
//     -After the explanation provide a short and clear title that summarize the concept for the article or page header
//     -if the explanation includes a code example, provide a small code block
//     -keep the formatting very clean and clear
//     -return the result as  a valid JSON Object in the following format:
    
//     {
//        "title":"short title here",
//        "explanation":"explanation here."
//     }
       
//     Important: do NOT add any extra text outside the jsomn format. only return valid JSON`;

//     module.exports={questionAnswerPrompt, conceptExplainPrompt};
    

const questionAnswerPrompt = (role, experince, topicsToFocus, numberOfQuestion) => (
    `You are an AI trained to generate technical interview questions and answers.
    
    Task:
    - Role: ${role}
    - Candidate experience: ${experince} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestion} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - DO NOT include code examples. Instead, describe the code or logic in words.
    - Return a pure JSON array like:
    [
      {
        "question": "Question here?",
        "answer": "Answer here without code blocks."
      }
    ]
    
    CRITICAL: Return ONLY valid JSON. No markdown, no code blocks, no extra text.
    All newlines and special characters in the answer must be properly escaped for JSON.`
);

const conceptExplainPrompt = (question) =>
    `You are an AI trained to generate explanations for interview questions.
    
    Task:
    - Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept.
    - DO NOT include code examples. Instead, describe the implementation approach in words.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:
    
    {
       "title": "Short title here",
       "explanation": "Detailed explanation here without code blocks."
    }
    
    CRITICAL: Return ONLY valid JSON. No markdown, no code blocks, no extra text.
    All newlines and special characters must be properly escaped for JSON.`;

module.exports = { questionAnswerPrompt, conceptExplainPrompt };