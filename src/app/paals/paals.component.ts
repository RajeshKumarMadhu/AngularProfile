import { Component, OnInit, Input } from "@angular/core";
import { from } from "rxjs";
import { filter } from "rxjs/operators";
import { Angulartics2 } from "angulartics2";

@Component({
  selector: "app-paals",
  templateUrl: "./paals.component.html",
  styleUrls: ["./paals.component.scss"],
})
export class PaalsComponent implements OnInit {
  @Input() data: any;
  @Input() chars: any;

  muppaal: any = [];
  adhigarams = [];
  selectedIndex = 0;
  firstTabBgColor = "grey";
  secondTabBgColor = "grey";
  textColor = "primary";

  kurals = [];

  constructor(private angulartics2: Angulartics2) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.data) {
      this.muppaal = this.data.sections;
    }
  }

  activeTabChanged(evt: any) {
    this.selectedIndex = 0;
    let adhigarams = [];
    adhigarams = this.data.adhigarams;
    from(adhigarams)
      .pipe(filter((src) => src.paalname === evt.tab.textLabel))
      .subscribe((event) => {
        this.adhigarams = event.adhigarams;
        const evt = {
          name: this.adhigarams[0],
        };
        this.fetchSelectedAdhigaram(evt);
      });
    //this.$gaService.event('Clicked Muppaal tab', 'Paal tab', evt.tab.textLabel);
    this.angulartics2.eventTrack.next({
      action: "click",
      properties: {
        category: "click",
        label: "Mupaal",
        value: evt.tab.textLabel,
      },
    });
  }

  fetchSelectedAdhigaram(evt: any) {
    let textToFilter = "";
    if (evt.name) {
      textToFilter = evt.name.adhigaramname;
    } else {
      textToFilter = evt.tab.textLabel;
    }
    this.angulartics2.eventTrack.next({
      action: "click",
      properties: {
        category: "click",
        label: "Adhigaram",
        value: textToFilter,
      },
    });
    //this.$gaService.event('Clicked Adhigaram tab', 'Adhigaram tab', textToFilter);
    this.kurals = [];
    let kurals = [];
    kurals = this.data.kurals;
    from(kurals)
      .pipe(filter((src) => src.chapter == textToFilter))
      .subscribe((event) => {
        this.kurals.push(event);
      });
    //
  }
}
