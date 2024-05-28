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

const FormSchema = z.object({
  sensorId: z
    .number({
      required_error: "required",
    }),
  type: z
    .string({
      required_error: "required",
    }),
  value: z
    .number({
      required_error: "required",
    }),
  timestamp: z.string().min(1, { message: "Timestamp is requried" }).default(() => getCurrentDatetime()),
})

export function SensorDataForm({ afterSubmit }: { afterSubmit: CallableFunction }) {
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
      if (!responseData.success) {
        toast.error(responseData.message)
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
                  <div className="flex gap-x-1 items-center">
                    <FormLabel>Sensor ID</FormLabel>
                    <FormMessage className="text-[12px]" />
                  </div>
                  <Input data-testid="sensor-id-input" type="number" placeholder="123" onChange={(e) => field.onChange(parseInt(e.target.value) || '')} className="w-full" />
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
                  <div className="flex gap-x-1 items-center">
                    <FormLabel>Type</FormLabel>
                    <FormMessage className="text-[12px]" />
                  </div>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl data-testid="select-type">
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
                  <div className="flex gap-x-1 items-center">
                    <FormLabel>Value</FormLabel>
                    <FormMessage className="text-[12px]" />
                  </div>
                  <Input data-testid="value-input" type="number" placeholder="123" onChange={(e) => field.onChange(parseInt(e.target.value) || '')} className="w-full" />
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
                  <Input data-testid="timestamp-input" type="datetime-local" step="1" defaultValue={currentDatetime} onChange={(e) => {
                    const newValue = e.target.value;
                    const newValueWithSeconds = newValue.length === 16 ? `${newValue}:00` : newValue;
                    field.onChange(newValueWithSeconds || '');
                  }}
                    className="w-full" />
                  <FormMessage className="text-xs" />
                </FormItem>

              </>
            )}
          />

          <div className="flex justify-between">
            <div></div>
            <Button data-testid="save-button" type="submit">Save</Button>
          </div>
        </form>
      </Form>

    </>
  )
}
