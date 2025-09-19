export default interface QuestionFormValues {
    questionText: string;
    type: "mcq" | "truefalse";
    options: string[];
    answer: string;
  }