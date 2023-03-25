import { Directive, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[InputValidityColors]'
})
export class InputValidityDirective implements OnInit, OnDestroy, OnChanges {

  @HostBinding('class') private classList = '';
  @Input() public submitted!: boolean;
  private subscription!: Subscription | undefined;

  constructor(
    private control: NgControl
  ) { }

  ngOnInit(): void {
    this.subscription = this.control.control?.statusChanges.subscribe((status) => {
      if (this.submitted !== undefined && !this.submitted) return;
      if (status === 'INVALID') {
        this.classList = 'input-error';
      } else {
        this.classList = 'input-success';
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submitted'] && changes['submitted'].currentValue) {
      if (this.control.control?.invalid) {
        this.classList = 'input-error';
      } else {
        this.classList = 'input-success';
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
