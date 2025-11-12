// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download,Plus, Minus} from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import isValidAadhaar from '../utils/aadhaarValidator';

// // const API_BASE_URL = "http://13.203.251.59:4200"
// const API_BASE_URL = "https://sra.saavi.co.in"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Get user from localStorage
// const getUser = () => {
//   if (typeof window === "undefined") return null
//   try {
//     const userString = localStorage.getItem("user")
//     return userString ? JSON.parse(userString) : null
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error)
//     return null
//   }
// }

// // Fetch user profile and set in localStorage
// const fetchAndSetUserProfile = async () => {
//   const token = getAuthToken()
//   if (!token) return null

//   try {
//     const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
    
//     if (response.ok) {
//       const userData = await response.json()
//       localStorage.setItem("user", JSON.stringify(userData))
//       return userData
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error)
//   }
//   return null
// }


// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
// //   1: Yup.object({
// //     slum_id: Yup.string().required('Slum ID is required'),
// //     name_of_slum_area: Yup.string().required('Slum name is required'),
// //     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
// //     ward: Yup.string().required('Ward is required'),
// //     district: Yup.string().required('District is required'),
// //     taluka: Yup.string().required('Taluka is required'),
// //   }),
// //   2: Yup.object({
// //     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
// //     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
// //     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
// //     gender: Yup.string().required('Gender is required'),
    
// //       aadhaar_number: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
// //     aadhaar_mobile_number: Yup.string()
// //     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //       .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     user_email: Yup.string().email('Invalid email format'),
// //   }),
// //   3: Yup.object({
// //     current_address: Yup.string().required('Current address is required'),
// //     current_mobile_number: Yup.string()
// //      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //     .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     current_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     aadhaar_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     voter_card_number: Yup.string()
// //       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
// //   }),
// //   4: Yup.object({
// //     residency_since: Yup.string()
// //       .required('Residency since is required'),
// //   }),
// //   5: Yup.object({
// //     num_family_members: Yup.number()
// //       .min(1, 'At least 1 family member is required')
// //       .max(6, 'Maximum 6 family members allowed')
// //       .required('Number of family members is required'),
// //  family_member1_aadhaar: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
    


// //   }),
// //   6: Yup.object({}),
// //   7: Yup.object({}),
// }

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)
// const [visibleMembers, setVisibleMembers] = useState(1); // initially 1 member visible
// const [displayedMembers, setDisplayedMembers] = useState(1);

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: 1,
//     // num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     submitted_docs_before_2000:false,
//     doc_before_2000:false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: '',
//     submittedBy:'',
//     sale_agreement: [],
//     front_photo_path:null,
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   // const handleFileChange = (e) => {
//   //   const { name, files: selectedFiles } = e.target
//   //   if (selectedFiles && selectedFiles[0]) {
//   //     setFiles(prev => ({
//   //       ...prev,
//   //       [name]: selectedFiles[0]
//   //     }))
//   //   }
//   // }

  
// const handleFileChange = (e) => {
//   const { name, files: selectedFiles } = e.target;

//   if (name === "sale_agreement") {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: [
//         ...(prev[name] || []),  // जुने files (असतील तर)
//         ...Array.from(selectedFiles), // नवे files
//       ],
//     }));
//   } else {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: selectedFiles[0],  // बाकी fields साठी single file
//     }));
//   }
// };



//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

  


//     const toBase64 = (url) =>
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     }));
    



// // ✅ Jodpatra-3 PDF Generator
// const generateJodpatra3 = async (data) => {
 
// // const imageUrls = data.front_photo_path
// //   ? JSON.parse(data.front_photo_path) // आता array
// //   : [];


// //   console.log("imageUrls ",imageUrls[0])

// // // पहिले image
// // const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
// // console.log("firstImageUrl------------",data)

// let imageUrls = [];

// if (data.side_photo_path) {
//   try {
//     const parsed = JSON.parse(data.side_photo_path); // try parsing in case it's stringified
//     imageUrls = Array.isArray(parsed) ? parsed : [data.front_photo_path];
//   } catch (e) {
//     // If parsing fails, assume it's a single URL string
//     imageUrls = [data.side_photo_path];
//   }
// }

// // const firstImageUrl = imageUrls.length > 0 
// //   ? imageUrls[0].replace(/^"(.*)"$/, '$1') // removes starting and ending quotes
// //   : null;
// //   console.log("firstImageUrl", firstImageUrl);
// const firstImageUrl = imageUrls.length > 0
//   ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '') // removes any starting/ending " or '
//   : null;



//   // let base64Image = "";
//   // if (imageUrl) {
//   //   try {
//   //     base64Image = await toBase64(imageUrl);
//   //   } catch (e) {
//   //     console.error("Photo load error:", e);
//   //   }
//   // }

//   return new Promise((resolve, reject) => {
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

//     // HTML Layout
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//       </div>

//       <!-- अर्ज क्र + दिनांक -->
//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
//               data.slum_id || "N/A"
//             }</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
//               "en-GB"
//             )}</td>
//           </tr>
//         </table>
//       </div>

//     <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//   ${
//     firstImageUrl
//       ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//       :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//   }
// </div>

    


//       <!-- अर्जदाराची माहिती -->
//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.first_name || ""
//             } ${data.middle_name || ""} ${data.last_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.gender || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.aadhaar_number || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.current_mobile_number || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.name_of_slum_area || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.ward || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.current_address || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.residency_since || ""
//             }</td>
//           </tr>
//         </table>
//       </div>

//       <!-- कुटुंबातील सदस्य -->
//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr>
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from(
//             { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
//             (_, i) => {
//               const memberNum = i + 1;
//               return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_name`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                   data[`family_member${memberNum}_age`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_relation`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                   data[`family_member${memberNum}_gender`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_aadhaar`] || ""
//                 }</td>
//               </tr>
//             `;
//             }
//           ).join("")}
//         </table>
//       </div>

//       <!-- सही / QR -->
//       <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 8px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//           <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//         </div>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2, useCORS: true })
//         .then((canvas) => {
//           const imgData = canvas.toDataURL("image/png");
//           const pdf = new jsPDF("p", "mm", "a4");
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//           pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//           pdf.save(
//             `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
//           );

//           document.body.removeChild(pdfElement);
//           resolve(true);
//         })
//         .catch((err) => {
//           document.body.removeChild(pdfElement);
//           reject(err);
//         });
//     }, 500);
//   });
// };


// // ---------------------------------------------------------------------------------------------





















// const generateJodpatra4 =async (data) => {
//     console.log("data>>>>>",data)

//      // 1️⃣ Image base64 बनवा
// //   const imageUrl = "https://via.placeholder.com/100";
//   // const imageUrl = "https://sratoday.s3.ap-south-1.amazonaws.com/sra_uploads/doc_front_view-1758618100134.png";


//   const base64Image = await toBase64('https://via.placeholder.com/100');




//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement('div');
//     pdfElement.style.width = '210mm';
//     pdfElement.style.minHeight = '297mm';
//     pdfElement.style.padding = '15mm';
//     pdfElement.style.fontFamily = 'Arial, sans-serif';
//     pdfElement.style.fontSize = '12px';
//     pdfElement.style.lineHeight = '1.4';
//     pdfElement.style.backgroundColor = 'white';
//     pdfElement.style.position = 'absolute';
//     pdfElement.style.top = '-9999px';

//     // जोडपत्र-4 की बिल्कुल वही layout जो आपने screenshot में दिखाया है
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
        
      
//       </div>

//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.length-1 || "N/A"}</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//           </tr>
//         </table>
//       </div>

    
//  <div style="text-align: left; margin-bottom: 20px;">
//         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//           <img 
//             src="${base64Image}" 
//             alt="Arjdaar Photo" 
//             style="width: 100%; height: 100%; object-fit: cover;" 
//           />
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
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
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
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//           </tr>
//         </table>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr">
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//             const memberNum = i + 1;
//             return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//               </tr>
//             `;
//           }).join('')}
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

      


        

        
//        <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//   <div style="text-align: center;">
//     <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//       <span style="font-size: 8px;">QR Code</span>
//     </div>
//     <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//     <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//   </div>
// </div>


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

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();
        
//         // Calculate height to maintain aspect ratio
//         const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
//         pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };







// // const generateAndDownloadPdfs = async (formData) => {
// //     setGeneratingPdfs(true)
    
// //     try {
// //       const residencyYear = parseInt(formData.residency_since) || 2000
// //       console.log("Residency year:", residencyYear)
      
// //       if (residencyYear <= 2000) {
// //         // Generate jodpatra-3 for 2000 or before
// //         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
// //         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
// //         await generateJodpatra3(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
// //       } else {
// //         // Generate jodpatra-4 for after 2000
// //         setSuccess("Generating Jodpatra-4 for residency after 2000...")
// //         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
// //         await generateJodpatra4(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
// //       }
      
// //     } catch (error) {
// //       console.error("Error generating PDFs:", error)
// //       setError("Error generating PDFs: " + error.message)
// //     } finally {
// //       setTimeout(() => {
// //         setGeneratingPdfs(false)
// //       }, 3000)
// //     }
// //   }



// const generateAndDownloadPdfs = async (formData) => {
//   console.log("testing form data>>>>>>>>>>>",formData)
//   setGeneratingPdfs(true);

//   try {
//     const dateStr = formData.residency_since; // e.g. "10-09-2025" OR "00-00-0000"
//     console.log("Residency date string:", dateStr);

//     let isJodpatra3 = false;

//     if (dateStr === "00-00-0000") {
//       // जर dummy date आली तर नेहमी Jodpatra-3
//       isJodpatra3 = true;
//     } else {
//       const [day, month, year] = dateStr.split("-").map(Number);
//       const selectedDate = new Date(year, month - 1, day);
//       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

//       if (selectedDate <= cutoffDate) {
//         isJodpatra3 = true;
//       }
//     }

//     if (isJodpatra3) {
//       setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
//       console.log("Generating Jodpatra-3 for date:", dateStr);

//       await generateJodpatra3(formData);
//       setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
//     } else {
//       setSuccess("Generating Jodpatra-4 for residency after 2000...");
//       console.log("Generating Jodpatra-4 for date:", dateStr);

//       await generateJodpatra4(formData);
//       setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
//     }
//   } catch (error) {
//     console.error("Error generating PDFs:", error);
//     setError("Error generating PDFs: " + error.message);
//   } finally {
//     setTimeout(() => {
//       setGeneratingPdfs(false);
//     }, 3000);
//   }
// };




//     const addMember = () => {
//     if (displayedMembers < 6) {
//       setDisplayedMembers(displayedMembers + 1);
//     }
//   };

//   const removeMember = () => {
//     if (displayedMembers > 1) {
//       setDisplayedMembers(displayedMembers - 1);
//     }
//   };

//   const handleSubmit = async (values) => {
//     console.log("values>>>>>>>",values)
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Set submittedBy field with user role
//       var currentUser = getUser()


//       if (!currentUser) {
//         // setUserDataLoading(true)
//         // setSuccess("Getting user data...")
//         currentUser = await fetchAndSetUserProfile()
//         // setUserDataLoading(false)
//       }

//       const submittedByValue = currentUser?.user_id || "N/A";

      
//       // Add submittedBy to the values
//       const updatedValues = {
//         ...values,
//         submittedBy: submittedByValue,
//         // timestamp: new Date().toISOString(),
//         // created_date: new Date().toISOString()
//       }


//       // Add all form fields
//       Object.keys(updatedValues).forEach(key => {
//         if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
//           formDataToSend.append(key, updatedValues[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })
//   const result = await response.json();
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       // await generateAndDownloadPdfs(values)
//            await generateAndDownloadPdfs(result.form)


      
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 {/* <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label> */}
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Hut Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Municipal Corporation">Mhada</option>
//                   <option value="Municipal Corporation">SRA</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="middle_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />

//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div> */}
//                 <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Residency Since *
//   </label>
//   <Field
//     type="date"
//     name="residency_since"
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
//               focus:ring-blue-500 focus:border-transparent transition-all"
//     onChange={(e) => {
//       const date = new Date(e.target.value);
//       const formatted = date
//         ? `${String(date.getDate()).padStart(2, "0")}-${String(
//             date.getMonth() + 1
//           ).padStart(2, "0")}-${date.getFullYear()}`
//         : "";
//       formik.setFieldValue("residency_since", formatted);
//     }}
//   />

//   {/* Validation error */}
//   <ErrorMessage
//     name="residency_since"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />

//   {/* Conditional message */}
//   {formik.values.residency_since && (
//     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//       <p className="text-xs font-medium">
//         {(() => {
//           const [day, month, year] = formik.values.residency_since.split("-");
//           const selectedDate = new Date(year, month - 1, day);

//           // ✅ cutoff = 01-Jan-2000
//           const cutoffDate = new Date(2000, 0, 1);

//           return selectedDate <= cutoffDate ? (
//             <span className="text-green-600">
//               01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
//             </span>
//           ) : (
//             <span className="text-blue-600">
//               01-01-2000 नंतर - Jodpatra-4 तयार होईल
//             </span>
//           );
//         })()}
//       </p>
//     </div>
//   )}
// </div>




//               </div>
//             </div>
//           </div>
//         )

   

//     case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 value={displayedMembers}
//                 onChange={(e) => {
//                   const value = parseInt(e.target.value);
//                   if (value >= 1 && value <= 6) {
//                     setDisplayedMembers(value);
//                     formik.setFieldValue('num_family_members', value);
//                   }
//                 }}
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {Array.from({ length: displayedMembers }, (_, index) => index + 1).map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   {/* <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div> */}
//                   <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Relation
//   </label>
//   <Field
//     as="select"
//     name={`family_member${memberNum}_relation`}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//   >
//     <option value="">Select Relation</option>
//     <option value="Wife">Wife</option>
//     <option value="Husband">Husband</option>
//     <option value="Son">Son</option>
//     <option value="Daughter">Daughter</option>
//     <option value="Mother">Mother</option>
//     <option value="Father">Father</option>
//     <option value="Brother">Brother</option>
//     <option value="Sister">Sister</option>
//     <option value="Other">Other</option>
//   </Field>
// </div>


//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex items-center gap-4 mt-6">
//               {displayedMembers < 6 && (
//                 <button
//                   type="button"
//                   onClick={addMember}
//                   className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Plus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               {displayedMembers > 1 && (
//                 <button
//                   type="button"
//                   onClick={removeMember}
//                   className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Minus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               <span className="text-sm text-gray-600">
//                 {displayedMembers} of 6 members added
//               </span>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'front_photo_path', label: 'front_photo_path', accept: 'image/*', icon: '🏗️' },
 



              

//                 ...(parseInt(formik.values.residency_since) <= 2000
//   ? [
//       {
//         name: 'doc_before_2000',
//         label: 'Document Before 2000',
//         accept: 'image/*,.pdf,.doc,.docx',
//         icon: '📄',
//       },
//       {
//         name: 'submitted_docs_before_2000',
//         label: 'Submitted Docs Before 2000',
//         accept: 'image/*,.pdf',
//         icon: '📑',
//       },
//     ]
//   : []),



// ...(parseInt(formik.values.residency_since) > 2000
//     ? [
//         {
//           name: 'after_2000_proof_submitted',
//           label: 'After 2000 Proof',
//           accept: 'image/*,.pdf',
//           icon: '📃',
//         },
//       ]
//     : []),


                

//                 // { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },



//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     multiple={name === "sale_agreement"} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />

                 

// {files[name] && (
//   <div className="mt-2 p-2 bg-green-50 rounded">
//     {Array.isArray(files[name]) ? (
//       files[name].map((file, idx) => (
//         <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
//           <span className="text-green-500 mr-2">✅</span>
//           <p className="truncate">{file.name}</p>
//         </div>
//       ))
//     ) : (
//       <div className="flex items-center text-sm text-green-700">
//         <span className="text-green-500 mr-2">✅</span>
//         <p className="truncate">{files[name].name}</p>
//       </div>
//     )}
//   </div>
// )}
//   </div>
//               ))}

//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//                 <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
//                   currentStep >= step.id 
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
//                     : 'bg-white border-gray-300 text-gray-500'
//                 }`}>
//                   <span className="text-xl">{step.icon}</span>
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {/* {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )} */}

// {formik.values.residency_since && currentStep === 4 && (
//   <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//     {(() => {
//       const [day, month, year] = formik.values.residency_since.split("-");
//       const selectedDate = new Date(year, month - 1, day);
//       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

//       return selectedDate <= cutoffDate ? (
//         <span className="text-green-600 font-semibold">
//           Jodpatra-3 तयार होईल
//         </span>
//       ) : (
//         <span className="text-blue-600 font-semibold">
//           Jodpatra-4 तयार होईल
//         </span>
//       );
//     })()}
//   </div>
// )}



//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationForm

// ==============================================

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import isValidAadhaar from '../utils/aadhaarValidator';

// // const API_BASE_URL = "http://13.203.251.59:4200"
// const API_BASE_URL = "https://sra.saavi.co.in"

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Get user from localStorage
// const getUser = () => {
//   if (typeof window === "undefined") return null
//   try {
//     const userString = localStorage.getItem("user")
//     return userString ? JSON.parse(userString) : null
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error)
//     return null
//   }
// }

// // Fetch user profile and set in localStorage
// const fetchAndSetUserProfile = async () => {
//   const token = getAuthToken()
//   if (!token) return null

//   try {
//     const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
    
//     if (response.ok) {
//       const userData = await response.json()
//       localStorage.setItem("user", JSON.stringify(userData))
//       return userData
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error)
//   }
//   return null
// }


// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
// //   1: Yup.object({
// //     slum_id: Yup.string().required('Slum ID is required'),
// //     name_of_slum_area: Yup.string().required('Slum name is required'),
// //     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
// //     ward: Yup.string().required('Ward is required'),
// //     district: Yup.string().required('District is required'),
// //     taluka: Yup.string().required('Taluka is required'),
// //   }),
// //   2: Yup.object({
// //     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
// //     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
// //     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
// //     gender: Yup.string().required('Gender is required'),
    
// //       aadhaar_number: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
// //     aadhaar_mobile_number: Yup.string()
// //     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //       .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     user_email: Yup.string().email('Invalid email format'),
// //   }),
// //   3: Yup.object({
// //     current_address: Yup.string().required('Current address is required'),
// //     current_mobile_number: Yup.string()
// //      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //     .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     current_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     aadhaar_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     voter_card_number: Yup.string()
// //       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
// //   }),
// //   4: Yup.object({
// //     residency_since: Yup.string()
// //       .required('Residency since is required'),
// //   }),
// //   5: Yup.object({
// //     num_family_members: Yup.number()
// //       .min(1, 'At least 1 family member is required')
// //       .max(6, 'Maximum 6 family members allowed')
// //       .required('Number of family members is required'),
// //  family_member1_aadhaar: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
    


// //   }),
// //   6: Yup.object({}),
// //   7: Yup.object({}),
// }

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)
//   const [visibleMembers, setVisibleMembers] = useState(1); // initially 1 member visible
//   const [displayedMembers, setDisplayedMembers] = useState(1);
//   const [fetchingLocation, setFetchingLocation] = useState(false)

//   const initialValues = {
//     // Basic Information
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: '',
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
//     biometric_lat: '',
//     biometric_long: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: 1,
//     // num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     submitted_docs_before_2000:false,
//     doc_before_2000:false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: '',
//     submittedBy:'',
//     sale_agreement: [],
//     front_photo_path:null,
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   // const handleFileChange = (e) => {
//   //   const { name, files: selectedFiles } = e.target
//   //   if (selectedFiles && selectedFiles[0]) {
//   //     setFiles(prev => ({
//   //       ...prev,
//   //       [name]: selectedFiles[0]
//   //     }))
//   //   }
//   // }

  
// const handleFileChange = (e) => {
//   const { name, files: selectedFiles } = e.target;

//   if (name === "sale_agreement") {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: [
//         ...(prev[name] || []),  // जुने files (असतील तर)
//         ...Array.from(selectedFiles), // नवे files
//       ],
//     }));
//   } else {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: selectedFiles[0],  // बाकी fields साठी single file
//     }));
//   }
// };

//   // Geolocation fetch function
//   const fetchCurrentLocation = (formik) => {
//     setFetchingLocation(true)
//     setError(null)

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by this browser.")
//       setFetchingLocation(false)
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude = position.coords.latitude.toFixed(6)
//         const longitude = position.coords.longitude.toFixed(6)
        
//         formik.setFieldValue('biometric_lat', latitude)
//         formik.setFieldValue('biometric_long', longitude)
        
//         setSuccess(`Location fetched successfully! Lat: ${latitude}, Long: ${longitude}`)
//         setFetchingLocation(false)
        
//         // Clear success message after 3 seconds
//         setTimeout(() => setSuccess(null), 3000)
//       },
//       (error) => {
//         let errorMessage = "Unable to retrieve your location."
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access denied by user."
//             break
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable."
//             break
//           case error.TIMEOUT:
//             errorMessage = "The request to get user location timed out."
//             break
//         }
//         setError(errorMessage)
//         setFetchingLocation(false)
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     )
//   }

//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

  


//     const toBase64 = (url) =>
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     }));
    



// // ✅ Jodpatra-3 PDF Generator
// const generateJodpatra3 = async (data) => {
 
// // const imageUrls = data.front_photo_path
// //   ? JSON.parse(data.front_photo_path) // आता array
// //   : [];


// //   console.log("imageUrls ",imageUrls[0])

// // // पहिले image
// // const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
// // console.log("firstImageUrl------------",data)

// let imageUrls = [];

// if (data.side_photo_path) {
//   try {
//     const parsed = JSON.parse(data.side_photo_path); // try parsing in case it's stringified
//     imageUrls = Array.isArray(parsed) ? parsed : [data.front_photo_path];
//   } catch (e) {
//     // If parsing fails, assume it's a single URL string
//     imageUrls = [data.side_photo_path];
//   }
// }

// // const firstImageUrl = imageUrls.length > 0 
// //   ? imageUrls[0].replace(/^"(.*)"$/, '$1') // removes starting and ending quotes
// //   : null;
// //   console.log("firstImageUrl", firstImageUrl);
// const firstImageUrl = imageUrls.length > 0
//   ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '') // removes any starting/ending " or '
//   : null;



//   // let base64Image = "";
//   // if (imageUrl) {
//   //   try {
//   //     base64Image = await toBase64(imageUrl);
//   //   } catch (e) {
//   //     console.error("Photo load error:", e);
//   //   }
//   // }

//   return new Promise((resolve, reject) => {
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

//     // HTML Layout
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
//         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
//         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
//       </div>

//       <!-- अर्ज क्र + दिनांक -->
//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
//               data.slum_id || "N/A"
//             }</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
//               "en-GB"
//             )}</td>
//           </tr>
//         </table>
//       </div>

//     <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//   ${
//     firstImageUrl
//       ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//       :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
//   }
// </div>

    


//       <!-- अर्जदाराची माहिती -->
//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.first_name || ""
//             } ${data.middle_name || ""} ${data.last_name || ""}</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.gender || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.aadhaar_number || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.current_mobile_number || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.name_of_slum_area || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.ward || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.current_address || ""
//             }</td>
//           </tr>
//           <tr>
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${
//               data.residency_since || ""
//             }</td>
//           </tr>
//         </table>
//       </div>

//       <!-- कुटुंबातील सदस्य -->
//       <div style="margin-bottom: 20px;">
//         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr>
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from(
//             { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
//             (_, i) => {
//               const memberNum = i + 1;
//               return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_name`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                   data[`family_member${memberNum}_age`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_relation`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
//                   data[`family_member${memberNum}_gender`] || ""
//                 }</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${
//                   data[`family_member${memberNum}_aadhaar`] || ""
//                 }</td>
//               </tr>
//             `;
//             }
//           ).join("")}
//         </table>
//       </div>

//       <!-- सही / QR -->
//       <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//         <div style="text-align: center;">
//           <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//             <span style="font-size: 8px;">QR Code</span>
//           </div>
//           <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//           <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//         </div>
//       </div>
//     `;

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2, useCORS: true })
//         .then((canvas) => {
//           const imgData = canvas.toDataURL("image/png");
//           const pdf = new jsPDF("p", "mm", "a4");
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//           pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

//           pdf.save(
//             `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
//           );

//           document.body.removeChild(pdfElement);
//           resolve(true);
//         })
//         .catch((err) => {
//           document.body.removeChild(pdfElement);
//           reject(err);
//         });
//     }, 500);
//   });
// };


// // ---------------------------------------------------------------------------------------------





















// const generateJodpatra4 =async (data) => {
//     console.log("data>>>>>",data)

//      // 1️⃣ Image base64 बनवा
// //   const imageUrl = "https://via.placeholder.com/100";
//   // const imageUrl = "https://sratoday.s3.ap-south-1.amazonaws.com/sra_uploads/doc_front_view-1758618100134.png";


//   const base64Image = await toBase64('https://via.placeholder.com/100');




//   return new Promise((resolve, reject) => {
//     const pdfElement = document.createElement('div');
//     pdfElement.style.width = '210mm';
//     pdfElement.style.minHeight = '297mm';
//     pdfElement.style.padding = '15mm';
//     pdfElement.style.fontFamily = 'Arial, sans-serif';
//     pdfElement.style.fontSize = '12px';
//     pdfElement.style.lineHeight = '1.4';
//     pdfElement.style.backgroundColor = 'white';
//     pdfElement.style.position = 'absolute';
//     pdfElement.style.top = '-9999px';

//     // जोडपत्र-4 की बिल्कुल वही layout जो आपने screenshot में दिखाया है
//     pdfElement.innerHTML = `
//       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//         <hr style="margin: 8px 0; border: 1px solid #000;">
//         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
        
      
//       </div>

//       <div style="margin-bottom: 20px;">
//         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//           <tr>
//             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.length-1 || "N/A"}</td>
//             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//           </tr>
//         </table>
//       </div>

    
//  <div style="text-align: left; margin-bottom: 20px;">
//         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
//           <img 
//             src="${base64Image}" 
//             alt="Arjdaar Photo" 
//             style="width: 100%; height: 100%; object-fit: cover;" 
//           />
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
//             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//             <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
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
//             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//           </tr>
//         </table>
        
//         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//           <tr">
//             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//             <th style="border: 1px solid #000; padding: 4px;">वय</th>
//             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//           </tr>
//           ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//             const memberNum = i + 1;
//             return `
//               <tr>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//               </tr>
//             `;
//           }).join('')}
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

      


        

        
//        <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//   <div style="text-align: center;">
//     <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//       <span style="font-size: 8px;">QR Code</span>
//     </div>
//     <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//     <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//   </div>
// </div>


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

//     document.body.appendChild(pdfElement);

//     setTimeout(() => {
//       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pageWidth = pdf.internal.pageSize.getWidth();
//         const pageHeight = pdf.internal.pageSize.getHeight();
        
//         // Calculate height to maintain aspect ratio
//         const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
//         pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
//         // ✅ PDF डाउनलोड करतो
//         pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
//         document.body.removeChild(pdfElement);
//         resolve(true);
//       }).catch((err) => {
//         document.body.removeChild(pdfElement);
//         reject(err);
//       });
//     }, 500);
//   });
// };







// // const generateAndDownloadPdfs = async (formData) => {
// //     setGeneratingPdfs(true)
    
// //     try {
// //       const residencyYear = parseInt(formData.residency_since) || 2000
// //       console.log("Residency year:", residencyYear)
      
// //       if (residencyYear <= 2000) {
// //         // Generate jodpatra-3 for 2000 or before
// //         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
// //         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
// //         await generateJodpatra3(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
// //       } else {
// //         // Generate jodpatra-4 for after 2000
// //         setSuccess("Generating Jodpatra-4 for residency after 2000...")
// //         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
// //         await generateJodpatra4(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
// //       }
      
// //     } catch (error) {
// //       console.error("Error generating PDFs:", error)
// //       setError("Error generating PDFs: " + error.message)
// //     } finally {
// //       setTimeout(() => {
// //         setGeneratingPdfs(false)
// //       }, 3000)
// //     }
// //   }



// const generateAndDownloadPdfs = async (formData) => {
//   console.log("testing form data>>>>>>>>>>>",formData)
//   setGeneratingPdfs(true);

//   try {
//     const dateStr = formData.residency_since; // e.g. "10-09-2025" OR "00-00-0000"
//     console.log("Residency date string:", dateStr);

//     let isJodpatra3 = false;

//     if (dateStr === "00-00-0000") {
//       // जर dummy date आली तर नेहमी Jodpatra-3
//       isJodpatra3 = true;
//     } else {
//       const [day, month, year] = dateStr.split("-").map(Number);
//       const selectedDate = new Date(year, month - 1, day);
//       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

//       if (selectedDate <= cutoffDate) {
//         isJodpatra3 = true;
//       }
//     }

//     if (isJodpatra3) {
//       setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
//       console.log("Generating Jodpatra-3 for date:", dateStr);

