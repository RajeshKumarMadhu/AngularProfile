import { Pipe, PipeTransform } from "@angular/core";
import { from } from "rxjs";
import { pluck } from "rxjs/operators";

@Pipe({
  name: "seer",
})
export class SeerPipe implements PipeTransform {
  transform(value: any, index: any): any {
    // console.log(value);
    let temp = "";
    from(value)
      .pipe(pluck("seer"))
      .subscribe((src: any) => {
        if (temp === "") {
          temp = src;
        } else {
          temp = temp + "-" + src;
        }
        console.log(temp);
      });
    let returnTyp = "";
    if (index < 6) {
      switch (temp) {
        case "நேர்-நேர்":
          returnTyp = "தேமா";
          break;
        case "நிரை-நேர்":
          returnTyp = "புளிமா";
          break;
        case "நிரை-நிரை":
          returnTyp = "கருவிளம்";
          break;
        case "நேர்-நிரை":
          returnTyp = "கூவிளம்";
          break;
        case "நேர்-நேர்-நேர்":
          returnTyp = "தேமாங்காய்";
          break;
        case "நேர்-நேர்-நிரை":
          returnTyp = "தேமாங்கனி";
          break;
        case "நிரை-நேர்-நேர்":
          returnTyp = "புளிமாங்காய்";
          break;
        case "நிரை-நேர்-நிரை":
          returnTyp = "புளிமாங்கனி";
          break;
        case "நிரை-நிரை-நேர்":
          returnTyp = "கருவிளங்காய்";
          break;
        case "நிரை-நிரை-நிரை":
          returnTyp = "கருவிளங்கனி";
          break;
        case "நேர்-நிரை-நேர்":
          returnTyp = "கூவிளங்காய்";
          break;
        case "நேர்-நிரை-நிரை":
          returnTyp = "கூவிளங்கனி";
          break;
        default:
          break;
      }
    } else {
      switch (temp) {
        case "நேர்":
          returnTyp = "நாள்";
          break;
        case "நிரை":
          returnTyp = "மலர்";
          break;
        default:
          if (temp.indexOf("நேர்") === 1) {
            returnTyp = "காசு";
          } else {
            returnTyp = "பிறப்பு";
          }
          break;
      }
    }
    return returnTyp;
  }
}
