import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  addStudentForm!: FormGroup;
  getStudentForm!: FormGroup;
  editStudentForm!: FormGroup;

  students: Student[] = [];
  studentDetails: Student | null = null;

  student: Student = {
    name: '',
    email: '',
    age: 0
  };

  selectedStudentId: number | undefined;
  editStudentId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // Initialize Add Student Form
    this.addStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]]
    });

    // Initialize Get Student Form
    this.getStudentForm = this.fb.group({
      id: ['', Validators.required]
    });

    // ✅ Initialize Edit Student Form to avoid undefined errors
    this.editStudentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]]
    });

    // Load initial student list
    this.getStudents();
  }

  // Add a new student
  addStudent(): void {
    this.student = this.addStudentForm.value;
    alert(this.student.name);

    this.studentService.addStudent(this.student).subscribe({
      next: (res) => {
        console.log('Student added:', res);
        alert('Student added successfully!');
        this.addStudentForm.reset();
        this.getStudents();
      },
      error: (err) => {
        console.error('Error adding student:', err);
        alert('Failed to add student.');
      }
    });
  }

  // Get student by ID
  getStudentById(): void {
    const id = this.getStudentForm.value.id;
    this.studentService.getStudentById(id).subscribe({
      next: (res) => this.studentDetails = res,
      error: (err) => {
        console.error('Student not found:', err);
        alert('No student found with this ID.');
        this.studentDetails = null;
      }
    });
  }

  // Get all students
  getStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Students list refreshed:', this.students);
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  // Fetch student data for editing
  fetchStudentForEdit(id: number): void {
    if (!id) {
      alert('Please enter a valid Student ID');
      return;
    }

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.editStudentId = student.id!;
        this.editStudentForm.patchValue({
          name: student.name,
          email: student.email,
          age: student.age
        });
      },
      error: (err) => {
        console.error(`Error fetching student with ID ${id}:`, err);
        alert(`Could not find student with ID ${id}.`);
      }
    });
  }

  // Update student by ID
  updateStudentById(): void {
    if (!this.editStudentId) {
      alert('No student selected for update.');
      return;
    }

    if (this.editStudentForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    const updatedStudent: Student = this.editStudentForm.value;

    this.studentService.updateStudent(this.editStudentId, updatedStudent).subscribe({
      next: () => {
        alert(`Student with ID ${this.editStudentId} updated successfully.`);
        this.getStudents();
        this.editStudentForm.reset();
        this.editStudentId = undefined;
      },
      error: (err) => {
        console.error('Error updating student:', err);
        alert(`Could not update student. Check console for details.`);
      }
    });
  }

  // Delete student by ID
  deleteStudentById(id: number | undefined): void {
    if (id === undefined) {
      console.error('Invalid student ID');
      return;
    }

    if (confirm(`Are you sure you want to delete student with ID ${id}?`)) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert(`Student with ID ${id} deleted successfully.`);
          this.getStudents();
        },
        error: (err) => {
          console.error(`Error deleting student with ID ${id}:`, err);
          const errorMsg = err.error?.message || err.message || 'Unknown error';
          alert(`Could not delete student with ID ${id}. Error: ${errorMsg}`);
        }
      });
    }
  }

}
