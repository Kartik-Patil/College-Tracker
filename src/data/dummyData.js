// Dummy Students Data
export const studentsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    year: 3,
    rollNumber: "CS2022001",
    dob: "2003-05-15",
    address: "123 MG Road, Bangalore",
    status: "Active"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    phone: "+91 98765 43211",
    department: "Electronics and Communication",
    year: 2,
    rollNumber: "EC2023015",
    dob: "2004-08-22",
    address: "456 Park Street, Mumbai",
    status: "Active"
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@college.edu",
    phone: "+91 98765 43212",
    department: "Mechanical",
    year: 4,
    rollNumber: "ME2021008",
    dob: "2002-03-10",
    address: "789 Main Road, Delhi",
    status: "Active"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@college.edu",
    phone: "+91 98765 43213",
    department: "Civil Engineering",
    year: 1,
    rollNumber: "CE2024022",
    dob: "2005-11-30",
    address: "321 Lake View, Hyderabad",
    status: "Active"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@college.edu",
    phone: "+91 98765 43214",
    department: "Computer Science",
    year: 2,
    rollNumber: "CS2023045",
    dob: "2004-01-18",
    address: "654 Hill Station, Pune",
    status: "Active"
  },
  {
    id: 6,
    name: "Anjali Verma",
    email: "anjali.verma@college.edu",
    phone: "+91 98765 43215",
    department: "Electronics and Communication",
    year: 3,
    rollNumber: "EC2022033",
    dob: "2003-07-25",
    address: "987 Gandhi Nagar, Chennai",
    status: "Active"
  },
  {
    id: 7,
    name: "Rohan Mehta",
    email: "rohan.mehta@college.edu",
    phone: "+91 98765 43216",
    department: "Mechanical",
    year: 1,
    rollNumber: "ME2024011",
    dob: "2005-09-05",
    address: "147 Nehru Place, Kolkata",
    status: "Active"
  },
  {
    id: 8,
    name: "Kavya Nair",
    email: "kavya.nair@college.edu",
    phone: "+91 98765 43217",
    department: "Civil Engineering",
    year: 4,
    rollNumber: "CE2021005",
    dob: "2002-12-20",
    address: "258 Beach Road, Kochi",
    status: "Active"
  }
];

// Dummy Lecturers Data
export const lecturersData = [
  {
    id: 1,
    name: "Dr. Suresh Iyer",
    email: "suresh.iyer@college.edu",
    phone: "+91 98765 54321",
    department: "Computer Science",
    designation: "Professor",
    qualification: "PhD in Computer Science",
    experience: 15,
    subjects: ["Data Structures", "Algorithms", "Machine Learning"],
    joiningDate: "2010-07-15",
    salary: 95000,
    status: "Active"
  },
  {
    id: 2,
    name: "Prof. Meena Krishnan",
    email: "meena.krishnan@college.edu",
    phone: "+91 98765 54322",
    department: "Electronics and Communication",
    designation: "Associate Professor",
    qualification: "PhD in Electronics",
    experience: 12,
    subjects: ["Digital Electronics", "Signal Processing", "VLSI Design"],
    joiningDate: "2012-08-20",
    salary: 85000,
    status: "Active"
  },
  {
    id: 3,
    name: "Dr. Rajesh Gupta",
    email: "rajesh.gupta@college.edu",
    phone: "+91 98765 54323",
    department: "Mechanical",
    designation: "Professor",
    qualification: "PhD in Mechanical Engineering",
    experience: 18,
    subjects: ["Thermodynamics", "Fluid Mechanics", "Heat Transfer"],
    joiningDate: "2008-06-10",
    salary: 98000,
    status: "Active"
  },
  {
    id: 4,
    name: "Prof. Lakshmi Devi",
    email: "lakshmi.devi@college.edu",
    phone: "+91 98765 54324",
    department: "Civil Engineering",
    designation: "Assistant Professor",
    qualification: "MTech in Structural Engineering",
    experience: 8,
    subjects: ["Structural Analysis", "Concrete Technology", "Surveying"],
    joiningDate: "2016-09-01",
    salary: 72000,
    status: "Active"
  },
  {
    id: 5,
    name: "Dr. Arun Kumar",
    email: "arun.kumar@college.edu",
    phone: "+91 98765 54325",
    department: "Computer Science",
    designation: "Associate Professor",
    qualification: "PhD in Artificial Intelligence",
    experience: 10,
    subjects: ["Artificial Intelligence", "Deep Learning", "Python Programming"],
    joiningDate: "2014-01-15",
    salary: 88000,
    status: "Active"
  },
  {
    id: 6,
    name: "Prof. Divya Menon",
    email: "divya.menon@college.edu",
    phone: "+91 98765 54326",
    department: "Electronics and Communication",
    designation: "Assistant Professor",
    qualification: "MTech in Communication Systems",
    experience: 6,
    subjects: ["Communication Systems", "Microprocessors", "Network Theory"],
    joiningDate: "2018-07-20",
    salary: 68000,
    status: "Active"
  }
];

