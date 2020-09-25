import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as echarts from 'echarts';

@Component({
  selector: 'app-maincomponent',
  templateUrl: './maincomponent.component.html',
  styleUrls: ['./maincomponent.component.scss']
})
export class MaincomponentComponent implements OnChanges {
  @Input() chars: any;
  @Input() kurals: any;
  @Input() sampleKural: any;

  charactersArray = [];
  symbolsofuyirmei = ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௗ', '்'];
  uyirmeinedilsymbols = ['ோ'];
  uyirmeikurilsymbols = ['ொ', 'ௗs'];
  // K-represents kuril and O - otru, N- Nedil -- NO is nedil followed by otru
  ner = ['K', 'KO', 'N', 'NO'];
  nirai = ['KK', 'KKO', 'KN', 'KNO'];
  kuralPattern = '';
  processedArray  = [];
  tempProcessedArray = [];
  wordArray = [];
  options: Observable<any>;

  constructor() { }

  ngOnInit() {
    //this.render();
  }

  ngOnChanges(changes) {
    if (this.sampleKural) {
      this.sampleKural = this.sampleKural.kural.join(' ');
      this.render();
    }
  }

  render() {
    this.processedArray = [];
    this.charactersArray = [];
    this.wordArray = [];
    this.splitcharacters();
    this.findIfKurilNedilOtru();
    this.mapAndFormNerNirai();
    this.finalDataFormation();
  }
  splitcharacters() {

    from(this.sampleKural).pipe(
    ).subscribe( (str : any) => {
      if (this.symbolsofuyirmei.indexOf(str) >= 0) {
        const tempchar = [];
        tempchar.push(this.charactersArray.pop());
        tempchar.push(str);
        this.charactersArray.push(tempchar.join(''));
      } else {
        this.charactersArray.push(str);
      }
    });
  }

  findIfKurilNedilOtru() {
    const length = this.charactersArray.length;
    let n = 0;
    while ( n < length) {
      const char = this.charactersArray[n];
      let type = '';
     //
      if (this.isKuril(char)) {
       //
        this.kuralPattern += 'K';
        type = 'K';
      } else if (this.isNedil(char)) {
       //
        this.kuralPattern += 'N';
        type = 'N';
      } else if (this.isOtru(char)) {
       //
        this.kuralPattern += 'O';
        type = 'O';
      } else if (this.isUyirNedil(char)) {
        this.kuralPattern += 'N';
        type = 'N';
      } else if (this.isUyirKuril(char)) {
        this.kuralPattern += 'K';
        type = 'K';
      } else if (char === ' ') {
       //
        this.kuralPattern += 'S';
        type = 'S';
      }
      this.wordArray.push({type: type, char: char});
      n += 1;
    }
  }

