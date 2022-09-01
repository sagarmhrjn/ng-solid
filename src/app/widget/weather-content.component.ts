import { Component } from '@angular/core';

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
export class WeatherContentComponent {
  constructor() {}
}
