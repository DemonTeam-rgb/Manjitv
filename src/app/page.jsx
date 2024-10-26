import MostView from "@/components/MostView"
import Post from '@/components/Post'
import Top_EP from "@/components/Top_Ep"
import Series from "@/components/Series"
import Footer from "@/components/Footer"

const page = () => {
  return (
    <div className="flex flex-col gap-7">
      <Post/>
      <Series/>
      <Top_EP/>
      <MostView/>
      <Footer/>
    </div>
  )
}

export default page