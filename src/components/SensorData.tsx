"use client"
import React, { useState, useEffect } from 'react';
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const fetchSensorData = async () => {
    try {
      const response = await fetch('http://localhost:8000/sensors/data');

      if (response.type === 'opaque') {
        const headers = new Headers(response.headers);
        console.log('Response Headers:', headers);
      } else {
        const data = await response.json();
        setSensorData(data.data);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };


  useEffect(() => {
    fetchSensorData(); // Initial fetch

  const interval = setInterval(() => {
      fetchSensorData();
    }, 5000); // Update every five second (adjust the time interval as needed)

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);


  return (
    <Table>
      <TableCaption>A list of sensor data records.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sensor ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sensorData.map((sensor) => (
          <TableRow key={sensor.sensorId}>
            <TableCell>{sensor.sensorId}</TableCell>
            <TableCell>{sensor.type}</TableCell>
            <TableCell>{sensor.value}</TableCell>
            <TableCell>{sensor.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SensorData;
