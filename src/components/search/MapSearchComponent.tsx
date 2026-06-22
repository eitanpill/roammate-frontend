'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types';
import { AlertCircle } from 'lucide-react';

interface MapSearchComponentProps {
  properties: Property[];
  selectedProperty?: string;
  onPropertySelect?: (propertyId: string) => void;
}

export const MapSearchComponent: React.FC<MapSearchComponentProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">No properties to display</p>
        </div>
      </div>
    );
  }

  // Calculate center from properties
  const centerLat =
    properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length;
  const centerLng =
    properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length;
  const center: LatLngExpression = [centerLat, centerLng];

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="w-full h-96 rounded-lg shadow-md z-10"
      style={{ border: '2px solid #e5e7eb' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
          eventHandlers={{
            click: () => onPropertySelect?.(property.id),
          }}
        >
          <Popup>
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-sm">{property.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{property.address}</p>
              <p className="text-sm font-bold text-brand-primary">
                ${property.pricePerNight}/night
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