//       await generateJodpatra3(formData);
//       setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
//     } else {
//       setSuccess("Generating Jodpatra-4 for residency after 2000...");
//       console.log("Generating Jodpatra-4 for date:", dateStr);

//       await generateJodpatra4(formData);
//       setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
//     }
//   } catch (error) {
//     console.error("Error generating PDFs:", error);
//     setError("Error generating PDFs: " + error.message);
//   } finally {
//     setTimeout(() => {
//       setGeneratingPdfs(false);
//     }, 3000);
//   }
// };




//     const addMember = () => {
//     if (displayedMembers < 6) {
//       setDisplayedMembers(displayedMembers + 1);
//     }
//   };

//   const removeMember = () => {
//     if (displayedMembers > 1) {
//       setDisplayedMembers(displayedMembers - 1);
//     }
//   };

//   const handleSubmit = async (values) => {
//     console.log("values>>>>>>>",values)
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Set submittedBy field with user role
//       var currentUser = getUser()


//       if (!currentUser) {
//         // setUserDataLoading(true)
//         // setSuccess("Getting user data...")
//         currentUser = await fetchAndSetUserProfile()
//         // setUserDataLoading(false)
//       }

//       const submittedByValue = currentUser?.user_id || "N/A";

      
//       // Add submittedBy to the values
//       const updatedValues = {
//         ...values,
//         submittedBy: submittedByValue,
//         // timestamp: new Date().toISOString(),
//         // created_date: new Date().toISOString()
//       }


//       // Add all form fields
//       Object.keys(updatedValues).forEach(key => {
//         if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
//           formDataToSend.append(key, updatedValues[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })
//   const result = await response.json();
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       // await generateAndDownloadPdfs(values)
//            await generateAndDownloadPdfs(result.form)


      
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Municipal Corporation *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Ward *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ward</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">District *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select District</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Taluka *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Taluka</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Village</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Use</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Use</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Floor</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Floor</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 {/* <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label> */}
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Hut Land</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Ownership</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Municipal Corporation">Mhada</option>
//                   <option value="Municipal Corporation">SRA</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Survey Status</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Status</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Plan Submitted</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">Society Registered</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Middle Name</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="middle_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />

//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number (12 digits) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Mobile Number (10 digits)</label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Spouse Name</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">User Email</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Address</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Address *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Pincode (6 digits)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Current Mobile Number (10 digits) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Type</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">Select Voter Card Type</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Voter Card Number (10 digits)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               {/* Latitude Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-1" />
//                   Latitude
//                 </label>
//                 <Field
//                   type="text"
//                   name="biometric_lat"
//                   placeholder="19.0760"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               {/* Longitude Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-1" />
//                   Longitude
//                 </label>
//                 <Field
//                   type="text"
//                   name="biometric_long"
//                   placeholder="72.8777"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Geolocation Button */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <MapPin className="w-5 h-5 text-white" />
//                 </div>
//                 Location Services
//               </h4>
//               <div className="flex items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={() => fetchCurrentLocation(formik)}
//                   disabled={fetchingLocation}
//                   className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
//                     fetchingLocation
//                       ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                       : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
//                   } text-white`}
//                 >
//                   {fetchingLocation ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Fetching Location...
//                     </>
//                   ) : (
//                     <>
//                       <Crosshair size={20} />
//                       Get Current Location
//                     </>
//                   )}
//                 </button>
                
//                 {formik.values.biometric_lat && formik.values.biometric_long && (
//                   <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
//                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-green-700 font-medium text-sm">
//                       Location: {parseFloat(formik.values.biometric_lat).toFixed(4)}, {parseFloat(formik.values.biometric_long).toFixed(4)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 Bank Details
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                 Slum Details
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Length (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Width (m)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Area (sq m)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div> */}
//                 <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Residency Since *
//   </label>
//   <Field
//     type="date"
//     name="residency_since"
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
//               focus:ring-blue-500 focus:border-transparent transition-all"
//     onChange={(e) => {
//       const date = new Date(e.target.value);
//       const formatted = date
//         ? `${String(date.getDate()).padStart(2, "0")}-${String(
//             date.getMonth() + 1
//           ).padStart(2, "0")}-${date.getFullYear()}`
//         : "";
//       formik.setFieldValue("residency_since", formatted);
//     }}
//   />

//   {/* Validation error */}
//   <ErrorMessage
//     name="residency_since"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />

//   {/* Conditional message */}
//   {formik.values.residency_since && (
//     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//       <p className="text-xs font-medium">
//         {(() => {
//           const [day, month, year] = formik.values.residency_since.split("-");
//           const selectedDate = new Date(year, month - 1, day);

//           // ✅ cutoff = 01-Jan-2000
//           const cutoffDate = new Date(2000, 0, 1);

//           return selectedDate <= cutoffDate ? (
//             <span className="text-green-600">
//               01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
//             </span>
//           ) : (
//             <span className="text-blue-600">
//               01-01-2000 नंतर - Jodpatra-4 तयार होईल
//             </span>
//           );
//         })()}
//       </p>
//     </div>
//   )}
// </div>




//               </div>
//             </div>
//           </div>
//         )

   

//     case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Family Members (Max 6 members)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Number of Family Members *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 value={displayedMembers}
//                 onChange={(e) => {
//                   const value = parseInt(e.target.value);
//                   if (value >= 1 && value <= 6) {
//                     setDisplayedMembers(value);
//                     formik.setFieldValue('num_family_members', value);
//                   }
//                 }}
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {Array.from({ length: displayedMembers }, (_, index) => index + 1).map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   {/* <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div> */}
//                   <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Relation
//   </label>
//   <Field
//     as="select"
//     name={`family_member${memberNum}_relation`}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//   >
//     <option value="">Select Relation</option>
//     <option value="Wife">Wife</option>
//     <option value="Husband">Husband</option>
//     <option value="Son">Son</option>
//     <option value="Daughter">Daughter</option>
//     <option value="Mother">Mother</option>
//     <option value="Father">Father</option>
//     <option value="Brother">Brother</option>
//     <option value="Sister">Sister</option>
//     <option value="Other">Other</option>
//   </Field>
// </div>


//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">Select</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Aadhaar Number (12 digits)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex items-center gap-4 mt-6">
//               {displayedMembers < 6 && (
//                 <button
//                   type="button"
//                   onClick={addMember}
//                   className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Plus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               {displayedMembers > 1 && (
//                 <button
//                   type="button"
//                   onClick={removeMember}
//                   className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Minus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               <span className="text-sm text-gray-600">
//                 {displayedMembers} of 6 members added
//               </span>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Side View Photo', accept: 'image/*', icon: '🏗️' },
//                 { name: 'front_photo_path', label: 'front_photo_path', accept: 'image/*', icon: '🏗️' },
 



              

//                 ...(parseInt(formik.values.residency_since) <= 2000
//   ? [
//       {
//         name: 'doc_before_2000',
//         label: 'Document Before 2000',
//         accept: 'image/*,.pdf,.doc,.docx',
//         icon: '📄',
//       },
//       {
//         name: 'submitted_docs_before_2000',
//         label: 'Submitted Docs Before 2000',
//         accept: 'image/*,.pdf',
//         icon: '📑',
//       },
//     ]
//   : []),



// ...(parseInt(formik.values.residency_since) > 2000
//     ? [
//         {
//           name: 'after_2000_proof_submitted',
//           label: 'After 2000 Proof',
//           accept: 'image/*,.pdf',
//           icon: '📃',
//         },
//       ]
//     : []),


                

//                 // { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },



//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     multiple={name === "sale_agreement"} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />

                 

// {files[name] && (
//   <div className="mt-2 p-2 bg-green-50 rounded">
//     {Array.isArray(files[name]) ? (
//       files[name].map((file, idx) => (
//         <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
//           <span className="text-green-500 mr-2">✅</span>
//           <p className="truncate">{file.name}</p>
//         </div>
//       ))
//     ) : (
//       <div className="flex items-center text-sm text-green-700">
//         <span className="text-green-500 mr-2">✅</span>
//         <p className="truncate">{files[name].name}</p>
//       </div>
//     )}
//   </div>
// )}
//   </div>
//               ))}

//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//                 <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
//                   currentStep >= step.id 
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
//                     : 'bg-white border-gray-300 text-gray-500'
//                 }`}>
//                   <span className="text-xl">{step.icon}</span>
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {/* {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )} */}

// {formik.values.residency_since && currentStep === 4 && (
//   <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//     {(() => {
//       const [day, month, year] = formik.values.residency_since.split("-");
//       const selectedDate = new Date(year, month - 1, day);
//       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

//       return selectedDate <= cutoffDate ? (
//         <span className="text-green-600 font-semibold">
//           Jodpatra-3 तयार होईल
//         </span>
//       ) : (
//         <span className="text-blue-600 font-semibold">
//           Jodpatra-4 तयार होईल
//         </span>
//       );
//     })()}
//   </div>
// )}



//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationForm;

// ==================================================================



// *****Previous

// import { useState,useEffect } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import isValidAadhaar from '../utils/aadhaarValidator';
// import clusterData from "../data/clusterdata.json";
// import wardsData from "../data/wardsData.json";


// // const API_BASE_URL = "http://13.203.251.59:4200"
// // const API_BASE_URL = "https://sra.saavi.co.in"

// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

// // Get user from localStorage
// const getUser = () => {
//   if (typeof window === "undefined") return null
//   try {
//     const userString = localStorage.getItem("user")
//     return userString ? JSON.parse(userString) : null
//   } catch (error) {
//     console.error("Error parsing user from localStorage:", error)
//     return null
//   }
// }

// // Fetch user profile and set in localStorage
// const fetchAndSetUserProfile = async () => {
//   const token = getAuthToken()
//   if (!token) return null

//   try {
//     const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
    
//     if (response.ok) {
//       const userData = await response.json()
//       localStorage.setItem("user", JSON.stringify(userData))
//       return userData
//     }
//   } catch (error) {
//     console.error("Error fetching profile:", error)
//   }
//   return null
// }
// // Enhanced validation schemas with proper field validation
// const validationSchemas = {
// //   1: Yup.object({
// //     slum_id: Yup.string().required('Slum ID is required'),
// //     // name_of_slum_area: Yup.string().required('Hut name is required'),
// //     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
// //     ward: Yup.string().required('Ward is required'),
// //     district: Yup.string().required('District is required'),
// //     taluka: Yup.string().required('Taluka is required'),
// //   }),
// //   2: Yup.object({
// //     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
// //     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
// //     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
// //     gender: Yup.string().required('Gender is required'),
    
// //       aadhaar_number: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
// //     aadhaar_mobile_number: Yup.string()
// //     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //       .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     user_email: Yup.string().email('Invalid email format'),
// //   }),
// //   3: Yup.object({
// //     current_address: Yup.string().required('Current address is required'),
// //     current_mobile_number: Yup.string()
// //      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
// //     .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
// //       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
// //       .required('Mobile number is required'),
// //     current_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     aadhaar_pincode: Yup.string()
// //       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
// //     voter_card_number: Yup.string()
// //       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
// //   }),
// //   4: Yup.object({
// //     residency_since: Yup.string()
// //       .required('Residency since is required'),
// //   }),
// //   5: Yup.object({
// //     num_family_members: Yup.number()
// //       .min(1, 'At least 1 family member is required')
// //       .max(6, 'Maximum 6 family members allowed')
// //       .required('Number of family members is required'),
// //  family_member1_aadhaar: Yup.string()
// //       .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
    


// //   }),
// //   6: Yup.object({}),
// //   7: Yup.object({}),
// }

// const ApplicationForm = ({ onClose, onSuccess }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)
//   const [visibleMembers, setVisibleMembers] = useState(1); // initially 1 member visible
//   const [displayedMembers, setDisplayedMembers] = useState(1);
//   const [fetchingLocation, setFetchingLocation] = useState(false)
//  const [locationFetched, setLocationFetched] = useState(false)
//   const [selectedCluster, setSelectedCluster] = useState("");
//   const [slums, setSlums] = useState([]);
// const [huts, setHuts] = useState([]);
// const [selectedSlum, setSelectedSlum] = useState("");
//   const [clusters, setClusters] = useState([]);


//   //  const handleClusterChange = (e) => {
//   //   const cluster = e.target.value;
//   //   setSelectedCluster(cluster);

//   //   // Cluster select kel ki tya cluster madhil slums fetch karnar
//   //   const clusterData = clusters.find(c => c.cluster_number === cluster);
//   //   setSlums(clusterData ? clusterData.slums : []);
//   // };
// // --------------------------------------

//   // const handleClusterChange = (e, form) => {
//   //   const clusterNumber = e.target.value;
//   //   setSelectedCluster(clusterNumber);
//   //   form.setFieldValue("cluster_number", clusterNumber);

//   //   // find selected cluster from imported JSON data
//   //   const selectedClusterData = clusterData.find(
//   //     (c) => c.cluster_number === clusterNumber
//   //   );

//   //   // set related slums dynamically
//   //   setSlums(selectedClusterData ? selectedClusterData.slums : []);
//   //    setHuts([]); // reset huts when cluster changes

//   //   // reset slum_name field when cluster changes
//   //   form.setFieldValue("slum_name", "");
//   // };

// // --------------------------------------------------

//  useEffect(() => {
//     fetchClusters();
//     fetchSlums();
//   }, []);


 


//   // ✅ Fetch cluster details by cluster_number (auto-fill district, taluka, ward, etc.)
//   const fetchClusterDetails = async (cluster_number, formik) => {
//     if (!cluster_number) return;
//     const token = getAuthToken();
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/${cluster_number}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch cluster details");
//       const data = await response.json();

//       // Auto-fill values
//       formik.setFieldValue("district", data.district || "");
//       formik.setFieldValue("taluka", data.taluka || "");
//       formik.setFieldValue("ward", data.ward || "");
//       formik.setFieldValue("municipal_corporation", data.municipal_corporation || "BMC");
//     } catch (err) {
//       console.error("Error fetching cluster details:", err);
//     }
//   };

// // ✅ Whenever cluster changes, fetch details
// // useEffect(() => {
// //   if (selectedCluster) {
// //     fetchClusterDetails(selectedCluster);
// //   }
// // }, [selectedCluster]);

//   const fetchSlums = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view slums");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch slums");
//       }

//       const data = await response.json();
//       setSlums(data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching slums:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchClusters = async () => {
//     const token = getAuthToken();
//     if (!token) {
//       setError("Please login to view clusters");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch clusters");
//       }

//       const data = await response.json();
//       setClusters(data || []);
//       setError(null);
//     } catch (err) {
//       console.error("Error fetching clusters:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };



// const handleClusterChange = (e, form) => {
//   const cluster = e.target.value;
//   setSelectedCluster(cluster);

//   const selectedClusterData = clusterData.find(
//     (c) => c.cluster_number === cluster
//   );

//   setSlums(selectedClusterData ? selectedClusterData.slums : []);
//   setHuts([]); // reset huts when cluster changes
//   form.setFieldValue("cluster_number", cluster);
//   form.setFieldValue("slum_id", "");
//   form.setFieldValue("hut_name", "");
// };


// const handleSlumChange = (e, form) => {
//   const slumId = e.target.value;
//   setSelectedSlum(slumId);

//   const selectedSlumData = slums.find((s) => s.slum_id === slumId);
//   setHuts(selectedSlumData ? selectedSlumData.huts : []);

//   form.setFieldValue("slum_id", slumId);
//   form.setFieldValue("hut_name", "");
// };



//   const initialValues = {
//     // Basic Information
//     hut_id:'',
//     hut_name:'',
//     slum_id: '',
//     name_of_slum_area: '',
//     municipal_corporation: "BMC", // ✅ default
//     ward: '',
//     district: '',
//     taluka: '',
//     village: '',
//     cluster_number: '',
//     slum_use: '',
//     slum_floor: '',
//     ownership_of_slum_land: '',
//     survey_status: '',
//     plan_submitted: false,
//     society_registered: false,
    
//     // Personal Details
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     gender: '',
//     spouse_name: '',
//     user_email: '',
//     aadhaar_number: '',
//     aadhaar_mobile_number: '',
    
//     // Address Contact
//     aadhaar_address: '',
//     aadhaar_pincode: '',
//     current_address: '',
//     current_pincode: '',
//     current_mobile_number: '',
//     voter_card_type: '',
//     voter_card_number: '',
//     biometric_lat: '',
//     biometric_long: '',
    
//     // Bank Details
//     bank_name: '',
//     account_number: '',
//     ifsc_code: '',
    
//     // Slum Details
//     length: '',
//     width: '',
//     area_sq_m: '',
//     residency_since: '',
    
//     // Family Information
//     num_family_members: 1,
//     // num_family_members: '',
//     family_member1_name: '',
//     family_member1_age: '',
//     family_member1_relation: '',
//     family_member1_gender: '',
//     family_member1_aadhaar: '',
//     family_member2_name: '',
//     family_member2_age: '',
//     family_member2_relation: '',
//     family_member2_gender: '',
//     family_member2_aadhaar: '',
//     family_member3_name: '',
//     family_member3_age: '',
//     family_member3_relation: '',
//     family_member3_gender: '',
//     family_member3_aadhaar: '',
//     family_member4_name: '',
//     family_member4_age: '',
//     family_member4_relation: '',
//     family_member4_gender: '',
//     family_member4_aadhaar: '',
//     family_member5_name: '',
//     family_member5_age: '',
//     family_member5_relation: '',
//     family_member5_gender: '',
//     family_member5_aadhaar: '',
//     family_member6_name: '',
//     family_member6_age: '',
//     family_member6_relation: '',
//     family_member6_gender: '',
//     family_member6_aadhaar: '',
    
//     // Additional fields
//     self_declaration_letter: false,
//     submitted_docs_before_2000:false,
//     doc_before_2000:false,
//     after_2000_proof_submitted: false,
//     timestamp: '',
//     created_date: '',
//     submittedBy:'',
//     sale_agreement: [],
//     // front_photo_path:null,
//     doc_front_view:null,
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: '🏢' },
//     { id: 2, title: 'Personal Details', icon: '👤' },
//     { id: 3, title: 'Address Contact', icon: '📍' },
//     { id: 4, title: 'Bank and Slum Details', icon: '🏦' },
//     { id: 5, title: 'Family Members', icon: '👨‍👩‍👧‍👦' },
//     { id: 6, title: 'Images', icon: '📷' },
//     { id: 7, title: 'Metadata', icon: '📄' }
//   ]

