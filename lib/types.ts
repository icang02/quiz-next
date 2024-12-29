export type Attempt = {
  id: number;
  user_name: string;
  package_id: number;
  start_time: string;
  end_time: string;
  score: number;
  package: Package;
};

export type Package = {
  id: number;
  name: string;
  slug: string;
  description: string;
  questions: Question[];
};

export type Answer = {
  id: number;
  answer: string;
};

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

// STATE
export type UseNumberQuestion = {
  numberQuestion: number;
  setNumberQuestion: (value: number) => void;
};
