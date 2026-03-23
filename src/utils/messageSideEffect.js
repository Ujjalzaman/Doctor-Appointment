import { message } from "antd"
import { useEffect } from "react"

export const useMessageEffect = (isLoading, isSuccess, isError, error, successMessage) => {
    useEffect(() => {
        if(!isLoading && isError){
            message.error(error?.data?.message);
        }
        if(isSuccess){
            message.success(successMessage)
        }
    }, [isLoading, isSuccess, isError, error, successMessage])
}