// Dummy Courses Data
export const coursesData = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    credits: 4,
    semester: 3,
    lecturer: "Dr. Suresh Iyer",
    enrolledStudents: 45,
    description: "Comprehensive study of fundamental data structures and algorithm design"
  },
  {
    id: 2,
    code: "CS401",
    name: "Machine Learning",
    department: "Computer Science",
    credits: 4,
    semester: 7,
    lecturer: "Dr. Suresh Iyer",
    enrolledStudents: 38,
    description: "Introduction to machine learning algorithms and applications"
  },
  {
    id: 3,
    code: "EC201",
    name: "Digital Electronics",
    department: "Electronics and Communication",
    credits: 3,
    semester: 3,
    lecturer: "Prof. Meena Krishnan",
    enrolledStudents: 42,
    description: "Study of digital circuits and logic design"
  },
  {
    id: 4,
    code: "EC301",
    name: "Signal Processing",
    department: "Electronics and Communication",
    credits: 4,
    semester: 5,
    lecturer: "Prof. Meena Krishnan",
    enrolledStudents: 35,
    description: "Digital signal processing techniques and applications"
  },
  {
    id: 5,
    code: "ME301",
    name: "Thermodynamics",
    department: "Mechanical",
    credits: 4,
    semester: 5,
    lecturer: "Dr. Rajesh Gupta",
    enrolledStudents: 40,
    description: "Laws of thermodynamics and their engineering applications"
  },
  {
    id: 6,
    code: "ME401",
    name: "Fluid Mechanics",
    department: "Mechanical",
    credits: 4,
    semester: 7,
    lecturer: "Dr. Rajesh Gupta",
    enrolledStudents: 36,
    description: "Study of fluid behavior and flow analysis"
  },
  {
    id: 7,
    code: "CE201",
    name: "Structural Analysis",
    department: "Civil Engineering",
    credits: 4,
    semester: 3,
    lecturer: "Prof. Lakshmi Devi",
    enrolledStudents: 44,
    description: "Analysis of structural systems and design principles"
  },
  {
    id: 8,
    code: "CE301",
    name: "Concrete Technology",
    department: "Civil Engineering",
    credits: 3,
    semester: 5,
    lecturer: "Prof. Lakshmi Devi",
    enrolledStudents: 39,
    description: "Properties and applications of concrete in construction"
  },
  {
    id: 9,
    code: "CS201",
    name: "Python Programming",
    department: "Computer Science",
    credits: 3,
    semester: 3,
    lecturer: "Dr. Arun Kumar",
    enrolledStudents: 50,
    description: "Introduction to Python programming and applications"
  },
  {
    id: 10,
    code: "EC401",
    name: "Communication Systems",
    department: "Electronics and Communication",
    credits: 4,
    semester: 7,
    lecturer: "Prof. Divya Menon",
    enrolledStudents: 33,
    description: "Modern communication systems and technologies"
  }
];

