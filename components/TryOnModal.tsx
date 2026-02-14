
import React, { useState, useRef, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Product, TryOnResult } from '../types';
import { geminiService } from '../services/geminiService';
import { getCroppedImg } from '../utils/cropImage';
import Button from './Button';
import TryOnProcessing from './TryOnProcessing';

interface TryOnModalProps {
  product: Product;
  onClose: () => void;
}

const PhotoGuideline: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex gap-3 items-start p-3 rounded-xl bg-zinc-50 border border-zinc-100">
    <div className="mt-0.5 text-zinc-900">{icon}</div>
    <div>
      <h4 className="text-xs font-bold text-black leading-tight">{title}</h4>
      <p className="text-[10px] text-zinc-500 leading-tight mt-0.5">{desc}</p>
    </div>
  </div>
);

const TryOnModal: React.FC<TryOnModalProps> = ({ product, onClose }) => {
  const [image, setImage] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TryOnResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    try {
      if (tempImage && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(tempImage, croppedAreaPixels);
        setImage(croppedImage);
        setIsCropping(false);
        setTempImage(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    setResult(null);

    // Helper to strip data URL prefix for API
    const base64 = image.split(',')[1];

    const res = await geminiService.performTryOn({
      userImageBase64: base64,
      productImageUrl: product.imageUrl,
      height,
      weight,
      garmentType: product.category
    });

    setResult(res);
    setIsProcessing(false);
  };

  const resetTryOn = () => {
    setResult(null);
    setIsProcessing(false);
    setImage(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Left Side: Garment Info */}
        <div className="hidden md:flex md:w-1/3 bg-zinc-50 border-r border-zinc-100 flex-col overflow-y-auto">
          <img src={product.imageUrl} alt={product.title} className="w-full aspect-[3/4] object-cover" />
          <div className="p-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{product.category}</span>
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-lg font-medium text-black">{product.price}</p>
            <p className="text-sm text-zinc-500">{product.description}</p>
          </div>
        </div>

        {/* Right Side: Action Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors z-50 bg-white/80"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          {isCropping && tempImage ? (
            <div className="flex-1 flex flex-col">
              <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">Crop your photo</h2>
                <p className="text-zinc-500 text-sm">Select the part of your body you want to use for the try-on.</p>
              </div>
              <div className="relative flex-1 bg-zinc-900 rounded-2xl overflow-hidden min-h-[300px]">
                <Cropper
                  image={tempImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={3 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div className="py-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-400 uppercase">Zoom</label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-100 rounded-full appearance-none cursor-pointer accent-black"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" className="flex-1" onClick={() => { setIsCropping(false); setTempImage(null); }}>Cancel</Button>
                  <Button className="flex-1" onClick={handleConfirmCrop}>Confirm Selection</Button>
                </div>
              </div>
            </div>
          ) : isProcessing ? (
            <div className="flex-1 flex items-center justify-center">
                <TryOnProcessing userImage={image} />
            </div>
          ) : result?.status === 'success' ? (
            <div className="space-y-6 flex-1 flex flex-col items-center">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Your Look is Ready!</h2>
                <p className="text-zinc-500">How do you think it looks?</p>
              </div>
              
              <div className="relative group w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-zinc-100">
                <img src={result.imageUrl} alt="Result" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold">AI GENERATED</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button className="flex-1" onClick={() => window.alert('Added to cart!')}>Add to Cart</Button>
                <Button variant="secondary" className="flex-1" onClick={resetTryOn}>Try Again</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8 flex-1">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Try it on.</h2>
                <p className="text-zinc-500">Upload a photo to see how this fits you perfectly.</p>
              </div>

              <div className="space-y-6">
                {/* Guidelines Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <PhotoGuideline 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>}
                    title="Good Lighting"
                    desc="Avoid dark rooms or strong backlights for a clear result."
                  />
                  <PhotoGuideline 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
                    title="Front Facing"
                    desc="Stand straight and face the camera directly."
                  />
                  <PhotoGuideline 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
                    title="Simple Background"
                    desc="Solid colors or clean walls help our AI focus on you."
                  />
                  <PhotoGuideline 
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    title="Fitted Clothes"
                    desc="Form-fitting clothes allow for more accurate body mapping."
                  />
                </div>

                {/* Upload Section */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative cursor-pointer border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all
                    ${image ? 'border-zinc-200 bg-zinc-50' : 'border-zinc-300 hover:border-black bg-white'}
                  `}
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                  />
                  
                  {image ? (
                    <div className="relative w-40 aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                      <img src={image} className="w-full h-full object-cover" alt="User" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change Photo</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <p className="text-zinc-600 font-medium text-center">Click to upload your photo</p>
                      <p className="text-zinc-400 text-[11px] mt-1 text-center">Wait for the cropping tool to select your frame</p>
                    </>
                  )}
                </div>

                {/* Measurements Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Height (cm)</label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 175"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Weight (kg)</label>
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 70"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={!image}
                    onClick={handleGenerate}
                  >
                    Magic Try-On
                  </Button>
                  <p className="text-center text-[10px] text-zinc-400 mt-4 leading-relaxed">
                    By clicking "Magic Try-On", you agree to our processing of your image to generate the try-on result. We preserve your identity using advanced AI.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;
