import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public readonly defaultDialogStyles = { "max-height": "calc(100vh - 120px)", "overflow": "auto", "background-color": "transparent", "padding": "0px" };
  public readonly emailRegex: RegExp = /(.+)@(.+){2,}\.(.+){2,}/;
  public readonly passwordMinLength: number = 6;
  public readonly nameMinLength: number = 3;
  public readonly maleAvatarUrl = '/assets/images/male-avatar.svg'
  public readonly femaleAvatarUrl = '/assets/images/female-avatar.svg';

  public readonly maxLengths = {
    title: 500,
    name: 100,
    email: 100,
    password: 100,
    description: 1000,
    code: 10000,
    comment: 1000,
    tag: 100,
    language: 100,
    tagsPerSnippet: 10,
  } as const;

  private languageExtensions: { [key: string]: string[] } = {
    "html": ['html', 'htm'],
    "xml": ['xml'],
    "json": ['json'],
    "javascript": ['js'],
    "typescript": ['ts'],
    "css": ['css'],
    "scss": ['scss', 'sass'],
    "markdown": ['md'],
    "sql": ['sql'],
    "python": ['py'],
    "c#": ['cs'],
    "c++": ['cpp', 'h', 'hpp'],
    "java": ['java'],
    "ruby": ['rb'],
    "php": ['php'],
    "go": ['go'],
    "rust": ['rs'],
    "swift": ['swift'],
    "perl": ['pl'],
    "matlab": ['m'],
    "r": ['r'],
    "shell": ['sh'],
    "powershell": ['ps1'],
    "lua": ['lua'],
    "objective-c": ['m', 'mm'],
    "kotlin": ['kt'],
    "dart": ['dart'],
    "haskell": ['hs'],
    "coffeescript": ['coffee'],
  };

  public getLanguageByExtension(extension: string): string | null {
    extension = extension.toLowerCase();
    for (const language in this.languageExtensions) {
      if (this.languageExtensions[language].includes(extension)) {
        return language;
      }
    }
    return null;
  }
}
