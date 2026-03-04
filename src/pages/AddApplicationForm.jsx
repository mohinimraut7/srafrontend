


import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair } from 'lucide-react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import isValidAadhaar from '../utils/aadhaarValidator';
import clusterData from "../data/clusterdata.json";
import wardsData from "../data/wardsData.json";
import { saveDraftToDB } from "../utils/draftDB"
import { getDraftById,updateDraftInDB } from "../utils/draftDB"
import Webcam from "react-webcam";
import { useRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"



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
  1: Yup.object({
    // slum_id: Yup.string().required('Slum ID is required'),
    // name_of_slum_area: Yup.string().required('Hut name is required'),
    // municipal_corporation: Yup.string().required('Municipal Corporation is required'),
    // ward: Yup.string().required('Ward is required'),
    // district: Yup.string().required('District is required'),
    // taluka: Yup.string().required('Taluka is required'),
  }),
  2: Yup.object({
    first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
    middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
    last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    
      aadhaar_number: Yup.string(),
      // .required('Aadhaar number is required')
      // .test(
      //   'is-valid-aadhaar',
      //   'Enter a valid Aadhaar number',
      //   (value) => isValidAadhaar(value)
      // ),
    aadhaar_mobile_number: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
      .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
      // .required('Mobile number is required'),
    user_email: Yup.string().email('Invalid email format'),
  }),
  3: Yup.object({
    current_address: Yup.string().required('Current address is required'),
    current_mobile_number: Yup.string()
     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
    .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
    current_pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    aadhaar_pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
    // voter_card_number: Yup.string()
    //   .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),


    voter_card_number: Yup.string().when("voter_card_type", (type, schema) => {
  if (type === "EPIC 10 Digit") {
    return schema
      .matches(/^[A-Z0-9]{10}$/, "Voter card number must be exactly 10 characters")
      // .required("Voter card number is required");
  }

  if (type === "EPIC 14 Digit") {
    return schema
      .matches(/^[A-Z0-9]{14}$/, "Voter card number must be exactly 14 characters")
      // .required("Voter card number is required");
  }

  return schema;
})



  }),
  4: Yup.object({
    // residency_since: Yup.string()
      // .required('Residency since is required'),
  }),
  5: Yup.object({
    num_family_members: Yup.number(),
      // .min(1, 'At least 1 family member is required')
      // .max(6, 'Maximum 6 family members allowed'),
      // .required('Number of family members is required'),
 family_member1_aadhaar: Yup.string()
      // .required('Aadhaar number is required')
      // .test(
      //   'is-valid-aadhaar',
      //   'Enter a valid Aadhaar number',
      //   (value) => isValidAadhaar(value)
      // ),
    


  }),
  6: Yup.object({}),
  7: Yup.object({}),
}



const base64ToFile = (base64, filename, mimeType) => {
  const arr = base64.split(",");
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mimeType });
};






const fileToBase64Object = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        data: reader.result
      });
    };
  });
};

const convertFilesToBase64 = async (filesObj) => {
  const converted = {};

  for (const key in filesObj) {
    const file = filesObj[key];

    if (Array.isArray(file)) {
      converted[key] = await Promise.all(
        file.map(f => fileToBase64Object(f))
      );
    } else if (file instanceof File) {
      converted[key] = await fileToBase64Object(file);
    }
  }

  return converted;
};





const ApplicationForm = ({ onClose, onSuccess,draftId  }) => {
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
  const [loadedDraft, setLoadedDraft] = useState(null)
const [activeCamera, setActiveCamera] = useState(null)
const webcamRef = useRef(null)

const [recordingField, setRecordingField] = useState(null)
const [recordingTimer, setRecordingTimer] = useState(0)
const [videoReady, setVideoReady] = useState({})
const videoRefs = useRef({})


 let role = null;
let user_id = null;
const webcamStreamRef = useRef(null)

if (typeof window !== "undefined") {
  const userData = localStorage.getItem("user");
  if (userData) {
    const parsedUser = JSON.parse(userData);
    role = parsedUser?.role;
    user_id = parsedUser?.id;   // ✅ ADD THIS
  }
}

  useEffect(() => {
    fetchClusters()
    fetchSlums()
  }, [])

  useEffect(() => {
  if (draftId) {
    loadDraft()
  }
}, [draftId]) 



const loadDraft = async () => {
  const draft = await getDraftById(Number(draftId))

  



if (draft) {
  setLoadedDraft(draft);

  const restoredFiles = {};

  Object.keys(draft.fileData || {}).forEach((key) => {
    const fileObj = draft.fileData[key];

    if (fileObj?.data) {
      restoredFiles[key] = base64ToFile(
        fileObj.data,
        fileObj.name,
        fileObj.type
      );
    }
  });

  setFiles(restoredFiles);
}


}


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



const handleSaveDraft = async (values) => {
  try {
    const draftData = {
      ...values,
      _currentStep: currentStep
    }

    // 🔥 Convert Files to Base64 before saving
    const base64Files = await convertFilesToBase64(files)

    if (draftId) {
      await updateDraftInDB(
        Number(draftId),
        draftData,
        base64Files
      )
    } else {
      await saveDraftToDB(
        draftData,
        base64Files
      )
    }

    setSuccess("Draft saved successfully ✅")

    // setTimeout(() => {
    //   onSuccess?.("draft")
    // }, 1000)

  } catch (err) {
    setError("Draft save failed")
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


const stopWebcamStream = () => {
  // Stop via webcamRef internal stream
  if (webcamRef.current?.stream) {
    webcamRef.current.stream.getTracks().forEach(t => {
      t.enabled = false
      t.stop()
    })
  }
  // Also stop via our own ref if captured
  if (webcamStreamRef.current) {
    webcamStreamRef.current.getTracks().forEach(t => {
      t.enabled = false
      t.stop()
    })
    webcamStreamRef.current = null
  }
  setActiveCamera(null)
}

const capturePhoto = async (fieldName) => {
  const imageSrc = webcamRef.current?.getScreenshot()
  if (!imageSrc) return

  const blob = await (await fetch(imageSrc)).blob()
  const file = new File([blob], `${fieldName}_${Date.now()}.jpg`, {
    type: "image/jpeg"
  })

  const multipleFields = [
    "sale_agreement",
    "after_2000_proof_submitted",
    "doc_before_2000"
  ]

  setFiles(prev => {
    if (multipleFields.includes(fieldName)) {

      // 🔥 SAFE CONVERSION
      const existing = prev[fieldName]

      let safeArray = []

      if (Array.isArray(existing)) {
        safeArray = existing
      } else if (existing instanceof File) {
        safeArray = [existing]
      }

      return {
        ...prev,
        [fieldName]: [...safeArray, file]
      }
    }

    return {
      ...prev,
      [fieldName]: file
    }
  })

  // setActiveCamera(null)
  stopWebcamStream()
}

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
    length: '', width: '', area_sq_m: '', residency_since:null,
    num_family_members: 1,
    family_member1_name: '', family_member1_age: '', family_member1_relation: '', family_member1_gender: '', family_member1_aadhaar: '',
    family_member2_name: '', family_member2_age: '', family_member2_relation: '', family_member2_gender: '', family_member2_aadhaar: '',
    family_member3_name: '', family_member3_age: '', family_member3_relation: '', family_member3_gender: '', family_member3_aadhaar: '',
    family_member4_name: '', family_member4_age: '', family_member4_relation: '', family_member4_gender: '', family_member4_aadhaar: '',
    family_member5_name: '', family_member5_age: '', family_member5_relation: '', family_member5_gender: '', family_member5_aadhaar: '',
    family_member6_name: '', family_member6_age: '', family_member6_relation: '', family_member6_gender: '', family_member6_aadhaar: '',
    self_declaration_letter: false, submitted_docs_before_2000: false,
    doc_before_2000:[], after_2000_proof_submitted:[],
    timestamp: '', created_date: '', submittedBy: '', sale_agreement: [],
    doc_front_view: null,
    biometric:null,
    same_as_aadhaar: false,
    same_pincode_as_aadhaar: false,



  }
  

  const steps = [
    { id: 1, title: 'Basic Information', icon: 'Building' },
    { id: 2, title: 'Owner Details', icon: 'User' },
    { id: 3, title: 'Address Contact', icon: 'MapPin' },
    { id: 4, title: 'Bank and Slum Details', icon: 'Bank' },
    { id: 5, title: 'Family Members', icon: 'Users' },
    { id: 6, title: 'Images', icon: 'Camera' },
    { id: 7, title: 'Metadata', icon: 'FileText' }
  ]

  

// const startVideoRecording = async (fieldName) => {
//   try {
//     if (recordingField) return; // prevent multiple recording

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     });

//     videoRefs.current[fieldName].srcObject = stream;

//     const recorder = new MediaRecorder(stream);
//     let chunks = [];

//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunks.push(event.data);
//       }
//     };

//     recorder.onstop = () => {
//       const blob = new Blob(chunks, { type: "video/webm" });
//       const file = new File([blob], `${fieldName}_${Date.now()}.webm`, {
//         type: "video/webm"
//       });

//       setFiles(prev => ({
//         ...prev,
//         [fieldName]: file
//       }));

//       stream.getTracks().forEach(track => track.stop());
//       setRecordingField(null);
//     };

//     recorder.start();
//     setRecordingField(fieldName);

//     setTimeout(() => {
//       recorder.stop();
//     }, 15000);

//   } catch (err) {
//     alert("Camera permission denied or error occurred");
//     console.error(err);
//   }
// };





// const startVideoRecording = async (fieldName) => {
//   try {
//     if (recordingField) return; // prevent multiple recording

//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     });

//     setRecordingField(fieldName);
//     setRecordingTimer(0);

//     // ✅ Video tag render होण्यासाठी थोडा वेळ द्या
//     setTimeout(() => {
//       if (videoRefs.current[fieldName]) {
//         videoRefs.current[fieldName].srcObject = stream;
//       }
//     }, 100);

//     const recorder = new MediaRecorder(stream);
//     let chunks = [];

//     // ✅ Timer interval
//     let seconds = 0;
//     const timerInterval = setInterval(() => {
//       seconds += 1;
//       setRecordingTimer(seconds);
//     }, 1000);

//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         chunks.push(event.data);
//       }
//     };

//     recorder.onstop = () => {
//       const blob = new Blob(chunks, { type: "video/webm" });
//       const file = new File([blob], `${fieldName}_${Date.now()}.webm`, {
//         type: "video/webm"
//       });

//       setFiles(prev => ({
//         ...prev,
//         [fieldName]: file
//       }));

//       stream.getTracks().forEach(track => track.stop());
//       setRecordingField(null);
//       setRecordingTimer(0);
//       clearInterval(timerInterval);
//     };

//     recorder.start();

//     setTimeout(() => {
//       recorder.stop();
//       clearInterval(timerInterval);
//     }, 15000);

//   } catch (err) {
//     alert("Camera permission denied or error occurred");
//     console.error(err);
//   }
// };



// const startVideoRecording = async (fieldName) => {
//   try {
//     if (recordingField) return;

//     // ✅ CRITICAL — release webcam stream before grabbing video+audio
//     stopWebcamStream()

//     // Small delay to let WebView release the camera hardware
//     await new Promise(resolve => setTimeout(resolve, 300))


//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "user" },
//       audio: {
//         echoCancellation: false,
//         noiseSuppression: false,
//         autoGainControl: false
//       }
//     });

//     setRecordingField(fieldName);
//     setRecordingTimer(0);

//     setTimeout(() => {
//       if (videoRefs.current[fieldName]) {
//         videoRefs.current[fieldName].srcObject = stream;
//       }
//     }, 100);

//     const mimeType = MediaRecorder.isTypeSupported("video/mp4")
//       ? "video/mp4"
//       : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
//       ? "video/webm;codecs=vp8,opus"
//       : "video/webm";

//     const recorder = new MediaRecorder(stream, { mimeType });
//     const chunks = [];

