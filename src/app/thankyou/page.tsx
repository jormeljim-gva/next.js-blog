import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center mt-16">
      <div className="text-center max-w-md mx-auto px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your message has been sent successfully. We will get back to you as soon as possible.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
