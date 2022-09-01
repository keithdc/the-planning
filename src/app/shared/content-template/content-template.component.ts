import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-content-template',
  templateUrl: './content-template.component.html',
  styleUrls: ['./content-template.component.scss']
})
export class ContentTemplateComponent<T> implements OnInit {
  @Input() title: string | undefined;
  @Input() data: T[] | undefined;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
