"use client"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SensorDataForm } from "./SensorDataForm"


export function FormDialogue({ triggerRerender }: { triggerRerender:CallableFunction }) {
  const closeDialog = () => {
    document.getElementById('closeDialog')?.click();
    triggerRerender();
  }
  return (
    <Dialog>
    <DialogTrigger asChild id="closeDialog">
      <Button variant="outline">Create</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
          e.preventDefault();
        }}>
      <DialogHeader>
        <DialogTitle>Store sensor data</DialogTitle>
        <DialogDescription>
          Enter sensor data manually and hit save to store it in the database.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <SensorDataForm afterSubmit={closeDialog} />
      </div>
    </DialogContent>
  </Dialog>
  )
}