  mapAndFormNerNirai() {
    const testString = this.wordArray;
    for (let index = 0; index < testString.length; index++) {
      const firstElement = testString[index];
      const nextElement = testString[index + 1] ? testString[index + 1] : {type: ''};
      if (firstElement.type === 'K' && nextElement.type === 'S') {

       //
        const obj = {
          chars : [firstElement.char],
          name: firstElement.char,
          charType: [firstElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, true);
        ++index;
      } else if (firstElement.type === 'K' && nextElement.type === '') {

       //
        const obj = {
          chars : [firstElement.char],
          name: firstElement.char,
          charType: [firstElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, true);
        ++index;
      }  else if (firstElement.type === 'K' && nextElement.type === 'O') {

        const obj = {
          chars : [firstElement.char, nextElement.char],
          name: firstElement.char + '' + nextElement.char,
          charType: [firstElement.type, nextElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, false);
        ++index;
      } else if (firstElement.type === 'N' && nextElement.type === 'O') {

        const obj = {
          chars : [firstElement.char, nextElement.char],
          name: firstElement.char + '' + nextElement.char,
          charType: [firstElement.type, nextElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, false);
        ++index;
      } else if (firstElement.type === 'N' && nextElement.type === 'S') {


        const obj = {
          chars : [firstElement.char, nextElement.char],
          name: firstElement.char + '' + nextElement.char,
          charType: [firstElement.type, nextElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, true);
        ++index;
      } else if (firstElement.type === 'N' && nextElement.type === 'K') {

        const obj = {
          chars : [firstElement.char],
          name: firstElement.char,
          charType: [firstElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, false);
      } else if (firstElement.type === 'K' && nextElement.type === 'K') {
        ++index;
        const thirdChar = testString[index + 1];
        if (thirdChar && thirdChar.type === 'O') {
          ++index;

          const obj = {
            chars : [firstElement.char, nextElement.char, thirdChar.char],
            name: firstElement.char + '' + nextElement.char + '' + thirdChar.char,
            charType: [firstElement.type, nextElement.type, thirdChar.type],
            seer: 'நிரை'
          };
          this.formProcessedArray(obj, false, false);
        } else {

          const obj = {
            chars : [firstElement.char, nextElement.char],
            name: firstElement.char + '' + nextElement.char,
            charType: [firstElement.type, nextElement.type],
            seer: 'நிரை'
          };
          this.formProcessedArray(obj, false, false);
        }
      } else if (firstElement.type === 'K' && nextElement.type === 'N') {
        ++index;
        const thirdChar = testString[index + 1];
        if (thirdChar && thirdChar.type === 'O'){
          ++index;

          const obj = {
            chars : [firstElement.char, nextElement.char, thirdChar.char],
            name: firstElement.char + '' + nextElement.char + '' + thirdChar.char,
            charType: [firstElement.type, nextElement.type, thirdChar.type],
            seer: 'நிரை'
          };
          this.formProcessedArray(obj, false, false);
        } else {

          const obj = {
            chars : [firstElement.char, nextElement.char],
            name: firstElement.char + '' + nextElement.char,
            charType: [firstElement.type, nextElement.type],
            seer: 'நிரை'
          };
          this.formProcessedArray(obj, false, false);
        }
      } else if (firstElement.type === 'N' && nextElement.type === 'N') {

        const obj = {
          chars : [firstElement.char],
          name: firstElement.char,
          charType: [firstElement.type],
          seer: 'நேர்'
        };
        this.formProcessedArray(obj, false, false);
      } else if (firstElement.type === 'S' && nextElement.type === 'N') {

        this.formProcessedArray(false, true, false);
      } else if (firstElement.type === 'S' && nextElement.type === 'K') {

        this.formProcessedArray(false, true, false);
      }
    }
    this.formProcessedArray(false, false, true);
  }

  formProcessedArray(obj: any, start, end) {
      if (start && obj) {
        this.tempProcessedArray.push(obj);
      } else if (end && obj) {
        this.tempProcessedArray.push(obj);
        this.processedArray.push(this.tempProcessedArray);
        this.tempProcessedArray = [];
      } else if (start && !obj) {
        this.processedArray.push(this.tempProcessedArray);
        this.tempProcessedArray = [];
      } else if (end && !obj) {
        this.processedArray.push(this.tempProcessedArray);
        this.tempProcessedArray = [];
      } else {
        this.tempProcessedArray.push(obj);
      }
  }

  finalDataFormation() {
    let words = this.sampleKural.split(' ');
    let tempArr = [{
      name: '',
      children: []
    }];
    const processedArray = this.processedArray;
    words.forEach(element => {
      let childObj = {
        name: element,
        children: []
      };
      tempArr[0].children.push(childObj);
    });
    for (let index = 0; index < processedArray.length; index++) {
          const obj = processedArray[index];
          if (obj.length) {
            let child = tempArr[0].children[index];
            if(child){
              child.children = obj;
            }
          }
     }
    // this.processedArray = tempArr;
    this.options = from(tempArr)
    .pipe(
      map((data) => {


        data.children.forEach(element => {
          element.children.forEach(obj => {

            let temp = {
              name: obj.seer
            }
            obj.children = [];
            obj.children.push(temp);
          });
        });
        return {
          series: [
            {
              type: 'tree',
              data: [data],
              top: '5%',
              left: '1%',
              bottom: '3%',
              right: '3%',
              orient: 'vertical',
              symbolSize: 3,
              label: {
                position: 'left',
                verticalAlign: 'left',
                align: 'left',
                fontSize: 16,
                padding: [-5,55,15,15],
                color : "#3f51b5",
              },
              leaves: {
                label: {
                  position: 'left',
                  verticalAlign: 'left',
                  align: 'left',
                  padding: [-5,55,15,15]
                },
              },
              expandAndCollapse: false,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        };
      }),
    );
  }

  isKuril(char: any) {
   if (this.chars.uyir_arai_maathirai.indexOf(char) >= 0 || this.chars.kuril.indexOf(char) >= 0) {
    return true;
   } else {
     return false;
   }
  }

  isUyirNedil(char: any) {
    const charArr = char.split('');
    if (this.chars.kuril.indexOf(char[0]) >= 0 && this.uyirmeinedilsymbols.indexOf(char[1]) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  isUyirKuril(char: any) {
    const charArr = char.split('');
    if (this.chars.kuril.indexOf(char[0]) >= 0 && this.uyirmeikurilsymbols.indexOf(char[1]) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  isNedil(char: any) {
    if (this.chars.uyir_oru_maathirai.indexOf(char) >= 0 || this.chars.nedil.indexOf(char) >= 0 ) {
     return true;
    } else {
      return false;
    }
   }
   isOtru(char: any) {
    if (this.chars.mei.indexOf(char) >= 0 ) {
     return true;
    } else {
      return false;
    }
   }
}
