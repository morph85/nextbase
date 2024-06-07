import Instagram from '@mui/icons-material/Instagram'
import YouTube from '@mui/icons-material/YouTube'
import Link from 'next/link'
// import Image from '@/components/sub/image'

import clsx from "clsx"
// import CssVariable from '@/app/variables.module.scss'
import styles from "@/components/footer/footer.module.scss"

export default function Footer() {
  return (
    <div className="w-full theme-dark pt-24 md:pt-48 pb-8">
      <div className="mx-8">
        <div className='block md:flex justify-center text-center items-center gap-[8px] mb-8'>
          <Link href='/faq' className={clsx("link inline-block", styles.link)}>FAQ</Link>
          <Link href='/disclaimer' className={clsx("link inline-block", styles.link)}>Disclaimer</Link>
          <Link href='/terms-of-use' className={clsx("link inline-block", styles.link)}>Terms of Use</Link>
          <Link href='/contact' className={clsx("link inline-block", styles.link)}>Contact</Link>
          <br className="block lg:hidden" />
          <YouTube className="m-4 text-3xl md:text-2xl align-middle" />
          <Instagram className="m-4 text-3xl md:text-2xl align-middle" />
        </div>

        <div className='flex justify-center text-xs'>
          <p className='text-center'>© Copyright {new Date().getFullYear()} Ketamine Health and Wellness Center of Texas. All Rights Reserved. Website by <Link href='https://adaptconcepts.com/'>Adapt Concepts</Link> </p>
        </div>
      </div>
    </div>
  )
}