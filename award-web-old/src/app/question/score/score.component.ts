import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() answerId: string;
  @Output() scoreChnages = new EventEmitter<{}>();
  @Input() score: number;
  @Input() disabled: any;

  ngOnInit() {
    this.score = this.score;
  }

  change(e: MatSliderChange) {
    this.scoreChnages.emit({answerId: this.answerId, score: e.value});
  }

}
