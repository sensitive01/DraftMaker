import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import NeedSupport from "./components/NeedSupport";
import Preloader from "./components/Preloader";
import animLogo from "./images/anim_line.png";
import RentalAgreementForm from "./components/documents/rentalAggrement/RentalAgreementForm";
import CommercialAggrement from "./components/documents/commercialAggrement/CommercialAggrement";
import DocumentServices from "./components/DocumentServices";
import DraftHeading from "./DraftHeading";
import AddressAffadavit from "./components/documents/addressProofAffadavit/AddressAffadavit";
import PassportNameChange from "./components/documents/passportnamechange/PassportNameChange";
import AnnexureFContainer from "./components/documents/passportannaxure/PasswordAnnaxure";
import GapPeriod from "./components/documents/gapPeriod/GapPeriod";
import HufAggrement from "./components/documents/huf/HufAggrement";
import VehicleInsuranceClaming from "./components/documents/vehicleinsuranceclaming/VehicleInsuranceClaming";
import JointKhataTransfer from "./components/documents/jointKhataTransfer/JointKhataTransfer";
import MatriculationPage from "./components/documents/metriculation/MatriculationPage";
import GstPage from "./components/documents/gst/GstPage";
import BirthCertificatePage from "./components/documents/birtCertificate/BirthCertificatePage";
import BirthCertificateParentNameCorrectionPage from "./components/documents/birtCeritificateParentName/BirthCertificateParentNameCorrectionPage";
import DocumentLostPage from "./components/documents/documentLost/DocumentLostPage";
import GasAffidavitForm from "./components/documents/gasaffadavit/GasAffadavitPage";
import DobCorrectionPage from "./components/documents/dobCorrection/DobCorrectionPage";
import NameCorrectionChange from "./components/documents/namechangecorrection/NameCorrectionChange";
import DualNameChange from "./components/documents/dualNameChange/DualNameChange";
import AdminLoginPage from "./components/admin/loginPage/AdminLoginPage";
import ForgotPassword from "./components/admin/forgotpassword/ForgotPassword";
import Layout from "./components/admin/dashboard/layout.jsx/Layout";
import Statistics from "./components/admin/dashboard/statistics/Statistics";
import AdminSignUpPage from "./components/admin/signup/AdminSignUpPage";
import DocumentPriceTable from "./components/admin/dashboard/statistics/DocumentsPriceTable";
import ResetPasswordComponent from "./components/admin/dashboard/statistics/ResetPasswordComponent";
import NewBookingTables from "./components/admin/dashboard/statistics/NewBookingTables";
import RecidentialAggrementPreview from "./components/admin/dashboard/statistics/documentPreview/recedentialPreview/RecidentialAggrementPreview";
import CommercialAggrementPreview from "./components/admin/dashboard/statistics/documentPreview/commecialAggrement/CommercialAggrementPreview";
import AddressAffadavitPreview from "./components/admin/dashboard/statistics/documentPreview/addressAffadavit/AddressAffadavitPreview";
import PassportAffadavitPreview from "./components/admin/dashboard/statistics/documentPreview/passportAffadavit/PassportAffadavitPreview";
import PassportNameChangePreview from "./components/admin/dashboard/statistics/documentPreview/passportNameChange/PassportNameChangePreview";
import GapPeriodPreview from "./components/admin/dashboard/statistics/documentPreview/gapPeriod/GapPeriodPreview";
import HufPreview from "./components/admin/dashboard/statistics/documentPreview/huf/HufPreview";
import VehicleInsurencePreview from "./components/admin/dashboard/statistics/documentPreview/vehicleInsurence/VehicleInsurencePreview";
import KhPreview from "./components/admin/dashboard/statistics/documentPreview/kh/KhPreview";
import MetriculationLostPreview from "./components/admin/dashboard/statistics/documentPreview/metriculationLost/MetriculationLostPreview";
import GstPreview from "./components/admin/dashboard/statistics/documentPreview/gst/GstPreview";
import MinorNameCorrectionPreview from "./components/admin/dashboard/statistics/documentPreview/minorNameCorrection/MinorNameCorrectionPreview";
import BirtCrtificateParentNameCorrection from "./components/admin/dashboard/statistics/documentPreview/birthParentNameCorrection/BirtCrtificateParentNameCorrection";
import DocumentLostPreview from "./components/admin/dashboard/statistics/documentPreview/documentLost/DocumentLostPreview";
import GasPreview from "./components/admin/dashboard/statistics/documentPreview/gas/GasPreview";
import DobCorrectionPreview from "./components/admin/dashboard/statistics/documentPreview/dobCorrection/DobCorrectionPreview";
import NameChangePreview from "./components/admin/dashboard/statistics/documentPreview/nameChange/NameChangePreview";
import DualNameChangePreview from "./components/admin/dashboard/statistics/documentPreview/dualNameChange/DualNameChangePreview";
import StampDutyTable from "./components/admin/dashboard/statistics/StampDutyTable";
import DeliveryChargesTable from "./components/admin/dashboard/statistics/DeliveryChargesTable";
import DocumentPaymentPage from "./components/documents/DocumentPaymentPage";
import BuyEStampDocuments from "./components/buyStampDocuments/BuyEStampDocuments";
import EstampBookingTable from "./components/admin/dashboard/statistics/EstampBookingTable";
import EstampDetails from "./components/admin/dashboard/statistics/EstampDetails";
import TrackMyDocuments from "./components/trackDocuments/TrackMyDocuments";
import HomeContent from "./components/HomeContent";
import AboutUs from "./components/AboutUs";
import WhatWeDo from "./components/WhatWeDo";
import AboutUsHome from "./components/AboutUsHome";
import TestimonialComments from "./components/TestimonialComments";
import ContactMePage from "./components/ContactMePage";
import MesaageNotification from "./components/admin/dashboard/statistics/MesaageNotification";
import Test from "./components/Test";
import AboutUsContentPage from "./components/AboutUsContentPage";
import FloatingContactButtons from "./FloatingContactButtons";
import MoveToTop from "./MoveToTop";
import DocumentUpload from "./components/uploadfile/UploadDocument";
import UploadDocumentBookings from "./components/admin/dashboard/statistics/UploadDocumentBookings";
import ViewUploadDetails from "./components/admin/dashboard/statistics/ViewUploadDetails";
import DocumentBookingTablePreview from "./components/admin/dashboard/statistics/DocumentBookingTablePreview";
import PreviewAddressAffadavit from "./components/documents/preview/addressProofAffadavit/PreviewAddressAffadavit";
import PreviewCommercialAggrement from "./components/documents/preview/commercialAggrement/PreviewCommercialAggrement";
import PreviewRentalAgreement from "./components/documents/preview/rentalAggrement/PreviewRentalAgreement";
import PreviewPassportNameChange from "./components/documents/preview/passportnamechange/PassportNameChange";
import PreviewPasswordAnnaxure from "./components/documents/preview/passportannaxure/PasswordAnnaxure";
import PreviewGapPeriod from "./components/documents/preview/gapPeriod/GapPeriod";
import PreviewHufAgreement from "./components/documents/preview/huf/HufAggrement";
import PreviewVehicleInsuranceClamingPage from "./components/documents/preview/vehicleinsuranceclaming/VehicleInsuranceClaming";
import PreviewJointKhataTransfer from "./components/documents/preview/jointKhataTransfer/JointKhataTransfer";
import PreviewMatriculationPage from "./components/documents/preview/metriculation/MatriculationPage";
import PreviewGstPage from "./components/documents/preview/gst/GstPage";
import PreviewBirthCertificatePage from "./components/documents/preview/birtCertificate/BirthCertificatePage";
import PreviewBirthCertificateParentNameCorrectionPage from "./components/documents/preview/birtCeritificateParentName/BirthCertificateParentNameCorrectionPage";
import PreviewDocumentLostPage from "./components/documents/preview/documentLost/DocumentLostPage";
import PreviewGasAffidavitForm from "./components/documents/preview/gasaffadavit/GasAffadavitPage";
import PreviewDobCorrectionPage from "./components/documents/preview/dobCorrection/DobCorrectionPage";
import PreviewNameCorrectionChange from "./components/documents/preview/namechangecorrection/NameCorrectionChange";
import PreviewDualNameChange from "./components/documents/preview/dualNameChange/DualNameChange";
import MainPolicies from "./components/termaandcinditions/MainPolicies";
import TermsAndConditionsPage from "./components/termaandcinditions/TermsAndConditionsPage";
import PrivacyPolicyPage from "./components/termaandcinditions/PrivacyPolicyPage";
import RefundCancellationPolicyPage from "./components/termaandcinditions/RefundCancellationPolicyPage";

