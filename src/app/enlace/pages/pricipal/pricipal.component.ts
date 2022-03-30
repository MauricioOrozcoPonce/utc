import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricipal',
  templateUrl: './pricipal.component.html',
  styleUrls: ['./pricipal.component.css']
})
export class PricipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
