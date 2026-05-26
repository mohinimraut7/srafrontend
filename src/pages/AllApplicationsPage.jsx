// import { useState, useEffect } from "react"
// import { Eye, Search, Download,X,ChevronLeft,ChevronRight,Plus,Edit } from "lucide-react"
// import AddApplicationForm from './AddApplicationForm';
// import EditApplicationForm from './EditApplicationForm';
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import html2canvas from 'html2canvas'

// import './AllApplicationsPage.css';


//   const BASE_URL = import.meta.env.VITE_BASE_URL;
//  const DOCUMENT_BASE_URL = import.meta.env.VITE_BASE_URL


// const isAuthenticated = () => {
//   if (typeof window === "undefined") return false
//   const token = localStorage.getItem("authToken")
//   return !!token
// }

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }



// const AllApplicationsPage = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [selectedApplication, setSelectedApplication] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [selectedDocument, setSelectedDocument] = useState(null)
//   const [showDocumentModal, setShowDocumentModal] = useState(false)
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)
//   const [success, setSuccess] = useState(null)
//   const [showEditForm, setShowEditForm] = useState(false)
//   const [editingApplication, setEditingApplication] = useState(null)

//   // Filter states
//   const [hutUseFilter, setHutUseFilter] = useState("")
//   const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

//  let role = null;
// let user_id = null;

// if (typeof window !== "undefined") {
//   const userData = localStorage.getItem("user");
//   if (userData) {
//     const parsedUser = JSON.parse(userData);
//     role = parsedUser?.role;
//     user_id = parsedUser?.id;
//   }
// }

//   const getStatusCounts = () => {
//     const statusMappings = {
//       'Pending': ['pending', 'pendding', 'panding'],
//       'Completed': ['completed', 'complete', 'complated'],
//       'Ready For Survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
//       'Hut Appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose'],
//       'Hut Denied': ['hut denied', 'hut_denied', 'hutdenied', 'hut deny', 'rejected', 'reject']
//     }

//     const counts = {
//       pending: 0,
//       completed: 0,
//       hutAppose: 0,
//       hutDenied: 0
//     }

//     applications.forEach(app => {
//       const status = app.survey_status || ''
//       const statusLower = status.toLowerCase().trim()

//       if (!status || statusMappings['Pending'].includes(statusLower)) {
//         counts.pending++
//       }
//       else if (statusMappings['Completed'].includes(statusLower)) {
//         counts.completed++
//       }
//       else if (statusMappings['Hut Appose'].includes(statusLower)) {
//         counts.hutAppose++
//       }
//       else if (statusMappings['Hut Denied'].includes(statusLower)) {
//         counts.hutDenied++
//       }
//       else {
//         counts.pending++
//       }
//     })

//     return counts
//   }

//   const statusCounts = getStatusCounts()

//   const parseOriginalPath = (originalPath) => {
//     if (!originalPath) return []
//     try {
//       if (Array.isArray(originalPath)) return originalPath
//       if (originalPath.startsWith('[') && originalPath.endsWith(']')) {
//         return JSON.parse(originalPath)
//       }
//       return [originalPath]
//     } catch (e) {
//       console.error('Error parsing originalPath:', e)
//       return [originalPath]
//     }
//   }

//   const extractDocumentPath = (fullPath) => {
//     if (!fullPath) return null
//     const uploadsIndex = fullPath.indexOf("/uploads")
//     if (uploadsIndex !== -1) {
//       return fullPath.substring(uploadsIndex)
//     }
//     return fullPath
//   }

// const handleDownloadExcel = () => {
//   if (filteredApplications.length === 0) {
//     alert("No data available!");
//     return;
//   }

//   const excelData = filteredApplications.map((app, index) => ({
//     "Serial No": index + 1,
//     "Cluster Number": app.cluster_number || "",
//     "Hut ID": app.slum_id || "",
//     "Name": `${app.first_name || ""} ${app.last_name || ""}`,
//     "Use of Hut": app.slum_use || "",
//     "Area": app.area_sq_m || "",
//     "Status": app.survey_status || "Pending"
//   }));

//   const ws = XLSX.utils.json_to_sheet(excelData, { origin: "A4" });
//   XLSX.utils.sheet_add_aoa(ws, [["BMC Applications Report"]], { origin: "A1" });
//   XLSX.utils.sheet_add_aoa(ws, [[`Total Records: ${filteredApplications.length}`]], { origin: "A2" });

//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Applications");
//   XLSX.writeFile(wb, "BMC_Applications.xlsx");
// };

// const handleDownloadPDF = () => {
//   if (filteredApplications.length === 0) {
//     alert("No data available!");
//     return;
//   }

//   const doc = new jsPDF("landscape");
//   doc.setFontSize(16);
//   doc.text("BMC Applications Report", 14, 15);
//   doc.setFontSize(10);
//   doc.text(`Total Records: ${filteredApplications.length}`, 14, 22);

//   const tableData = filteredApplications.map((app, index) => ([
//     index + 1,
//     app.cluster_number || "",
//     app.slum_id || "",
//     `${app.first_name || ""} ${app.last_name || ""}`,
//     app.slum_use || "",
//     app.area_sq_m || "",
//     app.survey_status || "Pending"
//   ]));

//   autoTable(doc, {
//     head: [["Sr", "Cluster", "Hut ID", "Name", "Use", "Area", "Status"]],
//     body: tableData,
//     startY: 28,
//     styles: { fontSize: 8 },
//     headStyles: { fillColor: [249, 115, 22] }
//   });

//   doc.save("BMC_Applications.pdf");
// };


// // ===== Row Helpers =====
// const createRow = (label, value) => `
// <tr>
//   <td style="border:1px solid #000;padding:6px;width:40%;font-weight:bold;background:#fafafa;">
//     ${label}
//   </td>
//   <td style="border:1px solid #000;padding:6px;">
//     ${value || "-"}
//   </td>
// </tr>
// `;

// const createDocRow = (sr, name, before, current, after, page) => `
// <tr>
//   <td style="border:1px solid #000;padding:6px;text-align:center;">${sr}</td>
//   <td style="border:1px solid #000;padding:6px;">${name}</td>
//   <td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${before}</td>
//   <td style="border:1px solid #000;padding:6px;text-align:center;">${current}</td>
//   <td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${after}</td>
//   <td style="border:1px solid #000;padding:6px;text-align:center;">${page}</td>
// </tr>
// `;


// // ✅ INDEX PDF — html2canvas + jsPDF (html2pdf नाही)
// const generateIndexPDF = (app) => {
//   const fullName = `${app.first_name || ""} ${app.middle_name || ""} ${app.last_name || ""}`;
//   const hutSurveyId = app.hut_id || `${app.slum_id || "NA"}-${app.cluster_number || "NA"}-${app.id}`;
//   const hasBefore2000 = app.doc_before_2000 || app.submitted_docs_before_2000;
//   const hasAfter2000 = app.after_2000_proof_submitted;
//   const beforeTick = hasBefore2000 ? "✔" : "";
//   const afterTick = !hasBefore2000 && hasAfter2000 ? "✔" : "";

//   const pdfElement = document.createElement("div");
//   pdfElement.style.cssText = `width:750px;padding:20px;font-family:Georgia,serif;font-size:12px;color:#000;background:white;position:absolute;top:-9999px;left:-9999px;`;

//   pdfElement.innerHTML = `
//   <div>
//     <h2 style="text-align:center;margin-bottom:15px;letter-spacing:1px;border-bottom:2px solid #000;padding-bottom:6px;">INDEX</h2>
//     <table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:10px;">
//       ${createRow("Hut Survey ID", hutSurveyId)}
//       ${createRow("RFS ID", app.id)}
//       ${createRow("Cluster ID", app.cluster_number)}
//       ${createRow("Scheme", app.municipal_corporation)}
//       ${createRow("Use of Hut", app.slum_use)}
//       ${createRow("Village", app.village)}
//       ${createRow("Slum", app.slum_name)}
//       ${createRow("Hut Owner", fullName)}
//       ${createRow("Floor No", app.slum_floor)}
//       ${createRow("Hut Area", app.area_sq_m)}
//       ${createRow("UID No", app.aadhaar_number)}
//       ${createRow("Address", app.current_address)}
//     </table>
//     <br/>
//     <table style="width:100%;border-collapse:collapse;font-size:11px;">
//       <tr style="background:#f2f2f2;font-weight:bold;text-align:center;">
//         <th style="border:1px solid #000;padding:5px;">Sr No</th>
//         <th style="border:1px solid #000;padding:5px;">Document Name</th>
//         <th style="border:1px solid #000;padding:5px;">Before 1/1/2000</th>
//         <th style="border:1px solid #000;padding:5px;">Current Year</th>
//         <th style="border:1px solid #000;padding:5px;">After 2000</th>
//         <th style="border:1px solid #000;padding:5px;">Page No</th>
//       </tr>
//       ${createDocRow("A", "Before 1/1/2000 Proof Document", beforeTick, "", "", "")}
//       ${createDocRow("B", "After 2000 Proof Document", "", "", afterTick, "")}
//       ${createDocRow("C", "Possession Document", "", "", "", "")}
//       ${createDocRow("D", "Self Declaration", "", "", "", "")}
//       ${createDocRow("E", "Ration Card", "", "", "", "")}
//       ${createDocRow("F", "Sale Agreement", "", "", "", "")}
//     </table>
//     <div style="margin-top:50px;text-align:right;font-weight:bold;font-size:12px;">Scrutiny Cell Officer</div>
//   </div>`;

//   document.body.appendChild(pdfElement);

//   setTimeout(() => {
//     html2canvas(pdfElement, {
//       scale: 1,
//       useCORS: true,
//       allowTaint: true,
//       logging: false,
//       backgroundColor: '#ffffff'
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/jpeg", 0.8);
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const pageHeight = pdf.internal.pageSize.getHeight();
//       const imgHeight = (canvas.height * pageWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;
//       pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save(`INDEX_${hutSurveyId}.pdf`);
//       if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//     }).catch((err) => {
//       console.error("Index PDF error:", err);
//       if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//     });
//   }, 300);
// };


// const getDocumentUrl = (documentPath) => {
//     if (!documentPath) return null
//     const cleanPath = extractDocumentPath(documentPath)
//     return cleanPath ? `${DOCUMENT_BASE_URL}${cleanPath}` : null
//   }

//   const getFileExtension = (filePath) => {
//     if (!filePath) return ""
//     return filePath.split(".").pop().toLowerCase()
//   }

//   const isImageFile = (filePath) => {
//     const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"]
//     return imageExtensions.includes(getFileExtension(filePath))
//   }

//   const isVideoFile = (filePath) => {
//     const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm"]
//     return videoExtensions.includes(getFileExtension(filePath))
//   }

//   const isPdfFile = (filePath) => {
//     return getFileExtension(filePath) === "pdf"
//   }

//   const downloadFile = (url, filename) => {
//     if (!url) {
//       alert("File URL not available")
//       return
//     }
//     const link = document.createElement('a')
//     link.href = url
//     link.download = filename || 'document'
//     link.target = '_blank'
//     link.rel = 'noopener noreferrer'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }


// // ✅ Jodpatra-3 PDF Generator — html2canvas + jsPDF
// const generateJodpatra3 = async (data) => {
//   return new Promise((resolve, reject) => {
//     const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