//     let seconds = 0;
//     const timerInterval = setInterval(() => {
//       seconds += 1;
//       setRecordingTimer(seconds);
//     }, 1000);

//     recorder.ondataavailable = (e) => {
//       if (e.data && e.data.size > 0) chunks.push(e.data);
//     };

//     recorder.onstop = () => {
//       clearInterval(timerInterval);
//       stream.getTracks().forEach(t => {
//         t.enabled = false;
//         t.stop();
//       });
//       const blob = new Blob(chunks, { type: mimeType });
//       const ext = mimeType.includes("mp4") ? "mp4" : "webm";
//       const file = new File(
//         [blob],
//         `${fieldName}_${Date.now()}.${ext}`,
//         { type: mimeType }
//       );
//       setFiles(prev => ({ ...prev, [fieldName]: file }));
//       setRecordingField(null);
//       setRecordingTimer(0);
//     };

//     recorder.start(100);

//     setTimeout(() => {
//       if (recorder.state === "recording") recorder.stop();
//       clearInterval(timerInterval);
//     }, 15000);

//   } catch (err) {
//     console.error("startVideoRecording failed:", err);
//     setRecordingField(null);
//     setRecordingTimer(0);
//     alert("Camera / Mic error: " + err.message);
//   }
// };


const startVideoRecording = async (fieldName) => {
  try {
    if (recordingField) return;

    stopWebcamStream();

    // Longer delay for Android WebView to fully release camera/mic hardware
    await new Promise(resolve => setTimeout(resolve, 800));

    let stream;
    
    try {
      // First try: video + audio together
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // back camera for field survey
        audio: true  // simple audio constraint - avoids "Could not start audio source"
      });
    } catch (audioErr) {
      console.warn("Audio failed, trying video only:", audioErr);
      // Fallback: video only if mic fails
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
    }

    setRecordingField(fieldName);
    setRecordingTimer(0);

    setTimeout(() => {
      if (videoRefs.current[fieldName]) {
        videoRefs.current[fieldName].srcObject = stream;
      }
    }, 100);

    // Android WebView supports video/webm better than mp4
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
      ? "video/webm;codecs=vp8,opus"
      : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "";

    const recorderOptions = mimeType ? { mimeType } : {};
    const recorder = new MediaRecorder(stream, recorderOptions);
    const chunks = [];

    let seconds = 0;
    const timerInterval = setInterval(() => {
      seconds += 1;
      setRecordingTimer(seconds);
    }, 1000);

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      clearInterval(timerInterval);
      stream.getTracks().forEach(t => {
        t.enabled = false;
        t.stop();
      });
      const actualMime = recorder.mimeType || "video/webm";
      const ext = actualMime.includes("mp4") ? "mp4" : "webm";
      const blob = new Blob(chunks, { type: actualMime });
      const file = new File(
        [blob],
        `${fieldName}_${Date.now()}.${ext}`,
        { type: actualMime }
      );
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      setRecordingField(null);
      setRecordingTimer(0);
    };

    recorder.start(100);

    setTimeout(() => {
      if (recorder.state === "recording") recorder.stop();
      clearInterval(timerInterval);
    }, 15000);

  } catch (err) {
    console.error("startVideoRecording failed:", err);
    setRecordingField(null);
    setRecordingTimer(0);
    alert("Camera / Mic error: " + err.message);
  }
};