//   // const handleFileChange = (e) => {
//   //   const { name, files: selectedFiles } = e.target
//   //   if (selectedFiles && selectedFiles[0]) {
//   //     setFiles(prev => ({
//   //       ...prev,
//   //       [name]: selectedFiles[0]
//   //     }))
//   //   }
//   // }

  
// const handleFileChange = (e) => {
//   const { name, files: selectedFiles } = e.target;

//   if (name === "sale_agreement") {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: [
//         ...(prev[name] || []),  // जुने files (असतील तर)
//         ...Array.from(selectedFiles), // नवे files
//       ],
//     }));
//   } else {
//     setFiles((prev) => ({
//       ...prev,
//       [name]: selectedFiles[0],  // बाकी fields साठी single file
//     }));
//   }
// };

//   // Geolocation fetch function
//   const fetchCurrentLocation = (formik) => {
//     setFetchingLocation(true)
//     setError(null)

//     if (!navigator.geolocation) {
//       setError("Geolocation is not supported by this browser.")
//       setFetchingLocation(false)
//       return
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude = position.coords.latitude.toFixed(6)
//         const longitude = position.coords.longitude.toFixed(6)
        
//         formik.setFieldValue('biometric_lat', latitude)
//         formik.setFieldValue('biometric_long', longitude)
        
//        setLocationFetched(true)
//         setSuccess(`Location fetched successfully! Lat: ${latitude}, Long: ${longitude}`)
//         setFetchingLocation(false)
        
//         // Clear success message after 3 seconds
//         setTimeout(() => setSuccess(null), 3000)
//       },
//       (error) => {
//         let errorMessage = "Unable to retrieve your location."
//         switch(error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access denied by user."
//             break
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is unavailable."
//             break
//           case error.TIMEOUT:
//             errorMessage = "The request to get user location timed out."
//             break
//         }
//         setError(errorMessage)
//         setFetchingLocation(false)
//       },
//       {
//         enableHighAccuracy: true,
//         timeout: 10000,
//         maximumAge: 60000
//       }
//     )
//   }

//  // Auto-fetch location when reaching step 3
//  const autoFetchLocation = (formik) => {
//    if (!locationFetched && !fetchingLocation) {
//      fetchCurrentLocation(formik)
//    }
//  }
//   const nextStep = (formik) => {
//     // Validate current step before proceeding
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         const stepErrors = Object.keys(errors).length > 0
//         if (!stepErrors) {
//           if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1)
//            // Auto-fetch location when reaching Address Contact step
//            if (currentStep + 1 === 3) {
//              setTimeout(() => autoFetchLocation(formik), 500)
//            }
//           }
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//        // Auto-fetch location when reaching Address Contact step
//        if (currentStep + 1 === 3) {
//          setTimeout(() => autoFetchLocation(formik), 500)
//        }
//       }
//     }
//   }

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1)
//     }
//   }

  


//     const toBase64 = (url) =>
//   fetch(url)
//     .then(response => response.blob())
//     .then(blob => new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result);
//       reader.onerror = reject;
//       reader.readAsDataURL(blob);
//     }));
    



// // // ✅ Jodpatra-3 PDF Generator
// // const generateJodpatra3 = async (data) => {
 
// // // const imageUrls = data.front_photo_path
// // //   ? JSON.parse(data.front_photo_path) // आता array
// // //   : [];


// // //   console.log("imageUrls ",imageUrls[0])

// // // // पहिले image
// // // const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : null;
// // // console.log("firstImageUrl------------",data)

// // let imageUrls = [];

// // if (data.side_photo_path) {
// //   try {
// //     const parsed = JSON.parse(data.side_photo_path); // try parsing in case it's stringified
// //     imageUrls = Array.isArray(parsed) ? parsed : [data.side_photo_path];
// //   } catch (e) {
// //     // If parsing fails, assume it's a single URL string
// //     imageUrls = [data.side_photo_path];
// //   }
// // }

// // // const firstImageUrl = imageUrls.length > 0 
// // //   ? imageUrls[0].replace(/^"(.*)"$/, '$1') // removes starting and ending quotes
// // //   : null;
// // //   console.log("firstImageUrl", firstImageUrl);
// // const firstImageUrl = imageUrls.length > 0
// //   ? imageUrls[0].trim().replace(/^["']+|["']+$/g, '') // removes any starting/ending " or '
// //   : null;



// //   // let base64Image = "";
// //   // if (imageUrl) {
// //   //   try {
// //   //     base64Image = await toBase64(imageUrl);
// //   //   } catch (e) {
// //   //     console.error("Photo load error:", e);
// //   //   }
// //   // }

// //   return new Promise((resolve, reject) => {
// //     const pdfElement = document.createElement("div");
// //     pdfElement.style.width = "210mm";
// //     pdfElement.style.minHeight = "297mm";
// //     pdfElement.style.padding = "15mm";
// //     pdfElement.style.fontFamily = "Arial, sans-serif";
// //     pdfElement.style.fontSize = "12px";
// //     pdfElement.style.lineHeight = "1.4";
// //     pdfElement.style.backgroundColor = "white";
// //     pdfElement.style.position = "absolute";
// //     pdfElement.style.top = "-9999px";

// //     // HTML Layout
// //     pdfElement.innerHTML = `
// //       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
// //         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
// //         <hr style="margin: 8px 0; border: 1px solid #000;">
// //         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
// //         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
// //         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
// //       </div>

// //       <!-- अर्ज क्र + दिनांक -->
// //       <div style="margin-bottom: 20px;">
// //         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${
// //               data.slum_id || "N/A"
// //             }</td>
// //             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString(
// //               "en-GB"
// //             )}</td>
// //           </tr>
// //         </table>
// //       </div>

// //     <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
// //   ${
// //     firstImageUrl
// //       ? `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
// //       :  `<img src="/user2.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />`
// //   }
// // </div>

    


// //       <!-- अर्जदाराची माहिती -->
// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
        
// //         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; width: 35%; font-weight: bold;">१. अर्जदाराचे नाव:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.first_name || ""
// //             } ${data.middle_name || ""} ${data.last_name || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.gender || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.aadhaar_number || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.current_mobile_number || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.name_of_slum_area || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.ward || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.current_address || ""
// //             }</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${
// //               data.residency_since || ""
// //             }</td>
// //           </tr>
// //         </table>
// //       </div>

// //       <!-- कुटुंबातील सदस्य -->
// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
        
// //         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
// //           <tr>
// //             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
// //             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
// //             <th style="border: 1px solid #000; padding: 4px;">वय</th>
// //             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
// //             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
// //             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
// //           </tr>
// //           ${Array.from(
// //             { length: Math.min(parseInt(data.num_family_members) || 0, 6) },
// //             (_, i) => {
// //               const memberNum = i + 1;
// //               return `
// //               <tr>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${
// //                   data[`family_member${memberNum}_name`] || ""
// //                 }</td>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
// //                   data[`family_member${memberNum}_age`] || ""
// //                 }</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${
// //                   data[`family_member${memberNum}_relation`] || ""
// //                 }</td>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${
// //                   data[`family_member${memberNum}_gender`] || ""
// //                 }</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${
// //                   data[`family_member${memberNum}_aadhaar`] || ""
// //                 }</td>
// //               </tr>
// //             `;
// //             }
// //           ).join("")}
// //         </table>
// //       </div>

// //       <!-- सही / QR -->
// //       <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
// //         <div style="text-align: center;">
// //           <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
// //            <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
// //           </div>
// //           <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
// //           <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
// //         </div>
// //       </div>
// //     `;

// //     document.body.appendChild(pdfElement);

// //     setTimeout(() => {
// //       html2canvas(pdfElement, { scale: 2, useCORS: true })
// //         .then((canvas) => {
// //           const imgData = canvas.toDataURL("image/png");
// //           const pdf = new jsPDF("p", "mm", "a4");
// //           const pdfWidth = pdf.internal.pageSize.getWidth();
// //           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

// //           pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

// //           pdf.save(
// //             `Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`
// //           );

// //           document.body.removeChild(pdfElement);
// //           resolve(true);
// //         })
// //         .catch((err) => {
// //           document.body.removeChild(pdfElement);
// //           reject(err);
// //         });
// //     }, 500);
// //   });
// // };


// // ---------------------------------------------------------------------------------------------




// // const generateJodpatra4 =async (data) => {
// //     console.log("data>>>>>",data)

// //      // 1️⃣ Image base64 बनवा
// // //   const imageUrl = "https://via.placeholder.com/100";
// //   // const imageUrl = "https://sratoday.s3.ap-south-1.amazonaws.com/sra_uploads/doc_front_view-1758618100134.png";


// //   // const base64Image = await toBase64('https://via.placeholder.com/100');




// //   return new Promise((resolve, reject) => {
// //     const pdfElement = document.createElement('div');
// //     pdfElement.style.width = '210mm';
// //     pdfElement.style.minHeight = '297mm';
// //     pdfElement.style.padding = '15mm';
// //     pdfElement.style.fontFamily = 'Arial, sans-serif';
// //     pdfElement.style.fontSize = '12px';
// //     pdfElement.style.lineHeight = '1.4';
// //     pdfElement.style.backgroundColor = 'white';
// //     pdfElement.style.position = 'absolute';
// //     pdfElement.style.top = '-9999px';

// //     // जोडपत्र-4 की बिल्कुल वही layout जो आपने screenshot में दिखाया है
// //     pdfElement.innerHTML = `
// //       <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
// //         <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
// //         <hr style="margin: 8px 0; border: 1px solid #000;">
// //         <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
// //         <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
// //         <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
        
      
// //       </div>

// //       <div style="margin-bottom: 20px;">
// //         <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.length-1 || "N/A"}</td>
// //             <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
// //           </tr>
// //         </table>
// //       </div>

    
// //  <div style="text-align: left; margin-bottom: 20px;">
// //         <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
// //           <img 
// //             src="/user2.png" 
// //             alt="Arjdaar Photo" 
// //             style="width: 100%; height: 100%; object-fit: cover;" 
// //           />
// //         </div>
// //         <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
// //       </div>


// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>
        
// //         <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
// //           </tr>
// //         </table>
// //       </div>

// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
// //         <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
// //             <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
// //           </tr>
// //         </table>
        
// //         <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
// //           <tr">
// //             <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
// //             <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
// //             <th style="border: 1px solid #000; padding: 4px;">वय</th>
// //             <th style="border: 1px solid #000; padding: 4px;">नातं</th>
// //             <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
// //             <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
// //           </tr>
// //           ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
// //             const memberNum = i + 1;
// //             return `
// //               <tr>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
// //                 <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
// //                 <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
// //               </tr>
// //             `;
// //           }).join('')}
// //         </table>
// //       </div>

// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
// //         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
// //             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
// //             <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
// //             <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
// //             <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
// //           </tr>
// //         </table>
// //       </div>

