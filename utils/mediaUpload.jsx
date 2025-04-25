import { createClient } from "@supabase/supabase-js"


const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eWZ2aG5idmxzY3hhcXhnbGNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTY5NDUsImV4cCI6MjA2MTE3Mjk0NX0.SRooKTesfJv2Nbh5Pj3QBZl5ixyub1t-CRvAVqu8nqM"

const supabase_url = "https://uyyfvhnbvlscxaqxglcb.supabase.co"

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file) {

  return new Promise((resolve, reject)=>{
    if(file == null){
      reject("No file found")
    }
    const timestamp = new Date().getTime();
    const fileName = timestamp+file.name
  
    supabase.storage.from("winwinhotel").upload(fileName, file,{
      cacheControl: '3600',
      upsert: false
    }).then(()=>{
      const publicUrl = supabase.storage.from("winwinhotel").getPublicUrl(fileName).data.publicUrl
      
      resolve(publicUrl)
    }).catch(()=>{
      reject("error uploading file !")
    })

  })


}