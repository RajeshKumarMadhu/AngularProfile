import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Angulartics2GoogleTagManager } from "angulartics2/gtm";
declare const gtag: Function;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [Angulartics2GoogleTagManager],
})
export class AppComponent {
  title = "thirukural";

  constructor(
    public angulartics2GoogleTagManager: Angulartics2GoogleTagManager
  ) {
    angulartics2GoogleTagManager.startTracking();
  }
}
