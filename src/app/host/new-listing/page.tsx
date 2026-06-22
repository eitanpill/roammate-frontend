'use client'

import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function NewListingWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'private-land',
    maxGuests: '2',
    pricePerNight: '',
    amenities: [] as string[]
  })

  const amenitiesOptions = ['Water Hookup', 'Power Supply', 'Dump Station', 'WiFi', 'Level Ground', 'Pet Friendly', 'Firepit', 'Shelter']

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Property details' },
    { number: 2, title: 'Location', description: 'Where is it?' },
    { number: 3, title: 'Amenities', description: 'What you offer' },
    { number: 4, title: 'Photos', description: 'Show it off' },
    { number: 5, title: 'Review', description: 'Final check' }
  ]

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  return (
    <div className="space-y-8">
      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        <h1 className="text-4xl font-black text-brand-primary mb-2">List Your Property ✨</h1>
        <p className="text-brand-earth">5 simple steps to start hosting caravan travelers</p>
      </div>

      <div className="flex justify-between items-center">
        {steps.map((s, i) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
              step >= s.number 
                ? 'bg-gradient-to-r from-brand-primary to-brand-sage text-white' 
                : 'bg-white border-2 border-brand-primary/20 text-brand-primary'
            }`}>
              {step > s.number ? <Check className="w-6 h-6" /> : s.number}
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 transition ${
                step > s.number ? 'bg-brand-primary' : 'bg-brand-primary/20'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      <div className="backdrop-blur-sm bg-white/70 border border-brand-primary/20 rounded-2xl p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-primary">Basic Information</h2>
            <input type="text" placeholder="Property Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary" />
            <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={4} className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary" />
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary">
              <option value="private-land">Private Land</option>
              <option value="farm">Farm Stay</option>
              <option value="bushland">Bushland</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-primary">📍 Location</h2>
            <input type="text" placeholder="Full Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-white border border-brand-primary/20 rounded-lg px-4 py-3 text-brand-primary" />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-primary">✨ Amenities</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {amenitiesOptions.map(amenity => (
                <label key={amenity} className="flex items-center gap-3 p-4 border border-brand-primary/20 rounded-lg cursor-pointer hover:bg-brand-primary/5">
                  <input type="checkbox" checked={formData.amenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="w-5 h-5" />
                  <span className="font-medium text-brand-primary">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-primary">📸 Add Photos</h2>
            <div className="border-2 border-dashed border-brand-primary/30 rounded-lg p-12 text-center">
              <p className="text-2xl mb-2">📷</p>
              <p className="text-brand-primary font-bold">Click to upload photos</p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-brand-primary">✅ Review</h2>
            <button className="w-full py-3 bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-lg font-bold">
              ✅ Publish My Listing
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1} className="px-6 py-3 border border-brand-primary/30 text-brand-primary rounded-lg font-bold disabled:opacity-50">
          ← Previous
        </button>
        <button onClick={() => setStep(Math.min(5, step + 1))} disabled={step === 5} className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-sage text-white rounded-lg font-bold">
          Next →
        </button>
      </div>
    </div>
  )
}
