
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 
import { MatNativeDateModule } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';



export const materialImports = [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule
    // MatSnackBar
    // MatDatepicker
];



// 👇 Define the format dates here
export const CUSTOM_DATE_FORMATS: MatDateFormats = {
    parse: {
      dateInput: 'dd/MM/yyyy',
    },
    display: {
      dateInput: 'dd/MM/yyyy',
      monthYearLabel: 'MMM yyyy',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM yyyy',
    },
};

