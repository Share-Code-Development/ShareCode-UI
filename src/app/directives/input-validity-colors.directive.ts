import { Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[InputValidityColors]'
})
export class InputValidityDirective implements OnInit, OnDestroy, OnChanges {

  @HostBinding('class') private classList = '';
  @Input() public submitted!: boolean;
  @Input() public classPrefix: string = 'input';
  private subscription!: Subscription | undefined;

  constructor(
    private control: NgControl
  ) { }

  ngOnInit(): void {
    this.subscription = this.control.control?.statusChanges.subscribe((status) => {
      if (this.submitted !== undefined && !this.submitted) return;
      if (status === 'INVALID') {
        this.classList = this.getClassName(true);
      } else {
        this.classList = this.getClassName();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitted'] && changes['submitted'].currentValue) {
      if (this.control.control?.invalid) {
        this.classList = this.getClassName(true);
      } else {
        this.classList = this.getClassName();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  getClassName(error = false) {
    switch(this.classPrefix) {
      case 'input':
        return error ? 'input-error' : 'input-success';
      case 'textarea':
        return error ? 'textarea-error' : 'textarea-success';
      case 'select':
        return error ? 'select-error' : 'select-success';
      default:
        return '';
    }
  }

}