// //       <div style="margin-bottom: 20px;">
// //         <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
// //         <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
// //             <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
// //           </tr>
// //           <tr>
// //             <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
// //             <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
// //           </tr>
// //         </table>
// //       </div>

      


        

        
// //        <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
// //   <div style="text-align: center;">
// //     <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
// //         <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
// //     </div>
// //     <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
// //     <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
// //   </div>
// // </div>


// //       <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
// //         <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
// //         <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
// //         <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
// //       </div>

// //       <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
// //         <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
// //         <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
// //       </div>
// //     `;

// //     document.body.appendChild(pdfElement);

// //     setTimeout(() => {
// //       html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
// //         const imgData = canvas.toDataURL('image/png');
// //         const pdf = new jsPDF('p', 'mm', 'a4');
// //         const pageWidth = pdf.internal.pageSize.getWidth();
// //         const pageHeight = pdf.internal.pageSize.getHeight();
        
// //         // Calculate height to maintain aspect ratio
// //         const canvasHeight = (canvas.height * pageWidth) / canvas.width;
        
// //         pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);
        
// //         // ✅ PDF डाउनलोड करतो
// //         pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
        
// //         document.body.removeChild(pdfElement);
// //         resolve(true);
// //       }).catch((err) => {
// //         document.body.removeChild(pdfElement);
// //         reject(err);
// //       });
// //     }, 500);
// //   });
// // };




// // ===============================================


// // const generateAndDownloadPdfs = async (formData) => {
// //     setGeneratingPdfs(true)
    
// //     try {
// //       const residencyYear = parseInt(formData.residency_since) || 2000
// //       console.log("Residency year:", residencyYear)
      
// //       if (residencyYear <= 2000) {
// //         // Generate jodpatra-3 for 2000 or before
// //         setSuccess("Generating Jodpatra-3 for residency 2000 or before...")
// //         console.log("Generating Jodpatra-3 for year:", residencyYear)
        
// //         await generateJodpatra3(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-3!")
        
// //       } else {
// //         // Generate jodpatra-4 for after 2000
// //         setSuccess("Generating Jodpatra-4 for residency after 2000...")
// //         console.log("Generating Jodpatra-4 for year:", residencyYear)
        
// //         await generateJodpatra4(formData)
// //         setSuccess("✅ Successfully generated and downloaded Jodpatra-4!")
// //       }
      
// //     } catch (error) {
// //       console.error("Error generating PDFs:", error)
// //       setError("Error generating PDFs: " + error.message)
// //     } finally {
// //       setTimeout(() => {
// //         setGeneratingPdfs(false)
// //       }, 3000)
// //     }
// //   }

// // ======================================

// // const generateAndDownloadPdfs = async (formData) => {
// //   console.log("testing form data>>>>>>>>>>>",formData)
// //   setGeneratingPdfs(true);

// //   try {
// //     const dateStr = formData.residency_since; // e.g. "10-09-2025" OR "00-00-0000"
// //     console.log("Residency date string:", dateStr);

// //     let isJodpatra3 = false;

// //     if (dateStr === "00-00-0000") {
// //       // जर dummy date आली तर नेहमी Jodpatra-3
// //       isJodpatra3 = true;
// //     } else {
// //       const [day, month, year] = dateStr.split("-").map(Number);
// //       const selectedDate = new Date(year, month - 1, day);
// //       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

// //       if (selectedDate <= cutoffDate) {
// //         isJodpatra3 = true;
// //       }
// //     }

// //     if (isJodpatra3) {
// //       setSuccess("Generating Jodpatra-3 for residency 2000 or before...");
// //       console.log("Generating Jodpatra-3 for date:", dateStr);

// //       await generateJodpatra3(formData);
// //       setSuccess("✅ Successfully generated and downloaded Jodpatra-3!");
// //     } else {
// //       setSuccess("Generating Jodpatra-4 for residency after 2000...");
// //       console.log("Generating Jodpatra-4 for date:", dateStr);

// //       await generateJodpatra4(formData);
// //       setSuccess("✅ Successfully generated and downloaded Jodpatra-4!");
// //     }
// //   } catch (error) {
// //     console.error("Error generating PDFs:", error);
// //     setError("Error generating PDFs: " + error.message);
// //   } finally {
// //     setTimeout(() => {
// //       setGeneratingPdfs(false);
// //     }, 3000);
// //   }
// // };




//     const addMember = () => {
//     if (displayedMembers < 6) {
//       setDisplayedMembers(displayedMembers + 1);
//     }
//   };

//   const removeMember = () => {
//     if (displayedMembers > 1) {
//       setDisplayedMembers(displayedMembers - 1);
//     }
//   };

//   const handleSubmit = async (values) => {
//     console.log("values>>>>>>>",values)
//     setLoading(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) {
//         throw new Error("No authentication token found")
//       }

//       const formDataToSend = new FormData()

//       // Set submittedBy field with user role
//       var currentUser = getUser()


//       if (!currentUser) {
//         // setUserDataLoading(true)
//         // setSuccess("Getting user data...")
//         currentUser = await fetchAndSetUserProfile()
//         // setUserDataLoading(false)
//       }

//       const submittedByValue = currentUser?.user_id || "N/A";

      
//       // Add submittedBy to the values
//       const updatedValues = {
//         ...values,
//         submittedBy: submittedByValue,
//         // timestamp: new Date().toISOString(),
//         // created_date: new Date().toISOString()
//       }


//       // Add all form fields
//       Object.keys(updatedValues).forEach(key => {
//         if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
//           formDataToSend.append(key, updatedValues[key])
//         }
//       })

//       // Add files
//       Object.keys(files).forEach(key => {
//         if (files[key]) {
//           formDataToSend.append(key, files[key])
//         }
//       })

//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         body: formDataToSend
//       })
//   const result = await response.json();
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully! Now generating PDFs...")
      
//       // Generate and download PDFs after successful submission
//       // await generateAndDownloadPdfs(values)



//           //  await generateAndDownloadPdfs(result.form)


      
      
//       setTimeout(() => {
//         if (onSuccess) onSuccess()
//       }, 3000)

//     } catch (err) {
//       console.error("Error submitting application:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const renderStepContent = (formik) => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Cluster Number</label>
//                 <Field
//                   type="text"
//                   name="cluster_number"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div> */}
             
// {/* -------------------------------------------------------- */}

//                  {/* <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         Cluster Number
//       </label>
//       <Field
//         as="select"
//         name="cluster_number"
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//       >
//         <option value="">Select Cluster Number</option>
//         {clusterData.map((cluster) => (
//           <option key={cluster.cluster_number} value={cluster.cluster_number}>
//             {cluster.cluster_number}
//           </option>
//         ))}
//       </Field>
//       <ErrorMessage
//         name="cluster_number"
//         component="div"
//         className="text-red-500 text-sm mt-1 font-medium"
//       />
//     </div> */}
 

// {/* <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Cluster Number
//         </label>
//         <Field name="cluster_number">
//           {({ field, form }) => (
//             <select
//               {...field}
//               onChange={(e) => handleClusterChange(e, form)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//             >
//               <option value="">Select Cluster Number</option>
//               {clusterData.map((cluster) => (
//                 <option
//                   key={cluster.cluster_number}
//                   value={cluster.cluster_number}
//                 >
//                   {cluster.cluster_number}
//                 </option>
//               ))}
//             </select>
//           )}
//         </Field>
//         <ErrorMessage
//           name="cluster_number"
//           component="div"
//           className="text-red-500 text-sm mt-1 font-medium"
//         />
//       </div> */}

// {/* ----------------------------------- */}
// {/* <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     क्लस्टर क्रमांक
//   </label>
//   <select
//     name="cluster_number"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     value={formik.values.cluster_number}
    
//     className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//       formik.touched.cluster_number && formik.errors.cluster_number
//         ? "border-red-500"
//         : "border-gray-300"
//     }`}
//   >
//     <option value="">Select Cluster Number</option>
//     {clusters.map((cluster) => (
//       <option key={cluster.id} value={cluster.cluster_number}>
//         {cluster.cluster_number} - {cluster.cluster_name}
//       </option>
//     ))}
//   </select>
//   {formik.touched.cluster_number && formik.errors.cluster_number && (
//     <p className="text-red-500 text-sm mt-1">
//       {formik.errors.cluster_number}
//     </p>
//   )}
// </div> */}
// {/* ------------20 oct25--- */}

// {/* <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Cluster Number
//   </label>
//   <select
//     name="cluster_number"
//     onChange={(e) => {
//       formik.handleChange(e);
//       setSelectedCluster(e.target.value); // ✅ Update local state
//     }}
//     onBlur={formik.handleBlur}
//     value={formik.values.cluster_number}
//     className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//       formik.touched.cluster_number && formik.errors.cluster_number
//         ? "border-red-500"
//         : "border-gray-300"
//     }`}
//   >
//     <option value="">Select Cluster</option>
//     {clusterData.map((cluster) => (
//       <option key={cluster.cluster_number} value={cluster.cluster_number}>
//         {cluster.cluster_number}
//       </option>
//     ))}
//   </select>
//   {formik.touched.cluster_number && formik.errors.cluster_number && (
//     <p className="text-red-500 text-sm mt-1">{formik.errors.cluster_number}</p>
//   )}
// </div> */}
// {/* ========================21 oct 25=========================== */}
// <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Cluster Number
//             </label>
//             <select
//               name="cluster_number"
//               onChange={(e) => {
//                 formik.handleChange(e);
//                 const selected = e.target.value;
//                 setSelectedCluster(selected);
//                 fetchClusterDetails(selected, formik);
//               }}
//               onBlur={formik.handleBlur}
//               value={formik.values.cluster_number}
//               className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
//             >
//               <option value="">Select Cluster</option>
//               {clusters.map((cluster) => (
//                 <option key={cluster.cluster_number} value={cluster.cluster_number}>
//                   {cluster.cluster_number} - {cluster.cluster_name}
//                 </option>
//               ))}
//             </select>
//             <ErrorMessage name="cluster_number" component="div" className="text-red-500 text-sm mt-1" />
//           </div>

      
  
// {/* ---------------------------------- */}
// {/* <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Slum Name
//   </label>
//   <Field name="slum_id">
//     {({ field, form }) => (
//       <select
//         {...field}
//         onChange={(e) => handleSlumChange(e, form)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         disabled={!slums.length}
//       >
//         <option value="">Select Slum ID</option>
//         {slums.map((slum) => (
//           <option key={slum.slum_id} value={slum.slum_id}>
//             {slum.slum_id}
//           </option>
//         ))}
//       </select>
//     )}
//   </Field>
//   <ErrorMessage
//     name="slum_id"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />
// </div> */}



// {/* <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Slum Name

//   </label>
//   <select
//     name="slum_id"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     value={formik.values.slum_id}
//     className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//       formik.touched.slum_id && formik.errors.slum_id
//         ? "border-red-500"
//         : "border-gray-300"
//     }`}
//   >
//     <option value="">Select Slum Name</option>
    
//     {slums
//       .filter((slum) => slum.cluster_number === formik.values.clusterNumber)
//       .map((slum) => (
//         <option key={slum.slum_id} value={slum.slum_id}>
//           {slum.slum_name} ({slum.slum_id})
//         </option>
//       ))}
//   </select>
//   {formik.touched.slum_id && formik.errors.slum_id && (
//     <p className="text-red-500 text-sm mt-1">
//       {formik.errors.slum_id}
//     </p>
//   )}
// </div> */}


// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     झोपडपट्टीचे नाव
//   </label>
//   <select
//     name="slum_id"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     value={formik.values.slum_id}
//     disabled={!formik.values.cluster_number} // Disable if cluster not selected
//     className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//       formik.touched.slum_id && formik.errors.slum_id
//         ? "border-red-500"
//         : "border-gray-300"
//     } ${!formik.values.cluster_number ? "bg-gray-100 cursor-not-allowed" : ""}`} // optional styling for disabled
//   >
//     <option value="">
//       {formik.values.cluster_number
//         ? "Select Slum Name"
//         : "Select Cluster First"}
//     </option>
//     {slums
//       .filter((slum) => slum.cluster_number === formik.values.cluster_number)
//       .map((slum) => (
//         <option key={slum.slum_id} value={slum.slum_id}>
//           {slum.slum_name} ({slum.slum_id})
//         </option>
//       ))}
//   </select>
//   {formik.touched.slum_id && formik.errors.slum_id && (
//     <p className="text-red-500 text-sm mt-1">
//       {formik.errors.slum_id}
//     </p>
//   )}
// </div>


 
//    {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut Name *</label>
//                 <Field
//                   type="text"
//                   name="name_of_slum_area"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}

//   <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचे नाव *</label>
//                 <Field
//                   type="text"
//                   name="hut_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="hut_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>



// {/* <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Hut Name
//   </label>
//   <Field name="name_of_slum_area">
//     {({ field, form }) => (
//       <select
//         {...field}
//         onChange={(e) => form.setFieldValue("name_of_slum_area", e.target.value)}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//         disabled={!huts.length}
//       >
//         <option value="">Select Hut</option>
//         {huts.map((hut) => (
//           <option key={hut.hut_id} value={hut.hut_name}>
//             {hut.hut_id}
//           </option>
//         ))}
//       </select>
//     )}
//   </Field>
//   <ErrorMessage
//     name="hut_name"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />
// </div> */}




//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकेचे नाव *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="municipal_corporation" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}

//               {/* ==================21 oct 25===================== */}

//                <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 महानगरपालिकेचे नाव
//               </label>
//               <Field
//                 type="text"
//                 name="municipal_corporation"
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//               />
//             </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">प्रभाग *</label>
//                 <Field
//                   as="select"
//                   name="ward"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">प्रभाग निवडा</option>
//                   <option value="P/N">P/N</option>
//                   <option value="G/N">G/N</option>
//                   <option value="H/E">H/E</option>
//                 </Field>
//                 <ErrorMessage name="ward" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}
//               {/* ====================21 oct 25================ */}
//                <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 प्रभाग
//               </label>
//               <Field
//                 type="text"
//                 name="ward"
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//               />
//             </div>


//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">जिल्हा *</label>
//                 <Field
//                   as="select"
//                   name="district"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">जिल्हा निवडा</option>
//                   <option value="Mumbai Suburban (District)">Mumbai Suburban (District)</option>
//                   <option value="Mumbai City (District)">Mumbai City (District)</option>
//                 </Field>
//                 <ErrorMessage name="district" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}

//               {/* =============21 oct 25=============== */}
//               <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 जिल्हा
//               </label>
//               <Field
//                 type="text"
//                 name="district"
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//               />
//             </div>

