import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SubscribePopup from '@/components/subscribe/SubscribePopup'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <SubscribePopup />
    </>
  )
}
