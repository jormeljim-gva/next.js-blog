import { Building, Users, Award } from 'lucide-react';

export default function AboutPage() {
  const services = [
    { name: 'Photoshop', level: 80, color: 'bg-yellow-500' },
    { name: 'Shooting Photo', level: 95, color: 'bg-green-500' },
    { name: 'Formation', level: 90, color: 'bg-blue-500' },
  ];

  const pricing = [
    { tier: 'BEGINNER', price: '$99.97', options: ['Beginner Option I', 'Beginner Option II', 'Beginner Option III', 'Beginner Option IV', 'Beginner Option V'] },
    { tier: 'INTERMEDIARY', price: '$199.97', options: ['Intermediary Option I', 'Intermediary Option II', 'Intermediary Option III', 'Intermediary Option IV', 'Intermediary Option V'] },
    { tier: 'PROFESSIONAL', price: '$299.97', options: ['High Option I', 'High Option II', 'High Option III', 'High Option IV', 'High Option V'] },
  ];

  const clients = [
    { name: 'MISS BELLA', image: '/images/clients/client1.jpg', quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.' },
    { name: 'DON PENO', image: '/images/clients/client2.jpg', quote: 'Tempora ea ratione vel nisi, qui perferendis nulla, fugit aut, beatae, tempore modi.' },
    { name: 'SWEETY', image: '/images/clients/client3.jpg', quote: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.' },
    { name: 'LADY', image: '/images/clients/client4.jpg', quote: 'Tempora ea ratione vel nisi, qui perferendis nulla, fugit aut, beatae, tempore modi.' },
  ];

  return (
    <div id="about">
      {/* Hero */}
      <div className="relative h-[400px]">
        <img
          src="/images/about_us.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-2">ABOUT US</h1>
            <p className="text-xl">About Us and our Services?</p>
            <hr className="w-24 mx-auto mt-4 border-amber-500" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8">
            <Building className="w-10 h-10 text-amber-600 mb-4" />
            <h4 className="text-xl font-bold mb-4">About Our Studio</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Tempora ea ratione vel nisi, qui perferendis nulla, fugit aut, beatae, tempore modi.
            </p>
          </div>
          <div className="card p-8">
            <Users className="w-10 h-10 text-amber-600 mb-4" />
            <h4 className="text-xl font-bold mb-4">About Our Team</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Tempora ea ratione vel nisi, qui perferendis nulla, fugit aut, beatae, tempore modi.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Award className="w-10 h-10 text-amber-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold">Our Services</h3>
          </div>
          <div className="max-w-lg mx-auto space-y-4">
            {services.map((service) => (
              <div key={service.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">{service.name}</span>
                  <span className="text-gray-500">{service.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${service.color} h-3 rounded-full transition-all`}
                    style={{ width: `${service.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">FORMATION PRICING TABLES</h3>
          <hr className="mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan) => (
              <div key={plan.tier} className="card p-8 text-center">
                <h4 className="text-xl font-bold mb-2">{plan.tier}</h4>
                <h5 className="text-3xl font-bold text-amber-600 mb-6">{plan.price}</h5>
                <ul className="space-y-2 mb-8 text-gray-600">
                  {plan.options.map((option) => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
                <button className="btn-primary w-full">SIGN UP</button>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">CLIENTS FEEDBACK</h3>
          <hr className="mb-8" />
          <div className="grid md:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div key={client.name} className="text-center">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h5 className="font-bold mb-2">{client.name}</h5>
                <q className="text-gray-600 text-sm">{client.quote}</q>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