// {/* ================21 Oct 25================== */}
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">तालुका *</label>
//                 <Field
//                   as="select"
//                   name="taluka"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">तालुका निवडा</option>
//                   <option value="malad">Malad</option>
//                   <option value="borivali">Borivali</option>
//                   <option value="andheri">Andheri</option>
//                 </Field>
//                 <ErrorMessage name="taluka" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}


//                 <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 तालुका
//               </label>
//               <Field
//                 type="text"
//                 name="taluka"
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//               />
//             </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">गाव</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Hut ID *</label>
//                 <Field
//                   type="text"
//                   name="slum_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div> */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडी क्रमांक *</label>
//                 <Field
//                   type="text"
//                   name="hut_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="hut_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा वापर </label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">झोपडीचा वापर निवडा</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                   <option value="Residential / Commercial">Residential / Commercial</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा मजला</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">झोपडीचा मजला निवडा</option>
//                   <option value="G">G</option>
//                   <option value="G+1">G+1</option>
//                   <option value="G+2">G+2</option>
//                   <option value="G+3">G+3</option>
//                   <option value="G+4">G+4</option>
//                   <option value="G+5">G+5</option>
//                 </Field>
//               </div>

//               <div>
//                 {/* <label className="block text-sm font-medium text-gray-700 mb-2">Ownership of Slum Land</label> */}
//                     <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीच्या जमिनीचे मालकी हक्क</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">झोपडीच्या जमिनीचे मालकी हक्क निवडा</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Municipal Corporation">Mhada</option>
//                   <option value="Municipal Corporation">SRA</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षण स्थिती निवडा</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">सर्वेक्षण स्थिती</option>
//                   <option value="Pending">Pending</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                   <option value="Completed">Completed</option>
//                 </Field>
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="plan_submitted"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">योजना सादर केली आहे का?</label>
//               </div>

//               <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//                 <Field
//                   type="checkbox"
//                   name="society_registered"
//                   className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all"
//                 />
//                 <label className="text-sm font-medium text-gray-700">सोसायटी नियोजित आहे का?</label>
//               </div>
//             </div>
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
//                 <Field
//                   type="text"
//                   name="first_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव</label>
//                 <Field
//                   type="text"
//                   name="middle_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="middle_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />

//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
//                 <Field
//                   type="text"
//                   name="last_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">लिंग *</label>
//                 <Field
//                   as="select"
//                   name="gender"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">लिंग निवडा</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार क्रमांक (१२ अंक) *</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_number"
//                   maxLength="12"
//                   placeholder="123456789012"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार मोबाइल क्रमांक (१० अंक) </label>
//                 <Field
//                   type="tel"
//                   name="aadhaar_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">पत्नीचे / पतीचे नाव</label>
//                 <Field
//                   type="text"
//                   name="spouse_name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">वापरकर्त्याचा ईमेल</label>
//                 <Field
//                   type="email"
//                   name="user_email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//             </div>
//           </div>
//         )

//       case 3:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार पत्ता</label>
//                 <Field
//                   as="textarea"
//                   name="aadhaar_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा पत्ता *</label>
//                 <Field
//                   as="textarea"
//                   name="current_address"
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार पिनकोड (६ अंक)</label>
//                 <Field
//                   type="text"
//                   name="aadhaar_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा पिनकोड (६ अंक)</label>
//                 <Field
//                   type="text"
//                   name="current_pincode"
//                   maxLength="6"
//                   placeholder="400001"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा मोबाइल क्रमांक (१० अंक) *</label>
//                 <Field
//                   type="tel"
//                   name="current_mobile_number"
//                   maxLength="10"
//                   placeholder="9876543210"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळखपत्राचा प्रकार</label>
//                 <Field
//                   as="select"
//                   name="voter_card_type"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 >
//                   <option value="">मतदार ओळखपत्राचा प्रकार निवडा</option>
//                   <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//                   <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळख क्रमांक (१० अंक)</label>
//                 <Field
//                   type="text"
//                   name="voter_card_number"
//                   maxLength="10"
//                   placeholder="ABC1234567"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//                 <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               {/* Latitude Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-1" />
//                   अक्षांश
//                 </label>
//                 <Field
//                   type="text"
//                   name="biometric_lat"
//                   placeholder="19.0760"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>

//               {/* Longitude Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   <MapPin className="inline w-4 h-4 mr-1" />
//                   रेखांश
//                 </label>
//                 <Field
//                   type="text"
//                   name="biometric_long"
//                   placeholder="72.8777"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                 />
//               </div>
//             </div>

//             {/* Geolocation Button */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <MapPin className="w-5 h-5 text-white" />
//                 </div>
//                 Location Services
//               </h4>
//               <div className="flex items-center gap-4">
//                 <button
//                   type="button"
//                   onClick={() => fetchCurrentLocation(formik)}
//                   disabled={fetchingLocation}
//                   className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
//                     fetchingLocation
//                       ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                       : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
//                   } text-white`}
//                 >
//                   {fetchingLocation ? (
//                     <>
//                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                       Fetching Location...
//                     </>
//                   ) : (
//                     <>
//                       <Crosshair size={20} />
//                       Get Current Location
//                     </>
//                   )}
//                 </button>
                
//                 {formik.values.biometric_lat && formik.values.biometric_long && (
//                   <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
//                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-green-700 font-medium text-sm">
//                       Location: {parseFloat(formik.values.biometric_lat).toFixed(4)}, {parseFloat(formik.values.biometric_long).toFixed(4)}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )

//       case 4:
//         return (
//           <div className="space-y-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">🏦🏘️ बँक आणि झोपडपट्टीची माहिती</h3>
            
//             {/* Bank Details Section */}
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏦</span>
//                 </div>
//                 बँकेची माहिती
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">बँकेचे नाव</label>
//                   <Field
//                     type="text"
//                     name="bank_name"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">खाते क्रमांक</label>
//                   <Field
//                     type="text"
//                     name="account_number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC कोड</label>
//                   <Field
//                     type="text"
//                     name="ifsc_code"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Slum Details Section */}
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-white font-bold">🏠</span>
//                 </div>
//                  झोपडपट्टीची माहिती
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">लांबी (मीटर)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('length', e.target.value)
//                       const length = parseFloat(e.target.value) || 0
//                       const width = parseFloat(formik.values.width) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="length" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">रुंदी (मीटर)</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={(e) => {
//                       formik.setFieldValue('width', e.target.value)
//                       const width = parseFloat(e.target.value) || 0
//                       const length = parseFloat(formik.values.length) || 0
//                       if (length > 0 && width > 0) {
//                         formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
//                       } else {
//                         formik.setFieldValue('area_sq_m', '')
//                       }
//                     }}
//                   />
//                   <ErrorMessage name="width" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">क्षेत्रफळ (चौ. मी.)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed transition-all"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

//                 {/* <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Residency Since *</label>
//                   <Field
//                     type="number"
//                     name="residency_since"
//                     placeholder="1995"
//                     min="1950"
//                     max="2024"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   />
//                   <ErrorMessage name="residency_since" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//                   {formik.values.residency_since && (
//                     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//                       <p className="text-xs font-medium">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600" : "text-blue-600"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "2000 या आधी - Jodpatra-3 तयार होईल" : "2000 नंतर - Jodpatra-4 तयार होईल"}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div> */}
//                 <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//    राहणीमान सुरु पासून *
//   </label>
//   <Field
//     type="date"
//     name="residency_since"
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 
//               focus:ring-blue-500 focus:border-transparent transition-all"
//     onChange={(e) => {
//       const date = new Date(e.target.value);
//       const formatted = date
//         ? `${String(date.getDate()).padStart(2, "0")}-${String(
//             date.getMonth() + 1
//           ).padStart(2, "0")}-${date.getFullYear()}`
//         : "";
//       formik.setFieldValue("residency_since", formatted);
//     }}
//   />

//   {/* Validation error */}
//   <ErrorMessage
//     name="residency_since"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />

//   {/* Conditional message */}
//   {formik.values.residency_since && (
//     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//       <p className="text-xs font-medium">
//         {(() => {
//           const [day, month, year] = formik.values.residency_since.split("-");
//           const selectedDate = new Date(year, month - 1, day);

//           // ✅ cutoff = 01-Jan-2000
//           const cutoffDate = new Date(2000, 0, 1);

//           return selectedDate <= cutoffDate ? (
//             <span className="text-green-600">
//               01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
//             </span>
//           ) : (
//             <span className="text-blue-600">
//               01-01-2000 नंतर - Jodpatra-4 तयार होईल
//             </span>
//           );
//         })()}
//       </p>
//     </div>
//   )}
// </div>




//               </div>
//             </div>
//           </div>
//         )

   

//     case 5:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">कुटुंबातील सदस्य (कमाल ६ सदस्य)</h3>
            
//             <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
//               <label className="block text-sm font-medium text-gray-700 mb-2">कुटुंबातील सदस्यांची संख्या *</label>
//               <Field
//                 type="number"
//                 name="num_family_members"
//                 min="1"
//                 max="6"
//                 value={displayedMembers}
//                 onChange={(e) => {
//                   const value = parseInt(e.target.value);
//                   if (value >= 1 && value <= 6) {
//                     setDisplayedMembers(value);
//                     formik.setFieldValue('num_family_members', value);
//                   }
//                 }}
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               />
//               <ErrorMessage name="num_family_members" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//             </div>

//             {Array.from({ length: displayedMembers }, (_, index) => index + 1).map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50 shadow-sm hover:shadow-md transition-all">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Name
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_name`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Age
//                     </label>
//                     <Field
//                       type="number"
//                       name={`family_member${memberNum}_age`}
//                       min="0"
//                       max="120"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>

//                   {/* <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Relation
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_relation`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div> */}
//                   <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//   नाते
//   </label>
//   <Field
//     as="select"
//     name={`family_member${memberNum}_relation`}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//   >
//     <option value="">संबंध निवडा</option>
//     <option value="Wife">Wife</option>
//     <option value="Husband">Husband</option>
//     <option value="Son">Son</option>
//     <option value="Daughter">Daughter</option>
//     <option value="Mother">Mother</option>
//     <option value="Father">Father</option>
//     <option value="Brother">Brother</option>
//     <option value="Sister">Sister</option>
//     <option value="Other">Other</option>
//   </Field>
// </div>


//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       लिंग
//                     </label>
//                     <Field
//                       as="select"
//                       name={`family_member${memberNum}_gender`}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     >
//                       <option value="">लिंग निवडा</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       आधार क्रमांक (१२ अंक)
//                     </label>
//                     <Field
//                       type="text"
//                       name={`family_member${memberNum}_aadhaar`}
//                       maxLength="12"
//                       placeholder="123456789012"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex items-center gap-4 mt-6">
//               {displayedMembers < 6 && (
//                 <button
//                   type="button"
//                   onClick={addMember}
//                   className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Plus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               {displayedMembers > 1 && (
//                 <button
//                   type="button"
//                   onClick={removeMember}
//                   className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   <Minus className="w-6 h-6 text-white" />
//                 </button>
//               )}
              
//               <span className="text-sm text-gray-600">
//                 {displayedMembers} of 6 members added
//               </span>
//             </div>
//           </div>
//         )

//       case 6:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[
//                 { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
//                 { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
//                 // { name: 'doc_front_view', label: 'Front View Photo', accept: 'image/*', icon: '🏠' },
//                 { name: 'doc_side_view', label: 'Doc Side View', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_front_view', label: 'Doc Front View', accept: 'image/*', icon: '🏗️' },
 



              

//                 ...(parseInt(formik.values.residency_since) <= 2000
//   ? [
//       {
//         name: 'doc_before_2000',
//         label: 'Docs before or till 1-1-2000',
//         accept: 'image/*,.pdf,.doc,.docx',
//         icon: '📄',
//       },
//       {
//         name: 'submitted_docs_before_2000',
//         label: 'Submitted Docs Before 2000',
//         accept: 'image/*,.pdf',
//         icon: '📑',
//       },
//     ]
//   : []),



// ...(parseInt(formik.values.residency_since) > 2000
//     ? [
//         {
//           name: 'after_2000_proof_submitted',
//           label: 'After 2000 Proof',
//           accept: 'image/*,.pdf',
//           icon: '📃',
//         },
//       ]
//     : []),


                

//                 // { name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: '📃' },



//                 { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '🍚' },
//                 { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜' },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
//               ].map(({ name, label, accept, icon }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>
//                   <input
//                     type="file"
//                     name={name}
//                     onChange={handleFileChange}
//                     accept={accept}
//                     multiple={name === "sale_agreement"} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
//                   />

                 

// {files[name] && (
//   <div className="mt-2 p-2 bg-green-50 rounded">
//     {Array.isArray(files[name]) ? (
//       files[name].map((file, idx) => (
//         <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
//           <span className="text-green-500 mr-2">✅</span>
//           <p className="truncate">{file.name}</p>
//         </div>
//       ))
//     ) : (
//       <div className="flex items-center text-sm text-green-700">
//         <span className="text-green-500 mr-2">✅</span>
//         <p className="truncate">{files[name].name}</p>
//       </div>
//     )}
//   </div>
// )}
//   </div>
//               ))}

//             </div>
//           </div>
//         )

//       default:
//         return (
//           <div className="text-center py-8">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3>
//             <p className="text-gray-600">Please review all your information and click submit to proceed.</p>
//           </div>
//         )
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Progress Steps */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
//             {steps.map((step, index) => (
//               <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
//                 <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
//                   currentStep >= step.id 
//                     ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
//                     : 'bg-white border-gray-300 text-gray-500'
//                 }`}>
//                   <span className="text-xl">{step.icon}</span>
//                   {currentStep >= step.id && (
//                     <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                       <span className="text-white text-xs">✓</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold transition-colors ${
//                     currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'
//                   }`}>
//                     Step {step.id}
//                   </p>
//                   <p className={`text-xs truncate transition-colors ${
//                     currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'
//                   }`}>
//                     {step.title}
//                   </p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full transition-all ${
//                     currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'
//                   }`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">✅</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}

//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">❌</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           {generatingPdfs && (
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-4"></div>
//               <span className="font-medium">Generating and downloading PDF documents...</span>
//             </div>
//           )}

//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => (
//               <Form>
//                 {renderStepContent(formik)}

//                 {/* Navigation Buttons */}
//                 <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     disabled={currentStep === 1}
//                     className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
//                       currentStep === 1
//                         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                         : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
//                     }`}
//                   >
//                     <ChevronLeft size={20} />
//                     Previous
//                   </button>

