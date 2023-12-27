import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  private _errorMessage = '';
  protected get errorMessage() {
    return this._errorMessage;
  }
  protected set errorMessage(value) {
    this._errorMessage = value;
    if (value && !this.isPopup) {
      this.common.showError(value);
    }
  }
  protected submitted = false;
  protected defaultTitle = `Untitled - ${new Date().toLocaleString()}`;
  private subs: Subscription = new Subscription();
  protected languageFormatDetected = false;
  private ref: DynamicDialogRef | null;
  public isPopup = false;
  public navBarHeight = 0;
  public isAnonymous = !this.user.isLoggedIn;

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
    private common: CommonService,
    protected config: ConfigService,
    private user: UserService,
    private snippet: SnippetService,
    private router: Router,
    injector: Injector
  ) {
    this.ref = injector.get(DynamicDialogRef, null); // Get the ref from the injector if the component is opened as a dialog
    this.isPopup = !!this.ref;
    if (!this.isPopup) {
      const state: any = this.router.lastSuccessfulNavigation?.extras?.state;
      if (state) {
        this.snippetForm.patchValue(state);
      }
    }
  }

  ngOnInit(): void {

    this.navBarHeight = document.getElementById('mainNavbar')?.offsetHeight || 0;
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
    this.ref?.close();
  }

  protected onSave() {
    this.submitted = true;
    if (this.snippetForm.invalid || !this.snippetForm.get('code')?.value?.trim()) {
      this.errorMessage = 'Add some code to save';
      return;
    }
    if (!this.snippetForm.get('title')?.value) {
    }
    this.loading = true;
    const newTitle = this.snippetForm.value.title || this.defaultTitle;
    const formData = new FormData();
    const codeFile: Blob = new File([this.snippetForm.value.code!], newTitle, { type: 'text/plain' });
    formData.append('body', JSON.stringify({
      ...this.snippetForm.value,
      title: newTitle,
      code: undefined
    }));
    formData.append('code', codeFile);
    this.snippet.snippetPostAsync(formData, { public: this.isAnonymous }).subscribe({
      next: (res) => {
        this.loading = false;
        this.common.showSuccess('Snippet created successfully');
        this.errorMessage = '';
        if (this.isPopup) {
          this.snippet.triggerRefreshSnippets();
          this.close();
          return;
        } else {
          this.router.navigate(['/code', res.snippetId]);
        }
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

  public maximize() {
    this.router.navigate(['/code', 'create'], {
      state: structuredClone(this.snippetForm.value)
    }).then(() => {
      this.close();
    })
  }



}
