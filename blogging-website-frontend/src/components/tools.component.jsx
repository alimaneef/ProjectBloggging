// importing tools for EditorJs

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker  from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code"
import ImageTool from '@editorjs/image';


import {uploadImage} from '../common/aws'

const uploadImageByURL=(e)=>{
    let link=new Promise((resolve,reject)=>{
        try{
            resolve(e)
        }
        catch(err){
            reject(err)
        }
    })

    return link.then((url)=>{
        return {
            success:1,  
            file:{url}
        }
    })
}


const uploadImageByFile=(e)=>{
    return uploadImage(e).then(url=>{
        if(url){
            return {
                success:1,
                file:{url}
            }
        }
    })
}

export const tools={
    embed:Embed,
    list:{
        class:List,
        inlineToolbar:true
    },
    header:{
        class:Header,
        config:{
            placeholder: "Type Heading...",
            levels:[2,3],
            defaultLevel:2
        }
    },
    marker:Marker,
    quote:{
        class:Quote,
        inlineToolbar:true
    },
    inlineCode:InlineCode,
    image:{
        class:ImageTool,
        config:{
            uploader:{
                uploadByUrl:uploadImageByURL
            }
        }
    }
    
}