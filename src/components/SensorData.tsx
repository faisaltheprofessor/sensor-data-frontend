"use client"
import React, { useState, useEffect } from 'react'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table'
import Pagination from './pagination'
import { Separator } from './ui/separator'
import { toast } from 'sonner'

interface SensorDataProps {
  sensorId: string
  type: string
  value: number
  timestamp: string
}

interface LinksProps {
  first: string;
  last: string;
  next: string;
  prev: string;
}

const SensorData = ({ shouldRerender }: { shouldRerender : boolean }) => {
  const [sensorData, setSensorData] = useState<SensorDataProps[]>([])
  const [links, setLinks] = useState<LinksProps>({
    first: '',
    last: '',
    next: '',
    prev: '',
  });
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const indexNumber = (page - 1) * limit + 1 // for Table row count
  const [url, setUrl] = useState(`http://localhost:8000/sensors/data?limit=${limit}&page=${page}&desc=true`)

  const fetchSensorData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setSensorData(data.data)
      setLinks(data.links)
      setTotalPages(data.links.last ? Math.ceil(parseInt(data.links.last.split('page=')[1])) : 0)
    } catch (error) {
      toast.error(<><h1 className='font-bold'>Server Unreachable: </h1><p>{ `${ error }` }</p></>)
      return
    }
  }

  useEffect(() => {
    fetchSensorData() // Initial fetch

    const interval = setInterval(() => {
      fetchSensorData()
    }, 5000) // Update every five second (adjust the time interval as needed)

    return () => clearInterval(interval) // Cleanup the interval on component unmount
  }, [limit, page, shouldRerender]) // Update data on limit or page change

  const updateTable = (limit: number, page: number) => {
    setLimit(limit)
    setPage(page)
    setUrl(`http://localhost:8000/sensors/data?limit=${limit}&page=${page}&desc=true`)
    fetchSensorData()
  }

  return (
  
    <>
      <Table>
        <TableHeader>
          <TableRow>
          <TableHead>#</TableHead>
            <TableHead>Sensor ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sensorData.map((sensor, index) => (
            <TableRow key={sensor.sensorId}>
              <TableCell>{indexNumber + index}</TableCell>
              <TableCell>{sensor.sensorId}</TableCell>
              <TableCell>{sensor.type}</TableCell>
              <TableCell>{sensor.value}</TableCell>
              <TableCell>{sensor.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        <Separator />
      <Pagination
        perPage={limit}
        totalPages={totalPages}
        currentPage={page}
        next={links.next}
        previous={links.prev}
        first={links.first}
        last={links.last}
        action={updateTable}
      />
    </>
  )
}

export default SensorData
