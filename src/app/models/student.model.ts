export interface StudentPayload {
    admissionNumber: string;
    rollNumber: string;
    classStandard: number;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    category: number;
    religion: string;
    mobileNumber: string;
    email: string;
    admissionDate: string;
    bloodGroup: string;
    aadharNumber: string;
    height: number;
    weight: number;
    fatherName: string;
    fatherOccupation: string;
    fatherContactNumber: string;
    fatherAadharNumber: string;
    motherName: string;
    motherOccupation: string;
    motherContactNumber: string;
    motherAadharNumber: string;
    address: {
      addressLine1: string;
      addressLine2: string;
      city: number;
      state: number;
      country: number;
      zipCode: string;
      mobileNumber: string;
    };
    bankDetail: {
      accountNumber: string;
      bankName: string;
      ifscCode: string;
      state: number;
      city: number;
      uid: string;
      samagaraId: string;
      branchName: string;
    };
  }
  