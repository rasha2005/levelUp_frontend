"use client"


import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/instructor/Navbar";
import Sidebar from "@/components/instructor/Sidebar";
import QuestionFormValues from "@/app/utils/interface/QuestionForm";
import { useParams } from "next/navigation";
import { createQusetion, deleteQuestion, edit_Question, getBundleQuestions } from "@/app/lib/api/instructorApi";
import Question from "@/app/utils/interface/Question";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




export default  function QuestionPage() {
    const params = useParams()
    const slug = params.slug?.toString()
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, control, watch, formState: { errors }, setValue , reset } =
    useForm<QuestionFormValues>({
      defaultValues: {
        questionText: "",
        type: "mcq",
        options: ["", "", "", ""],
        answer: "",
      },
      mode: "onChange",
      shouldUnregister: true
    });

  const type = watch("type");
  const options = watch("options");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [openDelete , SetOpenDelete] = useState(false)
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const [isEdit , setIsEdit] = useState(false)
  const [text, setText] = useState("");
  const [ansOptions, setAnsOptions] = useState<string[]>(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);


  const getQusetions = async() => {
    const data = await getBundleQuestions(slug)
    if(data.data.response.data) {
      setQuestions(data.data.response.data);
    }
  }
  const handleEditClick = (q: Question) => {
  setSelectedQuestion(q);
  setAnsOptions(q.options || ["", "", "", ""]);
  setAnswer(q.answer);
  setText(q.text)
  setIsEdit(true);
};
  const handleDelete = (id:string) => {
    SetOpenDelete(true)
    setDeleteQuestionId(id)
  }
  const handleDeleteQuestion = async() => {
    const data = await deleteQuestion(deleteQuestionId);
    if(data.data.response.success){
      toast.success(data.data.response.message);
    }else{
      toast.error(data.data.response.message);
    }
    setQuestions(prev => prev.filter(q => q.id !== deleteQuestionId));
    setDeleteQuestionId("");
    SetOpenDelete(false)

  }

  const handleSave = async() => {
    const data = await edit_Question(selectedQuestion?.id , ansOptions,answer,text);
    if(data.data.response.success) {
      toast.success(data.data.response.message);
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === selectedQuestion?.id
            ? {
                ...q,
                text,
                answer,
                options: ansOptions,
              }
            : q
        )
      );
    }else{
      toast.error(data.data.response.message);
    }
    setSelectedQuestion(null)
    setAnsOptions(["" , "" , "" , ""]);
    setAnswer("");
    setText("");
    setIsEdit(false)
  }

  const onSubmit = async(data: QuestionFormValues) => {
    const res = await createQusetion(data , slug);
    if(res.data.response.data){
      setQuestions((prev) => [...prev, res.data.response.data])
    }
    // Reset form
    setValue("options", ["", "", "", ""]);
    setValue("questionText", "");
    setValue("type", "mcq");
    setValue("answer", "");
    setIsOpen(false);
  };

  useEffect(() => {
   getQusetions()
  },[])
  return (
    <>
      <ToastContainer/>

    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Manage all questions for this bundle.</p>
            </div>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>

          {/* Questions grid */}
          {questions.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {questions.map((q,i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
                  <h2 className="text-base font-semibold line-clamp-2 mb-3">{q.text}</h2>
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary">{q.type}</Badge>
                    <span className="text-gray-500">
                        {q.type === "mcq" ? "4 options" : "2 options"}
                      </span>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                 
                    <button
                      onClick={() => handleEditClick(q)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No questions yet.</p>
            </div>
          )}

          {/* Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create Question</DialogTitle>
                <DialogDescription>Fill in the details below to add a new question.</DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Question text */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="questionText">Question</Label>
                  <Textarea
                    id="questionText"
                    placeholder="Enter your question"
                    {...register("questionText", { required: "Question is required" })}
                  />
                  {errors.questionText && (
                    <span className="text-red-500 text-sm">{errors.questionText.message}</span>
                  )}
                </div>

                {/* Question type */}
                <div className="flex flex-col gap-1">
                  <Label>Type</Label>
                  <Controller
                    control={control}
                    name="type"
                    rules={{ required: "Question type is required" }}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="truefalse">True / False</SelectItem>
                          <SelectItem value="mcq">Multiple Choice</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                </div>

                {/* Options (only if MCQ) */}
                {type === "mcq" && (
                  <div className="grid gap-2">
                    {(options || ["", "", "", ""]).map((opt, idx) => (
                      <div key={idx} className="flex flex-col gap-1">
                        <Input
                          placeholder={`Option ${idx + 1}`}
                          {...register(`options.${idx}`, { required: "Option is required" })}
                        />
                        {errors.options?.[idx] && (
                          <span className="text-red-500 text-sm">{errors.options[idx]?.message}</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Correct answer */}
                <div className="flex flex-col gap-1">
  <Label>Correct Answer</Label>

  {type === "truefalse" ? (
    <Controller
    control={control}
    name="answer"
    // 👇 don’t set rules when it’s true/false
    rules={type !== "truefalse" ? { required: "Answer is required" } : {}}
    render={({ field }) => (
      <Select
        value={field.value ?? ""}
        onValueChange={field.onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select True or False" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="True">True</SelectItem>
          <SelectItem value="False">False</SelectItem>
        </SelectContent>
      </Select>
    )}
  />

 
) : (
  <Input
    placeholder="Enter correct answer"
    {...register("answer", { required: "Answer is required" })}
  />
)}

{type !== "truefalse" && errors.answer && (
  <span className="text-red-500 text-sm">{errors.answer.message}</span>
)}

</div>

                <DialogFooter className="mt-6 flex gap-3">
                  
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <AlertDialog open={openDelete} >
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
                                                          Are you sure you want to delete this question? This action cannot be undone.
                                                      </AlertDialogDescription>
                                                  </AlertDialogHeader>
                                                  <AlertDialogFooter>
                                                  <button
                                                          onClick={ () => SetOpenDelete(false)}
                                                          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 ml-2"
                                                      >
                                                          Cancel
                                                      </button>
                                                      <button
                                                          onClick={ handleDeleteQuestion}
                                                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
                                                      >
                                                          Delete
                                                      </button>
                                                  </AlertDialogFooter>
                                              </AlertDialogContent>
                                          </AlertDialog>
                                          
                                          <Dialog open={isEdit} onOpenChange={setIsEdit}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>Update the details below and save changes.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Question text */}
          <div className="flex flex-col gap-1">
            <Label>Question</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your question"
            />
          </div>

       
            <>
             

              {/* Options for MCQ */}
              {ansOptions.map((opt, idx) => (
              <Input
                key={idx}
                value={opt}
                onChange={(e) => {
                  const newOptions = [...ansOptions]; 
                  newOptions[idx] = e.target.value;
                  setAnsOptions(newOptions);
                }}
                placeholder={`Option ${idx + 1}`}
              />
            ))}


              {/* Correct answer */}
              <div className="flex flex-col gap-1">
                <Label>Correct Answer</Label>
                <Input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter correct answer"
                />
              </div>
            </>
          

          <DialogFooter className="mt-6 flex gap-3">
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
                  
        </main>
      </div>
    </div>
    </>

  );
}
