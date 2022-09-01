import { Component, Input, OnInit } from '@angular/core';
import { JsonExporterService } from '../json-exporter.service';
import { WidgetBase } from './widget-base';

@Component({
  selector: 'app-widget',
  template: `
    <div class="header">
      <h1>{{ title }}</h1>
      <button mat-stroked-button (click)="onExportJson()">
        Export as JSON
      </button>
    </div>
    <mat-divider></mat-divider>
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
        border: #f0ebeb solid 1px;
        border-radius: 5px;
        padding: 15px;
        background-color: #fafafa;
        width: 400px;
        margin-left: 20px;
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    `,
  ],
})
export class WidgetComponent extends WidgetBase {
  override onExportJson(): void {
    // throw Error('I do not support it')
    super.onExportJson();
    console.log('sf')
  }
}
