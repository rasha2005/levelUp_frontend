"use client";

import React, { useState, useEffect } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteEvent, getSessionData, sessionUpdate } from "@/app/lib/api/instructorApi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Switch } from "../ui/switch";

interface InstructorData {
  id?:string;
  name:string;
  email:string;
  mobile:string;
  description?:string;
  experience?:string;
  resume?:string;
  category?:string;
  isApproved?:boolean;

}

function CalenderEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [newEventPrice , setNewEventPrice] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [eventToDelete, setEventToDelete] = useState<EventApi | null>(null);
  const [instructor , setInstructor] = useState<InstructorData>();
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<"daily"|"weekly" | "monthly">("daily");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState<string>(""); 

const router = useRouter()



const getEvents = async()=> {
  const data = await getSessionData();
   setInstructor(data.data.response?.instructor);
  if(data.data.response?.events?.events){

    const transformedEvents: EventInput[] = data.data.response.events.events.map((event: EventApi) => ({
        id: event.id,
        title: event.title,
        start: event.start, 
        end: event.end, 
        allDay: event.allDay || false, 
        // price: event.price, 
      }));
      setCurrentEvents(transformedEvents);
  }
}

  useEffect(() => {
    getEvents();
  },[isDialogOpen]);

  const handleDateClick = (selected : DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
   setEventToDelete(selected.event);
   setIsDeleteDialogOpen(true)
  }

  const handleDeleteEvent = async(event:EventApi | null) => {
    if (!event) return;
    const id = event.id
    const res = await deleteEvent(id);
    if(res.data.response.success) {
      setIsDeleteDialogOpen(false);
      setEventToDelete(null);
      getEvents();
    }
  }
  function formatUntilDate(dateString: string) {
    const date = new Date(dateString);
    const iso = date.toISOString();
    return iso.replace(/[-:]/g, "").split(".")[0] + "Z";
  }
  

  const handleAddEvent = async(e:React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate && newEventPrice) {
      const calenderApi = selectedDate.view.calendar;
      calenderApi.unselect();
  
      // Creating a FullCalendar-compatible event object
      const newEvent = {
        // id: `${selectedDate?.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        price: newEventPrice,
        start: selectedDate.start.toISOString(),
        end: selectedDate.end?.toISOString(),
        allDay: selectedDate?.allDay,
        isRecurring,
        recurrenceRule: isRecurring
        ? `FREQ=${recurrenceFrequency.toUpperCase()};UNTIL=${formatUntilDate(recurrenceEndDate)}`
        : null,

        
      };
  
      try {
        const res = await sessionUpdate(newEvent);
  
        calenderApi.addEvent(newEvent);
        
       
        
  
      } catch (err) {
        console.log(err);
      }
  
      handleCloseDialog();
    }
  }
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle('');
    setNewEventPrice('');
    setRecurrenceEndDate('');
    setRecurrenceFrequency('daily');
    router.refresh()
  }
    return (
        <>
        {
          instructor?.isApproved ? (
       <div  className="flex w-full h-full">
        <div className="flex-1 bg-[#f9f8f6] rounded-md shadow-md p-4"> 

            <FullCalendar 
            height={"85vh"}
            plugins={[dayGridPlugin , timeGridPlugin , interactionPlugin]}
            headerToolbar={{left:"prev next today" ,center:"title" , right:"dayGridMonth timeGridWeek timeGridDay"}}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={(info) => {
              const now = new Date(); // Current date and time
              const selectedDate = new Date(info.start); // Selected date from the calendar
        
              // Check if the selected date is before the current date
              if (selectedDate < now) {
                const calendarApi = info.view.calendar;
                calendarApi.unselect(); // Explicitly unselect invalid selections
                return;
              }
        
              handleDateClick(info); // Proceed with valid dates
            }}
            eventClick={handleEventClick}
            events={currentEvents}
            // validRange={{
            //   start: new Date().toISOString().split("T")[0], 
            // }}
            />
        </div>
       </div>
          ):(
            <p>you are not approved by the admin</p>
          )
        }

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Event Details</DialogTitle>
    </DialogHeader>
    <form className="space-y-4 mb-4" onSubmit={handleAddEvent}>
      <div>
        <input
          type="text"
          placeholder="Event Title"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          required
          className="border border-gray-200 p-3 rounded-md text-lg w-full"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Price"
          value={newEventPrice}
          onChange={(e) => {
            let value = e.target.value;
          
            // Prevent input beyond 3000
            if (value && Number(value) > 3000) {
              value = "3000";
            }
          
            setNewEventPrice(value); // Always set as a string
          }}
          
          required
          className="border border-gray-200 p-3 rounded-md text-lg w-full"
        />
        { Number(newEventPrice)  > 3000 && (
    <p className="text-red-500 text-sm">Price cannot exceed 3000.</p>
  )}
      </div>
      <div className="flex items-center space-x-2">
  <Switch
    checked={isRecurring}
    onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
  />
  <label className="text-sm font-medium">Repeat this event?</label>
</div>

{isRecurring && (
  <div className="space-y-4 mt-4 border p-3 rounded-md bg-gray-50">
    {/* Frequency selector */}
    <div>
      <label className="block text-sm font-medium mb-1">Frequency</label>
      <select
        value={recurrenceFrequency}
        onChange={(e) => setRecurrenceFrequency(e.target.value as "weekly" | "monthly")}
        className="border border-gray-200 p-2 rounded w-full"
      >
        <option value="weekly">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>

    {/* End date picker */}
    <div>
  <label className="block text-sm font-medium mb-1">End Date</label>
  <input
    type="date"
    value={recurrenceEndDate}
    onChange={(e) => setRecurrenceEndDate(e.target.value)}
    min={new Date().toISOString().split("T")[0]} // disables past dates
    className="border border-gray-200 p-2 rounded w-full"
  />
</div>

  </div>
)}

      <button
        className="bg-green-500 text-white p-3 mt-5 rounded-md w-full disabled:opacity-50"
        type="submit"
        disabled={!newEventTitle || !newEventPrice}
      >
        Add
      </button>
    </form>
  </DialogContent>
</Dialog>

<AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                                    {/* <AlertDialogTrigger asChild>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleDeleteClick(eventToDelete)}
                                        >
                                            Delete
                                        </button>
                                    </AlertDialogTrigger> */}

                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete this event? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <button
                                                onClick={() => setIsDeleteDialogOpen(false)}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleDeleteEvent(eventToDelete)}
                                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                            >
                                                Delete
                                            </button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

        </>
    )
}

export default CalenderEvent;