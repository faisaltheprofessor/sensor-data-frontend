"use client"
import React, { useState, useEffect } from 'react';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import Pagination from './pagination';

const SensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [links, setLinks] = useState({}); // Changed links to object
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Added state for total pages

  const [url, setUrl] = useState(`http://localhost:8000/sensors/data?limit=${limit}&page=${page}`);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSensorData(data.data);
      setLinks(data.links);
      setTotalPages(data.links.last ? Math.ceil(parseInt(data.links.last.split('page=')[1])) : 0); // Calculate total pages from last link
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
  }, [limit, page]); // Update data on limit or page change

  const updateTable = (limit: number, page: number) => {
    setLimit(limit);
    setPage(page);
    setUrl(`http://localhost:8000/sensors/data?limit=${limit}&page=${page}`);
    fetchSensorData();
  };

  return (
    <>
      <Table>
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

      <Pagination
        perPage={limit}
        totalPages={totalPages} // Pass totalPages as a prop
        currentPage={page} // Pass currentPage as a prop
        next={links.next}
        previous={links.prev}
        first={links.first}
        last={links.last}
        action={updateTable}
      />
    </>
  );
};

export default SensorData;
