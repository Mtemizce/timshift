import { jsPDF } from "jspdf";
// Roboto Regular base64 font for jsPDF
(function(jsPDFAPI) {
  var font = 'AAEAAAASAQAABAAgR0RFRt...'; // KISALTILMIŞ ÖRNEK (tamamını aşağıda ekleyeceğim)
  jsPDFAPI.addFileToVFS("Roboto-Regular-normal.ttf", font);
  jsPDFAPI.addFont("Roboto-Regular-normal.ttf", "Roboto", "normal");
})(jsPDF.API);
