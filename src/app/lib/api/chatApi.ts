import { Api } from "@/app/utils/apiconfig";
import { chatEndpoints } from "@/app/utils/endpoints/chatEndpoints";
import { NextResponse } from "next/server";

export  const accessChat = async(id:any) => {
    const res = await Api.post(chatEndpoints.accessChat , {id});
    return res
}

export const fetchChats = async() => {
    const res = await Api.get(chatEndpoints.fetchChats);
    return res
}

export const createMessage = async(content:string , chatId:any) => {
    const res = await Api.post(chatEndpoints.createMessage , {content , chatId} )
    return res;
}

export const fetchMessages = async(chatId:any) => {
    const res = await Api.get(chatEndpoints.fetchMessage,{
        params:{chatId}
});
return res
}

