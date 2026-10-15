import Navbar from '../portfolio-components/Navbar'
import PixelCat from '../portfolio-components/PixelCat'



export const metadata = {
  title: 'Demo – Scroll Canvas Cards',
  robots: 'noindex, nofollow',
}

export default function DemoPage() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Navbar />
      <PixelCat />
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold">Demo Page</h1>
      <p className="text-lg">This is a Demo page to test the components in isolation.</p>
      

    </div>
    </div>
  )
}