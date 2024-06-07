// import type { FormAttrInfo/* , KeyInfo */ } from '@/components/form/forminterface'

import LandingConstants from "./_menuconstants/landing"
import AboutConstants from "./_menuconstants/about"
import DoctorConstants from "./_menuconstants/doctor"
import TestimonialConstants from "./_menuconstants/testimonial"
import KetamineConstants from "./_menuconstants/ketamine"
import CbdConstants from "./_menuconstants/cbd"
import VitaminConstants from "./_menuconstants/vitamin"
import NutritionConstants from "./_menuconstants/nutrition"
import ContactConstants from "./_menuconstants/contact"

const PageConstants = {
  ITEMS_MENU: [
    {
      value: "landing",
      label: "Landing Page",
      subs: LandingConstants.SUBS,
    },
    {
      value: "about",
      label: "About Page",
      subs: AboutConstants.SUBS,
    },
    {
      value: "doctor",
      label: "Doctor Page",
      subs: DoctorConstants.SUBS,
    },
    {
      value: "testimonial",
      label: "Testimonials Page",
      subs: TestimonialConstants.SUBS,
    },
    {
      value: "ketamine",
      label: "Ketamine Page",
      subs: KetamineConstants.SUBS,
    },
    {
      value: "cbd",
      label: "CBD Page",
      subs: CbdConstants.SUBS,
    },
    {
      value: "vitamin",
      label: "Vitamin Page",
      subs: VitaminConstants.SUBS,
    },
    {
      value: "nutrition",
      label: "Nutrition Page",
      subs: NutritionConstants.SUBS,
    },
    {
      value: "contact",
      label: "Contact Page",
      subs: ContactConstants.SUBS,
    },
  ],
}

export default PageConstants
