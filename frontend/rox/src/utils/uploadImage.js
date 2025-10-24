import {API_PATHS} from "./apiPath";
import axiosInstance from "./axiosInstance";


const uploadImage=async(imageFile)=>{
    const formData=new FormData();

    formData.append('image',imageFile);
    try {
        const response=await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('error uploading the image',error);
    }
};


export default uploadImage;
