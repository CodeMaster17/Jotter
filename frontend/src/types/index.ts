export interface ILinkItems {
  id: string;
  linkedin: string;
  github: string;
  portfolio: string;
  resume: string;
}

export interface IAnswer {
  id: string;
  question: string;
  answer: string;
}

export interface IStorageData {
  profileData?: {
    linkedin: string;
    github: string;
    portfolio: string;
    resume: string;
  };
  answers?: Array<{
    question: string;
    answer: string;
  }>;
}

export interface ILinkItem{
    id: string;
    type: string;
    url: string;
}
