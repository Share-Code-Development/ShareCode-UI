import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnInit {

  public loading = false;
  public languageList: { id: string; name: string }[] = [];

  public snippetForm = new FormGroup({
    title: new FormControl('', [Validators.maxLength(this.config.maxLengths.title)]),
    code: new FormControl('', [Validators.required, Validators.maxLength(this.config.maxLengths.code)]),
    summary: new FormControl('', [Validators.maxLength(this.config.maxLengths.description)]),
    language: new FormControl('plaintext', [Validators.required, Validators.maxLength(this.config.maxLengths.language)]),
    tags: new FormControl<string[]>([]),
    isPublic: new FormControl(false),
    createdBy: new FormControl(this.user.authUser$.value?._id),
  })

  constructor(
    public ref: DynamicDialogRef,
    private common: CommonService,
    private config: ConfigService,
    private user: UserService
  ) { }

  public content = ``;

  onCodeChanged(value: any) {
  }

  ngOnInit(): void {
    this.common.getLanguages().subscribe((res: any) => {
      this.languageList = res;
    });
  }

  protected close() {
    this.ref.close();
  }

  protected onSave() {
    console.log(this.snippetForm.value);
  }

  protected languageChange(language: string) {
    this.snippetForm.patchValue({ language }, { emitEvent: false });
  }

}
