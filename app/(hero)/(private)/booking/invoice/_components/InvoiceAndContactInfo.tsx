"use client"

import { Edit, PhoneCallIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { TfiEmail } from "react-icons/tfi"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import ContactForm, { type FormValues } from "./ContactForm"

interface ContactInfo {
  title: string
  name: string
  phone: string
  email: string
  address: string
  promo: string
  discount: number
}

const initialData: ContactInfo = {
  title: "Invoice & Contact Info",
  name: "Rohan Shrestha",
  phone: "9811111111",
  email: "bishalshrestha@gmail.com",
  address: "Balaju, Tarakeshwor-3, Kathmandu, Bagmati Province",
  promo: "2333456",
  discount: 100,
}

const InvoiceAndContactInfo: React.FC = () => {
  const [openContactForm, setContactForm] = useState<boolean>(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>(initialData)
  const [promo, setPromo] = useState<boolean>(false)
  const [promoCode, setPromoCode] = useState<string>("")
  const [promoError, setPromoError] = useState<string | null>(null)
  const [instantDiscount, setInstantDiscount] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(2900)

  // Function to handle promo code application
  const applyPromo = () => {
    if (promoCode === contactInfo.promo) {
      setPromo(true)
      setPromoError(null)
      setInstantDiscount(false)
      setTotal(2800)
    } else {
      setPromo(false)
      setPromoError("Invalid promo code")
    }
  }

  // Function to handle form submission
  const handleFormSubmit = (values: FormValues) => {
    setContactInfo({
      ...contactInfo,
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.location,
    })
  }

  return (
    <div className="px-5">
      <div className="md:w-[470px] md:h-[540px] mx-auto border shadow-md rounded-lg">
        <div className="flex items-center justify-between p-2">
          <h1 className="gradient-text text-xl font-semibold">{contactInfo.title}</h1>
          <span onClick={() => setContactForm(true)} className="flex items-center gap-1 text-sm cursor-pointer">
            <Edit size={15} />
            <p>Edit</p>
          </span>
        </div>
        <div className="p-2">
          <p className="text-2xl font-bold">{contactInfo.name}</p>
          <p className="flex items-center gap-2 text-lg pt-2">
            <PhoneCallIcon size={20} color="blue" />
            {contactInfo.phone}
          </p>
          <p className="flex items-center gap-2 text-lg pt-2">
            <TfiEmail size={16} color="blue" />
            {contactInfo.email}
          </p>
          <p className="flex items-center gap-2 text-lg pt-2">
            <CiLocationOn size={16} color="blue" />
            {contactInfo.address}
          </p>
        </div>

        <h2 className="gradient-text text-lg font-semibold p-2">Promotion</h2>
        <div className="p-2 flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter a Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="shadow"
          />
          <Button variant={"brand"} onClick={applyPromo} className="w-full md:w-auto">
            Apply
          </Button>
        </div>
        {promoError && <p className="text-red-500 text-sm">{promoError}</p>}

        <h3 className="text-lg p-2">Booking Summary</h3>
        <div className="flex items-center justify-between p-2 text-gray-600 text-sm">
          <p>Total Bookings (1 Sewa)</p>
          <p>Rs.2800</p>
        </div>

        {/* For Instant Sewa Fee */}
        {instantDiscount && (
          <div className="flex items-center justify-between p-2 text-gray-600 text-sm">
            <p>Instant Sewa Fee ({contactInfo.discount})</p>
            <p>Rs.{contactInfo.discount}</p>
          </div>
        )}

        {/* For Promo Discount */}
        {promo && (
          <div className="flex items-center justify-between p-2 text-gray-600 text-sm">
            <p>Discount ({contactInfo.promo})</p>
            <p>-Rs.300</p>
          </div>
        )}

        <hr className="border-gray-300 my-2" />
        <div className="flex items-center justify-between p-2">
          <p className="text-base">Total:</p>
          <div>
            <p className="text-xl flex justify-end gradient-text">Rs.{total}</p>
            <p className="text-sm text-gray-600">All taxes included</p>
          </div>
        </div>
        <Link href="/booking/paymentmethod">
          <Button variant={"brand"} className="w-full h-10 mt-4">
            Proceed to Pay
          </Button>
        </Link>

        {/* For Popup */}
        {openContactForm && (
          <ContactForm
            openContactForm={openContactForm}
            setOpenContactForm={setContactForm}
            onSubmit={handleFormSubmit}
            initialValues={{
              name: contactInfo.name,
              phone: contactInfo.phone,
              email: contactInfo.email,
              location: contactInfo.address,
            }}
          />
        )}
      </div>
    </div>
  )
}

export default InvoiceAndContactInfo

