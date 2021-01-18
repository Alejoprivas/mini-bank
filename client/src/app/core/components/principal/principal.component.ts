import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.sass']
})
export class PrincipalComponent implements OnInit {
  selectedCuenta;
  constructor() { }

  ngOnInit() {

  }
  getSelectedCuenta(cuenta) {
    console.log(cuenta._id);
    this.selectedCuenta = cuenta._id;
  }
}