const handleFileChange = (e) => {
  const { name, files: selectedFiles } = e.target

  if (!selectedFiles || selectedFiles.length === 0) return

  // 🔥 Multiple fields list
  const multipleFields = [
    "sale_agreement",
    "after_2000_proof_submitted",
    "doc_before_2000",
    "biometric"
  ]

  if (multipleFields.includes(name)) {
    setFiles(prev => ({
      ...prev,
      [name]: [
        ...(prev[name] || []),
        ...Array.from(selectedFiles)
      ]
    }))
  } else {
    setFiles(prev => ({
      ...prev,
      [name]: selectedFiles[0]
    }))
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

// 🔥 Minimum 5 photos validation (not mandatory)
// const checkMinFive = (field) => {
//   if (files[field] && Array.isArray(files[field])) {
//     if (files[field].length > 0 && files[field].length < 5) {
//       setError(`${field} requires minimum 5 files if uploading`)
//       setLoading(false)
//       return false
//     }
//   }
//   return true
// }

// if (
//   !checkMinFive("sale_agreement") ||
//   !checkMinFive("after_2000_proof_submitted") ||
//   !checkMinFive("doc_before_2000")
// ) {
//   return
// }

  

    try {
      const token = getAuthToken()
      if (!token) throw new Error("No authentication token found")

      let currentUser = getUser()
      console.log("dndndndndndn",currentUser)
      if (!currentUser) currentUser = await fetchAndSetUserProfile()

      const formDataToSend = new FormData()
       const {
      same_as_aadhaar,
      same_pincode_as_aadhaar,
      residency_since,
      ...cleanValues
    } = values

let formattedResidency = ""

if (residency_since instanceof Date) {
  formattedResidency = `${String(residency_since.getDate()).padStart(2, "0")}-${String(
    residency_since.getMonth() + 1
  ).padStart(2, "0")}-${residency_since.getFullYear()}`
}

      const updatedValues = {...cleanValues,residency_since: formattedResidency,submittedBy:user_id || "N/A" }

      Object.keys(updatedValues).forEach(key => {
        if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
          formDataToSend.append(key, updatedValues[key])
        }
      })

      // Object.keys(files).forEach(key => {
      //   if (files[key]) {
      //     if (Array.isArray(files[key])) {
      //       files[key].forEach(file => formDataToSend.append(key, file))
      //     } else {
      //       formDataToSend.append(key, files[key])
      //     }
      //   }
      // })


      Object.keys(files).forEach(key => {
  if (files[key]) {
    if (Array.isArray(files[key])) {
      files[key].forEach(file => {
        if (file instanceof File) {
          formDataToSend.append(key, file);
        }
      });
    } else {
      if (files[key] instanceof File) {
        formDataToSend.append(key, files[key]);
      }
    }
  }
});


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

            

              <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">सेक्टर क्रमांक *</label>
  <select
    name="slum_id"
    onChange={(e) => handleSlumChange(e, formik)}
    onBlur={formik.handleBlur}
    value={formik.values.slum_id}
    disabled={!formik.values.cluster_number}
    className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 ${!formik.values.cluster_number ? "bg-gray-100 cursor-not-allowed" : ""}`}
  >
    <option value="">
      {formik.values.cluster_number ? "सेक्टर क्रमांक निवडा" : "प्रथम क्लस्टर निवडा"}
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


              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचे नाव *</label>
                <Field
                  type="text"
                  name="hut_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="hut_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>  */}

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
                  {/* <option value="Residential / Commercial">Residential / Commercial</option> */}
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
                  {/* <option value="Pending">Pending</option> */}
                  <option value="Hut Appose">Hut Appose</option>
                  <option value="Hut Denied">Hut Denied</option>
                   <option value="readytosurvey">Ready To Survey</option>
                  {/* <option value="Completed">Completed</option> */}
                </Field>
              </div>
            </div>

         

            {formik.values.survey_status !== "Hut Appose" &&
 formik.values.survey_status !== "Hut Denied" && (

  <div className="grid md:grid-cols-2 gap-6">
    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
      <Field
        type="checkbox"
        name="plan_submitted"
        className="h-5 w-5 text-blue-600"
      />
      <label className="text-sm font-medium text-gray-700">
        योजना सादर केली आहे का?
      </label>
    </div>

    <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
      <Field
        type="checkbox"
        name="society_registered"
        className="h-5 w-5 text-blue-600"
      />
      <label className="text-sm font-medium text-gray-700">
        सोसायटी नियोजित आहे का?
      </label>
    </div>
  </div>

)}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Owner Details</h3>
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
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    सध्याचा पत्ता *
  </label>
  <Field
    as="textarea"
    name="current_address"
    rows="3"
    readOnly={formik.values.same_as_aadhaar}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${
      formik.values.same_as_aadhaar
        ? "bg-gray-100 cursor-not-allowed"
        : ""
    }`}
  />
  <ErrorMessage
    name="current_address"
    component="div"
    className="text-red-500 text-sm mt-1 font-medium"
  />
</div>

   {/* Same As Aadhaar Checkbox */}
<div className="flex items-center mb-3">
  <Field
    type="checkbox"
    name="same_as_aadhaar"
    checked={formik.values.same_as_aadhaar}
    onChange={(e) => {
      const checked = e.target.checked
      formik.setFieldValue("same_as_aadhaar", checked)

      if (checked) {
        formik.setFieldValue(
          "current_address",
          formik.values.aadhaar_address
        )
      } else {
        formik.setFieldValue("current_address", "")
      }
    }}
    className="h-4 w-4 text-blue-600"
  />
  <label className="ml-2 text-sm text-gray-700">
    आधार पत्ता आणि सध्याचा पत्ता एकच आहे
  </label>
</div>

</div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">आधार पिनकोड (६ अंक) *</label>
                <Field type="text" name="aadhaar_pincode" maxLength="6" placeholder="400001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="aadhaar_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा पिनकोड (६ अंक) *</label>
                <Field type="text" name="current_pincode" maxLength="6" placeholder="400001" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="current_pincode" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div> */}
              {/* Aadhaar Pincode */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    आधार पिनकोड (६ अंक) *
  </label>
  <Field
    type="text"
    name="aadhaar_pincode"
    maxLength="6"
    placeholder="400001"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  />
  <ErrorMessage
    name="aadhaar_pincode"
    component="div"
    className="text-red-500 text-sm mt-1 font-medium"
  />
</div>

{/* Current Pincode */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    सध्याचा पिनकोड (६ अंक) *
  </label>

  <Field
    type="text"
    name="current_pincode"
    maxLength="6"
    placeholder="400001"
    readOnly={formik.values.same_pincode_as_aadhaar}
    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${
      formik.values.same_pincode_as_aadhaar
        ? "bg-gray-100 cursor-not-allowed"
        : ""
    }`}
  />

  {/* Checkbox */}
  <div className="flex items-center mt-2">
    <input
      type="checkbox"
      checked={formik.values.same_pincode_as_aadhaar}
      onChange={(e) => {
        const checked = e.target.checked
        formik.setFieldValue("same_pincode_as_aadhaar", checked)

        if (checked) {
          formik.setFieldValue(
            "current_pincode",
            formik.values.aadhaar_pincode
          )
        } else {
          formik.setFieldValue("current_pincode", "")
        }
      }}
      className="h-4 w-4 text-blue-600"
    />
    <label className="ml-2 text-sm text-gray-700">
      आधार पिनकोड आणि सध्याचा पिनकोड एकच आहे
    </label>
  </div>

  <ErrorMessage
    name="current_pincode"
    component="div"
    className="text-red-500 text-sm mt-1 font-medium"
  />
</div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा मोबाइल क्रमांक (१० अंक) *</label>
                <Field type="tel" name="current_mobile_number" maxLength="10" placeholder="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळखपत्राचा प्रकार *</label>
                <Field as="select" name="voter_card_type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">मतदार ओळखपत्राचा प्रकार निवडा</option>
                  <option value="EPIC 10 Digit">EPIC 10 Digit</option>
                  <option value="EPIC 14 Digit">EPIC 14 Digit</option>
                </Field>
              </div> */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">मतदार ओळख क्रमांक (१० अंक) *</label>
                <Field type="text" name="voter_card_number" maxLength="10" placeholder="ABC1234567" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
              </div> */}
{/* Dynamic Voter Card Number Field */}
{/* {formik.values.voter_card_type === "EPIC 10 Digit" && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      मतदार ओळख क्रमांक (१० अंक) *
    </label>
    <Field
      type="text"
      name="voter_card_number"
      maxLength="10"
      placeholder="ABC1234567"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage
      name="voter_card_number"
      component="div"
      className="text-red-500 text-sm mt-1 font-medium"
    />
  </div>
)}

{formik.values.voter_card_type === "EPIC 14 Digit" && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      मतदार ओळख क्रमांक (१४ अंक) *
    </label>
    <Field
      type="text"
      name="voter_card_number"
      maxLength="14"
      placeholder="ABC12345678901"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    />
    <ErrorMessage
      name="voter_card_number"
      component="div"
      className="text-red-500 text-sm mt-1 font-medium"
    />
  </div>
)} */}


{/* Voter Card Type */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    मतदार ओळखपत्राचा प्रकार *
  </label>

  <Field
    as="select"
    name="voter_card_type"
    onChange={(e) => {
      formik.handleChange(e)
      formik.setFieldValue("voter_card_number", "") // ✅ Reset when type changes
    }}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
  >
    <option value="">मतदार ओळखपत्राचा प्रकार निवडा</option>
    <option value="EPIC 10 Digit">EPIC 10 Digit</option>
    <option value="EPIC 14 Digit">EPIC 14 Digit</option>
  </Field>
</div>

{/* Dynamic Voter Card Number Field */}
{formik.values.voter_card_type && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      मतदार ओळख क्रमांक (
      {formik.values.voter_card_type === "EPIC 10 Digit" ? "१०" : "१४"} अंक) *
    </label>

    <Field name="voter_card_number">
      {({ field }) => (
        <input
          {...field}
          type="text"
          maxLength={
            formik.values.voter_card_type === "EPIC 10 Digit" ? 10 : 14
          }
          placeholder={
            formik.values.voter_card_type === "EPIC 10 Digit"
              ? "ABC1234567"
              : "ABC12345678901"
          }
          onChange={(e) => {
            const value = e.target.value
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, "") // ✅ Only alphanumeric
            formik.setFieldValue("voter_card_number", value)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      )}
    </Field>

    <ErrorMessage
      name="voter_card_number"
      component="div"
      className="text-red-500 text-sm mt-1 font-medium"
    />
  </div>
)}


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> अक्षांश *</label>
                <Field type="text" name="biometric_lat" placeholder="19.0760" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> रेखांश *</label>
                <Field type="text" name="biometric_long" placeholder="72.8777" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
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
            </div> */}


            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
      <MapPin className="w-5 h-5 text-white" />
    </div>
    Location Services
  </h4>
  <div className="flex flex-col sm:flex-row items-center gap-4">
    <button
      type="button"
      onClick={() => fetchCurrentLocation(formik)}
      disabled={fetchingLocation}
      className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all ${
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
      <div className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">बँकेचे नाव </label>
                  <Field type="text" name="bank_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">खाते क्रमांक </label>
                  <Field type="text" name="account_number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">IFSC कोड </label>
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
                {/* <div>
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
                </div> */}
  {/* <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    राहणीमान सुरु पासून *
  </label>

  <DatePicker
    selected={
      formik.values.residency_since
        ? new Date(
            formik.values.residency_since.split("-").reverse().join("-")
          )
        : null
    }
    onChange={(date) => {
      if (!date) return

      const formatted = `${String(date.getDate()).padStart(2, "0")}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${date.getFullYear()}`

      formik.setFieldValue("residency_since", formatted)
    }}
    dateFormat="dd-MM-yyyy"
    placeholderText="dd-mm-yyyy"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    isClearable
  />

  {formik.values.residency_since && (
    <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
      <p className="text-xs font-medium">
        {(() => {
          const [day, month, year] =
            formik.values.residency_since.split("-")

          const selectedDate = new Date(year, month - 1, day)
          const cutoffDate = new Date(2000, 0, 1)

          return selectedDate <= cutoffDate ? (
            <span className="text-green-600">
              01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
            </span>
          ) : (
            <span className="text-blue-600">
              01-01-2000 नंतर - Jodpatra-4 तयार होईल
            </span>
          )
        })()}
      </p>
    </div>
  )}
</div> */}


<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    राहणीमान सुरु पासून *
  </label>

  <DatePicker
    selected={formik.values.residency_since}
    onChange={(date) => {
      formik.setFieldValue("residency_since", date)
    }}
    dateFormat="dd-MM-yyyy"
    placeholderText="dd-mm-yyyy"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    isClearable
  />

  {formik.values.residency_since && (
    <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
      <p className="text-xs font-medium">
        {formik.values.residency_since <= new Date(2000, 0, 1) ? (
          <span className="text-green-600">
            01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
          </span>
        ) : (
          <span className="text-blue-600">
            01-01-2000 नंतर - Jodpatra-4 तयार होईल
          </span>
        )}
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
                { name: 'doc_side_view', label: 'Side View', accept: 'image/*', icon: '🏗️' },
                { name: 'doc_front_view', label: 'Front View', accept: 'image/*', icon: '🏗️' },

                 
  //               ...(formik.values.residency_since &&
  // formik.values.residency_since <= new Date(2000, 0, 1)
  
  //                 ? [
  //                     { name: 'doc_before_2000', label: 'Hut Owner Document Before 2000 Proof', accept: 'image/*,.pdf,.doc,.docx', icon: '',multiple: true },
  //                   ]
  //                 : []
  //               ),
                
  //               ...(formik.values.residency_since &&
  // formik.values.residency_since > new Date(2000, 0, 1)
               
  //                 ?[{
  //   name: 'after_2000_proof_submitted',
  //   label: 'Hut Owner Document After 2000 Proof',
  //   accept: 'image/*,.pdf,.doc,.docx',
  //   icon: '📄',
  //   multiple: true   // ✅ ADD THIS
  // }]
  //                 : []
  //               ),


  ...[
  { name: 'doc_before_2000', label: 'Hut Owner Document Before 2000 Proof', accept: 'image/*,.pdf,.doc,.docx', icon: '', multiple: true },
],

...[{
  name: 'after_2000_proof_submitted',
  label: 'Hut Owner Document After 2000 Proof',
  accept: 'image/*,.pdf,.doc,.docx',
  icon: '📄',
  multiple: true   // ✅ ADD THIS
}],
              
                { name: 'Seldeclaration_letter', label: 'Self Declaration - A', accept: 'image/*,.pdf', icon: '✍️' },
                { name: 'Ration_card_info', label: 'Self-Declaration Form for Self-Assessment - B', accept: 'image/*,.pdf', icon: '📁' },
                
                { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
                { name: 'biometric', label: 'Biometric Photo', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
                { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' },
                { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
              
              ].map(({ name, label, accept, icon, multiple }) => (
                <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-2">{icon}</span>
                    <h4 className="font-semibold text-gray-800">{label}</h4>
                  </div>
                  {/* <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  /> */}

{/* -------------------------------------------------------------------------- */}

                  {/* <input
  type="file"
  name={name}
  onChange={handleFileChange}
  accept={accept}
  multiple={multiple}
  capture={
    accept?.includes("image")
      ? "environment"   // 📸 Back camera for images
      : accept?.includes("video")
      ? "environment"   // 🎥 Back camera for video
      : undefined
  }
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
/> */}





<input
  type="file"
  name={name}
  onChange={handleFileChange}
  accept={accept}
  multiple={multiple}
  // capture={
  //   accept?.includes("image")
  //     ? "environment"
  //     : accept?.includes("video")
  //     ? "environment"
  //     : undefined
  // }
  capture={
  /Mobi|Android/i.test(navigator.userAgent)
    ? "environment"
    : undefined
}

  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
/>

{/* CAMERA BUTTON ONLY FOR IMAGE */}
{accept?.includes("image") && (
  <button
    type="button"
    onClick={() => setActiveCamera(name)}
    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
  >
    Open Camera
  </button>
)}


{/* VIDEO PREVIEW */}
{/* {accept?.includes("video") && (
  <button
    type="button"
    onClick={() => startVideoRecording(name)}
    disabled={recordingField !== null}
    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
  >
    {recordingField === name
      ? "Recording... (Max 15 sec)"
      : "Start Video Recording (Max 15 sec)"}
  </button>
)}

{accept?.includes("video") && (
  <video
    ref={(el) => (videoRefs.current[name] = el)}
    autoPlay
    muted
    className="mt-3 w-full rounded-lg border"
  />
)} */}


{/* VIDEO PREVIEW */}
{/* VIDEO PREVIEW */}
{/* {accept?.includes("video") && !videoReady[name] && (
  <button
    type="button"
    onClick={() => setVideoReady(prev => ({ ...prev, [name]: true }))}
    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
  >
    Record Vedio (Max 15 sec)
  </button>
)}

{accept?.includes("video") && videoReady[name] && (
  <button
    type="button"
    onClick={() => startVideoRecording(name)}
    disabled={recordingField !== null}
    className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
  >
    {recordingField === name
      ? `Recording... ${recordingTimer}s / 15s`
      : "▶ Start"}
  </button>
)}

{accept?.includes("video") && recordingField === name && (
  <video
    ref={(el) => (videoRefs.current[name] = el)}
    autoPlay
    muted
    className="mt-3 w-full rounded-lg border"
  />
)} */}

{accept?.includes("video") && (
  <button
    type="button"
    onClick={() => startVideoRecording(name)}
    disabled={recordingField !== null}
    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
  >
    {/* {recordingField === name
      ? `Recording... ${recordingTimer}s / 15s`
      : "Record Vedio (Max 15 sec)"} */}

      {recordingField === name
  ? <><span className="font-bold text-lg">Recording... {recordingTimer}s / 15s</span></>
  : "Record Vedio (Max 15 sec)"}
  </button>
)}

{accept?.includes("video") && recordingField === name && (
  <video
    ref={(el) => (videoRefs.current[name] = el)}
    autoPlay
    muted
    className="mt-3 w-full rounded-lg border"
  />
)}



{/* WEBCAM MODAL */}
{activeCamera === name && (
  <div className="mt-4 p-4 border rounded-lg bg-gray-100">
    {/* <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      className="w-full rounded-lg"
      // videoConstraints={{ facingMode: "environment" }}

      videoConstraints={{ facingMode: "user" }}

    /> */}

    {/* -------------------------- */}

    {/* <Webcam
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  audio={false}
  className="w-full rounded-lg"
  videoConstraints={{
    facingMode: "user"
  }}
  onUserMediaError={(err) => {
    console.error("Camera Error:", err)
    alert("Camera Error: " + err.name)
  }}
/> */}



<Webcam
  ref={webcamRef}
  screenshotFormat="image/jpeg"
  audio={false}
  className="w-full rounded-lg"
  videoConstraints={{
    facingMode: /Mobi|Android/i.test(navigator.userAgent)
      ? { exact: "environment" }   // Mobile → Back camera
      : "user"                     // Desktop → Front camera
  }}
  onUserMediaError={(err) => {
    console.error("Camera Error:", err)
    alert("Camera Error: " + err.message)
  }}
/>



    {/* <div className="flex gap-4 mt-3">
      <button
        type="button"
        onClick={() => capturePhoto(name)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Capture
      </button>

      <button
        type="button"
        // onClick={() => setActiveCamera(null)}
          onClick={() => stopWebcamStream()} // ← was setActiveCamera(null)

        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Cancel
      </button>
    </div> */}
    <div className="flex flex-col sm:flex-row gap-3 mt-3">
  <button
    type="button"
    onClick={() => capturePhoto(name)}
    className="w-full sm:w-auto bg-green-600 text-white px-4 py-2 rounded-lg"
  >
    Capture
  </button>

  <button
    type="button"
    onClick={() => stopWebcamStream()}
    className="w-full sm:w-auto bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    Cancel
  </button>
</div>
  </div>
)}


                  {/* {files[name] && (
                    <div className="mt-2 p-2 bg-green-50 rounded">
                      {Array.isArray(files[name]) ? (
                        files[name].map((file, idx) => (
                          <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
                            <span className="text-green-500 mr-2">Check</span>
                            <p className="truncate min-w-0 max-w-full">{file.name}</p>
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center text-sm text-green-700">
                          <span className="text-green-500 mr-2">Check</span>
                          <p className="truncate min-w-0 max-w-full">{files[name].name}</p>
                        </div>
                      )}
                    </div>
                  )} */}

                  {files[name] && (
  <div className="mt-2 p-2 bg-green-50 rounded overflow-hidden">
    {Array.isArray(files[name]) ? (
      files[name].map((file, idx) => (
        <div key={idx} className="flex items-center text-sm text-green-700 mb-1 min-w-0">
          <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
          <p className="truncate min-w-0 flex-1">{file.name}</p>
        </div>
      ))
    ) : (
      <div className="flex items-center text-sm text-green-700 min-w-0">
        <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
        <p className="truncate min-w-0 flex-1">{files[name].name}</p>
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
          {/* {success && (
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
          )} */}

{success && (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-4 py-4 rounded-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
    <span className="text-2xl flex-shrink-0">✅</span>
    <span className="font-medium break-words min-w-0 w-full">{success}</span>
  </div>
)}
{error && (
  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-4 py-4 rounded-lg mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
    <span className="text-2xl flex-shrink-0">❌</span>
    <span className="font-medium break-words min-w-0 w-full">{error}</span>
  </div>
)}


          <Formik
          enableReinitialize
            // initialValues={initialValues}
            initialValues={loadedDraft?.formData || initialValues}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={handleSubmit}
          >
            {(formik) => {
           const isFinalBySurvey =
      currentStep === 1 &&
      (formik.values.survey_status === "Hut Appose" ||
       formik.values.survey_status === "Hut Denied")    

return(


              <Form>
                {renderStepContent(formik)}


               




<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-8 border-t border-gray-200">

  {/* Previous */}
  <button
    type="button"
    onClick={prevStep}
    disabled={currentStep === 1}
    className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold ${
      currentStep === 1
        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
        : 'bg-gray-200 text-gray-700'
    }`}
  >
    <ChevronLeft size={18} /> Previous
  </button>

  {/* Save Draft */}
  <button
    type="button"
    onClick={() => handleSaveDraft(formik.values)}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
  >
    <Save size={18} /> Save Draft
  </button>

  {/* Next / Submit */}
  {/* {currentStep < steps.length ? (
    <button
      type="button"
      onClick={() => nextStep(formik)}
      className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
    >
      Next <ChevronRight size={18} />
    </button>
  ) : (
    <button
      type="submit"
      disabled={loading || !formik.isValid}
      className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
    >
      <Save size={18} /> Submit
    </button>
  )} */}



  {/* Next / Submit */}


{/* {isFinalBySurvey ? (
  <button
    type="submit"
    disabled={loading || !formik.isValid}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
  >
    <Save size={18} /> Submit
  </button>
) : currentStep < steps.length ? (
  <button
    type="button"
    onClick={() => nextStep(formik)}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
  >
    Next <ChevronRight size={18} />
  </button>
) : (
  <button
    type="submit"
    disabled={loading || !formik.isValid}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
  >
    <Save size={18} /> Submit
  </button>
)} */}


{/* Next / Submit */}
{isFinalBySurvey ? (
  <button
    type="button"
    onClick={() => handleSubmit(formik.values)}
    disabled={loading}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        Submitting...
      </>
    ) : (
      <><Save size={18} /> Submit</>
    )}
  </button>
) : currentStep < steps.length ? (
  <button
    type="button"
    onClick={() => nextStep(formik)}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
  >
    Next <ChevronRight size={18} />
  </button>
) : (
  <button
    type="button"
    onClick={() => handleSubmit(formik.values)}
    disabled={loading}
    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
  >
    {loading ? (
      <>
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        Submitting...
      </>
    ) : (
      <><Save size={18} /> Submit</>
    )}
  </button>
)}

