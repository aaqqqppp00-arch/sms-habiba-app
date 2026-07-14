import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Building, Shield, CalendarDays, Edit2, DownloadCloud, UploadCloud, X, ZoomIn } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

const Profile = () => {
  const navigate = useNavigate();
  const { profileImage, setProfileImage } = useGlobalContext();
  const fileInputRef = useRef(null);
  
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleAvatarEdit = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setAvatarPreview(null);
    setIsCropping(false);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveAvatar = async () => {
    if (isCropping && avatarPreview && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(avatarPreview, croppedAreaPixels);
        setProfileImage(croppedImage);
        closeAvatarModal();
      } catch (e) {
        console.error('Failed to crop image', e);
      }
    } else if (avatarPreview && !isCropping) {
      // Fallback if they somehow skipped cropping
      setProfileImage(avatarPreview);
      closeAvatarModal();
    }
  };

  const handleZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-7xl mx-auto font-sans p-6 lg:p-8">
      
      <div className="flex flex-col w-full">
        
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black w-full relative rounded-2xl border border-gray-200/50 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-700/30 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
        {/* Profile Content Container */}
        <div className="pb-8 flex-1">
          
          {/* Avatar & Main Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 mb-8 gap-6 relative z-10 px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* The Avatar */}
              <div className="relative w-32 h-32 flex-shrink-0">
                <div className="w-full h-full rounded-full border-4 border-gray-50 dark:border-gray-900 bg-blue-100 flex items-center justify-center text-blue-700 text-4xl font-bold shadow-sm overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    "AD"
                  )}
                </div>
                <button 
                  onClick={handleAvatarEdit}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors cursor-pointer"
                  title="Change profile picture"
                >
                  <Edit2 size={14} />
                </button>
              </div>
              
              {/* Name and Role */}
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight">Admin User</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-base mt-1 flex items-center gap-2">
                  System Administrator
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Profile link copied to clipboard!');
                }}
                className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                Share Profile
              </button>
              <button 
                onClick={() => navigate('/settings')}
                className="px-4 py-2 bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            
            {/* Contact Information Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 w-full">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Contact Information</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-3 items-center border-b border-gray-200/60 dark:border-gray-800 pb-5">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Mail size={16} /> Email Address
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200 font-medium break-all">
                    admin@depi.edu
                  </div>
                </div>
                
                <div className="grid grid-cols-3 items-center border-b border-gray-200/60 dark:border-gray-800 pb-5">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Phone size={16} /> Phone
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                    +20 123 456 7890
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <MapPin size={16} /> Location
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                    Cairo, Egypt
                  </div>
                </div>
              </div>
            </div>

            {/* Work Information Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 w-full">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Work Information</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-3 items-center border-b border-gray-200/60 dark:border-gray-800 pb-5">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Building size={16} /> Institution
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                    DEPI Academy
                  </div>
                </div>
                
                <div className="grid grid-cols-3 items-center border-b border-gray-200/60 dark:border-gray-800 pb-5">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <Shield size={16} /> Access Level
                  </div>
                  <div className="col-span-2 flex items-center gap-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                    Full Access (Admin)
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center">
                  <div className="col-span-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                    <CalendarDays size={16} /> Joined Date
                  </div>
                  <div className="col-span-2 text-sm text-gray-900 dark:text-gray-200 font-medium">
                    August 2023
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Avatar Upload Modal */}
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isCropping ? 'Crop Image' : 'Update Profile Picture'}
              </h2>
              <button onClick={closeAvatarModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            {/* Body */}
            <div className="p-6">
              {!isCropping ? (
                /* Dropzone State */
                <div 
                  onClick={handleZoneClick}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white text-center mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
              ) : (
                /* Cropper State */
                <div className="flex flex-col gap-6">
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-900">
                    <Cropper
                      image={avatarPreview}
                      crop={crop}
                      zoom={zoom}
                      aspect={1}
                      cropShape="round"
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                  <div className="flex items-center gap-4 px-2">
                    <ZoomIn size={18} className="text-gray-400 flex-shrink-0" />
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => setZoom(e.target.value)}
                      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-blue-500"
                    />
                  </div>
                </div>
              )}
              
              {/* Hidden Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const objectUrl = URL.createObjectURL(file);
                    setAvatarPreview(objectUrl);
                    setIsCropping(true);
                  }
                }}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-900/30 flex justify-end gap-3">
              <button 
                onClick={closeAvatarModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveAvatar}
                disabled={!avatarPreview}
                className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-blue-600 rounded-lg hover:bg-zinc-800 dark:hover:bg-blue-700 shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
