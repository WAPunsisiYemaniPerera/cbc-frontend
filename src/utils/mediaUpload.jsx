import { createClient } from "@supabase/supabase-js";

//connecting our project and supabase
const supabase = createClient("https://avhiweclsvsyvvuayatw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2aGl3ZWNsc3ZzeXZ2dWF5YXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4OTU1NDEsImV4cCI6MjA2NTQ3MTU0MX0.t8i-D4N4ClDtnu4UVpAH03yZ464OaDOnvTZAjyOUGwk")


export default function mediaUpload(file){
    //promise-it can be succuessful or failed
    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected.")
            }
            const timeStamp = new Date().getTime();
            const newFileName = timeStamp + file.name

            //upload the image
            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    //get the url
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File upload failed")
                }
            )
        }
    )

    return promise
}