</div>



              </Form>

)
            
}
            
            }
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ApplicationForm


// =====================================================

// import { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight, Save, Upload, Download, Plus, Minus, MapPin, Crosshair } from 'lucide-react'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import html2canvas from 'html2canvas'
// import jsPDF from 'jspdf'
// import isValidAadhaar from '../utils/aadhaarValidator';
// import clusterData from "../data/clusterdata.json";
// import wardsData from "../data/wardsData.json";
// import { saveDraftToDB } from "../utils/draftDB"
// import { getDraftById,updateDraftInDB } from "../utils/draftDB"
// import Webcam from "react-webcam";
// import { useRef } from "react"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"



// const API_BASE_URL = import.meta.env.VITE_BASE_URL;

// const getAuthToken = () => {
//   if (typeof window === "undefined") return null
//   return localStorage.getItem("authToken")
// }

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


// const validationSchemas = {
//   1: Yup.object({
//     // slum_id: Yup.string().required('Slum ID is required'),
//     // name_of_slum_area: Yup.string().required('Hut name is required'),
//     // municipal_corporation: Yup.string().required('Municipal Corporation is required'),
//     // ward: Yup.string().required('Ward is required'),
//     // district: Yup.string().required('District is required'),
//     // taluka: Yup.string().required('Taluka is required'),
//   }),
//   2: Yup.object({
//     first_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('First name is required'),
//     middle_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Middle name is required'),
//     last_name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed").required('Last name is required'),
//     gender: Yup.string().required('Gender is required'),
    
//       aadhaar_number: Yup.string(),
//       // .required('Aadhaar number is required')
//       // .test(
//       //   'is-valid-aadhaar',
//       //   'Enter a valid Aadhaar number',
//       //   (value) => isValidAadhaar(value)
//       // ),
//     aadhaar_mobile_number: Yup.string()
//     .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number')
//       .matches(/^[0-9]+$/, 'Only numbers are allowed') // ✅ फक्त numbers
//       .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
//       // .required('Mobile number is required'),
//     // user_email: Yup.string().email('Invalid email format'),
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
//     // voter_card_number: Yup.string()
//     //   .matches(/^[A-Z0-9]{10}$/, 'Voter card number must be exactly 10 digits'),


//     voter_card_number: Yup.string().when("voter_card_type", (type, schema) => {
//   if (type === "EPIC 10 Digit") {
//     return schema
//       .matches(/^[A-Z0-9]{10}$/, "Voter card number must be exactly 10 characters")
//       // .required("Voter card number is required");
//   }

//   if (type === "EPIC 14 Digit") {
//     return schema
//       .matches(/^[A-Z0-9]{14}$/, "Voter card number must be exactly 14 characters")
//       // .required("Voter card number is required");
//   }

//   return schema;
// })


//   }),
//   // 4: Yup.object({
//   //   residency_since: Yup.string()
//   //     .required('Residency since is required'),
//   // }),
// //   5: Yup.object({
// //     num_family_members: Yup.number()
// //       .min(1, 'At least 1 family member is required')
// //       .max(6, 'Maximum 6 family members allowed'),
// //       // .required('Number of family members is required'),
// //  family_member1_aadhaar: Yup.string()
// //       // .required('Aadhaar number is required')
// //       .test(
// //         'is-valid-aadhaar',
// //         'Enter a valid Aadhaar number',
// //         (value) => isValidAadhaar(value)
// //       ),
    


// //   }),
//   6: Yup.object({}),
//   7: Yup.object({}),
// }





// const base64ToFile = (base64, filename, mimeType) => {
//   const arr = base64.split(",");
//   const bstr = atob(arr[1]);
//   let n = bstr.length;
//   const u8arr = new Uint8Array(n);

//   while (n--) {
//     u8arr[n] = bstr.charCodeAt(n);
//   }

//   return new File([u8arr], filename, { type: mimeType });
// };


// const fileToBase64Object = (file) => {
//   return new Promise((resolve) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       resolve({
//         name: file.name,
//         type: file.type,
//         data: reader.result
//       });
//     };
//   });
// };

// const convertFilesToBase64 = async (filesObj) => {
//   const converted = {};

//   for (const key in filesObj) {
//     const file = filesObj[key];

//     if (Array.isArray(file)) {
//       converted[key] = await Promise.all(
//         file.map(f => fileToBase64Object(f))
//       );
//     } else if (file instanceof File) {
//       converted[key] = await fileToBase64Object(file);
//     }
//   }

//   return converted;
// };


// /* ─────────────────────────────────────────────────────────────────────────────
//    VIDEO RECORDING MODAL  (scrollable fix applied – nothing else changed)
// ───────────────────────────────────────────────────────────────────────────── */
// const VideoRecordingModal = ({ fieldName, onClose, onSave }) => {

//   const streamRef = useRef(null)
//   const mediaRecorderRef = useRef(null)

//     // preview stream (video only)
// const recordingStreamRef = useRef(null) // separate recording stream (video + audio)


 
//   const [stream, setStream] = useState(null)
//   const [mediaRecorder, setMediaRecorder] = useState(null)
//   const [isRecording, setIsRecording] = useState(false)
//   const [chunks, setChunks] = useState([])
//   const [recordedBlob, setRecordedBlob] = useState(null)
//   const [recordedUrl, setRecordedUrl] = useState(null)
//   const [errorMsg, setErrorMsg] = useState("")
//   const liveVideoRef = useRef(null)
//   const chunksRef = useRef([])

//   useEffect(() => {
//     startStream()
//     return () => {
//       stopStream()
//     }
//   }, [])


//   useEffect(() => {
//   initCamera()
//   return () => cleanupStream()
// }, [])

// // _________1
// // ─── Init camera preview (video only, no audio) ───────────────────────
// const initCamera = async () => {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "user", width: 1280, height: 720 },
//       audio: false
//     })
//     streamRef.current = stream
//     if (liveVideoRef.current) {
//       liveVideoRef.current.srcObject = stream
//     }
//   } catch (err) {
//     console.error("initCamera failed:", err)
//     setErrorMsg("Camera permission denied")
//   }
// }

// const cleanupStream = () => {
//   if (streamRef.current) {
//     streamRef.current.getTracks().forEach(t => t.stop())
//     streamRef.current = null
//   }
// }
//   const startStream = async () => {
//     try {
//       const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//       setStream(s)
//       if (liveVideoRef.current) {
//         liveVideoRef.current.srcObject = s
//       }
//     } catch (err) { 
//       setErrorMsg("Camera / Mic permission denied: " + err.message)
//     }
//   }

//   const stopStream = () => {
//     if (stream) stream.getTracks().forEach(t => t.stop())
//   }

//   // const startRecording = () => {
//   //   if (!stream) return
//   //   chunksRef.current = []
//   //   const recorder = new MediaRecorder(stream)
//   //   recorder.ondataavailable = (e) => {
//   //     if (e.data.size > 0) chunksRef.current.push(e.data)
//   //   }
//   //   recorder.onstop = () => {
//   //     const blob = new Blob(chunksRef.current, { type: "video/webm" })
//   //     const url = URL.createObjectURL(blob)
//   //     setRecordedBlob(blob)
//   //     setRecordedUrl(url)
//   //   }
//   //   recorder.start()
//   //   setMediaRecorder(recorder)
//   //   setIsRecording(true)
//   //   setRecordedBlob(null)
//   //   setRecordedUrl(null)
//   // }

//   // =================original

//   let previewStream = null;
// // // let mediaRecorder = null;
// // // let stream = null;

// //   const startRecording = () => {
// //   if (!stream) return
// //   chunksRef.current = []
// //   const recorder = new MediaRecorder(stream)
// //   recorder.ondataavailable = (e) => {
// //     if (e.data.size > 0) chunksRef.current.push(e.data)
// //   }
// //   recorder.onstop = () => {
// //     const blob = new Blob(chunksRef.current, { type: "video/webm" })
// //     const url = URL.createObjectURL(blob)
// //     setRecordedBlob(blob)
// //     setRecordedUrl(url)
// //   }
// //   recorder.start()
// //   setMediaRecorder(recorder)
// //   setIsRecording(true)
// //   setRecordedBlob(null)
// //   setRecordedUrl(null)

// //   // ✅ 15 seconds नंतर auto-stop
// //   setTimeout(() => {
// //     if (recorder.state === "recording") {
// //       recorder.stop()
// //       setIsRecording(false)
// //     }
// //   }, 15000)
// // }

