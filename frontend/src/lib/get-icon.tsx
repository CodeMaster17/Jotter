import {
  FileText,
  Github,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";

export const getLinkIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "github":
      return <Github className="w-5 h-5" />;
    case "linkedin":
      return <Linkedin className="w-5 h-5" />;
    case "resume":
      return <FileText className="w-5 h-5" />;
    default:
      return <LinkIcon className="w-5 h-5" />;
  }
};
