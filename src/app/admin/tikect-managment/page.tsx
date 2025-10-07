"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Badge } from "@/components/ui/badge";
  import { Input } from "@/components/ui/input";
  import { Eye } from "lucide-react"
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
import { getTickets, updateStatus } from "@/app/lib/api/adminApi";
import { useEffect, useState } from "react";
import { Ticket } from "@/app/utils/interface/Ticket";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


export default function TicketManagment() {
      const [tickets, setTickets] = useState<Ticket[]>([]);
      const [search, setSearch] = useState("");
      const [debouncedSearch, setDebouncedSearch] = useState(search);
      const [page, setPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
      const limit = 15;

    const fetchTicketData = async() => {
        const data = await getTickets(debouncedSearch , page , limit );
        if(data.data.response.success){
          setTotalPages(Math.ceil(data.data.response.total / limit));
            setTickets(data.data.response.ticket)
        }
    }

    const updateTickedStatus = async(ticketId:string , status:string) => {
        const data = await updateStatus(status , ticketId);
        if(data.data.response.success){
            toast.success(data.data.response.message)
            setTickets((prevTickets) =>
                prevTickets.map((ticket) =>
                  ticket.id === ticketId ? { ...ticket, status } : ticket
                )
              );
        }else{
            toast.error(data.data.response.message)
        }
    }
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearch(search);
        }, 400);
        return () => clearTimeout(handler);
      }, [search]);

    useEffect(() => {
        fetchTicketData()
    },[debouncedSearch , page ])
    return (
        <>
                  <ToastContainer />
        
        <div className="h-screen flex flex-col bg-gray-50">
        {/* Navbar */}
        <div className="w-full">
          <Navbar />
        </div>
      
        {/* Main content with sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-[250px] bg-white border-r">
            <Sidebar />
          </div>
      
          {/* Main content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-semibold">Ticket Management</h2>
              <Input
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
            </div>
      
            <div className="bg-white rounded-2xl shadow-md p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Name</TableHead>
                    <TableHead>User Email</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets?.length > 0 ? (
                    tickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.userName}</TableCell>
                        <TableCell>{ticket.userEmail}</TableCell>
                        <TableCell>{ticket.instructorName}</TableCell>
                        <TableCell>{ticket.courseName}</TableCell>
                        <TableCell className="capitalize">
                        {ticket.status === "pending" && (
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                            Pending
                            </span>
                        )}
                        {ticket.status === "in_progress" && (
                            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                            In Progress
                            </span>
                        )}
                        {ticket.status === "rejected" && (
                            <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-sm font-medium">
                            Rejected
                            </span>
                        )}
                        {ticket.status === "resolved" && (
                            <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                            Resolved
                            </span>
                        )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                        <Dialog>
    <DialogTrigger asChild>
    <Button variant="ghost" size="sm" className="hover:bg-gray-100">
        <Eye className="h-4 w-4 mr-1" />
        View
      </Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Ticket Details</DialogTitle>
        <DialogDescription>
          Review the report submitted by the user.
        </DialogDescription>
      </DialogHeader>

      <div className="mt-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Description</h3>
          <p className="text-gray-600 mt-1 whitespace-pre-wrap">
            {ticket.description || "No description provided."}
          </p>
        </div>

        {ticket.attachments ? (
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Attachment</h3>
            <a
              href={ticket.attachments}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Attachment
            </a>
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">
            No attachments provided.
          </p>
        )}
      </div>
    </DialogContent>
  </Dialog>
                        {ticket.status === "pending" && (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => updateTickedStatus(ticket.id, "in_progress")}
      >
        Accept
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => updateTickedStatus(ticket.id, "rejected")}
      >
        Reject
      </Button>
    </>
  )}

  {ticket.status === "in_progress" && (
    <Button
      variant="default"
      size="sm"
      onClick={() => updateTickedStatus(ticket.id, "resolved")}
    >
      Resolve
    </Button>
  )}

  {ticket.status === "rejected" && (
    <span className="text-gray-500 text-sm italic"></span>
  )}

  {ticket.status === "resolved" && (
    <span className="text-green-600 text-sm font-medium"></span>
  )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-gray-500 py-6"
                      >
                        No tickets found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex justify-center mt-4 gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? "bg-gray-200" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}