import { Component, OnInit, ViewChild } from '@angular/core';
import { materialImports } from '../../shared/material-imports';

@Component({
  selector: 'app-payroll',
  imports: [
    materialImports
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit {

  displayedColumns: string[] = ['employeeName', 'leaveType', 'dateRange', 'reason', 'status', 'action'];
  dataSource = [];

  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  approve(row: any) {
    alert(`Approved request for ${row.employeeName}`);
  }

  rejectWithRemark(row: any) {
    alert(`Rejected request with remark for ${row.employeeName}`);
  }

  getMockData() {
    return [
      { employeeName: 'Jane Cooper', leaveType: 'Sick Leave', dateRange: '7 March-10 March', reason: 'Personal', status: 'Rejected' },
      { employeeName: 'Jane Cooper', leaveType: 'Sick Leave', dateRange: '7 March-10 March', reason: 'Emergency', status: 'Approved' },
      { employeeName: 'Jane Cooper', leaveType: 'Sick Leave', dateRange: '7 March-10 March', reason: 'Personal', status: 'Rejected' },
      { employeeName: 'Jane Cooper', leaveType: 'Sick Leave', dateRange: '7 March-10 March', reason: 'Emergency', status: 'Pending' },
      { employeeName: 'Jane Cooper', leaveType: 'Sick Leave', dateRange: '7 March-10 March', reason: 'Personal', status: 'Rejected' },
    ];
  }

}
