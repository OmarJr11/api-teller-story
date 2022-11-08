import { FileModel } from "./file.interface";

export interface Story {
  id: number;
  title: string;
  text: string;
  creationDate: string;
  like: number;
  file: FileModel;
  comments?: Comment[];
  //creator?: User,
}

export interface Comment {
  id: number;
  idStory?: number;
  text: string;
  creationDate: string;
  //creator?: User,
}
