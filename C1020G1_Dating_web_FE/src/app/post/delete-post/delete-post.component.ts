import {Component, Input, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  @Input() public idDelete: number;

  constructor(public postService: PostService) { }
  ngOnInit(): void {
  }
  deletePost(){
    this.postService.deletePost(this.idDelete).subscribe(data => {
      this.postService.deletePostFE(this.idDelete);
    });
  }
}