// //   const stopRecording = () => {
// //     if (mediaRecorder && isRecording) {
// //       mediaRecorder.stop()
// //       setIsRecording(false)
// //     }
// //   }




// // ++++++++++
// // const startRecording = async () => {
// //   try {
// //     setErrorMsg("")
// //     setRecordedBlob(null)
// //     setRecordedUrl(null)

// //     // 🎤 get mic only
// //     const audioStream = await navigator.mediaDevices.getUserMedia({
// //       audio: true
// //     })

// //     audioStream.getAudioTracks().forEach(track => {
// //       streamRef.current.addTrack(track)
// //     })

// //     chunksRef.current = []

// //     const recorder = new MediaRecorder(streamRef.current)
// //     recorder.ondataavailable = e => {
// //       if (e.data.size > 0) chunksRef.current.push(e.data)
// //     }

// //     recorder.onstop = () => {
// //       const blob = new Blob(chunksRef.current, { type: "video/webm" })
// //       setRecordedBlob(blob)
// //       setRecordedUrl(URL.createObjectURL(blob))
// //     }

// //     recorder.start()
// //     mediaRecorderRef.current = recorder
// //     setIsRecording(true)

// //   } catch (err) {
// //     console.error(err)
// //     setErrorMsg("Camera / Mic permission denied")
// //   }
// // }


// // const startRecording = async () => {
// //   try {
// //     setErrorMsg("")
// //     setRecordedBlob(null)
// //     setRecordedUrl(null)

// //     // Always acquire a FRESH combined stream for recording
// //     // Never reuse or mutate the preview stream
// //     const recordingStream = await navigator.mediaDevices.getUserMedia({
// //       video: { facingMode: "user", width: 1280, height: 720 },
// //       audio: {
// //         echoCancellation: false,  // reduces extra audio handles on WebView
// //         noiseSuppression: false,
// //         autoGainControl: false
// //       }
// //     })

// //     recordingStreamRef.current = recordingStream

// //     // Keep preview stream pointing to original video-only stream
// //     // (no mutation)

// //     chunksRef.current = []

// //     // Prefer mp4 on Android WebView, webm on desktop
// //     const mimeType = MediaRecorder.isTypeSupported("video/mp4")
// //       ? "video/mp4"
// //       : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
// //       ? "video/webm;codecs=vp8,opus"
// //       : "video/webm"

// //     const recorder = new MediaRecorder(recordingStream, { mimeType })

// //     recorder.ondataavailable = e => {
// //       if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
// //     }

// //     recorder.onstop = () => {
// //       const blob = new Blob(chunksRef.current, { type: mimeType })
// //       setRecordedBlob(blob)
// //       setRecordedUrl(URL.createObjectURL(blob))
// //       // Release recording stream tracks immediately after stop
// //       releaseRecordingStream()
// //     }

// //     recorder.start(100) // timeslice 100ms — more reliable on WebView than no timeslice
// //     mediaRecorderRef.current = recorder
// //     setIsRecording(true)

// //   } catch (err) {
// //     console.error("startRecording failed:", err)
// //     releaseRecordingStream() // clean up if partial init happened
// //     setErrorMsg("Camera / Mic permission denied: " + err.message)
// //   }
// // }



// const startRecording = async () => {
//   try {
//     setErrorMsg("")
//     setRecordedBlob(null)
//     setRecordedUrl(null)

//     const recordingStream = await navigator.mediaDevices.getUserMedia({
//       video: { facingMode: "user", width: 1280, height: 720 },
//       audio: {
//         echoCancellation: false,
//         noiseSuppression: false,
//         autoGainControl: false
//       }
//     })

//     recordingStreamRef.current = recordingStream
//     chunksRef.current = []

//     const mimeType = MediaRecorder.isTypeSupported("video/mp4")
//       ? "video/mp4"
//       : MediaRecorder.isTypeSupported("video/webm;codecs=vp8,opus")
//       ? "video/webm;codecs=vp8,opus"
//       : "video/webm"

//     const recorder = new MediaRecorder(recordingStream, { mimeType })

//     recorder.ondataavailable = e => {
//       if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
//     }

//     recorder.onstop = () => {
//       const blob = new Blob(chunksRef.current, { type: mimeType })
//       setRecordedBlob(blob)
//       setRecordedUrl(URL.createObjectURL(blob))
//       releaseRecordingStream()
//     }

//     recorder.start(100)
//     mediaRecorderRef.current = recorder
//     setIsRecording(true)

//     // ✅ 15 seconds auto stop (added only this)
//     setTimeout(() => {
//       if (recorder && recorder.state === "recording") {
//         recorder.stop()
//         setIsRecording(false)
//       }
//     }, 15000)

//   } catch (err) {
//     console.error("startRecording failed:", err)
//     releaseRecordingStream()
//     setErrorMsg("Camera / Mic permission denied: " + err.message)
//   }
// }



// // ─── Stop recording ───────────────────────────────────────────────────
// const stopRecording = () => {
//   const recorder = mediaRecorderRef.current
//   if (recorder && recorder.state !== "inactive") {
//     recorder.stop() // onstop handler will call releaseRecordingStream
//   }
//   mediaRecorderRef.current = null
//   setIsRecording(false)
// }

// // ─── Release ONLY the recording stream ───────────────────────────────
// const releaseRecordingStream = () => {
//   if (recordingStreamRef.current) {
//     recordingStreamRef.current.getTracks().forEach(track => {
//       track.enabled = false
//       track.stop()
//     })
//     recordingStreamRef.current = null
//   }
// }

// // ─── Full cleanup on unmount ──────────────────────────────────────────
// const cleanupAll = () => {
//   releaseRecordingStream()
//   if (streamRef.current) {
//     streamRef.current.getTracks().forEach(t => t.stop())
//     streamRef.current = null
//   }
// }

// // ─── Single useEffect — remove the duplicate ─────────────────────────
// useEffect(() => {
//   initCamera()
//   return () => cleanupAll()
// }, [])







//   const handleSave = () => {
//     if (!recordedBlob) return
//     const file = new File([recordedBlob], `${fieldName}_${Date.now()}.webm`, { type: "video/webm" })
//     onSave(file)
//     stopStream()
//     onClose()
//   }

//   const handleClose = () => {
//     if (isRecording) stopRecording()
//     stopStream()
//     onClose()
//   }

//   return (
//     /* Overlay */
//     <div
//       style={{
//         position: "fixed", inset: 0, zIndex: 9999,
//         background: "rgba(0,0,0,0.75)",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         padding: "16px",
//       }}
//       onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
//     >
//       {/* ── Modal box – NOW SCROLLABLE ── */}
//       <div
//         style={{
//           background: "#fff",
//           borderRadius: 16,
//           width: "min(520px, 95vw)",
//           maxHeight: "90vh",      /* ✅ limit height to viewport */
//           overflowY: "auto",      /* ✅ scroll when content overflows */
//           boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* ── Sticky header so close button is always visible ── */}
//         <div
//           style={{
//             position: "sticky", top: 0, zIndex: 1,
//             background: "#fff",
//             borderBottom: "1px solid #e2e8f0",
//             padding: "20px 24px 16px",
//             display: "flex", justifyContent: "space-between", alignItems: "center",
//             flexShrink: 0,
//           }}
//         >
//           <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#1e293b" }}>
//             🎥 Video Recording
//           </h3>
//           <button
//             onClick={handleClose}
//             style={{
//               background: "#fee2e2", border: "none", borderRadius: 8,
//               width: 36, height: 36, cursor: "pointer",
//               fontSize: 18, color: "#dc2626",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               flexShrink: 0,
//             }}
//           >✕</button>
//         </div>

//         {/* ── Scrollable body ── */}
//         <div style={{ padding: "20px 24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

//           {errorMsg && (
//             <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>
//               {errorMsg}
//             </div>
//           )}

//           {/* Live preview */}
//           <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#000" }}>
//             <video
//               ref={liveVideoRef}
//               autoPlay
//               muted
//               playsInline
//               style={{ width: "100%", display: "block", maxHeight: 260, objectFit: "cover" }}
//             />
//             {isRecording && (
//               <div style={{
//                 position: "absolute", top: 12, right: 12,
//                 background: "#dc2626", color: "#fff",
//                 padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700,
//                 display: "flex", alignItems: "center", gap: 6
//               }}>
//                 <span style={{
//                   width: 8, height: 8, background: "#fff", borderRadius: "50%",
//                   display: "inline-block",
//                   animation: "pulse 1s infinite"
//                 }} />
//                 REC
//               </div>
//             )}
//           </div>

//           {/* Recorded preview */}
//           {recordedUrl && !isRecording && (
//             <div>
//               <p style={{ fontSize: 13, color: "#475569", marginBottom: 6, fontWeight: 600 }}>📽 Preview (recorded)</p>
//               <video
//                 src={recordedUrl}
//                 controls
//                 style={{ width: "100%", borderRadius: 10, border: "2px solid #bbf7d0", background: "#000" }}
//               />
//             </div>
//           )}

//           {/* ── Action buttons – always reachable via scroll ── */}
//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//             {!isRecording ? (
//               <button
//                 onClick={startRecording}
//                 disabled={!!errorMsg}
//                 style={{
//                   flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
//                   background: errorMsg ? "#e2e8f0" : "linear-gradient(135deg,#dc2626,#b91c1c)",
//                   color: "#fff", fontWeight: 700, fontSize: 15,
//                   cursor: errorMsg ? "not-allowed" : "pointer",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   minHeight: 48,
//                 }}
//               >
//                 ⏺ Start Recording
//               </button>
//             ) : (
//               <button
//                 onClick={stopRecording}
//                 style={{
//                   flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
//                   background: "linear-gradient(135deg,#f59e0b,#d97706)",
//                   color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   minHeight: 48,
//                 }}
//               >
//                 ⏹ Stop Recording
//               </button>
//             )}

//             {recordedBlob && !isRecording && (
//               <button
//                 onClick={handleSave}
//                 style={{
//                   flex: 1, padding: "11px 0", borderRadius: 10, border: "none",
//                   background: "linear-gradient(135deg,#16a34a,#15803d)",
//                   color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
//                   display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
//                   minHeight: 48,
//                 }}
//               >
//                 💾 Save Video
//               </button>
//             )}

//             <button
//               onClick={handleClose}
//               style={{
//                 padding: "11px 20px", borderRadius: 10, border: "2px solid #e2e8f0",
//                 background: "#fff", color: "#64748b", fontWeight: 600, fontSize: 15,
//                 cursor: "pointer", minHeight: 48,
//               }}
//             >
//               Cancel
//             </button>
//           </div>

//         </div>{/* end scrollable body */}

//         {/* pulse animation */}
//         <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
//       </div>
//     </div>
//   )
// }


// const ApplicationForm = ({ onClose, onSuccess,draftId  }) => {
//   const [currentStep, setCurrentStep] = useState(1)
//   const [files, setFiles] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   const [generatingPdfs, setGeneratingPdfs] = useState(false)
//   const [displayedMembers, setDisplayedMembers] = useState(1)
//   const [fetchingLocation, setFetchingLocation] = useState(false)
//   const [locationFetched, setLocationFetched] = useState(false)
//   const [selectedCluster, setSelectedCluster] = useState("")
//   const [slums, setSlums] = useState([])
//   const [huts, setHuts] = useState([])
//   const [selectedSlum, setSelectedSlum] = useState("")
//   const [clusters, setClusters] = useState([])
//   const [loadedDraft, setLoadedDraft] = useState(null)
// const [activeCamera, setActiveCamera] = useState(null)
// const webcamRef = useRef(null)

// const [recordingField, setRecordingField] = useState(null)
// const videoRefs = useRef({})

// // ── NEW: which field has the video modal open ──
// const [videoModalField, setVideoModalField] = useState(null)


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

//   useEffect(() => {
//     fetchClusters()
//     fetchSlums()
//   }, [])

//   useEffect(() => {
//   if (draftId) {
//     loadDraft()
//   }
// }, [draftId]) 



