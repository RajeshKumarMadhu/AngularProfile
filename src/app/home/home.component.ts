import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataService } from "../data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  chars: any;
  kurals: any;
  dataLoaded: any;
  selectedKural =
    "எல்லா விளக்கும் விளக்கல்ல சான்றோர்க்குப் பொய்யா விளக்கே விளக்கு";
  mobile: boolean;
  constructor(private data: DataService) {}

  ngOnInit() {
    this.fetchChars();
    this.fetchKurals();
  }

  setKural() {
    this.selectedKural =
      "அருளொடும் அன்பொடும் வாராப் பொருளாக்கம் புல்லார் புரள விடல்";
    // 'எல்லா விளக்கும் விளக்கல்ல சான்றோர்க்குப் பொய்யா விளக்கே விளக்கு.';//'//'கற்றதனால் ஆய பயனென்கொல வாலறிவன் நற்றாள் தொழாஅர் எனின்.'; //"அகர முதல எழுத்தெல்லாம் ஆதி";
  }
  fetchChars() {
    this.data.getCharsData().subscribe((src) => {
      this.chars = src;
    });
  }

  fetchKurals() {
    this.data.getKurals().subscribe((data) => {
      this.kurals = data;
      this.dataLoaded = true;
    });
  }
}
