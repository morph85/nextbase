import IconYouTube from "@mui/icons-material/YouTube"
import IconInstagram from "@mui/icons-material/Instagram"
import IconAccountCircle from "@mui/icons-material/AccountCircle"

const ITEMS_FE = [
  {
    type: "parent",
    label: "About",
    link: "about",
    subitems: [
      {
        type: 'link',
        label: 'About Us',
        link: 'about',
      },
      {
        type: 'link',
        label: 'Testimonials',
        link: 'testimonials',
      },
      {
        type: 'link',
        label: 'FAQ',
        link: 'faq',
      },
    ],
  },
  {
    type: "parent",
    label: "Treatments",
    link: "treatment/ketamine",
    subitems: [
      {
        type: "link",
        label: "Ketamine",
        link: "treatment/ketamine",
      },
      {
        type: "link",
        label: "CBD",
        link: "treatment/cbd",
      },
      {
        type: "link",
        label: "IV Vitamin Therapy",
        link: "treatment/vitamin",
      },
    ],
  },
  {
    type: "link",
    label: "Shop",
    link: "shop",
  },
  {
    type: "parent",
    label: "Learn",
    link: "learn",
    subitems: [
      {
        type: "link",
        label: "Nutrition/Excercise/Stress",
        link: "learn",
      },
      {
        type: "link",
        label: "Hemp to CBD",
        link: "learn/cbd",
      },
    ],
  },
  {
    type: "parent",
    label: "Contact",
    link: "contact",
    subitems: [
      {
        type: "link",
        label: "General Inquiries",
        link: "contact",
      },
      {
        type: "link",
        label: "Consultation",
        link: "consult",
      },
      {
        type: "link",
        label: "Patient Registration",
        link: "contact/patient",
      },
      {
        type: "link",
        label: "Clinical Referral",
        link: "contact/clinical",
      },
    ],
  },
  {
    type: "icon",
    icon: <IconYouTube />,
    link: "https://www.youtube.com/hillmed",
  },
  {
    type: "icon",
    icon: <IconInstagram />,
    link: "https://www.instagram.com/hillmed",
  },
]

const ITEMS_ADMIN = [
  {
    type: "link",
    label: "Pages",
    link: "admin/page",
    reqToken: true,
  },
  {
    type: "link",
    label: "About",
    link: "admin/about",
    reqToken: true,
  },
  {
    type: "link",
    label: "Email",
    link: "admin/email",
    reqToken: true,
  },
  {
    type: "link",
    label: "Products",
    link: "admin/product",
    reqToken: true,
  },
  {
    type: "link",
    label: "Orders",
    link: "admin/order",
    reqToken: true,
  },
  {
    type: "parent",
    label: undefined,
    icon: <IconAccountCircle />,
    subitems: [
      {
        type: "logout",
        label: "Logout",
        link: "admin/logout",
        reqToken: true,
      },
      {
        type: "link",
        label: "Login",
        link: "admin/login",
        reqToken: false,
      },
    ],
  },
]

const NavConstants = {
  ITEMS_FE,
  ITEMS_ADMIN,
}

export default NavConstants