// const loadDraft = async () => {
//   const draft = await getDraftById(Number(draftId))

//   if (draft) {
//   setLoadedDraft(draft);

//   const restoredFiles = {};

//   Object.keys(draft.fileData || {}).forEach((key) => {
//     const fileObj = draft.fileData[key];

//     if (fileObj?.data) {
//       restoredFiles[key] = base64ToFile(
//         fileObj.data,
//         fileObj.name,
//         fileObj.type
//       );
//     }
//   });

//   setFiles(restoredFiles);
// }


// }


//   const fetchClusterDetails = async (cluster_number, formik) => {
//     if (!cluster_number) return
//     const token = getAuthToken()
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/clusters/${cluster_number}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       if (!response.ok) throw new Error("Failed to fetch cluster details")
//       const data = await response.json()

//       formik.setFieldValue("district", data.district || "")
//       formik.setFieldValue("taluka", data.taluka || "")
//       formik.setFieldValue("ward", data.ward || "")
//       formik.setFieldValue("municipal_corporation", data.municipal_corporation || "BMC")
//     } catch (err) {
//       console.error("Error fetching cluster details:", err)
//     }
//   }


//   const fetchSlums = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setError("Please login to view slums")
//       return
//     }

//     try {
//       setLoading(true)
//       const response = await fetch(`${API_BASE_URL}/api/slums/all`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       if (!response.ok) throw new Error("Failed to fetch slums")
//       const data = await response.json()
//       setSlums(data || [])
//     } catch (err) {
//       console.error("Error fetching slums:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchClusters = async () => {
//     const token = getAuthToken()
//     if (!token) {
//       setError("Please login to view clusters")
//       return
//     }

//     try {
//       setLoading(true)
//       const response = await fetch(`${API_BASE_URL}/api/clusters/all`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       if (!response.ok) throw new Error("Failed to fetch clusters")
//       const data = await response.json()
//       setClusters(data || [])
//     } catch (err) {
//       console.error("Error fetching clusters:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }


// const handleSaveDraft = async (values) => {
//   try {
//     const draftData = {
//       ...values,
//       _currentStep: currentStep
//     }

//     const base64Files = await convertFilesToBase64(files)

//     if (draftId) {
//       await updateDraftInDB(
//         Number(draftId),
//         draftData,
//         base64Files
//       )
//     } else {
//       await saveDraftToDB(
//         draftData,
//         base64Files
//       )
//     }

//     setSuccess("Draft saved successfully ✅")

//   } catch (err) {
//     setError("Draft save failed")
//   }
// }


//   const handleClusterChange = (e, form) => {
//     const cluster = e.target.value
//     setSelectedCluster(cluster)
//     form.setFieldValue("cluster_number", cluster)
//     fetchClusterDetails(cluster, form)

//     const selectedClusterData = clusterData.find(c => c.cluster_number === cluster)
//     setSlums(selectedClusterData ? selectedClusterData.slums : [])
//     setHuts([])
//     form.setFieldValue("slum_id", "")
//     form.setFieldValue("hut_name", "")
//   }




// const capturePhoto = async (fieldName) => {
//   const imageSrc = webcamRef.current?.getScreenshot()
//   if (!imageSrc) return

//   const blob = await (await fetch(imageSrc)).blob()
//   const file = new File([blob], `${fieldName}_${Date.now()}.jpg`, {
//     type: "image/jpeg"
//   })

//   const multipleFields = [
//     "sale_agreement",
//     "after_2000_proof_submitted",
//     "doc_before_2000"
//   ]

//   setFiles(prev => {
//     if (multipleFields.includes(fieldName)) {
//       const existing = prev[fieldName]
//       let safeArray = []
//       if (Array.isArray(existing)) {
//         safeArray = existing
//       } else if (existing instanceof File) {
//         safeArray = [existing]
//       }
//       return {
//         ...prev,
//         [fieldName]: [...safeArray, file]
//       }
//     }
//     return {
//       ...prev,
//       [fieldName]: file
//     }
//   })

//   setActiveCamera(null)
// }

//   const handleSlumChange = (e, form) => {
//   const slumId = e.target.value
//   setSelectedSlum(slumId)
  
//   const selectedSlumData = slums.find(s => s.slum_id === slumId)
  
//   if (selectedSlumData) {
//     form.setFieldValue("slum_id", slumId)
//     form.setFieldValue("slum_name", selectedSlumData.slum_name || "")
//     form.setFieldValue("name_of_slum_area", selectedSlumData.slum_address || selectedSlumData.name_of_slum_area || "")
//   } else {
//     form.setFieldValue("slum_id", "")
//     form.setFieldValue("slum_name", "")
//     form.setFieldValue("name_of_slum_area", "")
//   }
  
//   setHuts(selectedSlumData ? selectedSlumData.huts : [])
//   form.setFieldValue("hut_name", "")
// }

//   const initialValues = {
//     hut_id: '', hut_name: '', slum_id: '',slum_name:'',name_of_slum_area: '',
//     municipal_corporation: "BMC", ward: '', district: '', taluka: '', village: '',
//     cluster_number: '', slum_use: '', slum_floor: '', ownership_of_slum_land: '',
//     survey_status: '', plan_submitted: false, society_registered: false,
//     first_name: '', middle_name: '', last_name: '', gender: '', spouse_name: '',
//     user_email: '', aadhaar_number: '', aadhaar_mobile_number: '',
//     aadhaar_address: '', aadhaar_pincode: '', current_address: '', current_pincode: '',
//     current_mobile_number: '', voter_card_type: '', voter_card_number: '',
//     biometric_lat: '', biometric_long: '',
//     bank_name: '', account_number: '', ifsc_code: '',
//     length: '', width: '', area_sq_m: '', residency_since:null,
//     num_family_members: 1,
//     family_member1_name: '', family_member1_age: '', family_member1_relation: '', family_member1_gender: '', family_member1_aadhaar: '',
//     family_member2_name: '', family_member2_age: '', family_member2_relation: '', family_member2_gender: '', family_member2_aadhaar: '',
//     family_member3_name: '', family_member3_age: '', family_member3_relation: '', family_member3_gender: '', family_member3_aadhaar: '',
//     family_member4_name: '', family_member4_age: '', family_member4_relation: '', family_member4_gender: '', family_member4_aadhaar: '',
//     family_member5_name: '', family_member5_age: '', family_member5_relation: '', family_member5_gender: '', family_member5_aadhaar: '',
//     family_member6_name: '', family_member6_age: '', family_member6_relation: '', family_member6_gender: '', family_member6_aadhaar: '',
//     self_declaration_letter: false, submitted_docs_before_2000: false,
//     doc_before_2000:[], after_2000_proof_submitted:[],
//     timestamp: '', created_date: '', submittedBy: '', sale_agreement: [],
//     doc_front_view: null,
//     biometric:null,
//     same_as_aadhaar: false,
//     same_pincode_as_aadhaar: false,
//   }

//   const steps = [
//     { id: 1, title: 'Basic Information', icon: 'Building' },
//     { id: 2, title: 'Owner Details', icon: 'User' },
//     { id: 3, title: 'Address Contact', icon: 'MapPin' },
//     { id: 4, title: 'Bank and Slum Details', icon: 'Bank' },
//     { id: 5, title: 'Family Members', icon: 'Users' },
//     { id: 6, title: 'Images', icon: 'Camera' },
//     { id: 7, title: 'Metadata', icon: 'FileText' }
//   ]

  

// // ── REPLACED startVideoRecording – now just opens the modal ──
// const startVideoRecording = (fieldName) => {
//   setVideoModalField(fieldName)
// }

// // ── Called by VideoRecordingModal when user clicks Save ──

// // const handleVideoSave = (file) => {
// //   const fieldName = videoModalField
// //   setFiles(prev => ({
// //     ...prev,
// //     [fieldName]: file
// //   }))
// //   setVideoModalField(null)
// // }

// // ── Called by VideoRecordingModal when user clicks Save ──
// const handleVideoSave = (file) => {
//   const fieldName = videoModalField

//   // ✅ Allowed video types
//   const allowedVideoTypes = ['video/mp4', 'video/webm']

//   if (!allowedVideoTypes.includes(file.type)) {
//     alert(`"${file.name}" - हा video type allowed नाही.\nफक्त MP4, WEBM videos allowed आहेत.`)
//     return
//   }

//   setFiles(prev => ({
//     ...prev,
//     [fieldName]: file
//   }))
//   setVideoModalField(null)
// }

// // const handleFileChange = (e) => {
// //   const { name, files: selectedFiles } = e.target

// //   if (!selectedFiles || selectedFiles.length === 0) return

// //   const multipleFields = [
// //     "sale_agreement",
// //     "after_2000_proof_submitted",
// //     "doc_before_2000",
// //     "biometric"
// //   ]

// //   if (multipleFields.includes(name)) {
// //     setFiles(prev => ({
// //       ...prev,
// //       [name]: [
// //         ...(prev[name] || []),
// //         ...Array.from(selectedFiles)
// //       ]
// //     }))
// //   } else {
// //     setFiles(prev => ({
// //       ...prev,
// //       [name]: selectedFiles[0]
// //     }))
// //   }
// // }

// const handleFileChange = (e) => {
//   const { name, files: selectedFiles } = e.target

//   if (!selectedFiles || selectedFiles.length === 0) return

//   // ✅ Allowed file types
//   const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'video/mp4', 'video/webm']

//   const validFiles = Array.from(selectedFiles).filter(file => {
//     if (!allowedTypes.includes(file.type)) {
//       alert(`"${file.name}" - हा file type allowed नाही.\nफक्त PNG, JPG, JPEG, PDF, MP4, WEBM files upload करा.`)
//       return false
//     }
//     return true
//   })

//   if (validFiles.length === 0) return

//   const multipleFields = [
//     "sale_agreement",
//     "after_2000_proof_submitted",
//     "doc_before_2000",
//     "biometric"
//   ]

//   if (multipleFields.includes(name)) {
//     setFiles(prev => ({
//       ...prev,
//       [name]: [
//         ...(prev[name] || []),
//         ...validFiles
//       ]
//     }))
//   } else {
//     setFiles(prev => ({
//       ...prev,
//       [name]: validFiles[0]
//     }))
//   }
// }

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
//         setLocationFetched(true)
//         setSuccess(`Location fetched: Lat: ${latitude}, Long: ${longitude}`)
//         setFetchingLocation(false)
//         setTimeout(() => setSuccess(null), 3000)
//       },
//       (error) => {
//         let errorMessage = "Unable to retrieve your location."
//         switch (error.code) {
//           case error.PERMISSION_DENIED: errorMessage = "Location access denied."; break
//           case error.POSITION_UNAVAILABLE: errorMessage = "Location unavailable."; break
//           case error.TIMEOUT: errorMessage = "Location request timed out."; break
//         }
//         setError(errorMessage)
//         setFetchingLocation(false)
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
//     )
//   }

//   const autoFetchLocation = (formik) => {
//     if (!locationFetched && !fetchingLocation) {
//       fetchCurrentLocation(formik)
//     }
//   }

//   const nextStep = (formik) => {
//     const currentSchema = validationSchemas[currentStep]
//     if (currentSchema) {
//       formik.validateForm().then(errors => {
//         if (Object.keys(errors).length === 0 && currentStep < steps.length) {
//           setCurrentStep(currentStep + 1)
//           if (currentStep + 1 === 3) setTimeout(() => autoFetchLocation(formik), 500)
//         }
//       })
//     } else {
//       if (currentStep < steps.length) {
//         setCurrentStep(currentStep + 1)
//         if (currentStep + 1 === 3) setTimeout(() => autoFetchLocation(formik), 500)
//       }
//     }
//   }

//   const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1)

//   const addMember = () => displayedMembers < 6 && setDisplayedMembers(displayedMembers + 1)
//   const removeMember = () => displayedMembers > 1 && setDisplayedMembers(displayedMembers - 1)

//   const handleSubmit = async (values) => {
//       setLoading(true); setError(null); setSuccess(null)