// Dummy Fees Data
export const feesData = [
  {
    id: 1,
    studentId: 1,
    studentName: "Rahul Sharma",
    rollNumber: "CS2022001",
    department: "Computer Science",
    totalFees: 120000,
    paidAmount: 120000,
    pendingAmount: 0,
    lastPaymentDate: "2024-10-15",
    semester: "Semester 5",
    status: "Paid"
  },
  {
    id: 2,
    studentId: 2,
    studentName: "Priya Patel",
    rollNumber: "EC2023015",
    department: "Electronics and Communication",
    totalFees: 115000,
    paidAmount: 60000,
    pendingAmount: 55000,
    lastPaymentDate: "2024-08-20",
    semester: "Semester 3",
    status: "Partial"
  },
  {
    id: 3,
    studentId: 3,
    studentName: "Amit Kumar",
    rollNumber: "ME2021008",
    department: "Mechanical",
    totalFees: 110000,
    paidAmount: 110000,
    pendingAmount: 0,
    lastPaymentDate: "2024-09-30",
    semester: "Semester 7",
    status: "Paid"
  },
  {
    id: 4,
    studentId: 4,
    studentName: "Sneha Reddy",
    rollNumber: "CE2024022",
    department: "Civil Engineering",
    totalFees: 105000,
    paidAmount: 105000,
    pendingAmount: 0,
    lastPaymentDate: "2024-11-01",
    semester: "Semester 1",
    status: "Paid"
  },
  {
    id: 5,
    studentId: 5,
    studentName: "Vikram Singh",
    rollNumber: "CS2023045",
    department: "Computer Science",
    totalFees: 120000,
    paidAmount: 40000,
    pendingAmount: 80000,
    lastPaymentDate: "2024-07-15",
    semester: "Semester 3",
    status: "Pending"
  },
  {
    id: 6,
    studentId: 6,
    studentName: "Anjali Verma",
    rollNumber: "EC2022033",
    department: "Electronics and Communication",
    totalFees: 115000,
    paidAmount: 115000,
    pendingAmount: 0,
    lastPaymentDate: "2024-10-20",
    semester: "Semester 5",
    status: "Paid"
  }
];

// Dummy Payroll Data
export const payrollData = [
  {
    id: 1,
    lecturerId: 1,
    lecturerName: "Dr. Suresh Iyer",
    department: "Computer Science",
    designation: "Professor",
    baseSalary: 95000,
    allowances: 15000,
    deductions: 8000,
    netSalary: 102000,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  },
  {
    id: 2,
    lecturerId: 2,
    lecturerName: "Prof. Meena Krishnan",
    department: "Electronics and Communication",
    designation: "Associate Professor",
    baseSalary: 85000,
    allowances: 12000,
    deductions: 7000,
    netSalary: 90000,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  },
  {
    id: 3,
    lecturerId: 3,
    lecturerName: "Dr. Rajesh Gupta",
    department: "Mechanical",
    designation: "Professor",
    baseSalary: 98000,
    allowances: 16000,
    deductions: 8500,
    netSalary: 105500,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  },
  {
    id: 4,
    lecturerId: 4,
    lecturerName: "Prof. Lakshmi Devi",
    department: "Civil Engineering",
    designation: "Assistant Professor",
    baseSalary: 72000,
    allowances: 10000,
    deductions: 6000,
    netSalary: 76000,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  },
  {
    id: 5,
    lecturerId: 5,
    lecturerName: "Dr. Arun Kumar",
    department: "Computer Science",
    designation: "Associate Professor",
    baseSalary: 88000,
    allowances: 13000,
    deductions: 7500,
    netSalary: 93500,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  },
  {
    id: 6,
    lecturerId: 6,
    lecturerName: "Prof. Divya Menon",
    department: "Electronics and Communication",
    designation: "Assistant Professor",
    baseSalary: 68000,
    allowances: 9000,
    deductions: 5500,
    netSalary: 71500,
    paymentMonth: "November 2024",
    paymentDate: "2024-11-30",
    status: "Paid"
  }
];

// Department Statistics
export const departmentStats = [
  {
    id: 1,
    name: "Computer Science",
    code: "CSE",
    totalStudents: 180,
    totalLecturers: 12,
    activeCourses: 15,
    icon: "💻",
    color: "#667eea"
  },
  {
    id: 2,
    name: "Electronics and Communication",
    code: "ECE",
    totalStudents: 150,
    totalLecturers: 10,
    activeCourses: 12,
    icon: "⚡",
    color: "#f6ad55"
  },
  {
    id: 3,
    name: "Mechanical",
    code: "MECH",
    totalStudents: 140,
    totalLecturers: 9,
    activeCourses: 11,
    icon: "⚙️",
    color: "#48bb78"
  },
  {
    id: 4,
    name: "Civil Engineering",
    code: "CIVIL",
    totalStudents: 130,
    totalLecturers: 8,
    activeCourses: 10,
    icon: "🏗️",
    color: "#ed64a6"
  }
];
