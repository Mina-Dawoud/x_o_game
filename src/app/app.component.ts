import { Component } from '@angular/core';
import { xoModel } from './xo.model';
import { ValueTransformer } from '../../node_modules/@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  character = 'X';
  nextOrder = 0;
  winnerIndexes: number[];
  xoTable: xoModel[];
  isStop: boolean;
  xCounter: number = 0;
  oCounter: number = 0;
  successIndexes: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  constructor() {
    this.reset();
  }

  private fillXOTableWithEmpty() {
    this.xoTable = [
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel(),
      new xoModel()
    ];
  }

  changeCharacter() {
    this.character = this.character === 'X' ? 'O' : 'X';
  }

  setCharacter(index: number) {
    if (!this.isExists(index) && !this.isStop) {
      this.xoTable[index].value = this.character;
      this.xoTable[index].order = this.nextOrder++;
      this.checkWinner();
      this.changeCharacter();
    }
  }

  backOneStep() {
    if (!this.isStop) {
      const indexOfMaxOrder = this.xoTable.findIndex(cell => cell.order === this.nextOrder - 1);
      this.xoTable[indexOfMaxOrder].value = '';
      this.xoTable[indexOfMaxOrder].order = -1;
      this.nextOrder--;
      this.changeCharacter();
    }
  }

  private isExists(index: number) {
    return this.xoTable[index].value;
  }

  getStyle(index: number) {
    if (this.winnerIndexes.includes(index)) {
      return 'success';
    }
    return this.xoTable[index].value === 'X' ? 'x-style' : 'o-style';
  }

  private checkWinner() {
    const indexesOfCurrentCharacter: number[] = [];
    this.xoTable.forEach((cell, index) => {
      if (cell.value === this.character) {
        indexesOfCurrentCharacter.push(index);
      }
    });

    this.successIndexes.forEach(indexes => {
      if (indexesOfCurrentCharacter.includes(indexes[0])
        && indexesOfCurrentCharacter.includes(indexes[1])
        && indexesOfCurrentCharacter.includes(indexes[2])) {
        this.winnerIndexes = indexes;
        if (this.character === 'X') {
          this.xCounter++;
        } else {
          this.oCounter++;
        }
        this.isStop = true;
        return;
      }
    });
  }

  reset() {
    this.winnerIndexes = [];
    this.character = 'X';
    this.fillXOTableWithEmpty();
    this.isStop = false;
  }

  isWinner(character: string) {
    return this.winnerIndexes.length > 0 && character !== this.character;
  }
}
