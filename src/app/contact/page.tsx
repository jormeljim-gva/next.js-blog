import { Send, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div id="contact" className="mt-16">
      {/* Hero */}
      <div className="relative h-[300px] bg-gray-900">
        <img
          src="/images/contact_background.jpg"
          alt="Contact"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-2">CONTACT US</h1>
            <hr className="w-24 mx-auto border-amber-500" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-gray-600 mb-12">
          Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.
        </p>

        <ContactForm />

        <hr className="my-12" />

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">GET IN TOUCH</h3>
          <hr className="w-24 mx-auto mb-6" />
          <p className="text-gray-600 mb-8">
            Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero.
          </p>

          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 text-gray-500">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>(00228) 92229954</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>kouvenceslas93@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
