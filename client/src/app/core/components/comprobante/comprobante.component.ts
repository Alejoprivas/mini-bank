import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.sass']
})
export class ComprobanteComponent implements OnInit {

  @Input() public comprobante: any;
  constructor() { }

  ngOnInit() {
  }

}
