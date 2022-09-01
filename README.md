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
<p align="center">widget.component.ts</p>
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

<p align="center">json-exporter.service.ts</p>
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
<p align="center">app.component.ts</p>
As you can see, we have splitted responsibility between three entities app component widget component and also service. <em><strong>Find your balance in splitting all these responsibilities because you may split it to such a small pieces that yeah you will be flexible like a hell but it might be too hard to support this.</strong></em> So, find your balance usually you find it within your team during the code reviews and yeah it's my variety from team to team what responsibility of what because there is no some super strict rule which can determine it.


## Open Closed Principle
<blockquote><em><strong>"Objects or entities should be open for extension, but closed for modification."</strong></em></blockquote>
Open close principle is very important one and it sounds like software entities should  be open for extension but closed for modification and what does it mean on the in the real life it  means that you should <strong><em>design your classes models and libraries even libraries such a way that you should extend it functionality without touching the component. A very good example is libraries you cannot modify components which are coming from some certain library because they are closed and published into the npm. So, you have no access to the source code to change but still you  have to be able somehow extend this functionality.</em></strong> 
<br/><br/>
Here we have two widgets but different content inside so the first one is weather but when the second one is also whether but it is the velocity which shows the last velocity of your last sprint. It has small differences comparing to the first implementation but this is like pretty much similar we have separately app widget and it has the property weather or velocity. 

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
    <ng-container *ngIf="widget === 'weather'">
      <p>Currently</p>
      <section class="wether-widget">
        <mat-icon class="widget-icon">wb_sunny</mat-icon>
        <div class="value">+25</div>
      </section>
    </ng-container>
    <ng-container *ngIf="widget === 'velocity'">
      <p>Last Sprint</p>
      <section class="wether-widget">
        <mat-icon class="widget-icon">assessment</mat-icon>
        <div class="value">Planned: <strong>25</strong></div>
        <div class="value">Archived: <strong>20</strong></div>
      </section>
    </ng-container>
  `,
  styles: [],
})
export class WidgetComponent{
  @Input()
  widget: 'weather' | 'velocity' = 'weather'
  constructor(private jsonExporter: JsonExporterService) {}

  onExportJson() {
    this.jsonExporter.export();
  }
}
```
<p align="center">widget.component.ts</p>

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
    </mat-toolbar>
    <main class="content">
      <app-widget widget="weather"></app-widget>
      <app-widget widget="velocity"></app-widget>
    </main>
  `,
  styles: [],
})
export class AppComponent {}
```
<p align="center">app.component.ts</p>
If we have a look at the  component implementation itself we will see that it has such a thing like <strong>*ngIf</strong>; if widget is weather then we render the view for weather otherwise we render the velocity view. We can of course use ng switch here it doesn't really matter for this particular case  but the <em><strong>problem with this that it is closed definitely especially if we distribute this as a library it is closed you cannot modify it but it is not open we cannot add the new content to it as example we want to have third widget which renders some just a paragraph or some another view and we cannot do this because we have restricted by only these two types either weather or velocity and this is the violation of open close principle.</strong></em> <br/><br/>

Now, how can we solve this issue?? We can create separate view or separate component for every of this widget and then <strong><em>we would use the just a content projection like ng-content.</em></strong> So we'll generate two components first one we'll name weather content and then we create the same both for velocity.

```typescript
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
```
<p align="center">weather-content.component.ts</p>

```typescript
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
```
<p align="center">velocity-content.component.ts</p>

We've moved html from weather to weather content and similar to for our velocity then we have removed ng-container content from widget component and instead we will use ng-content right there. So, here instead of ng-content will be rendered anything we put between app widget tag. There are <em>another way how to implement it you can use this with the <strong>component outlet and ng container</strong></em> but it doesn't really matter for this case you are free to implement as as you want. 

