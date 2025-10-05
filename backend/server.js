require('dotenv').config();
const express=require('express');
const cors=require('cors');
const path=require('path');
// const { connect } = require('http2');
connectDB=require('./config/db');

const authRoutes=require('./routes/authRoutes');
const sessionRoutes=require('./routes/sessionRoutes');
const questionRoutes=require('./routes/questionRoutes');



const app=express();


app.use(cors({
    origin:"*",
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
}));


connectDB();
app.use(express.json());



app.use('/upload',express.static(path.join(__dirname,'uploads'),{}));

// routes

app.use('/api/auth',authRoutes);
// app.use('/api/sessions',sessionRoutes);
// app.use('/api/questions',questionRoutes);


// app.use("/api/ai/generate-questions",protect,generateInterviewQuestions);
// app.use("/api/ai/generate-explanations",protect,generateConceptExplanation);


const PORT=process.env.PORT || 5000;


app.listen(PORT,()=>{
    console.log(`server is running on the port number ${PORT}`);
})