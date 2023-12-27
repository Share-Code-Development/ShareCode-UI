import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISnippet } from '@app/models/snippet.interface';
import { CommonService } from '@app/services/common.service';
import { SnippetService } from '@app/services/snippet.service';

@Component({
  selector: 'app-view-snippet',
  templateUrl: './view-snippet.component.html',
  styleUrl: './view-snippet.component.scss'
})
export class ViewSnippetComponent implements OnInit {

  private codeId: string = '';
  public codeDetails: ISnippet | null = {
    code: `console.log('hello world')`,
    comments: [],
    copies: 0,
    createdAt: new Date(),
    createdBy: '',
    isPublic: true,
    likes: [],
    tags: [],
    views: 0,
    language: 'javascript',
    summary: 'Lorem ipsum dolor sit consectetur quos.',
    title: 'Hello World',
  };

  constructor(
    private route: ActivatedRoute,
    private snippetService: SnippetService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.codeId = this.route.snapshot.params['id'];
    if (this.codeId) {
      const loader = this.commonService.showLoading();
      this.snippetService.getByIdAsync(this.codeId).subscribe({
        next: (res) => {
          this.codeDetails = res;
          loader.stop();
        },
        error: (err: any) => {
          loader.error(err);
        }
      })
    }
  }

}
