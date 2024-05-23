"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { useState } from "react"
import { getCurrentDatetime } from "@/lib/utils"
import { Check, CheckCircle } from "lucide-react"

const FormSchema = z.object({
  sensorId: z
    .number({
      required_error: "Sensor ID is required",
    }),
  type: z
    .string({
      required_error: "Type is required",
    }),
  value: z
    .number({
      required_error: "Value is required",
    }),
  timestamp: z.string().min(1, { message: "Timestamp is requried" }).default(() => getCurrentDatetime()),
})

export function SensorDataForm( {afterSubmit}:{afterSubmit: CallableFunction} ) {
  const [currentDatetime, setCurrentDatetime] = useState(getCurrentDatetime());
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    const formData = new URLSearchParams();
    formData.append("sensorId", `${data.sensorId}`);
    formData.append("type", data.type);
    formData.append("value", `${data.value}`);

    const formattedTimestamp = data.timestamp.replace("T", " ");
    formData.append("timestamp", formattedTimestamp);

    try {
        const response = await fetch("http://localhost:8000/sensors/data", {
            method: "POST",
            headers,
            body: formData,
        });
        const responseData = await response.json();
        if(!responseData.success) {
        toast.error(responseData.error)
        return
        }
        afterSubmit()
        toast.success("Data stored successfully")
    } catch (error) {
      toast.error(`Server Unreachable`)
      console.log(error)
    }
}

  return (
    <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Sensor ID */}
        <FormField
          control={form.control}
          name="sensorId"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Sensor ID</FormLabel>
                <Input type="number" placeholder="Value" onChange={(e) => field.onChange(parseInt(e.target.value) || '')} className="w-full" />
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        
        {/* TYPE */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Temprature">Temprature</SelectItem>
                    <SelectItem value="Humidity">Humidity</SelectItem>
                    <SelectItem value="pH">pH</SelectItem>
                    <SelectItem value="Air Quality">Air Quality</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        {/* VALUE */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Value</FormLabel>
                <Input type="number" placeholder="Value" onChange={(e) => field.onChange(parseInt(e.target.value) || '')} className="w-full" />
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        {/* TIMESTAMP */}
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel>Timestamp</FormLabel>
                <Input type="datetime-local" defaultValue={currentDatetime} placeholder="yyyy-mm-ddTHH:mm:ss" onChange={(e) => field.onChange(e.target.value || '')} pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}" className="w-full" />
                <FormMessage />
              </FormItem>

            </>
          )}
        />

        <div className="flex justify-between">
          <div></div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>

    </>
  )
}
