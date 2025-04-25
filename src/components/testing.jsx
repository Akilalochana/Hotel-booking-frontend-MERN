import { useState } from "react"
import mediaUpload from "../../utils/mediaUpload";


export default function Testing(){
  const [file, setFile] = useState(null);

  function uploadFile(){
    console.log(file)
    mediaUpload(file).then((url)=>{
      console.log(url)
    })
  }

  return(
    <div className="w-full h-screen flex justify-center items-center">
      <input type="file" multiple onChange={(e)=>{
        setFile(e.target.files[0])
      }}/>
      <button onClick={uploadFile} className="bg-[#53c28b] hover:bg-[#53c28b70] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300">
        Upload
      </button>
    </div>
  )
}