"use client"
import { useState, useEffect } from 'react'
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from './ui/table'
import Pagination from './Pagination'
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

const SensorData = ({ shouldRerender }: { shouldRerender: boolean }) => {
  const [tabActive, setTabActive] = useState(!document.hidden)
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
      toast.error(`Server Unreachable: ${error}`)
      return
    }
  }

  const handleVisibilityChange = () => {
    setTabActive(!document.hidden);
  };

  const fetchSensorDataIfTabActive = async () => {
    if (tabActive) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSensorData(data.data);
        setLinks(data.links);
        setTotalPages(data.links.last ? Math.ceil(parseInt(data.links.last.split('page=')[1])) : 0);
      } catch (error) {
        toast.error(`Server Unreachable: ${error}`);
      }
    }
  };


  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    fetchSensorDataIfTabActive(); // Initial fetch

    const interval = setInterval(() => {
      fetchSensorDataIfTabActive()
    }, 5000) // Update every five second (adjust the time interval as needed)

    return () => clearInterval(interval) // Cleanup the interval on component unmount
  }, [limit, page, shouldRerender, tabActive]) // Update data on these changes

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
          {sensorData.length === 0 ? (
            <TableRow className='bg-zinc-100 text-slate-500 dark:bg-gray-800 text-center'>
              <TableCell colSpan={5}>No records</TableCell>
            </TableRow>
          ) : (
            <>
              {sensorData.map((sensor, index) => (
                <TableRow key={sensor.sensorId}>
                  <TableCell>{indexNumber + index}</TableCell>
                  <TableCell>{sensor.sensorId}</TableCell>
                  <TableCell>{sensor.type}</TableCell>
                  <TableCell>{sensor.value}</TableCell>
                  <TableCell>{sensor.timestamp}</TableCell>
                </TableRow>
              ))}
            </>
          )}
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
