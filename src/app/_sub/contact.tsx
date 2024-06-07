"use client"

import { useAppStore } from "@/store/app-provider"

import Image from "@/components/sub/image"
import Button from "@/components/sub/button"
import Link from "next/link"

type Props = {
  isDark?: boolean,
  imageUrl?: string,
  imageAlt?: string,
  title?: string,
  description?: string,
  withButtonContact?: boolean,
  withButtonSchedule?: boolean,
  withButtonRegistration?: boolean,
}

export default function ContactSection (props: Props) {
  // const { setClientWidth } = useAppStore((state: any) => state)
  const { clientWidth } = useAppStore((state: any) => state)
  const isDesktop = (clientWidth >= 768)

  const isDark = props.hasOwnProperty('isDark') ? props.isDark : true
  const imageUrl = props.hasOwnProperty('imageUrl') && props.imageUrl && props.imageUrl?.length > 0 ? props.imageUrl : undefined
  const imageAlt = props.hasOwnProperty('imageAlt') && props.imageAlt && props.imageAlt?.length > 0 ? props.imageAlt : undefined
  const title = props.hasOwnProperty('title') ? props.title : false
  const description = props.hasOwnProperty('description') ? props.description : false
  const withButtonContact = props.hasOwnProperty('withButtonContact') ? props.withButtonContact : true
  const withButtonSchedule = props.hasOwnProperty('withButtonSchedule') ? props.withButtonSchedule : false
  const withButtonRegistration = props.hasOwnProperty('withButtonRegistration') ? props.withButtonRegistration : false
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="w-full block md:hidden mb-16"
        data-aos="fade-up" data-aos-once="true">
        <Image src={imageUrl || "/images/treatment-ketamine-6.jpg"} alt={imageAlt || "happy family"} styleWidth={isDesktop ? "80%" : "100%"} />
      </div>

      <div className="w-full md:w-1/2 justify-self-center pr-0 md:pr-8 mb-8 mx-0 md:mx-8">
        <h1 className="text-5xl font-semibold mb-6 mx-12 md:mx-0">{title || "Contact Us"}</h1>
        <p className="mb-8 md:mb-4 mx-12 md:mx-0" dangerouslySetInnerHTML={{
          __html: description ||
          "We are happy to assist you. Contact us today to begin your wellness journey with Ketamine Health and Wellness Center of Texas.",
        }}></p>
        <div className="mx-12 md:mx-0">
        {
          withButtonContact ?
          <Link href='/contact'>
            <Button className={`rounded-full theme-${isDark ? "dark" : "light"} normal-case mt-4`} style={{display:'block'}}>
              General Inquiries
            </Button>
          </Link> : null
        }
        {
          withButtonSchedule ?
          <Link href='/consult'>
            <Button className={`rounded-full theme-${isDark ? "dark" : "light"} normal-case mt-4`} style={{display:'block'}}>
              Schedule Online Consultation
            </Button>
          </Link> : null
        }
        {
          withButtonRegistration ?
          <Link href='/contact/patient'>
            <Button className={`rounded-full theme-${isDark ? "dark" : "light"} normal-case mt-4`} style={{display:'block'}}>
              Patient Registration Form
            </Button>
          </Link> : null
        }
        </div>
      </div>
      <div className="w-full md:w-1/2 md:justify-end mt-12 md:mt-0 hidden md:flex flex-row justify-center mx-0 md:mx-8"
        data-aos="fade-up" data-aos-once="true">
        <Image src={imageUrl || "/images/treatment-ketamine-6.jpg"} alt={imageAlt || "happy family"} styleWidth={isDesktop ? "80%" : "100%"} />
      </div>
    </div>
  )
}
