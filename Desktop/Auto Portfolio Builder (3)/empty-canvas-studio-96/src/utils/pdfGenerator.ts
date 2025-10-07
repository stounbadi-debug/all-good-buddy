import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ProfileData {
  name?: string;
  description?: string;
  biography?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  image?: string;
  skills?: string[];
  knownFor?: Array<{ title: string; year?: string; rating?: string }>;
  filmography?: Array<{ title: string; year?: string; type?: string }>;
  personalDetails?: {
    birthDate?: string;
    birthPlace?: string;
    height?: string;
  };
  confidence?: number;
  sourceUrl?: string;
  generatedAt?: string;
}

export class PDFGenerator {
  static async generateProfilePDF(profileData: ProfileData): Promise<void> {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Set up fonts and colors
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(24);
      pdf.setTextColor(44, 82, 130); // Professional blue

      // Title
      const title = `${profileData.name || 'Profile'} - Portfolio`;
      pdf.text(title, 20, yPosition);
      yPosition += 15;

      // Subtitle
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, yPosition);
      yPosition += 20;

      // Profile Header
      if (profileData.name) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.setTextColor(0, 0, 0);
        pdf.text(profileData.name, 20, yPosition);
        yPosition += 10;

        if (profileData.jobTitle) {
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(14);
          pdf.setTextColor(60, 60, 60);
          pdf.text(profileData.jobTitle, 20, yPosition);
          yPosition += 8;
        }

        if (profileData.location) {
          pdf.setFontSize(12);
          pdf.text(`Location: ${profileData.location}`, 20, yPosition);
          yPosition += 15;
        }
      }

      // Personal Details
      if (profileData.personalDetails) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(44, 82, 130);
        pdf.text('Personal Information', 20, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);

        if (profileData.personalDetails.birthDate) {
          pdf.text(`Birth Date: ${profileData.personalDetails.birthDate}`, 20, yPosition);
          yPosition += 6;
        }
        if (profileData.personalDetails.birthPlace) {
          pdf.text(`Birth Place: ${profileData.personalDetails.birthPlace}`, 20, yPosition);
          yPosition += 6;
        }
        if (profileData.personalDetails.height) {
          pdf.text(`Height: ${profileData.personalDetails.height}`, 20, yPosition);
          yPosition += 6;
        }
        yPosition += 10;
      }

      // Biography
      if (profileData.biography || profileData.description) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(44, 82, 130);
        pdf.text('Biography', 20, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);

        const bio = profileData.biography || profileData.description || '';
        const bioLines = pdf.splitTextToSize(bio, pageWidth - 40);
        
        for (let i = 0; i < bioLines.length; i++) {
          if (yPosition > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(bioLines[i], 20, yPosition);
          yPosition += 5;
        }
        yPosition += 10;
      }

      // Known For
      if (profileData.knownFor && profileData.knownFor.length > 0) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(44, 82, 130);
        pdf.text('Known For', 20, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);

        profileData.knownFor.slice(0, 10).forEach((item) => {
          if (yPosition > pageHeight - 15) {
            pdf.addPage();
            yPosition = 20;
          }
          const text = `• ${item.title}${item.year ? ` (${item.year})` : ''}${item.rating ? ` - ${item.rating}★` : ''}`;
          pdf.text(text, 25, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }

      // Filmography
      if (profileData.filmography && profileData.filmography.length > 0) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(44, 82, 130);
        pdf.text('Recent Filmography', 20, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);

        profileData.filmography.slice(0, 15).forEach((item) => {
          if (yPosition > pageHeight - 15) {
            pdf.addPage();
            yPosition = 20;
          }
          const text = `• ${item.title}${item.year ? ` (${item.year})` : ''}${item.type ? ` - ${item.type}` : ''}`;
          pdf.text(text, 25, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }

      // Skills
      if (profileData.skills && profileData.skills.length > 0) {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(14);
        pdf.setTextColor(44, 82, 130);
        pdf.text('Skills & Expertise', 20, yPosition);
        yPosition += 8;

        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);

        const skillsText = profileData.skills.join(' • ');
        const skillsLines = pdf.splitTextToSize(skillsText, pageWidth - 40);
        
        skillsLines.forEach((line: string) => {
          if (yPosition > pageHeight - 15) {
            pdf.addPage();
            yPosition = 20;
          }
          pdf.text(line, 20, yPosition);
          yPosition += 6;
        });
        yPosition += 10;
      }

      // Footer
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated by Auto Portfolio Builder • Confidence: ${Math.round((profileData.confidence || 0) * 100)}%`, 20, pageHeight - 10);
      pdf.text(`Source: ${profileData.sourceUrl || 'N/A'}`, 20, pageHeight - 5);

      // Save the PDF
      const fileName = `${(profileData.name || 'profile').replace(/[^a-zA-Z0-9]/g, '_')}_portfolio.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error('Failed to generate PDF');
    }
  }

  static async generateAdvancedPDF(profileData: ProfileData, elementId?: string): Promise<void> {
    try {
      if (elementId) {
        // Capture the profile card as image and convert to PDF
        const element = document.getElementById(elementId);
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 10;

          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          
          const fileName = `${(profileData.name || 'profile').replace(/[^a-zA-Z0-9]/g, '_')}_visual_portfolio.pdf`;
          pdf.save(fileName);
          return;
        }
      }
      
      // Fallback to text-based PDF
      await this.generateProfilePDF(profileData);
      
    } catch (error) {
      console.error('Advanced PDF generation error:', error);
      // Fallback to basic PDF
      await this.generateProfilePDF(profileData);
    }
  }
}

