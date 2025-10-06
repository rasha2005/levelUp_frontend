"use client"
import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect,useState } from "react";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "next/navigation";
import { createAnnouncement, createCourseSlot, delteSlotById, getCourseSlots } from "@/app/lib/api/instructorApi";
import Slot from "@/app/utils/interface/Slot";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";



export default function Course() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date , setDate] = useState("")
    const [slots , setSlots] = useState<Slot[]>([])
    const today = new Date().toISOString().split("T")[0]
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
    const [announcementTitle, setAnnouncementTitle] = useState("");
    const [announcementMessage, setAnnouncementMessage] = useState("");
    const [isDelete , setIsDelete] = useState(false);
    const [slotId , setSlotId] = useState("");
    const router = useRouter();



     const params = useParams()
     const slug = params.slug?.toString()

    const handleCreateSlot = async() => {
      const newErrors: { [key: string]: string } = {};

      if (!title.trim()) newErrors.title = "Slot title is required";
      if (!date) newErrors.date = "Date is required";
      if (!startTime) newErrors.startTime = "Start time is required";
      if (!endTime) newErrors.endTime = "End time is required";

      if (startTime && endTime) {
        if (startTime >= endTime) {
          newErrors.endTime = "Set a valid time";
        }
      }

      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) return;

      const data = await createCourseSlot(title , date,startTime , endTime,slug);
      if(data.data.response.success){
        toast.success(data.data.response.message)
        setSlots((prevSlots) => [...prevSlots, data.data.response.data]);
      }
     setIsOpen(false);
     setDate("");
     setEndTime('');
     setStartTime("");
     setTitle("")
    }

    const handleCreateAnnouncement = async() => {
      const newErrors: { [key: string]: string } = {};

      if (!announcementTitle.trim()) newErrors.title = "Title is required";
      if (!announcementMessage.trim()) newErrors.message = "Message is required";
    
      setErrors(newErrors);
    
      if (Object.keys(newErrors).length > 0) return;

      const data = await createAnnouncement(announcementTitle,announcementMessage ,slug);
      if(data.data.response.success) {
        toast.success(data.data.response.message);
      }

      setAnnouncementMessage("");
      setAnnouncementTitle("");
      setIsAnnouncementOpen(false);

    }

    const handleDeleteSlot = async() => {
      const data = await delteSlotById(slotId);
      if(data.data.response.success) {
        toast.success(data.data.response.message);
        setSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== slotId));
       
      }
      setIsDelete(false);
      setSlotId('');
    }

    const getBundleSlots = async() => {
      const data = await getCourseSlots(slug);
      if(data.data.response.sucess){
        setSlots(data.data.response.data)
      }
    }
     
    useEffect(() => {
        getBundleSlots()
    },[])
    return (
        <>
        <ToastContainer/>
         <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="flex">
      <Sidebar />
        
      <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold text-gray-800">Course Slots</h1>
            <div className="flex gap-3">
            <Button onClick={() => setIsOpen(true)}>+ Create Slot</Button>
            <Button onClick={() => setIsAnnouncementOpen(true)}>+ Add Announcement</Button>
          </div>          </div>
          <div className="w-full border border-gray-20">
          <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="text-center">Title</TableHead>
      <TableHead className="text-center">Date</TableHead>
      <TableHead className="text-center">Time</TableHead>
      <TableHead className="text-center">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {slots.length > 0 ? (
      slots.map((slot, index) => {
        const start = new Date(slot.startTime);
        const end = new Date(slot.endTime);
        const now = new Date();
        const fifteenMinutesBefore = new Date(start.getTime() - 15 * 60 * 1000);

        const formatDate = (d: Date) =>
          `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

        const formatTime12 = (d: Date) => {
          let hours = d.getHours();
          const minutes = d.getMinutes();
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;
          return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
        };

        const date = formatDate(start);
        const time = `${formatTime12(start)} - ${formatTime12(end)}`;

        let buttonText = "Upcoming";
        if (now >= fifteenMinutesBefore && now <= end) {
          buttonText = "Join";
        } else if (now > end) {
          buttonText = "Ended";
        }

        return (
          <TableRow key={index}>
            <TableCell className="text-center">{slot.title}</TableCell>
            <TableCell className="text-center">{date}</TableCell>
            <TableCell className="text-center">{time}</TableCell>
            <TableCell className="text-center">
            <div className="flex items-center justify-center gap-3">
    <button
      className={`px-3 py-1 rounded text-white ${
        buttonText === "Join"
          ? "bg-green-600 hover:bg-green-700"
          : buttonText === "Upcoming"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-red-500 cursor-not-allowed"
      }`}
      disabled={buttonText !== "Join"}
      onClick={() =>
        buttonText === "Join" &&
        router.push(`/instructor/room/${slot.roomId}`)
      }
    >
      {buttonText}
    </button>

    <Trash2
      size={15}
      className="text-red-600 cursor-pointer hover:scale-110 transition"
      onClick={() => {
        setIsDelete(true)
        setSlotId(slot.id)
      }}
    />
  </div>
           
 </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={4} className="text-center text-gray-500">
          No slots created yet.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>
        </div>
     
          </div>
      </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Slot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
  {/* Slot Title */}
  <div className="flex flex-col">
    <Input 
      placeholder="Slot Title" 
      value={title} 
      onChange={(e) => setTitle(e.target.value)} 
    />
    {errors.title && (
      <p className="text-red-500 text-xs mt-1">{errors.title}</p>
    )}
  </div>

  {/* Start and End Time */}
  <div className="flex flex-col gap-2">
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm">Start Time</label>
      <Input 
        type="time" 
        value={startTime} 
        onChange={(e) => setStartTime(e.target.value)} 
      />
      {errors.startTime && (
        <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
      )}
    </div>

    <div className="flex flex-col">
      <label className="text-gray-700 text-sm">End Time</label>
      <Input 
        type="time" 
        value={endTime} 
        onChange={(e) => setEndTime(e.target.value)} 
      />
      {errors.endTime && (
        <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
      )}
    </div>
  </div>

  {/* Date */}
  <div className="flex flex-col">
    <Input 
      type="date" 
      value={date} 
      onChange={(e) => setDate(e.target.value)}  
      min={today} 
    />
    {errors.date && (
      <p className="text-red-500 text-xs mt-1">{errors.date}</p>
    )}
  </div>
</div>


          <DialogFooter className="mt-6 flex gap-3">
            <Button onClick={handleCreateSlot}>Create</Button>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog open={isAnnouncementOpen} onOpenChange={setIsAnnouncementOpen}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Add Announcement</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 mt-4">
      <Input 
        placeholder="Title" 
        value={announcementTitle} 
        onChange={(e) => setAnnouncementTitle(e.target.value)} 
      />
       {errors.title && (
      <p className="text-red-500 text-xs mt-1">{errors.title}</p>
    )}
      <textarea
        placeholder="Message"
        value={announcementMessage}
        onChange={(e) => setAnnouncementMessage(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      />
       {errors.message && (
      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
    )}
    </div>
    <DialogFooter className="mt-6 flex gap-3">
      <Button onClick={handleCreateAnnouncement}>Send</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>



<AlertDialog open={isDelete} onOpenChange={setIsDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the slot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setIsDelete(false)
              setSlotId("")
              }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteSlot()}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </>
    )
} 