const Question=require('../models/Question');
const Session=require('../models/Session');


// this function will add more question to the session
const addQuestionsToSessions=async(req,res)=>{
    try {
        // taking the session for getting the session and the question to be inserted to the session
        const {sessionId,questions}=req.body;

        if(!sessionId || !questions || !Array.isArray(questions)){
            return res.status(400).json({message:"invalid input data"});
        }
        //  fetching the session from sessionId
        const session=await Session.findById(sessionId);

        if(!session){
            return res.status(404).json({message:"session not found"});
        }
        // inserting the question to the question models 
        const createQuestions=await Question.insertMany(questions.map((q)=>({
            session:sessionId,
            question:q.question,
            answer:q.answer
        })))


        // session.question is an array defined in the session model so the new id of the added question are also to be added to the session 
        session.questions.push(...createQuestions.map((q)=>q._id));


        await session.save();

        res.status(201).json(createQuestions);

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
};


// this function pins question to the session 
const togglePinQuestion=async(req,res)=>{
    try {
        const question= await Question.findById(req.params.id);

        if(!question){
            res.status(404).json({success:false,message:"question not found"});
        }

        question.isPinned=!question.isPinned;

        await question.save();
        res.status(200).json({success:true,question});
    } catch (error) {
        res.status(500).json({success:false,message:"server Error"});
    }
};



// to add a note to a question like important like that kind of;
const updateQuestionNote=async(req,res)=>{
    try {
        const {note}=req.body;
        const question=await Question.findById(req.params.id);

        if(!question){
            res.status(404).json({success:false,message:"question not found"});
        }

        question.note=note || "";
        await question.save();

        res.status(200).json({success:true,question});
    } catch (error) {
        res.status(500).json({success:false,message:"server Error"});
    }
};


module.exports={addQuestionsToSessions,togglePinQuestion,updateQuestionNote};