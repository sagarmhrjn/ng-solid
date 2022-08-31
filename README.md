# Solid design principles in the context of Angular

## Table of Contents

- [What is Design Principle](#what-is-design-principle)
- [Single Responsibility Principle](#single-responsibility-principle)
- [Open Closed Principle](#open-closed-principle)
- [Liskov Substitution Principle](#liskov-substitution-principle)
- [Inteface Seggregation Principle](#interface-seggregation-principle)
- [Dependency Inversion Principle](#dependency-invesrion-principle)

## What is design principle?

Design principle is <em><strong>recommendations on how to design your code such a way in order to keep it maintainable flexible and so on and so forth and telling that it's recommendation it means that it is very abstract and it doesn't have any concrete implementations.</strong></em>&nbsp;We can implement some design principle in many different ways. Already on top of this design principle we have design patterns which solve some already concrete use case and implement one two or more design principles and we are not restricted by only those five design principles we have many more like dry don't repeat yourself principle or keys keep it simple and there are many of them but these five <strong>S.O.L.I.D</strong> are the most popular ones.

## Single Responsibility Principle

<blockquote><em><strong>"A class should have one and only one reason to change, meaning that a class should only have one job."</strong></em></blockquote>
Single responsibility principle which sounds like there should never  be more than one reason for a class to change which means that <em><strong>some component or class or model should do only one thing but do it well.</strong></em>
<br/><br/>
Now  let's have a look at the implementation of this. Here we have a application with simple widget weather widget which just exports some json data.

```typescript
import { Component } from '@angular/core';

@Component({
selector: 'app-root',
template: ` 
<mat-toolbar color="primary">
 <span>My App</span> 
 </mat-toolbar>
  <main class="content"> 
    <div class="header">
    <h1>Weather</h1>
      <button mat-stroked-button (click)="onExportJson()"> Export as JSON
      </button> 
    </div> 
    <mat-divider></mat-divider> 
    <p>Currently</p> 
    <section class="wether-widget">
      <mat-icon class="widget-icon">wb_sunny</mat-icon> 
    <div class="value">+25</div> 
  </section> 
  </main> 
`
styles: [],
})
export class AppComponent {
    onExportJson() {
    let data = JSON.stringify({ wether: { is_sunny: true, temp: '+25' } });
    let dataUri =
    'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    let exportFileName = 'wether.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}
```
As we can see that app component which is only one component for now. We have the material toolbar and we have the main tag which contain the  whole content for my web page and also we have the widget template and besides this we also have on export json function which does export of whether widget data in json format and we have some styles. This piece of code violates pretty much everything.

Very often it is hard to decide where you know where ends  responsibility for class A and starts their responsibility for component or class B. <em>However I have one rule which i use in order to determine if my class does too much or not this is the <strong>"AND-word" rule</strong> and it means that you describe the responsibility of some certain  component and once you encounter the word "AND" it might be the signal that your component  does already too much.</em>

The responsibility of the app root component is to render the skeleton for our page so it's a top-level components like toolbar and content and  we have already toolbar we have this main content and we render also the widget layout and  we do export JSON file JSON data for this component as well within one single component.


For this case we should be definitely have the separate component for the widget and the logic of app component might be belong to the component itself and copy everything and we can paste it to the template  of widget component. We also move on this on export JSON handler part header widget icon basically everything  except the content.

```typescript
import { Component, OnInit } from "@angular/core";
import { JsonExporterService } from "../json-exporter.service";

@Component({
  selector: "app-widget",
  template: `
    <div class="header">
      <h1>Weather</h1>
      <button mat-stroked-button (click)="onExportJson()">
        Export as JSON
      </button>
    </div>
    <mat-divider></mat-divider>
    <p>Currently</p>
    <section class="wether-widget">
      <mat-icon class="widget-icon">wb_sunny</mat-icon>
      <div class="value">+25</div>
    </section>
  `,
  styles: [],
})
export class WidgetComponent implements OnInit {
  constructor(private jsonExporter: JsonExporterService) {}

  ngOnInit(): void {}

  onExportJson() {
    this.jsonExporter.export();
  }
}
```

<p style="text-align: center;">widget.component.ts</p>
<br/>

If we have a look at the widget component we can say that widget component generates  the layout for the view of our component and it exports the data as a json and most probably the export of the json is not responsibility of the component itself yeah it can handle this on export json click event.

However the logic is not the responsibility of this component so we'll create the separate service and this service we could call json exporter so we can move this export logic from here and create some methods like export.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonExporterService {
  constructor() {}

  export() {
    let data = JSON.stringify({ wether: { is_sunny: true, temp: '+25' } });
    let dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(data);
    let exportFileName = 'wether.json';
    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}
```

<<p style="text-align: center;">>json-exporter.service.ts</p>
<br/>

Our app component became more lean and it  is responsible exactly for rendering the content and rendering the toolbar.

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
    </mat-toolbar>
    <main class="content">
      <app-widget></app-widget>
    </main>
  `,
  styles: [],
})
export class AppComponent {}
```

<<p style="text-align: center;">>app.component.ts</p>
<br/>

As you can see, we have splitted responsibility between three entities app component widget component and also service. <em><strong>Find your balance in splitting all these responsibilities because you may split it to such a small pieces that yeah you will be flexible like a hell but it might be too hard to support this.</strong></em> So, find your balance usually you find it within your team during the code reviews and yeah it's my variety from team to team what responsibility of what because there is no some super strict rule which can determine it.