//                   <div className="text-center">
//                     <div className="text-sm font-medium text-gray-600">
//                       Step {currentStep} of {steps.length}
//                     </div>
//                     {/* {formik.values.residency_since && currentStep === 4 && (
//                       <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//                         <span className={parseInt(formik.values.residency_since) <= 2000 ? "text-green-600 font-semibold" : "text-blue-600 font-semibold"}>
//                           {parseInt(formik.values.residency_since) <= 2000 ? "Jodpatra-3 तयार होईल" : "Jodpatra-4 तयार होईल"}
//                         </span>
//                       </div>
//                     )} */}

// {formik.values.residency_since && currentStep === 4 && (
//   <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
//     {(() => {
//       const [day, month, year] = formik.values.residency_since.split("-");
//       const selectedDate = new Date(year, month - 1, day);
//       const cutoffDate = new Date(2000, 0, 1); // 01-Jan-2000

//       return selectedDate <= cutoffDate ? (
//         <span className="text-green-600 font-semibold">
//           Jodpatra-3 तयार होईल
//         </span>
//       ) : (
//         <span className="text-blue-600 font-semibold">
//           Jodpatra-4 तयार होईल
//         </span>
//       );
//     })()}
//   </div>
// )}



//                   </div>

//                   {currentStep < steps.length ? (
//                     <button
//                       type="button"
//                       onClick={() => nextStep(formik)}
//                       className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
//                     >
//                       Next
//                       <ChevronRight size={20} />
//                     </button>
//                   ) : (
//                     <button
//                       type="submit"
//                       disabled={loading || generatingPdfs || !formik.isValid}
//                       className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
//                         loading || generatingPdfs || !formik.isValid
//                           ? 'bg-gray-400 cursor-not-allowed shadow-md' 
//                           : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
//                       } text-white`}
//                     >
//                       {loading || generatingPdfs ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                           {generatingPdfs ? 'Generating PDFs...' : 'Submitting...'}
//                         </>
//                       ) : (
//                         <>
//                           <Save size={20} />
//                           Submit & Generate PDFs
//                         </>
//                       )}
//                     </button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ApplicationForm


// =====================================================
// ***** After
// This code is all correct but only design slightly change in file upload section

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair } from 'lucide-react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import isValidAadhaar from '../utils/aadhaarValidator';
import clusterData from "../data/clusterdata.json";
import wardsData from "../data/wardsData.json";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthToken = () => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

const getUser = () => {
  if (typeof window === "undefined") return null
  try {
    const userString = localStorage.getItem("user")
    return userString ? JSON.parse(userString) : null
  } catch (error) {
    console.error("Error parsing user from localStorage:", error)
    return null
  }
}

const fetchAndSetUserProfile = async () => {
  const token = getAuthToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    if (response.ok) {
      const userData = await response.json()
      localStorage.setItem("user", JSON.stringify(userData))
      return userData
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
  }
  return null
}

const validationSchemas = {
//   1: Yup.object({
//     slum_id: Yup.string().required('Slum ID is required'),
//     // name_of_slum_area: Yup.string().required('Hut name is required'),
//     municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     ward: Yup.string().required('Ward is required'),
//     district: Yup.string().required('District is required'),
//     taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
//     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
//     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
    
//       aadhaar_number: Yup.string()
//       .required('Aadhaar number is required')
//       .test(
//         'is-valid-aadhaar',
//         'Enter a valid Aadhaar number',
//         (value) => isValidAadhaar(value)
//       ),
//     aadhaar_mobile_number: Yup.string()
//     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
//       .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     user_email: Yup.string().email('Invalid email format'),
//   }),
//   3: Yup.object({
//     current_address: Yup.string().required('Current address is required'),
//     current_mobile_number: Yup.string()
//      .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
//     .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
//       .required('Mobile number is required'),
//     current_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     aadhaar_pincode: Yup.string()
//       .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
//     voter_card_number: Yup.string()
//       .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),
//   }),
//   4: Yup.object({
//     residency_since: Yup.string()
//       .required('Residency since is required'),
//   }),
//   5: Yup.object({
//     num_family_members: Yup.number()
//       .min(1, 'At least 1 family member is required')
//       .max(6, 'Maximum 6 family members allowed')
//       .required('Number of family members is required'),
//  family_member1_aadhaar: Yup.string()
//       .required('Aadhaar number is required')
//       .test(
//         'is-valid-aadhaar',
//         'Enter a valid Aadhaar number',
//         (value) => isValidAadhaar(value)
//       ),
    


//   }),
//   6: Yup.object({}),
//   7: Yup.object({}),
}



