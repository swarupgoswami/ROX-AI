const questionAnswerPrompt=(role,experince,topicsToFocus,numberOfQuestion)=>(
    `you are an AI trained to genearte technical interview question and answers.
    
    task:
    -role: ${role}
    -candidate experince: ${experince} years
    -Focus Topics: ${topicsToFocus}
    -Write ${numberOfQuestion} interview questions.
    -For Each question, generate a detailed but beginner-friendly answer.
    -if the answer needs a code example , add a small block inside.
    -Return a pure JSON array like:
    [
      {
        "question":"Question here?",
        "answer" : "Answer here."
       },
       ...
    ]
    Important: Do not add any extra text.Only return valid JSON`


)


const conceptExplainPrompt=(question)=>
    `you are AI trained to generate explamnation for a given intreview question,
    
    
    Task:
    
    -Explain the following interview question and its concept in depth as if you are teaching beginner developer.
    -Question: "${question}"
    -After the explanation provide a short and clear title that summarize the concept for the article or page header
    -if the explanation includes a code example, provide a small code block
    -keep the formatting very clean and clear
    -return the result as  a valid JSON Object in the following format:
    
    {
       "title":"short title here",
       "explanation":"explanation here."
    }
       
    Important: do NOT add any extra text outside the jsomn format. only return valid JSON`;

    module.exports={questionAnswerPrompt, conceptExplainPrompt};
    