import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { materialImports } from '../shared/material-imports';


@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterModule,
    materialImports
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  @ViewChild('menuWrapper', { static: false }) menuWrapper!: ElementRef;

  // showStudentSidebar: boolean = false;
  // showAccountSidebar: boolean = false;
  // showSideMenuBar: boolean = false
  activeSidebar: string | null = null;
  activeIcon: string | null = null;
  

  @ViewChild('sidebar2') sidebar2Ref!: ElementRef;
  @ViewChild('studentIcon') studentIconRef!: ElementRef;


  frontOfficeImg: string = 'assets/icon/frontOffice.png';
  accountImg: string = 'assets/icon/accounts.png';
  studentImg: string = 'assets/icon/student.png';
  examImg: string = 'assets/icon/exam.png';
  academicImg: string = 'assets/icon/acadmics.png';
  hrImg: string = 'assets/icon/humanResource.png';
  libraryImg: string = 'assets/icon/library.png';
  transportImg: string = 'assets/icon/transport.png';
  dashboardImg: string = 'assets/icon/Vector (4).png';


  sidebarItems = [
    {
      label: 'Dashboard',
      icon: this.dashboardImg,
      link: '/menu/dashboard',
      children: null
    },
    {
      label: 'Front Office',
      icon: this.frontOfficeImg,
      link: '/menu/front-office',
      children: [
        { label: 'Admission Enquiry', link: '/menu/front-office/admission-enquiry' },
        { label: 'Visitor Books', link: '/menu/front-office/visitor-list' }
      ]
    },
    {
      label: 'Accounts',
      icon: this.accountImg,
      // link: '/menu/front-office',
      children: [
        { label: 'Fees Structure', link: '/menu/accounts/fees-structure' },
        { label: 'Reports', link: '/menu/accounts/reports' }
      ]
    },
    {
      label: 'Student',
      icon: this.studentImg,
      link: '/menu/student',
      children: [
        { label: 'All', link: '/menu/student/student-list' },
        { label: 'Add Student', link: '/menu/student/add' }
      ]
    },
    {
      label: 'Exam',
      icon: this.examImg,
      // children: [
      //   { label: 'All', link: '' },
      //   { label: 'Add Student', link: '' }
      // ]
    },
    {
      label: 'Academic',
      icon: this.academicImg,
      link: '/menu/academic',
      children: [
        { label: 'Class & Section Setup', link: '/menu/academic/class-section' },
        { label: 'Subject Setup', link: '/menu/academic/subject' },
        { label: 'Time Table Setup', link: '/menu/academic/timetable' }
      ]
    },
    {
      label: 'Human Resource',
      icon: this.hrImg,
      link: '/menu/human-resource',
      children: [
        { label: 'Employee', link: '/menu/human-resource/employee' },
        { label: 'New Employee', link: '' },
        { label: 'Payroll', link: '' },
        { label: 'Leaves Setup', link: '' }
      ]
    },
    {
      label: 'Library',
      icon: this.libraryImg,
      // children: [
      //   { label: 'All', link: '' },
      //   { label: 'Add Student', link: '' }
      // ]
    },
    {
      label: 'Transport',
      icon: this.transportImg,
      // children: [
      //   { label: 'All', link: '' },
      //   { label: 'Add Student', link: '' }
      // ]
    }
  ];

  

  constructor(private router: Router, private eRef: ElementRef) {
    this.setActiveIcon();
  }

  ngAfterViewInit() {
    //menuWrapper is available for click detection
    console.log('menu icon', this.menuWrapper);
  }

  toggleSidebar(item: any) {
    if(item.children){
      const isCurrentlyOpen = this.activeSidebar === item.label;
      
      this.activeSidebar = isCurrentlyOpen ? null : item.label;
      this.activeIcon = item.label;
    
      if (!isCurrentlyOpen && item.children?.length > 0) {
        this.router.navigate([item.children[0].link]);
      } 
    }else if (item.link) {
      this.router.navigate([item.link]);
      this.activeSidebar = null;
    }
  }
  

  get activeSidebarChildren() {
    return this.sidebarItems.find(item => item.label === this.activeSidebar)?.children || [];
  }


  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    setTimeout(() => {
      if (!this.menuWrapper) return;
  
      const clickedInside = this.menuWrapper.nativeElement.contains(event.target as Node);
      if (!clickedInside) {
        this.activeSidebar = null;
      }
    });
  }

  logout() {
    this.router.navigate(['/login']);
  }

  // setActiveIcon() {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       const currentUrl = event.urlAfterRedirects;
  
  //       const activeItem = this.sidebarItems.find(item =>
  //         item.link && currentUrl.includes(item.link)
  //       );
  
  //       if (activeItem) {
  //         this.activeSidebar = activeItem.label;
  //       } else {
  //         this.activeSidebar = null;
  //       }
  //     }
  //   });
  // }

  setActiveIcon() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        const activeItem = this.sidebarItems.find(item =>
          item.link && currentUrl.includes(item.link)
        );
        if (activeItem) {
          this.activeIcon = activeItem.label;
        }
      }
    });
  }
  

}
