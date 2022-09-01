import { Component } from '@angular/core';
import { Reloadable, WidgetContent } from './widget-content';

@Component({
  selector: 'app-weather-content',
  template: `
    <p>Currently</p>
    <section class="widget-content">
      <mat-icon class="widget-icon">wb_sunny</mat-icon>
      <div class="value">+25</div>
    </section>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class WeatherContentComponent implements WidgetContent, Reloadable {
  constructor() {}
  id: string = '';
  loading: boolean = false;
  reload(): void {
    console.log('reload...!!!');
  }
}
