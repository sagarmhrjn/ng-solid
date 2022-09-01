import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
    </mat-toolbar>
    <main class="content">
      <app-widget title="Weather">
        <app-weather-content></app-weather-content>
      </app-widget>
      <app-widget title="Velocity">
        <app-velocity-content></app-velocity-content>
      </app-widget>
      <app-widget title="Anything">
        <p>Content is coming</p>
      </app-widget>
    </main>
  `,
  styles: [
    `
      .content {
        background-color: #fff;
        padding: 2rem;
        height: calc(100vh - 64px);
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class AppComponent {}
