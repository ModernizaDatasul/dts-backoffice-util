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
    for (let i = 0; i < parentElement.children.length - 1; i++) {
      this.renderer.addClass(parentElement.children[i], "disabledState");
      this.renderer.addClass(parentElement.children[i], "disableEvents");
    }
    this.renderer.addClass(stateElement, "disableEvents");
  }

  applyStyleOnState(anchorElement: HTMLElement, originalStyles: boolean): void {
    const stateStyle: string = originalStyles ? "#0c6c94" : "#29b5c4";
    const circleStyle: string = originalStyles ? "#29b5c4" : "#4c8d94";

    this.renderer.setStyle(anchorElement.children[0], "fill", stateStyle)
    if (anchorElement.children.length > 2) { // Estados pequenos com o círculo
      this.renderer.setStyle(anchorElement.children[1], "fill", circleStyle);
    } 
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