//     const rawImageSrc = data?.photo_self_path?.startsWith("http")
//       ? data.photo_self_path
//       : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

//     const imageSrc = data?.photo_self_path
//       ? `${BASE_URL}/api/proxy-image?url=${encodeURIComponent(rawImageSrc)}`
//       : "/user2.png";

//     const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
//       return data[`family_member${n}_name`] ||
//              data[`family_member${n}_age`] ||
//              data[`family_member${n}_relation`] ||
//              data[`family_member${n}_gender`] ||
//              data[`family_member${n}_aadhaar`];
//     }).length;

//     const preloadImage = (src) =>
//       new Promise((resolve, reject) => {
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = src;
//         img.onload = () => resolve(img);
//         img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//       });

//     preloadImage(imageSrc)
//       .then(() => {
//         const pdfElement = document.createElement("div");
//         pdfElement.style.width = "210mm";
//         pdfElement.style.minHeight = "297mm";
//         pdfElement.style.padding = "15mm";
//         pdfElement.style.fontFamily = "Arial, sans-serif";
//         pdfElement.style.fontSize = "12px";
//         pdfElement.style.lineHeight = "1.4";
//         pdfElement.style.backgroundColor = "white";
//         pdfElement.style.position = "absolute";
//         pdfElement.style.top = "-9999px";

//         pdfElement.innerHTML = `
//           <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//             <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//             <hr style="margin: 8px 0; border: 1px solid #000;">
//             <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//             <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//             <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//               <tr>
//                 <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
//                 <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//               </tr>
//             </table>
//           </div>

//           <div style="text-align: left; margin-bottom: 20px;">
//             <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//               <img src="${imageSrc}" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" crossOrigin="Anonymous" />
//             </div>
//             <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
//             <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.hut_id || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.hut_name || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""}</td></tr>
//             </table>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//             <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${totalMembers || ""} सदस्य</td>
//               </tr>
//             </table>
//             <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//               <tr>
//                 <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//                 <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//                 <th style="border: 1px solid #000; padding: 4px;">वय</th>
//                 <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//                 <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//                 <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//               </tr>
//              ${[1, 2, 3, 4, 5, 6].map((n) => {
//   const name = data[`family_member${n}_name`];
//   const age = data[`family_member${n}_age`];
//   const relation = data[`family_member${n}_relation`];
//   const gender = data[`family_member${n}_gender`];
//   const aadhaar = data[`family_member${n}_aadhaar`];
//   if (!name && !age && !relation && !gender && !aadhaar) return "";
//   return `
//     <tr>
//       <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
//       <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
//       <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
//       <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
//       <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
//       <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
//     </tr>`;
// }).join("")}
//             </table>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//             <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">लांबी (मीटर):</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.length || ""}</td>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">रुंदी (मीटर):</td>
//                 <td style="border: 1px solid #000; padding: 5px;">${data.width || ""}</td>
//               </tr>
//               <tr>
//                 <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
//                 <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//               </tr>
//             </table>
//           </div>

//           <div style="margin-bottom: 20px;">
//             <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//             <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">बँकेचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.bank_name || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td></tr>
//               <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td></tr>
//             </table>
//           </div>

//           <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//             <div style="text-align: center;">
//               <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//                 <img src="/thumb1.png" alt="Signature" style="width: 100%; height: 100%; object-fit: cover;" />
//               </div>
//               <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             </div>
//           </div>

//           <div style="text-align: center; border-top: 1px solid #000; padding-top: 10px;">
//             <p style="font-size: 10px; margin: 2px 0;">संपर्क माहिती:</p>
//             <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//             <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//             <p style="font-size: 9px; color: #777; margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//             <p style="font-size: 9px; color: #777; margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//           </div>
//         `;

//         document.body.appendChild(pdfElement);

//         setTimeout(() => {
//           html2canvas(pdfElement, {
//             scale: 1.5,
//             useCORS: true,
//             allowTaint: true,
//             logging: false,
//             windowWidth: 794,
//             windowHeight: 1123,
//             backgroundColor: '#ffffff'
//           })
//             .then((canvas) => {
//               const imgData = canvas.toDataURL("image/jpeg", 0.85);
//               const pdf = new jsPDF("p", "mm", "a4");
//               const pageWidth = pdf.internal.pageSize.getWidth();
//               const pageHeight = pdf.internal.pageSize.getHeight();
//               const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//               let heightLeft = canvasHeight;
//               let position = 0;
//               pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight);
//               heightLeft -= pageHeight;

//               while (heightLeft > 0) {
//                 position = heightLeft - canvasHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight);
//                 heightLeft -= pageHeight;
//               }

//               pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}.pdf`);
//               if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//               resolve(true);
//             })
//             .catch((err) => {
//               if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//               reject(err);
//             });
//         }, 1000);
//       })
//       .catch((err) => {
//         console.error("Applicant image load failed:", err);
//         const fallbackImg = `${baseUrl}/user2.png`;
//         data.photo_self_path = fallbackImg;
//         generateJodpatra3(data);
//       });
//   });
// };


// // ✅ Jodpatra-4 PDF Generator — html2canvas + jsPDF
// const generateJodpatra4 = async (data) => {
//   return new Promise((resolve, reject) => {
//     const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

//     const preloadImage = (src) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = src;
//         img.onload = () => resolve(img);
//         img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
//       });
//     };

//     const rawImageSrc = data?.photo_self_path?.startsWith("http")
//       ? data.photo_self_path
//       : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

//     const imageSrc = data?.photo_self_path
//       ? `${BASE_URL}/api/proxy-image?url=${encodeURIComponent(rawImageSrc)}`
//       : "/user2.png";

//     const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
//       return data[`family_member${n}_name`] ||
//              data[`family_member${n}_age`] ||
//              data[`family_member${n}_relation`] ||
//              data[`family_member${n}_gender`] ||
//              data[`family_member${n}_aadhaar`];
//     }).length;

//     const pdfElement = document.createElement("div");
//     pdfElement.style.width = "210mm";
//     pdfElement.style.minHeight = "297mm";
//     pdfElement.style.padding = "15mm";
//     pdfElement.style.fontFamily = "Arial, sans-serif";
//     pdfElement.style.fontSize = "12px";
//     pdfElement.style.lineHeight = "1.4";
//     pdfElement.style.backgroundColor = "white";
//     pdfElement.style.position = "absolute";
//     pdfElement.style.top = "-9999px";

