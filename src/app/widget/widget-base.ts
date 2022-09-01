import { Directive, Input } from '@angular/core';
import { JsonExporterService } from '../json-exporter.service';

@Directive()
export class WidgetBase {
  @Input()
  title: string = '';
  constructor(private jsonExporter: JsonExporterService) {}

  onExportJson() {
    this.jsonExporter.export();
  }
}