//     try {
//       const token = getAuthToken()
//       if (!token) throw new Error("No authentication token found")

//       let currentUser = getUser()
//       console.log("dndndndndndn",currentUser)
//       if (!currentUser) currentUser = await fetchAndSetUserProfile()

//       const formDataToSend = new FormData()
//        const {
//       same_as_aadhaar,
//       same_pincode_as_aadhaar,
//       residency_since,
//       ...cleanValues
//     } = values

// let formattedResidency = ""

// if (residency_since instanceof Date) {
//   formattedResidency = `${String(residency_since.getDate()).padStart(2, "0")}-${String(
//     residency_since.getMonth() + 1
//   ).padStart(2, "0")}-${residency_since.getFullYear()}`
// }

//       const updatedValues = {...cleanValues,residency_since: formattedResidency,submittedBy:user_id || "N/A" }

//       Object.keys(updatedValues).forEach(key => {
//         if (updatedValues[key] !== null && updatedValues[key] !== undefined && updatedValues[key] !== '') {
//           formDataToSend.append(key, updatedValues[key])
//         }
//       })

//       Object.keys(files).forEach(key => {
//   if (files[key]) {
//     if (Array.isArray(files[key])) {
//       files[key].forEach(file => {
//         if (file instanceof File) {
//           formDataToSend.append(key, file);
//         }
//       });
//     } else {
//       if (files[key] instanceof File) {
//         formDataToSend.append(key, files[key]);
//       }
//     }
//   }
// });


//       const response = await fetch(`${API_BASE_URL}/api/sra-logs/submit-log`, {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formDataToSend
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//       }

//       setSuccess("Application submitted successfully!")
//       setTimeout(() => onSuccess?.(), 3000)
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
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">क्लस्टर क्रमांक *</label>
//                 <select
//                   name="cluster_number"
//                   onChange={(e) => {
//                     formik.handleChange(e)
//                     const selected = e.target.value
//                     setSelectedCluster(selected)
//                     fetchClusterDetails(selected, formik)
//                   }}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.cluster_number}
//                   className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300"
//                 >
//                   <option value="">Select Cluster</option>
//                   {clusters.map((cluster) => (
//                     <option key={cluster.cluster_number} value={cluster.cluster_number}>
//                       {cluster.cluster_number} - {cluster.cluster_name}
//                     </option>
//                   ))}
//                 </select>
//                 <ErrorMessage name="cluster_number" component="div" className="text-red-500 text-sm mt-1" />
//               </div>

//               <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">सेक्टर क्रमांक *</label>
//   <select
//     name="slum_id"
//     onChange={(e) => handleSlumChange(e, formik)}
//     onBlur={formik.handleBlur}
//     value={formik.values.slum_id}
//     disabled={!formik.values.cluster_number}
//     className={`w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-300 ${!formik.values.cluster_number ? "bg-gray-100 cursor-not-allowed" : ""}`}
//   >
//     <option value="">
//       {formik.values.cluster_number ? "सेक्टर क्रमांक निवडा" : "प्रथम क्लस्टर निवडा"}
//     </option>
//     {slums
//       .filter((slum) => slum.cluster_number === formik.values.cluster_number)
//       .map((slum) => (
//         <option key={slum.slum_id} value={slum.slum_id}>
//           {slum.slum_id}
//         </option>
//       ))}
//   </select>
//   <ErrorMessage name="slum_id" component="div" className="text-red-500 text-sm mt-1" />
// </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">झोपडपट्टीचे नाव *</label>
//   <Field
//     type="text"
//     name="slum_name"
//     readOnly
//     className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
//   />
//   <ErrorMessage name="slum_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
// </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">महानगरपालिकेचे नाव *</label>
//                 <Field
//                   type="text"
//                   name="municipal_corporation"
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">प्रभाग *</label>
//                 <Field
//                   type="text"
//                   name="ward"
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">जिल्हा *</label>
//                 <Field
//                   type="text"
//                   name="district"
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">तालुका *</label>
//                 <Field
//                   type="text"
//                   name="taluka"
//                   readOnly
//                   className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">गाव *</label>
//                 <Field
//                   type="text"
//                   name="village"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडी क्रमांक *</label>
//                 <Field
//                   type="text"
//                   name="hut_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//                 <ErrorMessage name="hut_id" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा मजला *</label>
//                 <Field
//                   as="select"
//                   name="slum_floor"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीचा वापर *</label>
//                 <Field
//                   as="select"
//                   name="slum_use"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">झोपडीचा वापर निवडा</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Combine">Combine</option>
//                   <option value="Social">Social</option>
//                   <option value="Devotional">Devotional</option>
//                   <option value="Educational">Educational</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">झोपडीच्या जमिनीचे मालकी हक्क *</label>
//                 <Field
//                   as="select"
//                   name="ownership_of_slum_land"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">झोपडीच्या जमिनीचे मालकी हक्क निवडा</option>
//                   <option value="State Government">State Government</option>
//                   <option value="Central Government">Central Government</option>
//                   <option value="Municipal Corporation">Municipal Corporation</option>
//                   <option value="Mhada">Mhada</option>
//                   <option value="SRA">SRA</option>
//                   <option value="Private">Private</option>
//                 </Field>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सर्वेक्षण स्थिती निवडा *</label>
//                 <Field
//                   as="select"
//                   name="survey_status"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">सर्वेक्षण स्थिती</option>
//                   <option value="Hut Appose">Hut Appose</option>
//                   <option value="Hut Denied">Hut Denied</option>
//                    <option value="readytosurvey">Ready To Survey</option>
//                 </Field>
//               </div>
//             </div>

//             {formik.values.survey_status !== "Hut Appose" &&
//  formik.values.survey_status !== "Hut Denied" && (

//   <div className="grid md:grid-cols-2 gap-6">
//     <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//       <Field
//         type="checkbox"
//         name="plan_submitted"
//         className="h-5 w-5 text-blue-600"
//       />
//       <label className="text-sm font-medium text-gray-700">
//         योजना सादर केली आहे का?
//       </label>
//     </div>

//     <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
//       <Field
//         type="checkbox"
//         name="society_registered"
//         className="h-5 w-5 text-blue-600"
//       />
//       <label className="text-sm font-medium text-gray-700">
//         सोसायटी नियोजित आहे का?
//       </label>
//     </div>
//   </div>

// )}
//           </div>
//         )

//       case 2:
//         return (
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-6">Owner Details</h3>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">नाव *</label>
//                 <Field type="text" name="first_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 <ErrorMessage name="first_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">मधले नाव *</label>
//                 <Field type="text" name="middle_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आडनाव *</label>
//                 <Field type="text" name="last_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 <ErrorMessage name="last_name" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">लिंग *</label>
//                 <Field as="select" name="gender" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                   <option value="">लिंग निवडा</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </Field>
//                 <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार क्रमांक (१२ अंक) *</label>
//                 <Field type="text" name="aadhaar_number" maxLength="12" placeholder="123456789012" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 <ErrorMessage name="aadhaar_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार मोबाइल क्रमांक (१० अंक) *</label>
//                 <Field type="tel" name="aadhaar_mobile_number" maxLength="10" placeholder="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 <ErrorMessage name="aadhaar_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">पत्नीचे / पतीचे नाव *</label>
//                 <Field type="text" name="spouse_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">वापरकर्त्याचा ईमेल *</label>
//                 <Field type="email" name="user_email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
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
//                 <label className="block text-sm font-medium text-gray-700 mb-2">आधार पत्ता *</label>
//                 <Field as="textarea" name="aadhaar_address" rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>
         
// <div>
// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     सध्याचा पत्ता *
//   </label>
//   <Field
//     as="textarea"
//     name="current_address"
//     rows="3"
//     readOnly={formik.values.same_as_aadhaar}
//     className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${
//       formik.values.same_as_aadhaar
//         ? "bg-gray-100 cursor-not-allowed"
//         : ""
//     }`}
//   />
//   <ErrorMessage
//     name="current_address"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />
// </div>

// <div className="flex items-center mb-3">
//   <Field
//     type="checkbox"
//     name="same_as_aadhaar"
//     checked={formik.values.same_as_aadhaar}
//     onChange={(e) => {
//       const checked = e.target.checked
//       formik.setFieldValue("same_as_aadhaar", checked)
//       if (checked) {
//         formik.setFieldValue("current_address", formik.values.aadhaar_address)
//       } else {
//         formik.setFieldValue("current_address", "")
//       }
//     }}
//     className="h-4 w-4 text-blue-600"
//   />
//   <label className="ml-2 text-sm text-gray-700">
//     आधार पत्ता आणि सध्याचा पत्ता एकच आहे
//   </label>
// </div>

// </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     आधार पिनकोड (६ अंक) *
//   </label>
//   <Field
//     type="text"
//     name="aadhaar_pincode"
//     maxLength="6"
//     placeholder="400001"
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//   />
//   <ErrorMessage
//     name="aadhaar_pincode"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />
// </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     सध्याचा पिनकोड (६ अंक) *
//   </label>

//   <Field
//     type="text"
//     name="current_pincode"
//     maxLength="6"
//     placeholder="400001"
//     readOnly={formik.values.same_pincode_as_aadhaar}
//     className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 ${
//       formik.values.same_pincode_as_aadhaar
//         ? "bg-gray-100 cursor-not-allowed"
//         : ""
//     }`}
//   />

//   <div className="flex items-center mt-2">
//     <input
//       type="checkbox"
//       checked={formik.values.same_pincode_as_aadhaar}
//       onChange={(e) => {
//         const checked = e.target.checked
//         formik.setFieldValue("same_pincode_as_aadhaar", checked)
//         if (checked) {
//           formik.setFieldValue("current_pincode", formik.values.aadhaar_pincode)
//         } else {
//           formik.setFieldValue("current_pincode", "")
//         }
//       }}
//       className="h-4 w-4 text-blue-600"
//     />
//     <label className="ml-2 text-sm text-gray-700">
//       आधार पिनकोड आणि सध्याचा पिनकोड एकच आहे
//     </label>
//   </div>

//   <ErrorMessage
//     name="current_pincode"
//     component="div"
//     className="text-red-500 text-sm mt-1 font-medium"
//   />
// </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">सध्याचा मोबाइल क्रमांक (१० अंक) *</label>
//                 <Field type="tel" name="current_mobile_number" maxLength="10" placeholder="9876543210" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 <ErrorMessage name="current_mobile_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//               </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     मतदार ओळखपत्राचा प्रकार *
//   </label>
//   <Field
//     as="select"
//     name="voter_card_type"
//     onChange={(e) => {
//       formik.handleChange(e)
//       formik.setFieldValue("voter_card_number", "")
//     }}
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//   >
//     <option value="">मतदार ओळखपत्राचा प्रकार निवडा</option>
//     <option value="EPIC 10 Digit">EPIC 10 Digit</option>
//     <option value="EPIC 14 Digit">EPIC 14 Digit</option>
//   </Field>
// </div>

// {formik.values.voter_card_type && (
//   <div>
//     <label className="block text-sm font-medium text-gray-700 mb-2">
//       मतदार ओळख क्रमांक (
//       {formik.values.voter_card_type === "EPIC 10 Digit" ? "१०" : "१४"} अंक) *
//     </label>
//     <Field name="voter_card_number">
//       {({ field }) => (
//         <input
//           {...field}
//           type="text"
//           maxLength={formik.values.voter_card_type === "EPIC 10 Digit" ? 10 : 14}
//           placeholder={formik.values.voter_card_type === "EPIC 10 Digit" ? "ABC1234567" : "ABC12345678901"}
//           onChange={(e) => {
//             const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
//             formik.setFieldValue("voter_card_number", value)
//           }}
//           className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//         />
//       )}
//     </Field>
//     <ErrorMessage name="voter_card_number" component="div" className="text-red-500 text-sm mt-1 font-medium" />
//   </div>
// )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> अक्षांश *</label>
//                 <Field type="text" name="biometric_lat" placeholder="19.0760" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline w-4 h-4 mr-1" /> रेखांश *</label>
//                 <Field type="text" name="biometric_long" placeholder="72.8777" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//               </div>
//             </div>

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
//                     fetchingLocation ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg'
//                   } text-white`}
//                 >
//                   {fetchingLocation ? (
//                     <>Fetching...</>
//                   ) : (
//                     <><Crosshair size={20} /> Get Current Location</>
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
            
