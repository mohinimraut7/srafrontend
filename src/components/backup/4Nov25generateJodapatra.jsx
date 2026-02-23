const generateJodpatra3 = async (data) => {
  return new Promise((resolve, reject) => {
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

    // ✅ Determine applicant image source
    const imageSrc = data?.photo_self_path?.startsWith("http")
      ? data.photo_self_path
      : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;
      


      const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
  return data[`family_member${n}_name`] ||
         data[`family_member${n}_age`] ||
         data[`family_member${n}_relation`] ||
         data[`family_member${n}_gender`] ||
         data[`family_member${n}_aadhaar`];
}).length;


    // ✅ Preload image (handles CORS)
    const preloadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });

    preloadImage(imageSrc)
      .then(() => {
        const pdfElement = document.createElement("div");
        pdfElement.style.width = "210mm";
        pdfElement.style.minHeight = "297mm";
        pdfElement.style.padding = "15mm";
        pdfElement.style.fontFamily = "Arial, sans-serif";
        pdfElement.style.fontSize = "12px";
        pdfElement.style.lineHeight = "1.4";
        pdfElement.style.backgroundColor = "white";
        pdfElement.style.position = "absolute";
        pdfElement.style.top = "-9999px";

        pdfElement.innerHTML = `
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
            <hr style="margin: 8px 0; border: 1px solid #000;">
            <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - तीन</h3>
            <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-एक नुसार)</p>
            <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० अथवा त्यापूर्वी संरक्षणपात्र झोपडीत राहणाऱ्या झोपडीवासीसाठी अर्ज</p>
          </div>

          <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
                <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
              </tr>
            </table>
          </div>

          <!-- ✅ Applicant photo -->
          <div style="text-align: left; margin-bottom: 20px;">
            <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
              <img src="${imageSrc}" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" crossOrigin="Anonymous" />
            </div>
            <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
          </div>

          <!-- ✅ Applicant info -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">अर्जदाराची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">१. अर्जदाराचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.hut_id || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.hut_name || ""}</td></tr>

              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""}</td></tr>
            </table>
          </div>

          <!-- ✅ Family members -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
                <td style="border: 1px solid #000; padding: 4px;">${totalMembers || ""} सदस्य</td>
              </tr>
            </table>
            <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
              <tr>
                <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
                <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
                <th style="border: 1px solid #000; padding: 4px;">वय</th>
                <th style="border: 1px solid #000; padding: 4px;">नातं</th>
                <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
                <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
              </tr>
            ${[1, 2, 3, 4, 5, 6].map((n) => {
  const name = data[`family_member${n}_name`];
  const age = data[`family_member${n}_age`];
  const relation = data[`family_member${n}_relation`];
  const gender = data[`family_member${n}_gender`];
  const aadhaar = data[`family_member${n}_aadhaar`];

  // If no data found for this member, skip row
  if (!name && !age && !relation && !gender && !aadhaar) return "";

  return `
    <tr>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
      <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
    </tr>`;
}).join("")}

            </table>
          </div>

          <!-- ✅ Hut details -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">लांबी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.length || ""}</td>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">रुंदी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.width || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
                <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
              </tr>
            </table>
          </div>

          <!-- ✅ Bank details -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">बँकेचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.bank_name || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td></tr>
              <tr><td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
              <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td></tr>
            </table>
          </div>

          <!-- ✅ Signature -->
          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
            <div style="text-align: center;">
              <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/thumb1.png" alt="Signature" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
            </div>
          </div>

          <!-- ✅ Footer -->
          <div style="text-align: center; border-top: 1px solid #000; padding-top: 10px;">
            <p style="font-size: 10px; margin: 2px 0;">संपर्क माहिती:</p>
            <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
            <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
            <p style="font-size: 9px; color: #777; margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
            <p style="font-size: 9px; color: #777; margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
          </div>
        `;

        document.body.appendChild(pdfElement);

        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true })
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF("p", "mm", "a4");
              const pageWidth = pdf.internal.pageSize.getWidth();
              const canvasHeight = (canvas.height * pageWidth) / canvas.width;

              pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
              pdf.save(`Jodpatra-3_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);
              document.body.removeChild(pdfElement);
              resolve(true);
            })
            .catch((err) => {
              document.body.removeChild(pdfElement);
              reject(err);
            });
        }, 500);
      })
      .catch((err) => {
        console.error("Applicant image load failed:", err);
        const fallbackImg = `${baseUrl}/user2.png`;
        data.photo_self_path = fallbackImg;
        generateJodpatra3(data); // re-run with fallback
      });
  });
};









  // ✅ Jodpatra-4 PDF Generator
//   const generateJodpatra4 = async (data) => {
//     return new Promise((resolve, reject) => {
//       const pdfElement = document.createElement('div');
//       pdfElement.style.width = '210mm';
//       pdfElement.style.minHeight = '297mm';
//       pdfElement.style.padding = '15mm';
//       pdfElement.style.fontFamily = 'Arial, sans-serif';
//       pdfElement.style.fontSize = '12px';
//       pdfElement.style.lineHeight = '1.4';
//       pdfElement.style.backgroundColor = 'white';
//       pdfElement.style.position = 'absolute';
//       pdfElement.style.top = '-9999px';

//       pdfElement.innerHTML = `
//         <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
//           <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
//           <hr style="margin: 8px 0; border: 1px solid #000;">
//           <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
//           <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
//           <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या  रहात असल्यास करावयाचा अर्ज</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.slum_id || "N/A"}</td>
//               <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="text-align: left; margin-bottom: 20px;">
//           <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">

//            <img
//   src="${data?.photo_self_path?.startsWith('http')
//     ? data.photo_self_path
//     : `${baseUrl}/${data?.photo_self_path || 'user2.png'}`}"
//   alt="Arjdaar Photo"
//   style="width: 100%; height: 100%; object-fit: cover;"
// />


//           </div>
//           <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>

//           <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडपट्टीचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.name_of_slum_area || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
//               <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${data.num_family_members || ""} सदस्य</td>
//             </tr>
//           </table>

//           <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
//             <tr">
//               <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
//               <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
//               <th style="border: 1px solid #000; padding: 4px;">वय</th>
//               <th style="border: 1px solid #000; padding: 4px;">नातं</th>
//               <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
//               <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
//             </tr>
//             ${Array.from({length: Math.min(parseInt(data.num_family_members) || 0, 6)}, (_, i) => {
//               const memberNum = i + 1;
//               return `
//                 <tr>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${memberNum}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_name`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_age`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_relation`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px; text-align: center;">${data[`family_member${memberNum}_gender`] || ""}</td>
//                   <td style="border: 1px solid #000; padding: 4px;">${data[`family_member${memberNum}_aadhaar`] || ""}</td>
//                 </tr>
//               `;
//             }).join('')}
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
//               <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
//             </tr>
//           </table>
//         </div>

//         <div style="margin-bottom: 20px;">
//           <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
//           <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
//               <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
//             </tr>
//             <tr>
//               <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
//               <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
//             </tr>
//           </table>
//         </div>

//         <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
//           <div style="text-align: center;">
//             <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
//               <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
//             </div>
//             <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
//             <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
//           </div>
//         </div>

//         <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
//           <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
//           <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
//           <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
//         </div>

//         <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
//           <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
//           <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
//         </div>
//       `;

//       document.body.appendChild(pdfElement);

//       setTimeout(() => {
//         html2canvas(pdfElement, { scale: 2 }).then((canvas) => {
//           const imgData = canvas.toDataURL('image/png');
//           const pdf = new jsPDF('p', 'mm', 'a4');
//           const pageWidth = pdf.internal.pageSize.getWidth();
//           const pageHeight = pdf.internal.pageSize.getHeight();

//           const canvasHeight = (canvas.height * pageWidth) / canvas.width;

//           pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, canvasHeight);

//           pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

//           document.body.removeChild(pdfElement);
//           resolve(true);
//         }).catch((err) => {
//           document.body.removeChild(pdfElement);
//           reject(err);
//         });
//       }, 500);
//     });
//   };


const generateJodpatra4 = async (data) => {
  return new Promise((resolve, reject) => {
    // Ensure baseUrl is defined
    const baseUrl = import.meta.env.VITE_BASE_URL || "https://sra.saavi.co.in";

       const totalMembers = [1, 2, 3, 4, 5, 6].filter((n) => {
  return data[`family_member${n}_name`] ||
         data[`family_member${n}_age`] ||
         data[`family_member${n}_relation`] ||
         data[`family_member${n}_gender`] ||
         data[`family_member${n}_aadhaar`];
}).length;


    // Function to preload image
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Handle CORS
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      });
    };

    // Determine image source
    const imageSrc = data?.photo_self_path?.startsWith("http")
      ? data.photo_self_path
      : `${baseUrl}/${data?.photo_self_path || "user2.png"}`;

    // Preload the image before generating the PDF
    preloadImage(imageSrc)
      .then(() => {
        const pdfElement = document.createElement("div");
        pdfElement.style.width = "210mm";
        pdfElement.style.minHeight = "297mm";
        pdfElement.style.padding = "15mm";
        pdfElement.style.fontFamily = "Arial, sans-serif";
        pdfElement.style.fontSize = "12px";
        pdfElement.style.lineHeight = "1.4";
        pdfElement.style.backgroundColor = "white";
        pdfElement.style.position = "absolute";
        pdfElement.style.top = "-9999px";

        pdfElement.innerHTML = `
          <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #000;">
            <h2 style="margin: 0; font-size: 16px; font-weight: bold;">निर्णय शासन क्रमांक: झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१</h2>
            <hr style="margin: 8px 0; border: 1px solid #000;">
            <h3 style="margin: 8px 0; font-size: 18px; font-weight: bold;">जोडपत्र - चार</h3>
            <p style="margin: 5px 0; font-size: 10px;">(शासन निर्णय, गृहनिर्माण विभाग क्र. झोपुधो-१००१/प्र.क्र.१२५/१४/झोपसु-१, दिनांक १३ मे, २०१५ मधील जोडपत्र-दोन नुसार)</p>
            <p style="margin: 10px 0; font-size: 11px;">दि.१.१.२००० रोजी असथा त्यापूर्वी संरक्षणपात्र दिनांक: १.१.२००० नंतरच्या दिनांकापासून सध्या रहात असल्यास करावयाचा अर्ज</p>
          </div>

          <div style="margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <tr>
                <td style="border: 1px solid #000; padding: 6px; width: 60%; font-weight: bold;">अर्ज क्र.: ${data.id || "N/A"}</td>
                <td style="border: 1px solid #000; padding: 6px; width: 40%; font-weight: bold;">दिनांक: ${new Date().toLocaleDateString("en-GB")}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: left; margin-bottom: 20px;">
            <div style="border: 2px solid #000; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
              <img
                src="${imageSrc}"
                alt="Arjdaar Photo"
                style="width: 100%; height: 100%; object-fit: cover;"
                crossOrigin="Anonymous"
              />
            </div>
            <p style="margin-top: 8px; font-size: 10px; font-weight: bold;">अर्जदाराचा फोटो</p>
          </div>

          <!-- Rest of the HTML content remains the same -->
          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 8px 0;">मी खालील नमूद केलेल्या माहितीची खात्री देतो:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 15px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">१. मुख्य अर्जदाराचे नाव:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.first_name || ""} ${data.middle_name || ""} ${data.last_name || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">२. लिंग:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.gender || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">३. आधार क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.aadhaar_number || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">४. मोबाईल क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.current_mobile_number || ""}</td>
              </tr>
               <tr>
              <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">५. झोपडीचे नाव:</td>
              <td style="border: 1px solid #000; padding: 5px;">${
                data.hut_name || ""
              }</td>
            </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">६. वॉर्ड:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.ward || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">७. सध्याचा पत्ता:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.current_address || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">८. निवासी कधीपासून:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.residency_since || ""} पासून</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">कुटुंबातील सदस्यांची माहिती:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">कुटुंबातील एकूण सदस्य:</td>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold;">${totalMembers || ""} सदस्य</td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; font-size: 9px; margin-top: 8px;">
              <tr>
                <th style="border: 1px solid #000; padding: 4px;">अ.क्र.</th>
                <th style="border: 1px solid #000; padding: 4px;">सदस्याचे नाव</th>
                <th style="border: 1px solid #000; padding: 4px;">वय</th>
                <th style="border: 1px solid #000; padding: 4px;">नातं</th>
                <th style="border: 1px solid #000; padding: 4px;">लिंग</th>
                <th style="border: 1px solid #000; padding: 4px;">आधार क्रमांक</th>
              </tr>
              ${[1, 2, 3, 4, 5, 6].map((n) => {
  const name = data[`family_member${n}_name`];
  const age = data[`family_member${n}_age`];
  const relation = data[`family_member${n}_relation`];
  const gender = data[`family_member${n}_gender`];
  const aadhaar = data[`family_member${n}_aadhaar`];

  // If no data found for this member, skip row
  if (!name && !age && !relation && !gender && !aadhaar) return "";

  return `
    <tr>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${n}</td>
      <td style="border: 1px solid #000; padding: 4px;">${name || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${age || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${relation || ""}</td>
      <td style="border: 1px solid #000; padding: 4px; text-align: center;">${gender || ""}</td>
      <td style="border: 1px solid #000; padding: 4px;">${aadhaar || ""}</td>
    </tr>`;
}).join("")}
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">झोपडीचे तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">लांबी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.length || ""}</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%; font-weight: bold;">रुंदी (मीटर):</td>
                <td style="border: 1px solid #000; padding: 5px; width: 25%;">${data.width || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">एकूण क्षेत्रफळ:</td>
                <td style="border: 1px solid #000; padding: 5px;" colspan="3">${data.area_sq_m || ""} चौ.मीटर</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="font-size: 12px; font-weight: bold; margin: 10px 0;">बँक तपशील:</p>
            <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
              <tr>
                <td style="border: 1px solid #000; padding: 5px; width: 30%; font-weight: bold;">बँकेचे नाव:</td>
                <td style="border: 1px solid #000; padding: 5px; width: 70%;">${data.bank_name || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">खाते क्रमांक:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.account_number || ""}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; padding: 5px; font-weight: bold;">IFSC कोड:</td>
                <td style="border: 1px solid #000; padding: 5px;">${data.ifsc_code || ""}</td>
              </tr>
            </table>
          </div>

          <div style="width: 100%; display: flex; justify-content: flex-end; margin-bottom: 20px;">
            <div style="text-align: center;">
              <div style="border: 2px solid #000; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;">
                <img src="/thumb1.png" alt="Arjdaar Photo" style="width: 100%; height: 100%; object-fit: cover;" />
              </div>
              <p style="margin-top: 10px; font-size: 10px; font-weight: bold;">अर्जदाराची सही / अंगठा निशाणी</p>
              <div style="margin-top: 5px; border-top: 1px solid #000; width: 120px;"></div>
            </div>
          </div>

          <div style="margin-top: 25px; text-align: center; padding-top: 15px; border-top: 1px solid #000;">
            <p style="font-size: 10px; font-weight: bold; margin: 3px 0;">संपर्क माहिती:</p>
            <p style="font-size: 10px; margin: 2px 0;">मोबाईल: ${data.current_mobile_number || "0000000000"}</p>
            <p style="font-size: 10px; margin: 2px 0;">ईमेल: ${data.user_email || "N/A"}</p>
          </div>

          <div style="margin-top: 15px; text-align: center; font-size: 9px; color: #666;">
            <p style="margin: 2px 0;">*** हे दस्तऐवज संगणकाद्वारे तयार केले गेले आहे ***</p>
            <p style="margin: 2px 0;">निर्मिती दिनांक: ${new Date().toLocaleDateString("mr-IN")}</p>
          </div>
        `;

        document.body.appendChild(pdfElement);

        // Wait for a short delay to ensure DOM rendering
        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const canvasHeight = (canvas.height * pageWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
            pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

            document.body.removeChild(pdfElement);
            resolve(true);
          }).catch((err) => {
            document.body.removeChild(pdfElement);
            reject(err);
          });
        }, 500);
      })
      .catch((err) => {
        console.error("Image preload failed:", err);
        // Fallback to a default image if preload fails
        const fallbackImage = `${baseUrl}/user2.png`;
        pdfElement.innerHTML = pdfElement.innerHTML.replace(imageSrc, fallbackImage);
        document.body.appendChild(pdfElement);

        setTimeout(() => {
          html2canvas(pdfElement, { scale: 2, useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const canvasHeight = (canvas.height * pageWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, pageWidth, canvasHeight);
            pdf.save(`Jodpatra-4_${data.first_name}_${data.last_name}_${Date.now()}.pdf`);

            document.body.removeChild(pdfElement);
            resolve(true);
          }).catch((err) => {
            document.body.removeChild(pdfElement);
            reject(err);
          });
        }, 500);
      });
  });
};