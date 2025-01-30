import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, Renderer2, SimpleChanges, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-totvs-map',
  templateUrl: './totvs-map.component.html',
  styleUrls: ['./totvs-map.component.css']
})
export class TotvsMapComponent implements OnChanges {
  literals: any = {};

  @ViewChildren("anchorStateElement", { read: ElementRef }) mapLinks: QueryList<ElementRef>;

  @Input({required: false}) enabledStates!: string[];
  @Input({required: false}) initialSelectedState!: string;
  @Output() selectedStateEvent = new EventEmitter<string>();


  constructor(
    private renderer: Renderer2
  ) { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.mapLinks?.forEach((anchor: ElementRef) => {
      const anchorElement: HTMLElement = anchor.nativeElement;
      const stateElement: Element = anchorElement.children[anchorElement.children.length - 1];
      this.selectedState(this.initialSelectedState);
      if (!this.enabledStates?.includes(stateElement.innerHTML)) {
        this.disableState(anchorElement, stateElement);
      } else {
        this.enableState(anchorElement, stateElement);
      }
    });
  }

  enableState(parentElement: HTMLElement, stateElement: Element): void {
    for (let i = 0; i < parentElement.children.length - 1; i++) {
      this.renderer.removeClass(parentElement.children[i], "disabledState");
      this.renderer.removeClass(parentElement.children[i], "disableEvents");
    }
    this.renderer.removeClass(stateElement, "disableEvents");
  }

  disableState(parentElement: HTMLElement, stateElement: Element): void {
    this.removeClassStyles(parentElement, "defaultState");
    for (let i = 0; i < parentElement.children.length - 1; i++) {
      this.renderer.addClass(parentElement.children[i], "disabledState");
      this.renderer.addClass(parentElement.children[i], "disableEvents");
    }
    this.renderer.addClass(stateElement, "disableEvents");
  }

  removeClassStyles(anchorElement: HTMLElement, className: string) {
    for (let i = 0; i < anchorElement.children.length; i++) {
      this.renderer.removeClass(anchorElement.children[i], className);
      this.renderer.removeClass(anchorElement.children[i], className + 'Circle');
    }
  }

  applyStyleOnState(anchorElement: HTMLElement, originalStyles: boolean): void {
    const stateStyle: string = originalStyles ? "defaultState" : "selectedState";

    if (originalStyles) {
      this.removeClassStyles(anchorElement, 'selectedState');
    } else {
      this.removeClassStyles(anchorElement, 'defaultState');
    }
    
    this.renderer.addClass(anchorElement.children[0], stateStyle)
    if (anchorElement.children.length > 2) { // Estados pequenos com o círculo
      this.renderer.addClass(anchorElement.children[1], stateStyle + 'Circle');
    } 

    this.renderer.addClass(anchorElement, 'stateWithText');
    this.renderer.addClass(anchorElement.children[anchorElement.children.length - 1], 'text')
  }

  selectedState(state: string): void {
    this.mapLinks.forEach((anchor: ElementRef) => {
      const anchorElement: HTMLElement = anchor.nativeElement;
      const stateElement: Element = anchorElement.children[anchorElement.children.length - 1];
      this.applyStyleOnState(anchorElement, stateElement.innerHTML !== state);
    });
    this.selectedStateEvent.emit(state);
  }
}
