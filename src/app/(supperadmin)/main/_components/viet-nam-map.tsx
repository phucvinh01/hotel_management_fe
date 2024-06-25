'use client'

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { provinceCoordinates } from './provinceCoordinates';
import URL_Enum from '@/axios/URL_Enum';

const VietnamMap = () => {
  const [provinceCounts, setProvinceCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${URL_Enum.BaseURL_Api}get-province-counts`);
        setProvinceCounts(result.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <MapContainer
      center={[14.058324, 108.277199]}
      style={{ height: "600px", width: "100%" }}
      zoom={5}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {Object.keys(provinceCounts).map(province => (
        provinceCoordinates[province] && (
          <Circle
            key={province}
            center={provinceCoordinates[province]}
            radius={Math.sqrt(provinceCounts[province]) * 10000}
            color="blue"
            fillColor="blue"
            fillOpacity={0.4}
          >
            <Popup>
              <div>
                <strong>{province}</strong><br />
                Number of Hotels: {provinceCounts[province]}
              </div>
            </Popup>
          </Circle>
        )
      ))}
    </MapContainer>
  );
};

export default VietnamMap;