```scss
.widget-icon {
    font-size: 64px;
    width: 64px;
    height: 64px;
    color: orange;
}
.value {
    font-size: 24px;
    opacity: 0.7;
}

.widget-content {
    display: block;
    text-align: center;
    position: relative;
    min-width: 190px;
}
```
<p align="center">widget-content.scss</p>

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>My App</span>
    </mat-toolbar>
    <main class="content">
      <app-widget>
        <app-weather-content></app-weather-content>
      </app-widget>
      <app-widget>
        <app-velocity-content></app-velocity-content>
      </app-widget>
      <app-widget>
        <p>Content is coming</p>
      </app-widget>
    </main>
  `,
  styles: [],
})
export class AppComponent {}
```
<p align="center">app.component.ts</p>

We've added some styles because the definitely value and widget icon should be part of styles for these two component(weather, velocity component). So, we've created a new file <i><b>widget-content.scss</b></i> which'll be the common styles for for this everything and weather-widget and velocity-widget. And inside app component already we don't need widget inputs anymore and we can define which content we want to have here and or this case <b><i>app-weather-content and app velocity-content</i></b> 

Now we can see the benefit of this everything if we want to <em><strong>introduce the new widget and with some specific content</strong></em> there inside we can easily do this we can just place the paragraph there and say that content is coming <em><strong>without modifying the app widget itself.</strong></em> We could <em><strong>extend it with another content</strong></em> and now if we have a look at our widgets we can see that we <em><strong>reused completely the widget itself but the content is customizable and can easily customize this and change the view.</strong></em>

## Liskov Substitution Principle
<blockquote><em><strong>"Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T."</strong></em></blockquote>
Liskov Barbara, liskov's substitution principle sounds like <em><strong>functions that use pointers or references to base classes must be able to use objects of derived classes without knowing it</strong></em>, sounds a little bit complicated. <em>Imagine you have two classes parent class and child class which extends the apparent one and lisco substitution principle means that <strong>objects of this super class or parent class should be replaceable with its subclasses or child class without breaking the application.</strong></em><br/><br/>
Now, let's have a look at the example: Let's imagine that <strong><em>we want to have slightly different wrappers.</strong></em> We want to have this one and maybe we are planning to have <strong><em>some another modifications of this widget container</strong></em> and we know that all those containers will have some functionality like export to json and all of them should support the input title. <strong><em>We don't want to duplicate everything here we want to extract this to some base class. </strong></em>

```typescript
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
```
<p align="center">widget-base.ts</p>
So, we've created a class and named it to widget base. So inside this widget-based class we've moved the whole logic from the widget component. <strong><em>For the input decorator we have to decorate this class with directive because since "Ivy" we have to do it; if we are going to use inputs and extend to another component with this new base class.</strong></em>

```typescript
export class WidgetComponent extends WidgetBase {
  override onExportJson(): void {
    throw Error('We do not support this now')
  }
}
```
<p align="center">widget.component.ts</p>
We have extended this and how we can violate the liskov substitution principle?? <strong><em>We can violate this by overriding this method on export json and as an example; instead of exporting the export json we throw some error like we do not support it.</strong></em> This is the only violation because it <strong><em>changes the behavior</strong></em> of this on export json comparing to its parent there's completely  different logic and if we replace the implementation of this widget base with  widget content we will break our application which is actually the violation of a liskov substitution principle. 

```typescript
export class WidgetComponent extends WidgetBase {
  override onExportJson(): void {
    // throw Error('I do not support it')
    super.onExportJson();
    console.log('additional logging or whatever')
  }
}
```
<p align="center">widget.component.ts</p>

So, the solution to not violate this principle is to just <em>remove it and remove it completely if we're not doing some any additional logic for  widget component or if we do <strong>we should not break the contract of this it should  not return some completely different type which is not compatible</strong> so if the return type is void then also type of the extended handler function handler should be also void and we can of course call super and then we can do something like console log or additional whatever.<em> So this is how we can extend it without violating this design principle. 