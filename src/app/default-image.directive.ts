import { Directive, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: 'img[default]'
})
export class DefaultImageDirective {

  @Input()
  default: string;

  @HostListener('error')
  onError() {
    this.src = this.default;
  }

    @HostBinding('src')
    @Input()
    src: string;

}
