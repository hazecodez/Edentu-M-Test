// Utilities/ReactToPDF.js
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

// Function to generate PDF of the component
export const handleGeneratePDF = async (componentRef, fileName = "document") => {
  const element = componentRef.current;

  if (!element) {
    toast.error("No content to generate PDF.");
    return;
  }

  const options = {
    margin: 0.5,
    filename: `${fileName}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  try {
    await html2pdf()
      .from(element)
      .set(options)
      .save()
      .then(() => {
        toast.success(`${fileName}.pdf saved successfully.`);
      });
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
