import { Post } from "./Post";

export class PageablePost {
    posts : Post[];
    totalPages: number;
    pageNumber: number;
    pageSize: number;
}