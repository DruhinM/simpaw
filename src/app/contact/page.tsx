'use client';

import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface StatusInfo {
  error: boolean;
  msg: string | null;
}

interface Status {
  submitted: boolean;
  submitting: boolean;
  info: StatusInfo;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg },
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    
    // Here you would typically send the form data to your backend
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      handleServerResponse(true, 'Thank you for contacting us! We will get back to you soon.');
    }, 2000);
  };

  return (
    <div className="pt-24 pb-16 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            We&apos;d love to hear from you. Please fill out this form or use our contact information below.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 grid grid-cols-1 gap-x-8 gap-y-20 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="lg:pr-8">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">Get in Touch</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                We&apos;re here to help and answer any question you might have
              </p>
              
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    123 Pet Street
                    <br />
                    Bangalore, Karnataka 560001
                    <br />
                    India
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="tel:+91 1234567890">
                      +91 1234567890
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    <a className="hover:text-gray-900" href="mailto:druhin.mukherjee@gmail.com">
                      druhin.mukherjee@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <ClockIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                  </dt>
                  <dd>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="max-w-xl lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                  Subject
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                disabled={status.submitting}
                className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
              >
                {status.submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
            {status.info.error && (
              <div className="mt-3 text-sm text-red-600">
                Error: {status.info.msg}
              </div>
            )}
            {status.submitted && (
              <div className="mt-3 text-sm text-green-600">
                {status.info.msg}
              </div>
            )}
          </form>
        </div>

        {/* Map Section */}
        <div className="mt-16 rounded-lg overflow-hidden">
          <iframe
            title="Simpaw Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d77.6309395!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1656951234567!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
} 