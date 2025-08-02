"use client"
import { useRouter } from 'next/navigation';
import { useFormStore } from "../lib/store";
import { generatePdf } from "../lib/pdfGenerator";
import { useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const router = useRouter();
  const { data: formData, setData } = useFormStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email format';
      }
    }

    // phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleViewPDF = () => {
    if (validateForm()) {
      router.push('/preview');
    }
  };

  const handleDownloadPDF = () => {
    if (validateForm()) {
      generatePdf(formData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleViewPDF();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl">
        <div className=" rounded-2xl w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Add Your details</h1>

          <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
            {/* name field */}
            <div className="relative">
              <div className={`flex items-center bg-gray-50 rounded-xl p-1 border  shadow-md ${errors.name ? 'border-red-500' : 'border-gray-200'} focus-within:border-gray-300 focus-within:bg-white transition-colors`}>
                <Image src={"/icons/user.svg"} alt='user-svg' width={8} height={8} className="w-6 h-6 mx-4 flex-shrink-0 mr-6" />
                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-900 ">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-amber-00 text-md font-bold"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>}
            </div>

            {/* email field */}
            <div className="relative">
              <div className={`flex items-center bg-gray-50 rounded-xl p-1 border shadow-md ${errors.email ? 'border-red-500' : 'border-gray-200'} focus-within:border-gray-300 focus-within:bg-white transition-colors`}>
                <Image src={"/icons/mail.svg"} alt='mail-svg' width={7} height={7} className="w-6 h-6 mx-4 flex-shrink-0 mr-6" />
                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-900">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-amber-00 text-md font-bold"
                    placeholder="e.g. Johndoe@gmail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
            </div>

            {/* phone field */}
            <div className="relative">
              <div className={`flex items-center bg-gray-50 rounded-xl p-1 border shadow-md ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus-within:border-gray-300 focus-within:bg-white transition-colors`}>
                <Image src={"/icons/phone-call.svg"} alt='phone-svg' width={8} height={8} className="w-6 h-6 mx-4 flex-shrink-0 mr-6" />
                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-900">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-none outline-none text-gray-600  placeholder-amber-00 text-md font-bold"
                    placeholder="e.g. (220) 222 -20002"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>}
            </div>

            {/* position field */}
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border shadow-md border-gray-200 focus-within:border-gray-300 focus-within:bg-white transition-colors">
                <Image src={"/icons/position.svg"} alt='position-svg' width={8} height={8} className="w-6 h-6 mx-4 flex-shrink-0 mr-6" />
                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-900">Position</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-none outline-none text-gray-600 placeholder-amber-00 text-md font-bold"
                    placeholder="e.g. Junior Front end Developer"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* description field */}
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border shadow-md border-gray-200 focus-within:border-gray-300 focus-within:bg-white transition-colors">
                <Image src={"/icons/Description.svg"} alt='description-svg' width={8} height={8} className="w-6 h-6 mx-4 flex-shrink-0 mr-6" />
                <div className="flex-1">
                  <label className="block text-lg font-bold text-gray-900">Description</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-none outline-none text-gray-600  placeholder-amber-00 text-md font-bold"
                    placeholder="e.g. Work experiences"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="button"
                onClick={handleViewPDF}
                className="text-xl flex-1 bg-[#5a8b73] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#4a7561] transition-colors duration-200 cursor-pointer"
              >
                View PDF
              </button>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="text-xl flex-1 bg-[#5a8b73] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#4a7561] transition-colors duration-200 flex items-center justify-center cursor-pointer"
              >
                <Image src={"/icons/Download.svg"} alt='download-svg' width={16} height={16} className="mr-2 w-6 h-6" />
                Download PDF
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;