function MainLayout({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
            <DraftHeading />
          </div>
        </div>
      </div>

      <div className="container">
        <div
          className="document-services-wrapper"
          style={{
            marginTop: "-100px",
            marginBottom: "50px",
            position: "relative",
            zIndex: "10",
          }}
        >
          <DocumentServices />
        </div>
      </div>

      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function PaymentLayout({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
        </div>
      </div>

      <div style={{ marginTop: "120px" }}>{children}</div>

      <NeedSupport />
      <Footer />
    </div>
  );
}

function HomeLayout({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
            <HomeContent />
            <DraftHeading />
          </div>
        </div>
      </div>
      <div className="container">
        <div
          className="document-services-wrapper"
          style={{
            marginTop: "-100px",
            marginBottom: "50px",
            position: "relative",
            zIndex: "10",
          }}
        >
          <DocumentServices />
        </div>
      </div>

      <div className="container">
        <div
          className="document-services-wrapper"
          style={{
            marginTop: "-100px",
            marginBottom: "50px",
            position: "relative",
            zIndex: "10",
          }}
        >
          {/* <WhatWeDo /> */}
          <AboutUsHome />
        </div>
      </div>

      {children}
      <TestimonialComments />

      <NeedSupport />
      <Footer />
    </div>
  );
}

function AboutUsPage({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
            <AboutUs />
          </div>
        </div>
      </div>

      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function AboutUsFullPage({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
            <AboutUsContentPage />
          </div>
        </div>
      </div>

      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function ContactUsPage({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactMePage />
      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function PrivacyPolicy({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <PrivacyPolicyPage />
      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function TermsAndConditions({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TermsAndConditionsPage />
      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}


function RefundCancellationPolicy({ children }) {
  return (
    <div className="page_wrapper">
      <div className="top_home_wraper white_option">
        <div className="content-wrapper">
          <div className="container">
            <div className="anim_line dark_bg">
              {/* {[...Array(9)].map((_, index) => (
                <span key={index}>
                  <img src="" alt="anim_line" />
                </span>
              ))} */}
            </div>
          </div>
          <Header />
          <div className="container mx-auto text-center ">
            <div
              className="bread_crumb"
              data-aos="fade-in"
              data-aos-duration="2000"
              data-aos-delay="100"
            >
              <div className="anim_line dark_bg">
                {[...Array(9)].map((_, index) => (
                  <span key={index}>
                    <img src="" alt="anim_line" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RefundCancellationPolicyPage />
      {children}

      <NeedSupport />
      <Footer />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);

      // Check for authentication token
      const admin = localStorage.getItem("adminData");
      if (admin) {
        setIsAuthenticated(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Protected Route Component for Admin Routes
  const ProtectedAdminRoute = ({ children }) => {
    return <Layout>{children}</Layout>;
  };

  return (
    <Router>
      <MoveToTop /> {/* Add this line */}
      <div className="page_wrapper">
        {loading && <Preloader />}

        {/* Authentication and Admin Routes */}
        <Routes>
          <Route path="/admin/signup" element={<AdminSignUpPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <Statistics />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/documents-price-table"
            element={
              <ProtectedAdminRoute>
                <DocumentPriceTable />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/documents-stamp-duty-table"
            element={
              <ProtectedAdminRoute>
                <StampDutyTable />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/uploaded-document-table"
            element={
              <ProtectedAdminRoute>
                <UploadDocumentBookings />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/upload-document-bookings/preview/:bookingId"
            element={
              <ProtectedAdminRoute>
                <ViewUploadDetails />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/-document-bookings-table/preview/:bookingId"
            element={
              <ProtectedAdminRoute>
                <DocumentBookingTablePreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/delivery-type-price"
            element={
              <ProtectedAdminRoute>
                <DeliveryChargesTable />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/documents-new-booking-table"
            element={
              <ProtectedAdminRoute>
                <NewBookingTables />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/e-stamp-booking-table"
            element={
              <ProtectedAdminRoute>
                <EstampBookingTable />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/draft-notification"
            element={
              <ProtectedAdminRoute>
                <MesaageNotification />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/estamp-booking-details/:estampId"
            element={
              <ProtectedAdminRoute>
                <EstampDetails />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/reset-password"
            element={
              <ProtectedAdminRoute>
                <ResetPasswordComponent />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-RFD-18/:bookingId"
            element={
              <ProtectedAdminRoute>
                <RecidentialAggrementPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-CFD-17/:bookingId"
            element={
              <ProtectedAdminRoute>
                <CommercialAggrementPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-AAF-16/:bookingId"
            element={
              <ProtectedAdminRoute>
                <AddressAffadavitPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-PNC-15/:bookingId"
            element={
              <ProtectedAdminRoute>
                <PassportNameChangePreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-PAF-14/:bookingId"
            element={
              <ProtectedAdminRoute>
                <PassportAffadavitPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-GP-13/:bookingId"
            element={
              <ProtectedAdminRoute>
                <GapPeriodPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-HUF-12/:bookingId"
            element={
              <ProtectedAdminRoute>
                <HufPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-VIC-11/:bookingId"
            element={
              <ProtectedAdminRoute>
                <VehicleInsurencePreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-KH-10/:bookingId"
            element={
              <ProtectedAdminRoute>
                <KhPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-MAL-9/:bookingId"
            element={
              <ProtectedAdminRoute>
                <MetriculationLostPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-GST-8/:bookingId"
            element={
              <ProtectedAdminRoute>
                <GstPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-BC-MNC-7/:bookingId"
            element={
              <ProtectedAdminRoute>
                <MinorNameCorrectionPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-BCNCP-6/:bookingId"
            element={
              <ProtectedAdminRoute>
                <BirtCrtificateParentNameCorrection />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-DOC-LOST-5/:bookingId"
            element={
              <ProtectedAdminRoute>
                <DocumentLostPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-GAS-5/:bookingId"
            element={
              <ProtectedAdminRoute>
                <GasPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-DOBC-3/:bookingId"
            element={
              <ProtectedAdminRoute>
                <DobCorrectionPreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-NC-2/:bookingId"
            element={
              <ProtectedAdminRoute>
                <NameChangePreview />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/document-preview/DM-DNC-1/:bookingId"
            element={
              <ProtectedAdminRoute>
                <DualNameChangePreview />
              </ProtectedAdminRoute>
            }
          />
        </Routes>

        {/* Existing Document Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="/documents/home" replace />} />

          <Route path="/documents/home" element={<HomeLayout />} />
          <Route path="/home/about-us" element={<AboutUsPage />} />
          <Route path="/home/contact-us" element={<ContactUsPage />} />
          <Route path="/home/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/home/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/home/all-about-us" element={<AboutUsFullPage />} />
         <Route path="/home/refund-and-cancellation" element={<RefundCancellationPolicy />} />


          <Route
            path="/documents/rental/:type"
            element={
              <MainLayout>
                <RentalAgreementForm />
              </MainLayout>
            }
          />

          <Route
            path="/documents/commercial/:type"
            element={
              <MainLayout>
                <CommercialAggrement />
              </MainLayout>
            }
          />

          <Route
            path="/documents/address/:type"
            element={
              <MainLayout>
                <AddressAffadavit />
              </MainLayout>
            }
          />

          <Route
            path="/documents/passport-name/:type"
            element={
              <MainLayout>
                <PassportNameChange />
              </MainLayout>
            }
          />
          <Route
            path="/documents/passport-annaxure/:type"
            element={
              <MainLayout>
                <AnnexureFContainer />
              </MainLayout>
            }
          />
          <Route
            path="/documents/gap-period/:type"
            element={
              <MainLayout>
                <GapPeriod />
              </MainLayout>
            }
          />
          <Route
            path="/documents/huf/:type"
            element={
              <MainLayout>
                <HufAggrement />
              </MainLayout>
            }
          />
          <Route
            path="/documents/vehicle-insurance/:type"
            element={
              <MainLayout>
                <VehicleInsuranceClaming />
              </MainLayout>
            }
          />

          <Route
            path="/documents/khata-transfer/:type"
            element={
              <MainLayout>
                <JointKhataTransfer />
              </MainLayout>
            }
          />
          <Route
            path="/documents/metriculation/:type"
            element={
              <MainLayout>
                <MatriculationPage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/gst/:type"
            element={
              <MainLayout>
                <GstPage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/birth-certificate/:type"
            element={
              <MainLayout>
                <BirthCertificatePage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/birth-certificate-parent/:type"
            element={
              <MainLayout>
                <BirthCertificateParentNameCorrectionPage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/document-lost/:type"
            element={
              <MainLayout>
                <DocumentLostPage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/gas/:type"
            element={
              <MainLayout>
                <GasAffidavitForm />
              </MainLayout>
            }
          />
          <Route
            path="/documents/dob/:type"
            element={
              <MainLayout>
                <DobCorrectionPage />
              </MainLayout>
            }
          />
          <Route
            path="/documents/name/:type"
            element={
              <MainLayout>
                <NameCorrectionChange />
              </MainLayout>
            }
          />
          <Route
            path="/documents/dual-name/:type"
            element={
              <MainLayout>
                <DualNameChange />
              </MainLayout>
            }
          />
        </Routes>
        {!window.location.pathname.startsWith("/admin") && (
          <FloatingContactButtons />
        )}

        <GoTop />
        <VideoModal />
      </div>
      <Routes>
        <Route
          path="/documents/payment-page"
          element={
            <PaymentLayout>
              <DocumentPaymentPage />
            </PaymentLayout>
          }
        />
        {/* ................................... */}

        <Route
          path="/documents/preview-page/DM-RFD-18/:bookingId"
          element={
            <PaymentLayout>
              <PreviewRentalAgreement />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-CFD-17/:bookingId"
          element={
            <PaymentLayout>
              <PreviewCommercialAggrement />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-AAF-16/:bookingId"
          element={
            <PaymentLayout>
              <PreviewAddressAffadavit />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-PNC-15/:bookingId"
          element={
            <PaymentLayout>
              <PreviewPassportNameChange />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-PAF-14/:bookingId"
          element={
            <PaymentLayout>
              <PreviewPasswordAnnaxure />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-GP-13/:bookingId"
          element={
            <PaymentLayout>
              <PreviewGapPeriod />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-HUF-12/:bookingId"
          element={
            <PaymentLayout>
              <PreviewHufAgreement />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-VIC-11/:bookingId"
          element={
            <PaymentLayout>
              <PreviewVehicleInsuranceClamingPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-KH-10/:bookingId"
          element={
            <PaymentLayout>
              <PreviewJointKhataTransfer />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-MAL-9/:bookingId"
          element={
            <PaymentLayout>
              <PreviewMatriculationPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-GST-8/:bookingId"
          element={
            <PaymentLayout>
              <PreviewGstPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-BC-MNC-7/:bookingId"
          element={
            <PaymentLayout>
              <PreviewBirthCertificatePage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-BCNCP-6/:bookingId"
          element={
            <PaymentLayout>
              <PreviewBirthCertificateParentNameCorrectionPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-DOC-LOST-5/:bookingId"
          element={
            <PaymentLayout>
              <PreviewDocumentLostPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-GAS-5/:bookingId"
          element={
            <PaymentLayout>
              <PreviewGasAffidavitForm />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-DOBC-3/:bookingId"
          element={
            <PaymentLayout>
              <PreviewDobCorrectionPage />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-NC-2/:bookingId"
          element={
            <PaymentLayout>
              <PreviewNameCorrectionChange />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/preview-page/DM-DNC-1/:bookingId"
          element={
            <PaymentLayout>
              <PreviewDualNameChange />
            </PaymentLayout>
          }
        />

        {/* ............................................. */}

        <Route
          path="/documents/buy-e-stamp"
          element={
            <PaymentLayout>
              <BuyEStampDocuments />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/track-my-documents"
          element={
            <PaymentLayout>
              <TrackMyDocuments />
            </PaymentLayout>
          }
        />
        <Route
          path="/documents/upload-document"
          element={
            <PaymentLayout>
              <DocumentUpload />
            </PaymentLayout>
          }
        />
        <Route
          path="/test"
          element={
            <PaymentLayout>
              <Test />
            </PaymentLayout>
          }
        />
      </Routes>
    </Router>
  );
}

// Go Top Button Component
const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`go_top ${isVisible ? "visible" : ""}`}
      id="Gotop"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <span>
        <i className="icofont-arrow-up"></i>
      </span>
    </div>
  );
};

const VideoModal = () => {
  return (
    <div
      className="modal fade youtube-video"
      id="myModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <button
            id="close-video"
            type="button"
            className="button btn btn-default text-right"
            data-dismiss="modal"
          >
            <i className="icofont-close-line-circled"></i>
          </button>
          <div className="modal-body">
            <div id="video-container" className="video-container">
              <iframe
                id="youtubevideo"
                width="640"
                height="360"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