//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 flex items-center justify-center mr-3"><span className="text-white font-bold">🏦</span></div>
//                 बँकेची माहिती
//               </h4>
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">बँकेचे नाव </label>
//                   <Field type="text" name="bank_name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">खाते क्रमांक </label>
//                   <Field type="text" name="account_number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">IFSC कोड </label>
//                   <Field type="text" name="ifsc_code" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
//               <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
//                 <div className="w-8 h-8 flex items-center justify-center mr-3">🏘️</div>
//                 झोपडपट्टीची माहिती
//               </h4>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">लांबी (मीटर) *</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="length"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">रुंदी (मीटर) *</label>
//                   <Field
//                     type="number"
//                     step="0.1"
//                     name="width"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">क्षेत्रफळ (चौ. मी.)</label>
//                   <Field
//                     type="number"
//                     step="0.01"
//                     name="area_sq_m"
//                     readOnly
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//                     placeholder="Auto-calculated"
//                   />
//                 </div>

// <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     राहणीमान सुरु पासून *
//   </label>

//   <DatePicker
//     selected={formik.values.residency_since}
//     onChange={(date) => {
//       formik.setFieldValue("residency_since", date)
//     }}
//     dateFormat="dd-MM-yyyy"
//     placeholderText="dd-mm-yyyy"
//     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//     showMonthDropdown
//     showYearDropdown
//     dropdownMode="select"
//     isClearable
//   />

//   {formik.values.residency_since && (
//     <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-200">
//       <p className="text-xs font-medium">
//         {formik.values.residency_since <= new Date(2000, 0, 1) ? (
//           <span className="text-green-600">
//             01-01-2000 किंवा त्याआधी - Jodpatra-3 तयार होईल
//           </span>
//         ) : (
//           <span className="text-blue-600">
//             01-01-2000 नंतर - Jodpatra-4 तयार होईल
//           </span>
//         )}
//       </p>
//     </div>
//   )}
// </div>

//               </div>
//             </div>
//           </div>
//         )

//       case 5:
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
//                   const value = parseInt(e.target.value)
//                   if (value >= 1 && value <= 6) {
//                     setDisplayedMembers(value)
//                     formik.setFieldValue('num_family_members', value)
//                   }
//                 }}
//                 className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {Array.from({ length: displayedMembers }, (_, i) => i + 1).map(memberNum => (
//               <div key={memberNum} className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-blue-50">
//                 <h4 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
//                   <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-white font-bold text-sm">{memberNum}</span>
//                   </div>
//                   Family Member {memberNum}
//                 </h4>
//                 <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
//                     <Field type="text" name={`family_member${memberNum}_name`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
//                     <Field type="number" name={`family_member${memberNum}_age`} min="0" max="120" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">नाते *</label>
//                     <Field as="select" name={`family_member${memberNum}_relation`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                       <option value="">संबंध निवडा</option>
//                       <option value="Wife">Wife</option>
//                       <option value="Husband">Husband</option>
//                       <option value="Son">Son</option>
//                       <option value="Daughter">Daughter</option>
//                       <option value="Mother">Mother</option>
//                       <option value="Father">Father</option>
//                       <option value="Brother">Brother</option>
//                       <option value="Sister">Sister</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">लिंग *</label>
//                     <Field as="select" name={`family_member${memberNum}_gender`} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
//                       <option value="">लिंग निवडा</option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </Field>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">आधार क्रमांक (१२ अंक) *</label>
//                     <Field type="text" name={`family_member${memberNum}_aadhaar`} maxLength="12" placeholder="123456789012" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="flex items-center gap-4 mt-6">
//               {displayedMembers < 6 && (
//                 <button type="button" onClick={addMember} className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center">
//                   <Plus className="w-6 h-6 text-white" />
//                 </button>
//               )}
//               {displayedMembers > 1 && (
//                 <button type="button" onClick={removeMember} className="w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center">
//                   <Minus className="w-6 h-6 text-white" />
//                 </button>
//               )}
//               <span className="text-sm text-gray-600">{displayedMembers} of 6 members added</span>
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
//                 { name: 'doc_side_view', label: 'Side View', accept: 'image/*', icon: '🏗️' },
//                 { name: 'doc_front_view', label: 'Front View', accept: 'image/*', icon: '🏗️' },
//                 { name: 'video_inside', label: 'Inside Video', accept: 'video/*', icon: '📹' },
//                 ...(formik.values.residency_since &&
//   formik.values.residency_since <= new Date(2000, 0, 1)
//                   ? [
//                       { name: 'doc_before_2000', label: 'Hut Owner Document Before 2000 Proof', accept: 'image/*,.pdf,.doc,.docx', icon: '',multiple: true },
//                     ]
//                   : []
//                 ),
//                 ...(formik.values.residency_since &&
//   formik.values.residency_since > new Date(2000, 0, 1)
//                   ? [{
//     name: 'after_2000_proof_submitted',
//     label: 'Hut Owner Document After 2000 Proof',
//     accept: 'image/*,.pdf,.doc,.docx',
//     icon: '📄',
//     multiple: true
//   }]
//                   : []
//                 ),
//                 { name: 'Seldeclaration_letter', label: 'Self Declaration - A', accept: 'image/*,.pdf', icon: '✍️' },
//                 { name: 'Ration_card_info', label: 'Self-Declaration Form for Self-Assessment - B', accept: 'image/*,.pdf', icon: '📁' },
//                 { name: 'sale_agreement', label: 'Sale Agreement', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
//                 { name: 'biometric', label: 'Biometric Photo', accept: '.pdf,.doc,.docx,image/*', icon: '📜', multiple: true },
//                 { name: 'video_self_declaration', label: 'Self Declaration Video', accept: 'video/*', icon: '🎥' },
              
//               ].map(({ name, label, accept, icon, multiple }) => (
//                 <div key={name} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all">
//                   <div className="flex items-center mb-3">
//                     <span className="text-2xl mr-2">{icon}</span>
//                     <h4 className="font-semibold text-gray-800">{label}</h4>
//                   </div>

// <input
//   type="file"
//   name={name}
//   onChange={handleFileChange}
//   accept={accept}
//   multiple={multiple}
//   capture={
//   /Mobi|Android/i.test(navigator.userAgent)
//     ? "environment"
//     : undefined
// }
//   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// />

// {/* CAMERA BUTTON ONLY FOR IMAGE */}
// {accept?.includes("image") && (
//   <button
//     type="button"
//     onClick={() => setActiveCamera(name)}
//     className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//   >
//     Open Camera
//   </button>
// )}


// {/* ── VIDEO: replaced inline recording with modal trigger ── */}
// {accept?.includes("video") && (
//   <button
//     type="button"
//     onClick={() => startVideoRecording(name)}
//     className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
//   >
//     Open
//   </button>
// )}

// {/* hidden video ref kept for backward compat (no longer displayed) */}
// {accept?.includes("video") && (
//   <video
//     ref={(el) => (videoRefs.current[name] = el)}
//     style={{ display: "none" }}
//   />
// )}

// {/* WEBCAM MODAL */}
// {activeCamera === name && (
//   <div className="mt-4 p-4 border rounded-lg bg-gray-100">
//     <Webcam
//   ref={webcamRef}
//   screenshotFormat="image/jpeg"
//   audio={false}
//   className="w-full rounded-lg"
//   videoConstraints={{
//     facingMode: /Mobi|Android/i.test(navigator.userAgent)
//       ? { exact: "environment" }
//       : "user"
//   }}
//   onUserMediaError={(err) => {
//     console.error("Camera Error:", err)
//     alert("Camera Error: " + err.message)
//   }}
// />
//     <div className="flex gap-4 mt-3">
//       <button
//         type="button"
//         onClick={() => capturePhoto(name)}
//         className="bg-green-600 text-white px-4 py-2 rounded-lg"
//       >
//         Capture
//       </button>
//       <button
//         type="button"
//         onClick={() => setActiveCamera(null)}
//         className="bg-red-500 text-white px-4 py-2 rounded-lg"
//       >
//         Cancel
//       </button>
//     </div>
//   </div>
// )}


//                   {files[name] && (
//                     <div className="mt-2 p-2 bg-green-50 rounded">
//                       {Array.isArray(files[name]) ? (
//                         files[name].map((file, idx) => (
//                           <div key={idx} className="flex items-center text-sm text-green-700 mb-1">
//                             <span className="text-green-500 mr-2">Check</span>
//                             <p className="truncate">{file.name}</p>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="flex items-center text-sm text-green-700">
//                           <span className="text-green-500 mr-2">Check</span>
//                           <p className="truncate">{files[name].name}</p>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )

//       default:
//         return <div className="text-center py-8"><h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Submit</h3></div>
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
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
//                       <span className="text-white text-xs">Check</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="ml-4 min-w-0">
//                   <p className={`text-sm font-semibold ${currentStep >= step.id ? 'text-blue-700' : 'text-gray-500'}`}>Step {step.id}</p>
//                   <p className={`text-xs truncate ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}>{step.title}</p>
//                 </div>
//                 {index < steps.length - 1 && (
//                   <div className={`flex-1 h-1 mx-6 min-w-8 rounded-full ${currentStep > step.id ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'}`} />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
//           {success && (
//             <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">Success</span>
//               <span className="font-medium">{success}</span>
//             </div>
//           )}
//           {error && (
//             <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-300 text-red-800 px-6 py-4 rounded-lg mb-6 flex items-center">
//               <span className="text-2xl mr-3">Error</span>
//               <span className="font-medium">{error}</span>
//             </div>
//           )}

//           <Formik
//           enableReinitialize
//             initialValues={loadedDraft?.formData || initialValues}
//             validationSchema={validationSchemas[currentStep]}
//             onSubmit={handleSubmit}
//           >
//             {(formik) => {
//            const isFinalBySurvey =
//       currentStep === 1 &&
//       (formik.values.survey_status === "Hut Appose" ||
//        formik.values.survey_status === "Hut Denied")    

// return(
//               <Form>
//                 {renderStepContent(formik)}

// <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-8 border-t border-gray-200">

//   <button
//     type="button"
//     onClick={prevStep}
//     disabled={currentStep === 1}
//     className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl font-semibold ${
//       currentStep === 1
//         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//         : 'bg-gray-200 text-gray-700'
//     }`}
//   >
//     <ChevronLeft size={18} /> Previous
//   </button>

//   <button
//     type="button"
//     onClick={() => handleSaveDraft(formik.values)}
//     className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
//   >
//     <Save size={18} /> Save Draft
//   </button>

//   {isFinalBySurvey ? (
//   <button
//     type="submit"
//     disabled={loading || !formik.isValid}
//     className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
//   >
//     <Save size={18} /> Submit
//   </button>
// ) : currentStep < steps.length ? (
//   <button
//     type="button"
//     onClick={() => nextStep(formik)}
//     className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
//   >
//     Next <ChevronRight size={18} />
//   </button>
// ) : (
//   <button
//     type="submit"
//     disabled={loading || !formik.isValid}
//     className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
//   >
//     <Save size={18} /> Submit
//   </button>
// )}

// </div>

//               </Form>
// )
            
// }
            
//             }
//           </Formik>
//         </div>
//       </div>

//       {/* ── VIDEO RECORDING MODAL (renders at root level) ── */}
//       {videoModalField && (
//         <VideoRecordingModal
//           fieldName={videoModalField}
//           onClose={() => setVideoModalField(null)}
//           onSave={handleVideoSave}
//         />
//       )}

//     </div>
//   )
// }

// export default ApplicationForm
