import jsPDF from 'jspdf';
import { FormData } from './store';

export const generatePdf = (formData: FormData) => {
  const pdf = new jsPDF('p', 'pt', 'a4');
  
  // pdf dimensions
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - (margin * 2);
  
  let yPosition = margin + 20;
  
  // helper function to add text with word wrapping
  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12) => {
    pdf.setFontSize(fontSize);
    const lines = pdf.splitTextToSize(text, maxWidth);
    pdf.text(lines, x, y);
    return y + (lines.length * fontSize * 1.2);
  };
  
  try {
    // title
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(51, 51, 51);
    pdf.text('Resume Details', pageWidth / 2, yPosition, { align: 'center' });
    
    // underline for title
    const titleWidth = pdf.getTextWidth('Resume Details');
    pdf.setLineWidth(2);
    pdf.setDrawColor(22, 160, 133); 
    pdf.line((pageWidth - titleWidth) / 2, yPosition + 5, (pageWidth + titleWidth) / 2, yPosition + 5);
    
    yPosition += 50;
    
    // reset font for content
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(68, 68, 68); 
    
    // name
    pdf.setFont('helvetica', 'bold');
    pdf.text('Name:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    yPosition = addText(formData.name || 'N/A', margin + 120, yPosition, contentWidth - 120, 14);
    yPosition += 20;
    
    // email
    pdf.setTextColor(68, 68, 68);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Email:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    yPosition = addText(formData.email || 'N/A', margin + 120, yPosition, contentWidth - 120, 14);
    yPosition += 20;
    
    // phone Number
    pdf.setTextColor(68, 68, 68);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Phone Number:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    yPosition = addText(formData.phone || 'N/A', margin + 120, yPosition, contentWidth - 120, 14);
    yPosition += 20;
    
    // position
    pdf.setTextColor(68, 68, 68);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Position:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    yPosition = addText(formData.position || 'N/A', margin + 120, yPosition, contentWidth - 120, 14);
    yPosition += 20;
    
    // description
    pdf.setTextColor(68, 68, 68);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Description:', margin, yPosition);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(102, 102, 102);
    yPosition = addText(formData.description || 'N/A', margin + 120, yPosition, contentWidth - 120, 14);
    yPosition += 40;
    
    // footer line
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(224, 224, 224);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 20;
    
    // generation date
    pdf.setFontSize(10);
    pdf.setTextColor(136, 136, 136);
    pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    // generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `resume_${formData.name ? formData.name.replace(/\s+/g, '_').toLowerCase() : 'details'}_${timestamp}.pdf`;
    
    // save the PDF
    pdf.save(filename);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};