const ApplicationForm = ({ onClose, onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [generatingPdfs, setGeneratingPdfs] = useState(false)
  const [displayedMembers, setDisplayedMembers] = useState(1)
  const [fetchingLocation, setFetchingLocation] = useState(false)
  const [locationFetched, setLocationFetched] = useState(false)
  const [selectedCluster, setSelectedCluster] = useState("")
  const [slums, setSlums] = useState([])
  const [huts, setHuts] = useState([])
  const [selectedSlum, setSelectedSlum] = useState("")
  const [clusters, setClusters] = useState([])
  

  useEffect(() => {
    fetchClusters()
    fetchSlums()
  }, [])

  const fetchClusterDetails = async (cluster_number, formik) => {
    if (!cluster_number) return
    const token = getAuthToken()
    try {
      const response = await fetch(`${API_BASE_URL}/api/clusters/${cluster_number}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) throw new Error("Failed to fetch cluster details")
      const data = await response.json()

      formik.setFieldValue("district", data.district || "")
      formik.setFieldValue("taluka", data.taluka || "")
      formik.setFieldValue("ward", data.ward || "")
      formik.setFieldValue("municipal_corporation", data.municipal_corporation || "BMC")
    } catch (err) {
      console.error("Error fetching cluster details:", err)
    }
  }

  const fetchSlums = async () => {
    const token = getAuthToken()
    if (!token) {
      setError("Please login to view slums")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error("Failed to fetch slums")
      const data = await response.json()
      setSlums(data || [])
    } catch (err) {
      console.error("Error fetching slums:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchClusters = async () => {
    const token = getAuthToken()
    if (!token) {
      setError("Please login to view clusters")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) throw new Error("Failed to fetch clusters")
      const data = await response.json()
      setClusters(data || [])
    } catch (err) {
      console.error("Error fetching clusters:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClusterChange = (e, form) => {
    const cluster = e.target.value
    setSelectedCluster(cluster)
    form.setFieldValue("cluster_number", cluster)
    fetchClusterDetails(cluster, form)

    const selectedClusterData = clusterData.find(c => c.cluster_number === cluster)
    setSlums(selectedClusterData ? selectedClusterData.slums : [])
    setHuts([])
    form.setFieldValue("slum_id", "")
    form.setFieldValue("hut_name", "")
  }

  // const handleSlumChange = (e, form) => {
  //   const slumId = e.target.value
  //   setSelectedSlum(slumId)
  //   const selectedSlumData = slums.find(s => s.slum_id === slumId)
  //   setHuts(selectedSlumData ? selectedSlumData.huts : [])
  //   form.setFieldValue("slum_id", slumId)
  //   form.setFieldValue("hut_name", "")
  // }


  const handleSlumChange = (e, form) => {
  const slumId = e.target.value
  setSelectedSlum(slumId)
  
  const selectedSlumData = slums.find(s => s.slum_id === slumId)
  
  if (selectedSlumData) {
    form.setFieldValue("slum_id", slumId)
    form.setFieldValue("slum_name", selectedSlumData.slum_name || "")
    form.setFieldValue("name_of_slum_area", selectedSlumData.slum_address || selectedSlumData.name_of_slum_area || "")
  } else {
    form.setFieldValue("slum_id", "")
    form.setFieldValue("slum_name", "")
    form.setFieldValue("name_of_slum_area", "")
  }
  
  setHuts(selectedSlumData ? selectedSlumData.huts : [])
  form.setFieldValue("hut_name", "")
}

  const initialValues = {
    hut_id: '', hut_name: '', slum_id: '',slum_name:'',name_of_slum_area: '',
    municipal_corporation: "BMC", ward: '', district: '', taluka: '', village: '',
    cluster_number: '', slum_use: '', slum_floor: '', ownership_of_slum_land: '',
    survey_status: '', plan_submitted: false, society_registered: false,
    first_name: '', middle_name: '', last_name: '', gender: '', spouse_name: '',
    user_email: '', aadhaar_number: '', aadhaar_mobile_number: '',
    aadhaar_address: '', aadhaar_pincode: '', current_address: '', current_pincode: '',
    current_mobile_number: '', voter_card_type: '', voter_card_number: '',
    biometric_lat: '', biometric_long: '',
    bank_name: '', account_number: '', ifsc_code: '',
    length: '', width: '', area_sq_m: '', residency_since: '',
    num_family_members: 1,
    family_member1_name: '', family_member1_age: '', family_member1_relation: '', family_member1_gender: '', family_member1_aadhaar: '',
    family_member2_name: '', family_member2_age: '', family_member2_relation: '', family_member2_gender: '', family_member2_aadhaar: '',
    family_member3_name: '', family_member3_age: '', family_member3_relation: '', family_member3_gender: '', family_member3_aadhaar: '',
    family_member4_name: '', family_member4_age: '', family_member4_relation: '', family_member4_gender: '', family_member4_aadhaar: '',
    family_member5_name: '', family_member5_age: '', family_member5_relation: '', family_member5_gender: '', family_member5_aadhaar: '',
    family_member6_name: '', family_member6_age: '', family_member6_relation: '', family_member6_gender: '', family_member6_aadhaar: '',
    self_declaration_letter: false, submitted_docs_before_2000: false,
    doc_before_2000: false, after_2000_proof_submitted: false,
    timestamp: '', created_date: '', submittedBy: '', sale_agreement: [],
    doc_front_view: null,
    biometric:null

  }

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'Building' },
    { id: 2, title: 'Personal Details', icon: 'User' },
    { id: 3, title: 'Address Contact', icon: 'MapPin' },
    { id: 4, title: 'Bank and Slum Details', icon: 'Bank' },
    { id: 5, title: 'Family Members', icon: 'Users' },
    { id: 6, title: 'Images', icon: 'Camera' },
    { id: 7, title: 'Metadata', icon: 'FileText' }
  ]

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target
    if (name === "sale_agreement") {
      setFiles(prev => ({
        ...prev,
        [name]: [...(prev[name] || []), ...Array.from(selectedFiles)]
      }))
    } else {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }))
    }
  }

  const fetchCurrentLocation = (formik) => {
    setFetchingLocation(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.")
      setFetchingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6)
        const longitude = position.coords.longitude.toFixed(6)
        formik.setFieldValue('biometric_lat', latitude)
        formik.setFieldValue('biometric_long', longitude)
        setLocationFetched(true)
        setSuccess(`Location fetched: Lat: ${latitude}, Long: ${longitude}`)
        setFetchingLocation(false)
        setTimeout(() => setSuccess(null), 3000)
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location."
        switch (error.code) {
          case error.PERMISSION_DENIED: errorMessage = "Location access denied."; break
          case error.POSITION_UNAVAILABLE: errorMessage = "Location unavailable."; break
          case error.TIMEOUT: errorMessage = "Location request timed out."; break
        }
        setError(errorMessage)
        setFetchingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }

  const autoFetchLocation = (formik) => {
    if (!locationFetched && !fetchingLocation) {
      fetchCurrentLocation(formik)
    }
  }

  const nextStep = (formik) => {
    const currentSchema = validationSchemas[currentStep]
    if (currentSchema) {
      formik.validateForm().then(errors => {
        if (Object.keys(errors).length === 0 && currentStep < steps.length) {
          setCurrentStep(currentStep + 1)
          if (currentStep + 1 === 3) setTimeout(() => autoFetchLocation(formik), 500)
        }
      })
    } else {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
        if (currentStep + 1 === 3) setTimeout(() => autoFetchLocation(formik), 500)
      }
    }
  }

  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

  const addMember = () => displayedMembers < 6 && setDisplayedMembers(displayedMembers + 1)
  const removeMember = () => displayedMembers > 1 && setDisplayedMembers(displayedMembers - 1)

  const handleSubmit = async (values) => {
    setLoading(true); setError(null); setSuccess(null)

    try {
      const token = getAuthToken()
      if (!token) throw new Error("No authentication token found")

      let currentUser = getUser()
      if (!currentUser) currentUser = await fetchAndSetUserProfile()

      const formDataToSend = new FormData()
      const updatedValues = { ...values, submittedBy: currentUser?.user_id || "N/A" }

      Object.keys(updatedValues).forEach(key => {
        if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
          formDataToSend.append(key, updatedValues[key])
        }
      })

      Object.keys(files).forEach(key => {
        if (files[key]) {
          if (Array.isArray(files[key])) {
            files[key].forEach(file => formDataToSend.append(key, file))
          } else {
            formDataToSend.append(key, files[key])
          }
        }
      })

      const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      setSuccess("Application submitted successfully!")
      setTimeout(() => onSuccess?.(), 3000)
    } catch (err) {
      console.error("Error submitting application:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = (formik) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">क्लस्टर क्रमांक *</label>
                <select
                  name="cluster_number"
                  onChange={(e) => {
                    formik.handleChange(e)
                    const selected = e.target.value
                    setSelectedCluster(selected)
                    fetchClusterDetails(selected, formik)
                  }}
                  onBlur={formik.handleBlur}
                  value={formik.values.cluster_number}
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Cluster</option>
                  {clusters.map((cluster) => (
                    <option key={cluster.cluster_number} value={cluster.cluster_number}>
                      {cluster.cluster_number} - {cluster.cluster_name}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="cluster_number" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव</label>
                <select
                  name="slum_id"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.slum_id}
                  disabled={!formik.values.cluster_number}
                  className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 ${!formik.values.cluster_number ? "bg-gray-100 cursor-not-allowed" : ""}`}
                >
                  <option value="">
                    {formik.values.cluster_number ? "Select Slum Name" : "Select Cluster First"}
                  </option>
                  {slums
                    .filter((slum) => slum.cluster_number === formik.values.cluster_number)
                    .map((slum) => (
                      <option key={slum.slum_id} value={slum.slum_id}>
                        {slum.slum_name} ({slum.slum_id})
                      </option>
                    ))}
                </select>
                {formik.touched.slum_id && formik.errors.slum_id && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.slum_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचे नाव *</label>
                <Field
                  type="text"
                  name="hut_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="hut_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div> */}

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टी क्रमांक *</label>
  <select
    name="slum_id"
    onChange={(e) => handleSlumChange(e, formik)}
    onBlur={formik.handleBlur}
    value={formik.values.slum_id}
    disabled={!formik.values.cluster_number}
    className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 ${!formik.values.cluster_number ? "bg-gray-100 cursor-not-allowed" : ""}`}
  >
    <option value="">
      {formik.values.cluster_number ? "झोपडपट्टी क्रमांक निवडा" : "प्रथम क्लस्टर निवडा"}
    </option>
    {slums
      .filter((slum) => slum.cluster_number === formik.values.cluster_number)
      .map((slum) => (
        <option key={slum.slum_id} value={slum.slum_id}>
          {slum.slum_id}
        </option>
      ))}
  </select>
  <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1" />
</div>

{/* Auto-filled Slum Name */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव *</label>
  <Field
    type="text"
    name="slum_name"
    readOnly
    className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
  />
  <ErrorMessage name="slum_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
</div>

{/* Auto-filled Slum Address */}
{/* <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचा पत्ता</label>
  <Field
    type="text"
    name="name_of_slum_area"
    readOnly
    className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
  />
  <ErrorMessage name="name_of_slum_area" component="div" className="text-red-500 text-sm mt-1 font-medium" />
</div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकेचे नाव *</label>
                <Field
                  type="text"
                  name="municipal_corporation"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">प्रभाग *</label>
                <Field
                  type="text"
                  name="ward"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">जिल्हा *</label>
                <Field
                  type="text"
                  name="district"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">तालुका *</label>
                <Field
                  type="text"
                  name="taluka"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">गाव *</label>
                <Field
                  type="text"
                  name="village"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडी क्रमांक *</label>
                <Field
                  type="text"
                  name="hut_id"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="hut_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचे नाव *</label>
                <Field
                  type="text"
                  name="hut_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="hut_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div> 

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा मजला *</label>
                <Field
                  as="select"
                  name="slum_floor"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">झोपडीचा मजला निवडा</option>
                  <option value="G">G</option>
                  <option value="G+1">G+1</option>
                  <option value="G+2">G+2</option>
                  <option value="G+3">G+3</option>
                  <option value="G+4">G+4</option>
                  <option value="G+5">G+5</option>
                </Field>
              </div>

             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा वापर *</label>
                <Field
                  as="select"
                  name="slum_use"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">झोपडीचा वापर निवडा</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Combine">Combine</option>
                  <option value="Social">Social</option>
                  <option value="Devotional">Devotional</option>
                  <option value="Educational">Educational</option>
                  <option value="Residential / Commercial">Residential / Commercial</option>
                </Field>
              </div>

            

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीच्या जमिनीचे मालकी हक्क *</label>
                <Field
                  as="select"
                  name="ownership_of_slum_land"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">झोपडीच्या जमिनीचे मालकी हक्क निवडा</option>
                  <option value="State Government">State Government</option>
                  <option value="Central Government">Central Government</option>
                  <option value="Municipal Corporation">Municipal Corporation</option>
                  <option value="Mhada">Mhada</option>
                  <option value="SRA">SRA</option>
                  <option value="Private">Private</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षण स्थिती निवडा *</label>
                <Field
                  as="select"
                  name="survey_status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">सर्वेक्षण स्थिती</option>
                  <option value="Pending">Pending</option>
                  <option value="Hut Appose">Hut Appose</option>
                  <option value="Hut Denied">Hut Denied</option>
                  <option value="Completed">Completed</option>
                </Field>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Field type="checkbox" name="plan_submitted" className="h-5 w-5 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">योजना सादर केली आहे का?</label>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Field type="checkbox" name="society_registered" className="h-5 w-5 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">सोसायटी नियोजित आहे का?</label>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
                <Field type="text" name="first_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव *</label>
                <Field type="text" name="middle_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
                <Field type="text" name="last_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">लिंग *</label>
                <Field as="select" name="gender" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">लिंग निवडा</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आधार क्रमांक (१२ अंक) *</label>
                <Field type="text" name="aadhaar_number" maxLength="12" placeholder="123456789012" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आधार मोबाइल क्रमांक (१० अंक) *</label>
                <Field type="tel" name="aadhaar_mobile_number" maxLength="10" placeholder="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">पत्नीचे / पतीचे नाव *</label>
                <Field type="text" name="spouse_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">वापरकर्त्याचा ईमेल *</label>
                <Field type="email" name="user_email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="user_email" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Address Contact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आधार पत्ता *</label>
                <Field as="textarea" name="aadhaar_address" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा पत्ता *</label>
                <Field as="textarea" name="current_address" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="current_address" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आधार पिनकोड (६ अंक) *</label>
                <Field type="text" name="aadhaar_pincode" maxLength="6" placeholder="400001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा पिनकोड (६ अंक) *</label>
                <Field type="text" name="current_pincode" maxLength="6" placeholder="400001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा मोबाइल क्रमांक (१० अंक) *</label>
                <Field type="tel" name="current_mobile_number" maxLength="10" placeholder="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळखपत्राचा प्रकार *</label>
                <Field as="select" name="voter_card_type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">मतदार ओळखपत्राचा प्रकार निवडा</option>
                  <option value="EPIC 10 Digit">EPIC 10 Digit</option>
                  <option value="EPIC 14 Digit">EPIC 14 Digit</option>
                </Field>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळख क्रमांक (१० अंक) *</label>
                <Field type="text" name="voter_card_number" maxLength="10" placeholder="ABC1234567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> अक्षांश *</label>
                <Field type="text" name="biometric_lat" placeholder="19.0760" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> रेखांश *</label>
                <Field type="text" name="biometric_long" placeholder="72.8777" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                Location Services
              </h4>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => fetchCurrentLocation(formik)}
                  disabled={fetchingLocation}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
                    fetchingLocation ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                  } text-white`}
                >
                  {fetchingLocation ? (
                    <>Fetching...</>
                  ) : (
                    <><Crosshair size={20} /> Get Current Location</>
                  )}
                </button>
                {formik.values.biometric_lat && formik.values.biometric_long && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-medium text-sm">
                      Location: {parseFloat(formik.values.biometric_lat).toFixed(4)}, {parseFloat(formik.values.biometric_long).toFixed(4)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bank and Slum Details</h3>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3"><span className="text-white font-bold">🏦</span></div>
                बँकेची माहिती
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">बँकेचे नाव *</label>
                  <Field type="text" name="bank_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">खाते क्रमांक *</label>
                  <Field type="text" name="account_number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC कोड *</label>
                  <Field type="text" name="ifsc_code" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-8 h-8 flex items-center justify-center mr-3">🏘️</div>
                झोपडपट्टीची माहिती
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">लांबी (मीटर) *</label>
                  <Field
                    type="number"
                    step="0.1"
                    name="length"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      formik.setFieldValue('length', e.target.value)
                      const length = parseFloat(e.target.value) || 0
                      const width = parseFloat(formik.values.width) || 0
                      if (length > 0 && width > 0) {
                        formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
                      } else {
                        formik.setFieldValue('area_sq_m', '')
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">रुंदी (मीटर) *</label>
                  <Field
                    type="number"
                    step="0.1"
                    name="width"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      formik.setFieldValue('width', e.target.value)
                      const width = parseFloat(e.target.value) || 0
                      const length = parseFloat(formik.values.length) || 0
                      if (length > 0 && width > 0) {
                        formik.setFieldValue('area_sq_m', (length * width).toFixed(2))
                      } else {
                        formik.setFieldValue('area_sq_m', '')
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">क्षेत्रफळ (चौ. मी.)</label>
                  <Field
                    type="number"
                    step="0.01"
                    name="area_sq_m"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">राहणीमान सुरु पासून *</label>
                  <Field
                    type="date"
                    name="residency_since"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      const formatted = date ? `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}` : ""
                      formik.setFieldValue("residency_since", formatted)
                    }}
                  />
                  {formik.values.residency_since && (
                    <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
                      <p className="text-xs font-medium">
                        {(() => {
                          const [day, month, year] = formik.values.residency_since.split("-")
                          const selectedDate = new Date(year, month - 1, day)
                          const cutoffDate = new Date(2000, 0, 1)
                          return selectedDate <= cutoffDate ? (
                            <span className="text-green-600">01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल</span>
                          ) : (
                            <span className="text-blue-600">01-01-2000 नंतर - Jodpatra-4 तयार होईल</span>
                          )
                        })()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">कुटुंबातील सदस्य (कमाल ६ सदस्य)</h3>
            <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">कुटुंबातील सदस्यांची संख्या *</label>
              <Field
                type="number"
                name="num_family_members"
                min="1"
                max="6"
                value={displayedMembers}
                onChange={(e) => {
                  const value = parseInt(e.target.value)
                  if (value >= 1 && value <= 6) {
                    setDisplayedMembers(value)
                    formik.setFieldValue('num_family_members', value)
                  }
                }}
                className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {Array.from({ length: displayedMembers }, (_, i) => i + 1).map(memberNum => (
              <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
                <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">{memberNum}</span>
                  </div>
                  Family Member {memberNum}
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <Field type="text" name={`family_member${memberNum}_name`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <Field type="number" name={`family_member${memberNum}_age`} min="0" max="120" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">नाते *</label>
                    <Field as="select" name={`family_member${memberNum}_relation`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">संबंध निवडा</option>
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Other">Other</option>
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">लिंग *</label>
                    <Field as="select" name={`family_member${memberNum}_gender`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">लिंग निवडा</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">आधार क्रमांक (१२ अंक) *</label>
                    <Field type="text" name={`family_member${memberNum}_aadhaar`} maxLength="12" placeholder="123456789012" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-4 mt-6">
              {displayedMembers < 6 && (
                <button type="button" onClick={addMember} className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </button>
              )}
              {displayedMembers > 1 && (
                <button type="button" onClick={removeMember} className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center">
                  <Minus className="w-6 h-6 text-white" />
                </button>
              )}
              <span className="text-sm text-gray-600">{displayedMembers} of 6 members added</span>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents & Images</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'photo_self', label: 'Self Photo', accept: 'image/*', icon: '📷' },
                { name: 'photo_family', label: 'Family Photo', accept: 'image/*', icon: '👨‍👩‍👧‍👦' },
                { name: 'doc_side_view', label: 'Doc Side View', accept: 'image/*', icon: '🏗️' },
                { name: 'doc_front_view', label: 'Doc Front View', accept: 'image/*', icon: '🏗️' },
                  { name: 'adivashihutimage', label: 'Hut Image', accept: 'image/*,.pdf', icon: 'Home' },
                ...(formik.values.residency_since && new Date(formik.values.residency_since.split('-').reverse().join('-')) <= new Date('2000-01-01')
                  ? [
                      { name: 'doc_before_2000', label: 'Docs before or till 1-1-2000', accept: 'image/*,.pdf,.doc,.docx', icon: 'FileText' },
                      { name: 'submitted_docs_before_2000', label: 'Submitted Docs Before 2000', accept: 'image/*,.pdf', icon: 'FileCheck' }
                    ]
                  : []
                ),
                ...(formik.values.residency_since && new Date(formik.values.residency_since.split('-').reverse().join('-')) > new Date('2000-01-01')
                  ? [{ name: 'after_2000_proof_submitted', label: 'After 2000 Proof', accept: 'image/*,.pdf', icon: 'FileCheck' }]
                  : []
                ),
                { name: 'possession_doc_info', label: 'Possession Document', accept: 'image/*,.pdf', icon: '🏡' },
                { name: 'Seldeclaration_letter', label: 'Self Declaration Letter', accept: 'image/*,.pdf', icon: '✍️' },
                { name: 'Ration_card_info', label: 'Ration Card', accept: 'image/*,.pdf', icon: '📁' },
                // { name: 'document_upload', label: 'General Document', accept: 'image/*,.pdf,.doc,.docx', icon: 'Folder' },
                { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
                { name: 'biometric', label: 'Biometric Photo', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
                { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
                { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' }
              ].map(({ name, label, accept, icon, multiple }) => (
                <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">{icon}</span>
                    <h4 className="font-semibold text-gray-800">{label}</h4>
                  </div>
                  <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files[name] && (
                    <div className="mt-2 p-2 bg-green-50 rounded">
                      {Array.isArray(files[name]) ? (
                        files[name].map((file, idx) => (
                          <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
                            <span className="text-green-500 mr-2">Check</span>
                            <p className="truncate">{file.name}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center text-sm text-green-700">
                          <span className="text-green-500 mr-2">Check</span>
                          <p className="truncate">{files[name].name}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return <div className="text-center py-8"><h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3></div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center justify-between overflow-x-auto bg-white rounded-xl shadow-lg p-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center min-w-0 flex-shrink-0">
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  <span className="text-xl">{step.icon}</span>
                  {currentStep >= step.id && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">Check</span>
                    </div>
                  )}
                </div>
                <div className="ml-4 min-w-0">
                  <p className={`text-sm font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'}`}>Step {step.id}</p>
                  <p className={`text-xs truncate ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full ${currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          {success && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
              <span className="text-2xl mr-3">Success</span>
              <span className="font-medium">{success}</span>
            </div>
          )}
          {error && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
              <span className="text-2xl mr-3">Error</span>
              <span className="font-medium">{error}</span>
            </div>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                {renderStepContent(formik)}

                <div className="flex justify-between items-center mt-10 pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-semibold transition-all ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>

                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-600">Step {currentStep} of {steps.length}</div>
                    {formik.values.residency_since && currentStep === 4 && (
                      <div className="text-xs mt-1 p-2 rounded-lg bg-blue-50 border border-blue-200">
                        {(() => {
                          const [day, month, year] = formik.values.residency_since.split("-")
                          const selectedDate = new Date(year, month - 1, day)
                          const cutoffDate = new Date(2000, 0, 1)
                          return selectedDate <= cutoffDate ? (
                            <span className="text-green-600 font-semibold">Jodpatra-3 तयार होईल</span>
                          ) : (
                            <span className="text-blue-600 font-semibold">Jodpatra-4 तयार होईल</span>
                          )
                        })()}
                      </div>
                    )}
                  </div>

                  {currentStep < steps.length ? (
                    <button
                      type="button"
                      onClick={() => nextStep(formik)}
                      className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Next <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !formik.isValid}
                      className={`flex items-center gap-3 px-10 py-4 rounded-xl font-semibold transition-all ${
                        loading || !formik.isValid
                          ? 'bg-gray-400 cursor-not-allowed shadow-md' 
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                      } text-white`}
                    >
                      {loading ? (
                        <>Submitting...</>
                      ) : (
                        <><Save size={20} /> Submit & Generate PDFs</>
                      )}
                    </button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm



