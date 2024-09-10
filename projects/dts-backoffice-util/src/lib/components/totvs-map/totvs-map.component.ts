import { Component, EventEmitter, Input, OnInit, Output, output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-totvs-map',
  templateUrl: './totvs-map.component.html',
  styleUrls: ['./totvs-map.component.css']
})

export class TotvsMapComponent implements OnInit {
  literals: any = {};

  @Output() selectedStateEvent = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit() {
  }
  
  selectedState(state): void {
    this.selectedStateEvent.emit(state);
  }
}
