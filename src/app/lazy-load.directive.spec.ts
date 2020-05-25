import { LazyLoadDirective } from './lazy-load.directive';



describe('LazyLoadDirective', () => {
  it('should create an instance', () => {

    let elRefMock = {
      nativeElement: document.createElement('div')
    };
    
    const directive = new LazyLoadDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