//     const buildHTML = (imgSrc) => `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या रहात असल्यास करावयाचा अर्ज</p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="text-align: left; margin-bottom: 20px;">
//         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//           <img src="${imgSrc}" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" crossOrigin="Anonymous" />
//         </div>
//         <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.hut_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${totalMembers || ""} सदस्य</td>
//           </tr>
//         </table>
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr>
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${[1, 2, 3, 4, 5, 6].map((n) => {
//             const name = data[`family_member${n}_name`];
//             const age = data[`family_member${n}_age`];
//             const relation = data[`family_member${n}_relation`];
//             const gender = data[`family_member${n}_gender`];
//             const aadhaar = data[`family_member${n}_aadhaar`];
//             if (!name && !age && !relation && !gender && !aadhaar) return "";
//             return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
//               </tr>`;
//           }).join("")}
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
//             <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//           </tr>
//         </table>
//       </div>

//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
//           </tr>
//         </table>
//       </div>

//       <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//             <img src="/thumb1.png" alt="Signature" style="width: 100%; height: 100%; object-fit: cover;" />
//           </div>
//           <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//           <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//         </div>
//       </div>

//       <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
//         <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
//         <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//         <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//       </div>

//       <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
//         <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//         <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//       </div>
//     `;

//     const savePDF = () => {
//       return new Promise((res, rej) => {
//         setTimeout(() => {
//           html2canvas(pdfElement, {
//             scale: 1.5,
//             useCORS: true,
//             allowTaint: true,
//             logging: false,
//             windowWidth: 794,
//             windowHeight: 1123,
//             backgroundColor: '#ffffff'
//           })
//             .then((canvas) => {
//               const imgData = canvas.toDataURL("image/jpeg", 0.85);
//               const pdf = new jsPDF("p", "mm", "a4");
//               const pageWidth = pdf.internal.pageSize.getWidth();
//               const pageHeight = pdf.internal.pageSize.getHeight();
//               const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//               let heightLeft = canvasHeight;
//               let position = 0;
//               pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight);
//               heightLeft -= pageHeight;

//               while (heightLeft > 0) {
//                 position = heightLeft - canvasHeight;
//                 pdf.addPage();
//                 pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight);
//                 heightLeft -= pageHeight;
//               }

//               pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}.pdf`);
//               if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//               res(true);
//             })
//             .catch((err) => {
//               if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement);
//               rej(err);
//             });
//         }, 1000);
//       });
//     };

//     preloadImage(imageSrc)
//       .then(() => {
//         pdfElement.innerHTML = buildHTML(imageSrc);
//         document.body.appendChild(pdfElement);
//         savePDF().then(resolve).catch(reject);
//       })
//       .catch(() => {
//         console.warn("Image CORS failed, using fallback /user2.png");
//         pdfElement.innerHTML = buildHTML("/user2.png");
//         document.body.appendChild(pdfElement);
//         savePDF().then(resolve).catch(reject);
//       });
//   });
// };


// const generateAndDownloadPdfs = async (formData) => {
//     console.log("testing form data>>>>>>>>>>>", formData)
//     setGeneratingPdfs(true);
//     setError(null);

//     try {
//       const dateStr = formData.residency_since;
//       console.log("Residency date string:", dateStr);

//     //   if (!dateStr || dateStr === null || dateStr === undefined || dateStr.trim() === "") {
//     //     setError("Residency date not found for this application.");
//     //     return;
//     //   }


// if (!dateStr || dateStr === null || dateStr === undefined || dateStr.trim() === "") {
//   // residency_since नसेल तर default Jodpatra-3 generate करा
//   setSuccess("Generating Jodpatra-3 (residency date not available)...");
//   await generateJodpatra3(formData);
//   setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
//   return;
// }


//       let isJodpatra3 = false;

//       if (dateStr === "00-00-0000") {
//         isJodpatra3 = true;
//       } else {
//         const parts = dateStr.split("-");
//         if (parts.length !== 3) {
//           isJodpatra3 = true;
//         } else {
//           const [day, month, year] = parts.map(Number);
//           const selectedDate = new Date(year, month - 1, day);
//           const cutoffDate = new Date(2000, 0, 1);
//           if (selectedDate <= cutoffDate) {
//             isJodpatra3 = true;
//           }
//         }
//       }

//       if (isJodpatra3) {
//         setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
//         await generateJodpatra3(formData);
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
//       } else {
//         setSuccess("Generating Jodpatra-4 for residency after 2000...");
//         await generateJodpatra4(formData);
//         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
//       }
//     } catch (error) {
//       console.error("Error generating PDFs:", error);
//       setError("Error generating PDFs: " + error.message);
//     } finally {
//       setTimeout(() => {
//         setGeneratingPdfs(false);
//         setSuccess(null);
//       }, 3000);
//     }
//   };


// const fetchApplications = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const response = await fetch(`${BASE_URL}/api/sra-logs/all-logs`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       if (!response.ok) {
//         if (response.status === 401) {
//           throw new Error("Authentication failed. Please login again.")
//         }
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const data = await response.json()
//       setApplications(data)
//     } catch (err) {
//       console.error("Error fetching applications:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchApplications()
//   }, [])


// const filteredApplications = applications
//   .filter((app) => {
//     if (role === "surveyor") {
//       return Number(app.submittedBy) === Number(user_id)
//     }
//     return true
//   })
//   .filter((app) => {
//     const searchString = searchTerm.toLowerCase()
//     const matchesSearch =
//       searchTerm === "" ||
//       (app.first_name && app.first_name.toLowerCase().includes(searchString)) ||
//       (app.last_name && app.last_name.toLowerCase().includes(searchString)) ||
//       (app.slum_id && app.slum_id.toLowerCase().includes(searchString)) ||
//       (app.aadhaar_number && app.aadhaar_number.includes(searchString)) ||
//       (app.cluster_number && app.cluster_number.toLowerCase().includes(searchString)) ||
//       (app.slum_use && app.slum_use.toLowerCase().includes(searchString))
//     return matchesSearch
//   })

//   const getFamilyMembers = (app) => {
//     const members = []
//     for (let i = 1; i <= 6; i++) {
//       if (app[`family_member${i}_name`]) {
//         members.push({
//           name: app[`family_member${i}_name`],
//           age: app[`family_member${i}_age`],
//           relation: app[`family_member${i}_relation`],
//           gender: app[`family_member${i}_gender`],
//         })
//       }
//     }
//     return members
//   }

//   const getDocuments = (app) => {
//     const docs = []
//     const docFields = [
//       "photo_self_path",
//       "photo_family_path",
//       "biometric_path",
//       "front_photo_path",
//       "side_photo_path",
//       "inside_video_path",
//       "declaration_video_path",
//       "adivashihutimage",
//       "doc_before_2000",
//       "submitted_docs_before_2000",
//       "description_doc_before_2000",
//       "after_2000_proof_submitted",
//       "possession_doc_info",
//       "Seldeclaration_letter",
//       "Ration_card_info",
//       "Voter_card_info",
//       "Other_doc_info",
//       "document_upload"
//     ]

//     docFields.forEach((field) => {
//       if (app[field]) {
//         const parsedPaths = parseOriginalPath(app[field])
//         const firstPath = parsedPaths[0]
//         const documentUrl = firstPath

//         docs.push({
//           name: field
//             .replace(/_/g, " ")
//             .replace(/([A-Z])/g, " $1")
//             .trim(),
//           originalPath: app[field],
//           parsedPaths: parsedPaths,
//           cleanPath: extractDocumentPath(firstPath),
//           url: documentUrl,
//           lat: app[`${field}_lat`],
//           long: app[`${field}_long`],
//           extension: getFileExtension(firstPath),
//           isImage: isImageFile(firstPath),
//           isVideo: isVideoFile(firstPath),
//           isPdf: isPdfFile(firstPath),
//           hasMultiple: parsedPaths.length > 1
//         })
//       }
//     })
//     return docs
//   }

//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/_/g, " ")
//       .replace(/([A-Z])/g, " $1")
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(" ")
//       .trim()
//   }

//   const getStatusColor = (status) => {
//     if (!status) return "bg-gray-100 text-gray-800"
//     const statusLower = status.toLowerCase().trim()
//     if (statusLower.includes("ready") && statusLower.includes("survey")) {
//       return "bg-green-100 text-green-800"
//     }
//     if (statusLower.includes("pending")) {
//       return "bg-yellow-100 text-yellow-800"
//     }
//     if (statusLower.includes("completed") || statusLower.includes("complete")) {
//       return "bg-blue-100 text-blue-800"
//     }
//     if (statusLower.includes("appose") || statusLower.includes("oppose")) {
//       return "bg-red-100 text-red-800"
//     }
//     return "bg-gray-100 text-gray-800"
//   }

//   const openModal = (app) => {
//     setSelectedApplication(app)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setSelectedApplication(null)
//   }

//   const openDocumentModal = (document) => {
//     setSelectedDocument(document)
//     setCurrentImageIndex(0)
//     setShowDocumentModal(true)
//   }

//   const closeDocumentModal = () => {
//     setShowDocumentModal(false)
//     setSelectedDocument(null)
//     setCurrentImageIndex(0)
//   }

//   const nextImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) =>
//         prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1
//       )
//     }
//   }

//   const prevImage = () => {
//     if (selectedDocument && selectedDocument.parsedPaths) {
//       setCurrentImageIndex((prev) =>
//         prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1
//       )
//     }
//   }

//   const DocumentPreview = ({ document }) => {
//     if (!document || !document.parsedPaths || document.parsedPaths.length === 0) {
//       return <div className="text-center text-gray-500 p-8">Document not available</div>
//     }

//     const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]

//     if (document.isImage) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <img
//               src={currentPath}
//               alt={document.name}
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             />
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load image: {currentPath}
//             </div>

//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Image {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>

//           {document.hasMultiple && document.parsedPaths.length > 1 && (
//             <div className="flex justify-center mt-4 space-x-2 overflow-x-auto">
//               {document.parsedPaths.map((path, index) => (
//                 <img
//                   key={index}
//                   src={path}
//                   alt={`${document.name} ${index + 1}`}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                     index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
//                   }`}
//                   onClick={() => setCurrentImageIndex(index)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )
//     }

//     if (document.isVideo) {
//       return (
//         <div className="text-center">
//           <div className="relative">
//             <video
//               controls
//               className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"
//               onError={(e) => {
//                 e.target.style.display = "none"
//                 e.target.nextSibling.style.display = "block"
//               }}
//             >
//               <source src={currentPath} type={`video/${document.extension}`} />
//               Your browser does not support the video tag.
//             </video>
//             <div style={{ display: "none" }} className="text-red-500 p-4">
//               Failed to load video: {currentPath}
//             </div>

//             {document.hasMultiple && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {document.hasMultiple && (
//             <div className="mt-4 text-sm text-gray-600">
//               Video {currentImageIndex + 1} of {document.parsedPaths.length}
//             </div>
//           )}

//           <div className="mt-4">
//             <button
//               onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//             >
//               <Download size={20} />
//               Download File
//             </button>
//           </div>
//         </div>
//       )
//     }

//     return (
//       <div className="text-center p-8">
//         <div className="text-6xl mb-4">📄</div>
//         <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
//         {document.hasMultiple ? (
//           <div>
//             <p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p>
//             <div className="space-y-2">
//               {document.parsedPaths.map((path, index) => (
//                 <button
//                   key={index}
//                   onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)}
//                   className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <Download size={16} />
//                   Download File {index + 1}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
//           >
//             <Download size={20} />
//             Download File
//           </button>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading SRA applications...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="text-red-600 text-6xl mb-4">⚠️</div>
//           <p className="text-red-600 mb-4 text-xl">Error loading applications</p>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div style={{backgroundColor:'#F9FAFB'}} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 p-4">

//       <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//     <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//       <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
//       <div className="relative">
//         <div className="text-3xl font-bold text-blue-700">{statusCounts.completed}</div>
//         <div className="text-blue-900 text-sm font-semibold mt-1">Completed</div>
//       </div>
//     </div>
//     <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//       <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
//       <div className="relative">
//         <div className="text-3xl font-bold text-green-700">{statusCounts.pending}</div>
//         <div className="text-green-900 text-sm font-semibold mt-1">Pending</div>
//       </div>
//     </div>
//     <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//       <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
//       <div className="relative">
//         <div className="text-3xl font-bold text-orange-700">{statusCounts.hutAppose}</div>
//         <div className="text-orange-900 text-sm font-semibold mt-1">Hut Appose</div>
//       </div>
//     </div>
//     <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
//       <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
//       <div className="relative">
//         <div className="text-3xl font-bold text-purple-700">{statusCounts.hutDenied}</div>
//         <div className="text-purple-900 text-sm font-semibold mt-1">Hut Denied</div>
//       </div>
//     </div>
//   </div>
// </div>

// <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//   <div>
//     <h2 style={{ color: '#4A5565', textTransform: 'uppercase' }} className="text-2xl font-bold tracking-wide text-gray-800">
//       BMC Applications
//     </h2>
//   </div>
//   <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//     <button
//       onClick={handleDownloadExcel}
//       className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 sm:w-auto sm:mx-0 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
//     >
//       <Download size={18} />
//       Download Excel
//     </button>
//     <button
//       onClick={handleDownloadPDF}
//       className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 sm:w-auto sm:mx-0 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
//     >
//       <Download size={18} />
//       Download PDF
//     </button>
//     <button
//       onClick={() => setShowAddForm(true)}
//       className="group relative flex w-[90%] mx-auto items-center justify-center gap-2 sm:w-auto sm:mx-0 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
//     >
//       <Plus size={18} className="transition-transform duration-300 group-hover:rotate-90" />
//       Add Application
//     </button>
//   </div>
// </div>

//       {success && (
//         <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//           <span className="text-2xl mr-3">✅</span>
//           <span className="font-medium">{success}</span>
//         </div>
//       )}

//       {error && (
//         <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//           <span className="text-2xl mr-3">❌</span>
//           <span className="font-medium">{error}</span>
//         </div>
//       )}

//       {generatingPdfs && (
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//           <span className="font-medium">Generating and downloading PDF documents...</span>
//         </div>
//       )}

//       <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-10">
//   <div className="relative mb-6">
//     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//       <Search className="text-gray-500" size={18} />
//     </div>
//     <input
//       type="text"
//       placeholder="Search by name, slum ID, area, cluster number, or Aadhaar number..."
//       className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 text-sm sm:text-base bg-gray-50"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   </div>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Use of Hut</label>
//       <select
//         value={hutUseFilter}
//         onChange={(e) => setHutUseFilter(e.target.value)}
//         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-gray-50 transition"
//       >
//         <option value="">All Uses</option>
//         <option value="Residential">Residential</option>
//         <option value="Commercial">Commercial</option>
//         <option value="combine">Combine</option>
//         <option value="Social">Social</option>
//         <option value="Devotional">Devotional</option>
//         <option value="Educational">Educational</option>
//       </select>
//     </div>

//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Survey Status</label>
//       <select
//         value={surveyStatusFilter}
//         onChange={(e) => setSurveyStatusFilter(e.target.value)}
//         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-gray-50 transition"
//       >
//         <option value="">All Statuses</option>
//         <option value="readytosurvey">Ready To Survey</option>
//         <option value="Hut Appose">Hut Appose</option>
//         <option value="Hut Denied">Hut Denied</option>
//       </select>
//     </div>

//     <div className="flex items-end">
//       <button
//         onClick={() => {
//           setHutUseFilter("")
//           setSurveyStatusFilter("")
//           setSearchTerm("")
//         }}
//         className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-orange-400 hover:text-orange-600 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95"
//       >
//         Clear Filters
//       </button>
//     </div>
//   </div>

//   {(hutUseFilter || surveyStatusFilter || searchTerm) && (
//     <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">
//       <p className="text-sm font-semibold text-gray-700 mb-3">Active Filters</p>
//       <div className="flex flex-wrap gap-3">
//         {searchTerm && (
//           <span className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full shadow-sm">
//             Search: "{searchTerm}"
//             <button onClick={() => setSearchTerm("")} className="ml-2 text-blue-600 hover:text-blue-800">
//               <X size={12} />
//             </button>
//           </span>
//         )}
//         {hutUseFilter && (
//           <span className="inline-flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full shadow-sm">
//             Use: {hutUseFilter}
//             <button onClick={() => setHutUseFilter("")} className="ml-2 text-green-600 hover:text-green-800">
//               <X size={12} />
//             </button>
//           </span>
//         )}
//         {surveyStatusFilter && (
//           <span className="inline-flex items-center px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full shadow-sm">
//             Status: {surveyStatusFilter}
//             <button onClick={() => setSurveyStatusFilter("")} className="ml-2 text-orange-600 hover:text-orange-800">
//               <X size={12} />
//             </button>
//           </span>
//         )}
//       </div>
//       <p className="text-xs text-gray-600 mt-3">
//         Showing <span className="font-semibold text-orange-600">{filteredApplications.length}</span> of {applications.length} applications
//       </p>
//     </div>
//   )}
// </div>

// <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
//   <div className="overflow-x-auto">
//     <table className="w-full text-sm text-left">
//       <thead className="bg-gradient-to-r from-orange-100 to-orange-50 text-[#2D3748] uppercase tracking-wider font-bold text-xs">
//         <tr>
//           <th className="px-6 py-4">Serial No.</th>
//           <th className="px-6 py-4">Cluster Number</th>
//           <th className="px-6 py-4">Hut ID</th>
//           <th className="px-6 py-4">Name</th>
//           <th className="px-6 py-4">Address</th>
//           <th className="px-6 py-4 text-center">Slum Floor</th>
//           <th className="px-6 py-4">Use of Hut</th>
//           <th className="px-6 py-4">Hut Area (sq.m)</th>
//           <th className="px-6 py-4">Date of Survey</th>
//           <th className="px-6 py-4">Done By</th>
//           <th className="px-6 py-4">Survey Status</th>
//           {role !== "surveyor" && (
//             <th className="px-6 py-4 text-center">Action</th>
//           )}
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-200">
//         {filteredApplications.length === 0 ? (
//           <tr>
//             <td colSpan="12" className="px-6 py-12 text-center text-gray-500">
//               No applications found matching your search criteria
//             </td>
//           </tr>
//         ) : (
//           filteredApplications.map((app, index) => (
//             <tr key={app.id} className="odd:bg-white even:bg-gray-50 hover:bg-orange-50 hover:scale-[1.002] transition-all duration-200">
//               <td className="px-6 py-4 font-medium text-gray-700">{app.id || index + 1}</td>
//               <td className="px-6 py-4 text-gray-700">{app.cluster_number || "N/A"}</td>
//               <td className="px-6 py-4 text-gray-700">{app.slum_id || "N/A"}</td>
//               <td className="px-6 py-4">
//                 <div className="font-semibold text-gray-800 truncate">
//                   {app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}
//                 </div>
//                 <div className="text-gray-500 text-xs truncate">
//                   {app.gender} • {app.aadhaar_number}
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-gray-600">
//                 <div className="text-xs">{app.current_pincode && `PIN: ${app.current_pincode}`}</div>
//               </td>
//               <td className="px-6 py-4 text-center">
//                 {app.slum_floor === "G" ? (
//                   <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold shadow-sm">
//                     {app.slum_floor}
//                   </span>
//                 ) : (
//                   <span className="text-gray-700">{app.slum_floor || "N/A"}</span>
//                 )}
//               </td>
//               <td className="px-6 py-4 text-gray-700">{app.slum_use || "N/A"}</td>
//               <td className="px-6 py-4">
//                 <div className="font-medium text-gray-800">{app.area_sq_m}</div>
//                 <div className="text-gray-500 text-xs">
//                   {app.length && app.width && `${app.length}×${app.width}m`}
//                 </div>
//               </td>
//               <td className="px-6 py-4 text-gray-700">{app.created_date || "N/A"}</td>
//               <td className="px-6 py-4 text-gray-700">{app.submittedBy || "-"}</td>
//               <td className="px-6 py-4">
//                 <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(app.survey_status)}`}>
//                   {app.survey_status || "Pending"}
//                 </span>
//               </td>
//               {role !== "surveyor" && (
//                 <td className="px-6 py-4 text-center">
//                   <div className="flex items-center justify-center gap-3">
//                     <button
//                       onClick={() => openModal(app)}
//                       className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
//                       title="View Details"
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       onClick={() => {
//                         setEditingApplication(app)
//                         setShowEditForm(true)
//                       }}
//                       className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition"
//                       title="Edit Application"
//                     >
//                       <Edit size={18} />
//                     </button>
//                     <button
//                       onClick={() => generateAndDownloadPdfs(app)}
//                       disabled={generatingPdfs}
//                       className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50 cursor-pointer flex items-center justify-center flex-col"
//                       title="Download Jodpatra"
//                     >
//                       <Download size={18} />जोडपत्र
//                     </button>
//                     <button
//                       className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition cursor-pointer flex items-center justify-center flex-col"
//                       onClick={() => generateIndexPDF(app)}
//                     >
//                       <Download size={18} /><span>Index</span>
//                     </button>
//                   </div>
//                 </td>
//               )}
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>

//       {showDocumentModal && selectedDocument && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
//               <div>
//                 <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Type: {selectedDocument.extension.toUpperCase()} |
//                   {selectedDocument.hasMultiple && (
//                     <span> {selectedDocument.parsedPaths.length} files | </span>
//                   )}
//                   {selectedDocument.lat && selectedDocument.long && (
//                     <span> GPS: {selectedDocument.lat}, {selectedDocument.long}</span>
//                   )}
//                 </p>
//               </div>
//               <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="p-4">
//               <DocumentPreview document={selectedDocument} />
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold mb-2">File Information:</h4>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Original Path:</strong> {selectedDocument.originalPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>Clean Path:</strong> {selectedDocument.cleanPath}
//                 </p>
//                 <p className="text-sm text-gray-600 break-all">
//                   <strong>URL:</strong> {selectedDocument.url}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showModal && selectedApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">
//                 Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}
//               </h2>
//               <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="p-6 space-y-8">
//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg flex items-center gap-2">
//                   👨‍👩‍👧‍👦 Family Members Details
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getFamilyMembers(selectedApplication).map((member, index) => (
//                     <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
//                       <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
//                       <div className="mt-2 space-y-1">
//                         <p className="text-sm"><strong>Relation:</strong> {member.relation}</p>
//                         <p className="text-sm"><strong>Gender:</strong> {member.gender}</p>
//                         <p className="text-sm"><strong>Age:</strong> {member.age} years</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg flex items-center gap-2">
//                   📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {getDocuments(selectedApplication).map((doc, index) => {
//                     const firstImagePath = doc.parsedPaths[0]
//                     return (
//                       <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
//                         <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>
//                         <div className="mb-3">
//                           {doc.isImage && (
//                             <div className="relative">
//                               <img
//                                 src={firstImagePath}
//                                 alt={doc.name}
//                                 className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
//                                 onClick={() => openDocumentModal(doc)}
//                                 onError={(e) => {
//                                   e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+PC9zdmc+"
//                                 }}
//                               />
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
//                                   +{doc.parsedPaths.length - 1}
//                                 </div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isVideo && (
//                             <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative" onClick={() => openDocumentModal(doc)}>
//                               <span className="text-3xl">🎥</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>
//                               )}
//                             </div>
//                           )}
//                           {doc.isPdf && (
//                             <div className="w-full h-24 bg-red-100 rounded flex items-center justify-content cursor-pointer hover:bg-red-200 relative" onClick={() => openDocumentModal(doc)}>
//                               <span className="text-3xl">📄</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>
//                               )}
//                             </div>
//                           )}
//                           {!doc.isImage && !doc.isVideo && !doc.isPdf && (
//                             <div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative" onClick={() => openDocumentModal(doc)}>
//                               <span className="text-3xl">📁</span>
//                               {doc.hasMultiple && (
//                                 <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                         <div className="space-y-2">
//                           <button onClick={() => openDocumentModal(doc)} className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1">
//                             <Eye size={16} />
//                             View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}
//                           </button>
//                           <button onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)} className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1">
//                             <Download size={16} />
//                             Download File
//                           </button>
//                         </div>
//                         <div className="space-y-2 mt-2">
//                           <p className="text-xs text-gray-600 break-all bg-white p-2 rounded">
//                             <strong>Files Count:</strong> {doc.parsedPaths.length}
//                           </p>
//                           {doc.lat && doc.long && (
//                             <p className="text-xs text-gray-600 bg-white p-2 rounded">
//                               <strong>GPS:</strong> {doc.lat}, {doc.long}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">
//                   📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)
//                 </h3>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {Object.entries(selectedApplication).map(([key, value], index) => (
//                     <div key={key} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
//                       <div className="flex items-start justify-between mb-2">
//                         <h4 className="font-bold text-gray-900 text-sm">
//                           {index + 1}. {formatFieldName(key)}
//                         </h4>
//                         <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
//                       </div>
//                       <div className="bg-gray-50 rounded p-2">
//                         <p className="text-sm text-gray-700 break-all">
//                           {value !== null && value !== undefined ? value.toString() : "N/A"}
//                         </p>
//                       </div>
//                       <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showAddForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Application Form</h2>
//               <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <AddApplicationForm
//                 onClose={() => setShowAddForm(false)}
//                 onSuccess={() => { setShowAddForm(false) }}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {showEditForm && editingApplication && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
//             <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
//               <h2 className="text-3xl font-bold">Edit Application - {editingApplication.first_name} {editingApplication.last_name}</h2>
//               <button
//                 onClick={() => {
//                   setShowEditForm(false)
//                   setEditingApplication(null)
//                 }}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//             <div className="p-6">
//               <EditApplicationForm
//                 formId={editingApplication.id}
//                 onClose={() => {
//                   setShowEditForm(false)
//                   setEditingApplication(null)
//                 }}
//                 onSuccess={() => {
//                   setShowEditForm(false)
//                   setEditingApplication(null)
//                   fetchApplications()
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default AllApplicationsPage


// ---------------------

import { useState, useEffect } from "react"
import { Eye, Search, Download, X, ChevronLeft, ChevronRight, Plus, Edit } from "lucide-react"
import AddApplicationForm from './AddApplicationForm'
import EditApplicationForm from './EditApplicationForm'
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import html2canvas from 'html2canvas'
import './AllApplicationsPage.css'

const BASE_URL = import.meta.env.VITE_BASE_URL
const DOCUMENT_BASE_URL = import.meta.env.VITE_BASE_URL

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

const AllApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAddForm, setShowAddForm] = useState(false)
  const [generatingPdfs, setGeneratingPdfs] = useState(false)
  const [success, setSuccess] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingApplication, setEditingApplication] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [hutUseFilter, setHutUseFilter] = useState("")
  const [surveyStatusFilter, setSurveyStatusFilter] = useState("")

  let role = null
  let user_id = null
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      role = parsedUser?.role
      user_id = parsedUser?.id
    }
  }

  const getStatusCounts = () => {
    const statusMappings = {
      Pending: ['pending', 'pendding', 'panding'],
      Completed: ['completed', 'complete', 'complated'],
      'Ready For Survey': ['ready for survey', 'ready_for_survey', 'readyforsurvey', 'ready survey'],
      'Hut Appose': ['hut appose', 'hut_appose', 'hutappose', 'hut oppose'],
      'Hut Denied': ['hut denied', 'hut_denied', 'hutdenied', 'hut deny', 'rejected', 'reject'],
    }
    const counts = { pending: 0, completed: 0, hutAppose: 0, hutDenied: 0 }
    applications.forEach((app) => {
      const status = app.survey_status || ''
      const statusLower = status.toLowerCase().trim()
      if (!status || statusMappings['Pending'].includes(statusLower)) counts.pending++
      else if (statusMappings['Completed'].includes(statusLower)) counts.completed++
      else if (statusMappings['Hut Appose'].includes(statusLower)) counts.hutAppose++
      else if (statusMappings['Hut Denied'].includes(statusLower)) counts.hutDenied++
      else counts.pending++
    })
    return counts
  }
  const statusCounts = getStatusCounts()

  const parseOriginalPath = (originalPath) => {
    if (!originalPath) return []
    try {
      if (Array.isArray(originalPath)) return originalPath
      if (originalPath.startsWith('[') && originalPath.endsWith(']')) return JSON.parse(originalPath)
      return [originalPath]
    } catch (e) {
      return [originalPath]
    }
  }

  const extractDocumentPath = (fullPath) => {
    if (!fullPath) return null
    const uploadsIndex = fullPath.indexOf("/uploads")
    if (uploadsIndex !== -1) return fullPath.substring(uploadsIndex)
    return fullPath
  }

  const getFileExtension = (filePath) => {
    if (!filePath) return ""
    return filePath.split(".").pop().toLowerCase()
  }
  const isImageFile = (filePath) => ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(getFileExtension(filePath))
  const isVideoFile = (filePath) => ["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(getFileExtension(filePath))
  const isPdfFile = (filePath) => getFileExtension(filePath) === "pdf"

  const downloadFile = (url, filename) => {
    if (!url) { alert("File URL not available"); return }
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'document'
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadExcel = () => {
    if (filteredApplications.length === 0) { alert("No data available!"); return }
    const excelData = filteredApplications.map((app, index) => ({
      "Serial No": index + 1,
      "Cluster Number": app.cluster_number || "",
      "Hut ID": app.slum_id || "",
      "Name": `${app.first_name || ""} ${app.last_name || ""}`,
      "Use of Hut": app.slum_use || "",
      "Area": app.area_sq_m || "",
      "Status": app.survey_status || "Pending",
    }))
    const ws = XLSX.utils.json_to_sheet(excelData, { origin: "A4" })
    XLSX.utils.sheet_add_aoa(ws, [["BMC Applications Report"]], { origin: "A1" })
    XLSX.utils.sheet_add_aoa(ws, [[`Total Records: ${filteredApplications.length}`]], { origin: "A2" })
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Applications")
    XLSX.writeFile(wb, "BMC_Applications.xlsx")
  }

  const handleDownloadPDF = () => {
    if (filteredApplications.length === 0) { alert("No data available!"); return }
    const doc = new jsPDF("landscape")
    doc.setFontSize(16)
    doc.text("BMC Applications Report", 14, 15)
    doc.setFontSize(10)
    doc.text(`Total Records: ${filteredApplications.length}`, 14, 22)
    const tableData = filteredApplications.map((app, index) => [
      index + 1, app.cluster_number || "", app.slum_id || "",
      `${app.first_name || ""} ${app.last_name || ""}`,
      app.slum_use || "", app.area_sq_m || "", app.survey_status || "Pending",
    ])
    autoTable(doc, {
      head: [["Sr", "Cluster", "Hut ID", "Name", "Use", "Area", "Status"]],
      body: tableData, startY: 28,
      styles: { fontSize: 8 }, headStyles: { fillColor: [249, 115, 22] },
    })
    doc.save("BMC_Applications.pdf")
  }

  const createRow = (label, value) => `<tr><td style="border:1px solid #000;padding:6px;width:40%;font-weight:bold;background:#fafafa;">${label}</td><td style="border:1px solid #000;padding:6px;">${value || "-"}</td></tr>`
  const createDocRow = (sr, name, before, current, after, page) => `<tr><td style="border:1px solid #000;padding:6px;text-align:center;">${sr}</td><td style="border:1px solid #000;padding:6px;">${name}</td><td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${before}</td><td style="border:1px solid #000;padding:6px;text-align:center;">${current}</td><td style="border:1px solid #000;padding:6px;text-align:center;font-weight:bold;">${after}</td><td style="border:1px solid #000;padding:6px;text-align:center;">${page}</td></tr>`

  const generateIndexPDF = (app) => {
    const fullName = `${app.first_name || ""} ${app.middle_name || ""} ${app.last_name || ""}`
    const hutSurveyId = app.hut_id || `${app.slum_id || "NA"}-${app.cluster_number || "NA"}-${app.id}`
    const hasBefore2000 = app.doc_before_2000 || app.submitted_docs_before_2000
    const hasAfter2000 = app.after_2000_proof_submitted
    const beforeTick = hasBefore2000 ? "✔" : ""
    const afterTick = !hasBefore2000 && hasAfter2000 ? "✔" : ""
    const pdfElement = document.createElement("div")
    pdfElement.style.cssText = `width:750px;padding:20px;font-family:Georgia,serif;font-size:12px;color:#000;background:white;position:absolute;top:-9999px;left:-9999px;`
    pdfElement.innerHTML = `<div><h2 style="text-align:center;margin-bottom:15px;letter-spacing:1px;border-bottom:2px solid #000;padding-bottom:6px;">INDEX</h2><table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:10px;">${createRow("Hut Survey ID", hutSurveyId)}${createRow("RFS ID", app.id)}${createRow("Cluster ID", app.cluster_number)}${createRow("Scheme", app.municipal_corporation)}${createRow("Use of Hut", app.slum_use)}${createRow("Village", app.village)}${createRow("Slum", app.slum_name)}${createRow("Hut Owner", fullName)}${createRow("Floor No", app.slum_floor)}${createRow("Hut Area", app.area_sq_m)}${createRow("UID No", app.aadhaar_number)}${createRow("Address", app.current_address)}</table><br/><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr style="background:#f2f2f2;font-weight:bold;text-align:center;"><th style="border:1px solid #000;padding:5px;">Sr No</th><th style="border:1px solid #000;padding:5px;">Document Name</th><th style="border:1px solid #000;padding:5px;">Before 1/1/2000</th><th style="border:1px solid #000;padding:5px;">Current Year</th><th style="border:1px solid #000;padding:5px;">After 2000</th><th style="border:1px solid #000;padding:5px;">Page No</th></tr>${createDocRow("A","Before 1/1/2000 Proof Document",beforeTick,"","")}${createDocRow("B","After 2000 Proof Document","","",afterTick,"")}${createDocRow("C","Possession Document","","","","")}${createDocRow("D","Self Declaration","","","","")}${createDocRow("E","Ration Card","","","","")}${createDocRow("F","Sale Agreement","","","","")}</table><div style="margin-top:50px;text-align:right;font-weight:bold;font-size:12px;">Scrutiny Cell Officer</div></div>`
    document.body.appendChild(pdfElement)
    setTimeout(() => {
      html2canvas(pdfElement, { scale: 1, useCORS: true, allowTaint: true, logging: false, backgroundColor: '#ffffff' }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8)
        const pdf = new jsPDF("p", "mm", "a4")
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const imgHeight = (canvas.height * pageWidth) / canvas.width
        let heightLeft = imgHeight, position = 0
        pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight)
        heightLeft -= pageHeight
        while (heightLeft > 0) { position = heightLeft - imgHeight; pdf.addPage(); pdf.addImage(imgData, "JPEG", 0, position, pageWidth, imgHeight); heightLeft -= pageHeight }
        pdf.save(`INDEX_${hutSurveyId}.pdf`)
        if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement)
      }).catch((err) => { console.error("Index PDF error:", err); if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement) })
    }, 300)
  }

  const generateJodpatra3 = async (data) => {
    return new Promise((resolve, reject) => {
      const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"
      const rawImageSrc = data?.photo_self_path?.startsWith("http") ? data.photo_self_path : `${baseUrl}/${data?.photo_self_path || "user2.png"}`
      const imageSrc = data?.photo_self_path ? `${BASE_URL}/api/proxy-image?url=${encodeURIComponent(rawImageSrc)}` : "/user2.png"
      const totalMembers = [1,2,3,4,5,6].filter((n) => data[`family_member${n}_name`] || data[`family_member${n}_age`] || data[`family_member${n}_relation`] || data[`family_member${n}_gender`] || data[`family_member${n}_aadhaar`]).length
      const preloadImage = (src) => new Promise((res, rej) => { const img = new Image(); img.crossOrigin = "Anonymous"; img.src = src; img.onload = () => res(img); img.onerror = () => rej(new Error(`Failed to load: ${src}`)) })
      const familyRows = [1,2,3,4,5,6].map((n) => { const name=data[`family_member${n}_name`],age=data[`family_member${n}_age`],relation=data[`family_member${n}_relation`],gender=data[`family_member${n}_gender`],aadhaar=data[`family_member${n}_aadhaar`]; if (!name&&!age&&!relation&&!gender&&!aadhaar) return ""; return `<tr><td style="border:1px solid #000;padding:4px;text-align:center;">${n}</td><td style="border:1px solid #000;padding:4px;">${name||""}</td><td style="border:1px solid #000;padding:4px;text-align:center;">${age||""}</td><td style="border:1px solid #000;padding:4px;">${relation||""}</td><td style="border:1px solid #000;padding:4px;text-align:center;">${gender||""}</td><td style="border:1px solid #000;padding:4px;">${aadhaar||""}</td></tr>` }).join("")
      preloadImage(imageSrc).then(() => {
        const pdfElement = document.createElement("div")
        pdfElement.style.cssText = "width:210mm;min-height:297mm;padding:15mm;font-family:Arial,sans-serif;font-size:12px;line-height:1.4;background:white;position:absolute;top:-9999px;"
        pdfElement.innerHTML = `<div style="text-align:center;margin-bottom:25px;padding-bottom:15px;border-bottom:2px solid #000;"><h2 style="margin:0;font-size:16px;font-weight:bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2><hr style="margin:8px 0;border:1px solid #000;"><h3 style="margin:8px 0;font-size:18px;font-weight:bold;">जोडपत्र - तीन</h3><p style="margin:10px 0;font-size:11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:12px;"><tr><td style="border:1px solid #000;padding:6px;width:60%;font-weight:bold;">अर्ज क्र.: ${data.id||"N/A"}</td><td style="border:1px solid #000;padding:6px;width:40%;font-weight:bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td></tr></table></div><div style="text-align:left;margin-bottom:20px;"><div style="border:2px solid #000;width:100px;height:100px;"><img src="${imageSrc}" style="width:100%;height:100%;object-fit:cover;" crossOrigin="Anonymous"/></div><p style="margin-top:8px;font-size:10px;font-weight:bold;">अर्जदाराचा फोटो</p></div><div style="margin-bottom:20px;"><p style="font-size:12px;font-weight:bold;margin:8px 0;">अर्जदाराची माहिती:</p><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">१. अर्जदाराचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.first_name||""} ${data.middle_name||""} ${data.last_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">२. लिंग:</td><td style="border:1px solid #000;padding:5px;">${data.gender||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">३. आधार क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.aadhaar_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">४. मोबाईल क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.current_mobile_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">५. झोपडीचे क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.hut_id||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">५. झोपडीचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.hut_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">६. वॉर्ड:</td><td style="border:1px solid #000;padding:5px;">${data.ward||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">७. सध्याचा पत्ता:</td><td style="border:1px solid #000;padding:5px;">${data.current_address||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">८. निवासी कधीपासून:</td><td style="border:1px solid #000;padding:5px;">${data.residency_since||""}</td></tr></table></div><div style="margin-bottom:20px;"><p style="font-size:12px;font-weight:bold;margin:10px 0;">कुटुंबातील सदस्यांची माहिती:</p><table style="width:100%;border-collapse:collapse;font-size:10px;"><tr><td style="border:1px solid #000;padding:4px;font-weight:bold;">कुटुंबातील एकूण सदस्य:</td><td style="border:1px solid #000;padding:4px;">${totalMembers||""} सदस्य</td></tr></table><table style="width:100%;border-collapse:collapse;font-size:9px;margin-top:8px;"><tr><th style="border:1px solid #000;padding:4px;">अ.क्र.</th><th style="border:1px solid #000;padding:4px;">सदस्याचे नाव</th><th style="border:1px solid #000;padding:4px;">वय</th><th style="border:1px solid #000;padding:4px;">नातं</th><th style="border:1px solid #000;padding:4px;">लिंग</th><th style="border:1px solid #000;padding:4px;">आधार क्रमांक</th></tr>${familyRows}</table></div><div style="margin-bottom:20px;"><p style="font-size:12px;font-weight:bold;margin:10px 0;">झोपडीचे तपशील:</p><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">लांबी (मीटर):</td><td style="border:1px solid #000;padding:5px;">${data.length||""}</td><td style="border:1px solid #000;padding:5px;font-weight:bold;">रुंदी (मीटर):</td><td style="border:1px solid #000;padding:5px;">${data.width||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">एकूण क्षेत्रफळ:</td><td style="border:1px solid #000;padding:5px;" colspan="3">${data.area_sq_m||""} चौ.मीटर</td></tr></table></div><div style="margin-bottom:20px;"><p style="font-size:12px;font-weight:bold;margin:10px 0;">बँक तपशील:</p><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">बँकेचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.bank_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">खाते क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.account_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">IFSC कोड:</td><td style="border:1px solid #000;padding:5px;">${data.ifsc_code||""}</td></tr></table></div><div style="width:100%;display:flex;justify-content:flex-end;margin-bottom:20px;"><div style="text-align:center;"><div style="border:2px solid #000;width:80px;height:80px;"><img src="/thumb1.png" style="width:100%;height:100%;object-fit:cover;"/></div><p style="margin-top:10px;font-size:10px;font-weight:bold;">अर्जदाराची सही / अंगठा निशाणी</p></div></div><div style="text-align:center;border-top:1px solid #000;padding-top:10px;"><p style="font-size:10px;margin:2px 0;">मोबाईल: ${data.current_mobile_number||"0000000000"}</p><p style="font-size:10px;margin:2px 0;">ईमेल: ${data.user_email||"N/A"}</p><p style="font-size:9px;color:#777;margin:2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p><p style="font-size:9px;color:#777;margin:2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p></div>`
        document.body.appendChild(pdfElement)
        setTimeout(() => {
          html2canvas(pdfElement, { scale: 1.5, useCORS: true, allowTaint: true, logging: false, windowWidth: 794, windowHeight: 1123, backgroundColor: '#ffffff' }).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 0.85)
            const pdf = new jsPDF("p", "mm", "a4")
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const canvasHeight = (canvas.height * pageWidth) / canvas.width
            let heightLeft = canvasHeight, position = 0
            pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight)
            heightLeft -= pageHeight
            while (heightLeft > 0) { position = heightLeft - canvasHeight; pdf.addPage(); pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight); heightLeft -= pageHeight }
            pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}.pdf`)
            if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement)
            resolve(true)
          }).catch((err) => { if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement); reject(err) })
        }, 1000)
      }).catch(() => { data.photo_self_path = `${baseUrl}/user2.png`; generateJodpatra3(data) })
    })
  }

  const generateJodpatra4 = async (data) => {
    return new Promise((resolve, reject) => {
      const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in"
      const preloadImage = (src) => new Promise((res, rej) => { const img = new Image(); img.crossOrigin = "Anonymous"; img.src = src; img.onload = () => res(img); img.onerror = () => rej(new Error(`Failed: ${src}`)) })
      const rawImageSrc = data?.photo_self_path?.startsWith("http") ? data.photo_self_path : `${baseUrl}/${data?.photo_self_path || "user2.png"}`
      const imageSrc = data?.photo_self_path ? `${BASE_URL}/api/proxy-image?url=${encodeURIComponent(rawImageSrc)}` : "/user2.png"
      const totalMembers = [1,2,3,4,5,6].filter((n) => data[`family_member${n}_name`] || data[`family_member${n}_age`] || data[`family_member${n}_relation`] || data[`family_member${n}_gender`] || data[`family_member${n}_aadhaar`]).length
      const familyRows = [1,2,3,4,5,6].map((n) => { const name=data[`family_member${n}_name`],age=data[`family_member${n}_age`],relation=data[`family_member${n}_relation`],gender=data[`family_member${n}_gender`],aadhaar=data[`family_member${n}_aadhaar`]; if (!name&&!age&&!relation&&!gender&&!aadhaar) return ""; return `<tr><td style="border:1px solid #000;padding:4px;text-align:center;">${n}</td><td style="border:1px solid #000;padding:4px;">${name||""}</td><td style="border:1px solid #000;padding:4px;text-align:center;">${age||""}</td><td style="border:1px solid #000;padding:4px;">${relation||""}</td><td style="border:1px solid #000;padding:4px;text-align:center;">${gender||""}</td><td style="border:1px solid #000;padding:4px;">${aadhaar||""}</td></tr>` }).join("")
      const pdfElement = document.createElement("div")
      pdfElement.style.cssText = "width:210mm;min-height:297mm;padding:15mm;font-family:Arial,sans-serif;font-size:12px;line-height:1.4;background:white;position:absolute;top:-9999px;"
      const buildHTML = (imgSrc) => `<div style="text-align:center;margin-bottom:25px;padding-bottom:15px;border-bottom:2px solid #000;"><h2 style="margin:0;font-size:16px;font-weight:bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2><hr style="margin:8px 0;border:1px solid #000;"><h3 style="margin:8px 0;font-size:18px;font-weight:bold;">जोडपत्र - चार</h3><p style="margin:10px 0;font-size:11px;">दि.१.१.२००० नंतरच्या दिनांकापासून सध्या रहात असल्यास करावयाचा अर्ज</p></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:12px;"><tr><td style="border:1px solid #000;padding:6px;width:60%;font-weight:bold;">अर्ज क्र.: ${data.id||"N/A"}</td><td style="border:1px solid #000;padding:6px;width:40%;font-weight:bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td></tr></table></div><div style="text-align:left;margin-bottom:20px;"><div style="border:2px solid #000;width:100px;height:100px;"><img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;" crossOrigin="Anonymous"/></div><p style="margin-top:8px;font-size:10px;font-weight:bold;">अर्जदाराचा फोटो</p></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;width:30%;font-weight:bold;">१. मुख्य अर्जदाराचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.first_name||""} ${data.middle_name||""} ${data.last_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">२. लिंग:</td><td style="border:1px solid #000;padding:5px;">${data.gender||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">३. आधार क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.aadhaar_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">४. मोबाईल क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.current_mobile_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">५. झोपडीचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.hut_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">६. वॉर्ड:</td><td style="border:1px solid #000;padding:5px;">${data.ward||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">७. सध्याचा पत्ता:</td><td style="border:1px solid #000;padding:5px;">${data.current_address||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">८. निवासी कधीपासून:</td><td style="border:1px solid #000;padding:5px;">${data.residency_since||""} पासून</td></tr></table></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:10px;"><tr><td style="border:1px solid #000;padding:4px;font-weight:bold;">कुटुंबातील एकूण सदस्य:</td><td style="border:1px solid #000;padding:4px;font-weight:bold;">${totalMembers||""} सदस्य</td></tr></table><table style="width:100%;border-collapse:collapse;font-size:9px;margin-top:8px;"><tr><th style="border:1px solid #000;padding:4px;">अ.क्र.</th><th style="border:1px solid #000;padding:4px;">सदस्याचे नाव</th><th style="border:1px solid #000;padding:4px;">वय</th><th style="border:1px solid #000;padding:4px;">नातं</th><th style="border:1px solid #000;padding:4px;">लिंग</th><th style="border:1px solid #000;padding:4px;">आधार क्रमांक</th></tr>${familyRows}</table></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">लांबी:</td><td style="border:1px solid #000;padding:5px;">${data.length||""}</td><td style="border:1px solid #000;padding:5px;font-weight:bold;">रुंदी:</td><td style="border:1px solid #000;padding:5px;">${data.width||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">एकूण क्षेत्रफळ:</td><td style="border:1px solid #000;padding:5px;" colspan="3">${data.area_sq_m||""} चौ.मीटर</td></tr></table></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">बँकेचे नाव:</td><td style="border:1px solid #000;padding:5px;">${data.bank_name||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">खाते क्रमांक:</td><td style="border:1px solid #000;padding:5px;">${data.account_number||""}</td></tr><tr><td style="border:1px solid #000;padding:5px;font-weight:bold;">IFSC कोड:</td><td style="border:1px solid #000;padding:5px;">${data.ifsc_code||""}</td></tr></table></div><div style="width:100%;display:flex;justify-content:flex-end;margin-bottom:20px;"><div style="text-align:center;"><div style="border:2px solid #000;width:80px;height:80px;"><img src="/thumb1.png" style="width:100%;height:100%;object-fit:cover;"/></div><p style="margin-top:10px;font-size:10px;font-weight:bold;">अर्जदाराची सही / अंगठा निशाणी</p></div></div><div style="text-align:center;border-top:1px solid #000;padding-top:10px;"><p style="font-size:10px;margin:2px 0;">मोबाईल: ${data.current_mobile_number||"0000000000"}</p><p style="font-size:10px;margin:2px 0;">ईमेल: ${data.user_email||"N/A"}</p><p style="font-size:9px;color:#666;margin:2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p><p style="font-size:9px;color:#666;margin:2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p></div>`
      const savePDF = () => new Promise((res, rej) => {
        setTimeout(() => {
          html2canvas(pdfElement, { scale: 1.5, useCORS: true, allowTaint: true, logging: false, windowWidth: 794, windowHeight: 1123, backgroundColor: '#ffffff' }).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 0.85)
            const pdf = new jsPDF("p", "mm", "a4")
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const canvasHeight = (canvas.height * pageWidth) / canvas.width
            let heightLeft = canvasHeight, position = 0
            pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight)
            heightLeft -= pageHeight
            while (heightLeft > 0) { position = heightLeft - canvasHeight; pdf.addPage(); pdf.addImage(imgData, "JPEG", 0, position, pageWidth, canvasHeight); heightLeft -= pageHeight }
            pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}.pdf`)
            if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement)
            res(true)
          }).catch((err) => { if (document.body.contains(pdfElement)) document.body.removeChild(pdfElement); rej(err) })
        }, 1000)
      })
      preloadImage(imageSrc).then(() => { pdfElement.innerHTML = buildHTML(imageSrc); document.body.appendChild(pdfElement); savePDF().then(resolve).catch(reject) }).catch(() => { pdfElement.innerHTML = buildHTML("/user2.png"); document.body.appendChild(pdfElement); savePDF().then(resolve).catch(reject) })
    })
  }

  const generateAndDownloadPdfs = async (formData) => {
    setGeneratingPdfs(true)
    setError(null)
    try {
      const dateStr = formData.residency_since
      if (!dateStr || dateStr.trim() === "") {
        setSuccess("Generating Jodpatra-3...")
        await generateJodpatra3(formData)
        setSuccess("✅ Successfully generated Jodpatra-3!")
        return
      }
      let isJodpatra3 = false
      if (dateStr === "00-00-0000") { isJodpatra3 = true }
      else {
        const parts = dateStr.split("-")
        if (parts.length !== 3) { isJodpatra3 = true }
        else {
          const [day, month, year] = parts.map(Number)
          if (new Date(year, month - 1, day) <= new Date(2000, 0, 1)) isJodpatra3 = true
        }
      }
      if (isJodpatra3) {
        setSuccess("Generating Jodpatra-3...")
        await generateJodpatra3(formData)
        setSuccess("✅ Successfully generated Jodpatra-3!")
      } else {
        setSuccess("Generating Jodpatra-4...")
        await generateJodpatra4(formData)
        setSuccess("✅ Successfully generated Jodpatra-4!")
      }
    } catch (error) {
      setError("Error generating PDFs: " + error.message)
    } finally {
      setTimeout(() => { setGeneratingPdfs(false); setSuccess(null) }, 3000)
    }
  }

  const fetchApplications = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = getAuthToken()
      if (!token) throw new Error("No authentication token found")
      const response = await fetch(`${BASE_URL}/api/sra-logs/all-logs`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      })
      if (!response.ok) {
        if (response.status === 401) throw new Error("Authentication failed. Please login again.")
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setApplications(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchApplications() }, [])

  const filteredApplications = applications
    .filter((app) => { if (role === "surveyor") return Number(app.submittedBy) === Number(user_id); return true })
    .filter((app) => {
      const s = searchTerm.toLowerCase()
      return searchTerm === "" ||
        (app.first_name && app.first_name.toLowerCase().includes(s)) ||
        (app.last_name && app.last_name.toLowerCase().includes(s)) ||
        (app.slum_id && app.slum_id.toLowerCase().includes(s)) ||
        (app.aadhaar_number && app.aadhaar_number.includes(s)) ||
        (app.cluster_number && app.cluster_number.toLowerCase().includes(s)) ||
        (app.slum_use && app.slum_use.toLowerCase().includes(s))
    })

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const paginatedApplications = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const getPaginationPages = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
      .reduce((acc, p, idx, arr) => { if (idx > 0 && p - arr[idx - 1] > 1) acc.push("..."); acc.push(p); return acc }, [])

  const getFamilyMembers = (app) => {
    const members = []
    for (let i = 1; i <= 6; i++) {
      if (app[`family_member${i}_name`]) members.push({ name: app[`family_member${i}_name`], age: app[`family_member${i}_age`], relation: app[`family_member${i}_relation`], gender: app[`family_member${i}_gender`] })
    }
    return members
  }

  const getDocuments = (app) => {
    const docs = []
    const docFields = ["photo_self_path","photo_family_path","biometric_path","front_photo_path","side_photo_path","inside_video_path","declaration_video_path","adivashihutimage","doc_before_2000","submitted_docs_before_2000","description_doc_before_2000","after_2000_proof_submitted","possession_doc_info","Seldeclaration_letter","Ration_card_info","Voter_card_info","Other_doc_info","document_upload"]
    docFields.forEach((field) => {
      if (app[field]) {
        const parsedPaths = parseOriginalPath(app[field])
        const firstPath = parsedPaths[0]
        docs.push({ name: field.replace(/_/g, " ").replace(/([A-Z])/g, " $1").trim(), originalPath: app[field], parsedPaths, cleanPath: extractDocumentPath(firstPath), url: firstPath, lat: app[`${field}_lat`], long: app[`${field}_long`], extension: getFileExtension(firstPath), isImage: isImageFile(firstPath), isVideo: isVideoFile(firstPath), isPdf: isPdfFile(firstPath), hasMultiple: parsedPaths.length > 1 })
      }
    })
    return docs
  }

  const formatFieldName = (fieldName) => fieldName.replace(/_/g, " ").replace(/([A-Z])/g, " $1").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ").trim()

  const getStatusColor = (status) => {
    if (!status) return "bg-gray-100 text-gray-800"
    const s = status.toLowerCase().trim()
    if (s.includes("ready") && s.includes("survey")) return "bg-green-100 text-green-800"
    if (s.includes("pending")) return "bg-yellow-100 text-yellow-800"
    if (s.includes("completed") || s.includes("complete")) return "bg-blue-100 text-blue-800"
    if (s.includes("appose") || s.includes("oppose")) return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const openModal = (app) => { setSelectedApplication(app); setShowModal(true) }
  const closeModal = () => { setShowModal(false); setSelectedApplication(null) }
  const openDocumentModal = (doc) => { setSelectedDocument(doc); setCurrentImageIndex(0); setShowDocumentModal(true) }
  const closeDocumentModal = () => { setShowDocumentModal(false); setSelectedDocument(null); setCurrentImageIndex(0) }
  const nextImage = () => { if (selectedDocument?.parsedPaths) setCurrentImageIndex((prev) => prev >= selectedDocument.parsedPaths.length - 1 ? 0 : prev + 1) }
  const prevImage = () => { if (selectedDocument?.parsedPaths) setCurrentImageIndex((prev) => prev <= 0 ? selectedDocument.parsedPaths.length - 1 : prev - 1) }

  const DocumentPreview = ({ document }) => {
    if (!document?.parsedPaths?.length) return <div className="text-center text-gray-500 p-8">Document not available</div>
    const currentPath = document.parsedPaths[currentImageIndex] || document.parsedPaths[0]
    if (document.isImage) return (
      <div className="text-center">
        <div className="relative">
          <img src={currentPath} alt={document.name} className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg" onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block" }} />
          <div style={{ display: "none" }} className="text-red-500 p-4">Failed to load image</div>
          {document.hasMultiple && (<><button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"><ChevronLeft size={20} /></button><button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"><ChevronRight size={20} /></button></>)}
        </div>
        {document.hasMultiple && <div className="mt-4 text-sm text-gray-600">Image {currentImageIndex + 1} of {document.parsedPaths.length}</div>}
        <div className="mt-4"><button onClick={() => downloadFile(currentPath, `${document.name}_${currentImageIndex + 1}.${document.extension}`)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><Download size={20} />Download File</button></div>
        {document.hasMultiple && document.parsedPaths.length > 1 && (<div className="flex justify-center mt-4 space-x-2 overflow-x-auto">{document.parsedPaths.map((path, index) => (<img key={index} src={path} alt={`${document.name} ${index + 1}`} className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`} onClick={() => setCurrentImageIndex(index)} />))}</div>)}
      </div>
    )
    if (document.isVideo) return (
      <div className="text-center">
        <video controls className="max-w-full max-h-[70vh] mx-auto rounded-lg shadow-lg"><source src={currentPath} type={`video/${document.extension}`} />Your browser does not support video.</video>
        {document.hasMultiple && <div className="mt-4 text-sm text-gray-600">Video {currentImageIndex + 1} of {document.parsedPaths.length}</div>}
        <div className="mt-4"><button onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><Download size={20} />Download File</button></div>
      </div>
    )
    return (
      <div className="text-center p-8">
        <div className="text-6xl mb-4">📄</div>
        <p className="text-gray-600 mb-4">File type: {document.extension.toUpperCase()}</p>
        {document.hasMultiple ? (
          <div><p className="text-sm text-gray-600 mb-4">{document.parsedPaths.length} files available</p><div className="space-y-2">{document.parsedPaths.map((path, index) => (<button key={index} onClick={() => downloadFile(path, `${document.name}_${index + 1}.${document.extension}`)} className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"><Download size={16} />Download File {index + 1}</button>))}</div></div>
        ) : (<button onClick={() => downloadFile(currentPath, `${document.name}.${document.extension}`)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"><Download size={20} />Download File</button>)}
      </div>
    )
  }

  if (loading) return (<div className="flex items-center justify-center min-h-screen"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div><p className="text-gray-600">Loading SRA applications...</p></div></div>)
  if (error) return (<div className="flex items-center justify-center min-h-screen"><div className="text-center"><div className="text-red-600 text-6xl mb-4">⚠️</div><p className="text-red-600 mb-4 text-xl">Error loading applications</p><p className="text-gray-600 mb-4">{error}</p><button onClick={() => window.location.reload()} className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Retry</button></div></div>)

  return (
    <div style={{ backgroundColor: '#F9FAFB' }} className="min-h-screen p-4">
      {/* Status Cards */}
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
            <div className="relative"><div className="text-3xl font-bold text-blue-700">{statusCounts.completed}</div><div className="text-blue-900 text-sm font-semibold mt-1">Completed</div></div>
          </div>
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-green-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
            <div className="relative"><div className="text-3xl font-bold text-green-700">{statusCounts.pending}</div><div className="text-green-900 text-sm font-semibold mt-1">Pending</div></div>
          </div>
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
            <div className="relative"><div className="text-3xl font-bold text-orange-700">{statusCounts.hutAppose}</div><div className="text-orange-900 text-sm font-semibold mt-1">Hut Appose</div></div>
          </div>
          <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-purple-200 rounded-full opacity-30 group-hover:scale-125 transition-all duration-500"></div>
            <div className="relative"><div className="text-3xl font-bold text-purple-700">{statusCounts.hutDenied}</div><div className="text-purple-900 text-sm font-semibold mt-1">Hut Denied</div></div>
          </div>
        </div>
      </div>

      {/* Header Buttons */}
      <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 style={{ color: '#4A5565', textTransform: 'uppercase' }} className="text-2xl font-bold tracking-wide">BMC Applications</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button onClick={handleDownloadExcel} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"><Download size={18} />Download Excel</button>
          <button onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"><Download size={18} />Download PDF</button>
          <button onClick={() => setShowAddForm(true)} className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-95"><Plus size={18} />Add Application</button>
        </div>
      </div>

      {success && (<div className="bg-green-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center"><span className="text-2xl mr-3">✅</span><span className="font-medium">{success}</span></div>)}
      {error && (<div className="bg-red-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center"><span className="text-2xl mr-3">❌</span><span className="font-medium">{error}</span></div>)}
      {generatingPdfs && (<div className="bg-blue-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div><span className="font-medium">Generating and downloading PDF documents...</span></div>)}

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-10">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search className="text-gray-500" size={18} /></div>
          <input type="text" placeholder="Search by name, slum ID, cluster number, or Aadhaar..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 text-sm bg-gray-50" value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Use of Hut</label>
            <select value={hutUseFilter} onChange={(e) => { setHutUseFilter(e.target.value); setCurrentPage(1) }} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 bg-gray-50 transition">
              <option value="">All Uses</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="combine">Combine</option>
              <option value="Social">Social</option>
              <option value="Devotional">Devotional</option>
              <option value="Educational">Educational</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Survey Status</label>
            <select value={surveyStatusFilter} onChange={(e) => { setSurveyStatusFilter(e.target.value); setCurrentPage(1) }} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 bg-gray-50 transition">
              <option value="">All Statuses</option>
              <option value="readytosurvey">Ready To Survey</option>
              <option value="Hut Appose">Hut Appose</option>
              <option value="Hut Denied">Hut Denied</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={() => { setHutUseFilter(""); setSurveyStatusFilter(""); setSearchTerm(""); setCurrentPage(1) }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-orange-400 hover:text-orange-600 shadow-sm transition-all duration-300 active:scale-95">Clear Filters</button>
          </div>
        </div>
        {(hutUseFilter || surveyStatusFilter || searchTerm) && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl">
            <p className="text-sm font-semibold text-gray-700 mb-3">Active Filters</p>
            <div className="flex flex-wrap gap-3">
              {searchTerm && (<span className="inline-flex items-center px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full shadow-sm">Search: "{searchTerm}"<button onClick={() => { setSearchTerm(""); setCurrentPage(1) }} className="ml-2 text-blue-600 hover:text-blue-800"><X size={12} /></button></span>)}
              {hutUseFilter && (<span className="inline-flex items-center px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full shadow-sm">Use: {hutUseFilter}<button onClick={() => { setHutUseFilter(""); setCurrentPage(1) }} className="ml-2 text-green-600 hover:text-green-800"><X size={12} /></button></span>)}
              {surveyStatusFilter && (<span className="inline-flex items-center px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full shadow-sm">Status: {surveyStatusFilter}<button onClick={() => { setSurveyStatusFilter(""); setCurrentPage(1) }} className="ml-2 text-orange-600 hover:text-orange-800"><X size={12} /></button></span>)}
            </div>
            <p className="text-xs text-gray-600 mt-3">Showing <span className="font-semibold text-orange-600">{filteredApplications.length}</span> of {applications.length} applications</p>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gradient-to-r from-orange-100 to-orange-50 text-[#2D3748] uppercase tracking-wider font-bold text-xs">
              <tr>
                <th className="px-6 py-4">Serial No.</th>
                <th className="px-6 py-4">Cluster Number</th>
                <th className="px-6 py-4">Hut ID</th>
                <th className="px-6 py-4">Hut Number</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4 text-center">Slum Floor</th>
                <th className="px-6 py-4">Use of Hut</th>
                <th className="px-6 py-4">Hut Area (sq.m)</th>
                <th className="px-6 py-4">Date of Survey</th>
                <th className="px-6 py-4">Done By</th>
                <th className="px-6 py-4">Survey Status</th>
                {role !== "surveyor" && <th className="px-6 py-4 text-center">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedApplications.length === 0 ? (
                <tr><td colSpan="12" className="px-6 py-12 text-center text-gray-500">No applications found matching your search criteria</td></tr>
              ) : (
                paginatedApplications.map((app, index) => (
                  <tr key={app.id} className="odd:bg-white even:bg-gray-50 hover:bg-orange-50 transition-all duration-200">
                    <td className="px-6 py-4 font-medium text-gray-700">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-6 py-4 text-gray-700">{app.cluster_number || "N/A"}</td>
                    {/* <td className="px-6 py-4 text-gray-700">{app.slum_id || "N/A"}</td> */}
                    <td className="px-6 py-4 text-gray-700">
  {app.cluster_number && app.hut_id
    ? `${app.cluster_number}${String(app.hut_id).padStart(5, "0")}`
    : app.hut_id || "N/A"}
</td>


{/* Hut Number — NEW — response मधला as-is hut_id */}
<td className="px-6 py-4 text-gray-700">
  {app.hut_id || "N/A"}
</td>



                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800 truncate">{app.first_name} {app.middle_name && `${app.middle_name} `}{app.last_name}</div>
                      <div className="text-gray-500 text-xs truncate">{app.gender} • {app.aadhaar_number}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600"><div className="text-xs">{app.current_pincode && `PIN: ${app.current_pincode}`}</div></td>
                    <td className="px-6 py-4 text-center">
                      {app.slum_floor === "G" ? (<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold shadow-sm">{app.slum_floor}</span>) : (<span className="text-gray-700">{app.slum_floor || "N/A"}</span>)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{app.slum_use || "N/A"}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{app.area_sq_m}</div>
                      <div className="text-gray-500 text-xs">{app.length && app.width && `${app.length}×${app.width}m`}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{app.created_date || "N/A"}</td>
                    <td className="px-6 py-4 text-gray-700">{app.submittedBy || "-"}</td>
                    <td className="px-6 py-4"><span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusColor(app.survey_status)}`}>{app.survey_status || "Pending"}</span></td>
                    {role !== "surveyor" && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-3">
                          <button onClick={() => openModal(app)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="View Details"><Eye size={18} /></button>
                          <button onClick={() => { setEditingApplication(app); setShowEditForm(true) }} className="p-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition" title="Edit Application"><Edit size={18} /></button>
                          <button onClick={() => generateAndDownloadPdfs(app)} disabled={generatingPdfs} className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50 flex items-center justify-center flex-col" title="Download Jodpatra"><Download size={18} />जोडपत्र</button>
                          <button onClick={() => generateIndexPDF(app)} className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center flex-col"><Download size={18} /><span>Index</span></button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 gap-3">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-800">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of <span className="font-semibold text-orange-600">{filteredApplications.length}</span> applications
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition">← Prev</button>
              {getPaginationPages().map((item, idx) =>
                item === "..." ? (<span key={`dots-${idx}`} className="px-2 py-2 text-gray-400 text-sm">...</span>) : (
                  <button key={item} onClick={() => setCurrentPage(item)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${currentPage === item ? "bg-orange-500 text-white border-orange-500 shadow-sm" : "border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600"}`}>{item}</button>
                )
              )}
              <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition">Next →</button>
            </div>
          </div>
        )}
      </div>

      {/* Document Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl font-bold">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-600">Type: {selectedDocument.extension.toUpperCase()} {selectedDocument.hasMultiple && `| ${selectedDocument.parsedPaths.length} files`} {selectedDocument.lat && selectedDocument.long && `| GPS: ${selectedDocument.lat}, ${selectedDocument.long}`}</p>
              </div>
              <button onClick={closeDocumentModal} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>
            <div className="p-4">
              <DocumentPreview document={selectedDocument} />
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">File Information:</h4>
                <p className="text-sm text-gray-600 break-all"><strong>Original Path:</strong> {selectedDocument.originalPath}</p>
                <p className="text-sm text-gray-600 break-all"><strong>Clean Path:</strong> {selectedDocument.cleanPath}</p>
                <p className="text-sm text-gray-600 break-all"><strong>URL:</strong> {selectedDocument.url}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">Complete Details - {selectedApplication.first_name} {selectedApplication.last_name}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700"><X size={28} /></button>
            </div>
            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-blue-100 text-blue-900 p-4 rounded-lg">👨‍👩‍👧‍👦 Family Members Details</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getFamilyMembers(selectedApplication).map((member, index) => (
                    <div key={index} className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                      <h4 className="font-bold text-blue-900 text-lg">{member.name}</h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm"><strong>Relation:</strong> {member.relation}</p>
                        <p className="text-sm"><strong>Gender:</strong> {member.gender}</p>
                        <p className="text-sm"><strong>Age:</strong> {member.age} years</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 bg-green-100 text-green-900 p-4 rounded-lg">📄 All Documents & Media Files ({getDocuments(selectedApplication).length} files)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getDocuments(selectedApplication).map((doc, index) => {
                    const firstImagePath = doc.parsedPaths[0]
                    return (
                      <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <h4 className="font-bold text-green-900 capitalize text-sm mb-2">{doc.name}</h4>
                        <div className="mb-3">
                          {doc.isImage && (<div className="relative"><img src={firstImagePath} alt={doc.name} className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80" onClick={() => openDocumentModal(doc)} onError={(e) => { e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjwvc3ZnPg==" }} />{doc.hasMultiple && <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>}</div>)}
                          {doc.isVideo && (<div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 relative" onClick={() => openDocumentModal(doc)}><span className="text-3xl">🎥</span>{doc.hasMultiple && <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>}</div>)}
                          {doc.isPdf && (<div className="w-full h-24 bg-red-100 rounded flex items-center justify-center cursor-pointer hover:bg-red-200 relative" onClick={() => openDocumentModal(doc)}><span className="text-3xl">📄</span>{doc.hasMultiple && <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>}</div>)}
                          {!doc.isImage && !doc.isVideo && !doc.isPdf && (<div className="w-full h-24 bg-gray-100 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 relative" onClick={() => openDocumentModal(doc)}><span className="text-3xl">📁</span>{doc.hasMultiple && <div className="absolute top-1 right-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">+{doc.parsedPaths.length - 1}</div>}</div>)}
                        </div>
                        <div className="space-y-2">
                          <button onClick={() => openDocumentModal(doc)} className="w-full bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 flex items-center justify-center gap-1"><Eye size={16} />View {doc.hasMultiple ? `${doc.parsedPaths.length} ` : ''}{doc.extension.toUpperCase()}</button>
                          <button onClick={() => downloadFile(firstImagePath, `${doc.name}.${doc.extension}`)} className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 flex items-center justify-center gap-1"><Download size={16} />Download File</button>
                        </div>
                        <p className="text-xs text-gray-600 break-all bg-white p-2 rounded mt-2"><strong>Files Count:</strong> {doc.parsedPaths.length}</p>
                        {doc.lat && doc.long && <p className="text-xs text-gray-600 bg-white p-2 rounded"><strong>GPS:</strong> {doc.lat}, {doc.long}</p>}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg">📋 ALL APPLICATION FIELDS ({Object.keys(selectedApplication).length} Total Fields)</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(selectedApplication).map(([key, value], index) => (
                    <div key={key} className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900 text-sm">{index + 1}. {formatFieldName(key)}</h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{typeof value}</span>
                      </div>
                      <div className="bg-gray-50 rounded p-2"><p className="text-sm text-gray-700 break-all">{value !== null && value !== undefined ? value.toString() : "N/A"}</p></div>
                      <p className="text-xs text-gray-400 mt-1">Field: {key}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">Application Form</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700"><X size={28} /></button>
            </div>
            <div className="p-6"><AddApplicationForm onClose={() => setShowAddForm(false)} onSuccess={() => setShowAddForm(false)} /></div>
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && editingApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold">Edit Application - {editingApplication.first_name} {editingApplication.last_name}</h2>
              <button onClick={() => { setShowEditForm(false); setEditingApplication(null) }} className="text-gray-500 hover:text-gray-700"><X size={28} /></button>
            </div>
            <div className="p-6">
              <EditApplicationForm
                formId={editingApplication.id}
                onClose={() => { setShowEditForm(false); setEditingApplication(null) }}
                onSuccess={() => { setShowEditForm(false); setEditingApplication(null); fetchApplications() }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllApplicationsPage
