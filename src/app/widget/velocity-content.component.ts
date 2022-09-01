import { Component } from '@angular/core';

@Component({
  selector: 'app-velocity-content',
  template: `
    <p>Last Sprint</p>
    <section class="widget-content">
      <mat-icon class="widget-icon">assessment</mat-icon>
      <div class="value">Planned: <strong>25</strong></div>
      <div class="value">Archived: <strong>20</strong></div>
    </section>
  `,
  styleUrls: ['./widget-content.scss'],
})
export class VelocityContentComponent {
  constructor() {}
}
