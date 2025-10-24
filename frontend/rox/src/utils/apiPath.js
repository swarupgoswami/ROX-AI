export const BASE_URL="http://localhost:8000";


export const API_PATHS={
    AUTH:{
        REGISTER:"/api/auth/register", //signup path
        LOGIN:"/api/auth/login", //login path
        GET_PROFILE:"/api/auth/profile",  //get profile path
    },

    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image",  //upload profile picture
    },

    AI:{
        GENERATE_QUESTION:"/api/ai/generate-questions",
        GENERATE_EXPLANATION:"/api/ai/generate-explanations",
    },

    SESSION:{
        CREATE:"/api/sessions/create",
        GET_ALL:"/api/sessions/my-sessions",
        GET_ONE:(id)=>`/api/sessions/${id}`,
        DELETE:(id)=>`/api/sessions/${id}`,
    },

    QUESTION:{
        ADD_TO_SESSION:"/api/questions/add",
        PIN:(id)=>`/api/questions/${id}/pin`,
        UPDATE_NOTE:(id)=>`/api/questions/${id}/note`,
    },
};

