'use client';

import { useRouter } from 'next/navigation';
import { useFormStore } from '../../lib/store';
import { generatePdf } from '../../lib/pdfGenerator';
import Image from 'next/image';

interface DetailRowProps {
  label: string;
  value: string;
}

export default function PreviewPage() {
  const router = useRouter();
  const { data: formData } = useFormStore();

  const handleDownloadPdf = () => {
    generatePdf(formData);
  };

  const DetailRow = ({ label, value }: DetailRowProps) => (
    <div className="flex py-4 border-b border-gray-200 last:border-b-0">
      <p className="w-1/3 font-bold text-gray-900 text-xl">{label}:</p>
      <p className="w-2/3 text-gray-400 whitespace-pre-wrap break-words text-lg font-medium">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl">
        <button 
          onClick={() => router.back()} 
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors cursor-pointer"
        >
          <Image src={"/icons/chevron-left.svg"} alt='mail-svg' width={7} height={7} className="w-12 h-12 mx-4 flex-shrink-0 mr-12" />
        </button>
        
      </div>
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md border border-black overflow-hidden">
          <div id="pdf-preview-content" className="p-8 md:p-12">
            <DetailRow label="Name" value={formData.name || 'John Doe'} />
            <DetailRow label="Email" value={formData.email || 'Johndoe@gmail.com'} />
            <DetailRow label="Phone Number" value={formData.phone || '+222 223 2221'} />
            <DetailRow label="Position" value={formData.position || 'Junior Frontend Developer'} />
            <DetailRow 
              label="Description" 
              value={formData.description || 'Frontend Developer with 3 years of experience in creating responsive and user-friendly web interfaces using HTML, CSS, and JavaScript. Skilled in modern frameworks like React and committed to delivering clean, efficient code.'} 
            />
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={handleDownloadPdf} 
            className="text-2xl transition-colors duration-200 flex items-center justify-center w-full  mx-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex-1 bg-[#5a8b73] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#4a7561] cursor-pointer"
          >
            <Image src={"/icons/Download.svg"} alt='mail-svg' width={10} height={10} className="w-8 h-8 flex-shrink-0 mr-6" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}