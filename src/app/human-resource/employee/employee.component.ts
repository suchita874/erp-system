import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { materialImports } from '../../shared/material-imports';


interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: 'edit'},
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: 'edit' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',action: 'edit' },
];


@Component({
  selector: 'app-employee',
  imports: [
    materialImports
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
