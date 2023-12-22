import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ConfigService } from 'src/app/services/config.service';
import { SnippetService } from 'src/app/services/snippet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-snippet',
  templateUrl: './create-snippet.component.html',
  styleUrls: ['./create-snippet.component.scss']
})
export class CreateSnippetComponent implements OnInit, OnDestroy {

  public loading = false;
  public languageList: { id: string; name: string }[] = [];
  protected errorMessage = '';
  protected submitted = false;
  protected defaultTitle = `Untitled - ${new Date().toLocaleString()}`;
  private subs: Subscription = new Subscription();
  protected languageFormatDetected = false;

  public snippetForm = new FormGroup({
    title: new FormControl('', [Validators.maxLength(this.config.maxLengths.title)]),
    code: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.maxLength(this.config.maxLengths.description)]),
    language: new FormControl('plaintext', [Validators.required, Validators.maxLength(this.config.maxLengths.language)]),
    tags: new FormControl<string[]>([], [Validators.maxLength(this.config.maxLengths.tagsPerSnippet)]),
    public: new FormControl(true),
    createdBy: new FormControl(this.user.authUser$.value?.userId),
  })

  constructor(
    public ref: DynamicDialogRef,
    private common: CommonService,
    protected config: ConfigService,
    private user: UserService,
    private snippet: SnippetService
  ) { }

  ngOnInit(): void {
    this.common.getLanguages().subscribe((res: any) => {
      this.languageList = res;
    });
    this.subs.add(this.snippetForm.get('title')?.valueChanges.subscribe((res: any) => {
      if (res && !this.snippetForm.get('language')?.dirty) {
        const extension = this.snippetForm.get('title')?.value?.split('.').at(-1) || '';
        const language = this.config.getLanguageByExtension(extension);
        if (!language || !this.languageList.find(l => l.id === language)) return;
        this.snippetForm.patchValue({ language });
        this.languageFormatDetected = true;
      }
    }))
  }

  protected close() {
    this.ref.close();
  }

  protected onSave() {
    console.log(this.snippetForm.value);
    this.submitted = true;
    if (this.snippetForm.invalid) {
      this.errorMessage = 'Add some code to save';
      return;
    }
    if (!this.snippetForm.get('title')?.value) {
      this.snippetForm.patchValue({ title: this.defaultTitle });
    }
    this.loading = true;
    const formData = new FormData();
    const codeFile: Blob = new File([this.snippetForm.value.code!], this.snippetForm.value.title!, { type: 'text/plain' });
    formData.append('body', JSON.stringify({ ...this.snippetForm.value, code: undefined }));
    formData.append('code', codeFile);
    this.snippet.snippetPostAsync(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.common.showSuccess('Snippet created successfully');
        this.snippet.triggerRefreshSnippets();
        this.ref.close(res);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = this.common.getErrorMessages(err).join(', ');
      }
    })
  }

  protected languageChange(language: string) {
    this.snippetForm.patchValue({ language });
  }

  protected onTagAdd(tag: string) {
    if (!tag?.trim()) return;
    if (this.snippetForm.get('tags')?.value?.includes(tag)) return;
    const tags = this.snippetForm.get('tags')?.value || [];
    tags.push(tag.trim());
    this.snippetForm.patchValue({ tags });
  }

  protected onTagRemove(tag: string) {
    const tags = this.snippetForm.get('tags')?.value || [];
    const index = tags.indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1);
    }
    this.snippetForm.patchValue({ tags });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected togglePublic(val: boolean) {
    this.snippetForm.patchValue({ public: val });
  }

}
